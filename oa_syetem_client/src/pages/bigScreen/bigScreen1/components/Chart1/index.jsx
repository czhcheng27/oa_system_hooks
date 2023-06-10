import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { Spin } from "antd";
import SelectFilter from "../SelectFilter";
import { dateOpts } from "../../const";
import { mockChartData1 } from "../../mockData";
import { formatData, getSpecificData, getTotalData } from "../../utils";
import {
  commonDataZoom,
  commonGrid,
  commonLegend,
  commonTooltip,
  commonXAxis,
  getLineSeries,
  getNormalBarSeries,
  getNormalBarSeriesOverlay,
  yAxisCompleteRate,
  yAxisTaskNum,
} from "../../../../../utils/echarts";
import Circle from "../../assets/circle.png";
import UpBg from "../../assets/upBg.png";
import DownBg from "../../assets/downBg.png";
import css from "./index.module.less";
import "./index.css";

const line = `<span class="line1"></span>`;

const Chart1 = ({ isCenter, filterParams, filterHandle }) => {
  const { date, sorter } = filterParams;
  const id = isCenter ? "centerStackBar1" : "stackBar1";

  const [chartData, setChartData] = useState(mockChartData1);
  const [loading, setLoading] = useState(false);

  const orgName = getSpecificData(chartData, "orgName");
  const orgId = getSpecificData(chartData, "orgId");
  const overdueNum = getSpecificData(chartData, "overdueNum");
  const limitedNum = getSpecificData(chartData, "limitedNum");
  const normalProcessNum = getSpecificData(chartData, "normalProcessNum");
  const completedRate = getSpecificData(chartData, "completedRate");

  // data 需要转换成对象的形式，[{ value: , itemstyle: {}}], 为了实现顶部圆角及冲击波颜色变化
  const data1 = formatData(overdueNum); // Overdue
  const data3 = formatData(limitedNum); // Advent
  const data4 = formatData(normalProcessNum); // 完成

  useEffect(() => {
    let res = [];
    setLoading(true);
    if (date == "all") {
      res = mockChartData1;
    } else if (date == "year") {
      res = mockChartData1.slice(0, 9);
    } else if (date == "month") {
      res = mockChartData1.slice(0, 5);
    } else {
      res = mockChartData1.slice(0, 3);
    }
    setChartData(res);
    setTimeout(() => setLoading(false), 1000);
  }, [date]);

  const renderTopCorner = () => {
    return (
      <div className={css.filter_area}>
        {renderSorter()}
        {renderDateFilter()}
      </div>
    );
  };

  const renderSorter = () => {
    const data = sorter == "up" ? "down" : "up";
    const Icon = sorter == "up" ? UpBg : DownBg;
    return (
      <div className={css.topCorner_sorter}>
        <img src={Icon} onClick={() => callbackFun(data, "sorter")} />
      </div>
    );
  };

  const renderDateFilter = () => {
    return (
      <div className={css.topCorner_date}>
        <SelectFilter
          type="date"
          callback={callbackFun}
          options={dateOpts}
          initVal={date}
        />
      </div>
    );
  };

  // 更新过滤参数，回调传回父组件更新
  const callbackFun = (data, type) => {
    const params = { ...filterParams, [type]: data };
    filterHandle(params);
  };

  const seriesData = [
    {
      name: "Overdue",
      data: data1,
      ...getNormalBarSeries(isCenter, "#DD7575", "#EE3532"),
    },
    {
      name: "Advent",
      data: data3,
      ...getNormalBarSeries(isCenter, "#FFCD91", "#EB9233"),
    },
    {
      name: "Done",
      data: data4,
      ...getNormalBarSeries(isCenter, "#59C7B2", "#59C7B2"),
    },
    {
      name: "Rate",
      data: completedRate,
      symbol: `image://${Circle}`,
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
    {
      ...getNormalBarSeriesOverlay(isCenter, "#EE3532", "transparent"),
      data: getTotalData([data1, data3, data4]),
    },
  ];

  for (let i in seriesData[0].data) {
    for (let item of seriesData) {
      // value 为0的柱图，边框改为透明
      if (item.data[i].value == 0) {
        item.data[i]["itemStyle"] = {
          ...item["itemStyle"],
          borderColor: "transparent",
        };
      }
      // value 不为0的顶部柱图，边框设置圆角，并为冲击波赋色
      if (item.data[i].value != 0) {
        item.data[i]["itemStyle"] = {
          ...item["itemStyle"],
          borderRadius: [5, 5, 0, 0],
        };
        // 为冲击波赋色
        seriesData.at(-1).data[i] = {
          ...seriesData.at(-1).data[i],
          itemStyle: {
            ...seriesData.at(-1).itemStyle,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: item.data[i]["itemStyle"].color.colorStops[0].color,
              },
              { offset: 1, color: "transparent" },
            ]),
          },
        };
        break;
      }
    }
  }

  const options = {
    tooltip: {
      ...commonTooltip(isCenter),
      formatter: function (params) {
        //这里就是控制显示的样式
        var relVal =
          `<div class=${isCenter ? "center_title1" : "title1"}>` +
          `${params[0].axisValue}` +
          "</div>";
        const length = params.length - 1;
        for (var i = length; i >= 0; i--) {
          //marker 就是带颜色的小圆圈 seriesName x轴名称  value  y轴值
          if (params[i].value !== 0) {
            relVal +=
              `<div class=${isCenter ? "center_eachRow1" : "eachRow1"}>` +
              "<div>" +
              `${i == 0 ? line : params[i].marker}` +
              `<span class=${
                isCenter ? "center_seriesName1" : "seriesName1"
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
    dataZoom: [commonDataZoom(orgName, isCenter ? 8 : 5)],
    legend: {
      ...commonLegend(isCenter),
      top: 12,
      data: [
        { name: "Overdue", icon: "circle" },
        { name: "Advent", icon: "circle" },
        { name: "Done", icon: "circle" },
        {
          name: `Rate`,
          lineStyle: {
            type: "dashed",
            width: isCenter ? 3 : 2,
            color: "#3A80D5",
          },
        },
      ],
      itemStyle: { borderWidth: 0 },
    },
    grid: { ...commonGrid(isCenter, chartData), top: 66 },
    xAxis: [{ ...commonXAxis(isCenter), data: orgName, name: "Task Type" }],
    yAxis: [yAxisTaskNum(isCenter), yAxisCompleteRate(isCenter)],
    series: seriesData.reverse(),
  };

  useEffect(() => {
    const chartDom = document.getElementById(id);
    const chart = echarts.init(chartDom);
    chart.setOption(options);
    // onBarClick(chart, penetrateHandle, 'useIndex', chartData);
    const chartObserver = new ResizeObserver(() => {
      chart.resize();
    });
    chartObserver.observe(chartDom);
    window.addEventListener("resize", () => {
      echarts.init(document.getElementById(id)).resize();
    });

    return () => {
      chart.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartData]);

  return (
    <div className={css.chart1_wrap}>
      {loading && <Spin spinning={loading} />}
      {renderTopCorner()}

      <div id={id} className={css.stackBar1}></div>
    </div>
  );
};

export default Chart1;
