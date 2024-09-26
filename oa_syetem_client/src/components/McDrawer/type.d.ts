// drawer ref 暴露的方法
export type McDrawerRef = {
  openHandle: (params: OpenHandleParams) => void;
};

// 打开 drawer 方法的入参
export type OpenHandleParams = {
  type: string;
  [property: string]: any;
};

// drawer 的 props 入参
export type McDrawerProps = {
  callback: (type: string, value: ValueData) => void;
  callCloseBack?: (value: OpenHandleParams) => void;
};

// 点击 确定按钮 的返回体
export type ValueData = {
  code: string | number;
  data?: unknown;
  message?: string;
};

// 子组件 ref 暴露的方法
export type DictRef = {
  getSelectData: any;
  resetValueFunc: () => void;
};

// drawer 公用方法
export type CommonDrawerFunc = {
  setConfirmLoading?;
  setDisableConfirm?;
  setLoading?;
  closeHandle?;
  pureCloseModal?;
};
