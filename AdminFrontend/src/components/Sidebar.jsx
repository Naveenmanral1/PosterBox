import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div className=" flex  flex-col items-center gap-4 md:w-full">
      <div
        onClick={() => navigate("/add")}
        className={`flex self-stretch rounded-md px-4 py-3.5 ${
          isActive("/add") ? "bg-gray-950 " : "bg-white border border-gray-300"
        }`}
      >
        <div
          as="p"
          className={`text-[18px] font-medium  ${
            isActive("/add") ? "text-white " : "text-black"
          }`}
        >
          Add Items
        </div>
      </div>

      <div
        onClick={() => navigate("/list")}
        className={`flex self-stretch rounded-md px-4 py-3.5 ${
          isActive("/list") ? "bg-gray-950 " : "bg-white border border-gray-300"
        }`}
      >
        <div
          as="p"
          className={`text-[18px] font-medium  ${
            isActive("/list") ? "text-white " : "text-black"
          }`}
        >
          Items List
        </div>
      </div>

      <div
        onClick={() => navigate("/order")}
        className={`flex self-stretch rounded-md px-4 py-3.5 ${
          isActive("/order")
            ? "bg-gray-950 "
            : "bg-white border border-gray-300"
        }`}
      >
        <div
          as="p"
          className={`text-[18px] font-medium  ${
            isActive("/order") ? "text-white " : "text-black"
          }`}
        >
          Orders List
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
