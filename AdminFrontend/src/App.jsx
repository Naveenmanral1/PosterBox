import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes , Route } from 'react-router-dom'
import AddProduct from './pages/AddProduct'
import ListProduct from './pages/ListProduct'
import Order from './pages/Orders'
import Login from './components/Login'
export const backendUrl = import.meta.env.VITE_BACKEND_URL
import { ToastContainer } from 'react-toastify';

function App() {

 const [token , setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): '')

 useEffect(() => {
  localStorage.setItem('token',token)
 },[token])

  return (
    <div>
      <ToastContainer/>
    {
      token === ''
      ? <Login setToken={setToken}/>
      : 
      <>
       <Navbar setToken={setToken}/>
      <div className='flex w-full'>
       <Sidebar className=""/>
       <div className='w-full text-gray-600 text-base'>
        <Routes>
          <Route path='/add' element={<AddProduct token={token}/>}/>
          <Route path='/list' element={<ListProduct token={token}/>}/>
          <Route path='/order' element={<Order token={token}/>}/>
        </Routes>
       </div>
      </div>
      </>
    }
    </div>
  )
}

export default App
