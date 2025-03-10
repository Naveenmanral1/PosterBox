import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import HompepageProductcard from "../../components/HomepageProductcard";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CollectionPage() {
  const { products } = useContext(ShopContext);
  const [poster, setPoster] = useState([]);
  const [category, setCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const collectionType = useParams();

  const sortProduct = () => {
    let fpCopy = poster.slice();

    switch (sortType) {
      case "low-high":
        setPoster(fpCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setPoster(fpCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    const fetchPosters = async () => {
      if (products) {
        const collection = await products.filter(
          (poster) => poster.category === collectionType.category
        );
        setPoster(collection);
      }
    };
    fetchPosters();
  }, [products , category , poster]);

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (sizes.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        item.sizes.some((s) => sizes.includes(s))
      );
    }
    setPoster(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, sizes, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  if (!poster || poster.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
    );
  }

  return (
    <>

      <div className="flex w-full flex-col gap-[90px] bg-white-a700 md:gap-[67px] sm:gap-[45px] bg-red-400">
        <div className="flex flex-col gap-6">
          <Header />
          
          <div className="flex flex-col items-center">
            <div className="container-xs flex flex-col gap-[12px] md:px-5">
              <div className="flex justify-end">
                <div>
                  <select
                    onChange={(e) => setSortType(e.target.value)}
                    className=" text-sm px-2"
                    id=""
                  >
                    <option value="relavent">Sort by : Relavent </option>
                    <option value="low-high">Sort by : Low to High</option>
                    <option value="high-low">Sort by : High to Low</option>
                  </select>
                </div>
              </div>

              <h1 className="flex w-full justify-center sm:text-2xl text-4xl mb-4 font-semibold items-center ">
                {collectionType.category} Collection
              </h1>

              <div className="flex items-start gap-12 md:flex-col">
                <div className="flex flex-1 flex-col gap-12 self-center md:self-stretch">
                  <div className="grid grid-cols-4 justify-center gap-6 sm:gap-4 md:grid-cols-2 sm:grid-cols-2">
                    <Suspense fallback={<div>Loading feed...</div>}>
                      {poster.map((d, index) => (
                        <HompepageProductcard
                          {...d}
                          id={d._id}
                          images={d.images}
                          title={d.title}
                          price={d.price}
                          key={"productList" + index}
                        />
                      ))}
                    </Suspense>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
