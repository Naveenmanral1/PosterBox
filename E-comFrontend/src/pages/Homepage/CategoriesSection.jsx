import FreeShippingBanner from "../../components/FreeShippingBanner";
import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

const benefitsList = [
  {
    headingText: "Superhero",
    images : "poster/10011.jpg",
    category : "Dc"
  },
  {
    headingText: "Car",
    images : "poster/10012.jpg",
    category  : "Cars"
  },
  {
    headingText: "Movies",
    images : "poster/10013.jpg",
    category  : "Movie"
  },
  {
    headingText: "TV-Series",
    images : "poster/10014.jpg",
    category  : "Web-Series"
  },
  {
    headingText: "Music",
    images : "poster/10015.png",
    category : "Music"
  },
  {
    headingText: "Video Game",
    images : "poster/10021.jpg", 
    category : "Game"
  },
  {
    headingText: "Motivation",
    images : "poster/10016.jpg", 
    category : "Gym"
  },
  {
    headingText: "Cricket",
    images : "poster/10017.jpg", 
    category : "Cricket"
  },
  {
    headingText: "Football",
    images : "poster/10020.jpg", 
    category : "Football"
  },
  {
    headingText: "F1",
    images : "poster/10018.jpg",
    category : "Cars"
  },
  {
    headingText: "Explore More",
    images : "poster/10019.png",
    category : "Web-Series"
  },

];


export default function CategoriesSection() {
  const navigate = useNavigate()
  return (
    <div className="p-5 sm:p-0 w-full flex flex-col items-center self-stretch">
        <div className="w-full py-4 overflow-hidden">
  <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-2 scrollbar-hide ">
    <Suspense fallback={<div>Loading feed...</div>}>
      {benefitsList.map((d, index) => (
       
        <FreeShippingBanner 
         {...d} 
         key={"partnersList" + index} 
         onClick={()=>navigate(`/collection/${d.category}`)}
         className="snap-start min-w-[150px] " />
        
       
      ))}
    </Suspense>
  </div>
</div>
    </div>
  );
}