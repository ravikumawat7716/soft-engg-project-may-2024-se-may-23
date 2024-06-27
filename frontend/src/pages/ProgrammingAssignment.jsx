import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

const ProgrammingAssignment = () => {
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

  return (
    <div className=" ml-6">
      <div className="flex mt-4 w-full justify-between">
        <h1 className="font-semibold text-lg">PA 1</h1>

        <button
          onClick={toggleModal}
          className="mb-0 px-4 py-2 text-sm bg-red-700 text-white rounded-full transition-colors duration-300"
        >
          AI Support
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full transition-all duration-500">
        <div
          className={`video-div ${
            isModalOpen ? "w-[90%] md:w-[70%]" : "w-full"
          } flex flex-col gap-2 transition-all duration-500`}
        >
          <CodeEditor />
        </div>

        <div
          className={`chat-bot-div ${
            isModalOpen ? "w-[90%] h-[500px] md:w-[30%]" : "hidden"
          } border-2 border-gray-400 rounded-md h-[500px] mt-14 flex flex-col transition-all duration-500`}
        >
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((message, index) => (
                <div key={index} className="mb-2">
                  <div
                    className={`p-2 rounded ${
                      message.from === "bot"
                        ? "bg-gray-200"
                        : "bg-blue-500 text-white"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="flex flex-col gap-2">
                  <span className="text-center text-4xl">
                    <span className="icon-large">🤖</span>{" "}
                  </span>
                  <span>Hi User, I am AI. How can I help you?</span>
                </div>
              </div>
            )}
          </div>
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
    </div>
  );
};

export default ProgrammingAssignment;
