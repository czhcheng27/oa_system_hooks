import React, { useState, useEffect } from "react";
import { Dropdown } from "antd";
import { initTypeOneData } from "./mockConst";
import rightArrow from "./rightArrow.png";
import css from "./selectOpts.module.less";

const SelectOpts = ({
  props: { setLeadWords, setSelectedType, setValueData, handleSelectType },
}) => {
  // 类型选项的 menu
  const items = [
    {
      key: "1",
      label: (
        <div className={css.col1}>
          <div>
            {`a)`}
            <span></span>
            <div>:</div>
          </div>
          <div>
            {`1)`}
            <span></span>
            <div>;</div>
          </div>
        </div>
      ),
      onClick: () => (
        setLeadWords(""), setSelectedType("1"), setValueData(initTypeOneData)
      ),
    },
    {
      key: "2",
      label: (
        <div className={css.col2}>
          <div>
            <span>{`Qualify`}</span>
            <span></span>
            <div>:</div>
          </div>
          <div>
            {`——`}
            <span></span>
            <div>,</div>
          </div>
        </div>
      ),
      onClick: () => (setLeadWords(""), handleSelectType("2")),
    },
    {
      key: "3",
      label: (
        <div className={css.col2}>
          <div>
            <span>{`Qualify`}</span>
            <span></span>
            <div>:</div>
          </div>
          <div>
            {`——`}
            <span></span>
            <div>;</div>
          </div>
        </div>
      ),
      onClick: () => (setLeadWords(""), handleSelectType("3")),
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      overlayClassName="lineCol_dropdown_root"
      placement="bottomLeft"
      arrow={{
        pointAtCenter: true,
      }}
      trigger={["click"]}
    >
      <div className={css.icon_btn}>
        <img src={rightArrow} style={{ width: "10px" }} />
      </div>
    </Dropdown>
  );
};

export default SelectOpts;
