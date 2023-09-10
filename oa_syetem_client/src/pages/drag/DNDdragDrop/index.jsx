import React, { useEffect, useState, Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createUidKey } from "../../../utils";
import css from "./index.module.less";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  //   console.log("res", result);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log("==> dest", destination);

  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[droppableSource.index];

  destClone.splice(droppableDestination.index, 0, {
    ...item,
    id: createUidKey(),
  });
  return destClone;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

const ITEMS = [
  {
    id: createUidKey(),
    content: "Headline",
  },
  {
    id: createUidKey(),
    content: "Copy",
  },
  {
    id: createUidKey(),
    content: "Image",
  },
  {
    id: createUidKey(),
    content: "Slideshow",
  },
  {
    id: createUidKey(),
    content: "Quote",
  },
];

// const DNDdragDrop = () => {
//   return <div>DNDdragDrop</div>;
// };

// export default DNDdragDrop;

export default class DNDdragDrop extends Component {
  state = {
    list: [],
    // [uuidv4()]: [],
  };
  onDragEnd = (result) => {
    const { source, destination } = result;

    console.log("==> result", result);

    // dropped outside the list
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          [destination.droppableId]: reorder(
            this.state[source.droppableId],
            source.index,
            destination.index
          ),
        });
        break;
      case "ITEMS":
        this.setState({
          [destination.droppableId]: copy(
            ITEMS,
            this.state[destination.droppableId],
            source,
            destination
          ),
        });
        break;
      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };

  addList = (e) => {
    this.setState({ [createUidKey()]: [] });
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
            <div
              className={css.kiosk}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {ITEMS.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <React.Fragment>
                      <div
                        className={css.item}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        isDragging={snapshot.isDragging}
                        style={provided.draggableProps.style}
                      >
                        {item.content}
                      </div>
                      {snapshot.isDragging && (
                        <div className={css.clone}>{item.content}</div>
                      )}
                    </React.Fragment>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
        <div className={css.content}>
          {/* <Button onClick={this.addList}>
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
              />
            </svg>
            <ButtonText>Add List</ButtonText>
          </Button> */}
          {Object.keys(this.state).map((list, i) => {
            console.log("==> list", list);
            return (
              <Droppable key={list} droppableId={list}>
                {(provided, snapshot) => (
                  <div
                    className={css.container}
                    ref={provided.innerRef}
                    isDraggingOver={snapshot.isDraggingOver}
                  >
                    {console.log("sssss", this.state)}
                    {this.state[list].length
                      ? this.state[list].map((item, index) => (
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                className={css.item}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                isDragging={snapshot.isDragging}
                                style={provided.draggableProps.style}
                              >
                                <div
                                  className={css.handle}
                                  {...provided.dragHandleProps}
                                >
                                  <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
                                    />
                                  </svg>
                                </div>
                                {item.content}
                              </div>
                            )}
                          </Draggable>
                        ))
                      : !provided.placeholder && (
                          <div className={css.notice}>Drop items here</div>
                        )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    );
  }
}
