import { Button, Img, Heading, Text } from "../index.js";
import React from "react";

export default function ProductOrderDetails({
  buyAgainButtonText = "Buy it again",
  trackPackageButtonText = "Track package",
  item,
}) {
  return (
    <div
      className={` flex flex-col items-start self-stretch gap-3.5 p-3 border-gray-300 border border-solid flex-1 rounded-md`}
    >
      <div className="flex self-stretch">
        <Img
          src={item.images[0]}
          alt="Product Image"
          className="h-[162px] w-[16%] object-contain sm:w-auto sm:pr-2"
        />
        <div className="flex flex-1 items-start p-2">
          <div className="flex w-full flex-col items-start gap-4 self-center sm:gap-4">
            <div className="flex flex-col items-start justify-center gap-2 self-stretch sm:gap-2">
              <Heading
                as="h6"
                className="text-[18px] font-semibold sm:text-[15px]"
              >
                {item.title}
              </Heading>
              <Text
                size="textxs"
                as="p"
                className="text-[14px] font-normal text-blue_gray-200_01"
              >
                {`Price : ₹ ${item.price}`}
              </Text>
              <Text
                size="textxs"
                as="p"
                className="text-[14px] font-normal text-blue_gray-200_01"
              >
                {`Payment : ${item.paymentMethod}`}
              </Text>
              <Text
                size="textxs"
                as="p"
                className={`text-[14px] font-normal ${
                  item.paymentMethod === "Razorpay" && item.payment === true
                    ? "text-green-500" // Green for Success
                    : item.paymentMethod === "COD"
                    ? "text-yellow-500" // Yellow for Pending
                    : "text-red-500" // Red for Failed
                }`}
              >
                {`Payment Status: ${
                  item.paymentMethod === "Razorpay" && item.payment === true
                    ? "Success"
                    : item.paymentMethod === "COD"
                    ? "Pending"
                    : "Failed"
                }`}
              </Text>

              <Text
                size="textxs"
                as="p"
                className="text-[14px] font-normal text-blue_gray-200_01"
              >
                {`Order Placed : ${new Date(item.createdAt).toDateString()}`}
              </Text>
            </div>
            <div className="flex gap-[9px] self-stretch">
              <Button
                color="gray_100_01"
                size="xs"
                className="min-w-[62px] rounded-sm px-1.5 font-semibold"
              >
                {`Size: ${item.size}`}
              </Button>
              <Heading
                size="headingxs"
                as="p"
                className="flex items-center justify-center rounded-sm bg-gray-100_01 px-2 py-1 text-[12px] font-semibold text-gray-600"
              >
                {`Qty: ${item.quantity}`}
              </Heading>
            </div>
          </div>
          <div className="flex sm:hidden w-full flex-col items-end gap-3 sm:gap-3">
            <Button
              color="blue_gray_900_01"
              size="lg"
              shape="round"
              className="min-w-[200px] rounded-md border border-solid border-blue_gray-900_01 px-[33px] font-medium sm:px-5"
            >
              {trackPackageButtonText}
            </Button>
            <Button
              color="blue_700"
              size="lg"
              variant="outline"
              shape="round"
              className="min-w-[200px] rounded-md ! border px-[33px] font-medium sm:px-5"
            >
              {` ${
                item.paymentMethod === "Razorpay" && item.payment === true
                  ? `${item.status}`
                  : item.paymentMethod === "COD"
                  ? `${item.status}`
                  : "Payment Failed"
              }`}
            </Button>
            <Button
              color="blue_700"
              size="lg"
              variant="outline"
              shape="round"
              leftIcon={
                <Img
                  src="images/circlearrow.svg"
                  alt="Fi 545661"
                  className="mb-0.5 h-[16px] w-[16px] object-contain"
                />
              }
              className="min-w-[200px] gap-2 rounded-md ! border px-[23px] font-medium sm:px-5"
            >
              {buyAgainButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
