/* eslint-disable react/no-unknown-property */
import React, { useContext } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { matchCom } from "../../const";
import { RevisionContext } from "../..";
import css from "./index.module.less";

const Appendix = ({ handleDelete, comValueUpdate }) => {
  const { listData, activeOutline } = useContext(RevisionContext);
  const { coms: comList = [] } = activeOutline;

  const getImageIndex = (arr, index) => {
    let conut = 0;
    arr.forEach((item, itemIndex) => {
      if (item.comType == 9 && itemIndex < index) {
        const content = item.content ? JSON.parse(item.content) : [];
        // conut += content.length;
        conut += 1;
      }
    });
    return conut;
  };

  const getPropsData = (arr, item, index) => {
    if (item.comType == 9) {
      return {
        ...item,
        imageIndex: getImageIndex(arr, index),
      };
    } else {
      return item;
    }
  };
  return (
    <Droppable droppableId={"listAppx"}>
      {(provided, snapshot) => (
        <div
          className={css.container}
          ref={provided.innerRef}
          isdraggingover={snapshot.isdraggingover}
        >
          <div id="modalListAppx" className="modalList">
            {listData().map((item, index) => {
              const MyCom = matchCom(item?.comType);
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={css.item}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      isdragging={snapshot.isdragging}
                      style={provided.draggableProps.style}
                      key={item.id}
                      id={item.id}
                    >
                      <MyCom
                        props={getPropsData(comList, item, index)}
                        onDelete={() => handleDelete(item)}
                        comValueUpdate={comValueUpdate}
                        arr={comList}
                        drag={{ ...provided.dragHandleProps }}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Appendix;
