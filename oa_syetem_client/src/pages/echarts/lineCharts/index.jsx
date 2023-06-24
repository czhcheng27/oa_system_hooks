import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import MyConsult from "./components/MyConsult";
import ChartOne from "./chartOne";
import RotateVehicle from "./components/RotateVehicle";
import BtnBox from "./components/BtnBox";
import css from "./index.module.less";

const LineCharts = (props) => {
  return (
    <div>
      <div className={css.centerBox}>
        <MyConsult />
        <RotateVehicle />
        <BtnBox />
      </div>
      <ChartOne />
    </div>
  );
};

export default LineCharts;
