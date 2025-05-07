import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const Chart6 = ({ isCenter }) => {
  const id = isCenter ? "centerChart6" : "chart6";
  useEffect(() => {
    if (isCenter) {
      document.getElementById(id).style.setProperty("--scaleSize", "2");
    }
  }, [isCenter]);
  return (
    <div id={id} className={css.chart6_wrap}>
      <div className={css.content}>
        <div>To Be Developed</div>
      </div>
    </div>
  );
};

export default Chart6;
