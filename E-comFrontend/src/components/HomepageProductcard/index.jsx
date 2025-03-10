import { useContext, useEffect, useState } from "react";
import React from "react";
import {Link} from "react-router-dom"
import {ShopContext} from "../../context/ShopContext"
//import { addToCart } from "../../store/cartSlice";
//import { useSelector , useDispatch } from "react-redux";
//import { toast } from "react-toastify";

 
export default function HompepageProductcard({ 
  images , id , title , price, sizes =[],
  ...props })  {
  const [size, setSize] = useState("A4");
 // const [priceOf, setPriceOf] = useState(299);
//  const [cartItems , setCartItems] = useState({})
  const {currency , addToCart} = useContext(ShopContext)

  return (
    <div className="max-w-x mx-auto mb-5 bg-white  overflow-hidden ">
     
      <Link to={`/productdetails/${id}`}>
       <div className="w-full">
        <img
          src={ `${images?.[0]}`}
          alt="Manifestation | Gautama Buddha #01"
          className="w-full object-cover"
        />
      </div>
      </Link>

     
      <div className="p-4 sm:p-1 text-center">
        <h2 className="text-xs font-thin font-inter text-gray-700">
          {title}
        </h2>
        <p className="text-base sm:text-xs font-thin sm:mt-1 text-gray-900 mt-2">From Rs. {currency}{price}.00</p>

       
        
        <div className="mt-3 sm:mt-1">

          <select
            
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full p-2 sm:p-1 font-thin text-sm sm:text-xs border rounded-md text-gray-700 focus:ring-2 focus:ring-black"
          >
            
            {
              sizes.map((item, index) => (

                <option key={index} >{item}</option>
              ))
            }
          </select>
        </div>

        
        <button 
        onClick={() => addToCart(id,size)}
         className="mt-4 sm:mt-2 w-full bg-slate-950 text-white-a700 py-2 sm:py-1 rounded-md font-medium sm:text-sm hover:bg-gray-800 transition">
          Add to cart
        </button>
      </div>
    </div>
  );
};


