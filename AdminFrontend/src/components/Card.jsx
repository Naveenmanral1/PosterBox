import React from "react";

export default function Card({ deleteProduct, item }) {
  return (
    <div
      className={` flex flex-col w-full  items-start self-stretch gap-3.5 p-3 border-gray-300 border border-solid flex-1 rounded-md`}
    >
      <div className="flex self-stretch">
        <img
          src={item.images[0]}
          alt="Product Image"
          className="h-[162px] w-[16%] object-contain sm:w-auto sm:pr-2"
        />
        <div className="flex flex-1 items-start p-2 ml-6">
          <div className="flex w-full flex-col items-start gap-4 self-center sm:gap-4">
            <div className="flex flex-col justify-around gap-1 self-stretch ">
              <div as="h6" className="text-base font-semibold ">
                {`Title : ${item.title}`}
              </div>
              <div
                size="textxs"
                as="p"
                className="text-base font-normal text-blue_gray-200_01"
              >
                {`Price : ₹ ${item.price}`}
              </div>
              <div
                size="textxs"
                as="p"
                className="text-base font-normal text-blue_gray-200_01"
              >
                {`Category : ${item.category}`}
              </div>
              <div
                size="textxs"
                as="p"
                className="text-base font-normal text-blue_gray-200_01"
              >
                {`Stock : ${item.stock}`}
              </div>
              <div
                size="textxs"
                as="p"
                className="text-base font-normal text-blue_gray-200_01"
              >
                {`Sizes : ${item.sizes}`}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center  gap-3 sm:gap-3  p-2 h-full">
            <button
              color="blue_gray_900_01"
              size="lg"
              shape="round"
              onClick={() => deleteProduct(item._id)}
              className="min-w-[200px] rounded-md border p-2 bg-gray-950 text-white text-lg border-solid border-gray-900 px-[33px] font-medium "
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
