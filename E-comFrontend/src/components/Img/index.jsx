import React from "react";

const Img = ({ className, src = "https://shorturl.at/b1mLm", alt = "testImg", ...restProps }) => {
    return( 
    <img className={className} src={src} alt={alt} {...restProps} loading={"lazy"} />
);
}; 

export { Img};