import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { colorCompMap } from "../../mapConst";
import css from "./index.module.less";

const DelPop = ({
  props,
  onDelete,
  setBtnClicked,
  hoverStatus,
  setHoverStatus,
}) => {
  const visivleChange = (visible) => {
    if (visible) return;
    setBtnClicked(false);
    setHoverStatus(false);
  };

  const styleObj = Object.assign(
    { display: hoverStatus ? "block" : "none" },
    props && colorCompMap[props.comType].delIcon
  );

  return (
    <Popconfirm
      overlayClassName="delpop_confirm"
      placement="left"
      title="Are you sure to delete this comps?"
      okText="Yes"
      cancelText="No"
      autoAdjustOverflow={false}
      onOpenChange={visivleChange}
      onConfirm={() => (onDelete(), setBtnClicked(false))}
      onCancel={() => (setBtnClicked(false), setHoverStatus(true))}
      //   getPopupContainer={(triggerNode) => triggerNode.parentNode}
    >
      <CloseCircleOutlined
        className={css.del_btn}
        style={styleObj}
        onClick={() => setBtnClicked(true)}
      />
    </Popconfirm>
  );
};

export default DelPop;
