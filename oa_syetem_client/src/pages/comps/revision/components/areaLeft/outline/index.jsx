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
import WhiteEye from "../imgs/actWhiteVisible.svg";
import ClosedEye from "../imgs/unvisible.png";
import css from "./index.module.less";
import {
  idBackTo,
  resortIdx,
  visibleChangeFormatArr,
} from "../../../../../../utils";
import AddAppx from "../addAppx";

const { Panel } = Collapse;

const Outline = ({ actId, activeOutline, setActiveOutline }) => {
  const dispatch = useDispatch();
  const openedIndex = useSelector((s) => s.rdcOpenedIndex);
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);
  const cntId = outlineAllData.findIndex((el) => el.id === "content");

  const [chapterOpenArr, setChapterOpenArr] = useState([]); // 大纲 -> 子节点下有一级条时，其前面三角icon是否展开的数组，目前每拖拽新组件后这个数组会重置空[]，如果希望保持之前的展开数据，后续可将这个状态放在redux里进行管理
  const [clickedIndex, setClickedIndex] = useState(""); // 点中的删除按钮 x 的 index
  const [hoverIndex, setHoverIndex] = useState([]); // 鼠标 hover 章节的 index
  const [btnClicked, setBtnClicked] = useState(false); // 是否有删除按钮 x 被点击

  // 每一条大纲的点击函数
  const handleTitleClick = (e, data) => {
    idBackTo("areacenter_section");
    const { children, id } = data;
    // id 为 content 正文时，需要允许展开;
    if (!children.length && id !== "content") {
      if (id !== "appendix") {
        setActiveOutline(data);
        e.stopPropagation();
      }
    }
  };

  // 删除大纲下的子节点
  const delChildNode = (data) => {
    const curOutline = findUpperObj(outlineAllData, data.id); // 当前子节点对应的外层大纲对象
    const curId = outlineAllData.findIndex((el) => el.id === curOutline.id); // 当前要删除的子节点对应的大纲的 index No.
    const arrAfterFilter = outlineAllData[curId].children.filter(
      (el) => el.id !== data.id
    );
    outlineAllData[curId].children = arrAfterFilter;
    // 删除章节后需要对章节的 index 重新计算赋值
    resortIdx(outlineAllData[curId].children, curOutline.id);
    // 还有一种情况，如果当用户在当前章拖拽了组件在删除当前章时，需重新设置激活的大纲即 activeOutline
    if (actId === data.id) {
      // 如果删除的是最后一个，则 setActiveOutline 不应向下了，而是取上一个
      const isLast = actId == data.id;
      if (curOutline.id === "content") {
        setActiveOutline(
          outlineAllData[curId].children[actId * 1 - (isLast ? 2 : 1)]
        );
      } else if (curOutline.id === "appendix") {
        const childrenL = curOutline.children.length; // 附录有多少个子节点
        if (!childrenL) {
          // 删除后无子结点时：重置选中大纲为封面，更新 openedIndex，返回顶部
          setActiveOutline(outlineAllData[0]);
          dispatch(
            updateOpenedIndex(openedIndex.filter((el) => el !== "appendix"))
          );
          idBackTo("arealeft_section");
        } else {
          setActiveOutline(curOutline.children[childrenL - 1]);
        }
      }
    }
  };

  // 最外层的带图标的 title 的渲染
  const renderTitle = (obj) => {
    const { id, visible = true } = obj;
    const isActive = id === actId;
    return (
      <div
        className={classNames({
          [css.title]: true,
          [css.visibleHidden]: !visible,
        })}
        onClick={(e) => handleTitleClick(e, obj)}
      >
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
      setHoverIndex([hoverIndex].splice(res, 1));
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

  // 正文内部的小眼睛 visible 点击函数
  const visibleIconClick = (e, data) => {
    e.stopPropagation();
    outlineAllData[cntId].children.forEach((el) => {
      if (el.id == data.id) {
        el.visible = !data.visible;
      }
    });
    visibleChangeFormatArr(outlineAllData[cntId].children);
    const newData = outlineAllData[cntId].children.filter(
      (el) => el.id === activeOutline.id
    )[0];
    if (newData) {
      setActiveOutline(newData);
    } else {
      const _temp = cloneDeep(activeOutline);
      setActiveOutline(_temp);
    }
  };

  // 大纲的子节点点击函数
  const childNodeClick = (e, item, index) => {
    e.stopPropagation() && setActiveOutline(item) && toggleClick(e, index);
    idBackTo("areacenter_section");
  };

  // 新增了附录也可有子节点，故抽离正文下渲染方法。 现在是大纲下如果有子节点，子节点的渲染函数
  const renderChildNode = (children, upDisNum) => {
    return children.map((item) => {
      const { id, name, coms, visible = true } = item;
      const activeSelect = id === actId;
      const isChapterIconOpen = chapterOpenArr.includes(id);
      const text1Array = coms.filter((el) => el.comType == 1);
      return (
        <div
          key={id}
          className={classNames({
            [css.each_indise_title]: true,
            [css.atvInBg]: activeSelect,
            [css.visibleHidden]: !visible,
          })}
          onMouseEnter={() => addHoverIndex(id)}
          onMouseLeave={() => removeHoverIndex(id)}
        >
          <Ellipsis content={name}>
            <p onClick={(e) => childNodeClick(e, item, id)}>{name}</p>
          </Ellipsis>
          {!!text1Array.length && (
            <img
              className={css.chapter_folder_icon}
              style={{ transform: isChapterIconOpen ? "rotate(90deg)" : "" }}
              onClick={(e) => toggleClick(e, id)}
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
            />
          )}
          {hoverIndex.includes(id) && item.deletable && (
            <MoveAction
              upDisNum={upDisNum}
              eliminateDotIcon={() => {
                setHoverIndex([]) && setBtnClicked(false);
              }}
              setBtnClicked={setBtnClicked}
              selectData={item}
              activeOutline={activeOutline}
              setActiveOutline={setActiveOutline}
              delChildNode={() => delChildNode(item)}
              clickDotIconFn={() => clickDotIcon(id)}
            />
          )}
        </div>
      );
    });
  };

  // 正文/附录下展开后相对应的文字
  const renderAddTxt = {
    content: <AddChapter>+ 添加章节</AddChapter>,
    appendix: <AddAppx>+ 添加附录</AddAppx>,
  };

  // 大纲的小眼睛点击函数
  const outlineEyeIconClick = (e, obj) => {
    e.stopPropagation();
    const { id, visible } = obj;
    outlineAllData.forEach((el) => {
      if (el.id === id) {
        el.visible = !visible;
      }
    });
    const _temp = cloneDeep(activeOutline);
    setActiveOutline(_temp);
  };

  // 渲染 Panel extra 图标； 更新：appendix 也可有图标展开
  const renderExtra = (obj, hightlightOutlineId) => {
    const { children, id, visible } = obj;
    if (!!children.length || id === "content" || id === "appendix") {
      return (
        <CaretRightOutlined
          style={{ color: hightlightOutlineId ? "white" : "#9292a2" }}
          rotate={openedIndex.includes(id?.toString()) ? 90 : 0}
        />
      );
    } else if (id === "introduction") {
      const eye = activeOutline.id === "introduction" ? WhiteEye : OpenEye;
      return (
        obj?.visible !== undefined && (
          <img
            onClick={(e) => outlineEyeIconClick(e, obj)}
            src={visible ? eye : ClosedEye}
            className={css.outline_visible_icon}
          />
        )
      );
    }
  };

  return (
    <Collapse
      ghost
      expandIconPosition="end"
      defaultActiveKey={openedIndex}
      activeKey={openedIndex}
      onChange={(key) => dispatch(updateOpenedIndex(key))}
    >
      {outlineAllData.map((obj) => {
        const { children, id } = obj;
        const hightlightOutlineId =
          findUpperObj(outlineAllData, actId).id === id;
        const upDis = id === "content" ? 3 : 0; // upMovementDiables: 正文下第四个章节无法上移
        return (
          <Panel
            className={`${css.panel_wrapper} ${
              hightlightOutlineId ? css.activeBg : ""
            } `}
            header={renderTitle(obj, id)}
            key={id}
            showArrow={false}
            collapsible={"header"}
            extra={renderExtra(obj, hightlightOutlineId)}
          >
            {!!children.length && renderChildNode(children, upDis)}
            {renderAddTxt[id]}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default Outline;
