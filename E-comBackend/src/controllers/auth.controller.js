import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Error in generating refresh token");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All field required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with email already exist");
    }

    const user = await User.create({
        fullName,
        email,
        password,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong in registering");
    }

    return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered"));
});




const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not exist");
    }

    const ispasswordValid = await user.isPasswordCorrect(password);

    if (!ispasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const option = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", refreshToken, option)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "User loggedIn success"
            )
        );
});




const logOutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            },
        },
        {
            new: true,
        }
    );

    const option = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", option)
        .clearCookie("refreshToken", option)
        .json(new ApiResponse(200, {}, "User logged out"));
});




const refreshAccessToken = asyncHandler(async (req, res) => {
    // changed cookie to cookies don't know which is correct
    const incomingRefeshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefeshToken) {
        throw new ApiError(401, "Unauthorized request : No refresh token provided");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefeshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefeshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired");
        }

        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessandRefreshToken(user._id);

        const option = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, option)
            .cookie("refreshToken", newRefreshToken, option)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: newRefreshToken },
                    "Access token refreshed"
                )
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

const getCurrentUser = asyncHandler(async (req, res) => {
    
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const adminlogin = asyncHandler(async(req , res) => {
   try {
     const {email , password} = req.body
 
     if(email === process.env.ADMIN_EMAIL && 
         password === process.env.ADMIN_PASSWORD
     ){
         const token = jwt.sign(email+password,process.env.JWT_SECRET);
         res.json({success:true , token})
     }else{
         res.json({success:false , message : "Invalid credentials"})
     }
   } catch (error) {
    console.log(error);
    res.json({success : false , message : error.message})
   }
})

const createProfile = asyncHandler(async(req , res) => {
    try {
        const userId = req.user._id
        
        const { userDetails} = req.body;
        console.log(userDetails)
        const user = await User.findById(userId)
  
       user.userDetails[userDetails] = true
        await user.save()
        await User.findByIdAndUpdate(userId , {userDetails})

         res.status(200).json({ message: "Profile created successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Error in creating profile", error: error.message });
    }
})

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    getCurrentUser,
    adminlogin,
    createProfile
};
