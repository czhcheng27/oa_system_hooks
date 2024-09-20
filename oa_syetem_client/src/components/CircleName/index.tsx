import React from "react";
import css from "./index.module.less";

let displayName: string;

interface CircleNameProps {
  name: string;
  bgColor?: string;
  color?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  requireDigit?: number;
  sliceFrom?: string;
}

const CircleName: React.FC<CircleNameProps> = ({
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
