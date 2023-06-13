export const mockEarthData = {
  censusData: {
    projectNum: 13,
    taskNum: 7264,
    projectList: [
      {
        title: "01",
        projectNum: 13,
        taskNum: 7264,
      },
      {
        title: "02",
        projectNum: 0,
        taskNum: 0,
      },
      {
        title: "03",
        projectNum: 0,
        taskNum: 0,
      },
      {
        title: "04",
        projectNum: 0,
        taskNum: 0,
      },
    ],
  },
  nodeList: [
    {
      title: "Node1",
      adventNum: "10",
      overdueNum: "20",
      completeNum1: "30",
      completeNum2: "40",
      planNum: "0",
    },
    {
      title: "Node2",
      adventNum: "50",
      overdueNum: "60",
      completeNum1: "70",
      completeNum2: "80",
      planNum: "90",
    },
    {
      title: "Node3",
      adventNum: "12",
      overdueNum: "34",
      completeNum1: "45",
      completeNum2: "56",
      planNum: "103",
    },
    {
      title: "Node4",
      adventNum: "67",
      overdueNum: "78",
      completeNum1: "89",
      completeNum2: "23",
      planNum: "12",
      eNum: 0,
      fNum: 2,
    },
    {
      title: "Node5",
      adventNum: "54",
      overdueNum: "23",
      completeNum1: "54",
      completeNum2: "77",
      planNum: "320",
    },
  ],
};

export const mockChartData1 = [
  {
    orgId: "10030256_DE-0505",
    orgName: "000",
    normalProcessNum: 51,
    limitedNum: 0,
    overdueNum: 0,
    completedNum: 1,
    completedRate: 100,
  },
  {
    normalProcessNum: 30, // 进行中
    limitedNum: 20, // 临期
    overdueNum: 10, // 逾期
    completedNum: 1,
    completedRate: 100, // 完成率
    orgName: "111",
    orgId: "qwe",
  },
  {
    normalProcessNum: 10,
    limitedNum: 30,
    overdueNum: 0,
    completedNum: 1,
    completedRate: 34,
    orgName: "222",
    orgId: "asd",
  },
  {
    normalProcessNum: 10,
    limitedNum: 20,
    overdueNum: 30,
    completedNum: 4,
    completedRate: 43,
    orgName: "333",
    orgId: "zxc",
  },
  {
    orgId: "10030256_DE-0505",
    orgName: "000",
    normalProcessNum: 51,
    limitedNum: 0,
    overdueNum: 0,
    completedNum: 1,
    completedRate: 100,
  },
  {
    normalProcessNum: 30, // 进行中
    limitedNum: 20, // 临期
    overdueNum: 10, // 逾期
    completedNum: 1,
    completedRate: 100, // 完成率
    orgName: "111",
    orgId: "qwe",
  },
  {
    normalProcessNum: 10,
    limitedNum: 30,
    overdueNum: 0,
    completedNum: 1,
    completedRate: 34,
    orgName: "222",
    orgId: "asd",
  },
  {
    normalProcessNum: 10,
    limitedNum: 20,
    overdueNum: 30,
    completedNum: 4,
    completedRate: 43,
    orgName: "333",
    orgId: "zxc",
  },
  {
    orgId: "10030256_DE-0505",
    orgName: "000",
    normalProcessNum: 51,
    limitedNum: 0,
    overdueNum: 0,
    completedNum: 1,
    completedRate: 100,
  },
  {
    normalProcessNum: 30, // 进行中
    limitedNum: 20, // 临期
    overdueNum: 10, // 逾期
    completedNum: 1,
    completedRate: 100, // 完成率
    orgName: "111",
    orgId: "qwe",
  },
  {
    normalProcessNum: 10,
    limitedNum: 30,
    overdueNum: 0,
    completedNum: 1,
    completedRate: 34,
    orgName: "222",
    orgId: "asd",
  },
  {
    normalProcessNum: 10,
    limitedNum: 20,
    overdueNum: 30,
    completedNum: 4,
    completedRate: 43,
    orgName: "333",
    orgId: "zxc",
  },
];

export const mockChartData2Top = [
  {
    title: "Published：",
    value: 53,
  },
  {
    title: "Plan：",
    value: 168,
  },
  {
    title: "Rate：",
    value: "32%",
  },
];

export const mockChartData2Bot = [
  {
    planCount: 100, //计划发布数
    succplanCount: 60, //已发布标准数量
    sdcPlanRate: "50", //完成率
    month: 1, //月份
  },
  {
    planCount: 80,
    succplanCount: 30,
    sdcPlanRate: "30",
    month: 2,
  },
  {
    planCount: 90,
    succplanCount: 40,
    sdcPlanRate: "80",
    month: 3,
  },
  {
    planCount: 42,
    succplanCount: 9,
    sdcPlanRate: "21",
    month: 4,
  },
  {
    planCount: 58,
    succplanCount: 22,
    sdcPlanRate: "38",
    month: 5,
  },
  {
    planCount: 12,
    succplanCount: 6,
    sdcPlanRate: "50",
    month: 6,
  },
  {
    planCount: 60,
    succplanCount: 20,
    sdcPlanRate: "10",
    month: 7,
  },
  {
    planCount: 50,
    succplanCount: 10,
    sdcPlanRate: "90",
    month: 8,
  },
  {
    planCount: 60,
    succplanCount: 40,
    sdcPlanRate: "20",
    month: 9,
  },
  {
    planCount: 50,
    succplanCount: 10,
    sdcPlanRate: "100",
    month: 10,
  },
  {
    planCount: 80,
    succplanCount: 70,
    sdcPlanRate: "40",
    month: 11,
  },
  {
    planCount: 90,
    succplanCount: 30,
    sdcPlanRate: "70",
    month: 12,
  },
];

export const mockChartData3 = [
  {
    equipNo: "C100",
    equipName: "Equipment1",
    equipNumber: 18,
    equipRate: "37",
    org: "org1",
  },
  {
    equipNo: "C200",
    equipName: "Equipment2",
    equipNumber: 13,
    equipRate: "45",
    org: "org2",
  },
  {
    equipNo: "C300",
    equipName: "Equipment3",
    equipNumber: 23,
    equipRate: "56",
    org: "org3",
  },
  {
    equipNo: "C400",
    equipName: "Equipment4",
    equipNumber: 33,
    equipRate: "98",
    org: "org4",
  },
  {
    equipNo: "C500",
    equipName: "Equipment5",
    equipNumber: 33,
    equipRate: "13",
    org: "org5",
  },
  {
    equipNo: "C600",
    equipName: "Equipment6",
    equipNumber: 41,
    equipRate: "74",
    org: "org6",
  },
  {
    equipNo: "C700",
    equipName: "Equipment7",
    equipNumber: 23,
    equipRate: "63",
    org: "org7",
  },
  // {
  //   equipNo: "C800",
  //   equipName: "Equipment8",
  //   equipNumber: 24,
  //   equipRate: "23",
  //   org: "org8",
  // },
];

export const mockChartData7 = {
  sum: "3789",
  have: "2825",
  noPerfect: "964",
  avg: "81.87",
  scatterPointList: [
    {
      firstSystem: "0227",
      firstSystemName: "System 1",
      abilityScore: 12.17,
      tacticScore: 9,
    },
    {
      firstSystem: "0310",
      firstSystemName: "System 2",
      abilityScore: 89.09,
      tacticScore: 9.95,
    },
    {
      firstSystem: "0301",
      firstSystemName: "System 3",
      abilityScore: 88.62,
      tacticScore: 6.8,
    },
    {
      firstSystem: "0231",
      firstSystemName: "System 4",
      abilityScore: 98.63,
      tacticScore: 6.51,
    },
    {
      firstSystem: "0248",
      firstSystemName: "System 5",
      abilityScore: 69.4,
      tacticScore: 5.15,
    },
  ],
};
