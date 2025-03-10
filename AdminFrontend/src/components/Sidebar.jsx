import React from "react";
import {NavLink} from 'react-router-dom'
import img from '../assets/add.png'
import {add , list , order } from '../assets/assets.js'

const Sidebar = () => {
    return (
      <div className=" fixed left-0 top-16 h-full w-[18%] ">
      <div className="bg-gray-800 h-screen text-white p-4 flex flex-col space-y-4">
          <NavLink 
          className="flex items-center gap-3 justify-center bg-gray-100 hover:bg-gray-300 py-2 px-2 rounded-lg transition-all"
          to="/add">
            <img className="w-5 h-5" src={add} alt="" />
            <p className="hidden md:block text-black">Add Items</p>
          </NavLink>

          <NavLink 
          className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-300 py-2 px-2 rounded-lg transition-all"
          to="/list">
            <img className="w-6 h-6" src={list} alt="" />
            <p className="hidden md:block text-black">Items List</p>
          </NavLink>

          <NavLink 
          className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-300 py-2 px-2 rounded-lg transition-all"
          to="/order">
            <img className="w-6 h-6" src={order} alt="" />
            <p className="hidden md:block text-black">Orders</p>
          </NavLink>

      </div>
</div>

    );
  }; 

  export default Sidebar;