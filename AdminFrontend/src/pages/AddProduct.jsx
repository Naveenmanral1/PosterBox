import React, { useState } from "react";
import {upload} from "../assets/assets.js"
import axios from "axios"
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const AddProduct = ({token}) => {
  

  const [image1 , setImage1] = useState(false)
  const [image2 , setImage2] = useState(false)
  const [image3 , setImage3] = useState(false)
  const [image4 , setImage4] = useState(false)

  const [title , setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Anime");
  const [subCategory, setSubCategory] = useState("Glossy");
  const [price, setPrice] = useState(25);
  const [sizes, setSizes] = useState([]);
  const [stock, setStock] = useState(20);

  const handleSizeChange = (size) => {
    setSizes((prevSizes) => {
      if (prevSizes.includes(size)) {
        return prevSizes.filter((s) => s !== size);
      } else {
        return [...prevSizes, size];
      }
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('title',title)
      formData.append('description',description)
      formData.append('price',price)
      formData.append('stock',stock)
      formData.append('category',category)
      formData.append('subCategory',subCategory)

        // Append each size individually
     sizes.forEach((size , index) => {
     formData.append(`sizes[${index}]`,size)
     })

      image1 && formData.append('image1',image1)
      image2 && formData.append('image2',image2)
      image3 && formData.append('image3',image3)
      image4 && formData.append('image4',image4)


      const response = await axios.post(backendUrl + "/api/v1/product/add-product",formData,{headers:{token}})
      if(response.data.success){
        toast.success(response.data.message)
        setTitle('')
        setDescription('')
        setImage1('')
        setImage2('')
        setImage3('')
        setImage4('')
        setPrice('')
        setStock('')
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
    
  };


  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 mt-10 rounded-lg ">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleSubmit}>
            {/* Product Image */}
            <div>
                <p className="block text-sm font-medium text-gray-700 mb-2">Upload Image</p>
                <div className=" flex gap-3 my-3">
                    <label htmlFor="image1">
                        <img className="w-18 " src={!image1 ? upload : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className="w-18 " src={!image2 ? upload : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className="w-18 " src={!image3 ? upload : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className="w-18 " src={!image4 ? upload : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden />
                    </label>
                
                </div>
            </div>
          {/* Product Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type here"
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write content here"
              rows="4"
              required
            />
          </div>

          {/* Product Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Anime">ANIME POSTER</option>
                <option value="Cars">CARS</option>
                <option value="Dc">DC</option>
                <option value="F1">F1</option>
                <option value="Football">FOOTBALL</option>
                <option value="Game">GAME</option>
                <option value="Gym">GYM</option>
                <option value="Marvel">MARVEL</option>
                <option value="Movie">MOVIE</option>
                <option value="Music">MUSIC</option>
                <option value="Web-Series">WEB SERIES</option>
                <option value="Cricket">CRICKET</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sub category
              </label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Glossy">GLOSSY</option>
                <option value="Matte">MATTE</option>
                <option value="Frame">FRAME</option>
              </select>
            </div>
          </div>

          {/* Product Price */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter price"
              required
            />
          </div>

           {/* Product Stocks */}
           <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter stock"
              required
            />
          </div>

          {/* Product Sizes */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Sizes
            </label>
            <div className="flex space-x-4">
              {["A6","A5", "A4", "A3", "A2"].map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeChange(size)}
                  className={`px-4 py-2 border rounded-md ${
                    sizes.includes(size)
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            ADD
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;