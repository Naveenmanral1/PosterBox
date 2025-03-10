import mongoose , {Schema} from "mongoose";

const orderSchema = new Schema({

    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },

    items :{
        type : Array,
        required : true,
    },

   totalAmount : {
        type : Number,
        required : true,
    },

    status : {
        type : String,
        required : true,
        default : "Order Placed",
    },

    address : {
        type : Object,
        required : true,
    },

    payment :{
        type : Boolean,
        required : true,
        default : false,
    },

    paymentMethod : {
        type : String,
        required : true,
    }

},{
    timestamps : true
})

export const Order = mongoose.model("Order" , orderSchema)