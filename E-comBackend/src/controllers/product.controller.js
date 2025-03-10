import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
    extractPublicIdFromUrl
} from "../utils/cloudinary.js"

import {Product} from "../models/products.model.js"
import mongoose , {isValidObjectId} from 'mongoose';

const addProduct = asyncHandler(async(req , res) => {

    const {title, description, price, stock , category , subCategory , sizes } = req.body

    if(
        [title, description, price, stock , category , subCategory , sizes].some((field) =>
        String(field)?.trim() === "")
    ){
        throw new ApiError(400 , "All fields are required")
    }


    const imageFiles = [
        req.files?.image1?.[0],
        req.files?.image2?.[0],
        req.files?.image3?.[0],
        req.files?.image4?.[0],
    ].filter(Boolean); // Remove undefined values

   if(imageFiles.length === 0){
        throw new ApiError(400 , "At least one image file is required")
    }

    const uploadedImages = await Promise.all(
        imageFiles.map((file) => uploadOnCloudinary(file.path))
    )

   if(uploadedImages.some((image) => !image)){
    throw new ApiError(400 , "Failed to upload images")
   }

    const imageUrls = uploadedImages.map((image) => image.secure_url);

    const product = await Product.create({
        title,
        description,
        price,
        stock,
        category,
        subCategory,
        sizes,
        images : imageUrls
    })

    return res.status(201).json(
        new ApiResponse(200 , product , "Product listed successfully")
    )
})


const updateProduct = asyncHandler(async(req , res) => {
    const {title, description, price, stock , category} = req.body;
    const {productId} = req.params;

    if(!title?.trim() && !description?.trim() && !price?.trim() && !stock?.trim() && !category?.trim() && !req.file){
        throw new ApiError(400 , "At least one field is required")
    }

    const product = await Product.findById(productId);
    if(!product){
        throw new ApiError(400 , "Product not found")
    }

    let image;
    if(req.file?.path){
        const imageLocalPath = req.file.path;

        image = await uploadOnCloudinary(imageLocalPath);
        if(!image.url){
            throw new ApiError(400 , "Error while uploading image")
        }

        if(product.image){
            const oldImagePublicId = extractPublicIdFromUrl(product.image);
            await deleteFromCloudinary(oldImagePublicId);
        }
    }

    const updateFields = {};
    if(title?.trim()) updateFields.title = title;
    if(description?.trim()) updateFields.description = description;
    if(image?.url) updateFields.image = image.url;
    if(price?.trim()) updateFields.price = price;
    if(stock?.trim()) updateFields.stock = stock;
    if(category?.trim()) updateFields.category = category;

    const updateProduct = await Product.findByIdAndUpdate(
        productId,
        { $set : updateFields},
        {new : true}
    );

    if(!product){
        throw new ApiError(400 , "Product not found")
    }

    return res.status(200).json(
        new ApiResponse(200, updateProduct , "Product updated successfully")
    )
    
});


const deleteProduct = asyncHandler(async(req , res) => {
    const productId = req.body.id;

    const product = await Product.findById(productId);
    if(!product){
        throw new ApiError(400 , "Product not found")
    }

    if(product.images && product.images.length > 0){
       
        const deleteResult = await Promise.all(
           product.images.map((imageUrl) => {
            const publicId = extractPublicIdFromUrl(imageUrl);
            return deleteFromCloudinary(publicId)
           } ) 
        ) 
        if(deleteResult.some((result) => !result.success)){
            throw new ApiError(500 , "Error while deleting the image from cloudinary")
        }
    }

    await Product.findByIdAndDelete(productId);

    return res
    .status(200)
    .json( new ApiResponse(200 , null , "Product deleted successfully"))
})


const getAllProduct = asyncHandler(async(req, res) => {
    const {
        page = 1,
        limit = 500,
        sort = "-createdAt",
        filter = {} 
    } = req.query;

    const pageNumber = parseInt(page,500);
    const limitNumber = parseInt(limit , 500);

    if(pageNumber < 1 || limitNumber  < 1){
        throw new ApiError(400 , "Page and limit must be positive integers")
    }

    const filters = {};
    if(filter.status) filters.status = filter.status;
    
    const skip = (pageNumber - 1) * limitNumber; 

    const products = await Product.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limitNumber);


    const totalProducts = await Product.countDocuments(filters)

    const meta = {
        totalProducts,
        currentPage : pageNumber,
        totalPages : Math.ceil(totalProducts / limitNumber)
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , {products , meta} , "Product retrived successfully "))
    
})


const getProductById = asyncHandler(async(req,res) => {
    const productId = req.body.id;

    if(!isValidObjectId(productId)){
        throw new ApiError(400 , "Invalid ProductId")
    }

    const product = await Product.findById(productId);

    if(!product){
        throw new ApiError(404 , "product not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200 , product , "Product Found"))
})


export {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    getProductById
}


  