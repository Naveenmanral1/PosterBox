import { Text } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import NavigationSidebar from "../../components/NavigationSidebar";
import api from "../../services/api";
import { useState } from "react";
import { useEffect } from "react";


export default function MyAccountMyOrderPage() {

  const [orderData , setOrderData] = useState([])
  const authStatus = useSelector(state => state.auth.status)
  const loadOrderData = async() => {
    try {
      if(!authStatus){
        return null
      }

      const response = await api.post('/api/v1/order/user-order',{})
      if(response.data.success){
       let allOrdersItem = []
       response.data.data.map((order)=>{
        order.items.map((item)=> {
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          allOrdersItem.push(item)
        })
       })
       setOrderData(allOrdersItem.reverse())
      }
      
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[authStatus])

  return (
    <>
    
      <div className="flex w-full flex-col gap-[90px] bg-white-a700 md:gap-[67px] sm:gap-[45px]">
        <div className="flex flex-col gap-6">
          <Header />
          <div className="flex flex-col items-center">
            <div className="container-xs flex flex-col gap-[22px] md:px-5">
             
              <div className="flex gap-[22px] md:flex-col"> 
                <NavigationSidebar/>
                <div className="flex flex-1 flex-col gap-[22px] md:self-stretch">
                  <div className="flex flex-col gap-3.5">
                    <div className="flex ">
                      <Text as="p" className="self-start text-[18px] font-medium">
                        My Orders
                      </Text>
                    </div>
                    <div className="h-px bg-blue_gray-100" />
                  </div>
                  <div className="flex flex-col gap-6">
                    <Suspense fallback={<div>Loading feed...</div>}>
                      {orderData.map((item, index) => (
                        <ProductOrderDetails
                          item={item}
                          key={"productList" + index}
                        />
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
