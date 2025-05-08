/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useEffect, useRef } from "react";
import { message } from "antd";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import {
  cloneDeep,
  createUidKey,
  findUpperObj,
  generateParentIndex,
} from "@/utils";
import {
  updateOutlineAllData,
  dataHasBeenUpdated,
  updateOpenedIndex,
} from "@/redux/actions";
import { getCompSource } from "@/utils/dragUtils";
import { initOutline } from "./mock";
import TopBox from "./components/topBox";
import AreaLeft from "./components/areaLeft";
import AreaCenter from "./components/areaCenter";
import AreaDoc from "./components/areaDoc";
import css from "./index.module.less";

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
 * @param {Array} source 左侧可拖拽组件的数据集合
 * @param {Array} destination 右侧列表中已有的数据（不包含当前正在被拖拽的组件）
 * @param {string} sourceIdx 拖拽的组件在 source 的 index
 * @param {string} destinationIdx 要插入到 destination 的 index
 * @return {Array} 更新后的右侧列表中的数据
 */
const copy = (source, destination, sourceIdx, destinationIdx) => {
  // console.log('==> copy', source, destination, sourceIdx, destinationIdx);
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const item = sourceClone[sourceIdx];
  destClone.splice(destinationIdx, 0, {
    ...item,
    id: createUidKey(),
  });
  return destClone;
};

export const RevisionContext = createContext();

const Revision = ({
  goHome,
  preData,
  setPreData,
  rowData,
  generateId,
  drafterId,
  refreshTable,
}) => {
  // console.log('preData, rowData', preData, rowData);
  const topRef = useRef(null);
  const areaDocRef = useRef(null);
  const parentRef = useRef(null);

  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);

  const [conut, setConut] = useState(0); // forceUpdate 用
  const [isFold, setIsFold] = useState(false);
  const [introList, setIntroList] = useState([]);
  const [list, setList] = useState([]);
  const [appxList, setAppxList] = useState([]);
  const [dragType, setDragType] = useState("list");
  const [activeOutline, setActiveOutline] = useState({ ...initOutline[0] });

  const typeMap = {
    introList: {
      data: introList,
      func: setIntroList,
    },
    list: {
      data: list,
      func: setList,
    },
    appxList: {
      data: appxList,
      func: setAppxList,
    },
  };

  // 获取对应的拖拽列表数据
  const listData = () => {
    return typeMap[dragType]["data"];
  };

  /**
   * @description: setFunc
   * @param {Array} data 列表的数据
   * @param {String} type （选填）类型，当前是拖拽引言的拖拽/正文的拖拽/附录的拖拽
   * @return {Function} set数据
   */
  const setListFunc = (data, type = dragType) => {
    typeMap[type]["func"](data);
    dispatch(dataHasBeenUpdated(true));
  };

  useEffect(() => {
    initFunc();
  }, []);

  const initFunc = () => {
    const content = rowData?.content && JSON.parse(rowData?.content)?.data;
    content && dispatch(updateOutlineAllData(JSON.parse(content)));
  };

  const onDragEnd = (result) => {
    const { droppableId: sourceId, index: sourceIdx } = result.source;
    const { droppableId: destinationId, index: destinationIdx } =
      result.destination || {};
    // console.log('==> result', result);

    // dropped outside the list
    if (!result.destination) return;

    switch (sourceId) {
      case destinationId:
        setListFunc(reorder(listData(), sourceIdx, destinationIdx));
        break;
      case "ITEMS":
        setListFunc(
          copy(
            getCompSource(activeOutline),
            listData(),
            sourceIdx,
            destinationIdx
          )
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    afterDrag();
  }, [introList, list, appxList]);

  const afterDrag = () => {
    const dataList = listData();
    if (generateParentIndex(dataList, activeOutline)) {
      resonableDrag(dataList, activeOutline);
    } else {
      setListFunc(activeOutline.coms);
      return message.error("This drag-and-drop action is not allowed");
    }
  };

  const resonableDrag = (dataList, activeOutline) => {
    setActiveOutline({ ...activeOutline, coms: dataList });
    outlineAllData.reduce((pre, item) => {
      if (item.id === activeOutline.id) {
        item["coms"] = dataList;
      } else if (item.children.length) {
        item.children.map((el) =>
          el.id === activeOutline.id ? (el["coms"] = dataList) : null
        );
      }
      return pre;
    }, []);
    dispatch(updateOutlineAllData(outlineAllData));
  };

  // 传递表单数据
  const setSubmitData = (data) => {
    areaDocRef.current.getPDFUrl(data);
  };

  // 当前编辑基本信息保存后，再次获取最新 DocData
  const setDocData = () => {
    areaDocRef?.current?.getDocData();
  };

  // 获取更新后数据的函数，调用 AreaCenter 子组件方法
  const saveBeforeReturn = () => {
    parentRef.current.saveBeforeReturn();
  };

  // 提交函数，调用 AreaCenter 子组件方法
  const getSubmitData = () => {
    parentRef.current.handleSubmit();
  };

  // 删除 AreaCenter 组件的方法
  const handleDelete = (item, outlineAllData) => {
    const { coms = [], id } = activeOutline;
    const filterData = coms.filter((el) => el.id !== item.id);
    // 判断删除后的数组是否符合逻辑
    const res = generateParentIndex(filterData, activeOutline);
    if (res) {
      setActiveOutline({ ...activeOutline, coms: filterData });
      setListFunc(filterData);
      outlineAllData.forEach((obj) => {
        if (obj.id === id) {
          obj.coms = filterData;
        } else if (obj.children) {
          const findObj = obj.children.find((el) => el.id === id);
          findObj && (findObj.coms = filterData);
        }
      });
      const _temp = cloneDeep(outlineAllData);
      dispatch(updateOutlineAllData(_temp));
    } else {
      message.error("不合乎逻辑的删除");
    }
  };

  // 设置保存时间
  const setSaveTime = (code) => {
    code !== "first" && message.success("保存成功！");
    topRef.current.setNowData(code);
  };

  // TopBox 组件 -> 保存 link 按钮方法
  const handleSaveData = (code) => {
    parentRef.current.handleSave(code);
  };

  const forceUpdate = () => {
    setConut(conut + 1);
  };

  return (
    <RevisionContext.Provider
      value={{
        list,
        setList,
        listData,
        setDragType,
        setListFunc,
        preData,
        generateId,
        rowData,
        activeOutline,
        setActiveOutline,
        handleSaveData,
        forceUpdate,
      }}
    >
      <div className={`${css.moduleBox}`}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div id="revisionBox" className={classNames(css.revision)}>
            <div className={css.revision_left}>
              <AreaLeft />
            </div>
            <div className={css.revision_center}>
              <AreaCenter
                ref={parentRef}
                passeDrafterId={drafterId}
                goHome={(data) => goHome(data)}
                refreshTable={refreshTable}
                handleDelete={(item) => handleDelete(item, outlineAllData)}
                setSubmitData={setSubmitData}
                setSaveTime={setSaveTime}
              />
            </div>
            <div
              className={classNames(
                css["right"],
                css[isFold ? "fold" : "expand"]
              )}
            >
              <div
                className={classNames(
                  css["fold_btn"],
                  css[isFold ? "foldBtn" : "expandBtn"]
                )}
                onClick={() => setIsFold(!isFold)}
              />
              <AreaDoc
                ref={areaDocRef}
                getSubmitData={getSubmitData}
                isFold={isFold}
              />
            </div>
          </div>
        </DragDropContext>
      </div>
    </RevisionContext.Provider>
  );
};

export default Revision;
