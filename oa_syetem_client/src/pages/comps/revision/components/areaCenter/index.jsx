import React, { useRef, useImperativeHandle, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sortable from "sortablejs";
import { cloneDeep } from "../../../../../utils";
import {
  updateOpenedIndex,
  updateOutlineAllData,
} from "../../../../../redux/actions";
import Cover from "../cover";
import Introduction from "../introduction";
import { independentComps, matchCom } from "../../const";
import css from "./index.module.less";

let _comList;

// eslint-disable-next-line react/display-name
const AreaCenter = forwardRef((props, ref) => {
  const coverRef = useRef();
  const introRef = useRef();

  const dispatch = useDispatch();

  const { handleDelete, resetOrder, activeOutline } = props;
  const { coms: comList = [], index: actIdx } = activeOutline;
  _comList = cloneDeep(comList);

  const independent = independentComps.includes(actIdx);

  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);
  const cntIdx = outlineAllData.findIndex((el) => el.index === "content");

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  // 每个组件内部的数据更新函数
  const comValueUpdate = (id, newValue, newProperties) => {
    outlineAllData[cntIdx].children.forEach((item) => {
      item.coms.forEach((el) => {
        if (el.id === id) {
          el.content = JSON.stringify(newValue);
          el.properties = newProperties;
        }
      });
    });
    dispatch(updateOutlineAllData(outlineAllData));
  };

  // 拖拽相关方法
  const sortableGroupDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {
        group: "shared",
        animation: 150,
        onEnd: (evt) => {
          console.log(evt);
          const userList = _comList;
          const [draggedItem] = userList.splice(evt.oldIndex, 1);
          userList.splice(evt.newIndex, 0, draggedItem);
          console.log(userList);
          resetOrder(userList);
        },
      };
      Sortable.create(componentBackingInstance, options);
    }
  };

  const renderList = (arr) => {
    return (
      <div
        className="modalList"
        ref={sortableGroupDecorator}
        style={{ display: independent ? "none" : "block" }}
      >
        {arr.map((item, index) => {
          const MyCom = matchCom(item?.comType);
          return (
            <div key={`${item.comType}-${index}`} className="dragList">
              <MyCom
                props={item}
                comValueUpdate={comValueUpdate}
                onDelete={() => handleDelete(item)}
                arr={arr}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderIndepComps = (dataIdx) => {
    return (
      <>
        <div style={{ display: dataIdx === "cover" ? "block" : "none" }}>
          <Cover ref={coverRef} />
        </div>
        <div
          style={{
            display: dataIdx === "introduction" ? "block" : "none",
            height: "100%",
          }}
        >
          <Introduction
            ref={introRef}
            resetOrder={resetOrder}
            handleDelete={handleDelete}
            introData={outlineAllData[2]}
            comValueUpdate={comValueUpdate}
          />
        </div>
      </>
    );
  };

  const dataAssign = (coverData, introData) => {
    outlineAllData[0].data = coverData;
    outlineAllData[2].data = introData;
    return outlineAllData;
  };

  const handleSubmit = async () => {
    const coverData = await coverRef.current.coverData();
    const introData = await introRef.current.getIntroData();
    const updateData = dataAssign(coverData, introData);
    dispatch(updateOutlineAllData(updateData));
    console.log("updateData", updateData);
    const returnData = {
      standardId: "",
      version: "",
      data: JSON.stringify(updateData),
    };
    return returnData;
  };

  return (
    <div className={css.wrapper}>
      <header>{activeOutline.name}</header>
      {/* <section>{renderList(comList)}</section> */}
      {/* <section>{independent ? renderIndepComps(actIdx) : renderList(comList)}</section> */}
      <section>
        {renderIndepComps(actIdx)} {renderList(comList)}
      </section>
    </div>
  );
});

export default AreaCenter;
