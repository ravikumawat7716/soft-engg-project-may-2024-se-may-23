import React from "react";
import { GiEgyptianBird } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = async () => {
    await dispatch(logout());
    navigate(`/signin`);
  };

  return (
    <div className="h-16 flex-shrink-0 flex justify-between items-center px-[10px] md:px-[80px] border-b border-gray-400 bg-gray-100 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div>
        <img src="/download.png" className="h-[28px] w-[28px]" alt="Download" />
        </div>
        <span className="font-semibold">StudyBuddy</span>
      </div>

      <div className="flex items-center gap-6">
        {currentUser && (
          <div className="flex items-center gap-4">
            <span className="font-semibold">{currentUser.role}</span>
            <img
              src={currentUser.profileURL}
              className="h-[32px] w-[32px] rounded-full"
            />
            <div className="hidden md:flex flex-col">
              <span className="text-[12px]">{currentUser.name}</span>
              <span className="text-[12px]">{currentUser.email}</span>
            </div>
          </div>
        )}

        {currentUser ? (
          <button
            onClick={logoutUser}
            className="px-4 py-2 border border-gray-400 rounded-full hover:text-white hover:bg-red-700"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => navigate("/signin")}
            className="px-4 py-2 border border-gray-400 rounded-full hover:text-white hover:bg-red-700"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
