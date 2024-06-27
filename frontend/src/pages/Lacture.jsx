import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { GiArtificialHive } from "react-icons/gi";

const Lecture = () => {
  const { courseId, lectureId } = useParams();
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
    <div className="ml-6">
      <div className="flex mt-4 w-full justify-between ">
        <h1 className="font-semibold text-lg">Lecture1</h1>
        <button className="mb-4 px-4 py-2 bg-red-700 text-white rounded-full text-sm transition-colors duration-300">
          Create Notes with AI
        </button>
        <button
          onClick={toggleModal}
          className="mb-4 px-4 py-2 text-sm bg-red-700 text-white rounded-full transition-colors duration-300"
        >
          AI Support
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full transition-all duration-500">
        <div
          className={`video-div ${
            isModalOpen ? "w-[90%] md:w-[60%]" : "w-full"
          } flex flex-col gap-2 transition-all duration-500`}
        >
          <div className="w-full h-96 border border-gray-400 rounded-md flex justify-center items-center">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/my8GDg3eWX4"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </div>
          <div className="transcript">
            <h1 className="font-semibold">Video Transcripts</h1>
          </div>
        </div>

        <div
          className={`chat-bot-div ${
            isModalOpen ? "w-[90%] h-[500px] md:w-[40%]" : "hidden"
          } border-2 border-gray-400 rounded-md h-[500px] flex flex-col transition-all duration-500`}
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
                    {/* Replace with an actual icon if available */}
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

export default Lecture;
