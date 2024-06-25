import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaVideo } from "react-icons/fa";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdAssignment } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const lectures = ["Lists", "Dictionary", "Tuples", "Recursion"];

const assignments = ["Assignment 1", "Assignment 2", "Assignment 3"];

const progAssignments = ["PA 1", "PA 2", "PA 3"];

const Course = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();

  const sliderOpenChange = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className="flex h-full px-[10px] md:px-[80px] relative">
      <div className="Sidebar sticky top-16 z-40 w-[25%] hidden md:flex md:w-[20%] flex-col h-full border-r border-gray-300">
        <div className="flex flex-col">
          <div className="flex flex-col my-2  pb-2">
            <h1 className="flex gap-2 items-center">
              <span className="text-[18px]">
                <FaVideo />
              </span>
              <span className="font-[600] text-[16px]">Lectures</span>
            </h1>

            <div className="pl-[5px]">
              {lectures.map((lecture, index) => (
                <h1
                  onClick={() =>
                    navigate(
                      `/user-dashboard/courses/courseId/lectures/lectureId`
                    )
                  }
                  key={index}
                  className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                >
                  <span className="font-[600] cursor-pointer">{lecture}</span>
                </h1>
              ))}
            </div>
          </div>

          <hr />

          <div className="flex flex-col my-2  pb-2">
            <h1 className="flex gap-2 items-center">
              <span className="text-[18px]">
                <MdAssignment />
              </span>
              <span className="font-[600] text-[16px]">Assignments</span>
            </h1>
            <div className="pl-[5px]">
              {assignments.map((assignment, index) => (
                <h1
                  onClick={() =>
                    navigate(
                      `/user-dashboard/courses/courseId/assignments/assignmentId`
                    )
                  }
                  key={index}
                  className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                >
                  <span className="font-[600] cursor-pointer">
                    {assignment}
                  </span>
                </h1>
              ))}
            </div>
          </div>

          <hr />

          <div className="flex flex-col my-2">
            <h1 className="flex gap-2 items-center">
              <span className="text-[18px]">
                <HiMiniComputerDesktop />
              </span>
              <span className="font-[600] text-[16px]">Lectures</span>
            </h1>
            <div className="pl-[5px]">
              {progAssignments.map((progAssignment, index) => (
                <h1
                  onClick={() =>
                    navigate(`/user-dashboard/courses/courseId/pa/paId`)
                  }
                  key={index}
                  className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                >
                  <span className="font-[600] cursor-pointer">
                    {progAssignment}
                  </span>
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="Sidebar block md:hidden w-[5%] h-full ">
        <button onClick={sliderOpenChange} className="p-2">
          {isSliderOpen ? (
            <span>
              <FaArrowLeft />
            </span>
          ) : (
            <span>
              <FaArrowRight />
            </span>
          )}
        </button>
      </div>

      <div
        className={`Sidebar-collapsed md:hidden fixed top-0 left-0 h-full mt-16 w-[50%] bg-gray-100 border-r border-gray-300 z-30 transform transition-transform duration-300 ease-in-out ${
          isSliderOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col  ">
          <button onClick={sliderOpenChange} className="p-2">
            <span>
              <FaArrowLeft />
            </span>
          </button>
          <div className="flex flex-col my-2  pb-2 ml-4">
            <h1 className="flex gap-2 items-center">
              <span className="text-[18px]">
                <FaVideo />
              </span>
              <span className="font-[600] text-[16px]">Lectures</span>
            </h1>

            <div className="pl-[5px]">
              {lectures.map((lecture, index) => (
                <h1
                  onClick={() =>
                    navigate(
                      `/user-dashboard/courses/courseId/lectures/lectureId`
                    )
                  }
                  key={index}
                  className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                >
                  <span className="font-[600] cursor-pointer">{lecture}</span>
                </h1>
              ))}
            </div>
          </div>

          <hr />

          <div className="flex flex-col my-2  pb-2 ml-4">
            <h1 className="flex gap-2 items-center">
              <span className="text-[18px]">
                <MdAssignment />
              </span>
              <span className="font-[600] text-[16px]">Assignments</span>
            </h1>
            <div className="pl-[5px]">
              {assignments.map((assignment, index) => (
                <h1
                  onClick={() =>
                    navigate(
                      `/user-dashboard/courses/courseId/assignments/assignmentId`
                    )
                  }
                  key={index}
                  className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                >
                  <span className="font-[600] cursor-pointer">
                    {assignment}
                  </span>
                </h1>
              ))}
            </div>
          </div>

          <hr />

          <div className="flex flex-col my-2 ml-4">
            <h1 className="flex gap-2 items-center">
              <span className="text-[18px]">
                <HiMiniComputerDesktop />
              </span>
              <span className="font-[600] text-[16px]">Lectures</span>
            </h1>
            <div className="pl-[5px]">
              {progAssignments.map((progAssignment, index) => (
                <h1
                  onClick={() =>
                    navigate(`/user-dashboard/courses/courseId/pa/paId`)
                  }
                  key={index}
                  className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                >
                  <span className="font-[600] cursor-pointer">
                    {progAssignment}
                  </span>
                </h1>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rightBar w-[75%] md:w-[80%] h-full overflow-y-auto scroll-smooth custom-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default Course;
