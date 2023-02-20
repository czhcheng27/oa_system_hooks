import React, { useState, useEffect } from "react";
import { Dropdown, Form, Input, Menu, message, Space } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import classNames from "classnames";
import DelPop from "../../delPop";
import { colorCompMap } from "../../mapConst";
import { formulaArr } from "./formulaString";
import rightArrow from "./rightArrow.png";
import css from "./index.module.less";

const { Provider, Node } = require("@nteract/mathjax");

// eslint-disable-next-line react/display-name
const Formula = ({ props, comValueUpdate, onDelete }) => {
  const { content, id, properties } = props;

  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const [selectedStr, setSelectedStr] = useState("");
  const [claimData, setClaimData] = useState("");

  const initFunc = () => {
    let newStr = content;
    while (newStr.indexOf("\\\\") != "-1") {
      newStr = newStr.replace("\\\\", "\\");
    }
    setSelectedStr(newStr.substring(1, newStr.length - 1));
    setClaimData(properties.claimData);
  };

  useEffect(() => {
    props && initFunc();
  }, [props]);

  useEffect(() => {
    comValueUpdate(id, selectedStr, { claimData });
  }, [selectedStr, claimData]);

  // 渲染公式选项
  const items = formulaArr.reduce((pre, item) => {
    pre.push({
      label: <Node>{item}</Node>,
      onClick: () => (message.info(item), setSelectedStr(item)),
    });
    return pre;
  }, []);

  return (
    <div
      style={colorCompMap[props.comType].midBg}
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <img
        style={{ position: "absolute", height: "18px" }}
        src={require(`../areaLeft/comps/icons/${props.comType}.png`).default}
        alt={props.desc}
      />
      <div className={css.inside_wrapper}>
        <div className={css.formula_btn}>
          <Dropdown
            menu={{ items }}
            overlayClassName="dropdown_root"
            placement="bottomLeft"
            arrow={{
              pointAtCenter: true,
            }}
            trigger={["click"]}
          >
            <img src={rightArrow} style={{ width: "10px" }} />
          </Dropdown>
        </div>
        <div className={classNames(css.display_wrapper)}>
          <header>Formula</header>
          <section>
            <Node>{selectedStr}</Node>
          </section>
        </div>
        <div className={classNames(css.editor_area)}>
          <header>Edit</header>
          <section>
            <Input
              value={selectedStr}
              onChange={(e) => setSelectedStr(e.target.value)}
            />
          </section>
        </div>
        <div className={classNames(css.claim_area)}>
          <header>Input Notes</header>
          <section>
            <Input.TextArea
              value={claimData}
              onChange={(e) => setClaimData(e.target.value)}
              placeholder="Please input your content"
              rows={7}
            />
          </section>
        </div>
      </div>
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
export default Formula;
