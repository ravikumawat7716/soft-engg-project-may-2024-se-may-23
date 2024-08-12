import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex space-x-2">
        <div className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce"></div>
        <div className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce"></div>
        <div className="w-2.5 h-2.5 bg-red-700 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Loading;
