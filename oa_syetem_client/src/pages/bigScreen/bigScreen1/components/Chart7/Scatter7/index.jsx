import React, { useEffect, memo } from "react";
import * as echarts from "echarts";
import { formatChart7 } from "../../../utils";
import { commonTooltip } from "../../../../../../utils/echarts";
import css from "./index.module.less";
import "./index.css";

const Scatter7 = ({ isCenter, chartData }) => {
  const id = isCenter ? "centerScatter7" : "scatter7";
  const formatData = formatChart7(chartData);
  const options = {
    tooltip: {
      ...commonTooltip(isCenter),
      axisPointer: {
        show: true,
        type: "cross",
        lineStyle: {
          type: "dashed",
          width: 1,
        },
      },
      formatter: function (params) {
        var relVal =
          `<div class=${isCenter ? "center_title7_bs1" : "title7_bs1"}>` +
          params[0].data.firstSystemName +
          "</div>" +
          `<div class=${isCenter ? "center_eachRow7_bs1" : "eachRow7_bs1"}>` +
          "<div>" +
          // `${i == 0 ? line : params[i].marker}` +
          `<span class=${
            isCenter ? "center_seriesName7_bs1" : "seriesName7_bs1"
          }>` +
          `Ability Score：` +
          params[0].data.value[0] +
          "</span>" +
          "</div>" +
          '<div style="height: 14px;line-height: 14px">' +
          `Tactic Score：` +
          params[0].data.value[1] +
          "</div>" +
          "</div>";
        return relVal;
      },
    },
    title: {
      //   top: 20,
      left: "50%",
      text: "Title7",
      textStyle: {
        color: "white",
        fontSize: 14,
      },
    },
    grid: {
      left: "7%",
      right: "3%",
      // top: 24,
      top: 30,
      bottom: 25,
      containLabel: true,
      show: true,
      borderWidth: 0,
      backgroundColor: "#052743",
    },
    xAxis: [
      {
        name: "Ability Score",
        nameLocation: "middle",
        nameTextStyle: {
          color: "white",
          fontSize: isCenter ? 16 : 12, //字体大小
          padding: [5, 5, -25, 5], //距离坐标位置的距离
          verticalAlign: "bottom",
        },
        type: "value",
        scale: true,
        min: 0,
        max: 100,
        interval: 20,
        splitLine: {
          show: false,
        },
        axisLabel: {
          fontSize: isCenter ? 14 : 10,
          color: "white",
        },
        axisLine: {
          lineStyle: {
            color: "transparent",
          },
        },
      },
    ],
    yAxis: [
      {
        name: "Tactic Score",
        nameLocation: "middle",
        nameTextStyle: {
          color: "white",
          fontSize: isCenter ? 16 : 12, //字体大小
          padding: [5, 5, 10, 5], //距离坐标位置的距离
          verticalAlign: "bottom",
        },
        type: "value",
        scale: true,
        min: 0,
        max: 10,
        interval: 2,
        splitLine: {
          show: false,
        },
        axisLabel: {
          fontSize: isCenter ? 14 : 10,
          color: "white",
        },
        axisLine: {
          lineStyle: {
            color: "transparent",
          },
        },
      },
    ],
    series: [
      {
        type: "scatter",
        data: formatData,
        dimensions: ["x", "y"],
        symbolSize: 5,
        itemStyle: {
          color: "#01F6FC",
        },
        markLine: {
          silent: true,
          symbol: ["none", "none"],
          lineStyle: {
            silent: true,
            type: "dashed",
            color: "#6986FF",
          },
          data: [
            { yAxis: 5, label: { position: "start", color: "#FF6B6B" } },
            { xAxis: 50, label: { position: "start", color: "#FF6B6B" } },
          ],
        },
      },
    ],
  };

  useEffect(() => {
    const chartDom = document.getElementById(id);
    const chart = echarts.init(chartDom);
    chart.setOption(options);
    // chart.on("click", (params) => {
    //   penetrateHandle(params.data);
    // });
    const chartObserver = new ResizeObserver(() => {
      chart.resize();
    });
    chartObserver.observe(chartDom);
    window.addEventListener("resize", () => {
      echarts.init(chartDom).resize();
    });

    return () => {
      chart.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return <div id={id} className={css.scatter7}></div>;
};

export default memo(Scatter7);
