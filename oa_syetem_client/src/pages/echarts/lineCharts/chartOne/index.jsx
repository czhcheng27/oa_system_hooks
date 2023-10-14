import React from "react";
import * as echarts from "echarts";
import Echartrs from "../../../../components/Echarts";
import { requestData, statusMap, barObj, lineObj, colorMap } from "./const";
import css from "./index.module.less";

const option = {
  tooltip: {
    trigger: "axis",
  },
  dataZoom: [
    {
      //start: 0,//默认为0
      //end: 5,//默认为100
      zoomLock: true,
      type: "slider",
      show: true,
      // xAxisIndex: [0],
      handleSize: 5, //滑动条的 左右2个滑动条的大小
      startValue: 0, // 初始显示值
      endValue: 9, // 结束显示值
      height: 10, //组件高度
      left: "5%", //左边的距离
      right: "4%", //右边的距离
      bottom: 0, //底边的距离
      borderColor: "#FFF",
      fillerColor: "#FFF",
      borderRadius: 5,
      backgroundColor: "#FFF", //两边未选中的滑动条区域的颜色
      showDataShadow: false, //是否显示数据阴影 默认auto
      showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
      realtime: true, //是否实时更新
      filterMode: "filter",
    },
    //下面这个属性是里面拖到
    {
      type: "inside",
      show: false,
      // xAxisIndex: [0],
      start: 1, //默认为1
      end: 100, //默认为100
    },
  ],
  // Echarts图表中对图形的解释部分
  legend: {
    show: true,
    data: ["历史完成", "已切替", "进行中", "已拖期", "完成率"],
    left: "right",
    padding: [3, 30, 0, 0],
    itemHeight: 9, // 控制图例图形的高度
    itemWidth: 9,
    itemGap: 10, // 控制每一项的间距，也就是图例之间的距离
    icon: "circle",
    textStyle: {
      fontSize: 12,
      color: "#8A90A3",
    },
  },
  color: ["#04C54C", "#25E4BE", "#5595FF", "#44A0FE", "#FFAE74"],
  // 调整图表的位置
  grid: {
    left: "5%",
    right: "4%",
    bottom: "8%",
    containLabel: true,
  },
  xAxis: [
    {
      axisTick: { show: false }, // 是否显示坐标轴刻度。
      type: "category",
      position: "bottom",
      data: ["ecr001", "ecr002", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    // 第二个 x 轴，显示数据的
    {
      axisTick: { show: false },
      type: "category",
      position: "bottom",
      offset: 25,
      data: ["ecr001", "ecr002", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        color: "#242F57",
        fontWeight: 500,
        fontFamily: "PingFangSC-Medium",
        fontSize: 12,
      },
    },
  ],
  yAxis: [
    {
      name: "设变数 / 个",
      type: "value",
      nameLocation: "end", // 该name标签的位置，start是底部，end是顶部
      interval: 200, // 强制设置坐标轴分割间隔。
      offset: 10, // Y 轴相对于默认位置的偏移，在相同的 position 上有多个 Y 轴的时候有用。
      nameGap: 15, // 坐标轴名称与轴线之间的距离。
      nameTextStyle: {
        color: "#242F57",
        align: "right",
      },
      // 坐标轴在 grid 区域中的分隔线。
      splitLine: {
        show: true,
        lineStyle: {
          color: "#EAEDF7",
          type: "dashed",
        },
      },
    },
    {
      type: "value",
      name: "完成率 / %",
      min: 0,
      max: 100,
      interval: 10,
      nameLocation: "end",
      nameGap: 15,
      nameTextStyle: {
        color: "#242F57",
        align: "left",
      },
      splitLine: { show: false },
      axisLabel: {
        formatter: "{value} %", // 百分比显示
      },
    },
  ],
  series: [
    {
      name: "历史完成",
      type: "bar",
      stack: "Ad",
      barWidth: 24, // 设置柱条的宽度
      emphasis: {
        /*
        'none' 不淡出其它图形，默认使用该配置。
        'self' 只聚焦（不淡出）当前高亮的数据的图形。
        'series' 聚焦当前高亮的数据所在的系列的所有图形。
        */
        focus: "series",
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "#0ABF4E" },
          { offset: 0, color: "#73E1CC" },
        ]),
      },
      label: {
        show: true,
        color: "#242F57",
        fontFamily: "Inter-Regular",
        fontSize: "10px",
      },
      data: [120, 132, 3, 134, 90, 230, 210],
    },
    {
      name: "已切替",
      type: "bar",
      stack: "Ad",
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "#59E383" },
          { offset: 0, color: "#CAF680" },
        ]),
      },
      label: {
        show: true,
        color: "#242F57",
        fontFamily: "Inter-Regular",
        fontSize: "10px",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "进行中",
      type: "bar",
      stack: "Ad",
      emphasis: {
        focus: "series",
      },
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "#44A0FE" },
          { offset: 0, color: "#79CEFF" },
        ]),
      },
      label: {
        show: true,
        color: "#242F57",
        fontFamily: "Inter-Regular",
        fontSize: "10px",
      },
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "拖期",
      type: "bar",
      stack: "Ad",
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "#FFA5A5" },
          { offset: 0, color: "#FF5858" },
        ]),
      },
      label: {
        show: true,
        color: "#242F57",
        fontFamily: "Inter-Regular",
        fontSize: "10px",
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "完成率",
      type: "line",
      stack: "完成率 / %",
      yAxisIndex: 1,
      itemStyle: {
        color: "#77ABFF",
      },
      label: {
        show: true,
        color: "#242F57",
        fontFamily: "Inter-Regular",
        fontSize: "10px",
        formatter: function (value) {
          return value.value + "%";
        },
      },
      tooltip: {
        valueFormatter: function (value) {
          return value + "%";
        },
      },
      data: [30, 34, 55, 77, 10, 66, 90],
    },
  ],
};

const ChartOne = (props) => {
  const getChartData = (data) => {
    // console.log("data", data);
    if (data && data.length > 0) {
      const xAxisData = [];
      const xAxisDataTwo = [];
      const seriesMap = {};
      const seriesData = [];
      Object.keys(statusMap).map((seriesType) => {
        let seriesRow = JSON.parse(JSON.stringify(barObj));
        if (seriesType == "doneRate") {
          seriesRow = JSON.parse(JSON.stringify(lineObj));
        }
        seriesRow.name = statusMap[seriesType];
        seriesMap[seriesType] = seriesRow;
      });
      data.map((item) => {
        xAxisData.push(item.projectNo);
        xAxisDataTwo.push(item.ecrTotalNum);
        Object.keys(item).map((key) => {
          if (
            key !== "projectNo" &&
            key !== "projectId" &&
            key !== "ecrTotalNum"
          ) {
            if (key == "doneRate") {
              seriesMap[key].data.push(parseInt(item[key].split("%")[0]));
            } else {
              seriesMap[key].data.push(item[key]);
            }
          }
        });
      });
      Object.keys(statusMap).map((key) => {
        if (key == "doneRate") {
          seriesMap[key].tooltip = lineObj.tooltip;
          seriesMap[key].label = lineObj.label;
        } else {
          seriesMap[key].label = barObj.label;
        }
        seriesMap[key].itemStyle = colorMap[key];
        seriesData.push(seriesMap[key]);
      });
      option.xAxis[0].data = xAxisData;
      option.xAxis[1].data = xAxisDataTwo;
      option.series = seriesData;
      // console.log(JSON.stringify(option));
    }
    console.log("option", option);
    return option;
  };

  return (
    <div className={css.Completion} key="Completion" id="Completion">
      <div className={css.header}>
        <div className={css.headerStart}></div>
        <div className={css.headerName}>各项目完成情况</div>
      </div>
      <div style={{ height: "260px", position: "relative" }}>
        {requestData.length > 0 && (
          <Echartrs
            key={"completionCharts"}
            options={getChartData(requestData)}
            // clickMethod={clickMethod}
          />
        )}
        {requestData.length > 0 && (
          <div className={css.numName}>
            <div>设变数量</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartOne;
