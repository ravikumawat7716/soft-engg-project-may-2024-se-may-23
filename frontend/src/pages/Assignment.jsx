import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiUrl } from "../config";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { Button } from "@chakra-ui/react";

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

  // const sendMessage = () => {
  //   if (newMessage.trim() !== "") {
  //     setMessages([...messages, { from: "user", text: newMessage }]);
  //     setNewMessage("");
  //     setTimeout(() => {
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         { from: "bot", text: "This is a simulated response." },
  //       ]);
  //     }, 1000);
  //     adjustTextareaHeight();
  //   }
  // };

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
    <div className="ml-2 ">
      <div className="flex mt-8 w-full justify-between">
        <h1 className="font-semibold text-lg">Assignment1</h1>

        <button
          onClick={toggleModal}
          className="mb-4 px-4 py-2 text-sm bg-red-700 text-white rounded-full transition-colors duration-300"
        >
          AI Support
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-3 w-full transition-all duration-500 ">
        <div
          className={`video-div ${
            isModalOpen ? "w-[90%] md:w-[60%]" : "w-full"
          } flex flex-col gap-2 transition-all duration-500`}
        >
          {/* Questions are here */}

          <div className="max-w-xl  p-5 bg-white rounded-lg shadow-md">
            {questions &&
              questions.map((question, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">
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
                          className="mr-2"
                        />
                        <label className="text-gray-700">{option}</label>
                      </div>
                    ))}
                  {question.type === "msq" &&
                    question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          value={optionIndex}
                          checked={selectedMultiOptions[index]?.includes(
                            optionIndex
                          )}
                          onChange={(e) =>
                            handleMultiOptionChange(index, e.target.value)
                          }
                          className="mr-2"
                        />
                        <label className="text-gray-700">{option}</label>
                      </div>
                    ))}
                  {question.type === "subjective" && (
                    <textarea
                      value={subjectiveAnswers[index]}
                      onChange={(e) =>
                        handleSubjectiveChange(index, e.target.value)
                      }
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-700"
                      rows="1"
                    />
                  )}
                </div>
              ))}
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              Submit
            </button>
            {score !== null && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold">
                  Your score: {score}/{questions.length}
                </h2>
              </div>
            )}
          </div>
        </div>

        <div
          className={`chat-bot-div ${
            isModalOpen ? "w-[90%] h-[600px] md:w-[40%]" : "hidden"
          } border-2 border-gray-400 rounded-md h-[500px] flex flex-col transition-all duration-500`}
        >
          <div className="flex-1 p-4 overflow-y-auto">
            {chatbot && chatbot.length > 0 ? (
              chatbot.map((chat, index) => (
                <div key={index}>
                  <div className="mb-2 flex flex-col gap-1">
                    {chat.role === "user" && (
                      <h1 className="font-semibold text-[16px]">
                        User : {chat.content}
                      </h1>
                    )}
                    {chat.role === "assistant" && (
                      <h1 className="font-semibold text-[16px]">
                        <span className="text-[18px]">🤖</span>: {chat.content}
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
                  <span className="font-semibold text-[18px]">
                    Hi User, I am AI ChatBot. How can I help you?
                  </span>
                </div>
              </div>
            )}
            <div ref={scrollRef}></div>
          </div>
          <div className="mb-2">{loading && <Loading />}</div>
          <div className="p-4 border-t border-gray-300 flex">
            <textarea
              value={newMessage}
              onChange={handleInputChange}
              onKeyUp={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your query..."
              className="flex-1 p-2 outline-none border px-4 py-2 text-sm font-semibold rounded-md resize-none overflow-hidden"
              rows="1"
              ref={textareaRef}
            ></textarea>
            <Button
              onClick={sendMessage}
              className="ml-2 px-4 py-2 text-white bg-red-700 rounded-md transition-colors duration-300"
              isLoading={loading}
            >
              Go
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
