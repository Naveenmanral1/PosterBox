import {ApiError} from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const adminVerifyJWT = asyncHandler(async(req , res, next) =>{
    try {

    const {token} = req.headers

    if(!token){
        throw new ApiError(401, "Unauthorized Admin access : No token found")
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

    if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.json({success : false , message : "Not Authorized Login again"})
    }

    next();
        
    } catch (error) {
        console.log("Error in jwt verificaton" , error)
        throw new ApiError(401,error?.message || "Invalid Token")
    }
})