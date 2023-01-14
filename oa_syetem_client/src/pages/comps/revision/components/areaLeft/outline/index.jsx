import React, { useState, useEffect, useCallback, useRef } from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { mockOutline } from "../../../mock";
import { outlineIconMap } from "../../../mapConst";
import css from "./index.module.less";

const { Panel } = Collapse;

const Outline = (props) => {
  const [activeIndex, setActiveIndex] = useState();
  const [openedIndex, setOpenedIndex] = useState([]);

  const handleTitleClick = (e, data, index) => {
    const { children } = data;
    setActiveIndex(index);
    !children.length && e.stopPropagation();
  };

  const renderTitle = (obj, index) => {
    return (
      <div
        className={css.title}
        onClick={(e) => handleTitleClick(e, obj, index)}
      >
        <img src={outlineIconMap[obj.label]} alt="img" />
        <p>{obj.label}</p>
      </div>
    );
  };

  return (
    <Collapse
      ghost
      expandIconPosition="end"
      onChange={(key) => setOpenedIndex(key)}
    >
      {mockOutline.map((obj, index) => {
        const { children } = obj;
        return (
          <Panel
            className={`${css.panel_wrapper} ${
              activeIndex === index ? css.activeBg : ""
            } `}
            header={renderTitle(obj, index)}
            key={index}
            showArrow={false}
            collapsible={"header"}
            extra={
              !!children.length && (
                <CaretRightOutlined
                  style={{ color: activeIndex === index ? "white" : "black" }}
                  rotate={openedIndex.includes(index?.toString()) ? 90 : 0}
                />
              )
            }
          >
            {!!children.length &&
              children.map((item, index) => {
                return <div key={index}>{item.label}</div>;
              })}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default Outline;
