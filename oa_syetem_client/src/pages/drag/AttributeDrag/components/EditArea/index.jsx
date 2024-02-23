import React, { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import { LayoutContext } from "../DrawerLayout";
import css from "./index.module.less";

const EditArea = () => {
  const { compList, activeComp, setActiveComp } = useContext(LayoutContext);
  return (
    <div className={css.moduleBox}>
      <Droppable droppableId={"list"}>
        {(provided, snapshot) => {
          return (
            <div
              className={css.container}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {compList.map((item, index) => {
                const MyComp = item.component;
                return (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        className={css.eachCompBlock}
                        ref={provided.innerRef}
                        onClick={() => setActiveComp(item)}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        <div
                          className={classNames({
                            [css.eachComp]: true,
                            [css.selected]: activeComp.id === item.id,
                          })}
                        >
                          <MyComp props={item.properties} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default EditArea;
