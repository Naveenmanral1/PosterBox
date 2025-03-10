import React from "react";

const sizes = {
    texts: "text-[15px] font-medium", 
    textxl: "text-[20px] font-medium",
    headingxs: "text-[12px] font-semibold",
    headings: "text-[14px] font-semibold",
    headingmd: "text-[16px] font-bold",
    headinglg: "text-[18px] font-semibold", 
    headingxl: "text-[22px] font-semibold",
    heading2xl: "text-[24px] font-bold md:text-[22px]", 
    heading3xl: "text-[26px] font-semibold md:text-[24px] sm:text-[22px]", 
    heading4xl: "text-[30px] font-semibold md:text-[28px] sm:text-[26px]", 
    heading5xl: "text-[46px] font-bold md:text-[42px] sm:text-[36px]", 
    heading6xl: "text-[52px] font-bold md:text-[44px] sm:text-[38px]",
}

const Heading = ({ children, className = "", size = "headinglg", as, ...restProps }) => {
    const Component = as || "h6";

    return(
        <Component className={`text-blue_gray-900_01 font-inter ${className} ${sizes[size]}`} {...restProps}>
            {children}
        </Component>
    );
};

export {Heading};``