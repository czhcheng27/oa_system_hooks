import React, { useState } from "react";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import { updateOpenedIndex } from "../../../../../../redux/actions";
import AddChapter from "../addChapter";
import DelChapter from "../delChapter";
import { findUpperObj } from "../../../../../../utils";
import { outlineIconMap, actOutlineIconMap } from "../../../mapConst";
import css from "./index.module.less";

const { Panel } = Collapse;

const Outline = ({ actIdx, setActiveOutline }) => {
  const dispatch = useDispatch();
  const openedIndex = useSelector((s) => s.rdcOpenedIndex);
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);

  const [visible, setVisible] = useState(false);

  const [hoverIndex, setHoverIndex] = useState("");
  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const handleTitleClick = (e, data) => {
    const { children } = data;
    !children.length && e.stopPropagation();
    !children.length && setActiveOutline(data);
  };

  // 添加章节
  const addChapter = (data) => {
    const supposeIdx = outlineAllData[2].children.length + 1;
    outlineAllData[2].children.push({
      index: `${supposeIdx}`,
      name: `${supposeIdx}.${data}`,
      coms: [],
      deletable: true,
    });
    setVisible(false);
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
                    onMouseEnter={() => (
                      setHoverStatus(true),
                      setHoverIndex(item.index),
                      console.log("onMouseEnter", item)
                    )}
                    onMouseLeave={() =>
                      !btnClicked && (setHoverStatus(false), setHoverIndex(""))
                    }
                  >
                    {item.name}
                    {hoverIndex === item.index && item.deletable && (
                      <DelChapter
                        setBtnClicked={setBtnClicked}
                        hoverStatus={hoverStatus}
                        setHoverStatus={setHoverStatus}
                      />
                    )}
                  </div>
                );
              })}
            <div onClick={() => setVisible(true)}>+ add chapter</div>
            {visible && (
              <AddChapter
                visible={visible}
                addChapter={addChapter}
                close={() => setVisible(false)}
              />
            )}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default Outline;
