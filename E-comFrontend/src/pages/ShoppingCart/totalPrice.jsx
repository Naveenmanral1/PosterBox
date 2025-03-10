import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../context/ShopContext';
import { Heading , Text , Button } from '../../components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TotalPrice() {

    const {currency , deliveryFee , getCartAmount ,getCartCount } = useContext(ShopContext); 
  
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status)

  return (
    <div className="flex w-[42%] items-start justify-center gap-[22px] md:w-full sm:flex-col">
                      <div className="h-full w-px self-center bg-gray-300 sm:h-px sm:w-[810px]" />
                      <div className="flex flex-1 flex-col gap-8 rounded-lg bg-white-a700 sm:self-stretch">
                        <div className="flex flex-col items-start justify-center gap-[22px]">
                          <Heading as="h5" className="text-[18px] font-semibold">
                            PRICE DETAILS ({getCartCount()}  items)
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
                                {currency}{getCartAmount()}.00
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
                                <Text
                                  as="p"
                                  className="text-[18px] font-normal "
                                >
                                  {currency}{deliveryFee}.00
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
                             {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee }
                            </Heading>
                          </div>
                        </div>
                        
                        <a>
                          <Button
                            color="blue_gray_900_01"
                            shape="round"
                            onClick = {()=>navigate(authStatus ? '/checkout' : '/signin')}
                            className="self-stretch w-full rounded-md px-[34px] font-medium sm:px-5"
                          >
                            PLACE ORDER
                          </Button>
                        </a>
                      </div>
                    </div>
  )
}

export default TotalPrice
