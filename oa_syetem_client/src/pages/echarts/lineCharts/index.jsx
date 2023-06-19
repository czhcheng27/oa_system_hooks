import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import MyConsult from "./components/MyConsult";
import BtnBox from "./components/BtnBox";
import ChartOne from "./chartOne";
import css from "./index.module.less";

const LineCharts = (props) => {
  return (
    <div>
      <div className={css.centerBox}>
        <MyConsult />
        <MyConsult />
        <BtnBox />
      </div>
      <ChartOne />
    </div>
  );
};

export default LineCharts;
