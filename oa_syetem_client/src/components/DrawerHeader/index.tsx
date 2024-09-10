import React, { ReactNode } from "react";
import { LeftOutlined } from "@ant-design/icons";
import style from "./index.module.less";

interface DrawerHeaderProps {
  pageName?: string;
  backPrev: () => void;
  children?: ReactNode;
}

const defaultProps = {
  pageName: "Back",
  backPrev: () => {},
};

const DrawerHeader: React.FC<DrawerHeaderProps> = (props) => {
  const { pageName, backPrev, children } = { ...defaultProps, ...props };
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
};

export default DrawerHeader;
