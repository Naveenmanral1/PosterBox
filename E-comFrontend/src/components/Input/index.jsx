import React from "react";
import PropTypes from "prop-types"

const shapes = {
    square : "rounded-[0px]",
    round : "rounded-md",
};

const variants = {
    fill: { blue_gray_900_0c: "bg-blue_gray-900_0c text-blue_gray-900_01", 
            white_A700: "bg-white-a700 text-gray-400",
    },
};

const sizes = {
    xs: "h-[20px] px-3 text-[16px]", 
    sm: "h-[52px] px-3 text-[16px]", 
    lg: "h-[66px] px-[18px] text-[16px]",
    md: "h-[56px] px-[18px] text-[16px]",
}

const Input = React.forwardRef(
    (
        {
            className = "",
            name = "",
            placeholder = "",
            type = "text", 
            label = "",
            prefix, 
            suffix, 
            onChange, 
            shape, 
            variant = "fill", 
            size = "md", 
            color = "white A700", 
            ...restProps
        },
        ref,
    ) => {
        return(
            <label
            className={` ${className} flex items-center justify-center cursor-text text-[16px] ${shape && shapes [shape]} ${variant && (variants [variant]?. [color] || variants [variant])} ${size && sizes [size]}`} 
            >
            {!! label && label}
            {!!prefix && prefix}
            <input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} /> 
            {!!suffix && suffix} 
            </label>
        );
    },
);

Input.propTypes = {
    className: PropTypes.string,
    name: PropTypes.string, 
    placeholder: PropTypes.string, 
    type: PropTypes.string, 
    label: PropTypes.string, 
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    shape: PropTypes.oneOf(["square", "round"]), 
    size: PropTypes.oneOf(["xs", "sm", "lg", "md"]), 
    variant: PropTypes.oneOf(["fill"]), 
    color: PropTypes.oneOf(["blue_gray_900_0c", "white_A700"]),
};

export {Input}