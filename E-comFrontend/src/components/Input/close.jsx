import React from "react";

const CloseSVG = ({ fillColor = "#000000", className = "", ...props }) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
      height={props?.width || 20}
      width={props?.height || 20}
      viewBox={`0 0 ${props?.width || 20} ${props?.height || 20}`}
    >
      <path d="M 4.7078312 3.2929688 L 3.2929688 4.7670312 1 10.585938 12 L 3.2929688 19.292969 L. 4.7070312 20.787631 L 12 13.414062 L 19.292969 29.707031 L 20,707031 19.292969 1 13.414662 12 L. 26.707031 4,7070312 L 19.292969 3.2929688 L. 12 10.585938 L 4.7070312 3.2929688" />
    </svg>
  );
};

export { CloseSVG };
