import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const addToCart = async (req , res) => {
    try {
        const userId = req.user._id;
        const { itemId , size} = req.body

        const userData = await User.findById(userId)
        let cartData = await userData.cartData;
        

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1 
        }

        await User.findByIdAndUpdate(userId , {cartData})

        return res.status(201).json(
            new ApiResponse(200   , "Added To Cart")
        )

    } catch (error) {
        throw new ApiError(500, "Error in adding item to the cart");
    }
}

const updateCart = async (req , res) => {
    try {

        const userId = req.user._id;
        const { itemId , size , quantity} = req.body
        
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity

        await User.findByIdAndUpdate(userId , {cartData})

        return res.status(201).json(
            new ApiResponse(200  , "Cart Updated")
        )

    } catch (error) {
        throw new ApiError(500, "Error in updating cart");
    }
    
}

const getUserCart = async (req , res) => {
    try {
        const userId = req.user._id;

        const userData = await User.findById(userId)
        const cartData = await userData.cartData;

        return res.status(201).json(
            new ApiResponse(200 , cartData)
        )
    } catch (error) {
        throw new ApiError(500 , "Error in getting cart data")
    }
}

export {addToCart , updateCart , getUserCart}