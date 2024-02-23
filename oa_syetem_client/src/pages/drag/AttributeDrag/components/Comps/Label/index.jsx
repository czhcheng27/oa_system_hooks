import React, { useState, useContext } from "react";
import { cloneDeep } from "lodash";
import { defaultOtherStyles, valueStyleMap } from "./const";
import css from "./index.module.less";

const Label = ({ props }) => {
  const { Attribute, Style, Permission } = props || {};
  const { content, width = "", height = "" } = Attribute || {};
  const { textAlign, other } = Style || {};

  const getOtherFontStyle = () => {
    if (!other) return {};
    const dfltObj = cloneDeep(defaultOtherStyles);
    other.map((el) => {
      if (el !== "underline" && el !== "line-through") {
        dfltObj[valueStyleMap[el]] = el;
      } else {
        dfltObj[valueStyleMap[el]] = `${dfltObj[valueStyleMap[el]]} ${el}`;
      }
    });
    return dfltObj;
  };

  return (
    <div style={{ height, width, textAlign, ...getOtherFontStyle(other) }}>
      {content ? (
        content
      ) : (
        <span style={{ color: "#BCC3CE" }}>Please type...</span>
      )}
    </div>
  );
};

export default Label;
