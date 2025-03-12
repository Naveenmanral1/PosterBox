import React from "react";
import { logo } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    setToken("");
    navigate("/");
    console.log("User logged out");
  };

  return (
    <>
      <div className="flex  h-20 justify-center border-b border-solid border-gray-100 shadow-md bg-white py-1">
        <div className="container  flex items-center justify-between gap-5 mx-12 ">
          <img
            src={logo}
            alt="Header Logo"
            className="h-[48px] w-[48px] object-contain ml-2"
          />
          <div className="flex gap-5 sm:gap-4 mr-8 justify-center items-center">
            <button
              onClick={handleLogout}
              className="bg-gray-950 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
