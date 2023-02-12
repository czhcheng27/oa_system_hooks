import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import css from "./index.module.less";

const DelChapter = ({ props, setBtnClicked, hoverStatus, setHoverStatus }) => {
  const visivleChange = (visible) => {
    !visible && setBtnClicked(false);
    !visible && setHoverStatus(false);
  };

  const styleObj = Object.assign({
    display: "inline-block",
    background: "red",
    zIndex: "11",
  });

  return (
    <Popconfirm
      overlayClassName="pop_confirm"
      placement="right"
      title="Delete this component?"
      okText="Yes"
      cancelText="No"
      autoAdjustOverflow={false}
      destroyTooltipOnHide={false}
      onOpenChange={visivleChange}
      //   onConfirm={() => (onDelete(), setBtnClicked(false))}
      onCancel={(e) => (
        setBtnClicked(false), setHoverStatus(true), e.stopPropagation()
      )}
    >
      <CloseCircleOutlined
        className={css.del_btn}
        style={styleObj}
        onClick={(e) => (setBtnClicked(true), e.stopPropagation())}
      />
    </Popconfirm>
  );
};

export default DelChapter;
