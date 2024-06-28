import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBars, FaVideo } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { MdAssignment } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";

const lectures = ["Lists", "Dictionary", "Tuples", "Recursion"];

const assignments = ["Assignment 1", "Assignment 2", "Assignment 3"];

const progAssignments = ["PA 1", "PA 2", "PA 3"];

const Course = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();

  const [ltoggle, setLtoggle] = useState(false);
  const [atoggle, setAtoggle] = useState(false);
  const [patoggle, setPAtoggle] = useState(false);

  const sliderOpenChange = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <div className="flex h-full px-[10px] md:px-[80px] relative">
      <div className="Sidebar sticky top-16 z-40 w-[25%] hidden md:flex md:w-[20%] flex-col h-full border-r border-gray-300">
        <div className="flex flex-col">
          <div className="flex flex-col my-2  pb-2">
            <div
              className="flex items-center justify-between hover:cursor-pointer transition-all duration-500"
              onClick={() => setLtoggle(!ltoggle)}
            >
              <div className="flex justify-between items-center w-full mr-4">
                <h1
                  className={`text-lg flex gap-4 items-center font-semibold ${
                    ltoggle ? "text-red-700" : "text-gray-800"
                  }`}
                >
                  <span className="text-[18px]">
                    <FaVideo />
                  </span>
                  <span className="font-[600] text-[14px]">Lectures</span>
                </h1>

                {ltoggle ? (
                  <IoIosArrowUp className="text-red-700" />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>
            </div>

            <div
              className={`pl-[20px] content-div transition-max-height duration-500 ease-in-out overflow-hidden ${
                ltoggle ? "max-h-screen" : "max-h-0"
              }`}
            >
              {ltoggle &&
                lectures.map((lecture, index) => (
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

          <hr className="border-0 h-[2px] bg-gradient-to-r bg-red-700 mr-4" />

          <div className="flex flex-col my-2  pb-2">
            <div
              className="flex items-center justify-between hover:cursor-pointer transition-all duration-500"
              onClick={() => setAtoggle(!atoggle)}
            >
              <div className="flex justify-between items-center w-full mr-4">
                <h1
                  className={`text-lg flex gap-2 items-center font-semibold ${
                    atoggle ? "text-red-700" : "text-gray-800"
                  }`}
                >
                  <span className="text-[18px]">
                    <MdAssignment />
                  </span>
                  <span className="font-[600] text-[16px]">Assignments</span>
                </h1>

                {atoggle ? (
                  <IoIosArrowUp className="text-red-700" />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>
            </div>

            <div
              className={`pl-[20px] transition-max-height duration-500 ease-in-out overflow-hidden ${
                atoggle ? "max-h-screen" : "max-h-0"
              } `}
            >
              {atoggle &&
                assignments.map((assignment, index) => (
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

          <hr className="border-0 h-[2px] bg-gradient-to-r bg-red-700 mr-4 " />

          <div className="flex flex-col my-2 pb-2">
            <div
              className="flex items-center justify-between hover:cursor-pointer transition-all duration-500"
              onClick={() => setPAtoggle(!patoggle)}
            >
              <div className="flex justify-between items-center w-full mr-4">
                <h1
                  className={`text-lg flex gap-2 items-center font-semibold ${
                    patoggle ? "text-red-700" : "text-gray-800"
                  }`}
                >
                  <span className="text-[18px]">
                    <HiMiniComputerDesktop />
                  </span>
                  <span className="font-[600] text-[16px]">
                    Pragramming Assignments
                  </span>
                </h1>

                {patoggle ? (
                  <IoIosArrowUp className="text-red-700" />
                ) : (
                  <IoIosArrowDown />
                )}
              </div>
            </div>

            <div
              className={`pl-[20px] transition-max-height duration-500 ease-in-out overflow-hidden ${
                patoggle ? "max-h-screen" : "max-h-0"
              } `}
            >
              {patoggle &&
                progAssignments.map((assignment, index) => (
                  <h1
                    onClick={() =>
                      navigate(`/user-dashboard/courses/courseId/pa/pa_id`)
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
        </div>
      </div>

      <div className="Sidebar block md:hidden w-[5%] h-full ">
        <button onClick={sliderOpenChange} className="p-2">
          <span className="hover:text-red-700">
            <FaBars />
          </span>
        </button>
      </div>

      <div
        className={`Sidebar-collapsed md:hidden  fixed top-0 left-0 h-full mt-16 w-[50%] bg-gray-100 border-r border-gray-300 z-30 transform transition-transform duration-300 ease-in-out ${
          isSliderOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col ">
          <button onClick={sliderOpenChange} className="p-2 absolute right-2">
            <span className=" flex gap-1 items-center">
              <ImCross className="font-[500] hover:text-red-800" />
            </span>
          </button>
          <div className="flex flex-col ml-4 mt-6">
            <div className="flex flex-col my-2  pb-2">
              <div
                className="flex items-center justify-between hover:cursor-pointer transition-all duration-500"
                onClick={() => setLtoggle(!ltoggle)}
              >
                <div className="flex justify-between items-center w-full mr-4">
                  <h1
                    className={`text-lg flex gap-4 items-center font-semibold ${
                      ltoggle ? "text-red-700" : "text-gray-800"
                    }`}
                  >
                    <span className="text-[18px]">
                      <FaVideo />
                    </span>
                    <span className="font-[600] text-[14px]">Lectures</span>
                  </h1>

                  {ltoggle ? (
                    <IoIosArrowUp className="text-red-700" />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
              </div>

              <div
                className={`pl-[20px] content-div transition-max-height duration-500 ease-in-out overflow-hidden ${
                  ltoggle ? "max-h-screen" : "max-h-0"
                }`}
              >
                {ltoggle &&
                  lectures.map((lecture, index) => (
                    <h1
                      onClick={() => {
                        navigate(
                          `/user-dashboard/courses/courseId/lectures/lectureId`
                        );
                        setIsSliderOpen(!isSliderOpen);
                      }}
                      key={index}
                      className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center"
                    >
                      <span className="font-[600] cursor-pointer">
                        {lecture}
                      </span>
                    </h1>
                  ))}
              </div>
            </div>

            <hr className="border-0 h-[2px] bg-gradient-to-r bg-red-700 mr-4" />

            <div className="flex flex-col my-2  pb-2">
              <div
                className="flex items-center justify-between hover:cursor-pointer transition-all duration-500"
                onClick={() => setAtoggle(!atoggle)}
              >
                <div className="flex justify-between items-center w-full mr-4">
                  <h1
                    className={`text-lg flex gap-2 items-center font-semibold ${
                      atoggle ? "text-red-700" : "text-gray-800"
                    }`}
                  >
                    <span className="text-[18px]">
                      <MdAssignment />
                    </span>
                    <span className="font-[600] text-[16px]">Assignments</span>
                  </h1>

                  {atoggle ? (
                    <IoIosArrowUp className="text-red-700" />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
              </div>

              <div
                className={`pl-[20px] transition-max-height duration-500 ease-in-out overflow-hidden ${
                  atoggle ? "max-h-screen" : "max-h-0"
                } `}
              >
                {atoggle &&
                  assignments.map((assignment, index) => (
                    <h1
                      onClick={() => {
                        navigate(
                          `/user-dashboard/courses/courseId/assignments/assignmentId`
                        );
                        setIsSliderOpen(!isSliderOpen);
                      }}
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

            <hr className="border-0 h-[2px] bg-gradient-to-r bg-red-700 mr-4 " />

            <div className="flex flex-col my-2 pb-2">
              <div
                className="flex items-center justify-between hover:cursor-pointer transition-all duration-500"
                onClick={() => setPAtoggle(!patoggle)}
              >
                <div className="flex justify-between items-center w-full mr-4">
                  <h1
                    className={`text-lg flex gap-2 items-center font-semibold ${
                      patoggle ? "text-red-700" : "text-gray-800"
                    }`}
                  >
                    <span className="text-[18px]">
                      <HiMiniComputerDesktop />
                    </span>
                    <span className="font-[600] text-[16px]">
                      Pragramming Assignments
                    </span>
                  </h1>

                  {patoggle ? (
                    <IoIosArrowUp className="text-red-700" />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </div>
              </div>

              <div
                className={`pl-[20px] transition-max-height duration-500 ease-in-out overflow-hidden ${
                  patoggle ? "max-h-screen" : "max-h-0"
                } `}
              >
                {patoggle &&
                  progAssignments.map((assignment, index) => (
                    <h1
                      onClick={() => {
                        navigate(`/user-dashboard/courses/courseId/pa/pa_id`);
                        setIsSliderOpen(!isSliderOpen);
                      }}
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
