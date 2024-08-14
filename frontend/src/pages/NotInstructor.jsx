import React from "react";
import { Link } from "react-router-dom";

const NotInstructor = () => {
  return (
    <div className="h-full w-full">
      <div className="flex justify-center items-center flex-col gap-4">
        <img src="/attencion.png" className="w-[100px] h-[100px] mt-[150px]" />
        <h1 className="text-[22px] font-semibold">You are not an Instructor</h1>
        <Link to="/" className="hover:text-blue-500">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotInstructor;
