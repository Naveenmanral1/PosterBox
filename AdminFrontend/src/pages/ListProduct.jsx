import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const ListProduct = ({token}) => {
    const [list , setList] = useState([])

    const fetchList = async() => {
        try {
            const response = await axios.get(backendUrl + '/api/v1/product/all-product')
            if(response.data.success){
                setList(response.data.data.products)
            }else{
                toast.error(response.data.message)
                }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const deleteProduct = async(id) => {
        try {
            const response = await axios.delete(backendUrl +"/api/v1/product/delete-product",{data:{ id }, headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                await fetchList();
            }else{
                console.log(error)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    },[])

  return (
    <div className="p-6 h-screen lg:ml-92 justify-center md:ml-36 mt-16">
    <div className="p-6 w-full max-w-8xl mx-auto ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800"> Products List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300  overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-left">
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className=" ">
            {list.map((item, index) => (
              <tr
                key={index}
                className="border-b transition duration-300 ease-in-out  hover:bg-gray-100"
              >
                <td className="p-4 flex justify-center">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover shadow-md"
                  />
                </td>
                <td className="p-4 text-gray-800 font-semibold">{item.title}</td>
                <td className="p-4 text-gray-600 font-medium">{item.category}</td>
                <td className="p-4 text-gray-800 font-bold">{item.stock}</td>
                <td className="p-4 text-gray-800 font-bold">{item.price}</td>
                <td className="p-4 text-center">
                  <button 
                  onClick={()=>deleteProduct(item._id)}
                  className="text-red-500 hover:text-red-700 text-2xl transition-transform transform hover:scale-110">
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default ListProduct;
