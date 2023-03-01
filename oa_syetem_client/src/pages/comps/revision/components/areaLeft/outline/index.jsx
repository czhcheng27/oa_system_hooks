import React, { useState } from "react";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CaretRightOutlined } from "@ant-design/icons";
import { updateOpenedIndex } from "@/redux/actions";
import { findUpperObj } from "@/utils";
import Ellipsis from "@/components/Ellipsis";
import AddChapter from "../addChapter";
import DelChapter from "../delChapter";
import { outlineIconMap, actOutlineIconMap } from "../../../mapConst";
import css from "./index.module.less";

const { Panel } = Collapse;

const Outline = ({ actIdx, setActiveOutline }) => {
  const dispatch = useDispatch();
  const openedIndex = useSelector((s) => s.rdcOpenedIndex);
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);

  const [visible, setVisible] = useState(false);

  const [clickedIndex, setClickedIndex] = useState(""); // 点中的删除按钮 x 的 index
  const [hoverIndex, setHoverIndex] = useState([]); // 鼠标 hover 章节的 index
  const [btnClicked, setBtnClicked] = useState(false); // 是否有删除按钮 x 被点击

  const handleTitleClick = (e, data) => {
    const { children, index } = data;
    !children.length && index !== "content" && e.stopPropagation();
    !children.length && index !== "content" && setActiveOutline(data);
  };

  // add chapter
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

  // delete chapter
  const delChapter = (data) => {
    outlineAllData[2].children = outlineAllData[2].children.filter(
      (el) => el.index !== data.index
    );
    // 删除章节后需要对章节的 index 重新计算赋值
    outlineAllData[2].children.forEach((el, index) => {
      const chapterIndex = el.name.indexOf(".");
      const chapterName = el.name.slice(chapterIndex + 1, el.name.length);
      el.index = `${index + 1}`;
      el.name = `${index + 1}.${chapterName}`;
    });
    // 还有一种情况，如果当用户在当前章拖拽了组件在删除当前章时，需重新设置激活的大纲即 activeOutline
    if (actIdx === data.index) {
      // 如果删除的是最后一个，则 setActiveOutline 不应向下了，而是取上一个
      const isLast = actIdx == data.index;
      setActiveOutline(
        outlineAllData[2].children[actIdx * 1 - (isLast ? 2 : 1)]
      );
    }
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

  const addHoverIndex = (index) => {
    const res = hoverIndex.indexOf(index);
    if (res < 0) {
      setHoverIndex([...hoverIndex, index]);
    }
  };

  /*
    鼠标离开章节时：如果存在被点击状态的章，则 hoverIndex 只为被点击的章的 index
                    否则则查询离开的章的 index ，splice 去除
  */
  const removeHoverIndex = (index) => {
    const res = hoverIndex.indexOf(index);
    if (btnClicked) {
      setHoverIndex([clickedIndex]);
    } else {
      setHoverIndex(hoverIndex.splice(res, 1));
      setTimeout(() => {
        setHoverIndex(hoverIndex.splice(res, 1));
      });
    }
  };

  // 点击章节的删除按钮时，设置 clickedIndex 及 hoverIndex
  const clickDelBtn = (data) => {
    setClickedIndex(data);
    setHoverIndex(data);
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
                const { index } = item;
                const activeSelect = index === actIdx;
                return (
                  <div
                    key={index}
                    className={`${css.each_indise_title} ${
                      activeSelect ? css.atvInBg : ""
                    }`}
                    onClick={() => setActiveOutline(item)}
                    onMouseEnter={() => addHoverIndex(index)}
                    onMouseLeave={() => removeHoverIndex(index)}
                  >
                    <Ellipsis content={item.name}>
                      <p>{item.name}</p>
                    </Ellipsis>
                    {hoverIndex.includes(index) && item.deletable && (
                      <DelChapter
                        setHoverIndex={setHoverIndex}
                        setBtnClicked={setBtnClicked}
                        delChapter={() => delChapter(item)}
                        clickDelBtnFn={() => clickDelBtn(index)}
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
