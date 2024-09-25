import { FilterOpts } from "./type";

// 第一列值：当
export const WHEN = "when";
export const GREATER = ">";
export const LESS = "<";
export const BETWEEN = "between";
export const EQUAL = "=";
export const NOT_EQUAL = "!=";

export const STANDARDNO = "standardNo"; // 标准号
export const STANDARDNAME = "standardName"; // 标准名称
export const STANDARDSTATUS = "standardState"; // 标准状态
export const PUBLISHDATE = "standadPasstimeNewStr"; // 发布日期
export const APPLYDATE = "standardImplementtimeStr"; // 实施日期
export const GROUPSTDTYPE = "groupType"; // 集团级企标分类
export const PROFSTDTYPE = "profType"; // 专业级企标分类
export const DRAFTINS = "drafterHospital"; // 起草院
export const DRAFTDEPT = "drafterCompanyName"; // 起草部门
export const DRAFTPERSON = "drafterName"; // 起草人
export const SECRETLEVEL = "secretLevel"; // 标准密级

// 数据字典 map
export const dictCodeMap = {
  [STANDARDSTATUS]: "standardStatus",
  [SECRETLEVEL]: "standardSecretLevel",
  [GROUPSTDTYPE]: "standard_mainType" + "|tree",
  [PROFSTDTYPE]: "sdc_standard_class_zb",
};

// 第一行第一列 options
export const firstIndexZeroOpts = [
  {
    label: "WHEN",
    value: WHEN,
  },
];

// 第一列 options
export const firstOpts = [
  {
    label: "AND",
    value: "AND",
  },
  {
    label: "OR",
    value: "OR",
  },
];

// 下拉选项 fieldName 对应字段
export const fieldNameMap = {
  [STANDARDNO]: {
    label: "standardNo",
    id: "id",
  },
  [STANDARDNAME]: {
    label: "standardName",
    id: "id",
  },
  [DRAFTINS]: {
    label: "name",
    id: "id",
  },
  [DRAFTDEPT]: {
    label: "name",
    id: "id",
  },
};

// 文本类条件选项
const textConditionOpts = [
  {
    label: "EQUAL",
    value: EQUAL,
  },
  {
    label: "NOT EQUAL",
    value: NOT_EQUAL,
  },
  {
    label: "ANY",
    value: "in",
  },
  {
    label: "NOT ANY",
    value: "notin",
  },
];

// 下拉类条件选项
const selectConditionOpts = [
  {
    label: "INCLUDE",
    value: "in",
  },
];

// 时间类条件选项
const dateConditionOpts = [
  {
    label: "GREATER",
    value: GREATER,
  },
  {
    label: "LESS",
    value: LESS,
  },
  {
    label: "BETWEEN",
    value: BETWEEN,
  },
];

// 日期组件集合
export const dateComp = [PUBLISHDATE, APPLYDATE];

// 跟随可选条件值联动变化的对象 name 合集
export const specialRelatedUpdateArr = [PUBLISHDATE, APPLYDATE];

// 当选项为“等于”或“不等于”时，为单选
export const singleSelectArr = [EQUAL, NOT_EQUAL];

// 特殊组可选条件值对应的 不同组件
export const specialCompMap = {
  [GREATER]: 30,
  [LESS]: 30,
  [BETWEEN]: 40,
};

/*
10: Input;
20: Select;
30: DatePicker
40: RangePicker 
50：Dynamic Remote Search: 下拉选，不直接获取全部数据，支持接口动态搜索
60：SelectUserModal
70：Normal Select With Filter: 下拉选，直接获取全部数据，前端进行搜索过滤
*/
export const initFilterOpts: FilterOpts[] = [
  {
    name: STANDARDNO,
    label: "STANDARD NO",
    conditionOpts: textConditionOpts,
    firstVal: "",
    code: 70,
    operator: textConditionOpts[0].value,
    values: undefined,
    disabled: false,
    msg: "Please select standard No",
  },
  {
    name: STANDARDNAME,
    label: "STANDARD NAME",
    conditionOpts: textConditionOpts,
    firstVal: "",
    code: 70,
    operator: textConditionOpts[0].value,
    values: undefined,
    disabled: false,
    msg: "Please select standard Name",
  },
  //   {
  //     name: STANDARDSTATUS,
  //     label: "标准状态",
  //     conditionOpts: selectConditionOpts,
  //     firstVal: "",
  //     code: 20,
  //     mode: "multiple",
  //     operator: selectConditionOpts[0].value,
  //     values: undefined,
  //     disabled: false,
  //     msg: "请选择标准状态",
  //   },
  {
    name: PUBLISHDATE,
    label: "PUBLISH DATE",
    conditionOpts: dateConditionOpts,
    firstVal: "",
    code: 30,
    operator: dateConditionOpts[0].value,
    values: null,
    disabled: false,
    msg: "Please select publish date",
  },
  {
    name: APPLYDATE,
    label: "APPLY DATE",
    conditionOpts: dateConditionOpts,
    firstVal: "",
    code: 30,
    operator: dateConditionOpts[0].value,
    values: null,
    disabled: false,
    msg: "Please select apply date",
  },
  //   {
  //     name: GROUPSTDTYPE,
  //     label: "集团级企标分类",
  //     conditionOpts: selectConditionOpts,
  //     firstVal: "",
  //     code: 20,
  //     mode: "multiple",
  //     operator: selectConditionOpts[0].value,
  //     values: undefined,
  //     disabled: false,
  //     msg: "请选择集团级企标分类",
  //   },
  //   {
  //     name: PROFSTDTYPE,
  //     label: "专业级企标分类",
  //     conditionOpts: selectConditionOpts,
  //     firstVal: "",
  //     code: 20,
  //     mode: "multiple",
  //     operator: selectConditionOpts[0].value,
  //     values: undefined,
  //     disabled: false,
  //     msg: "请选择专业级企标分类",
  //   },
  {
    name: DRAFTINS,
    label: "DRAFT INS",
    conditionOpts: textConditionOpts,
    firstVal: "",
    code: 70,
    operator: textConditionOpts[0].value,
    values: undefined,
    disabled: false,
    msg: "Please selelct draft insitiuation",
  },
  //   {
  //     name: DRAFTDEPT,
  //     label: "起草部门",
  //     conditionOpts: textConditionOpts,
  //     firstVal: "",
  //     code: 70,
  //     operator: textConditionOpts[0].value,
  //     values: undefined,
  //     disabled: false,
  //     msg: "请选择起草部门",
  //   },
  //   {
  //     name: DRAFTPERSON,
  //     label: "起草人",
  //     conditionOpts: textConditionOpts,
  //     firstVal: "",
  //     code: 60,
  //     operator: textConditionOpts[0].value,
  //     values: undefined,
  //     mode: "single",
  //     disabled: false,
  //     msg: "请选择起草人",
  //   },
  //   {
  //     name: SECRETLEVEL,
  //     label: "标准密级",
  //     conditionOpts: selectConditionOpts,
  //     firstVal: "",
  //     code: 20,
  //     mode: "multiple",
  //     operator: selectConditionOpts[0].value,
  //     values: undefined,
  //     disabled: false,
  //     msg: "请选择标准密级",
  //   },
];
