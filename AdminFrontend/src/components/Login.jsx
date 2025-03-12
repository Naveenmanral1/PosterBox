import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { art } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken  , token}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/api/v1/auth/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
        navigate("/order");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=> {
     if(token){
    navigate('/order')
  }
  })
 
  return (
    <div className="flex w-screen h-screen bg-gray-100">
      <div className="hidden md:flex w-1/2">
        <img src={art} alt="Login Art" className="object-cover w-full h-full" />
      </div>
      
      <div className="flex w-full md:w-1/2 justify-center items-center p-6">
        <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter admin email"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
