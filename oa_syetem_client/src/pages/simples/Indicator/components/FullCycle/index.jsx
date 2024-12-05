import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { useResize } from "../../../../../components/Resize";
import InfoSub from "../InfoSub";
import { Dmc010Context } from "../..";
import { pscFullNodeCenter } from "../../const";
import css from "./index.module.less";
import { getMonthArray } from "../../utils";

const maxNodeNum = 12;
const eachNodeWidth = 110;

const FullCycle = () => {
  const { listData, actNode, leftSelectNode } = useContext(Dmc010Context);
  const [botRef, { w: botWidth }] = useResize();

  // 渲染每一个节点
  const renderContent = (data) => {
    return data.map((node, index) => {
      const { nodeName, nodeTime } = node;
      const matchSelectNode = getMatchSelectNode(node);
      return (
        <div
          key={index}
          className={classNames({
            [css.eachNode]: true,
            [css.eachNodeHideShow]: !matchSelectNode,
          })}
        >
          <div title={nodeName}>{nodeName}</div>
          <div>{!matchSelectNode ? null : renderNodeCenter(node)}</div>
          <div>{nodeTime}</div>
        </div>
      );
    });
  };

  // 判断节点是否符合选中筛选项
  const getMatchSelectNode = (data) => {
    const hasSelectNode = Object.keys(data).includes(
      actNode.code || actNode.split
    );
    return hasSelectNode ? data[actNode.code] : true;
  };

  // 每一个节点，，中间菱形和五角星的样式
  const renderNodeCenter = (data) => {
    const { colorType, nodeName } = data;
    const isStart = nodeName == "上市";
    const pscTab = leftSelectNode === "psc";
    return (
      <>
        <div
          style={pscFullNodeCenter[colorType]}
          className={classNames({
            [css.nodeCenterBg]: pscTab,
            [css.nodeCenterBgKCP]: !pscTab,
            [css.star]: isStart,
          })}
        />
        {!isStart ? (
          <div
            className={`${
              pscTab ? css.nodeCenterLable : css.nodeCenterLableKCP
            }`}
          >
            {pscTab ? "PSC" : "KCP"}
          </div>
        ) : null}
      </>
    );
  };

  // x 轴
  const renderAxis = (data) => {
    const curIdx = data.findIndex((el) => el.currentFlag === "Y");
    return (
      <div className={css.axis}>
        {data.map((el, index) => {
          const { colorType } = el;
          const specialStyle = getSpecialStyle(curIdx, index, data);
          const backgroundColor = getBackgroundColor(index, curIdx, colorType);
          return (
            <div
              style={{
                width: `calc(100% / ${data.length})`,
                backgroundColor: backgroundColor,
                ...specialStyle,
              }}
              className={classNames({
                [css.eachAxis]: true,
                [css.eachAxisHideShow]: !getMatchSelectNode(el),
              })}
              key={index}
            >
              {xAxisPersonOrNot(el)}
            </div>
          );
        })}
      </div>
    );
  };

  const getBackgroundColor = (index, curIdx, colorType) => {
    if (leftSelectNode === "kcp")
      return pscFullNodeCenter[colorType].backgroundColor;
    return index >= curIdx ? "" : pscFullNodeCenter[colorType].backgroundColor;
  };

  // x 轴内部是否渲染小人
  const xAxisPersonOrNot = (data) => {
    return data.currentFlag === "Y" && getMatchSelectNode(data) ? (
      <div
        className={classNames({
          [css.person]: true,
          [css.bluePerson]: data.colorType !== "03",
          [css.redPerson]: data.colorType === "03",
        })}
      />
    ) : null;
  };

  // x 轴特殊样式（头部及尾部背景色渐变）
  const getSpecialStyle = (curIdx, index, data) => {
    let specialStyle = {};
    if (leftSelectNode === "kcp") return specialStyle;
    const prevBg =
      pscFullNodeCenter[data[curIdx - 1]["colorType"]].backgroundColor; // 当前节点的前一个节点的背景色
    const curBg = pscFullNodeCenter[data[curIdx]["colorType"]].backgroundColor; // 当前节点的背景色
    if (curIdx === index) {
      specialStyle = {
        backgroundImage: `linear-gradient(to right, ${curBg} 0% , ${curBg} 15% , transparent 20%)`,
      };
    } else if (curIdx - 1 === index) {
      specialStyle = {
        backgroundImage: `linear-gradient(to right, ${prevBg} 75%, ${curBg} 100%)`,
      };
    } else {
      specialStyle = {};
    }
    return specialStyle;
  };

  const getRightContentStyle = (length) => {
    const width =
      length <= maxNodeNum && botWidth > length * eachNodeWidth
        ? "100%"
        : "max-content";
    const justifyContent =
      leftSelectNode === "psc" ? "space-between" : "space-around";
    return { width, justifyContent };
  };

  const renderMonthArray = (data) => {
    return (
      <div className={css.monthBox}>
        <div></div>
        <div className={css.monthContent}>
          {data.map((monthObj, i) => {
            const { year, month, showYear, curMonth } = monthObj;
            return showYear ? (
              <div>{`${year}年${month}月`}</div>
            ) : (
              <div>{`${month}月`}</div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={css.botList} id="botList">
      {renderMonthArray(getMonthArray())}
      {listData.map((list, index) => {
        return (
          <div
            key={index}
            id={`eachList${index}`}
            className={classNames({
              [css.eachList]: true,
            })}
          >
            <InfoSub listData={list} index={index} />
            <div ref={botRef} className={css.right}>
              <div
                style={{ ...getRightContentStyle(list.nodeInfos.length) }}
                className={css.rightContent}
              >
                {renderContent(list.nodeInfos)}
                {renderAxis(list.nodeInfos)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FullCycle;
