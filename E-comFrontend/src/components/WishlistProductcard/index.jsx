import { Text, Heading, Img } from "../index.js";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function WishlistProductcard({ item , productData ,deleteFromWishlist, ...props }) {
  const navigate = useNavigate()
  
  return (
    <div
      
      className={`${props.className} flex flex-col w-full gap-3.5`}
    >
      <div>
          <div  className="relative h-auto w-full content-center self-stretch">
        <Img
          src={productData.images[0]}
          alt="Main Image"
          className="h-auto w-full flex-1 object-contain"
          onClick={()=>navigate(`/productdetails/${item._id}`)}
        />
        <Img
          src="images/crossdark.svg"
          onClick ={()=>deleteFromWishlist(item._id)}
          alt="Icon"
          className="absolute right-0 top-0 bg-slate-50 p-1 w-[24px] h-[24px] border border-blue-950"
        />
      </div>
      </div>
    
      <div className="flex flex-col items-center gap-3.5 self-stretch">
        <Text size="text2xl" as="p" 
        className="text-[24px] text-base sm:text-xs">
          {productData.title}
        </Text>
      </div>
    </div>
  );
}
