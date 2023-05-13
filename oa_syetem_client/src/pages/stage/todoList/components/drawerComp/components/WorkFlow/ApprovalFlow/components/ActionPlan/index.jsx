import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
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
    return <div>renderSubTask</div>;
  };
  return (
    <div className={css.act_plan}>
      {renderOverall()}
      {renderSubTask()}
    </div>
  );
};

export default ActionPlan;
