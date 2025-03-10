import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/font.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import ShopContextProvider from "./context/ShopContext";
import { ToastContainer } from "react-toastify";

const container = document.getElementById('root');
const root = createRoot(container)

root.render(  
    <Provider store={store}>
        <ShopContextProvider>
          <ToastContainer/>
          <App/>   
    </ShopContextProvider>
    </Provider>
    
);