import { Img, Text, Heading } from "../../components";
import React from "react";
import { TabPanel, TabList, Tab, Tabs } from "react-tabs";

export default function ProductDetailsSection() {
  return (
    <>
      <div className="self-stretch">
        <Tabs
          className="flex flex-col items-center self-stretch"
          selectedTabClassName="!text-blue_gray-900_01"
          selectedTabPanelClassName="!relative tab-panel-selected"
        >
          <div className="container-xs flex flex-col gap-6 md:px-5">
            <TabList className="hidden  flex-wrap items-start gap-[70px] border-b border-solid border-blue_gray-100_01 px-[18px] md:gap-5">
              <Tab className="mb-2.5 text-[16px] font-medium uppercase text-blue_gray-400">
                Description
              </Tab>
              <Tab className="text-[16px] font-medium uppercase text-blue_gray-400">
                ADDITIONAL INFORMATION
              </Tab>
              <Tab className="text-[16px] font-medium uppercase text-blue_gray-400">
                Review (40)
              </Tab>
            </TabList>
            {[...Array(3)].map((_, index) => (
              <TabPanel
                key={`tab-panel${index} `}
                className="absolute items-center"
              >
                <div className="w-full">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-start gap-3.5">
                      <Heading
                        as="h2"
                        className="text-[18px] font-semibold !text-blue_gray-900"
                      >
                        Product Details
                      </Heading>
                      <Text
                        size="textmd"
                        as="p"
                        className="w-full text-[16px] font-normal sm:text-[12] leading-7 text-gray-600"
                      >
                        Our high-resolution prints ensure vibrant colors and
                        crisp details, available in various sizes to fit any
                        space. Choose from glossy, matte, or canvas finishes for
                        a professional touch. Personalize with your own artwork,
                        images, or text, and enjoy fade-resistant, long-lasting
                        quality. Perfect for home décor, offices, events,
                        promotions, and gifting!
                      </Text>
                    </div>
                    <div className="flex gap-2 w-full justify-center">
                      <div>
                        <Img
                          src="/poster/3.png"
                          alt="Main Image"
                          className="h-full"
                        />
                      </div>

                      <div className="space-y-4 sm:space-y-1">
                        <Img
                          src="/poster/1.png"
                          alt="Main Image"
                          className=""
                        />
                        <Img
                          src="/poster/2.png"
                          alt="Main Image"
                          className=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            ))}
          </div>
        </Tabs>
      </div>
    </>
  );
}
