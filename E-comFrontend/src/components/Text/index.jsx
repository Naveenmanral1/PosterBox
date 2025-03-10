import React from "react";

const sizes = {
    textxs : "text-[14px] font-normal",
    textmd : "text-[16px] font-normal",
    textlg : "text-[18px] font-normal",
    text2xl : "text-[24px] font-normal md:text-[22px]",
};

const Text = ({ children, className = "",as, size = "textlg", ...restProps }) => {
  const Component = as || "p";

    return (
        <Component className={`text-blue_gray-900_01 font-inter ${className} ${sizes [size]} `} {...restProps}>
        {children}
        </Component>
    );
};

export { Text };