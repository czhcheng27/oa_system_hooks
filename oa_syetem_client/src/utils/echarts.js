import * as echarts from "echarts";

const eItemNo = 5; // x 轴显示几个柱，大于此数出滚动条
const barWidth = 14;
const capSize = [barWidth, barWidth * 0.25];

const normalCssExtra =
  "border: 2px solid #00FFF6; min-width: 191px; background: #05253fff; border-radius: 4px; color: white !important";
const centerCssExtra =
  "border: 2px solid #00FFF6; min-width: 280px; background: #05253fff; border-radius: 4px; color: white !important";

export const onBarClick = (chart, callback, type, array) => {
  chart.getZr().on("click", (params) => {
    let pointInPixel = [params.offsetX, params.offsetY];
    if (chart.containPixel("grid", pointInPixel)) {
      let pointInGrid = chart.convertFromPixel(
        {
          seriesIndex: 0,
        },
        pointInPixel
      );
      let xIndex = pointInGrid[0]; //索引
      let handleIndex = Number(xIndex);
      let seriesObj = chart.getOption(); //图表object对象
      // var op = chart.getOption();
      //获得图表中点击的列
      var colName = seriesObj.xAxis[0].data[handleIndex]; //获取点击的列名
      if (type == "useIndex") {
        callback(array[handleIndex]);
      } else if (type == "useColName") {
        callback(colName);
      } else {
        callback(seriesObj);
      }
    }
  });
};

export const commonTooltip = {
  trigger: "axis",
  extraCssText: normalCssExtra,
  textStyle: { color: "white" },
  axisPointer: {
    type: "shadow",
  },
};

export const commonDataZoom = (dataArray = [], itemNo = eItemNo) => {
  return {
    show: dataArray.length > itemNo,
    maxValueSpan: itemNo - 1,
    type: "slider",
    realtime: true,
    startValue: 0,
    endValue: 14,
    xAxisIndex: [0],
    bottom: 15,
    left: 80,
    right: 80,
    height: 5,
    borderColor: "rgba(0,0,0,0)",
    textStyle: {
      color: "#05D5FF",
    },
  };
};

export const commonLegend = (isCenter = false) => {
  const num = isCenter ? 14 : 10;
  return {
    orient: "horizontal",
    x: "center",
    y: "top",
    itemHeight: num,
    itemWidth: num,
    itemGap: 24,
    selectedMode: false,
    textStyle: {
      fontSize: num,
      lineHeight: num,
      fontWeight: "bold",
      color: "#1F6AAB",
    },
  };
};
export const commonGrid = (isCenter = false, dataArray = []) => {
  return {
    top: 46,
    left: dataArray?.length ? 24 : 36,
    right: dataArray?.length ? 24 : 36,
    bottom: dataArray.length > eItemNo ? 18 : 6,
    containLabel: true,
  };
};
export const commonXAxis = (isCenter = false) => {
  return {
    type: "category",
    axisLabel: {
      fontSize: isCenter ? 16 : 12,
      interval: 0, //全部显示x轴
      rotate: 45,
      formatter: function (obj, index) {
        return obj.length > 4 ? obj.substring(0, 3) + ".." : obj;
      },
    },
    axisLine: {
      lineStyle: {
        color: "white",
      },
    },
    nameTextStyle: {
      fontSize: isCenter ? 16 : 12, //字体大小
      padding: isCenter ? [0, 0, -30, -50] : [0, 0, -23, -20], //距离坐标位置的距离
      verticalAlign: "bottom",
    },
  };
};

// y轴 任务数
export const yAxisTaskNum = (isCenter = false) => {
  return {
    type: "value",
    name: "Num",
    nameTextStyle: {
      fontSize: isCenter ? 16 : 12, //字体大小
      padding: [0, -35, 0, -55], //距离坐标位置的距离
      verticalAlign: "bottom",
    },
    position: "left",
    minInterval: 1,
    axisTick: { show: true },
    splitLine: { show: false },
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: "white",
      },
    },
    axisLabel: {
      fontSize: isCenter ? 16 : 12,
    },
  };
};

export const yAxisCompleteRate = (isCenter = false) => {
  return {
    type: "value",
    name: "Rate",
    nameTextStyle: {
      fontSize: isCenter ? 16 : 12, //字体大小
      padding: [0, 25, 0, 50], //距离坐标位置的距离
      verticalAlign: "bottom",
    },
    position: "right",
    splitLine: { show: false },
    axisTick: { show: true },
    alignTicks: true,
    axisLine: {
      show: true,
      lineStyle: {
        color: "white",
      },
    },
    axisLabel: {
      formatter: "{value}%",
      fontSize: isCenter ? 16 : 12,
    },
  };
};

export const getNormalBarSeries = (
  isCenter = false,
  linearColor1,
  linearColor2
) => {
  return {
    type: "bar",
    stack: "Ad",
    barWidth: isCenter ? 18 : 14,
    // barWidth,
    emphasis: {
      focus: "series",
      disabled: true,
    },
    itemStyle: {
      borderWidth: 2,
      borderColor: "#02526b",
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: linearColor1 },
        { offset: 1, color: linearColor2 },
      ]),
    },
  };
};

export const getNormalBarSeriesOverlay = (
  isCenter = false,
  linearColor1,
  linearColor2
) => {
  return {
    type: "bar",
    stack: "y",
    barWidth: isCenter ? 22 : 18,
    // barWidth: 18,
    barGap: "-91%",
    tooltip: { show: false },
    // label: {
    //   show: false,
    //   position: 'top',
    //   color: '#000',
    // },
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: linearColor1 },
        { offset: 1, color: linearColor2 },
      ]),
      borderRadius: [8, 8, 0, 0],
      borderColor: "transparent",
      borderWidth: null,
    },
    emphasis: {
      focus: "series",
      disabled: true,
    },
  };
};

// line dot color
export const lineDotColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  { offset: 0, color: "#20FFE7" },
  { offset: 1, color: "#25BCC9" },
]);

export const getLineSeries = (color = lineDotColor, yAxisIndex = 1) => {
  return {
    type: "line",
    yAxisIndex,
    symbolSize: [8, 8],
    emphasis: {
      focus: "series",
      disabled: true,
    },
    itemStyle: { color },
    lineStyle: {
      width: 2,
      type: "solid",
      color: "#00FFE4",
    },
    // 阴影
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: "rgba(66,115,246,0.3)" },
        { offset: 0.5, color: "rgba(13, 51, 100, 0.1)" },
        { offset: 1, color: "rgba(0,0,0,0.1)" },
      ]),
    },
  };
};
