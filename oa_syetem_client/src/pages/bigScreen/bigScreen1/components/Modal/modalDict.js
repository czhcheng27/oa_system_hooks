import { yAxisCompleteRate, yAxisMillion } from "../../../../../utils/echarts";

const commonLegend = {
  orient: "horizontal",
  x: "center",
  y: "top",
  itemHeight: 10,
  itemWidth: 10,
  itemGap: 10,
  selectedMode: false,
  textStyle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F6AAB",
  },
};
const dataZoom = {
  type: "slider",
  show: true,
  xAxisIndex: [0, 1],
  maxValueSpan: 12,
  realtime: true,
  startValue: 0,
  endValue: 14,
  bottom: 0,
  left: 40,
  right: 40,
  height: 20,
  borderColor: "rgba(0,0,0,0)",
  textStyle: {
    color: "#05D5FF",
  },
};
const commonGrid = [
  {
    top: 40,
    left: 40,
    right: 40,
    bottom: 45,
  },
];
const commonXAxis = {
  type: "category",
  axisLabel: {
    fontSize: 12,
  },
  axisLine: {
    lineStyle: {
      color: "white",
    },
  },
};
const commonYAxisNum = {
  type: "value",
  width: 60,
  axisTick: { show: true },
  splitLine: { show: false },
  alignTicks: true,
  axisLabel: {
    width: 100,
  },
  axisLine: {
    show: true,
    lineStyle: {
      color: "white",
    },
  },
};
const commonYAxisRate = {
  type: "value",
  max: 100,
  min: 0,
  splitNumber: 5,
  axisLabel: {
    width: 100,
    formatter: (params) => {
      return `${params}%`;
    },
  },
  splitLine: { show: false },
  axisTick: { show: true },
  alignTicks: true,
  axisLine: {
    show: true,
    lineStyle: {
      color: "white",
    },
  },
};

export const modalOptions = {
  modalLeft: [
    {
      name: "Chart3",
      firstType: "chart",
      firstOption: {
        legend: {
          ...commonLegend,
          data: [
            { name: "Equip Number", icon: "circle" },
            {
              name: "Rate",
              lineStyle: { type: "dashed", width: 2, color: "#00FFE4" },
            },
          ],
        },
        dataZoom: dataZoom,
        grid: commonGrid,
        xAxis: {
          ...commonXAxis,
          name: "Department",
          nameTextStyle: {
            padding: [0, 0, -20, -32], //距离坐标位置的距离
            verticalAlign: "bottom",
          },
        },
        yAxis: [
          { ...yAxisMillion(), name: "Num", minInterval: 1 },
          yAxisCompleteRate(),
        ],
      },
      secondType: false,
      threeType: false,
    },
  ],
};
