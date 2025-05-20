import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { SUGGEST_HEIGHT, SUGGEST_WIDTH } from "../../const";
import css from "./index.module.less";

const Chart5 = ({ isCenter }) => {
  const id = isCenter ? "centerChart5" : "chart5";
  useEffect(() => {
    if (isCenter) {
      document.getElementById(id).style.setProperty("--scaleSize", "2");
    }
  }, [isCenter]);
  return (
    <div id={id} className={css.chart5_wrap}>
      <div className={css.content}>
        <div>Designed for large screens.</div>
        <div>
          Best viewed on devices with{" "}
          <strong>{`${SUGGEST_WIDTH}x${SUGGEST_HEIGHT}`}</strong> resolution or
          higher.
        </div>
      </div>
    </div>
  );
};

export default Chart5;
