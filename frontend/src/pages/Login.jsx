import React from "react";
import OAuth from "../components/OAuth";

const Login = () => {
  return (
    <div className="h-screen">
      <div className="h-full flex flex-col items-center justify-center ">
        <div className="w-[400px] flex flex-col shadow-xl border border-gray-200 rounded-[18px] px-4 py-14 text-center">
          <h1 className="font-bold text-[18px]">Sign in to App</h1>

          <h1 className=" mt-[4px] text-[14px]">
            Welcome back! Please sign in to continue
          </h1>

          <div className="flex gap-2 mt-[24px] items-center mx-auto   hover:text-white">
            <OAuth />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;