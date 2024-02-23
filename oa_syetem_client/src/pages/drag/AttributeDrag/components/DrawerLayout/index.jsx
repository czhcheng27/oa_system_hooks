import React, { useState, createContext } from "react";
import { Drawer, Button } from "antd";
import { useUpdateEffect } from "ahooks";
import { DragDropContext } from "react-beautiful-dnd";
import classNames from "classnames";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Toolbar from "../Toolbar";
import EditArea from "../EditArea";
import DrawerHeader from "../../../../../components/DrawerHeader";
import { cloneDeep, createUidKey } from "../../../../../utils";
import { CompCategory } from "../../config";
import css from "./index.module.less";
import AttrArea from "../AttrArea";

export const LayoutContext = createContext();

const DrawerLayout = ({ closeDrawer }) => {
  const [visible, setVisible] = useState(true);
  const [compList, setCompList] = useState([]); // all component list
  // Center Edit Area
  const [activeComp, setActiveComp] = useState(null); // selected components
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [rightCollapsed, setRightCollapsed] = useState(false);
  // Right Attribute Area
  const [activeAttrTab, setActiveAttrTab] = useState("Attribute"); // 当前选中的tab
  const [attrOpt, setAttrOpt] = useState(null); // 属性配置\样式配置\权限配置

  useUpdateEffect(() => {
    updateCompProperties(attrOpt);
  }, [attrOpt]);

  const updateCompProperties = (properties) => {
    const newListWithProperties = compList.map((el) => {
      if (el.id === activeComp.id) {
        let obj = el?.properties || {};
        obj[activeAttrTab] = properties;
        el.properties = obj;
      }
      return el;
    });
    // console.log("newListWithProperties", newListWithProperties);
    setCompList(newListWithProperties);
  };

  const closeHandle = () => {
    setVisible(false);
    setTimeout(() => {
      closeDrawer();
    }, 300);
  };

  /**
   * @description: 列表内部拖拽的重新排序
   * @param {Array} list 列表数组的原始顺序
   * @param {number} startIndex 被拖拽组件的起始 index
   * @param {number} endIndex 要拖拽到的地方的 index
   * @return {Array} 更新后的数组
   */
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * @description: 列表只新增时才调用的函数
   * @param {Array} source 新增的对象
   * @param {Array} destination 右侧列表中已有的数据（不包含当前正在被拖拽的组件）
   * @param {string} destinationIdx 要插入到 destination 的 index
   * @return {Array} 更新后的右侧列表中的数据
   */
  const copy = (source, destination, destinationIdx) => {
    // console.log("==> copy", source, destination, destinationIdx);
    const destClone = Array.from(destination);
    const item = cloneDeep(source);
    const insertObj = { ...item, id: createUidKey() };
    destClone.splice(destinationIdx, 0, insertObj);
    setActiveComp(insertObj);
    return destClone;
  };

  const onDragEnd = (result) => {
    console.log("onDragEnd", result);
    const {
      draggableId,
      destination,
      source: { droppableId: sourceId, index: sourceIdx },
    } = result;
    const { droppableId: destinationId, index: destinationIdx } =
      destination || {};
    // dropped outside the list
    if (!result.destination) return;

    switch (sourceId) {
      case destinationId:
        setCompList(reorder(compList, sourceIdx, destinationIdx));
        break;
      case "ITEMS":
        const [x, y] = draggableId.split("-");
        setCompList(copy(CompCategory[x].list[y], compList, destinationIdx));
        break;
      default:
        break;
    }
  };

  return (
    <Drawer
      className={css.drawer}
      width="100%"
      open={visible}
      onClose={closeHandle}
    >
      <LayoutContext.Provider
        value={{
          compList,
          setCompList,
          activeComp,
          setActiveComp,
          activeAttrTab,
          setActiveAttrTab,
          setAttrOpt,
        }}
      >
        <div className={css.drawerContent}>
          <DrawerHeader pageName={"Design Component"} backPrev={closeHandle}>
            <div className={css.btns}>
              <Button type="primary" onClick={closeHandle}>
                Close
              </Button>
            </div>
          </DrawerHeader>

          <DragDropContext onDragEnd={onDragEnd}>
            <div className={css.content}>
              <div
                className={classNames({
                  [css.left]: true,
                  [css.isLeftClpse]: leftCollapsed,
                })}
              >
                <Toolbar />
              </div>
              <div className={css.center}>
                <header>
                  Details
                  <span onClick={() => setLeftCollapsed(!leftCollapsed)}>
                    {leftCollapsed ? (
                      <MenuUnfoldOutlined />
                    ) : (
                      <MenuFoldOutlined />
                    )}
                  </span>
                  <span onClick={() => setRightCollapsed(!rightCollapsed)}>
                    {rightCollapsed ? (
                      <MenuFoldOutlined />
                    ) : (
                      <MenuUnfoldOutlined />
                    )}
                  </span>
                </header>
                <section>
                  <EditArea />
                </section>
              </div>
              <div
                className={classNames({
                  [css.right]: true,
                  [css.isRightClpse]: rightCollapsed,
                })}
              >
                <header>{`Component ${
                  activeComp?.description ? "/ " + activeComp.description : ""
                }`}</header>
                <section>
                  <AttrArea />
                </section>
              </div>
            </div>
          </DragDropContext>
        </div>
      </LayoutContext.Provider>
    </Drawer>
  );
};

export default DrawerLayout;
