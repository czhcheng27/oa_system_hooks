export type FilterOpts = {
  name: string;
  label: string;
  conditionOpts: array;
  firstVal: string;
  code: number;
  mode?: string;
  operator: string;
  values: any;
  disabled: boolean;
  msg: string;
};

export type StandardOptions = {
  label: string;
  value: string | number;
};

export type FormatFilterData = {
  logicalOperator: "AND" | "OR";
  conditionVOList: ConditionVOList[];
};

export type ConditionVOList = {
  name: string;
  operator: string;
  values: Array;
  [property: string]: any;
};

export type AddFunc = (
  defaultValue?: any,
  insertIndex?: number | undefined
) => void;
