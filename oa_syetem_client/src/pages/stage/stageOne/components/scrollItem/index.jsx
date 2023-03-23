import React, { useState } from "react";
import { Popover } from "antd";
import css from "./index.module.less";

const ScrollItem = ({ data, warnDay }) => {
  const [dis, setDis] = useState("-50%");

  return (
    <div className={css.scrollItem}>
      <div className={css.area} style={{ transform: `translate(${dis}, 0)` }}>
        <div className={css.applyFor}>applyFor</div>
        <div className={css.implement}>implement</div>
      </div>
    </div>
  );
};

export default ScrollItem;
