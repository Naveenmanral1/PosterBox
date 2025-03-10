import { Img, Heading, Text, Button } from "../index.js";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/authSlice.js";
import Dropdown from "../Dropdown/index.jsx";


export default function Header({ ...props }) {


  const benefitsList = [
    {
      headingText: "Movie",  
      category : "Movie"
    },
    {
      headingText: "Web-Series",    
      category : "Web-Series"
    },
    {
      headingText: "Gym",   
      category  : "Gym"
    },
    {
      headingText: "F1",  
      category  : "Cars"
    },
    {
      headingText: "Cars",   
      category  : "Cars"
    },
    {
      headingText: "Anime",
      category : "Anime"
    },
    {
      headingText: "Music",      
      category : "Music"
    },
    {
      headingText: "Football",      
      category  : "Football"
    },
    {
      headingText: "Game",     
      category : "Game"
    },
    {
      headingText: "Marvel",
      category : "Marvel"
    },
    {
      headingText: "Dc",
      category  : "Dc"
    },
  ];



  const [visible, setVisible] = useState(false);
  const {setShowSearch , getCartCount , backendUrl} = useContext(ShopContext)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen , setIsOpen] = useState(false)
  const authStatus = useSelector(state => state.auth.status)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
};



const handleOnClick = (category) => {
  navigate(`/collection/${category}`);
  setVisible(false);
};
  

  const handleClick = () => {
    if (authStatus === true) {
      
      navigate("/myaccountpersonalinformation");
    } else {
      navigate('/signin');
    }
  };

  return (
    <header {...props}>

      <div className="flex  sm:h-16 justify-center border-b border-solid border-gray-600 bg-white-a700 py-1">
        <img
          onClick={() => setVisible(true)}
          src="/images/burger.svg"
          alt=""
          className="mt-6 sm:mt-4 h-[24px] sm:w-[16px] w-[24px] ml-3 cursor-pointer md:block hidden object-contain"
        />

        <div className="container  flex items-center justify-evenly gap-5">
          <Link to="/">
            <Img
              src="/poster/logo.png"
              alt="Header Logo"
              className="h-[72px] w-[72px] object-contain ml-2"
            />
          </Link>
          <div className="md:hidden ">
            <ul className="flex flex-wrap gap-5">
              <li>
                <a >
                  <Heading
                    size="headings"
                    as="p"
                    className="text-[14px] font-thin"
                    onClick={()=> navigate('/productlist')}
                  >
                    Shop Poster
                  </Heading>
                </a>
              </li>
              <li>
                <a href="#" className="cursor-pointer">
                  <Heading
                    size="headings"
                    as="p"
                    className="text-[14px] font-thin text-gray-00 hover:text-blue_gray-900_01"
                  >
                    Custom Poster
                  </Heading>
                </a>
              </li>
       
            </ul>
          </div>

          <div className="flex gap-5 sm:gap-4 mr-8 justify-center items-center  ">
            <input
              className=" rounded-full border border-black px-4 py-2 font-thin text-sm  focus:border-gray-500 focus:ring-0 outline-none"
              placeholder="Search here"
              type="text"
            />

            <a href="#">
              <Img
                src="/images/search.svg"
                onClick = {()=>setShowSearch(true)}
                alt="Search Icon"
                className="h-[24px] sm:h-12"
              />
            </a>
            <Link to="/wishlist">
              <Img
                src="/images/heart.svg"
                alt="Favorite Icon"
                className="h-[24px] sm:h-12"
              />
            </Link>
            <Link to="/shoppingcart" className="relative">
              <Img src="/images/cart.svg" alt="Bag Icon" className="h-[24px] sm:h-12" />
              <p className="absolute right-[-10px] bottom-[-5px] sm:bottom-[9px] sm:right-[-9px] w-4 text-center leading-4 bg-black-900 text-white-a700 aspect-square rounded-full text-[8px] ">
                {getCartCount()}
              </p>
            </Link>
            <div className="md:hidden">
              <Img src="/images/user.svg" onClick={handleClick} alt="Lock Icon" className=" h-[24px] sm:h-12" />
            </div>
            <div className="hidden md:block z-10" >
              <Img src="/images/user.svg" onClick={toggleDropdown} alt="Lock Icon" className="h-[24px] sm:h-12" />
              {isOpen && (<Dropdown/>)}
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar menu */}

      <div
        className={`absolute top-0 left-0 bottom-0 h-full overflow-hidden bg-white-a700 z-50 transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-900">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src="/images/img_arrow_left.svg" alt="" className="h-4" />
            <p>Back</p>
          </div>
          <div>
            <button 
            className=" px-5  mb-3 font-medium text-lg"
            onClick={()=> navigate('/productlist')}
            > Shop Poster</button>
          </div>

          <div className="flex flex-col px-5 gap-3 items-start font-medium text-lg">
            {
              benefitsList.map((item,index)=> (
                <button 
                key={index} 
                onClick={()=>handleOnClick(item.category) }>
                  {item.headingText}
                </button>
              ))
            }
          </div>
        
       
        </div>
      </div>
    </header>
  );
}
