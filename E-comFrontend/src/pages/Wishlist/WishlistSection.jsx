import React, { Suspense } from "react";
import WishlistProductcard from "../../components/WishlistProductcard";
import { useState , useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

export default function WishlistSection() {
   const [wishlistData , setWishlistData] = useState([])
    const {products , wishlistItem , deleteFromWishlist} = useContext(ShopContext)

    useEffect(() => {
      if(products.length > 0){
        const tempData = [];
        for(const items in wishlistItem ){
           if(wishlistItem[items]){
            tempData.push({_id : items})
           }
        }
        setWishlistData(tempData)
      }
    },[wishlistItem,products])

    
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="container-xs flex flex-col gap-12 md: px-5">
          <div className="grid grid-cols-4 justify-center gap-12 sm:gap-4 md:grid-cols-2 sm:grid-cols-2">
            <Suspense fallback={<div>Loading feed...</div>}>
              {wishlistData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                 return <WishlistProductcard item={item} deleteFromWishlist={deleteFromWishlist} productData={productData} key={"productData" + index} />
               })}
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
