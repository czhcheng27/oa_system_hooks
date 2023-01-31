import { combineReducers } from "redux";
import { SET_OPENED_INDEX, SET_OUTLINE_ALL_DATA } from "./actions";
import { mockOutline } from "../pages/comps/revision/mock";

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
const initOutlineAllData = mockOutline;
function rdcOutlineAllData(state = initOutlineAllData, action) {
  switch (action.type) {
    case SET_OUTLINE_ALL_DATA:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  rdcOpenedIndex,
  rdcOutlineAllData,
});
