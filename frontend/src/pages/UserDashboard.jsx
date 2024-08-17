import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiActivity } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ApiUrl } from "../config";

const features = [
  { icon: HiAcademicCap, text: "My Courses" },
  { icon: FaCertificate, text: "My Certificates" },
  { icon: FiActivity, text: "Documents for download" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [activeFeature, setActiveFeature] = useState("My Courses");

  useEffect(() => {
    const getCourses = async () => {
      try {
        const res = await axios.get(`${ApiUrl}/courses`);
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="flex h-full bg-gray-100">
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="Sidebar w-64 bg-white shadow-lg p-6 flex flex-col h-full"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-bold text-2xl mb-8 flex items-center gap-2 text-indigo-700"
        >
          <MdDashboard />
          <span>My Dashboard</span>
        </motion.h1>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFeature(feature.text)}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                activeFeature === feature.text
                  ? "bg-indigo-100 text-indigo-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <feature.icon className="text-xl" />
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <div className="flex-1 p-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6 text-gray-800"
        >
          {activeFeature}
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/user-dashboard/courses/${course._id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer transition-all duration-300"
            >
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600">
                  {course.description || "No description available"}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;