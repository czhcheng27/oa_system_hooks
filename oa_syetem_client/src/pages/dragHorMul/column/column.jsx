import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { HeaderTitle } from "../headerTitle";
import Task from "../task/task";
import css from "./column.module.css";

const Column = ({ column, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className={css.container}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {/* <h3 style={{ padding: '8px' }} {...provided.dragHandleProps}>
            {column.title}
          </h3> */}
          <div {...provided.dragHandleProps}>
            <HeaderTitle title={column.title} />
          </div>

          <Droppable droppableId={column.id} direction="horizontal">
            {(provided, snapshot) => {
              return (
                <div
                  className={css.taskList}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {column.items.map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      title={column.title}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
