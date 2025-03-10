import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { box1, box2 } from "../assets/assets";

const order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/order/all-orders",
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event , orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/status",
         {orderId , status : event.target.value}, { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        console.log(error);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6 h-screen lg:ml-92 justify-center md:ml-36 mt-16">
      <div className="p-6 w-full max-w-8xl mx-auto ">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {" "}
          Order Page
        </h2>
        <div className="overflow-x-auto">
          <div className="min-w-full  overflow-hidden shadow-sm">
            <div className=" ">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-4 text-xs sm:text-sm text-gray-700"
                >
                  <div className=" p-4">
                    <img src={box} className="max-w-24" alt="" />
                  </div>
                  <div>
                     <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return ( <p className="py-0.5" key={index}>{" "}{item.title} x {item.quantity}{" "}<span>{item.size}</span>{" "}</p>);
                      } else {
                        return (<p className="py-0.5" key={index}>{" "}{item.title} x {item.quantity}{" "}<span>{item.size}</span>{" "},</p>);
                      }
                    })}
                  </div>
                  <p className="mt-3 mb-2 font-medium">{order.address.firstName + " "+order.address.lastName}</p>
                  <div>
                    <p>{order.address.street + ","}</p>
                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.pincode}</p>
                  </div>
                   <p>{order.address.phone}</p>
                </div>
                <div>
                    <p className="text-sm sm:text-[15px]">Items : {order.items.length}</p>
                    <p className="mt-3">Method : {order.paymentMethod}</p>
                    <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                    <p>Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                 <p className="text-sm sm:text-[15px]"> ₹ {order.totalAmount}</p>
                 <select onChange={(event)=>statusHandler(event,order)} value={order.status} className="p-2 font-semibold border border-gray-400">
                    <option value="Order Placed">Order Placed</option>
                    <option value="Getting Packed">Getting Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                 </select>
                  </div>
                 
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default order;
