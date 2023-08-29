import React, { useState } from "react";
import css from "./index.module.less";

const TipBox = (props) => {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <div className={css.moduleBox}>
      <div
        className={`${css.button} ${isActive ? css.active : ""}`}
        onClick={handleClick}
      >
        Tip box
      </div>
      <div className={`${css.icons} ${isActive ? css.open : ""}`}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
      </div>
    </div>
  );
};

export default TipBox;
