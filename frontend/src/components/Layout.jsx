import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex-grow ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
