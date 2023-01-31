import React from "react";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateOpenedIndex } from "../../../../../../redux/actions";
import { CaretRightOutlined } from "@ant-design/icons";
import { findUpperObj } from "../../../../../../utils";
import { outlineIconMap, actOutlineIconMap } from "../../../mapConst";
import css from "./index.module.less";

const { Panel } = Collapse;

const Outline = ({ actIdx, setActiveOutline }) => {
  const dispatch = useDispatch();
  const openedIndex = useSelector((s) => s.rdcOpenedIndex);
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);

  const handleTitleClick = (e, data) => {
    const { children } = data;
    !children.length && e.stopPropagation();
    !children.length && setActiveOutline(data);
  };

  // 最外层的带图标的 title 的渲染
  const renderTitle = (obj) => {
    const isActive = obj.index === actIdx;
    return (
      <div className={css.title} onClick={(e) => handleTitleClick(e, obj)}>
        <img
          src={(isActive ? actOutlineIconMap : outlineIconMap)[obj.name]}
          alt="img"
        />
        <p>{obj.name}</p>
      </div>
    );
  };

  return (
    <Collapse
      ghost
      expandIconPosition="end"
      defaultActiveKey={openedIndex}
      onChange={(key) => dispatch(updateOpenedIndex(key))}
    >
      {outlineAllData.map((obj) => {
        const { children, index } = obj;
        const hightlightOutlineIdx =
          findUpperObj(outlineAllData, actIdx).index === index;
        return (
          <Panel
            className={`${css.panel_wrapper} ${
              hightlightOutlineIdx ? css.activeBg : ""
            } `}
            header={renderTitle(obj, index)}
            key={index}
            showArrow={false}
            collapsible={"header"}
            extra={
              !!children.length && (
                <CaretRightOutlined
                  style={{ color: hightlightOutlineIdx ? "white" : "#9292a2" }}
                  rotate={openedIndex.includes(index?.toString()) ? 90 : 0}
                />
              )
            }
          >
            {!!children.length &&
              children.map((item) => {
                const activeSelect = item.index === actIdx;
                return (
                  <div
                    key={item.index}
                    className={`${css.each_indise_title} ${
                      activeSelect ? css.atvInBg : ""
                    }`}
                    onClick={() => setActiveOutline(item)}
                  >
                    {item.name}
                  </div>
                );
              })}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default Outline;
