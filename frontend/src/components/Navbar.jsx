import React from "react";
import { GiEgyptianBird } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="h-16 flex-shrink-0 flex justify-between items-center px-[10px] md:px-[80px] border-b border-gray-400 bg-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div>
          <GiEgyptianBird className="h-[24px] w-[24px]" />
        </div>
        <span className="font-semibold">Coursera</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <span className="font-semibold">Student</span>
          <img
            src="https://media.licdn.com/dms/image/C5103AQEv1nBXNAmuOw/profile-displayphoto-shrink_400_400/0/1540870660730?e=1724284800&v=beta&t=t5GRaGMxx_xyhbSTZpaK1xbJFLYLhOVEkzhcumhsELM"
            className="h-[32px] w-[32px] rounded-full"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-[12px]">lokesh</span>
            <span className="text-[12px]">lokesh@mail.com</span>
          </div>
        </div>
        <button className="px-4 py-2 border border-gray-400 rounded-full hover:text-white hover:bg-red-700">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
