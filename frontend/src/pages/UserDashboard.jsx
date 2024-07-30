import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCertificate } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../config";

const features = [
  "My Courses",
  "My Certificates",
  "Activities",
  "Performances",
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState(null);

  const getCourses = async () => {
    const res = await axios({
      url: `${ApiUrl}/courses`,
    });

    console.log(res.data);
    setCourses(res.data);
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex h-full px-[10px] md:px-[80px]">
      <div className="Sidebar w-[25%] md:w-[20%] flex flex-col h-full border-r border-gray-300">
        <h1 className="font-semibold text-[12px] md:text-[18px] mt-10 flex gap-2 items-center">
          <span>
            <MdDashboard />
          </span>
          <span>My dashboard</span>
        </h1>

        <div className="mt-4 flex flex-col">
          <h1 className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center">
            <span>
              <HiAcademicCap />
            </span>
            <span>My Courses</span>
          </h1>

          <h1 className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center">
            <span>
              <FaCertificate />
            </span>
            <span>My Certificates</span>
          </h1>

          <h1 className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center">
            <span>
              <FiActivity />
            </span>
            <span>Activities</span>
          </h1>

          <h1 className="text-[12px] md:text-[14px] mt-2 flex gap-1 items-center">
            <span>
              <FaArrowTrendUp />
            </span>
            <span>Performances</span>
          </h1>
        </div>
      </div>

      <div className="rightBar w-[75%] md:w-[80%] h-full">
        <div className="flex flex-col gap-5 mt-10 ml-[80px] ">
          <h1 className="font-semibold">My Courses</h1>
          <div className="flex flex-wrap gap-8">
            {courses &&
              courses.map((course, index) => (
                <div
                  onClick={() =>
                    navigate(`/user-dashboard/courses/${course._id}`)
                  }
                  key={index}
                  className="border border-gray-400 rounded-xl flex items-center justify-center h-[200px] w-[200px] bg-red-700"
                >
                  <h1 className="text-white">{course.title}</h1>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
