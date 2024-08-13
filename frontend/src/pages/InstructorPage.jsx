import React from "react";
import { useNavigate } from "react-router-dom";

const InstructorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex justify-center">
      <div className="flex flex-col gap-2 mx-auto mt-[50px]">
        <h1 className="text-[20px] font-[800] text-center mb-[25px]">
          Instructor Panel
        </h1>

        <div className="flex flex-col gap-4">
          <button
            className="bg-gray-500 rounded-md w-[200px] px-6 py-4 cursor-pointer "
            onClick={() => navigate("/create-lecture")}
          >
            <h1 className="text-white text-[18px] font-[600]">Add Lecture</h1>
          </button>

          <button
            className="bg-purple-500 rounded-md w-[200px] px-6 py-4 cursor-pointer"
            onClick={() => navigate("/create-course")}
          >
            <h1 className="text-white text-[18px] font-[600]">Add Course</h1>
          </button>

          <button
            className="bg-yellow-500 rounded-md w-[200px] px-6 py-4 cursor-pointer"
            onClick={() => navigate("/create-assignment")}
          >
            <h1 className="text-white text-[18px] font-[600]">
              Create Assignment
            </h1>
          </button>

          <button
            className="bg-blue-500 rounded-md w-[200px] px-6 py-4 cursor-pointer"
            onClick={() => navigate("/create-pa")}
          >
            <h1 className="text-white text-[18px] font-[600]">
              Create Programming Assignment
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructorPage;
