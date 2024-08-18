import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../config";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Tooltip, useToast } from "@chakra-ui/react";
import { FaRobot, FaFileDownload, FaFileAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import jsPDF from "jspdf";
import markdownIt from "markdown-it";

function indentText(text, indentString) {
  const lines = text.split("\n");
  const indentedLines = lines.map((line) => indentString + line);
  return indentedLines.join("\n");
}

function toMarkdown(text) {
  // Replace '•' with '*'
  text = text.replace(/•/g, "*");
  // Indent text
  text = indentText(text, "> ");

  // Initialize markdown-it
  const md = markdownIt();
  // Render markdown
  return md.render(text);
}

const Lecture = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const [isNotesLoading, setNotesIsLoading] = useState(false);
  const [isSummaryLoading, setSummaryLoading] = useState(false);
  const [summery, setSummary] = useState(null);
  const [lecture, setLecture] = useState(null);
  const [chatbot, setChatBot] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);
  const scrollRef = useRef();
  const toast = useToast();

  useEffect(() => {
    localStorage.removeItem("chat_id");
    getLecture();
  }, [params.lectureId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatbot]);

  const getLecture = async () => {
    try {
      const res = await axios(`${ApiUrl}/lecture/${params.lectureId}`);
      setLecture(res.data);
    } catch (error) {
      console.error("Error fetching lecture:", error);
      toast({
        title: "Error fetching lecture",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const notesGenerate = async () => {
    setNotesIsLoading(true);
    try {
      const res = await axios.post(`${ApiUrl}/notes_generator`, {
        topic: lecture.title,
        email: currentUser.email,
      });

      const doc = new jsPDF();
      const margin = 10;
      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxLineWidth = pageWidth - margin * 2;
      const lineHeight = 10; // Height of each line

      // Split text into lines that fit within the max width
      const lines = doc.splitTextToSize(res.data.result, maxLineWidth);

      let currentHeight = margin;

      // Add each line to the PDF, adding a new page when necessary
      lines.forEach((line) => {
        if (currentHeight + lineHeight > pageHeight - margin) {
          doc.addPage(); // Add a new page
          currentHeight = margin; // Reset height for the new page
        }
        doc.text(line, margin, currentHeight);
        currentHeight += lineHeight;
      });

      doc.save(`${lecture.title}.pdf`);

      toast({
        title: "Notes generated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error generating notes:", error);
      toast({
        title: "Error generating notes",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setNotesIsLoading(false);
    }
  };
  const videoSummary = async () => {
    setSummaryLoading(true);
    try {
      const res = await axios.post(`${ApiUrl}/video_summary`, {
        link: `https://www.youtube.com/watch?v=${lecture.youtubeId}`,
        email: currentUser.email,
      });
      setSummary(toMarkdown(res.data.result));
    } catch (error) {
      console.error("Error generating summary:", error);
      toast({
        title: "Error generating summary",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSummaryLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    setLoading(true);
    const updatedChatbot = [...chatbot, { role: "user", content: newMessage }];
    setChatBot(updatedChatbot);
    setNewMessage("");

    try {
      const res = await axios.post(`${ApiUrl}/chatbot`, {
        chat: newMessage,
        email: currentUser.email,
        chat_id: localStorage.getItem("chat_id") || null,
      });
      localStorage.setItem("chat_id", res.data._id);
      setChatBot([...updatedChatbot, ...res.data.chat.slice(-1)]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-6 h-full bg-gray-100 rounded-lg shadow-lg"
    >
      {lecture && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-6"
        >
          <h1 className="font-bold text-2xl text-gray-800 mb-4 md:mb-0">
            {lecture.title}
          </h1>
          <div className="flex space-x-4">
            <Tooltip label="Generate Notes" placement="top">
              <Button
                leftIcon={<FaFileDownload />}
                onClick={notesGenerate}
                isLoading={isNotesLoading}
                colorScheme="red"
                variant="solid"
              >
                Create Notes
              </Button>
            </Tooltip>
            <Tooltip label="AI Support" placement="top">
              <Button
                leftIcon={<FaRobot />}
                onClick={() => setIsModalOpen(!isModalOpen)}
                colorScheme="blue"
                variant="outline"
              >
                AI Support
              </Button>
            </Tooltip>
          </div>
        </motion.div>
      )}

      {lecture && (
        <div className="flex flex-col md:flex-row gap-6">
          <motion.div
            layout
            className={`video-div ${isModalOpen ? "w-full md:w-3/5" : "w-full"} 
            bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out`}
          >
            <div
              className="aspect-w-16 aspect-h-9"
              style={{ height: summery ? "250px" : "500px" }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${lecture.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <Button
                leftIcon={<FaFileAlt />}
                onClick={videoSummary}
                isLoading={isSummaryLoading}
                colorScheme="green"
                variant="solid"
                className="mb-4"
              >
                Video Summary
              </Button>
              <AnimatePresence>
                {summery && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mt-2 p-4 bg-gray-100 rounded-lg h-[200px] overflow-y-auto"
                  >
                    <h2 className="font-semibold text-lg ">Summary:</h2>
                    <div
                      className="font-semibold mt-2"
                      dangerouslySetInnerHTML={{ __html: summery }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="chat-bot-div w-full md:w-2/5 bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="h-[500px] flex flex-col">
                  <div className="flex-1 p-4 overflow-y-auto">
                    {chatbot.length > 0 ? (
                      chatbot.map((chat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`mb-4 ${
                            chat.role === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              chat.role === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 text-gray-800"
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: toMarkdown(chat.content),
                            }}
                          />
                        </motion.div>
                      ))
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <FaRobot className="text-6xl text-gray-400 mb-4 mx-auto" />
                          <p className="text-xl font-semibold text-gray-600">
                            Hi User, I'm your AI assistant. How can I help you?
                          </p>
                        </div>
                      </div>
                    )}
                    <div ref={scrollRef} />
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <form
                      onSubmit={sendMessage}
                      className="flex items-center gap-4"
                    >
                      <textarea
                        value={newMessage}
                        onChange={handleInputChange}
                        onKeyPress={(e) =>
                          e.key === "Enter" && !e.shiftKey && sendMessage(e)
                        }
                        placeholder="Type your message..."
                        className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="1"
                        ref={textareaRef}
                      />
                      <Button
                        type="submit"
                        isLoading={loading}
                        colorScheme="blue"
                        className="rounded-r-md"
                      >
                        <IoMdSend />
                      </Button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default Lecture;
