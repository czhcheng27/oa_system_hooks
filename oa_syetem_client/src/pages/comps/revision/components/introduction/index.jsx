import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import Sortable from "sortablejs";
import { cloneDeep } from "@/utils";
import IntroContent from "./introContent";
import SeparateName from "./separateName";
import { matchCom } from "../../const";
import { dragStart } from "../../../../../redux/actions";
import css from "./index.module.less";

let _comList;

// eslint-disable-next-line react/display-name
const Introduction = forwardRef(
  ({ introData, resetOrder, handleDelete, comValueUpdate }, ref) => {
    const { data: { contentData, standardNameData } = {}, coms: comList = [] } =
      introData || {};

    _comList = cloneDeep(comList);

    const introContentRef = useRef();
    const nameRef = useRef();

    const dispatch = useDispatch();

    useImperativeHandle(ref, () => ({
      getIntroData: async () => {
        const contentData = await introContentRef.current.getContentData();
        const standardNameData = await nameRef.current.getNameData();
        return { contentData, standardNameData };
      },
    }));

    const sortableGroupDecorator = (componentBackingInstance) => {
      if (componentBackingInstance) {
        const options = {
          group: "shared",
          animation: 150,
          onStart: () => dispatch(dragStart(true)),
          onEnd: (evt) => {
            console.log(evt);
            dispatch(dragStart(false));
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

    return (
      <>
        <IntroContent ref={introContentRef} contentData={contentData} />

        <SeparateName ref={nameRef} standardNameData={standardNameData} />

        <div id="modalList" className="modalList" ref={sortableGroupDecorator}>
          {comList.map((item, index) => {
            const MyCom = matchCom(item?.comType);
            return (
              <div key={item.id} className="dragList" id={item.id}>
                <MyCom
                  props={item}
                  onDelete={() => handleDelete(item)}
                  comValueUpdate={comValueUpdate}
                  arr={comList}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  }
);

export default Introduction;
