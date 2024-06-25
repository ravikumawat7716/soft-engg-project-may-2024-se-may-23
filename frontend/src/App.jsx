import { useState } from "react";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/user-dashboard" element={<UserDashboard />}></Route>
          </Route>
          <Route path="/signin" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
