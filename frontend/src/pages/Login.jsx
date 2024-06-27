import React from "react";
import OAuth from "../components/OAuth";

const Login = () => {
  return (
    <div class="h-screen">
      <div class="h-full flex flex-col items-center justify-center ">
        <div class="w-[400px] flex flex-col shadow-xl border border-gray-200 rounded-[18px] px-4 py-14 text-center">
          <h1 class="font-bold text-[18px]">Sign in to App</h1>

          <h1 class=" mt-[4px] text-[14px]">
            Welcome back! Please sign in to continue
          </h1>

          <button class="flex gap-2 mt-[24px] items-center mx-auto   hover:text-white">
            <OAuth />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
