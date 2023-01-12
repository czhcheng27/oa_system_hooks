import React from "react";
import Sortable from "sortablejs";
import { cloneDeep } from "lodash";
import { matchCom } from "../../const";
import css from "./index.module.less";
let temp;
const AreaCenter = (props) => {
  const { comList, resetOrder } = props;
  temp = cloneDeep(comList);

  // 拖拽相关方法
  const sortableGroupDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {
        group: "shared",
        animation: 150,
        onEnd: (evt) => {
          console.log(evt);
          const userList = temp;
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
    console.log("arr", arr);
    return (
      <div className="modalList" ref={sortableGroupDecorator}>
        {arr.map((item, index) => {
          const MyCom = matchCom(item?.componentName);
          return (
            <div key={`${item.type}-${index}`} className="dragList">
              <MyCom {...item} />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={css.wrapper}>
      <header>正文</header>
      <section>{renderList(comList)}</section>
    </div>
  );
};

export default AreaCenter;
