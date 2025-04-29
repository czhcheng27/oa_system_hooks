import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { UpOutlined } from "@ant-design/icons";
import { CompCategory } from "../../config";
import css from "./index.module.less";

// 在文件顶部（函数外部）预先加载所有图标图片
const iconImages = require.context("../../assets/icons", false, /\.png$/);

// 创建一个图片映射表
const iconMap = {};
iconImages.keys().forEach((key) => {
  const iconName = key.replace("./", "").replace(".png", ""); // 提取文件名，去掉路径和扩展名
  iconMap[iconName] = iconImages(key); // 记录路径
});

const Toolbar = () => {
  const renderEachHeader = (data) => {
    return (
      <div>
        <header>{data.header}</header>
        <input type="checkbox" className={css.toggleBtn} />
        <UpOutlined />
      </div>
    );
  };

  const renderCompWrap = (data, index) => {
    return (
      <div className={css.compWrap}>
        {data.list.map((item, idx) => {
          return renderDraggable(item, idx, index);
        })}
      </div>
    );
  };

  const renderDraggable = (item, idx, index) => {
    return (
      <Draggable
        key={`${index}-${idx}`}
        draggableId={`${index}-${idx}`}
        index={idx}
      >
        {(provided, snapshot) => {
          const { draggableProps, dragHandleProps } = provided;
          const { isDragging, isDropAnimating, draggingOver } = snapshot;
          // console.log("provided", provided);
          // console.log("snapshot", snapshot);
          draggableProps.style.transform =
            isDropAnimating && !draggingOver
              ? "translate(0px, 0px)"
              : draggableProps.style.transform;

          const divProps = {
            ...draggableProps,
            ...dragHandleProps,
            ref: provided.innerRef,
            style: isDragging ? draggableProps.style : {},
          };
          return (
            <React.Fragment>
              {renderEachCard(item, divProps)}
              {isDragging && renderEachCard(item)}
            </React.Fragment>
          );
        }}
      </Draggable>
    );
  };

  const renderEachCard = (item, props) => {
    const { type, description } = item;
    return (
      <div className={css.eachCard} {...props}>
        <img src={iconMap[type]} alt={type} /> {/* 从 iconMap 获取图片路径 */}
        <div className={css.selfDescription}>{description}</div>
      </div>
    );
  };

  return (
    <div className={css.moduleBox}>
      <header>Components</header>
      <section>
        <Droppable droppableId="ITEMS" isDropDisabled={true}>
          {(provided, snapshot) => (
            <div
              className={css.kiosk}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {CompCategory.map((el, index) => {
                return (
                  <div key={index} className={css.eachCompSection}>
                    {renderEachHeader(el)}
                    {renderCompWrap(el, index)}
                  </div>
                );
              })}
            </div>
          )}
        </Droppable>
      </section>
    </div>
  );
};

export default Toolbar;
