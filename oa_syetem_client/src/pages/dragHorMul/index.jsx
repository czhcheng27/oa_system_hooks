import React, { useState } from "react";
import { Button } from "antd";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import getInitialData from "./mockData";
import TopImg from "./topImg";
import Column from "./column/column";
import css from "./index.module.css";

const reorderList = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragHorMul = (props) => {
  const [state, setState] = useState(() => getInitialData());

  const addDeleteFunc = (data, status) => {
    console.log("data, status", data, status);
    const selectedData = state.columns["column-0"].items;
    const optionData = state.columns["column-1"].items;
    if (status === "delete") {
      console.log("{...state}", { ...state });
      const updateSelectedData = selectedData.filter((el) => el.id !== data.id);
      const updateOptionData = [...optionData, data];
      setState({
        ...state,
        columns: {
          ...state.columns,
          "column-0": {
            ...state.columns["column-0"],
            items: updateSelectedData,
          },
          "column-1": {
            ...state.columns["column-1"],
            items: updateOptionData,
          },
        },
      });
    } else {
      const updateSelectedData = [...selectedData, data];
      const updateOptionData = optionData.filter((el) => el.id !== data.id);
      setState({
        ...state,
        columns: {
          ...state.columns,
          "column-0": {
            ...state.columns["column-0"],
            items: updateSelectedData,
          },
          "column-1": {
            ...state.columns["column-1"],
            items: updateOptionData,
          },
        },
      });
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.type === "column") {
      // if the list is scrolled it looks like there is some strangeness going on
      // with react-window. It looks to be scrolling back to scroll: 0
      // I should log an issue with the project
      const columnOrder = reorderList(
        state.columnOrder,
        result.source.index,
        result.destination.index
      );
      setState({
        ...state,
        columnOrder,
      });
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = state.columns[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index
      );

      // updating column entry
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      setState(newState);
      return;
    }

    // moving between lists
    const sourceColumn = state.columns[result.source.droppableId];
    const destinationColumn = state.columns[result.destination.droppableId];
    const item = sourceColumn.items[result.source.index];

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    newDestinationColumn.items.splice(result.destination.index, 0, item);

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };
    // console.log('newState', newState);
    setState(newState);
  };

  return (
    <div className={css.customize_setting}>
      <div className={css.header_wrapper}>
        <div className={css.header_title}>Customize Setting</div>
        <div className={css.btns_wrapper}>
          <Button>Cancel</Button>
          <Button className={css.save_btn} type="primary">
            Save
          </Button>
        </div>
      </div>

      <div className={css.background_Img}>
        <TopImg />
      </div>

      <div className={css.select_project_type}>
        <DragDropContext onDragEnd={onDragEnd}>
          {console.log("state", state)}
          <Droppable droppableId="all-droppables" type="column">
            {(provided) => (
              <div
                className={css.container}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];
                  return (
                    <Column
                      key={columnId}
                      column={column}
                      index={index}
                      addDeleteFunc={addDeleteFunc}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragHorMul;
