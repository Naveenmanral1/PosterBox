import { Img, Text, Heading, Button, Input } from "../index.js";
import React from "react";

export default function Footer() {
  return (
    <footer className={`flex flex-col`}>
      <div className=" w-screen flex-col items-center self-stretch bg-slate-900 text-slate-50 bg-blue_gray-900_01 py-10 p-4 sm:py-5">
        <div className="container-xs flex flex-col gap-[106px] md:gap-[79px] md:px-5 sm:gap-[53px]">
          <div className="flex items-start justify-between gap-5 md:flex-col">
            <div className="flex w-[46%] flex-col gap-9 md:w-full">
              <Img
                src="/poster/logo.png"
                alt="Fashion Image"
                className="w-20 "
              />
              <div className="flex flex-col gap-[18px]">
                <Text
                  size="textmd"
                  as="p"
                  className="text-[16px] font-normal leading-[26px] !text-white-a700"
                >
                  Art Speaks Here: Your Ultimate Poster Destination! Explore
                  Stunning Collections, Shop Unique Designs, and Let Your Walls
                  Tell Your Story! 🎨🖼️
                </Text>
                <div className="flex items-center gap-2.5">
                  <Img
                    src="/images/img_lock_white_a700.svg"
                    alt="Email Icon"
                    className="h-[24px]"
                  />
                  <Text
                    size="textmd"
                    as="p"
                    className="self-end text-[16px] font-normal text-white-a700"
                  >
                    PosterBox@gmail.com
                  </Text>
                </div>
              </div>
            </div>
            <div className="mr-[54px] flex w-[42%] items-start justify-between gap-5 self-center md:mr-0 md:w-full sm:flex-col">
              <div className="flex w-[42%] flex-col items-start gap-3.5 sm:w-full">
                <Heading
                  size="headingmd"
                  as="h6"
                  className="text-[16px] font-bold text-white-a700"
                >
                  Category
                </Heading>
                <ul className="flex flex-col items-start gap-4">
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Cars Poster
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Anime Poster
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Movie Poster
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Cricket Poster
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Game Poster
                    </Text>
                  </li>
                </ul>
              </div>
              <div className="flex w-[42%] flex-col items-start gap-3.5 sm:w-full">
                <Heading
                  size="headingmd"
                  as="h6"
                  className="text-[16px] font-bold text-white-a700"
                >
                  Company
                </Heading>
                <ul className="flex flex-col items-start gap-4">
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      About
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Privacy Policy
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Term & Conditions
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Partners
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Contact
                    </Text>
                  </li>
                </ul>
              </div>
              <div className="flex  flex-col items-start gap-3.5">
                <Heading
                  size="headingmd"
                  as="h6"
                  className="text-[16px] font-bold text-white-a700"
                >
                  Resources
                </Heading>
                <ul className="flex flex-col items-start gap-4">
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Blog
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Tools
                    </Text>
                  </li>
                  <li>
                    <Text
                      size="textmd"
                      as="p"
                      className="text-[16px] font-normal !text-gray-200"
                    >
                      Support
                    </Text>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <Text
              size="textmd"
              as="p"
              className="self-end text-[16px] font-normal !text-white-a700_cc"
            >
              2025 All Right Reserved
            </Text>
            <div className=" flex  gap-5">
              <Img
                src="/images/instagram.svg"
                alt="Instagram Icon"
                className="h-[24px]"
              />
              <Img
                src="/images/twitter.svg"
                alt="Twitter Icon"
                className="h-[24px]"
              />
              <Img
                src="/images/facebook.svg"
                alt="Facebook Icon"
                className="h-[24px]"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
