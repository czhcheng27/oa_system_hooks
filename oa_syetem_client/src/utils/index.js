import { message } from "antd";
import moment from "moment";
import { debounce, throttle, round, cloneDeep, merge } from "lodash";

// 函数的 防抖 和 节流，使用 lodash 工具函数
export { debounce, throttle, round, cloneDeep, merge };

export const nextTick = (cb) => {
  Promise.resolve().then(cb);
};

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

//验证正整数
export const checkIsPositiveIntegerEx0 = (value, callback) => {
  var reg = /^([1-9][0-9]*)$/;
  if (reg.test(value)) {
    return value;
  } else {
    message.warn("请输入大于0的正整数");
    return "";
  }
};

// 限制输入只为数字及大写字母
export const inputToNumAlp = (data) => {
  const standardString = data.replace(/\s+/g, "");
  const arr = standardString.split("");
  const res = arr.reduce((pre, item) => {
    const strCode = item.charCodeAt();
    if ((strCode < 58 && strCode >= 48) || (strCode <= 90 && strCode >= 65)) {
      pre.push(item);
    } else {
      message.warning("请输入数字或大写字母");
    }
    return pre;
  }, []);
  return res.join("");
};

// 限制输入只为数字，从0-99，不能有00
export const inputToTwoDigitNum = (data) => {
  let res = data;
  const standardString = data.replace(/\s+/g, "");
  const arr = standardString.split("");
  if (arr.find((el) => el.charCodeAt() >= 58 || el.charCodeAt() < 48)) {
    message.warning("只能输入数字");
    return "";
  }
  if (data == "00") res = "0";
  if (data.length > 2) {
    res = arr.splice(0, 2).join("");
    message.warning("最多输入两位数字");
  }
  return res;
};

// 格式化日对象
export const getNowDate = () => {
  var date = new Date();
  var sign2 = ":";
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds(); //秒
  var weekArr = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期天",
  ];
  var week = weekArr[date.getDay()];
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  return (
    year +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    sign2 +
    minutes +
    sign2 +
    seconds
  );
};

// 重置children数组内每个对象的index及name
export const resortIdx = (array, name) => {
  if (name === "content") {
    visibleChangeFormatArr(array);
  } else if (name === "appendix") {
    for (let i = 0; i < array.length; i++) {
      const symbol = String.fromCharCode(65 + i);
      array[i].varIndex = symbol;
      array[i].index = symbol;
      array[i].name = `Appendix ${symbol}`;
    }
  }
  return array;
};

// 切换div时使输入id的div模块回到指定位置
export const idBackTo = (id, x = 0, y = 0) => {
  const divBlock = document.getElementById(id);
  divBlock && divBlock.scrollTo(x, y);
};

// 正文章节下眼睛的显隐后，正文所有章节的index，name等的重新排序
export const visibleChangeFormatArr = (arr) => {
  const pre = arr.slice(1, 3);
  const after = arr.slice(3, arr.length);
  let falseCount = 0, // 点灭的章节数量
    trueId = []; // 点亮的章节id
  for (let i = 0; i < pre.length; i++) {
    !pre[i].visible && (falseCount = falseCount + 1);
    pre[i].visible && trueId.push(pre[i].id);
  }
  // 如果一亮一灭，谁亮谁是章节2
  if (falseCount == 1) {
    pre.forEach((el) => {
      if (el.id === trueId[0]) {
        const orgNameIndex = el.name.indexOf(".");
        const orgName = el.name.slice(orgNameIndex + 1, el.name.length);
        (el.varIndex = "2") && (el.name = `2.${orgName}`);
      }
    });
  } else {
    for (let i = 0; i < pre.length; i++) {
      const orgNameIndex = pre[i].name.indexOf(".");
      const orgName = pre[i].name.slice(orgNameIndex + 1, pre[i].name.length);
      const newIndex = `${i + 2}`;
      pre[i].varIndex = newIndex;
      pre[i].name = `${newIndex}.${orgName}`;
    }
  }

  for (let i = 0; i < after.length; i++) {
    const orgNameIndex = after[i].name.indexOf(".");
    const orgName = after[i].name.slice(orgNameIndex + 1, after[i].name.length);
    after[i].id = `${i + 4}`;
    const newIndex = `${after[i].id * 1 - falseCount}`;
    after[i].varIndex = newIndex;
    after[i].name = `${newIndex}.${orgName}`;
  }
  return arr;
};

export const formatTime = (date) => {
  if (date) {
    let time = new Date(date);
    return addZero(time.getMonth() + 1) + "/" + addZero(time.getDate());
  } else {
    return null;
  }
};
export const addZero = (num) => {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
};
export const taskSatus = (daysOverdue, warnNum = 5, isFinish = false) => {
  if (isFinish) {
    return { name: "done", text: "已完成" };
  } else {
    if (daysOverdue < 0) {
      return { name: "overdue", text: "超期" };
    } else if (daysOverdue <= warnNum) {
      //未超期（提醒）
      return { name: "warn", text: "即将超期" };
    } else {
      //进行中
      return { name: "normal", text: "进行中" };
    }
  }
};

export const getInputTime = (time) => {
  let str = "";
  if (
    moment(moment(time).format("YYYY-MM-DD")).isSame(
      moment().format("YYYY-MM-DD"),
      "day"
    )
  ) {
    str = "Today";
  } else if (
    moment(moment(time).format("YYYY-MM-DD")).isSame(
      moment(moment().subtract(1, "day")).format("YYYY-MM-DD"),
      "day"
    )
  ) {
    str = "Yesterday";
  } else if (
    moment(moment(time).format("YYYY-MM-DD")).isSame(
      moment(moment().subtract(2, "day")).format("YYYY-MM-DD"),
      "day"
    )
  ) {
    str = "DBY";
  } else if (
    moment(moment(time).format("YYYY-MM-DD")).isSame(moment(), "year")
  ) {
    str = moment(time).format("MM-DD");
  } else {
    str = time;
  }
  return str;
};

export function isEmpty(item, value) {
  if (
    item === "" ||
    item === undefined ||
    item === null ||
    Number.isNaN(item)
  ) {
    if (value !== undefined) {
      return value;
    }
    return true;
  } else {
    if (value !== undefined) {
      return item;
    }
    return false;
  }
}

export function getDaysBetween(date1, date2) {
  const startDate = Date.parse(`${isEmpty(date1, "").slice(0, 10)} 00:00:00`);
  const endDate = Date.parse(`${isEmpty(date2, "").slice(0, 10)} 00:00:00`);
  if (startDate > endDate) {
    return -(startDate - endDate) / (1 * 24 * 60 * 60 * 1000);
  }
  if (startDate == endDate) {
    return 0;
  }
  const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
  return days;
}

export const listenBtn = (getHTMLFunc, index, setStateFunc, enableNo) => {
  const config = { attributes: true, childList: true, subtree: true };
  const callback = (mutationsList, observer) => {
    //  mutationsList中attributeName为class下的target值为当前对应按钮是否选中
    const enabled = mutationsList[0].target.classList.length === enableNo;
    setStateFunc(enabled);
  };

  setTimeout(() => {
    try {
      const htmlcollection = getHTMLFunc();
      const targetNodeList = Array.prototype.slice.call(htmlcollection);
      const targetNode = targetNodeList[index];
      if (!targetNode) {
        throw new Error("no targetNode");
      }
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    } catch (e) {
      listenBtn(getHTMLFunc, index, setStateFunc, enableNo);
    }
  }, 10);
};
