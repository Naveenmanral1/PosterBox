import { Button, Img, Text, Heading } from "../../components";
import React from "react";

export default function CustomSection() {
  return (
    <>
      <div className="w-full">
        <div className="w-full ">
          <div className=" flex justify-center sm:px-0 md:px-5">
            <div className="flex w-full items-center ">
              <Img
                src="poster/10005.jpg"
                alt="Women Image"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
