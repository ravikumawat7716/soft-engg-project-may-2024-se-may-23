import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="bg-red-500 rounded-md w-[100px] px-4 py-2 cursor-pointer"
        onClick={() => navigate(`/user-dashboard`)}
      >
        <h1 className="text-white text-[14px] ">My DashBoard</h1>
      </div>
    </div>
  );
};

export default Home;
