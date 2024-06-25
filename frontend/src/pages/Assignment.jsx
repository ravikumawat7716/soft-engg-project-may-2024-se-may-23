import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";

const questions = [
  {
    type: "mcq",
    question: "What is 1 + 2 ?",
    options: ["0", "5", "3", "7"],
    answer: 2,
  },
  {
    type: "mcq",
    question: "What is the capital of Rajasthan?",
    options: ["Sydney", "Bhopal", "Pune", "Jaipur"],
    answer: 3,
  },
  {
    type: "mcq",
    question: "How many judges are in Supreme Court?",
    options: ["31", "30", "32", "28"],
    answer: 0,
  },
  {
    type: "msq",
    question: "Which rivers are in India?",
    options: ["yamuna", "Ganga", "Nile", "Sindhu"],
    answer: [0, 2, 3],
  },
  {
    type: "msq",
    question: "Which awards belongs to Football?",
    options: ["Padma Shri", "Puskas Award", "Ballen d'or", "Nobal Prize"],
    answer: [2, 3],
  },
  {
    type: "subjective",
    question: "What is the capital of India?",
    answer: "Delhi",
  },
  {
    type: "subjective",
    question: "How many continents on Earth?",
    answer: "7",
  },
  {
    type: "subjective",
    question: "In which stae Kaziranga national Park is?",
    answer: "Assam",
  },
];
const Assignment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef(null);

  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null)
  );
  const [selectedMultiOptions, setSelectedMultiOptions] = useState(
    Array(questions.length).fill([])
  );
  const [subjectiveAnswers, setSubjectiveAnswers] = useState(
    Array(questions.length).fill("")
  );
  const [score, setScore] = useState(null);

  const handleOptionChange = (index, value) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = Number(value);
    setSelectedOptions(newSelectedOptions);
  };

  const handleMultiOptionChange = (index, value) => {
    const newSelectedMultiOptions = [...selectedMultiOptions];
    if (newSelectedMultiOptions[index].includes(Number(value))) {
      newSelectedMultiOptions[index] = newSelectedMultiOptions[index].filter(
        (option) => option !== Number(value)
      );
    } else {
      newSelectedMultiOptions[index].push(Number(value));
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
          JSON.stringify(selectedMultiOptions[index].sort()) ===
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
    <div className="h-full ml-2 ">
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
            {questions.map((question, index) => (
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
                        checked={selectedMultiOptions[index].includes(
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
            isModalOpen ? "w-[90%] h-[540px] md:w-[40%]" : "hidden"
          } border-2 border-gray-400 rounded-md h-[530px] flex flex-col transition-all duration-500`}
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
                    <i className="icon-large">🤖</i>{" "}
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
              className="ml-2 px-4 py-2 text-white bg-red-500 rounded-md transition-colors duration-300"
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
