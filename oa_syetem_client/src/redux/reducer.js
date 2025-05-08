import { combineReducers } from "redux";
import {
  SET_OPENED_INDEX,
  SET_OUTLINE_ALL_DATA,
  DATA_HAS_UPDATED,
  DRAG_START,
} from "src/redux/actions";
import { initOutline, mockOutline } from "../pages/comps/funcComps/mock";
import { cloneDeep } from "lodash";

// 大纲展开的 index 数组集合
const initOpenedIndex = [];
function rdcOpenedIndex(state = initOpenedIndex, action) {
  switch (action.type) {
    case SET_OPENED_INDEX:
      return action.payload;
    default:
      return state;
  }
}

// 全部大纲的 数据 数组集合
const initOutlineAllData = initOutline;
function rdcOutlineAllData(state = initOutlineAllData, action) {
  switch (action.type) {
    case SET_OUTLINE_ALL_DATA:
      return action.payload;
    default:
      return state;
  }
}

const initTestOutlineAllData = cloneDeep(initOutline);
function rdcTestOutlineAllData(state = initTestOutlineAllData, action) {
  switch (action.type) {
    case SET_OUTLINE_ALL_DATA:
      return action.payload;
    default:
      return state;
  }
}

// 全部数据是否有过改变
const initDataHasBeenUpdated = false;
function rdcDataHasUpdated(state = initDataHasBeenUpdated, action) {
  switch (action.type) {
    case DATA_HAS_UPDATED:
      return action.payload;
    default:
      return state;
  }
}

// 组件开始拖拽
const initDragStart = false;
function rdcDragStart(state = initDragStart, action) {
  switch (action.type) {
    case DRAG_START:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  rdcOpenedIndex,
  rdcOutlineAllData,
  rdcTestOutlineAllData,
  rdcDataHasUpdated,
  rdcDragStart,
});
