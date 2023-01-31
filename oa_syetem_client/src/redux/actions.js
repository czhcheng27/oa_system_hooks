// 大纲展开的 index
export const SET_OPENED_INDEX = "set_opened_index";

export const SET_OUTLINE_ALL_DATA = "set_outline_all_data";

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
