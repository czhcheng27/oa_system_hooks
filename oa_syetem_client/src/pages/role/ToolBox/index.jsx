import React from "react";
import Icon from "../../../components/Icon/index";
// import Icon from "@/components/Icon/index";
import css from "./index.module.less";

const array = [
  {
    iconName: "icon-home",
    color: "ff2972",
  },
  {
    iconName: "icon-more",
    color: "fee800",
  },
  {
    iconName: "icon-gift",
    color: "04fc43",
  },
  {
    iconName: "icon-setting",
    color: "fe00f1",
  },
  {
    iconName: "icon-message",
    color: "00b0fe",
  },
  {
    iconName: "icon-cart",
    color: "fea600",
  },
  {
    iconName: "icon-money-rmb",
    color: "a529ff",
  },
  {
    iconName: "icon-star",
    color: "01bdab",
  },
];

const ToolBox = (props) => {
  const renderSpan = () => {
    return array.map((el, index) => {
      return (
        <span style={{ "--i": index, "--clr": `#${el.color}` }}>
          <Icon iconName={el.iconName} />
        </span>
      );
    });
  };

  return (
    <div className={css.menu}>
      <div className={css.btn}>
        <Icon iconName="icon-add" />
      </div>
      {renderSpan()}
    </div>
  );
};

export default ToolBox;
