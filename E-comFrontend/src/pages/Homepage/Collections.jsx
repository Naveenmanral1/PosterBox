import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Collections = () => {

  const benefitsList = [
    {
      headingText: "Movie",
      images : "/poster/Artboard 2.jpg",
      category : "Movie"
    },
    {
      headingText: "Web-Series",
      images : "/poster/Artboard 3.jpg",
      category : "Web-Series"
    },
    {
      headingText: "Gym",
      images : "/poster/Artboard 4.jpg",
      category  : "Gym"
    },
    {
      headingText: "F1",
      images : "/poster/Artboard 5.jpg",
      category  : "Cars"
    },
    {
      headingText: "Cars",
      images : "/poster/Artboard 6.jpg",
      category  : "Cars"
    },
    {
      headingText: "Anime",
      images : "/poster/Artboard 7.jpg",
      category : "Anime"
    },
    {
      headingText: "Music",
      images : "/poster/Artboard 8.jpg",
      category : "Music"
    },
    {
      headingText: "Football",
      images : "/poster/Artboard 9.jpg",
      category  : "Football"
    },
    {
      headingText: "Game",
      images : "/poster/Artboard 12.jpg",
      category : "Game"
    },
    {
      headingText: "Marvel",
      images : "/poster/Artboard 13.jpg",
      category : "Marvel"
    },
    {
      headingText: "Dc",
      images : "/poster/Artboard 14.jpg",
      category  : "Dc"
    },
  ];


  const [images, setImages] = useState(benefitsList);
  const navigate = useNavigate() 
  const loader = useRef(null);

  const handleClick = (category) => {
    navigate(`/collection/${category}`)
  }

  const loadImages = () => {
    setImages((prevImages) => [...prevImages, ...benefitsList]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadImages(); 
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []); 

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="flex w-full justify-center items-center my-4 mt-6">
        <h1 className="text-4xl font-bold">COLLECTIONS</h1>
      </div>
      <div className="flex overflow-x-scroll space-x-4 p-4 mb-4 scrollbar-hide">
        {images.map((item , index) => (
          <img
            key={index}
            src={item.images}
            alt={`Collection item ${index}`}
            onClick={()=>handleClick(item.category)}
            className="flex-none w-64 h-96"
          />
          
        ))}
        <div ref={loader} className="flex-none w-64 h-64 bg-gray-200"></div>
      </div>
    </div>
  );
};

export default Collections;
