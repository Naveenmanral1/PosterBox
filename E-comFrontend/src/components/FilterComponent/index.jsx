import {  CheckBox, Img, Heading } from "../index.js";
import React from "react";

export default function FilterComponent({
  brandTitle = "Category",
  brandTitle2 = "Sizes",
  toggleCategory,
  toggleSize,
  ...props
}) {


  return (
    <div
      {...props}
      className={`${props.className} flex  pl-5 py-3 mt-6 flex-col  flex-1`}
    >
      <div>
         <div className="flex items-center justify-between mb-2 gap-5 ">
        <Heading size="headingmd" as="h6" className="flex text-[16px] mb-3 font-semibold">
          {brandTitle}
        </Heading>
        <Img
          src="images/img_arrow_up_blue.svg"
          alt="Brands Arrow"
          className="h-[24px] mb-2"
        />
      </div>
      <div className=" flex flex-col text-sm font-light gap-2 space-y-1 text-gray-700">
        <CheckBox
          name="Dc"
          label="Dc"
          id="Dc"
          value="Dc"
          onChange={(e) => toggleCategory(e)}
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
         <CheckBox
          name="Marvel"
          label="Marvel"
          id="Marvel"
          value="Marvel"
          onChange={(e) => toggleCategory(e)}
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
         <CheckBox
          name="Game"
          label="Game"
          id="Game"
          value="Game"
          onChange={(e) => toggleCategory(e)}
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Cars"
          label="Cars"
            value="Cars"
            onChange={(e) => toggleCategory(e)}
          id="Cars"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Movie"
          label="Movie"
          value="Movie"
          onChange={(e) => toggleCategory(e)}
          id="Movie"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Web-Series"
          label="Web-Series"
          value="Web-Series"
          onChange={(e) => toggleCategory(e)}
          id="Web-Series"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Music"
          label="Music"
          value="Music"
          onChange={(e) => toggleCategory(e)}
          id="Music"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
         <CheckBox
          name="Superhero"
          label="Anime"
          value="Anime"
          onChange={(e) => toggleCategory(e)}
          id="Superhero"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Gym"
          label="Gym"
          value="Gym"
          onChange={(e) => toggleCategory(e)}
          id="Gym"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Cricket"
          label="Cricket"
          value="Cricket"
          onChange={(e) => toggleCategory(e)}
          id="Cricket"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="Football"
          label="Football"
          value="Football"
          onChange={(e) => toggleCategory(e)}
          id="Football"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
     
      </div>
      </div>
      <div className="mt-5">
         <div className="flex items-center justify-between mb-2 gap-5 ">
        <Heading size="headingmd" as="h6" className="flex text-[16px] mb-3 font-semibold">
          {brandTitle2}
        </Heading>
        <Img
          src="images/img_arrow_up_blue.svg"
          alt="Brands Arrow"
          className="h-[24px] mb-2"
        />
      </div>
      <div className=" flex flex-col text-sm font-light gap-2 space-y-1 text-gray-700">
        <CheckBox
          name="Superhero"
          label="A6"
          value="A6"
          onChange={(e) => toggleSize(e)}
          id="Superhero"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="A5"
          label="A5"
          value="A5"
          onChange={(e) => toggleSize(e)}
          id="A5"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="A4"
          label="A4"
          value="A4"
          onChange={(e) => toggleSize(e)}
          id="A4"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="A3"
          label="A3"
          value="A3"
          onChange={(e) => toggleSize(e)}
          id="A3"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        <CheckBox
          name="A2"
          label="A2"
          value="A2"
          onChange={(e) => toggleSize(e)}
          id="A2"
          className="gap-4 text-[16px] text-blue_gray-900_01"
        />
        
     
      </div>
      </div>
     
    </div>
  );
}
