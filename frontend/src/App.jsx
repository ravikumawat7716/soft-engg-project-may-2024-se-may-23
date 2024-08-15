import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import Course from "./pages/Course";
import Lecture from "./pages/Lacture";
import Assignment from "./pages/Assignment";
import ProgrammingAssignment from "./pages/ProgrammingAssignment";
import CourseIntro from "./pages/CourseIntro";
import CreateCourse from "./pages/CreateCourse";
import AddLecture from "./pages/AddLecture";
import CreateAssignment from "./pages/CreateAssignment";
import CreatePA from "./pages/CreatePA";
import InstructorPage from "./pages/InstructorPage";
import NotInstructor from "./pages/NotInstructor";
import { useSelector } from "react-redux";

function App() {
  const [count, setCount] = useState(0);

  const { currentUser } = useSelector((state) => state.auth);

  const InstructorRoute = ({ element }) => {
    if (currentUser && currentUser.role === "instructor") {
      return element;
    } else {
      return <Navigate to="/not-instructor" />;
    }
  };

  const UserRoute = ({ element }) => {
    if (currentUser) {
      return element;
    } else {
      return <Navigate to="/signin" />;
    }
  };

  const AlreadyLogin = ({ element }) => {
    if (currentUser) {
      return <Navigate to="/" />;
    } else {
      return element;
    }
  };

  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={<UserRoute element={<UserDashboard />} />}
            />
            <Route
              path="/create-course"
              element={<InstructorRoute element={<CreateCourse />} />}
            />
            <Route
              path="/create-lecture"
              element={<InstructorRoute element={<AddLecture />} />}
            />
            <Route
              path="/create-assignment"
              element={<InstructorRoute element={<CreateAssignment />} />}
            />
            <Route
              path="/create-pa"
              element={<InstructorRoute element={<CreatePA />} />}
            />
            <Route
              path="/user-dashboard"
              element={<UserRoute element={<UserDashboard />} />}
            />
            <Route
              path="/instructor"
              element={<InstructorRoute element={<InstructorPage />} />}
            />
            <Route path="/not-instructor" element={<NotInstructor />} />
            <Route
              path="/user-dashboard/courses/:courseId"
              element={<Course />}
            >
              <Route path="" element={<CourseIntro />} />
              <Route path="lectures/:lectureId" element={<Lecture />} />
              <Route
                path="assignments/:assignmentId"
                element={<Assignment />}
              />
              <Route path="pa/:pa_id" element={<ProgrammingAssignment />} />
            </Route>
          </Route>
          <Route
            path="/signin"
            element={<AlreadyLogin element={<Login />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
