import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProduct from "./pages/ListProduct";
import Order from "./pages/Orders";
import Login from "./components/Login";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Routes>
            <Route
              path="/add"
              element={<AddProduct token={token} setToken={setToken} />}
            />
            <Route
              path="/list"
              element={<ListProduct token={token} setToken={setToken} />}
            />
            <Route
              path="/order"
              element={<Order token={token} setToken={setToken} />}
            />
             <Route
              path="/"
              element={<Login token={token} setToken={setToken} />}
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
