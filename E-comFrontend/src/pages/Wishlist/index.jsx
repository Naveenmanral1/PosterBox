import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import WishlistSection from "./WishlistSection";

export default function WishlistPage() {
  return (
    <>
      <div className="flex relative w-full flex-col gap-[88px] bg-white-a700 md:gap-[66px] sm:gap-11">
        <div className="flex flex-col gap-6">
          <Header />
          <WishlistSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
