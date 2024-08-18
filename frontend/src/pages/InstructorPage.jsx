import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const InstructorPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-600 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold text-center bg-red-800 shadow-md">
          Instructor Dashboard
        </div>
        <nav className="mt-10 flex-1 px-4 space-y-4">
          {[
            { label: "Add Lecture", path: "/create-lecture" },
            { label: "Add Course", path: "/create-course" },
            { label: "Create Assignment", path: "/create-assignment" },
            { label: "Create Programming Assignment", path: "/create-pa" },
          ].map((item, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 bg-red-700 rounded-lg hover:bg-red-800 transition duration-300 ease-in-out"
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 text-sm text-center bg-gray-900">
          © SE Team 23 , IITM 2024
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-lg p-6">
          <div className="text-xl font-semibold text-gray-800">
            Welcome, Instructor
          </div>

          <Link className="text-blue-500 font-[700] hover:scale-110" to="/">
            User Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">{currentUser.name}</div>
            <img
              src={currentUser.profileURL}
              alt="Profile"
              className="w-10 h-10 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                label: "Lectures",
                description: "Manage your lectures.",
                bgColor: "bg-blue-600",
                hoverBg: "bg-blue-700",
                path: "/create-lecture",
              },
              {
                label: "Courses",
                description: "Manage your courses.",
                bgColor: "bg-purple-600",
                hoverBg: "bg-purple-700",
                path: "/create-course",
              },
              {
                label: "Assignments",
                description: "Manage your assignments.",
                bgColor: "bg-yellow-500",
                hoverBg: "bg-yellow-600",
                path: "/create-assignment",
              },
              {
                label: "Programming Assignments",
                description: "Manage programming tasks.",
                bgColor: "bg-green-600",
                hoverBg: "bg-green-700",
                path: "/create-pa",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.label}
                </h2>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <button
                  className={`mt-4 ${item.bgColor} text-white w-full py-2 rounded-md hover:${item.hoverBg} transition`}
                  onClick={() => navigate(item.path)}
                >
                  {`Add ${item.label.split(" ")[0]}`}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorPage;
