import React from "react";
import {
  Button,
  Heading,
  Text,
  Input,
} from "../../components/index.js";
import Footer from "../../components/Footer/index.jsx";
import Header from "../../components/Header/index.jsx";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { toast } from "react-toastify";


export default function AddressOnePage() {
  const { currency, deliveryFee, getCartAmount , cartItems , setCartItems ,products , getCartCount} = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setFromData(data => ({...data,[name]:value}))
  }

  const initPay = (order) => {
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount : order.amount,
      currency : order.currency,
      title : "Order Payment",
      description : 'Order Payment with razorPay',
      order_id : order.id,
      receipt : order.receipt,
      handler : async(response) => {
        console.log(response)
        try {
          const {data} = await api.post('/api/v1/order/verify-razorpay',response)
          if(data.success){
            navigate('/myaccountmyorders')
            setCartItems({})
          }
        } catch (error) {
          console.log(error)
          toast.error(error)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault()
    try {
      let orderItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0 ){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      let orderData = {
        address : formData,
        items : orderItems,
        totalAmount : getCartAmount() + deliveryFee
      }

    

      switch(method){
        case 'cod':
        const response = await api.post('/api/v1/order/place-order' , orderData)
       
        if(response.data.success){
          setCartItems({})
          navigate('/myaccountmyorders')
        }else{
          toast.error(response.data.message)
        }
        break;

        case 'razorpay' :
          const razorpayResponse = await api.post('/api/v1/order/razorpay' , orderData)

          if(razorpayResponse.data.success){
            console.log(razorpayResponse.data.data)
            initPay(razorpayResponse.data.data)
            
          }
        break;

        default :
        break;
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <>
      <div className="flex w-full flex-col gap-[90px] bg-white-a700 md:gap-[67px] sm:gap-[45px]">
        <div className="flex flex-col gap-6">
          <Header />
          <div className="flex flex-col items-center">
            <div className="container-xs flex flex-col gap-[46px] md:px-5">
              
              <form onSubmit={onSubmitHandler} className="flex gap-6 md:flex-col">
                <div className="flex flex-1 flex-col gap-6 md:self-stretch">
                  <div className="flex flex-col items-start gap-4">
                    <Heading as="h2" className="mt-1 text-[18px] font-semibold">
                      Shipping information
                    </Heading>
                    <div className="h-px w-full self-stretch bg-blue_gray-100" />
                  </div>
                  <div className="flex flex-col w-auto items-start gap-6">
                    <div className="flex w-full items-start  gap-1.5 self-stretch">
                      <div className="w-full">
                        <Text as="p" className="text-[18px]  font-medium">
                          <span className="text-blue_gray-900_01">
                            First name&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="text"
                          name="firstName"
                          onChange = {onChangeHandler}
                          value = {formData.firstName}
                          placeholder={"Enter your name"}
                          className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                        />
                      </div>
                      <div className="w-full">
                        <Text as="p" className="text-[18px] font-medium">
                          <span className="text-blue_gray-900_01">
                            Last name&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="text"
                          name="lastName"
                          onChange = {onChangeHandler}
                          value = {formData.lastName}
                          placeholder={"Enter your name"}
                          className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 self-stretch md: flex-col">
                      <div className="flex w-full flex-col items-start justify-center gap-1.5">
                        <Text as="p" className="text-[18px] font-medium">
                          <span className="text-blue_gray-900_01">
                            Email address&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="email"
                          name="email"
                          onChange = {onChangeHandler}
                          value = {formData.email}
                          placeholder={"Enter your email"}
                          className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[18px]"
                        />
                      </div>
                      <div className="flex w-full flex-col items-start justify-center gap-1.5">
                        <Text as="p" className="text-[18px] font-medium">
                          <span className="text-blue_gray-900_01">
                            Phone number&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="number"
                          name="phone"
                          onChange = {onChangeHandler}
                          value = {formData.phone}
                          placeholder={"Enter your phone number"}
                          className="self-stretch rounded-md border border-solid border-blue_gray-100 px-[18px]"
                        />
                      </div>
                    </div>
                    <div className="w-full">
                      <Text as="p" className="text-[18px]  font-medium">
                        <span className="text-blue_gray-900_01">
                          Street&nbsp;
                        </span>
                        <span className="text-red-600">*</span>
                      </Text>
                      <Input
                        shape="round"
                        required
                        type="text"
                        name="street"
                        onChange = {onChangeHandler}
                        value = {formData.street}
                        placeholder={"Street"}
                        className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                      />
                    </div>
                    <div className="flex w-full items-start  gap-1.5 self-stretch">
                      <div className="w-full">
                        <Text as="p" className="text-[18px]  font-medium">
                          <span className="text-blue_gray-900_01">
                            City&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="text"
                          name="city" 
                          onChange = {onChangeHandler}
                          value = {formData.city}
                          placeholder={"City"}
                          className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                        />
                      </div>
                      <div className="w-full">
                        <Text as="p" className="text-[18px] font-medium">
                          <span className="text-blue_gray-900_01">
                            State&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="text"
                          name="state"
                          onChange = {onChangeHandler}
                          value = {formData.state}
                          placeholder={"State"}
                          className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                        />
                      </div>
                    </div>
                    <div className="flex w-full items-start  gap-1.5 self-stretch">
                      <div className="w-full">
                        <Text as="p" className="text-[18px]  font-medium">
                          <span className="text-blue_gray-900_01">
                            PinCode&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="number"
                          name="pincode"
                          onChange = {onChangeHandler}
                          value = {formData.pincode}
                          placeholder={"PinCode"}
                          className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                        />
                      </div>
                      <div className="w-full">
                        <Text as="p" className="text-[18px] font-medium">
                          <span className="text-blue_gray-900_01">
                            Country&nbsp;
                          </span>
                          <span className="text-red-600">*</span>
                        </Text>
                        <Input
                          shape="round"
                          required
                          type="text"
                          name="country"
                          onChange = {onChangeHandler}
                          value = {formData.country}
                          placeholder={"Country"}
                          className="self-stretch rounded-md border border-solid border-blue gray-100 px-[18px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
               
                <div className="flex w-[42%] items-start justify-center gap-[22px] md:w-full sm:flex-col">
                  <div className="h-[810px] w-px self-center bg-gray-300 sm:h-px sm:w-[810px]" />
                  <div className="flex flex-1 flex-col gap-8 rounded-lg bg-white-a700 sm:self-stretch">
                    <div className="flex flex-col items-start justify-center gap-[22px]">
                      <Heading as="h5" className="text-[18px] font-semibold">
                        PRICE DETAILS ({getCartCount()} items)
                      </Heading>
                      <div className="flex flex-col gap-3.5 self-stretch">
                        <div className="flex flex-wrap justify-between gap-5">
                          <Text
                            as="p"
                            className="text-[18px] font-normal Itext-gray-600"
                          >
                            Total MRP
                          </Text>
                          <Text as="p" className="text-[18px] font-normal">
                            {currency}
                            {getCartAmount()}.00
                          </Text>
                        </div>
                        <div className="flex flex-wrap justify-between gap-5">
                          <Text
                            as="p"
                            className="text-[18px] font-normal Itext-gray-600"
                          >
                            Discount on MRP
                          </Text>
                          <Text
                            as="p"
                            className="text-[18px] font-normal !text-green-600_01"
                          >
                            0.00
                          </Text>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-5">
                          <Text
                            as="p"
                            className="text-[18px] font-normal text-gray-600"
                          >
                            Coupon Discount
                          </Text>
                          <Text
                            as="p"
                            className="text-[18px] font-normal !text-green-600_01"
                          >
                            0.00
                          </Text>
                        </div>
                        <div className="flex justify-center">
                          <Text
                            as="p"
                            className="text-[18px] font-normal !text-gray-600"
                          >
                            Shipping Fee
                          </Text>
                          <div className="flex flex-1 flex-wrap justify-end">
                            <Text as="p" className="text-[18px] font-normal ">
                              {currency}
                              {deliveryFee}.00
                            </Text>
                         
                          </div>
                        </div>
                      </div>
                      <div className="h-px w-full self-stretch bg-gray-300" />
                      <div className="flex flex-wrap justify-between gap-5 self-stretch">
                        <Heading as="h6" className="text-[18px] font-semibold">
                          Total Amount
                        </Heading>
                        <Heading as="h6" className="text-[18px] font-semibold">
                          {currency}
                          {getCartAmount() === 0
                            ? 0
                            : getCartAmount() + deliveryFee}
                        </Heading>
                      </div>
                    </div>
                    <div className="">
                      <h1>PAYMENT METHOD</h1>
                      <div className="flex gap-3  justify-around flex-col lg:flex-row mt-4">
                        
                        <div
                          onClick={() => setMethod("razorpay")}
                          className="flex w-full items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                          <p
                            className={`min-w-3.5 h-3.5  border rounded-full ${
                              method === "razorpay" ? "bg-green-500" : ""
                            }`}
                          ></p>
                          <img
                            src="/poster/Razorpay_logo.png"
                            alt="stripe"
                            className="h-5 mx-4"
                          />
                        </div>
                        <div
                          onClick={() => setMethod("cod")}
                          className="flex w-full items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                          <p
                            className={`min-w-3.5  h-3.5 border rounded-full ${
                              method === "cod" ? "bg-green-500" : ""
                            }`}
                          ></p>
                          <p className="text-gray-700 text-sm font-medium mx-4">
                            CASH ON DELIVERY
                          </p>
                        </div>
                      </div>
                    </div>
                    <a>
                      <Button
                        color="blue_gray_900_01"
                        shape="round"
                        type = "submit"
                        className="self-stretch w-full rounded-md px-[34px] font-medium sm:px-5"
                      >
                        CONFIRM PAYMENT
                      </Button>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
