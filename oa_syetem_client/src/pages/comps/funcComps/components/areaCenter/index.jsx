/* eslint-disable react/no-unknown-property */
import React, {
  useRef,
  useState,
  useContext,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Modal } from "antd";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOutlineAllData,
  dataHasBeenUpdated,
  updateOpenedIndex,
  // downloadUrl,
} from "@/redux/actions";
// import { updateCatalogue } from "@main/api/sdc015";
// import { findUpperObj, isAllFilled } from "@/modules/main/utils";
import { findUpperObj } from "@/utils";
// import { getUserInfo } from "@/utils/cookies";
import Cover from "../cover";
import Preface from "../preface";
import Introduction from "../introduction";
import Reference from "../reference";
import Appendix from "../appendix";
import ChapterOneTop from "./chapterOneTop";
import ChapterTwoTop from "./chapterTwoTop";
import ChapterThreeTop from "./chapterThreeTop";
import { matchCom } from "../../const";
import { RevisionContext } from "../..";
import Ques from "../../imgs/ques.png";
import css from "./index.module.less";

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const docx = require("docx-preview");
// const drafterId = getUserInfo().id;

let autoSaveTimer;

// eslint-disable-next-line react/display-name
const AreaCenter = forwardRef(
  (
    {
      passeDrafterId,
      goHome,
      refreshTable,
      handleDelete,
      setSubmitData,
      setSaveTime,
    },
    ref
  ) => {
    const coverRef = useRef();
    const prefaceRef = useRef();
    const introRef = useRef();
    const rfRef = useRef();

    const dispatch = useDispatch();

    const {
      list,
      activeOutline,
      setActiveOutline,
      preData,
      rowData,
      generateId,
    } = useContext(RevisionContext);
    // console.log('activeOutline', activeOutline);

    const { coms: comList = [], id: actId, name: actName } = activeOutline;

    const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);
    // const fileUrl = useSelector((s) => s.rdcDownloadUrl.url);

    const curOutline = findUpperObj(outlineAllData, actId); // 最外层那一级的对象（即：封面、前言、引言。。。等）
    const { id: outlineId, name: outlineName } = curOutline || {};
    const { standardName = "" } = outlineAllData[0].data;

    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(
      "outlineAllData， activeOutline",
      outlineAllData,
      activeOutline
    );

    useImperativeHandle(ref, () => ({
      handleSave,
      handleSubmit,
      saveBeforeReturn,
    }));

    const comValueUpdate = (
      id,
      newValue,
      newProperties,
      curId,
      fixedTopData
    ) => {
      console.log(
        "id, newValue, newProperties, curId, fixedTopData",
        id,
        newValue,
        newProperties,
        curId,
        fixedTopData
      );
      const selectId = outlineAllData.findIndex((el) => el.id === outlineId);
      switch (outlineId) {
        case "introduction":
          updateIntro(selectId, id, newValue, newProperties);
          break;
        default:
          updateContent(
            selectId,
            id,
            newValue,
            newProperties,
            curId,
            fixedTopData
          );
          break;
      }
      dispatch(updateOutlineAllData(outlineAllData));
      dispatch(dataHasBeenUpdated(true));
    };

    const updateIntro = (selectId, id, newValue, newProperties) => {
      outlineAllData[selectId].coms.forEach((el) => {
        if (el.id === id) {
          el.content = JSON.stringify(newValue);
          el.properties = newProperties;
        }
      });
      setActiveOutline(outlineAllData[selectId]);
    };

    const updateContent = (
      selectId,
      id,
      newValue,
      newProperties,
      curId,
      fixedTopData
    ) => {
      outlineAllData[selectId].children.forEach((item) => {
        if (fixedTopData && item.id === curId) {
          item.data = fixedTopData;
        }
        item.coms.forEach((el) => {
          if (el.id === id) {
            el.content = JSON.stringify(newValue);
            el.properties = newProperties;
          }
        });
      });
      setActiveOutline(
        outlineAllData[selectId].children.find((el) => el.id == actId)
      );
    };

    // 获取传参
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

    // 获取图片索引
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

    // 渲染正文 mainBody
    const renderList = (arr, actId) => {
      const isContent = outlineId !== "content";
      return (
        <div
          className={css.main_wrapper}
          style={{ display: isContent ? "none" : "block" }}
        >
          {/* {renderTop(actId)} */}

          <Droppable droppableId={"list"}>
            {(provided, snapshot) => (
              <div
                className={css.container}
                ref={provided.innerRef}
                isdraggingover={snapshot.isdraggingover}
              >
                <div id="modalList" className="modalList">
                  {list.map((item, index) => {
                    const MyCom = matchCom(item?.comType);
                    return (
                      <Draggable
                        key={`${item.id}-${index}`}
                        draggableId={item.id}
                        index={index}
                      >
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
                              props={getPropsData(list, item, index)}
                              onDelete={() => handleDelete(item)}
                              comValueUpdate={comValueUpdate}
                              arr={list}
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
        </div>
      );
    };

    const renderTop = (index) => {
      switch (index) {
        case "1":
          return (
            <ChapterOneTop
              activeOutline={activeOutline}
              comValueUpdate={comValueUpdate}
            />
          );

        case "2":
          return (
            <ChapterTwoTop
              activeOutline={activeOutline}
              comValueUpdate={comValueUpdate}
            />
          );

        case "3":
          return (
            <ChapterThreeTop
              activeOutline={activeOutline}
              comValueUpdate={comValueUpdate}
            />
          );

        default:
          return;
      }
    };

    // 渲染不需遍历的独立组件，即（封面、引言等）
    const renderIndepComps = (dataId) => {
      return (
        <>
          <div style={{ display: dataId === "cover" ? "block" : "none" }}>
            <Cover ref={coverRef} coverData={outlineAllData[0].data} />
          </div>
          <div style={{ display: dataId === "preface" ? "block" : "none" }}>
            <Preface
              ref={prefaceRef}
              standardType={40}
              prefaceData={outlineAllData[1].data}
            />
          </div>
          {dataId === "introduction" && (
            <div
              style={{
                display: dataId === "introduction" ? "block" : "none",
                height: "100%",
              }}
            >
              <Introduction
                ref={introRef}
                handleDelete={handleDelete}
                introData={outlineAllData[2]}
                comValueUpdate={comValueUpdate}
              />
            </div>
          )}
          <div
            style={{
              display: dataId === "appendix" ? "block" : "none",
              height: "100%",
            }}
          >
            {dataId === "appendix" && (
              <Appendix
                handleDelete={handleDelete}
                comValueUpdate={comValueUpdate}
              />
            )}
          </div>
          <div style={{ display: dataId === "reference" ? "block" : "none" }}>
            <Reference ref={rfRef} referenceData={outlineAllData[5].data} />
          </div>
        </>
      );
    };

    const dataAssign = (coverData, prefaceData, referenceData) => {
      outlineAllData[0].data = coverData;
      // outlineAllData[1].data = prefaceData;
      // outlineAllData[5].data = referenceData;
      return outlineAllData;
    };

    // 格式化获取数据
    const generateFormatData = async (code) => {
      // const skip = code === "skipValidate"; // 是否跳过 isAllFilled 的校验
      // const coverData = await coverRef.current.getCoverData();
      // const { visible, data } = outlineAllData[2];
      // const res =
      //   !skip &&
      //   isAllFilled(outlineAllData[1].data) &&
      //   (visible ? isAllFilled(data) : true);
      // if (res || skip) {
      //   const updateData = dataAssign(coverData);
      //   // const updateData = dataAssign(coverData, prefaceData, referenceData);
      //   dispatch(updateOutlineAllData(updateData));
      //   console.log("updateData", updateData);
      //   const returnData = {
      //     standardId: "",
      //     version: "",
      //     data: JSON.stringify(updateData),
      //   };
      //   return returnData;
      // } else {
      //   return false;
      // }
    };

    // 返回按钮中的更新接口function
    const updateFunc = async (subData, id) => {
      // const { success, data } = await updateCatalogue({
      //   ...subData,
      //   id: id,
      //   drafterId: passeDrafterId ? passeDrafterId : drafterId,
      //   ...apiFixParams,
      // });
      // if (success) {
      //   dispatch(updateOpenedIndex([]));
      //   dispatch(dataHasBeenUpdated(false));
      //   try {
      //     goHome("needRefresh");
      //   } catch (err) {
      //     console.log("goHome-err", err);
      //   }
      //   clearInterval(autoSaveTimer);
      // }
    };

    // 返回检测到有未保存的数据，点击确认时调用的函数，返回列表页
    const saveBeforeReturn = async () => {
      // const submitData = await generateFormatData();
      // updateFunc(submitData, rowData?.id ?? generateId);
    };

    // 保存预览中的只保存不预览的function
    const subUpdateFunc = async (subData, id, code) => {
      // dispatch(downloadUrl({ url: fileUrl, loading: true }));
      // const { success, data } = await updateCatalogue({
      //   ...subData,
      //   id,
      //   drafterId: passeDrafterId ? passeDrafterId : drafterId,
      //   ...apiFixParams,
      // });
      // if (success) {
      //   dispatch(dataHasBeenUpdated(false));
      //   // dispatch(downloadUrl({ url: data, loading: false }));
      //   setSaveTime(code);
      //   try {
      //     refreshTable();
      //   } catch (err) {
      //     console.log("err", err);
      //   }
      // }
    };

    // 保存并预览，不返回列表页
    const handleSubmit = async () => {
      // const submitData = await generateFormatData();
      // if (!submitData) return;
      // setSubmitData({
      //   ...submitData,
      //   ...apiFixParams,
      // });
      // subUpdateFunc(submitData, rowData?.id ?? generateId);
    };

    // 保存 button link，只保存不预览
    const handleSave = async (code) => {
      const saveId = rowData?.id ?? generateId;
      // const submitData = await generateFormatData("skipValidate");
      // saveId && subUpdateFunc(submitData, saveId, code);
    };

    return (
      <div className={css.wrapper}>
        <header>
          <div className={css.wrapperTitle}>
            {standardName ? `${standardName} / ` : ""}
            {actId === outlineId ? actName : `${outlineName} / ${actName}`}
          </div>
          <div onClick={() => setIsModalOpen(true)}>
            <img src={Ques} />
          </div>
        </header>
        <section id="areacenter_section">
          {renderIndepComps(outlineId)}{" "}
          {outlineId === "content" && renderList(comList, actId)}
        </section>

        <Modal
          title="Instruction"
          open={isModalOpen}
          footer={null}
          onCancel={() => setIsModalOpen(false)}
          wrapClassName={"instruction_explaination"}
        >
          {modalContent()}
        </Modal>
      </div>
    );
  }
);

export default AreaCenter;

const modalContent = () => {
  return (
    <div className={css.instruction_wrapper}>
      <div>
        a）New chapters can be added under <b>Content</b>, with support for
        moving up/down, renaming, and deleting.
      </div>
      <div>
        b） <b>Appendix</b> allows adding appendices, which can also be moved
        up/down, renamed, and deleted.
      </div>
      <div>
        c）<b>Introduction</b>, <b>Chapter</b>, and <b>Appendix</b> sections can
        switch to the <b>Comps</b>
        view to add components.
      </div>
      <div>
        d）<b>Introduction</b>, some <b>Chapters</b>, and <b>Reference</b>{" "}
        sections support visibility toggling (show/hide).
      </div>
      <div>
        e）The <b>"Text"</b> component cannot be inserted or dragged beyond its
        hierarchical level. It must follow the correct nesting order, e.g., 1 →
        2 → 2 → 3 is allowed, but 1 → 3 → 4 is not.
      </div>
      <div>
        f）When the <b>"Text"</b> is reordered correctly, the sequence numbers
        will be automatically calculated and assigned.
      </div>
    </div>
  );
};
