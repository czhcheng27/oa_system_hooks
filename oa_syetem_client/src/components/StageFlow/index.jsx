import React, { useState, useEffect, useCallback } from "react";
import { Popover } from "antd";
import StageFlowBar from "../StageFlowBar";
import { formatTime, taskSatus } from "../../utils";
import css from "./index.module.less";

// 阶段流程展示
const StageFlow = ({
  data,
  warnNum,
  isHover,
  setChangeStatus,
  formalApprovalDate,
  setChangeType,
}) => {
  let currentIndex = data.findIndex((item) => item["currentStage"] == 1);

  const getTime = useCallback((item, index) => {
    let time, text;
    if (setChangeStatus || index < currentIndex) {
      time = item.taskfinishdate || item.taskFinishdate;
      text = "实际完成时间";
    } else {
      time = item.taskPlanfinishdate;
      text = "计划完成时间";
    }
    return { date: formatTime(time) ?? "-", text: text };
  });

  const toFlag = (item, index) => {
    if (setChangeStatus == 0) {
      if (item["currentStage"] == 1) {
        let flag = taskSatus(item["daysOverdue"], warnNum, false)["name"];
        return `${css.current} ${css[flag]}`;
      } else if (setChangeType == "紧急" && item["urgentIgnoreFlag"] == 1) {
        return css.urgent;
      } else if (index < currentIndex) {
        return css.done;
      } else if (index > currentIndex) {
        return css.notStarted;
      }
    } else {
      return css.done;
    }
    return "";
  };

  return (
    <div className={css.flow}>
      {/* top：显示阶段名 */}
      <div className={css.keyTaskArea}>
        <ul>
          {data.map((el, index) => {
            return (
              <li key={index} className={`${css.item} ${toFlag(el, index)}`}>
                <span className={css.line}></span>
                <Popover
                  overlayClassName={css.popover}
                  content={el.businessUnit}
                >
                  <span className={css.taskName}>{el.businessUnit}</span>
                </Popover>
              </li>
            );
          })}
        </ul>
      </div>

      {/* center: 小人跑 */}
      <div className={css.barWrap}>
        <StageFlowBar
          data={data}
          warnNum={warnNum}
          isHover={isHover}
          currentIndex={currentIndex}
          setChangeStatus={setChangeStatus ? 1 : 0}
        />
      </div>

      {/* bot：渲染时间 */}
      <div className={css.dateArea}>
        <ul>
          {data.map((item, index) => {
            return (
              <li key={index} className={`${css.item} ${toFlag(item, index)}`}>
                <p>
                  <span className={css.icon}></span>
                  <Popover
                    overlayClassName={css.popover}
                    content={getTime(item, index)["text"]}
                  >
                    <span className={css.time}>
                      {getTime(item, index)["date"]}
                    </span>
                  </Popover>
                </p>
                {index == 0 && (
                  <Popover overlayClassName={css.popover} content="立项时间">
                    <span className={css.approvalTime}>
                      {formatTime(formalApprovalDate)}
                    </span>
                  </Popover>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default StageFlow;
