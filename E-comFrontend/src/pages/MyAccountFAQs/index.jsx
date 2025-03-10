import React from "react";
import {
  Text,
  Img,
  Heading,
} from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import {
  AccordionItemPanel,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  Accordion,
  AccordionItem,
} from "react-accessible-accordion";

const accordionData = [
  { shippingQuestion: "How long does shipping take?" },
  { shippingQuestion: "What sizes do you offer?" },
  { shippingQuestion: "Can I return or exchange items?" },
  { shippingQuestion: "Are your products sustainable?" },
  { shippingQuestion: "How can I contact customer support?" },
  { shippingQuestion: "Do you offer international shipping?" },
];

export default function MyAccountFAQsPage() {
  return (
    <>
      <div className="flex w-full flex-col gap-[86px] bg-white-a700 md:gap-16 sm:gap-[43px]">
        <div className="flex flex-col gap-6">
          <Header />
          <div className="flex flex-col items-center">
            <div className="container-xs flex flex-col gap-6 md:px-5">
              <div className="flex items-center gap-[22px] md:flex-col">
                <div className="flex w-[28%] items-start justify-center gap-6 md:w-full">
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-4 py-3.5">
                      <Text as="p" className="text-[18px] font-medium">
                        General Information
                      </Text>
                    </div>
                    <div className="flex rounded-md bg-blue_gray-900_01 px-4 py-3">
                      <Text
                        as="p"
                        className="self-end text-[18px] font-medium text-white-a700"
                      >
                        Ordering & Shipping
                      </Text>
                    </div>
                    <div className="flex rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-4 py-3">
                      <Text
                        as="p"
                        className="mt-1 self-end text-[18px] font-medium"
                      >
                        Returns & Exchanges
                      </Text>
                    </div>
                    <div className="flex rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-4 py-3">
                      <Text as="p" className="self-end text-[18px] font-medium">
                        Payment & Discounts
                      </Text>
                    </div>
                    <div className="flex rounded-md border border-solid border-blue_gray-100 bg-white-a700 px-4 py-3.5">
                      <Text as="p" className="text-[18px] font-medium">
                        Account & Profile
                      </Text>
                    </div>
                  </div>
                  <div className="h-[712px] w-px self-center bg-gray-300" />
                </div>
                <div className="flex-1 md:self-stretch">
                  <Accordion preExpanded={[0]} className="flex flex-col gap-6">
                    {accordionData.map((d, i) => (
                      <AccordionItem uuid={i} key={`FAQs List${i}`}>
                        <div className="flex flex-1 flex-col gap-6 rounded-[12px] border border-solid border-blue_gray-900_01 bg-white-a700 p-6 sm:p-5">
                          <AccordionItemHeading className="w-full">
                            <AccordionItemButton>
                              <AccordionItemState>
                                {(props) => (
                                  <>
                                    <div className="flex flex-wrap items-center justify-between gap-5">
                                      <Heading
                                        as="h2"
                                        className="ml-1 self-end text-[18px] font-semibold"
                                      >
                                        {d.shippingQuestion}
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
                                          alt="Checkmark Icon"
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
                                className="text-[18px] font-normal leading-[25px] !text-gray-600"
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
        </div>
        <Footer />
      </div>
    </>
  );
}
