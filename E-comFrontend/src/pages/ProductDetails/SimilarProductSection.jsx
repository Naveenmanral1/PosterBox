import HompepageProductcard from "../../components/HomepageProductcard";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import React, { Suspense } from "react";
import { useState , useEffect } from "react";

export default function SimilarProductsSection() {

  const {products} = useContext(ShopContext)
   const [bestSelling , setBestSelling] = useState([])
  
   useEffect(() => {
    const bestProducts = products.filter((item) =>(item.category === "Anime"))
    setBestSelling(bestProducts.slice(0,4))
   },[])

  return (
     <>
          <div className="self-stretch overflow-x-hidden">
            <div className="flex justify-center ">
              <div className="container-xs flex justify-center md:px-5">
                <div className="flex w-full flex-col gap-12 bg-white-a700">
                  <div className="w-full flex items-center justify-center mt-5">
                    <img src="/poster/10027.png" alt="" className="h-[84px]"/>
                  </div>
                  <div className="w-full overflow-hidden ">
                    <div className="grid grid-cols-4 md:grid-cols-2  md:grid-row lg:grid-cols-4 gap-4">
                      <Suspense fallback={<div>Loading feed...</div>}>
                        {bestSelling.map((d, index) => (
                          <HompepageProductcard {...d} id={d._id} images={d.images} title={d.title} price={d.price} key={"productList" + index} />
                        ))}
                      </Suspense>
                      
                    </div>
                    <div className="flex justify-center mb-5">
                    <button className=" px-8 py-4 bg-slate-950 text-white-a700  rounded-lg font-medium hover:bg-gray-800 transition">
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
