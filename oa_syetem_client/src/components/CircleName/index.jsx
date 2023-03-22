import React from "react";
import css from "./index.module.less";

let displayName;

const CircleName = ({
  name = "",
  bgColor = "#4880dc",
  color = "white",
  width = "33px",
  height = "33px",
  fontSize = "10px",
  requireDigit = 2,
  sliceFrom = "end",
}) => {
  const getName = () => {
    const sliceName =
      sliceFrom === "start"
        ? name.slice(0, requireDigit)
        : name.slice(-requireDigit);
    displayName = name.length > requireDigit ? sliceName : name;
    return displayName;
  };

  return (
    <div
      style={{
        background: bgColor,
        fontSize,
        width,
        height,
        color,
        lineHeight: height,
      }}
      className={css.headImageBg}
    >
      {getName()}
    </div>
  );
};

export default CircleName;
