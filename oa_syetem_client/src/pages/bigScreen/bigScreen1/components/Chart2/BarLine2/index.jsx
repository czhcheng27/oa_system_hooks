import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as echarts from "echarts";
import css from "./index.module.less";
import "./index.css";
import { getPureAccumulate, getSpecificData } from "../../../utils";
import {
  commonDataZoom,
  commonGrid,
  commonLegend,
  commonTooltip,
  commonXAxis,
  get3dBarSeries,
  get3dBarSeriesCap,
  getLineSeries,
  planBarColor2,
  releasedBarColor2,
  yAxisCompleteRate,
  yAxisMillion,
} from "../../../../../../utils/echarts";

const line = `<span class="line"></span>`;

const BarLine2 = ({ isCenter, chartData }) => {
  const chartId = isCenter ? "centerBarLine2" : "barLine2";

  const xAxisData = getSpecificData(chartData, "month");
  // 计划发布数
  const planCount = getSpecificData(chartData, "planCount");
  // 已发布标准数量
  const succplanCount = getSpecificData(chartData, "succplanCount");

  const sdcPlanRate = getSpecificData(chartData, "sdcPlanRate");

  const planCountCap = getPureAccumulate([planCount, succplanCount]);
  const succplanCountCap = getSpecificData(chartData, "succplanCount");

  const seriesData = [
    // planCount 年度计划发布标准数量
    {
      ...get3dBarSeries(planBarColor2),
      name: "Plan No",
      data: planCount,
      barGap: "-100%",
    },
    // { ...get3dBarSeries(planBarColor9), name: '年度计划发布标准数量', data: planCount },

    // planCount Cap 年度计划发布标准数量 顶部圆盘
    {
      ...get3dBarSeriesCap("#0F82DB"),
      name: "Plan No",
      data: planCount,
    },
    // { ...get3dBarSeriesCap('#0F82DB'), name: '年度计划发布标准数量', data: planCountCap },

    // succplanCount 已发布标准数量
    {
      ...get3dBarSeries(releasedBarColor2),
      name: "Published No",
      data: succplanCount,
    },

    // succplanCount Cap 已发布标准数量 顶部圆盘
    {
      ...get3dBarSeriesCap("#93A5CF"),
      name: "Published No",
      data: succplanCountCap,
    },

    {
      name: "Rate",
      data: sdcPlanRate,
      symbol: `circle`,
      symbolSize: [12, 12],
      ...getLineSeries(),
    },

    {
      /* TIP: 增加的无效series，为图例使用 */
      type: "line",
      symbol: "none",
      name: `Rate`,
      color: "transparent",
    },
  ];

  const options = {
    tooltip: {
      ...commonTooltip(isCenter),
      formatter: function (params) {
        //这里就是控制显示的样式
        var relVal =
          `<div class=${isCenter ? "center_title2" : "title2"}>` +
          `${params[0].axisValue}` +
          "</div>";
        const length = params.length - 1;
        for (var i = length; i >= 0; i--) {
          //marker 就是带颜色的小圆圈 seriesName x轴名称  value  y轴值
          if (params[i].value !== 0) {
            relVal +=
              `<div class=${isCenter ? "center_eachRow2" : "eachRow2"}>` +
              "<div>" +
              `${i == 0 ? line : params[i].marker}` +
              `<span class=${
                isCenter ? "center_seriesName2" : "seriesName2"
              }>` +
              params[i].seriesName +
              "</span>" +
              "</div>" +
              '<div style="height: 14px;line-height: 14px">' +
              `${params[i].value}${i == 0 ? "%" : ""}` +
              "</div>" +
              "</div>";
          }
        }
        return relVal;
      },
    },
    dataZoom: [commonDataZoom(succplanCount, 12)],
    legend: {
      ...commonLegend(isCenter),
      data: [
        { name: "Published No", icon: "circle" },
        { name: "Plan No", icon: "circle" },
        {
          name: `Rate`,
          lineStyle: { type: "dashed", width: 2, color: "#00FFE4" },
        },
      ],
    },
    grid: { ...commonGrid(isCenter, xAxisData), top: 50 },
    xAxis: [
      {
        ...commonXAxis(isCenter),
        data: xAxisData,
        name: "Month",
        nameTextStyle: {
          fontSize: isCenter ? 16 : 12, //字体大小
          padding: isCenter ? [0, 0, -28, -12] : [0, 0, -23, -12], //距离坐标位置的距离
          verticalAlign: "bottom",
        },
        axisLabel: { ...commonXAxis(isCenter).axisLabel, rotate: 0 },
      },
    ],
    yAxis: [
      { ...yAxisMillion(isCenter), name: "Num", minInterval: 1 },
      yAxisCompleteRate(isCenter),
    ],
    series: seriesData.reverse(),
  };

  useEffect(() => {
    const chartDom = document.getElementById(chartId);
    const chart = echarts.init(chartDom);
    chart.setOption(options);
    // onBarClick(chart, penetrateHandle, "useIndex", xAxisData);
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

  return <div id={chartId} className={css.barLine2}></div>;
};

export default BarLine2;
