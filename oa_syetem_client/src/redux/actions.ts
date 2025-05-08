// 大纲展开的 index
export const SET_OPENED_INDEX = "set_opened_index";

export const SET_OUTLINE_ALL_DATA = "set_outline_all_data";

// 组件制标数据变更过
export const DATA_HAS_UPDATED = "data_has_updated";

// 组件开始拖拽
export const DRAG_START = "drag_start";

// 组件是否开始拖拽
export const dragStart = (payload) => ({ type: DRAG_START, payload });

// 是否编辑过
export const dataHasBeenUpdated = (payload) => ({
  type: DATA_HAS_UPDATED,
  payload,
});

// 大纲展开的 index 数组集合
export const updateOpenedIndex = (payload) => ({
  type: SET_OPENED_INDEX,
  payload,
});

// 大纲的全部数据
export const updateOutlineAllData = (payload) => ({
  type: SET_OUTLINE_ALL_DATA,
  payload,
});
