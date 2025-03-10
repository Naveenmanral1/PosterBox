import { User } from "../models/user.model.js";
import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const addToWishlist = async (req, res) => {
    try {
        const {  itemId} = req.body;
        const userId = req.user._id;

        const product = await Product.findById(itemId);

        
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let wishlist = await user.wishlist;

        if (!user.wishlist) {
            user.wishlist = {};
        }

        if (user.wishlist[itemId]) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        user.wishlist[itemId] = true;
        await user.save();

        await User.findByIdAndUpdate(userId , {wishlist })

        res.status(200).json({ message: "Product added to wishlist" });

    } catch (error) {
        res.status(500).json({ message: "Error in adding to wishlist", error: error.message });
    }
};

const removeFromWishlist = async(req, res) => {
    try {
        const { itemId} = req.body;
        
        const userId = req.user._id;

        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        let wishlist = await user.wishlist;

        if(user.wishlist && user.wishlist[itemId]){
            delete user.wishlist[itemId];
            await user.save();
        }else{
            return res.status(400).json({message : "Product not found in wishlist"})
        }

        await User.findByIdAndUpdate(userId , {wishlist })

        res.status(200).json({message : "Product removed from wishlist"})
    } catch (error) {
        res.status(500).json({message : "Server Error",error : error.message})
    }
}

const getUserWishlist = async(req , res) => {
    try {
        const userId = req.user._id;

        const userData = await User.findById(userId)
        const wishlistData = await userData.wishlist;

        return res.status(201).json(
            new ApiResponse(200 , wishlistData)
        )
    } catch (error) {
        throw new ApiError(500 , "Error in getting wishlist data")
    }
}

export {addToWishlist , removeFromWishlist , getUserWishlist}