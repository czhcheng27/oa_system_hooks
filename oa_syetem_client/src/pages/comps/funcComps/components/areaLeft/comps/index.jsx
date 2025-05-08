import React, { useContext } from "react";
import { Col, Row } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { mapIdToComps } from "@/utils/dragUtils";
import { colorCompMap } from "../../../mapConst";
import { coms } from "../../../const";
import { RevisionContext } from "../../..";
import css from "./index.module.less";

const Comps = () => {
  const { activeOutline } = useContext(RevisionContext);

  const renderCategoryComp = (renderIcons) => {
    return (
      <Row gutter={[0, 24]}>
        {renderIcons.map((item, index) => (
          <Draggable
            key={`${item.comType}-${index}`}
            draggableId={`${item.comType}-${index}`}
            index={index}
          >
            {(provided, snapshot) => {
              const { draggableProps, dragHandleProps } = provided;
              const { isDragging, isClone } = snapshot;
              return (
                <React.Fragment>
                  <Col
                    ref={provided.innerRef}
                    {...draggableProps}
                    {...dragHandleProps}
                    isdragging={isClone.toString()}
                    style={isDragging ? draggableProps.style : {}}
                    span={24}
                    key={`${item.comType}-${index}`}
                    data-id={item.comType}
                  >
                    <div
                      className={`${css.each_comp}`}
                      style={colorCompMap[item.comType].left}
                    >
                      <p>{item.desc}</p>
                      <img src={require("./icons/" + item.comType + ".png")} />
                    </div>
                  </Col>
                  {isDragging && (
                    <div
                      className={`${css.each_comp}`}
                      style={colorCompMap[item.comType].left}
                    >
                      <p>{item.desc}</p>
                      <img src={require("./icons/" + item.comType + ".png")} />
                    </div>
                  )}
                </React.Fragment>
              );
            }}
          </Draggable>
        ))}
      </Row>
    );
  };

  return (
    <div className={css.wrapper}>
      {mapIdToComps(activeOutline).map((obj, index) => {
        const renderIcons = coms.reduce((pre, item) => {
          if (obj.compNo.includes(item.comType)) {
            pre.push(item);
          }
          return pre;
        }, []);
        return (
          <div key={index}>
            {obj.label && <title>{obj.label}</title>}
            <Droppable droppableId="ITEMS" isDropDisabled={true}>
              {(provided, snapshot) => (
                <div
                  className={css.kiosk}
                  ref={provided.innerRef}
                  isdraggingover={snapshot.isDraggingOver.toString()}
                >
                  {renderCategoryComp(renderIcons)}
                </div>
              )}
            </Droppable>
          </div>
        );
      })}
    </div>
  );
};

export default Comps;
