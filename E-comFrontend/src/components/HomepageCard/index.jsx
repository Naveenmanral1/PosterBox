import { Img } from "../Img";
import React from "react";

export default function HomepageCard({...props}){
    return(
        <div {...props} className={ `${props.className} flex flex-col w-[278px]`}> 
        <Img src="images/download-36.png" alt="Card Image" className="h-[312px] w-full rounded-md object-cover" /> 
        </div>
    );
}