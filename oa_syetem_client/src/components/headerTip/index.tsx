import React from "react";
import css from "./index.module.less";

interface HeaderTipProps {
  children: any;
}

const HeaderTip: React.FC<HeaderTipProps> = ({ children }) => {
  return <div className={css.infoSplit}>{children}</div>;
};

export default HeaderTip;
