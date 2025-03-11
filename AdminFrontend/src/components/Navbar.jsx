import React from "react";
import {logo} from "../assets/assets.js"

const Navbar = ({setToken}) => {
  const handleLogout = () => {
    setToken('')
    console.log("User logged out");
  };

  return (
    <nav className=" bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg fixed top-0 w-full z-50">
      <img src={logo} alt=""  className="w-[42px] ml-5 " />
      <button 
        onClick={handleLogout} 
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
