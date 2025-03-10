import { Img, Heading, Text } from "../index.js";
import React from "react";



export default function ProductDetails1({
  productData,
  currency,
  item,
  updateQuantity
}) {

  
  return (
    <div
     
      className={` flex md:flex-col justify-center items-start self-stretch p-3 border-gray-300 border border-solid flex-1 rounded-md`}
    >
      <div className="flex flex-1 p-5 sm:p-0 md:self-stretch">
        <div className="relative h-[148px] w-[18%] sm:w-[25%] content-center sm:h-auto sm:mr-2">
          <Img
            src={productData.images[0]}
            alt="Product Image"
            className="h-[148px]  sm:h-[120px] w-auto flex-1 object-cover"
          />
      
        </div>
        <div className="flex flex-1 flex-col gap-5 p-1.5 sm:gap-3">
          <div className="ml-2 flex flex-col items-start justify-center gap-1.5 sm:ml-0 sm:gap-1.5">
            <Heading
              as="h6"
              className="text-[18px] font-semibold sm:text-[15px]"
            >
             { productData.title}
            </Heading>
            <Text
              size="textxs"
              as="p"
              className="text-[14px] font-normal !text-blue_gray-200_01"
            >
              sellerInfo
            </Text>
          </div>
          <div className="mx-2 flex gap-[9px] sm:mx-0">
           
            <label className="font-semibold text-xs pt-1 px-1 bg-neutral-100 text-slate-500">{`Size: ${item.size}`}</label>
            <label className="font-semibold text-xs pt-1 px-1 bg-neutral-100 text-slate-500">Qty :</label>
           <input
              type="number"
              min={1} 
              onChange={(e)=>e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item._id , item.size,Number(e.target.value) )}           
              defaultValue={item.quantity}
              className="w-[14%] font-semibold rounded-sm border border-gray-300 focus:outline-none appearance-none text-center"
            />

            </div>
            <div className="mx-2 flex flex-wrap sm:mx-0">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[16px] font-bold sm:text-[13px]"
              >
                {currency}{productData.price}
              </Heading>
              <Text
                size="textmd"
                as="p"
                className="ml-2 text-[16px] font-normal text-gray-700 line-through sm:text-[13px]"
              >
                199
              </Text>
              <Heading
                size="headingmd"
                as="h6"
                className="ml-2 text-[16px] font-bold text-teal-400 sm:text-[13px]"
              >
                (50%)
              </Heading>
            </div>
          </div>
           <div>
          <Img
          src="images/crossdark.svg"
          onClick = {()=>updateQuantity(item._id,item.size , 0)}
          alt="Secondary Icon"
          className="h-[24px] "
        />
        </div>
        </div>
       
        
      </div>
  );
}
