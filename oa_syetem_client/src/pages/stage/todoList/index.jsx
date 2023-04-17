import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const TodoList = (props) => {
  return (
    <div className={css.todoList_wrap}>
      <div className={css.headerArea}>
        <div className={`${css.titleArea}`}>To Do List</div>
      </div>
      <div>
        <div
          style={{
            width: "210px",
            height: "100%",
            float: "left",
            borderRight: "#F1F4F7 solid 1px",
          }}
        >
          left
        </div>
        <div className={css.content}>right</div>
      </div>
    </div>
  );
};

export default TodoList;
