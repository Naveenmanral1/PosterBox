import React from "react";
import PropTypes from "prop-types"

const shapes = {
    square : "rounded-[0px]",
    round : "rounded-md",
};

const variants = {
    outline : {
        blue_700: "border-blue-700 border border-solid text-blue-700" ,
        blue_gray_900_01: "border-blue_gray-900_01 border border-solid text-blue_gray-900_01", 
        red_600: "border-red-600 border border-solid text-red-600", 
        gray_300_02: "border-gray-300_02 border-[0.5px] border-solid text-blue_gray-900_01", 
        gray_600: "border-gray-600 border border-solid text-gray-600",
    },
    fill : {
        blue_gray_900_01: "bg-blue_gray-900_01 text-white-a700", 
        gray_300_02: "bg-gray-300_02 text-blue_gray-900_01", 
        white_A700: "bg-white-a700 text-teal-400", 
        gray_100_01: "bg-gray-100_01 text-gray-600", 
        blue_700: "bg-blue-700 text-white-a700",
    },
};

const sizes = {
    md: "h-[38px] px-2", 
    "2xl": "h-[46px] px-5 text-[22px]", 
    "4xl": "h-[84px] px-[34px] text-[16px]", 
    xs: "h-[22px] px-1.5 text-[12px]", 
    xl: "h-[46px] px-[30px] text-[16px]", 
    sm: "h-[30px] px-3 text-[12px]", 
    lg: "h-[40px] px-6 text-[14px]", 
    "3xl": "h-[50px] px-[34px] text-[16px]",
}

const Button = ({
    children,
    className = "", 
    leftIcon, 
    rightIcon, 
    shape, 
    variant = "fill", 
    size = "3xl", 
    color = "white_A700", 
    ...restProps 
 }) => { 
     return ( 
     <button 
     className={` ${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}`}
        {...restProps}
        >
        {!!leftIcon && leftIcon}
         {children} 
        {!!rightIcon && rightIcon} 
        </button>
     );
};

Button.propTypes = {
    className: PropTypes.string, 
    children: PropTypes.node,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node, 
    shape: PropTypes.oneOf(["square", "round"]), 
    size: PropTypes.oneOf(["md", "2xl", "4xl", "xs", "xl", "sm", "lg", "3xl"]), 
    variant: PropTypes.oneOf(["outline", "fill"]), 
    color: PropTypes.oneOf([ 
        "blue_700", 
        "blue_gray_900_01",
        "red_600",
        "gray_300_02", 
        "gray_600", 
        "white_A700", 
        "gray_100_01", 
    ]),
};

export {Button}