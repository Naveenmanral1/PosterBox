import { Text, Heading, Img } from "../../components/index.js";
import React from "react";
import {
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  Accordion,
  AccordionItem,
} from "react-accessible-accordion";

const accordionData = [
  { shippingQuestion1: "How long does shipping take?" },
  { shippingQuestion1: "Can I return or exchange items?" },
  { shippingQuestion1: "What sizes do you offer?" },
  { shippingQuestion1: "Are your products sustainable?" },
  { shippingQuestion1: "How can I contact customer support?" },
  { shippingQuestion1: "Do you offer international shipping?" },
];

export default function FAQSection() {
  return (
    <>
      <div className="self-stretch">
        <div className="flex justify-center bg-slate-50 py-[90px] md:py-5">
          <div className="container-xs flex justify-center ">
            <div className="flex w-full flex-col items-center gap-12">
              <div className="flex flex-col items-center justify-center gap-3.5">
                <Heading
                  as="h2"
                  className="text-[18px] font-semibold text-gray-600"
                >
                  FAQ
                </Heading>
                <Heading
                  size="heading4x1"
                  as="h3"
                  className="text-[30px] font-semibold md:text-[28px] sm:text-[26px]"
                >
                  Have Queries? Refer Here
                </Heading>
              </div>
              <Accordion
                preExpanded={[0]}
                className="flex flex-col gap-6 sm:gap-4 self-stretch p-5 sm:p-2"
              >
                {accordionData.map((d, i) => (
                  <AccordionItem uuid={i} key={`FAQs List${i}`}>
                    <div className="flex flex-1 flex-col gap-6 sm:gap-3 rounded-[8px] border border-solid border-blue_gray-900_01 bg-white-a700 p-6 shadow-xs sm:p-3">
                      <AccordionItemHeading className="w-full">
                        <AccordionItemButton>
                          <AccordionItemState>
                            {(props) => (
                              <>
                                <div className="flex flex-wrap items-center justify-between gap-5">
                                  <Heading
                                    as="h4"
                                    className="ml-1 self-end text-[18px] sm:text-[14px] font-semibold Itext-black-900"
                                  >
                                    {d.shippingQuestion1}
                                  </Heading>
                                  {props?.expanded ? (
                                    <Img
                                      src="images/img_arrow_up_blue.svg"
                                      alt="Expand Icon"
                                      className="h-[24px]"
                                    />
                                  ) : (
                                    <Img
                                      src="images/img_arrow_down.svg"
                                      alt="Collapse Icon"
                                      className="h-[24px]"
                                    />
                                  )}
                                </div>
                              </>
                            )}
                          </AccordionItemState>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel>
                        <div>
                          <Text
                            as="p"
                            className="text-[18px] sm:text-[14px] font-normal leading-[25px] !text-gray-600"
                          >
                           Our standard shipping typically takes 3-5
                                business days . We also offer expedited
                                shipping options for customers who need their
                                orders to arrive more quickly.
                          </Text>
                        </div>
                      </AccordionItemPanel>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
