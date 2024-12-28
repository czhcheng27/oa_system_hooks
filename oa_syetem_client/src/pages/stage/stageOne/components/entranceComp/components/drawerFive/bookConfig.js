import PageA from "./components/PageA";
import PageB from "./components/PageB";
import PageC from "./components/PageC";
import PageD from "./components/PageD";
import PrefaceA from "./components/PrefaceA";
import PrefaceB from "./components/PrefaceB";

export const GAP_LEFT = "S1";
export const GAP_RIGHT = "S2";
export const LIGHT_HOUSE = "P0";
export const BUSINESS_CONTENT = "P123";
export const SUCCESS_LEFT = "P4.1";
export const SUCCESS_RIGHT = "P4.2";
// export const BUSINESS_LEFT = "P5.1";
// export const BUSINESS_RIGHT = "P5.2";
// export const REPORT_TOPIC = "P6";

export const pageCompMap = {
  [GAP_LEFT]: PrefaceA,
  [GAP_RIGHT]: PrefaceB,
  [LIGHT_HOUSE]: PageA,
  [BUSINESS_CONTENT]: PageB,
  [SUCCESS_LEFT]: PageC,
  [SUCCESS_RIGHT]: PageD,
  // [BUSINESS_LEFT]: PageA,
  // [BUSINESS_RIGHT]: PageB,
  // [REPORT_TOPIC]: PageC,
};

export const initVisiblePages = [0, 1, 2]; // 初始化打开书可见的页数 --- 即封面和左右序

// 自定义每个页面初始化参数字段名、及初始值
export const initParamsArray = [
  [LIGHT_HOUSE, "segVal", "0"], // 灯塔页的 segment 切换
  [BUSINESS_CONTENT, "hh", 1], // 中间页A hh 1
  [SUCCESS_LEFT, "pageC1", "10"], // 成功标志页类型：10历史，20进行中
  [SUCCESS_LEFT, "pageC2", {}], // 成功标志页当前选择对象
  [SUCCESS_LEFT, "pageC3", false], // 成功标志页左侧更新后是否刷新右侧
  [SUCCESS_RIGHT, "pageD", "s"], // 中间页B ss s
];

export const initFormatBookList = (booklist, pageName, param, initVal) => {
  const res = booklist.map((el, index) => {
    el?.contentVOList?.map((obj, idx) => {
      if (obj.name === pageName) {
        obj[param] = initVal;
      }
    });
    if (el.children?.length > 0) {
      initFormatBookList(el.children, pageName, param, initVal);
    }
    return el;
  });
  return res;
};

export const setCustomizeParams = (paramsList, booklist) => {
  let res = [];
  for (let i = 0; i < paramsList.length; i++) {
    const [pageName, param, initVal] = paramsList[i];
    res = initFormatBookList(booklist, pageName, param, initVal);
  }
  return res;
};
