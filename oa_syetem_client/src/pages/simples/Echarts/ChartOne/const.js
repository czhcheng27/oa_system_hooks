import * as echarts from "echarts";

export const requestData = [
  {
    projectNo: "C1107test",
    projectId: "844fe8738eb0c50585fdc548632560e0",
    ecrTotalNum: 1,
    doneRate: "100.00%",
    currentYearDoneNum: 1,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "TEST0001",
    projectId: "ac0a248bde503cd8f52ea1fa1a584ba8",
    ecrTotalNum: 1,
    doneRate: "0.00%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 1,
  },
  {
    projectNo: "C1000",
    projectId: "105af2fee0c37ae9e60e6fc2ac5e9627",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C1108TEST",
    projectId: "c1b4ae27fb0e3ec754ff221b2ace2959",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "test001",
    projectId: "3e8bb854ec116aab5a53e184f10e5250",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C229",
    projectId: "55192.24298.58816.40730",
    ecrTotalNum: 16,
    doneRate: "0.00%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 1,
    overdue: 15,
  },
  {
    projectNo: "C1121test",
    projectId: "4afbd1027c8c452fb0f1b6f2bbab66be",
    ecrTotalNum: 1,
    doneRate: "0.00%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 1,
  },
  {
    projectNo: "C1122test",
    projectId: "8a4e088203263f8459787db067978376",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C1123TEST",
    projectId: "3c59bd9d078c5cab4853ca2bdf6e4ffd",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C1119",
    projectId: "55192.24298.54444.59100",
    ecrTotalNum: 2,
    doneRate: "50.00%",
    currentYearDoneNum: 1,
    oldDoneNum: 0,
    doingNum: 1,
    overdue: 0,
  },
  {
    projectNo: "C1124test",
    projectId: "3bba31a48c23c3fcd140ce16453da80a",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C100",
    projectId: "55192.24298.54676.26257",
    ecrTotalNum: 3,
    doneRate: "67.00%",
    currentYearDoneNum: 2,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 1,
  },
  {
    projectNo: "C100",
    projectId: "208dd080722ac7a6e55dbb7293e40c72",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C200-mcy ",
    projectId: "616763feda15c28886a805ade500dbf9",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C1107",
    projectId: "7b159ec748496435d672cc99cdc405c2",
    ecrTotalNum: 1,
    doneRate: "100.00%",
    currentYearDoneNum: 1,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "C2216",
    projectId: "55192.24298.4672.46927",
    ecrTotalNum: 0,
    doneRate: "0%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "testw",
    projectId: "74cf85e03bac1af3cd56b61553ca5ae7",
    ecrTotalNum: 1,
    doneRate: "0.00%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 1,
  },
  {
    projectNo: "T1117",
    projectId: "8fd2fba01822d853cf73fc30f9330a9a",
    ecrTotalNum: 1,
    doneRate: "100.00%",
    currentYearDoneNum: 1,
    oldDoneNum: 0,
    doingNum: 0,
    overdue: 0,
  },
  {
    projectNo: "9999",
    projectId: "425b6c579bcd7dc9c6e50bf01175c451",
    ecrTotalNum: 1,
    doneRate: "0.00%",
    currentYearDoneNum: 0,
    oldDoneNum: 0,
    doingNum: 1,
    overdue: 0,
  },
];

export const statusMap = {
  oldDoneNum: "历史完成",
  currentYearDoneNum: "已切替",
  doingNum: "进行中",
  overdue: "已拖期",
  doneRate: "完成率",
  //ecrTotalNum: '设变总数',
};
export const colorMap = {
  oldDoneNum: {
    normal: {
      borderColor: "#fff",
      borderWidth: 0,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "#0ABF4E" },
        { offset: 0, color: "#73E1CC" },
      ]),
    },
  },
  currentYearDoneNum: {
    normal: {
      borderColor: "#fff",
      borderWidth: 0,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "#CAF680" },
        { offset: 0, color: "#59E383" },
      ]),
    },
  },
  doingNum: {
    normal: {
      borderColor: "#fff",
      borderWidth: 0,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "#79CEFF" },
        { offset: 0, color: "#44A0FE" },
      ]),
    },
  },
  overdue: {
    normal: {
      borderColor: "#fff",
      borderWidth: 0,
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "#FFA5A5" },
        { offset: 0, color: "#FF5858" },
      ]),
    },
  },
  doneRate: {
    color: "#77ABFF",
  },
  //ecrTotalNum: '设变总数',
};
export const barObj = {
  name: "历史完成",
  type: "bar",
  stack: "Ad",
  barWidth: 24,
  emphasis: {
    focus: "series",
  },
  label: {
    show: true,
    color: "#242F57",
    fontFamily: "Inter-Regular",
    fontSize: "10px",
    formatter: function (params) {
      const a = params.value;
      if (a > 0) {
        return a;
      } else {
        return "";
      }
    },
  },
  data: [],
};
export const lineObj = {
  name: "完成率",
  type: "line",
  stack: "完成率 / %",
  yAxisIndex: 1,
  label: {
    show: true,
    color: "#242F57",
    fontFamily: "Inter-Regular",
    fontSize: "10px",
    offset: [20, 5],
    formatter: function (value) {
      return value.value + "%";
    },
  },
  tooltip: {
    valueFormatter: function (value) {
      return value + "%";
    },
  },
  data: [],
};
