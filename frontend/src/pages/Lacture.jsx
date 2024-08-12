import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GiArtificialHive } from "react-icons/gi";
import LLmSelect from "../components/LLMSelect";
import axios from "axios";
import { ApiUrl } from "../config";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";

import jsPDF from "jspdf";

const Lecture = () => {
  const params = useParams();

  const [count, setCount] = useState(0);
  const [summery, setSummery] = useState(null);
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.auth);

  const { courseId, lectureId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef(null);

  const [lecture, setLecture] = useState(null);

  const [chatbot, setChatBot] = useState(null);

  // Clear chat_id on component mount to ensure it's null on every hard refresh
  useEffect(() => {
    localStorage.removeItem("chat_id");
  }, []);

  const chat_id = localStorage.getItem("chat_id"); // chat_id will be null after clearing

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
        // Check if chat_id exists
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
      setCount(count + 1);

      adjustTextareaHeight();
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

  const getLecture = async () => {
    const res = await axios(`${ApiUrl}/lecture/${params.lectureId}`);
    setLecture(res.data);
  };

  const notesGenerate = async () => {
    const data = {
      topic: lecture.title,
      email: currentUser.email,
    };

    const res = await axios({
      url: `${ApiUrl}/notes_generator`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const doc = new jsPDF();

    doc.text(res.data.result, 10, 10);

    doc.save(`${lecture.title}.pdf`);
  };

  const videoSummery = async () => {
    const data = {
      link: `https://www.youtube.com/watch?v=${lecture.youtubeId}`,
      email: currentUser.email,
    };

    const res = await axios({
      url: `${ApiUrl}/video_summary`,
      method: "POST",
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setSummery(res.data.result);
  };

  const getLectureLLM = async () => {
    // Add your logic for fetching LLM data here
  };

  useEffect(() => {
    getLecture();
  }, [params.lectureId]);

  useEffect(() => {
    getLectureLLM();
  }, [count]);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="ml-6">
      {lecture && (
        <div className="flex mt-4 w-full justify-between">
          <h1 className="font-semibold text-lg">{lecture.title}</h1>
          <button
            className="mb-4 px-4 py-2 bg-red-700 text-white rounded-full text-sm transition-colors duration-300"
            onClick={notesGenerate}
          >
            Create Notes with AI
          </button>
          <button
            onClick={toggleModal}
            className="mb-4 px-4 py-2 text-sm bg-red-700 text-white rounded-full transition-colors duration-300"
          >
            AI Support
          </button>
        </div>
      )}
      {lecture && (
        <div className="flex flex-col md:flex-row gap-3 w-full transition-all duration-500">
          <div
            className={`video-div ${
              isModalOpen ? "w-[90%] md:w-[60%]" : "w-full"
            } flex flex-col gap-2 transition-all duration-500`}
          >
            <div className="w-full h-[70%] border border-gray-400 rounded-md flex justify-center items-center">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${lecture.youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-md"
              ></iframe>
            </div>
            <div className="transcript">
              <button
                className="px-4 py-2 rounded-full text-white bg-red-700"
                onClick={videoSummery}
              >
                Video Summery
              </button>
              {summery && <h1>{summery}</h1>}
            </div>
          </div>

          <div
            className={`chat-bot-div ${
              isModalOpen ? "w-[90%] h-[500px] md:w-[40%]" : "hidden"
            } border-2 border-gray-400 rounded-md h-[500px] flex flex-col transition-all duration-500`}
          >
            <div className="flex-1 p-4 overflow-y-auto">
              {chatbot && chatbot.length > 0 ? (
                chatbot.map((chat, index) => (
                  <div key={index}>
                    <div className="mb-2 flex flex-col">
                      {chat.role === "user" && <h1>user : {chat.content}</h1>}
                      {chat.role === "assistant" && (
                        <h1 className="font-semibold text-[14px]">
                          assistant: {chat.content}
                        </h1>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="flex flex-col gap-2">
                    <span className="text-center text-4xl">
                      <span className="icon-large">🤖</span>
                    </span>
                    <span>Hi User, I am AI. How can I help you?</span>
                  </div>
                </div>
              )}
              <div ref={scrollRef}></div>
            </div>
            <div>{loading && <Loading />}</div>
            <div className="p-4 border-t border-gray-300 flex">
              <textarea
                value={newMessage}
                onChange={handleInputChange}
                onKeyUp={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your query..."
                className="flex-1 p-2 outline-none border px-4 py-2 text-sm rounded-md resize-none overflow-hidden"
                rows="1"
                ref={textareaRef}
              ></textarea>
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 text-white bg-red-700 rounded-md transition-colors duration-300"
              >
                Go
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecture;
