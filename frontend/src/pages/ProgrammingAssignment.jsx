import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import { ApiUrl } from "../config";
import { motion } from "framer-motion";

const ProgrammingAssignment = () => {
  const params = useParams();
  const [pa, setPa] = useState(null);

  const { courseId, ProgrammingAssignmentId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef(null);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { from: "user", text: newMessage }]);
      setNewMessage("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: "bot", text: "This is a simulated response." },
        ]);
      }, 1000);
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

  const getCoursePA = async () => {
    const res = await axios(`${ApiUrl}/programming_assignment/${params.pa_id}`);
    setPa(res.data);
  };

  useEffect(() => {
    getCoursePA();
  }, [params.pa_id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="ml-6"
    >
      {pa && (
        <div>
          <div className="flex mt-4 w-full justify-between">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-semibold text-lg"
            >
              {pa.title}
            </motion.h1>
            
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full transition-all duration-500">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className={`video-div ${
                isModalOpen ? "w-[90%] md:w-[70%]" : "w-full"
              } flex flex-col gap-2 transition-all duration-500`}
            >
              <CodeEditor
                testCases={pa.testCases || []}
                assignment_id={params.paId}
                question={pa.title}
              />
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProgrammingAssignment;
