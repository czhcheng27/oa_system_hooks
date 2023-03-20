import { message } from "antd";
import { debounce, throttle, round, cloneDeep, merge } from "lodash";

// 函数的 防抖 和 节流，使用 lodash 工具函数
export { debounce, throttle, round, cloneDeep, merge };

export const createUidKey = (key = "") => {
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
  return key + uuid;
};

// 找到当前对象的上层对象 （find current obj's upper obj）
export const findUpperObj = (allData, curId) => {
  let object;
  allData.map((item) => {
    if (item.id === curId) {
      object = item;
      return;
    } else if (item.children) {
      item.children.map((obj) => {
        if (obj.id === curId) {
          object = item;
          return;
        }
      });
    }
  });
  return object;
};

export const set2len = (str) => {
  if (!isNaN(str)) {
    str += "";
  }
  return str.length == 1 ? "0" + str : str;
};

// 正则判断输入是否是时间格式，并自动优化返回
export const isDate = (str) => {
  if (!str) {
    return false;
  }
  var res = str.match(/^(\d{4})(-)(\d{1,2})\2(\d{1,2})$/);
  if (res == null) {
    return false;
  }
  var d = new Date(res[1], Number(res[3]) - 1, res[4]);
  return (
    d.getFullYear() +
    "-" +
    set2len(d.getMonth() + 1) +
    "-" +
    set2len(d.getDate())
  );
};

// 获取条一的 parentIndex 和 code
const getTitleOne = (array, i, activeOutline) => {
  const { varIndex: chapter } = activeOutline;

  // parentIndex 赋值
  array[i].parentIndex = activeOutline.varIndex;

  // 当前 index 之前的数组数据
  const preArr = array.slice(0, i);

  // 算出之前有多少个条一
  let countOne = 0;
  for (let j = 0; j < preArr.length; j++) {
    if (preArr[j].comType == 1) {
      countOne += 1;
    }
  }
  // code 赋值
  array[i].code = `${chapter}.${countOne + 1}`;
  return array;
};

// 获取当前 titleNo 前的条的 comType 数组
const generateNoArr = (titleNo) => {
  let arr = [];
  for (let i = 1; i < titleNo; i++) {
    arr.push(i);
  }
  return arr;
};

/*
  获取条(2-5)的 parendIndex 和 code，
  array：中间区域数组，
  i：当前组件的索引，
  titleNo：当前条的值(2-5)
*/
const getPindexAndCode = (array, i, titleNo) => {
  // 当前 index 之前的数组数据
  const preArr = array.slice(0, i);

  const bkPreArr = cloneDeep(preArr); // 要对 preArr 进行 reverse，但之后还要用preArr

  /*
    1，2，3，4，2，1，3
    获取距离最近的条，且距离最近的上一层级的条与当前的条之间 有他们 comType 之间的条
    当前 titleNo 减距离最近的上一层级的条的 comType 值大于 1 的话，
    那么需要判断，例如：1和4之间必须要有2，3

    1. 获取到距离最近的条的对象（最近的上一层级的条）
    2. 获取到距离最近的条的 index，
    3. 判断当前 titleNo 减距离最近的上一层级的条的 comType 值是否大于 1
    4. 大于 1 的话，slice 获取上一层级的条与当前的条之间的数据
    5. 判断这个数据中是否有之间的条的 comType
  */

  // 获取当前 titleNo 前的条的 comType 数组
  const beforeNoArr = generateNoArr(titleNo);

  // 1. 获取到距离最近的条的对象（最近的上一层级的条）
  const nearArr = bkPreArr
    .reverse()
    .find((el) => beforeNoArr.includes(el.comType));

  if (nearArr) {
    // 2. 获取到距离最近的条的 index
    const nearArrIndex = array.findIndex((el) => el.id == nearArr.id);

    let hasOrNot = true;
    // 3. 判断当前 titleNo 减距离最近的上一层级的条的 comType 值是否大于 1
    if (titleNo - nearArr.comType > 1) {
      // 4. 大于 1 的话，slice 获取上一层级的条与当前的条之间的数据
      const betweenArr = array.slice(nearArrIndex, i);
      // 5. 判断这个数据中是否有之间的条的 comType
      hasOrNot = betweenArr.find((el) => el.comType == titleNo - 1);
    }

    if (hasOrNot) {
      // parentIndex 赋值
      array[i].parentIndex = nearArr.code;

      // 将 preArr 数组内部的 comType 抽出来形成一个数组
      const comTypeArr = preArr.reduce((pre, item) => {
        pre.push(item.comType);
        return pre;
      }, []);

      // 得到最近的上一个层级的条的 index
      const lastIndex = comTypeArr.lastIndexOf(titleNo - 1);

      // 算出它与距离它最近的条一之间有多少个当前条
      // 先得到最近的条一至当前对象的数组
      const narrowArr = array.slice(lastIndex, i);

      // 算出之间有多少个当前条
      let count = 0;
      for (let j = 0; j < narrowArr.length; j++) {
        if (narrowArr[j].comType == titleNo) {
          count += 1;
        }
      }

      // code 赋值
      array[i].code = `${nearArr.code}.${count + 1}`;

      return array;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

// 获取除了“条”的其他组件的 parentIndex
const getOtherCompsPindex = (array, i, activeOutline) => {
  array[i].parentIndex = activeOutline.varIndex;
  // 当前 index 之前的数组数据
  const preArr = array.slice(0, i);

  // 获得最近的“条”的数据
  const arr = [1, 2, 3, 4, 5];
  const targetObj = preArr.reverse().find((el) => arr.includes(el.comType));

  if (targetObj) {
    // parentIndex 赋值
    array[i].parentIndex = targetObj.code;
  }
  return array;
};

export const generateParentIndex = (array, activeOutline) => {
  for (let i = 0; i < array.length; i++) {
    const comType = array[i].comType;
    if (comType == 1) {
      getTitleOne(array, i, activeOutline);
    } else if ([2, 3, 4, 5].includes(comType)) {
      getPindexAndCode(array, i, comType);
      if (!getPindexAndCode(array, i, comType)) {
        return;
      }
    } else {
      getOtherCompsPindex(array, i, activeOutline);
    }
  }
  return array;
};

// 限制输入只为数字
export const inputToNum = (data) => {
  const standardString = data.replace(/\s+/g, "");
  const arr = standardString.split("");
  const res = arr.reduce((pre, item) => {
    const strCode = item.charCodeAt();
    if (strCode < 58 && strCode > 48) {
      pre.push(item);
    } else {
      message.warning("Please type in Number");
    }
    return pre;
  }, []);
  return res.join("");
};

// 重置children数组内每个对象的index及name
export const resortIdx = (array) => {
  array.forEach((el, index) => {
    const chapterIndex = el.name.indexOf(".");
    const chapterName = el.name.slice(chapterIndex + 1, el.name.length);
    (el.index = `${index + 1}`) && (el.name = `${index + 1}.${chapterName}`);
  });
  return array;
};
