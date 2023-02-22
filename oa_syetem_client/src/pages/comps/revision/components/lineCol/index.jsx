import React, { useState, useEffect } from "react";
import { Input, Dropdown, Menu, Popconfirm } from "antd";
import { createUidKey } from "../../../../../utils/index";
import DelPop from "../../delPop";
import { colorCompMap } from "../../mapConst";
import {
  typeOneObj,
  typeTwoObj,
  initTypeOneData,
  typePlaceholder,
} from "./mockConst";
import rightArrow from "./rightArrow.png";
import css from "./index.module.less";

const LineCol = ({ props, comValueUpdate, onDelete }) => {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [selectedType, setSelectedType] = useState("1");
  const [valueData, setValueData] = useState(initTypeOneData);
  const [leadWords, setLeadWords] = useState("");
  const [clickedBtnData, setClickedBtnData] = useState();

  const handleSelectType = (type) => {
    setSelectedType(type);
    setValueData([{ ...typeTwoObj, id: createUidKey() }]);
  };

  // 类型选项的 menu
  const items = [
    {
      key: "1",
      label: (
        <div className={css.col1}>
          <p>
            {`a)`}
            <span></span>:
          </p>
          <p>
            {`1)`}
            <span></span>;
          </p>
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
          <p>
            <span>{`Qualify`}</span>
            <span></span>:
          </p>
          <p>
            {`——`}
            <span></span>,
          </p>
        </div>
      ),
      onClick: () => (setLeadWords(""), handleSelectType("2")),
    },
    {
      key: "3",
      label: (
        <div className={css.col2}>
          <p>
            <span>{`Qualify`}</span>
            <span></span>:
          </p>
          <p>
            {`——`}
            <span></span>;
          </p>
        </div>
      ),
      onClick: () => (setLeadWords(""), handleSelectType("3")),
    },
  ];

  return (
    <div
      style={colorCompMap[props.comType].midBg}
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <img
        style={{ position: "absolute", top: "19px", height: "18px" }}
        src={require(`../areaLeft/comps/icons/${props.comType}.png`).default}
        alt={props.desc}
      />

      {/* 选择样式 */}
      <div className={css.selector_wrapper}>
        <Input placeholder={typePlaceholder[selectedType]} readOnly />
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
      </div>

      {/* 引导语输入 */}
      <div style={{ margin: "12px 0 14px 31px" }}>
        <Input
          value={leadWords}
          onChange={(e) => setLeadWords(e.target.value)}
          placeholder="Please Input Leading Words"
        />
      </div>

      {/* 相应类型样式渲染 */}
      {/* <div>{renderLineCol()}</div> */}
      <DelPop
        props={props}
        onDelete={onDelete}
        setBtnClicked={setBtnClicked}
        hoverStatus={hoverStatus}
        setHoverStatus={setHoverStatus}
      />
    </div>
  );
};

export default LineCol;
