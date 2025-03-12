import axios from "axios";
import React, { useEffect, useState, Suspense } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const ListProduct = ({ token, setToken }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(
        backendUrl + "/api/v1/product/all-product"
      );
      if (response.data.success) {
        setList(response.data.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        backendUrl + "/api/v1/product/delete-product",
        { data: { id }, headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        console.log(error);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex w-full flex-col gap-[90px] bg-white-a700 md:gap-[67px] sm:gap-[45px]">
      <div className="flex flex-col gap-6 ">
        <div className="fixed w-full z-50 bg-white">
          <Navbar setToken={setToken} />
        </div>

        <div className="flex  items-center mt-24">
          <div className=" flex flex-col w-full gap-[22px] md:px-5 ">
            <div className="flex gap-[22px] ">
              <div className="w-[26%] h-screen fixed ">
                <Sidebar />
              </div>

              <div className="flex flex-1 flex-col gap-[22px] md:self-stretch ml-[28%]">
                <div className="flex flex-col ">
                  <div className="self-start text-3xl flex justify-center font-bold w-full ">
                    Product List
                  </div>
                </div>
                <div className="flex flex-col gap-6">
                  <Suspense fallback={<div>Loading feed...</div>}>
                    {list.map((item, index) => (
                      <Card
                        item={item}
                        key={"productList" + index}
                        deleteProduct={deleteProduct}
                      />
                    ))}
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
