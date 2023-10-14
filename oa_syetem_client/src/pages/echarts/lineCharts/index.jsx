import React from "react";
import MyConsult from "./components/MyConsult";
import ChartOne from "./chartOne";
import RotateVehicle from "./components/RotateVehicle";
import BtnBox from "./components/BtnBox";
import Waapi from "./components/Waapi";
import css from "./index.module.less";

const LineCharts = (props) => {
  return (
    <div>
      <div className={css.centerBox}>
        <MyConsult />
        <RotateVehicle />
        <BtnBox />
      </div>
      <div className={css.waapiBox}>
        <Waapi />
      </div>
      <ChartOne />
    </div>
  );
};

export default LineCharts;
