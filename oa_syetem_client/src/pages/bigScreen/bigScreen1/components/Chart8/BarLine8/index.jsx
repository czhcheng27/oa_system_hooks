import React, { useEffect, memo } from "react";
import * as echarts from "echarts";
import {
  commonDataZoom,
  commonGrid,
  commonLegend,
  commonTooltip,
  commonXAxis,
  getLineSeries,
  onBarClick,
  yAxisCompleteRate,
  get3dBarSeries,
  get3dBarSeriesCap,
  yAxisMillion,
  budgetBarColor3,
  settleBarColor3,
} from "../../../../../../utils/echarts";
import { getPureAccumulate, getSpecificData } from "../../../utils";
import css from "./index.module.less";
import "./index.css";

const line = `<span class="line"></span>`;

const BarLine8 = ({ type, isCenter, chartData, penetrateHandle }) => {
  const chartId = isCenter ? "centerBarLine8" : "barLine8";

  const xAxisData = getSpecificData(chartData, "budgetType");
  const settleAmt = getSpecificData(chartData, "settlementAmt");
  const settleAmtCap = getSpecificData(chartData, "settlementAmt");
  const budgetAmt = getSpecificData(chartData, "budgetAmt");
  const budgetAmtCap = getPureAccumulate([settleAmt, budgetAmt]);

  const seriesData = [
    // settleAmt 结算
    {
      ...get3dBarSeries(settleBarColor3),
      name: "Settle Amount",
      data: settleAmt,
      stack: "ad",
    },

    // settleAmt Cap 结算顶部圆盘
    {
      ...get3dBarSeriesCap("#56E8F2"),
      name: "Settle Amount",
      data: settleAmtCap,
    },

    // budgetAmt 预算
    {
      ...get3dBarSeries(budgetBarColor3),
      name: "Budget Amount",
      data: budgetAmt,
      stack: "ad",
    },

    // budgetAmt Cap 预算顶部圆盘
    {
      ...get3dBarSeriesCap("#89F7FE"),
      name: "Budget Amount",
      data: budgetAmtCap,
    },
  ];

  const options = {
    tooltip: { ...commonTooltip(isCenter) },
    dataZoom: [commonDataZoom(budgetAmt)],
    legend: {
      ...commonLegend(isCenter),
      //   y: "25px",
      data: [
        "Settle Amount",
        { name: "Budget Amount", itemStyle: { color: "#009CEE" } },
      ],
      icon: "circle",
    },
    grid: { ...commonGrid(xAxisData), bottom: 20 },
    xAxis: [
      {
        ...commonXAxis(isCenter),
        data: xAxisData,
        name: "Type",
        nameTextStyle: {
          fontSize: 12, //字体大小
          padding: [0, 0, -23, -42], //距离坐标位置的距离
          verticalAlign: "bottom",
        },
      },
    ],
    yAxis: [yAxisMillion(isCenter)],
    series: seriesData,
  };

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    const chart = echarts.init(chartDom);
    chart.setOption(options);
    // onBarClick(chart, penetrateHandle, "useIndex", xAxisId);
    const chartObserver = new ResizeObserver(() => {
      chart.resize();
    });
    chartObserver.observe(chartDom);
    window.addEventListener("resize", () => {
      chart.resize();
    });

    return () => {
      chart.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return <div id={chartId} className={css.barLine8}></div>;
};

export default memo(BarLine8);
