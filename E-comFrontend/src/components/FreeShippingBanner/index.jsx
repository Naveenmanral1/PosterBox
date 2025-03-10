import { Text, Heading, Img } from "../index.js";
import React from "react";

export default function FreeShippingBanner({
  headingText = "Free Shipping",
  descriptionText = "",
  images = "poster/10010.jpg",
  ...props
}) {
  return (
    <div
      {...props}
      className="flex flex-col items-center justify-center text-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:w-auto"
    >
      <Img
        src={images}
        alt="Thumbnail Image"
        className="w-[220px] inline-block mt-1 cursor-pointer hover:scale-105 ease-in-out duration-300"
      />
      <Heading className="text-sm md:text-base font-medium ">
        {headingText} 
      </Heading>
    </div>
  );
}
