import React from "react";
import Icon from "./imgs/iconTip.png";
import css from "./index.module.less";

interface TitleTipProps {
  children: string;
  height?: string;
  icon?: string;
  fontWeight?: string;
  fontSize?: string;
}

const TitleTip: React.FC<TitleTipProps> = ({
  children,
  height = "24px",
  icon = Icon,
  fontWeight = "600",
  fontSize = "16px",
}) => {
  return (
    <div className={css.titleTip_wrapper} style={{ height }}>
      {/* return <div className={css.infoSplit}> */}
      <div>
        <img src={icon} />
      </div>
      <div style={{ fontWeight, fontSize }}>{children}</div>
    </div>
  );
};

export default TitleTip;
