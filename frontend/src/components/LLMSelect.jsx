import React, { useState } from "react";

const LLmSelect = () => {
  const [selectedOption, setSelectedOption] = useState("Ollama");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="w-64">
      <label
        htmlFor="options"
        className="block text-sm font-medium text-gray-700"
      >
        Select an LLM Support
      </label>
      <select
        id="options"
        name="options"
        value={selectedOption}
        onChange={handleChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="Ollama">Ollama</option>
        <option value="Gemini">Gemini</option>
        <option value="ChatGpt">ChatGpt</option>
      </select>
    </div>
  );
};

export default LLmSelect;
