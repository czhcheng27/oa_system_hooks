import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Sortable from "sortablejs";
import { cloneDeep } from "../../../../../utils";
import Cover from "../cover";
import Introduction from "../introduction";
import { independentComps, matchCom } from "../../const";
import css from "./index.module.less";

let _comList;

// eslint-disable-next-line react/display-name
const AreaCenter = forwardRef((props, ref) => {
  const coverRef = useRef();
  const introRef = useRef();

  const { handleDelete, resetOrder, activeOutline } = props;
  const { coms: comList = [], index: actIdx } = activeOutline;
  _comList = cloneDeep(comList);

  const independent = independentComps.includes(actIdx);

  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

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
              <MyCom props={item} onDelete={() => handleDelete(item)} />
            </div>
          );
        })}
      </div>
    );
  };

  // const renderIndepComps = (dataIdx) => {
  //   switch (dataIdx) {
  //     case 'cover':
  //       return <Cover />;

  //     case 'introduction':
  //       return <Introduction />;

  //     default:
  //       return <Cover />;
  //   }
  // };

  const renderIndepComps = (dataIdx) => {
    return (
      <>
        <div style={{ display: dataIdx === "cover" ? "block" : "none" }}>
          <Cover ref={coverRef} />
        </div>
        <div style={{ display: dataIdx === "introduction" ? "block" : "none" }}>
          <Introduction ref={introRef} />
        </div>
      </>
    );
  };

  const handleSubmit = async () => {
    const coverData = await coverRef.current.coverData();
    console.log("coverData", coverData);
    const introData = await introRef.current.introData();
    console.log("introData", introData);
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
