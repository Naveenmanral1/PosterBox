import React, { useState } from 'react'
import { createContext } from 'react'
import { useEffect } from 'react';
import axios from "axios"
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import api from '../services/api';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    
    const currency = '₹';
    const deliveryFee = 50;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search , setSearch] = useState('')
    const [showSearch , setShowSearch] = useState(false)
    const [cartItems , setCartItems] = useState({})
    const [wishlistItem , setWishlistItem] = useState({})
    const [products , setProducts] = useState([])
    const authStatus = useSelector(state => state.auth.status)
    const {accessToken} = useSelector((state) => state.auth)
    

    const addToCart = async(itemId , size) => {

      if(!size){
        toast.error('Select Product Size' , { position: "top-right", autoClose: 2000 })
        return;
      }
    
      //structuredClone
      let cartData = structuredClone(cartItems)
      if(cartData[itemId]){
        if(cartData[itemId][size]){
        cartData[itemId][size] += 1;
      }else{
        cartData[itemId][size] = 1;
      }
      }else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
      }
      setCartItems(cartData)

      toast.success("Product added to cart!", { position: "top-center", autoClose: 2000 });

      if(authStatus){
        try {
         await api.post(backendUrl + '/api/v1/cart/addtocart',{itemId , size})
        } catch (error) {
          console.log(error)
        }
      }
    }


    const addToWishlist = async(itemId) => {
      let wishlistData = structuredClone(wishlistItem)
      if(wishlistData[itemId]){
        return;
      }else{
        wishlistData[itemId]=true;
      }
      setWishlistItem(wishlistData)
      toast.success("Product added to wishlist!", { position: "top-center", autoClose: 2000 });
      if(authStatus){
        try{
          await api.post(backendUrl + '/api/v1/wishlist/addtowishlist',{itemId })
        }catch(error){
        console.log(error)
      }
        }
    }

    const getCartCount = () => {
      let totalCount = 0;
      for(const items in cartItems){
        for(const item in cartItems[items]){
          try {
            if(cartItems[items][item] > 0){
              totalCount += cartItems[items][item]
            }
          } catch (error) {
          }
        }
      }
      return totalCount
    }

    const updateQuantity = async (itemId,size,quantity) => {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if(authStatus){
        try {
          await api.post(backendUrl + '/api/v1/cart/updatecart',{itemId , size , quantity})
        } catch (error) {
          console.log(error)
        }
      }
    }

    const getUserCart = async () => {
      if(!accessToken) return;
      try {
        const response = await api.post(backendUrl + '/api/v1/cart/get-cart',{})
        if(response.data.success){
          setCartItems(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

  

    const getUserWishlist = async( ) => {
      if(!accessToken) return;
      try {
        const response = await api.get(backendUrl + '/api/v1/wishlist/mywishlist')
        if(response.data.success){
           setWishlistItem(response.data.data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const deleteFromWishlist = async(itemId)=> {
      try {
       const response = await api.delete(backendUrl + '/api/v1/wishlist/remove',{data :{itemId}})
       if(response.status === 200){
        let updatedWishlist = {...wishlistItem};
        delete updatedWishlist[itemId];
        setWishlistItem(updatedWishlist)
       }
      } catch (error) {
        console.log(error)
      }
    }

    const getCartAmount = () => {
      let totalAmount = 0;
      for(const items in cartItems){
        let itemInfo = products.find((product)=>product._id === items);
        for(const item in cartItems[items]){
          try {
            if(cartItems[items][item] > 0){
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            
          }
        }
      }
      return totalAmount;
    }

    const getProductData = async() => {
      try {
        const response = await axios.get(backendUrl + '/api/v1/product/all-product')
        if(response.data.success){
          setProducts(response.data.data.products)
        }else{
          toast.error(response.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    useEffect(()=> {
      getProductData()
      getUserCart()
      getUserWishlist()
    },[])

     const value = {
       products ,  currency , deliveryFee , search , setSearch , 
       showSearch , setShowSearch , cartItems ,setCartItems, addToCart , getCartCount,updateQuantity,
       getCartAmount , backendUrl , addToWishlist , wishlistItem , deleteFromWishlist
    }

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider
