import FAQSection from "./FAQSection";
import CategoriesSection from "./CategoriesSection";
import HeroSection from "./HeroSection";
import CustomSection from "./CustomSection";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Bestselling from "./BestSelling";
import CollagePacks from "./CollagePacks";
import NewArrivals from "./NewArrival";
import Collections from "./Collections";
import MultiPosterSeciton from "./MultiPosterSeciton";

export default function HomepagePage() {
  return (
    <>
      <div className="flex w-full  flex-col items-center  bg-white-a700">
        <div className="self-stretch bg-gray-50">
          <Header />

          <HeroSection />
        </div>

        <CategoriesSection />

        <MultiPosterSeciton />

        <Bestselling />

        <CollagePacks />

        <NewArrivals />

        <CustomSection />

        <Collections />

        <FAQSection />

        <Footer className="self-stretch" />
      </div>
    </>
  );
}
