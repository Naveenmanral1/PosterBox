import mongoose , {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({

    fullName : {
        type : String,
        required : true,
        trim : true,
        index : true
    },

    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },

    password : {
        type : String,
        required : true,
    },

    userDetails : {
        type : Object,
        default : {},
    },

    wishlist : {
        type  : Object,
        default : {},
    },

    avatar : {
        type : String,
        
    },

    orders : {
        type  : Object,
        default : {},
    },

    refreshToken : {
        type : String
    },

    cartData : {
        type  : Object,
        default : {}
    }

},{
    timestamps : true
   ,minimize : false
})

// pre hook

userSchema.pre("save" , async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        fullName : this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

userSchema.methods.generateRefreshToken = function (){
    return jwt.sign({
        _id : this._id,
        email : this.email,
        fullName : this.fullName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}


export const User = mongoose.model("User" , userSchema)