import React, { useState } from "react";
import {
  Text,
  Heading,
  Button,
  Img,
} from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductDetailsSection from "./ProductDetailsSection";
import SimilarProductsSection from "./SimilarProductSection";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useEffect } from "react";
import Collections from "../Homepage/Collections";


export default function ProductDetailsPage() {

  const [images , setImages] = useState('')
  const {productId} = useParams();
  const {products , currency , addToCart , addToWishlist , wishlistItem}  = useContext(ShopContext)
  const [productData , setProductData] = useState(false)
  const [size , setSize] = useState('')
  const [wishlisted , setWishlisted] = useState(false)
 

  const fetchProductData = async () => {
    products.map((item) => {
      if(item._id === productId){
         setProductData(item)
         setImages(item.images[0])
      return null;
      }
     
    })
  }

  const isWishlisted = async()=> {
    for(const items in wishlistItem){
      if(items === productId){
       setWishlisted(true)
      }
    }
  }

  

  useEffect(() => {
    fetchProductData();
    isWishlisted();
  },[productId , products])
 
  return productData ? (
    <>

      <div className="flex w-full flex-col  items-center gap-[88px] bg-white-a700 md:gap-[66px] sm:gap-11">
        
        <div className="flex flex-col gap-6 self-stretch">
          <Header />
          <div className="flex  items-center">
            <div className="container-xs flex flex-col gap-[46px] ">
              <div className="flex  gap-12 sm:gap-3 md:flex-col">
                <div className="flex flex-1 gap-2 ">
                  <div className="flex w-[240px] md:w-[90px] sm:hidden flex-col gap-5">
                    {
                      productData.images.map((item , index) => (
                         <Img
                      src={item}
                      key={index}
                      alt="Rectangle Image 1"
                      className="   "
                      onClick = {()=> setImages(item)}
                    />
                      ))
                    }
                  </div>
                  <Img
                    src={images }
                    alt="Featured Image "
                    className="h-full w-[82%] object-contain md:w-full"
                  />
                  
                </div>
                <div className="flex w-[48%] p-5 flex-col sm:gap-4 gap-[34px] md:w-full ">
                  <div className="flex flex-col items-start justify-center gap-0.5">
                    <Heading
                      size="heading2xl"
                      as="h3"
                      className="text-[24px] font-bold md:text-[22px]"
                    >
                      {productData.title}
                    </Heading>
                   
                  </div>
                  <div className="flex gap-2">
                    <div className="flex flex-wrap gap-2">
                      <Heading
                        size="heading2xl"
                        as="h4"
                        className="text-[24px] font-bold md:text-[22px]"
                      >
                       {currency} {productData.price}
                      </Heading>
                      <Text
                        size="text2xl"
                        as="p"
                        className="text-[24px] font-normal !text-gray-500_01 line-through md:text-[22px]"
                      >
                        199.00
                      </Text>
                    </div>
                    <Heading
                      size="heading2xl"
                      as="h5"
                      className="text-[24px] font-bold text-teal-400 md:text-[22px]"
                    >
                      (50% OFF)
                    </Heading>
                  </div>
                  <div className="flex flex-col gap-9 sm:mt-3">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-center">
                        <Heading as="h6" className="text-[18px] font-semibold">
                          SELECT SIZE
                        </Heading>
                        <div className="flex flex-1 gap-[7px] px-[34px] sm:px-5">
                          <Text
                            size="textmd"
                            as="p"
                            className="text-[16px] font-light !text-blue-700"
                          >
                            SIZE CHART
                          </Text>
                          <Img
                            src="/images/img_arrow_right.svg"
                            alt="Size Chart Icon"
                            className="h-[18px]"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4">
                        {
                          productData.sizes.map((item,index) => (
                            <button
                          as="button"
                          onClick={()=>setSize(item)}
                          key={index}
                          className={`flex h-[62px] w-[62px] sm:w-[48px]  sm:h-[48px] items-center justify-center  rounded-[30px] border border-solid border-blue_gray-100_01 text-center text-[18px] font-semibold 
                          ${item === size ? 'bg-slate-950 text-white-a700' : ''}`}
                        >
                          {item}
                        </button>
                          ))
                        }
                      
                      </div>
                    </div>
                    <div className="flex sm:flex-col w-full  gap-4">
                   
                        <Button
                          color="blue_gray_900_01"
                          shape="round"
                          className="sm:w-full w-full rounded-md px-[34px] font-medium sm:px-5"
                          onClick = {()=> addToCart(productData._id , size)}
                        >
                          ADD TO CART
                        </Button>
                    
                        <Button
                          color="blue_gray_900_01"
                          variant="outline"
                          shape="round"
                          onClick={()=>addToWishlist(productData._id)}
                          leftIcon={
                            <Img
                              src={wishlisted ? "/images/fillheart.svg" : "/images/heart.svg"}
                              alt="Favorite"
                              className="h-[24px] w-[24px] object-contain "
                            />
                          }
                          className=" gap-2 rounded-md border px-[19px] font-medium w-full sm:w-full"
                        >
                          WISHLIST
                        </Button>
                      
                    </div>
                  </div>
                  <div className="h-px bg-gray-300" />
                  <div className="flex flex-col items-start justify-center gap-2.5">
                    <Heading as="h6" className="text-[18px] font-bold">
                      BEST OFFERS
                    </Heading>
                    <div className="flex flex-wrap gap-2.5 self-stretch">
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-gray-600"
                      >
                        Special offer get 25% off
                      </Text>
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-blue-700"
                      >
                        T&C
                      </Text>
                    </div>
                    <div className="flex flex-wrap gap-[11px] self-stretch">
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal text-gray-600"
                      >
                        Get 30% off on Axis Bank Credit card
                      </Text>
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-blue-700"
                      >
                        T&C
                      </Text>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 self-stretch">
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-gray-600"
                      >
                        Special offer get 25% off
                      </Text>
                      <Text
                        size="textmd"
                        as="p"
                        className="text-[16px] font-normal !text-blue-700"
                      >
                        T&C
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <ProductDetailsSection  />
        
        <SimilarProductsSection />
         <Collections />
        <Footer className="self-stretch" />
      </div>
    </>
  ): <div>
    loading
  </div>
}
