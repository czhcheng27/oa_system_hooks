import { coms } from "@/pages/comps/funcComps/const";
import { categoryMap } from "@/pages/comps/funcComps/mapConst";
import { createUidKey, findUpperObj } from "@/utils";

/**
 * @description: 列表只新增时才调用的函数
 * @param {Array} source 左侧可拖拽组件的数据集合
 * @param {Array} destination 右侧列表中已有的数据（不包含当前正在被拖拽的组件）
 * @param {string} sourceIdx 拖拽的组件在 source 的 index
 * @param {string} destinationIdx 要插入到 destination 的 index
 * @return {Array} 更新后的右侧列表中的数据
 */
export const copy = (source, destination, sourceIdx, destinationIdx) => {
  console.log("==> copy", source, destination, sourceIdx, destinationIdx);
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[sourceIdx];
  destClone.splice(destinationIdx, 0, {
    ...item,
    id: createUidKey(),
  });
  return destClone;
};

/**
 * @description: 列表内部拖拽的重新排序
 * @param {Array} list 列表数组的原始顺序
 * @param {number} startIndex 被拖拽组件的起始 index
 * @param {number} endIndex 要拖拽到的地方的 index
 * @return {Array} 更新后的数组
 */
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const mapIdToComps = (activeOutline) => {
  return categoryMap;
  // switch (activeOutline.id) {
  //   case "1":
  //     return chapterOneComp;
  //   case "2":
  //     return chapterTwoComp;
  //   case "3":
  //     return chapterThreeComp;

  //   default:
  //     return categoryMap;
  // }
};

export const getCompSource = (activeOutline) => {
  const compNo = mapIdToComps(activeOutline)[0].compNo;
  const res = coms.filter((el) => compNo.includes(el.comType));
  return res;
};

// 设置拖拽的目录&章节类型，即 dragType
/**
 * @description: 获取拖拽至的区域的名字
 * @param {string} id
 * @param {function} setFunc setState 方法
 * @param {array} outlineAllData 全量数组数据
 * @return {string} 返回类型
 */
export const getSetDragType = (id, setFunc, outlineAllData) => {
  const idMap = {
    introduction: "introList",
    content: "list",
    appendix: "appxList",
  };
  const upperObj = findUpperObj(outlineAllData, id);
  setFunc(idMap[upperObj?.id]);
  return idMap[upperObj?.id];
};
