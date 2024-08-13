import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/create-lecture" element={<AddLecture />} />
            <Route path="/create-assignment" element={<CreateAssignment />} />
            <Route path="/create-pa" element={<CreatePA />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
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
          <Route path="/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
