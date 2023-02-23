import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Popconfirm } from "antd";
import css from "./index.module.less";

const PopCom = ({ children, disable, handleConfirm, position, title }) => {
  return (
    <Popconfirm
      overlayClassName="pop_confirm_style"
      placement={position}
      disabled={disable}
      title={title}
      onConfirm={() => handleConfirm()}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

export default PopCom;
