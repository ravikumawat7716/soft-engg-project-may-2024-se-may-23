import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaVideo, FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { ImCross } from "react-icons/im";
import { MdAssignment } from "react-icons/md";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import { ApiUrl } from "../config";

const Course = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const [activeSection, setActiveSection] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [pa, setPa] = useState([]);

  const fetchData = async (endpoint, setter) => {
    try {
      const res = await axios(`${ApiUrl}/${endpoint}/${params.courseId}`);
      setter(res.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData("lectures", setLectures);
    fetchData("assignments", setAssignments);
    fetchData("programming_assignments", setPa);
  }, [params.courseId]);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 },
  };

  const ToggleButton = ({ isOpen, onClick, icon, text }) => (
    <motion.div
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-all duration-300"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl text-indigo-600">{icon}</span>
        <span className="font-semibold text-gray-700">{text}</span>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <IoIosArrowDown
          className={isOpen ? "text-indigo-600" : "text-gray-400"}
        />
      </motion.div>
    </motion.div>
  );

  const ContentList = ({ items, onItemClick, renderItem }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="pl-6 overflow-hidden"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onItemClick(item)}
          className="py-2 text-sm text-gray-600 hover:text-indigo-600 cursor-pointer"
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  );

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`flex flex-col space-y-4 p-4 ${isMobile ? "mt-16" : ""}`}>
      {isMobile && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsSliderOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-indigo-600"
        >
          <ImCross />
        </motion.button>
      )}
      {[
        {
          key: "lectures",
          icon: <FaVideo />,
          text: "Lectures",
          data: lectures,
        },
        {
          key: "assignments",
          icon: <MdAssignment />,
          text: "Assignments",
          data: assignments,
        },
        ...(pa.length > 0
          ? [
              {
                key: "pa",
                icon: <HiMiniComputerDesktop />,
                text: "Programming Assignments",
                data: pa,
              },
            ]
          : []),
      ].map(({ key, icon, text, data }) => (
        <div key={key}>
          <ToggleButton
            isOpen={activeSection === key}
            onClick={() => setActiveSection(activeSection === key ? null : key)}
            icon={icon}
            text={text}
          />
          <AnimatePresence>
            {activeSection === key && (
              <ContentList
                items={data}
                onItemClick={(item) =>
                  navigate(
                    `/user-dashboard/courses/${params.courseId}/${key}/${item._id}`
                  )
                }
                renderItem={(item, index) => (
                  <span>
                    {item.title || `${text.slice(0, -1)} ${index + 1}`}
                  </span>
                )}
              />
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-full bg-gray-50">
      <motion.div
        className="hidden md:flex w-64 bg-white shadow-lg"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SidebarContent />
      </motion.div>

      <div className="md:hidden">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSliderOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
        >
          <FaBars className="text-indigo-600" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isSliderOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSliderOpen(false)}
          >
            <motion.div
              className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent isMobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex-1 p-6 md:p-10 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

export default Course;
