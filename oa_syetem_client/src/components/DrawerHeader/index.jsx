import React from "react";
import { LeftOutlined } from "@ant-design/icons";
import style from "./index.module.less";

export default function DrawerHeader({ pageName, backPrev, children }) {
  const handleBackPrev = () => {
    backPrev && backPrev();
  };

  return (
    <div className={style.drawerHeader}>
      <div className={style.leftArea}>
        <LeftOutlined onClick={handleBackPrev}></LeftOutlined>
        <span className={style.pageName} onClick={handleBackPrev}>
          {pageName}
        </span>
      </div>
      <div className={style.rightArea}>{children}</div>
    </div>
  );
}
