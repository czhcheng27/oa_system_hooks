// TechApplication
export const pinStyleMap = {
  3: {
    0: "pinLeft",
    3: "pinLeft",
    6: "pinLeft",
    2: "pinRight",
    5: "pinRight",
    8: "pinRight",
  },
  4: {
    0: "pinLeft",
    4: "pinLeft",
    8: "pinLeft",
    3: "pinRight",
    7: "pinRight",
    11: "pinRight",
  },
  5: {
    0: "pinLeft",
    5: "pinLeft",
    10: "pinLeft",
    4: "pinRight",
    9: "pinRight",
    14: "pinRight",
  },
  6: {
    0: "pinLeft",
    6: "pinLeft",
    12: "pinLeft",
    5: "pinRight",
    11: "pinRight",
    17: "pinRight",
  },
  7: {
    0: "pinLeft",
    7: "pinLeft",
    14: "pinLeft",
    6: "pinRight",
    13: "pinRight",
    20: "pinRight",
  },
  8: {
    0: "pinLeft",
    8: "pinLeft",
    16: "pinLeft",
    7: "pinRight",
    15: "pinRight",
    23: "pinRight",
  },
};

export const cssArray = [
  "threeEachRow",
  "fourEachRow",
  "fiveEachRow",
  "sixEachRow",
  "sevenEachRow",
  "eightEachRow",
];

export const boardPropArray = [
  {
    min: 0,
    max: 988,
    code: "threeEachRow",
    num: 3,
  },
  {
    min: 988,
    max: 1235,
    code: "fourEachRow",
    num: 4,
  },
  {
    min: 1235,
    max: 1482,
    code: "fiveEachRow",
    num: 5,
  },
  {
    min: 1482,
    max: 1729,
    code: "sixEachRow",
    num: 6,
  },
  {
    min: 1729,
    max: 1976,
    code: "sevenEachRow",
    num: 7,
  },
  {
    min: 1976,
    max: 9888,
    code: "eightEachRow",
    num: 8,
  },
];

// 评价信息四阶段
export const reviewStages = [
  {
    label: "1.启动后应用评价",
    stageStatus: 1, // 0: 未开始，1：已完成，2：执行中
  },
  {
    label: "2.配置技术应用评价人员",
    stageStatus: 1,
  },
  {
    label: "3.专家技术应用评价",
    stageStatus: 2,
  },
  {
    label: "4.主持人形成技术应用评价结论",
    stageStatus: 0,
  },
];
