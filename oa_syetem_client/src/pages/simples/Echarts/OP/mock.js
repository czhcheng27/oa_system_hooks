export const assumeLabel = 5;
export const assumeNum = 5;
export const gap = 1;

export const colorMap = {
  提前完成: "#11C58A",
  按期完成: "#24E4BD",
  逾期完成: "#70EEEE",
  按计划进行: "#65B1FE",
  逾期未完成: "#FEA6A6",
  待启动: "#C6E0FE",
  延期启动: "#FFA943",
  延期待启动: "#FAE475",
};

export const nameMap = {
  1: "提前完成",
  2: "按期完成",
  3: "逾期完成",
  4: "按计划进行",
  5: "逾期未完成",
  6: "待启动",
  7: "延期启动",
  8: "延期待启动",
};

export const seriesItem = {
  type: "bar",
  stack: "total",
  barWidth: 12,
  label: {
    show: false,
  },
  itemStyle: {
    borderRadius: [0, 0, 0, 0],
  },
  emphasis: {
    focus: "series",
    disabled: true,
  },
};

export const getFinishNumArray = (data) => {
  const finishNumArray = [];
  data.forEach((obj, index) => {
    let num = 0;
    for (let i = 0; i < obj.opInfoMap.length; i++) {
      if (
        obj.opInfoMap[i].taskStatus == 1 ||
        obj.opInfoMap[i].taskStatus == 2 ||
        obj.opInfoMap[i].taskStatus == 3
      ) {
        num += obj.opInfoMap[i].count;
      }
    }
    finishNumArray.push(num);
  });
  return finishNumArray;
};

export const getTotalNumArray = (data) => {
  const totalNumArray = [];
  data.forEach((obj, index) => {
    let num = 0;
    for (let i = 0; i < obj.opInfoMap.length; i++) {
      num += obj.opInfoMap[i].count;
      if (i == obj.opInfoMap.length) {
        num = 0;
      }
    }
    totalNumArray.push(num);
  });
  return totalNumArray;
};

export const rateNum = (finishNum, totalNum) => {
  const rateArray = [];
  for (let i = 0; i < finishNum.length; i++) {
    for (let j = 0; j < totalNum.length; j++) {
      if (i == j) {
        const num = (
          (100 * parseFloat(finishNum[i])) /
          parseFloat(totalNum[i])
        ).toFixed(2);
        rateArray.push(num);
      }
    }
  }
  return rateArray;
};

export const name2RateMap = (data, rateArray, isActivity) => {
  let obj = {};
  for (let i = 0; i < data.length; i++) {
    obj[isActivity ? data[i].activityCode : data[i].areaName] = rateArray[i];
  }
  return obj;
};

export const getPlaceholder = (name, num) => {
  let str = "";
  let str2 = "";
  const reqLb2Num = assumeLabel - name.length;
  const reqBtwnNum = assumeNum - num.length;
  for (let i = 0; i < reqLb2Num; i++) {
    str += "&emsp;";
  }
  for (let j = 0; j < reqBtwnNum; j++) {
    str2 += "&ensp;";
  }
  return str + str2;
};

export const getPlaceholder2 = (name, percent) => {
  let str = "";
  let str2 = "";
  const requiredNum = assumeNum - name.length + gap;
  const reqBtwnNum = 5 - percent.length;
  for (let i = 0; i <= requiredNum; i++) {
    str += "&nbsp;";
  }
  for (let j = 0; j <= reqBtwnNum; j++) {
    str += "&nbsp;";
  }
  return str + str2 + "&emsp;";
};

export const apiMockData = {
  success: true,
  code: 200,
  message: "操作成功",
  data: [
    {
      areaId: "10047881_DE-0505",
      areaName: "前瞻造型部",
      opInfoMap: [
        {
          count: 219,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 6,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 43,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 15,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 87,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 2,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 58.87,
    },
    {
      areaId: "00001524_DE-0505",
      areaName: "项目管理部",
      opInfoMap: [
        {
          count: 1,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 0,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 0,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 2,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 33.33,
    },
    {
      areaId: "10047860_DE-0505",
      areaName: "NVH开发部",
      opInfoMap: [
        {
          count: 178,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 102,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 2,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 74,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 2,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 185,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 32.78,
    },
    {
      areaId: "10047882_DE-0505",
      areaName: "红旗品牌造型部",
      opInfoMap: [
        {
          count: 54,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 10,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 5,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 109,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 30.17,
    },
    {
      areaId: "10047867_DE-0505",
      areaName: "电机电驱动开发部",
      opInfoMap: [
        {
          count: 2,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 0,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 0,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 8,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 20,
    },
    {
      areaId: "10047876_DE-0505",
      areaName: "车端网联开发部",
      opInfoMap: [
        {
          count: 222,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 366,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 129,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 8,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 460,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 18.72,
    },
    {
      areaId: "10047868_DE-0505",
      areaName: "电池开发部",
      opInfoMap: [
        {
          count: 5,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 4,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 6,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 2,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 10,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 17.86,
    },
    {
      areaId: "10028396_DE-0505",
      areaName: "人工智能研究部",
      opInfoMap: [
        {
          count: 60,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 255,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 57,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 2,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 19,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 13,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 14.74,
    },
    {
      areaId: "10047861_DE-0505",
      areaName: "试制部",
      opInfoMap: [
        {
          count: 9,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 19,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 0,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 39,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 8,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 11.84,
    },
    {
      areaId: "10047871_DE-0505",
      areaName: "底盘开发部",
      opInfoMap: [
        {
          count: 118,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 13,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 12,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 85,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 2,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 816,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 11.28,
    },
    {
      areaId: "10047875_DE-0505",
      areaName: "智能空间开发部",
      opInfoMap: [
        {
          count: 136,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 379,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 296,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 6,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 768,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 1,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 8.58,
    },
    {
      areaId: "10047874_DE-0505",
      areaName: "智能驾驶开发部",
      opInfoMap: [
        {
          count: 20,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 93,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 25,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 2,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 157,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 2,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 6.67,
    },
    {
      areaId: "10047858_DE-0505",
      areaName: "车身开发部",
      opInfoMap: [
        {
          count: 115,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 9,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 274,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 2671,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 3.75,
    },
    {
      areaId: "10047891_DE-0505",
      areaName: "材料认可中心",
      opInfoMap: [
        {
          count: 9,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 102,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 5,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 14,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 118,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 2,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 3.6,
    },
    {
      areaId: "10047873_DE-0505",
      areaName: "电子电气开发部",
      opInfoMap: [
        {
          count: 37,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 391,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 14,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 35,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 10,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 866,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 11,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 5,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 2.7,
    },
    {
      areaId: "10047877_DE-0505",
      areaName: "软硬件集成部",
      opInfoMap: [
        {
          count: 16,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 136,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 28,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 1,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 318,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 128,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 2.55,
    },
    {
      areaId: "10047900_DE-0505",
      areaName: "研发质量管理部",
      opInfoMap: [
        {
          count: 2,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 7,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 11,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 4,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 56,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 2.5,
    },
    {
      areaId: "10047857_DE-0505",
      areaName: "整车开发部",
      opInfoMap: [
        {
          count: 10,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 63,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 1,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 18,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 2,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 557,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 1.54,
    },
    {
      areaId: "10047866_DE-0505",
      areaName: "系统集成开发部",
      opInfoMap: [
        {
          count: 6,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 63,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 41,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 3,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 337,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 2,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 27,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 1.25,
    },
    {
      areaId: "10047859_DE-0505",
      areaName: "CAE开发部",
      opInfoMap: [
        {
          count: 5,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 23,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 1,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 431,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 1.09,
    },
    {
      areaId: "10047862_DE-0505",
      areaName: "车辆对标中心",
      opInfoMap: [
        {
          count: 0,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 0,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 0,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 48,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 0,
    },
    {
      areaId: "10047870_DE-0505",
      areaName: "动力总成开发部",
      opInfoMap: [
        {
          count: 0,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 8,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 5,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 1,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 5,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 0,
    },
    {
      areaId: "10047885_DE-0505",
      areaName: "试验部",
      opInfoMap: [
        {
          count: 0,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 176,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 101,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 7,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 2,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 0,
    },
    {
      areaId: "10047889_DE-0505",
      areaName: "金属材料开发部",
      opInfoMap: [
        {
          count: 0,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 20,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 0,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 2,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 0,
    },
    {
      areaId: "10047890_DE-0505",
      areaName: "非金属材料开发部",
      opInfoMap: [
        {
          count: 0,
          taskStatus: 5,
          taskOrder: 1,
        },
        {
          count: 2,
          taskStatus: 8,
          taskOrder: 2,
        },
        {
          count: 0,
          taskStatus: 7,
          taskOrder: 3,
        },
        {
          count: 2,
          taskStatus: 6,
          taskOrder: 4,
        },
        {
          count: 0,
          taskStatus: 4,
          taskOrder: 5,
        },
        {
          count: 12,
          taskStatus: 3,
          taskOrder: 6,
        },
        {
          count: 0,
          taskStatus: 2,
          taskOrder: 7,
        },
        {
          count: 0,
          taskStatus: 1,
          taskOrder: 8,
        },
      ],
      finishPercent: 63.24,
      activityCode: null,
      expirePercent: 0,
    },
  ],
};
