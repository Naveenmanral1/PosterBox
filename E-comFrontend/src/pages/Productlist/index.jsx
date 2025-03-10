import React, { Suspense } from "react";
import { useState , useEffect } from "react";
import HompepageProductcard from "../../components/HomepageProductcard";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import _ from "lodash"
import {
  Img,
  Heading,
} from "../../components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterComponent from "../../components/FilterComponent";



export default function ProductlistPage() {

   const {products} = useContext(ShopContext)
   const [poster , setPoster] = useState([])
   const [filter , setFilter] = useState(false)
   const [category , setCategory] = useState([])
   const [sizes , setSizes] = useState([])
   const [sortType , setSortType] = useState('relavent')

   const shuffledProduct = _.shuffle(products)

   const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev =>[...prev , e.target.value])
    }
   }

   const toggleSize = (e) => {
    if(sizes.includes(e.target.value)){
      setSizes(prev => prev.filter(item => item !== e.target.value))
    }else{
      setSizes(prev =>[...prev , e.target.value])
    }
   }

   const sortProduct = () => {
    let fpCopy = poster.slice();

    switch(sortType){
      case 'low-high':
        setPoster(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setPoster(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;

      default : 
       applyFilter();
       break;
    }
   }

   const applyFilter = () => {
    let productsCopy = shuffledProduct.slice();
    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if(sizes.length > 0){
      productsCopy = productsCopy.filter(item => item.sizes.some(s => sizes.includes(s)));
    }
    setPoster(productsCopy)
   }

      useEffect(() => {
      applyFilter();
      },[ category , sizes,products])

      useEffect(() => {
        sortProduct();
      },[sortType])


      if (!products || products.length === 0) {
        return (
          <div className="w-full h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
        );
      }

 

  return (
    <>
  
      <div className="flex w-full flex-col gap-[90px] bg-white-a700 md:gap-[67px] sm:gap-[45px]">
        <div className="flex flex-col gap-6">
          <Header />
          
          <div className="flex flex-col items-center">
            <div className="container-xs flex flex-col gap-[46px] md:px-5">
              <div className="flex justify-end">
              <div>
                <select onChange={(e)=>setSortType(e.target.value)} className=" text-sm px-2" id="">
                  <option value="relavent">Sort by : Relavent  </option>
                  <option value="low-high">Sort by : Low to High</option>
                  <option value="high-low">Sort by : High to Low</option>
                </select>
              </div>
              </div>
             
              

              <div className="flex items-start gap-12 sm:gap-2 md:flex-col">
                <div className={`flex w-[20%] flex-col items-start gap-3 md:w-full `}>
                  <Heading onClick={()=>setFilter(!filter)} as="h2" className="flex gap-5 ml-5 sm:ml-0 mt-2 text-[18px] font-bold">
                    Filters
                      <Img
                              src="images/img_arrow_up_blue.svg"
                              alt="Brands Arrow"
                              className={`h-[24px] mb-2 md:block hidden ${filter ? '' : 'rotate-90' }`}
                            />
                  </Heading>
                  <div className={`flex flex-col gap-1.5 self-stretch ${filter ? '' : 'hidden' } lg:block `}>
                 
                    <div className="flex flex-col gap-1.5 md:flex-row sm:flex-col">

                      <FilterComponent toggleCategory={toggleCategory} toggleSize={toggleSize} />

                      
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-12 self-center md:self-stretch">
                  <div className="grid grid-cols-3 justify-center gap-6 sm:gap-2 md:grid-cols-2 sm:grid-cols-2">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {poster.map((d, index) => (
                      <HompepageProductcard {...d} id={d._id} images={d.images} title={d.title} price={d.price} key={"productList" + index} />
                    ))}
                  </Suspense>
                  </div>
                  
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
