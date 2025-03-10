import HompepageProductcard from "../../components/HomepageProductcard";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function CollagePacks() {
  const { products } = useContext(ShopContext);
  const [poster, setPoster] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.category === "Cars");
    setPoster(bestProducts.slice(0, 4));
  }, [products]);

  return (
    <>
      <div className="self-stretch">
        <div className="flex justify-center ">
          <div className="container-xs flex justify-center md:px-5">
            <div className="flex w-full flex-col gap-12 bg-white-a700">
              <div className="w-full flex items-center justify-center mt-5">
                <img src="poster/10030.png" alt="" className="h-[64px]" />
              </div>
              <div className="w-full overflow-hidden">
                <div className="grid grid-cols-4 md:grid-cols-2 md:grid-row lg:grid-cols-4 gap-4">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {poster.map((d, index) => (
                      <HompepageProductcard
                        {...d}
                        id={d._id}
                        images={d.images}
                        title={d.title}
                        price={d.price}
                        key={"productList" + index}
                      />
                    ))}
                  </Suspense>
                </div>
                <div className="flex justify-center mb-5">
                  <button className=" px-8 py-4 bg-slate-950 text-white-a700 rounded-lg font-medium hover:bg-gray-800 transition">
                    view all
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
