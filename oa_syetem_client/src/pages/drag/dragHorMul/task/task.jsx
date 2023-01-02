import React from "react";
import { Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import css from "./task.module.css";

const Task = (props) => {
  const { task, title, addDeleteFunc } = props;

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        // Container: component later
        <div
          className={classNames({
            [css.task]: true,
            [css.dragging]: snapshot.isDragging,
          })}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <img style={{ width: "36px" }} src={props.task.icon} alt="icon"></img>
          <div className={classNames(css.text_promp, css.mouldType_title)}>
            {/* <PrompText limitLength={5}>全部类型</PrompText> */}
            {task.text}
            <span
              onClick={() =>
                addDeleteFunc(task, title === "Selected" ? "delete" : "add")
              }
              className={classNames(
                css.add_del_status,
                title === "Selected" ? css.delete_icon : css.add_icon
              )}
            ></span>
          </div>
          {/* {props.task.text} */}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
