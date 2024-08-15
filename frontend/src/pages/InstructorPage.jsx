import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const InstructorPage = () => {
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="flex h-[100%] bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-red-600 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold text-center bg-red-800">
          Instructor Dashboard
        </div>
        <nav className="mt-10 flex-1 pl-[50px]">
          <button
            className="w-full text-left px-4 py-2 hover:bg-red-700 transition duration-200"
            onClick={() => navigate("/create-lecture")}
          >
            Add Lecture
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-red-700 transition duration-200"
            onClick={() => navigate("/create-course")}
          >
            Add Course
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-red-700 transition duration-200"
            onClick={() => navigate("/create-assignment")}
          >
            Create Assignment
          </button>
          <button
            className="w-full text-left px-4 py-2 hover:bg-red-700 transition duration-200"
            onClick={() => navigate("/create-pa")}
          >
            Create Programming Assignment
          </button>
        </nav>
        <div className="p-4 text-sm text-center bg-gray-900">
          © 2024 Your Company
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow p-4">
          <div className="text-xl font-semibold text-gray-800">
            Welcome, Instructor
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">{currentUser.name}</div>
            <img
              src={currentUser.profileURL}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 bg-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cards for different sections */}
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-800">Lectures</h2>
              <p className="text-gray-600 mt-2">Manage your lectures.</p>
              <button
                className="mt-4 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition"
                onClick={() => navigate("/create-lecture")}
              >
                Add Lecture
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
              <p className="text-gray-600 mt-2">Manage your courses.</p>
              <button
                className="mt-4 bg-purple-600 text-white w-full py-2 rounded-md hover:bg-purple-700 transition"
                onClick={() => navigate("/create-course")}
              >
                Add Course
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Assignments
              </h2>
              <p className="text-gray-600 mt-2">Manage your assignments.</p>
              <button
                className="mt-4 bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600 transition"
                onClick={() => navigate("/create-assignment")}
              >
                Create Assignment
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Programming Assignments
              </h2>
              <p className="text-gray-600 mt-2">Manage programming tasks.</p>
              <button
                className="mt-4 bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition"
                onClick={() => navigate("/create-pa")}
              >
                Create Programming Assignment
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InstructorPage;
