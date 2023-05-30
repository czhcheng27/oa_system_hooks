import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const Chart8 = ({ isCenter, eventCenter, eventHandle }) => {
  const amplifyChart = (e) => {
    e.stopPropagation();
    if (!eventCenter) {
      eventHandle(8, "amplify");
    } else {
      eventHandle(8, "close");
    }
  };

  return (
    <div className={css.chart8_wrap} onClick={(e) => amplifyChart(e)}>
      Chart8
    </div>
  );
};

export default Chart8;
