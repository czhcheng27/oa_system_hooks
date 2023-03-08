import React, { useState } from "react";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { CaretRightOutlined } from "@ant-design/icons";
import { updateOpenedIndex } from "@/redux/actions";
import { findUpperObj, cloneDeep } from "@/utils";
import Ellipsis from "@/components/Ellipsis";
import AddChapter from "../addChapter";
import MoveAction from "../moveAction";
import { outlineIconMap, actOutlineIconMap } from "../../../mapConst";
import RightArrow from "../imgs/rightArrow.png";
import OpenEye from "../imgs/visible.png";
import ClosedEye from "../imgs/unvisible.png";
import css from "./index.module.less";

const { Panel } = Collapse;

const Outline = ({ actIdx, activeOutline, setActiveOutline }) => {
  const dispatch = useDispatch();
  const openedIndex = useSelector((s) => s.rdcOpenedIndex);
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);

  const [visible, setVisible] = useState(false);
  const [chapterOpenArr, setChapterOpenArr] = useState([]);

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

  // 点击章节的 三个点 图标时，设置 clickedIndex 及 hoverIndex
  const clickDotIcon = (data) => {
    setClickedIndex(data);
    setHoverIndex(data);
  };

  // 正文 -> 章节 前面的展开 icon 三角号的操作函数
  const toggleClick = (e, chapterIndex) => {
    e.stopPropagation();
    const res = chapterOpenArr.findIndex((el) => el == chapterIndex);
    if (res == -1) {
      setChapterOpenArr([...chapterOpenArr, chapterIndex]);
    } else {
      const filterData = chapterOpenArr.filter((el) => el !== chapterIndex);
      setChapterOpenArr(filterData);
    }
  };

  // 一级条点击函数
  const text1Click = (e) => {
    e.stopPropagation();
    console.log("text1Click");
  };

  // 小眼睛 visible 点击函数
  const visibleIconClick = (e, data) => {
    e.stopPropagation();
    outlineAllData[2].children.forEach((el) => {
      if (el.index == data.index) {
        el.visible = !data.visible;
      }
    });
    const newData = outlineAllData[2].children.filter(
      (el) => el.index === activeOutline.index
    )[0];
    if (newData) {
      setActiveOutline(newData);
    } else {
      const _temp = cloneDeep(activeOutline);
      setActiveOutline(_temp);
    }
  };

  // 渲染正文下的章节
  const renderChapters = (children) => {
    return children.map((item) => {
      const { index, name, coms, visible = true } = item;
      const activeSelect = index === actIdx;
      const isChapterIconOpen = chapterOpenArr.includes(index);
      const text1Array = coms.filter((el) => el.comType == 1);
      return (
        <div
          key={index}
          className={classNames({
            [css.each_indise_title]: true,
            [css.atvInBg]: activeSelect,
            [css.visibleHidden]: !visible,
          })}
          onMouseEnter={() => addHoverIndex(index)}
          onMouseLeave={() => removeHoverIndex(index)}
        >
          <Ellipsis content={name}>
            <p
              onClick={(e) => (
                e.stopPropagation(),
                setActiveOutline(item),
                toggleClick(e, index)
              )}
            >
              {name}
            </p>
          </Ellipsis>
          {!!text1Array.length && (
            <img
              className={css.chapter_folder_icon}
              style={{ transform: isChapterIconOpen ? "rotate(90deg)" : "" }}
              onClick={(e) => toggleClick(e, index)}
              src={RightArrow}
              alt="RightArrow"
            />
          )}
          {/* 渲染章节下一级条 */}
          {!!coms.length && isChapterIconOpen && (
            <div>
              {text1Array.map((el, index) => {
                const txt = `${el.code} ${el.content.slice(1, -1)}`;
                return (
                  <div
                    onClick={(e) => text1Click(e)}
                    className={css.text1}
                    key={index}
                  >
                    <Ellipsis content={txt}>
                      <p>{txt}</p>
                    </Ellipsis>
                  </div>
                );
              })}
            </div>
          )}
          {item?.visible !== undefined && (
            <img
              className={css.visible_icon}
              onClick={(e) => visibleIconClick(e, item)}
              src={item.visible ? OpenEye : ClosedEye}
              alt="OpenEye"
            />
          )}
          {hoverIndex.includes(index) && item.deletable && (
            <MoveAction
              eliminateDotIcon={() => {
                setHoverIndex([]) && setBtnClicked(false);
              }}
              setBtnClicked={setBtnClicked}
              selectData={item}
              activeOutline={activeOutline}
              setActiveOutline={setActiveOutline}
              delChapter={() => delChapter(item)}
              clickDotIconFn={() => clickDotIcon(index)}
            />
          )}
        </div>
      );
    });
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
            {!!children.length && renderChapters(children)}
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
