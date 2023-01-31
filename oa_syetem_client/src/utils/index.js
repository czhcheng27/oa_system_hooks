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

// 找到当前对象的上层对象
export const findUpperObj = (allData, curIdx) => {
  let object;
  allData.map((item) => {
    if (item.index === curIdx) {
      object = item;
      return;
    } else if (item.children) {
      item.children.map((obj) => {
        if (obj.index === curIdx) {
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
