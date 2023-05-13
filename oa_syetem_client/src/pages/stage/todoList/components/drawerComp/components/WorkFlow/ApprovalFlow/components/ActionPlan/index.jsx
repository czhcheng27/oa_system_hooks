import React, { useState, useEffect, useRef } from "react";
import { getDaysBetween } from "../../../../../../../../../../utils";
import css from "./index.module.less";

const ActionPlan = ({ data }) => {
  const { subTaskList, subTaskCount, taskDataRage, endDate, startDate } = data;

  const renderOverall = () => {
    return (
      <div className={css.overAll}>
        <div>
          <div>{`${subTaskCount} subTasks`}</div>
          <div>{`${subTaskCount} executor`}</div>
        </div>
        {renderProcessBar()}
      </div>
    );
  };

  const renderProcessBar = () => {
    return (
      <div className={css.processBar}>
        <div className={css.top_text}>
          <div>{startDate}</div>
          <div>total {taskDataRage} days</div>
          <div>{endDate}</div>
        </div>
        <div className={css.process}>
          <div className={css.stripe}></div>
          <div className={css.masker}></div>
        </div>
      </div>
    );
  };

  const renderSubTask = () => {
    return (
      <div className={css.subTasks}>
        {subTaskList.map((el, index) => {
          return (
            <div key={index} className={css.each_task}>
              {renderLeftText(el, index)}
              {renderRightProcess(el)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLeftText = (data, index) => {
    const { taskName, shouldCommitCount } = data;
    return (
      <div className={css.left_text_wrap}>
        <div>
          <span style={{ marginRight: "16px" }}>{index + 1}</span>
          {taskName}
        </div>
        <div>
          Sub Num: <span>{shouldCommitCount}</span>
        </div>
      </div>
    );
  };

  const renderRightProcess = (data) => {
    const { taskPlanFinishDate, taskPlanBeginDate } = data;
    let planStartTime =
      (getDaysBetween(startDate, taskPlanBeginDate) / taskDataRage) * 100;
    let planEndTime =
      (getDaysBetween(startDate, taskPlanFinishDate) / taskDataRage) * 100;
    return (
      <div className={css.process_wrap}>
        <div
          className={css.plan_begin_time}
          style={{ left: `${planStartTime}%` }}
        >
          <span>{taskPlanBeginDate}</span>
        </div>
        <div
          className={css.plan_finish_time}
          style={{ left: `${planEndTime}%` }}
        >
          <span>{taskPlanFinishDate}</span>
        </div>
      </div>
    );
  };

  return (
    <div className={css.act_plan}>
      {renderOverall()}
      {renderSubTask()}
    </div>
  );
};

export default ActionPlan;
