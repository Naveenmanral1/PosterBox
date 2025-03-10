import { Order } from "../models/orders.model.js";
import { Product } from "../models/products.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js"
import razorpay from "razorpay"

const currency = 'inr'
const deliveryCharge = 50

const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET ,
})

const placeOrder = asyncHandler(async (req, res) => {

   try {
    const userId  = req.user._id
     const { items, totalAmount,  address  } = req.body;

   
     const orderData = await Order.create({
         userId : req.user?._id,
         items,
         totalAmount,
         address,
         payment:false,
         paymentMethod : "COD"
     });

     await User.findByIdAndUpdate(userId,{cartData:{}})
 
     return res
         .status(201)
         .json(new ApiResponse(201, orderData, "Order placed successfully."));
   } catch (error) {
    console.log(error)
    throw new ApiError(500, "Error in placing order");
   }
});


const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId ,status } = req.body;
     await Order.findByIdAndUpdate(orderId , {status});
    return res
        .status(200)
        .json(new ApiResponse(200,  "Order status updated successfully."));
});




const getUserOrders = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const orders = await Order.find({ userId });
    return res
        .status(200)
        .json(new ApiResponse(200, orders, "Orders retrieved successfully."));
});


const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({  });
        return res
            .status(200)
            .json(new ApiResponse(200, orders, "Orders retrieved successfully."));
    } catch (error) {
        throw new ApiError(401, error?.message || "Error in getting all orders");
    }
});

const orderWithRazorpay = async (req , res) => {
    try {
        const userId  = req.user._id
        const {items , address , totalAmount } = req.body

        const orderData = {
            userId,
            items,
            totalAmount,
            address,
            payment:false,
            paymentMethod : "Razorpay"
        }

        const newOrder = new Order(orderData)
        await newOrder.save()
        
        const options = {
            amount : totalAmount * 100,
            currency : currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error , order )=> {
            if(error){
                console.log(error)
                throw new ApiError(401, error?.message || "Error in placing orders via razorpay");
            }
            return res
         .status(201)
         .json(new ApiResponse(201, order, "Razorpay Order placed successfully."));
        })
    } catch (error) {
        console.log(error)
    throw new ApiError(500,"Error in placing orders via razorpay");
    }
}

const verifyRazorpay = async(req , res) => {
    try {
        const userId  = req.user._id
        const {razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await User.findByIdAndUpdate(userId,{cartData:{}})
            return res
         .status(201)
         .json(new ApiResponse(201,  "Razorpay Order verified successfully."));
        }else{
            throw new ApiError(500,"Payment Failed");
        }
    } catch (error) {
        console.log(error)
        throw new ApiError(500,"Error in verifying razorpay payment");
    }
}


export {
    placeOrder,
    updateOrderStatus,
    getUserOrders,
    getAllOrders,
    orderWithRazorpay, 
    verifyRazorpay
};
