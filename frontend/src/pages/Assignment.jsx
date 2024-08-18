import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiUrl } from "../config";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Button } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

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

const Assignment = () => {
  const params = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const [questions, setQuestions] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [chatbot, setChatBot] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedMultiOptions, setSelectedMultiOptions] = useState([]);
  const [subjectiveAnswers, setSubjectiveAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    localStorage.removeItem("chat_id");
  }, []);

  const chat_id = localStorage.getItem("chat_id");

  const sendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newMessage.trim() !== "") {
      setNewMessage("");
      const data = {
        chat: newMessage,
        email: currentUser.email,
      };
      if (chat_id !== null) {
        data.chat_id = chat_id;
      }
      const res = await axios({
        url: `${ApiUrl}/chatbot`,
        method: "POST",
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.chat);
      localStorage.setItem("chat_id", res.data._id);
      setChatBot(res.data.chat);
      setLoading(false);
      adjustTextareaHeight();
      setCount(count + 1);
    }
  };

  useEffect(() => {
    if (questions) {
      setSelectedOptions(Array(questions.length).fill(null));
      setSelectedMultiOptions(Array(questions.length).fill([]));
      setSubjectiveAnswers(Array(questions.length).fill(""));
    }
  }, [questions]);

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = Number(value);
    setSelectedOptions(newSelectedOptions);
  };

  const handleMultiOptionChange = (index, value) => {
    const newSelectedMultiOptions = [...selectedMultiOptions];
    if (newSelectedMultiOptions[index]?.includes(Number(value))) {
      newSelectedMultiOptions[index] = newSelectedMultiOptions[index].filter(
        (option) => option !== Number(value)
      );
    } else {
      newSelectedMultiOptions[index] = [
        ...(newSelectedMultiOptions[index] || []),
        Number(value),
      ];
    }
    setSelectedMultiOptions(newSelectedMultiOptions);
  };

  const handleSubjectiveChange = (index, value) => {
    const newSubjectiveAnswers = [...subjectiveAnswers];
    newSubjectiveAnswers[index] = value;
    setSubjectiveAnswers(newSubjectiveAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (question.type === "mcq") {
        if (selectedOptions[index] === question.answer) {
          newScore++;
        }
      } else if (question.type === "msq") {
        if (
          JSON.stringify(selectedMultiOptions[index]?.sort()) ===
          JSON.stringify(question.answer.sort())
        ) {
          newScore++;
        }
      } else if (question.type === "subjective") {
        if (
          subjectiveAnswers[index].trim().toLowerCase() ===
          question.answer.trim().toLowerCase()
        ) {
          newScore++;
        }
      }
    });
    setScore(newScore);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [count]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
  };

  const getAssignment = async () => {
    console.log("getting assignment");
    const res = await axios(`${ApiUrl}/assignment/${params.assignmentId}`);
    console.log(res.data);
    setQuestions(res.data.questions);
  };

  useEffect(() => {
    console.log("useEffect called");
    getAssignment();
  }, [params.assignmentId]);

  return (
    <div className="ml-2">
      <div className="flex mt-8 w-full justify-between">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-semibold text-lg text-gray-800"
        >
          Assignment
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleModal}
          className="mb-4 px-4 py-2 text-sm bg-indigo-600 text-white rounded-full transition-colors duration-300"
        >
          AI Support
        </motion.button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full transition-all duration-500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`video-div ${
            isModalOpen ? "w-[90%] md:w-[60%]" : "w-full"
          } flex flex-col gap-2 transition-all duration-500`}
        >
          {/* Questions are here */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl p-5 bg-white rounded-lg shadow-md"
          >
            {questions &&
              questions.map((question, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-6"
                >
                  <h2 className="text-xl font-semibold mb-3 text-gray-800">
                    {question.question}
                  </h2>
                  {question.type === "mcq" &&
                    question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="radio"
                          value={optionIndex}
                          checked={selectedOptions[index] === optionIndex}
                          onChange={(e) =>
                            handleOptionChange(index, e.target.value)
                          }
                          className="mr-2 text-pink-500 focus:ring-pink-500"
                        />
                        <label className="text-gray-600">{option}</label>
                      </div>
                    ))}
                  {question.type === "msq" &&
                    question.options.map((option, optionIndex) => {
                      const isChecked =
                        selectedMultiOptions[index]?.includes(optionIndex) ||
                        false;

                      return (
                        <div
                          key={optionIndex}
                          className="flex items-center mb-2"
                        >
                          <input
                            type="checkbox"
                            value={optionIndex}
                            checked={isChecked}
                            onChange={(e) =>
                              handleMultiOptionChange(index, optionIndex)
                            }
                            className="mr-2 bg-indigo-500 focus:ring-pink-500"
                          />
                          <label className="text-gray-600">{option}</label>
                        </div>
                      );
                    })}
                  {question.type === "subjective" && (
                    <textarea
                      value={subjectiveAnswers[index]}
                      onChange={(e) =>
                        handleSubjectiveChange(index, e.target.value)
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-800"
                      rows="1"
                    />
                  )}
                </motion.div>
              ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-75"
            >
              Submit
            </motion.button>
            {score !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <p className="text-xl font-semibold text-gray-800">
                  Your score: {score} / {questions.length}
                </p>
              </motion.div>
            )}
          </motion.div>
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
                  {chatbot && chatbot.length > 0 ? (
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
    </div>
  );
};

export default Assignment;
