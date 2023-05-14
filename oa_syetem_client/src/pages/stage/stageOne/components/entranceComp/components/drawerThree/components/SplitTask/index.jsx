import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import addTaskIcon from "../../img/addTask.png";
import CardBg from "../../img/card_bg.png";
import css from "./index.module.less";

const SplitTask = ({ taskData, addTask }) => {
  return (
    <div className={css.split_task_wrap}>
      <div className={css.testCol}>
        {taskData.map((el, index) => {
          return (
            <div key={index} className={css.each_item}>
              <img src={CardBg} />
              <div className={css.card}>
                <div className={css.seq}>1</div>
                <div className={css.task_icon}>aaa</div>
                <div className={css.task_name}>{el}</div>
              </div>
            </div>
          );
        })}
        <div
          className={css.add_task}
          onClick={() => {
            addTask && addTask();
          }}
        >
          <img src={addTaskIcon} />
          <div>Create New SubTask</div>
        </div>
      </div>
    </div>
  );
};

export default SplitTask;
