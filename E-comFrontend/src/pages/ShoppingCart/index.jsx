import React, { Suspense  , useState } from "react";
import Header from "../../components/Header";
import TotalPrice from "./totalPrice";
import ProductDetails1 from "../../components/ProductDetails1";
import Footer from "../../components/Footer";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useEffect } from "react";
import Bestselling from "../Homepage/BestSelling";

export default function ShoppingCartPage() {

  const {products ,currency , cartItems , updateQuantity } = useContext(ShopContext)
  const [cartData , setCartData] = useState([]);

  useEffect(() => {

    if(products.length > 0){
          const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if(cartItems[items][item] > 0){
          tempData.push({
            _id : items,
            size : item,
            quantity : cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
    }
  },[cartItems , products])


  return (
    <>
     
      <div className="flex w-full flex-col gap-[88px] bg-white-a700 md:gap-[66px] sm:gap-11">
        <div className="flex flex-col gap-6">
          <Header />
          <div className="flex flex-col items-center">
            <div className="container-xs flex flex-col gap-[46px] md:px-5">
             
              <div className="flex gap-6 md:flex-col">
                <div className="flex flex-1 flex-col gap-[22px] md:self-stretch">
                  <div className="flex flex-col gap-4">
                    <Suspense fallback={<div>Loading feed...</div>}>
                    
                      {cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);
                        return <ProductDetails1 item={item} currency={currency} updateQuantity={updateQuantity} productData={productData} key={"productList" + index} />
                         } )}
                    </Suspense>
                  </div>
                </div>
                <TotalPrice/>
              </div>
            </div>
          </div>
        </div>

        <Bestselling />
       <Footer/>
      </div>
    </>
  );
}
