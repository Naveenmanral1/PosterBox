import mongoose , {Schema} from "mongoose";

const productSchema = new Schema({

    title : {
        type : String,
        required : true,
        trim : true,
        index : true
    },

    description :{
        type : String,
        required : true,
    },

    images : {
        type :  Array,
        required : true,
    },

    price : {
        type : Number,
        required : true,
    },

    stock : {
        type : Number,
        required : true,
    },

    rating :{
        type : String,
        default : 0,
    },

    reviews : {
        type : Array,
        default : [],
    },

    category : {
        type  : Object,
        default : {},
    },

    subCategory : {
        type : String,
        required : true,
    },

    sizes : {
        type : Array,
        required : true,
    }

},{
    timestamps : true
    ,minimize : false
})

export const Product = mongoose.model("Product" , productSchema)