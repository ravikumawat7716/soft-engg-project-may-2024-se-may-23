import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full justify-center items-center">
      <div className="flex flex-col gap-4">
        <button
          className="bg-red-500 rounded-md w-[200px] px-4 py-2 cursor-pointer"
          onClick={() => navigate("/user-dashboard")}
        >
          <h1 className="text-white text-[14px]">My DashBoard</h1>
        </button>

        <button
          className="bg-gray-500 rounded-md w-[200px] px-4 py-2 cursor-pointer"
          onClick={() => navigate("/create-lecture")}
        >
          <h1 className="text-white text-[14px]">Add Lecture</h1>
        </button>

        <button
          className="bg-purple-500 rounded-md w-[200px] px-4 py-2 cursor-pointer"
          onClick={() => navigate("/create-course")}
        >
          <h1 className="text-white text-[14px]">Add Course</h1>
        </button>

        <button
          className="bg-yellow-500 rounded-md w-[200px] px-4 py-2 cursor-pointer"
          onClick={() => navigate("/create-assignment")}
        >
          <h1 className="text-white text-[14px]">Create Assignment</h1>
        </button>

        <button
          className="bg-blue-500 rounded-md w-[200px] px-4 py-2 cursor-pointer"
          onClick={() => navigate("/create-pa")}
        >
          <h1 className="text-white text-[14px]">
            Create Programming Assignment
          </h1>
        </button>
      </div>
    </div>
  );
};

export default Home;