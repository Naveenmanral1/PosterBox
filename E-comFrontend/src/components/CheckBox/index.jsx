import React from "react";
import PropTypes from "prop-types"

const variants = {
    primary : 'border-blue_gray-900_01 border  border-solid',
};

const sizes = {
    xs : "h-[20px] w-[20px] ",
};

const CheckBox = React.forwardRef(
    (
        {
            className = "",
            name = "",
            label = "",
            //value = "",
            id = "checkbox_id",
            onChange,
            variant = "primary",
            size = "xs",
            ...restProps
        },
        ref,
    ) => {
        const handleChange = (e) => {
            if(onChange) onChange(e);
        };

        return(
            <>
            <div className = {className + " flex items-center gap-2 cursor-pointer"}>
                <input 
                className={`${(size && sizes[size]) || ""} ${(variant && variants[variant]) || ""}`}
                ref={ref}
                type="checkbox"
                name={name}
                onChange={handleChange}
                id={id}
                //value={value}
                {...restProps}
                />
                {!!label && <label htmlFor={id}>{label}</label>}
            </div>
            </>
        )
    }
)

CheckBox.propTypes = {
    className : PropTypes.string,
    name : PropTypes.string,
    label : PropTypes.string,
    id : PropTypes.string,
   // value : PropTypes.string,
    size : PropTypes.oneOf(["xs"]),
    variant : PropTypes.oneOf(["primary"]),
};

export {CheckBox};