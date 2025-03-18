import React from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "./pages";
import SIGNINPage from "./pages/SignIn";
import WishlistPage from "./pages/Wishlist";
import MyAccountPersonalInformationPage from "./pages/MyAccountPersonalInformation";
import MyAccountMyOrderPage from "./pages/MyAccountMyorders";
import MyAccountFAQsPage from "./pages/MyAccountFAQs";
import SIGNUPPage from "./pages/SignUp";
import ProductDetailsPage from "./pages/ProductDetails";
import ProductlistPage from "./pages/Productlist";
import ShoppingCartPage from "./pages/ShoppingCart";
import AddressOnePage from "./pages/AddressOne";
import HomepagePage from "./pages/Homepage";
import CollectionPage from "./pages/AllCollectionPages/Anime";
import Authlayout from "./components/AuthLayout/AuthLayout.jsx"

const ProjectRoutes = () => {
  let element = useRoutes([
    
    { path: "*", element: <NotFound /> },
    {
      path: "signin",
      element: <SIGNINPage />,
    },
    {
      path: "wishlist",
      element: <WishlistPage/>,
    },
    {
      path: "myaccountpersonalinformation",
      element:( <Authlayout>
        <MyAccountPersonalInformationPage />
      </Authlayout>
            ),
    },
    {
      path: "myaccountmyorders",
      element:( <Authlayout>
        <MyAccountMyOrderPage />
      </Authlayout>
      ),
    },
    {
      path: "signup",
      element: <SIGNUPPage />,
    },
    {
      path: "/",
      element: <HomepagePage />,
    },
    {
      path: "productlist",
      element: <ProductlistPage />,
    },
    {
      path: "productdetails/:productId", 
      element: <ProductDetailsPage  />,
    },
    {
      path: "shoppingcart",
      element: <ShoppingCartPage />,
    },
    {
      path: "checkout",
      element:(<Authlayout>
        <AddressOnePage />
      </Authlayout> ),
    },
    {
      path: "collection/:category",
      element: <CollectionPage />,
    },
  ]);
  return element;
};
export default ProjectRoutes;
