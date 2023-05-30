import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const Chart1 = ({ isCenter, eventCenter, eventHandle }) => {
  const amplifyChart = (e) => {
    e.stopPropagation();
    if (!eventCenter) {
      eventHandle(1, "amplify");
    } else {
      eventHandle(8, "close");
    }
  };

  return (
    <div className={css.chart1_wrap} onClick={(e) => amplifyChart(e)}>
      Chart1
    </div>
  );
};

export default Chart1;
