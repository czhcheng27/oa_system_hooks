import React, { useState, useEffect } from "react";
import Highcharts from "highcharts/highstock";
import Highcharts3D from "highcharts/highcharts-3d";
import { common3dPie, format3DData } from "../../../../../utils/echarts";
import css from "./index.module.less";
Highcharts3D(Highcharts);

const Chart9 = ({ isCenter = false }) => {
  const id = isCenter ? "center3DDonut" : "3DDonut";
  const innerSize = isCenter ? 100 : 50;
  const depth = isCenter ? 90 : 45;

  useEffect(() => {
    Highcharts.chart(id, {
      ...common3dPie(innerSize, depth),
      series: [
        {
          name: "Proportion",
          data: format3DData([
            { proportion: "30%", standardType: "Type I" },
            { proportion: "30%", standardType: "Type II" },
            { proportion: "40%", standardType: "Type III" },
          ]),
        },
      ],
    });
  }, []);
  return (
    <div className={css.chart9_wrap}>
      <div id={id} className={css.threeDDonut}></div>
    </div>
  );
};

export default Chart9;
