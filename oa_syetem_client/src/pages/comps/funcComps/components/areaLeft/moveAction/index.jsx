import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Popover } from "antd";
import { findUpperObj, generateParentIndex, resortIdx } from "@/utils";
import { getSetDragType } from "@/utils/dragUtils";
import AddChapter from "../addChapter";
import AddAppx from "../addAppx";
import { independentComps } from "../../../const";
import { RevisionContext } from "../../..";
import TripleDotAct from "../imgs/tripleDotAct.png";
import Up from "../imgs/up.png";
import UpDis from "../imgs/upDis.png";
import Down from "../imgs/down.png";
import DownDis from "../imgs/downDis.png";
import Rename from "../imgs/rename.png";
import Delete from "../imgs/delete.png";
import css from "./index.module.less";
import PopCom from "@/pages/comps/revision/popCom";

const MoveAction = ({
  setClickedIndex,
  upDisNum = null, //从第几个的index开始禁止上移
  delChildNode,
  selectData,
  clickDotIconFn,
}) => {
  const {
    activeOutline,
    setActiveOutline,
    setListFunc,
    setDragType,
    forceUpdate,
  } = useContext(RevisionContext);
  const { id: selId, name, data = {} } = selectData;
  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);
  const curOutline = findUpperObj(outlineAllData, selId); // 当前的外层大纲对象
  const curIdNo = outlineAllData.findIndex((el) => el.id === curOutline.id);

  const [open, setOpen] = useState(false);

  const visivleChange = (visible) => {
    setOpen(visible);
    if (!visible) {
      setClickedIndex("");
    }
  };

  const renderContent = () => {
    const selIdNo = curOutline.children.findIndex((el) => el.id == selId); // 当前选择的子节点的index No.
    const upDis = selIdNo == (upDisNum ?? 0); // 如果无输入的特殊需求（无 upDisNum），则第一位禁止上移
    const dnDis = selIdNo + 1 === outlineAllData[curIdNo].children.length; // 最后一位禁止下移

    const isChapter = name.slice(0, 2) !== "附录";

    const firDotIdx = name.indexOf("."); // name里第一个.的位置
    const fillName = name.slice(firDotIdx + 1); // .后面的名字

    return (
      <div className={css.content_wrapper}>
        <div
          className={upDis ? css.disabled : ""}
          onClick={(e) => !upDis && moveAction(e, "up")}
        >
          <p>Move Up</p>
          <img src={upDis ? UpDis : Up} />
        </div>
        <div
          className={dnDis ? css.disabled : ""}
          onClick={(e) => !dnDis && moveAction(e, "down")}
        >
          <p>Move Down</p>
          <img src={dnDis ? DownDis : Down} />
        </div>
        <div>
          {isChapter ? (
            <AddChapter
              selectData={selectData}
              fillName={fillName}
              action="edit"
            >
              <p>Rename</p>
              <img src={Rename} />
            </AddChapter>
          ) : (
            <AddAppx selectData={selectData} receiveData={data} action="edit">
              <p>Edit</p>
              <img src={Rename} />
            </AddAppx>
          )}
        </div>
        <PopCom
          title={"delete?"}
          handleConfirm={(e) => (
            delChildNode(), e?.stopPropagation(), forceUpdate()
          )}
        >
          <div>
            <p>Delete</p>
            <img src={Delete} />
          </div>
        </PopCom>
      </div>
    );
  };

  const swapArray = (arr, index1, index2) => {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
  };

  const moveAction = (e, action) => {
    e.stopPropagation();
    const arr = outlineAllData[curIdNo].children; // 当前大纲的 children 子节点
    const idx = arr.findIndex((el) => el.id == selId); // 选中子节点的 index No.
    if (action == "up") {
      swapArray(arr, idx - 1, idx);
    } else if (action == "down") {
      swapArray(arr, idx, idx + 1);
    }
    setOpen(false);
    setClickedIndex("");
    forceUpdate();
    resortIdx(outlineAllData[curIdNo].children, curOutline.id); // 对数组内各个对象的index及name重新赋值
    const independent = independentComps.includes(activeOutline.id);
    // 如果当前激活的 outline 是正文内容则需要 setActiveOutline
    if (!independent) {
      setActiveOutline(selectData);
      generateParentIndex(selectData.coms, selectData);
      setListFunc(
        selectData.coms,
        getSetDragType(selectData.id, setDragType, outlineAllData)
      );
    }
  };

  const actionClick = (e) => {
    clickDotIconFn();
    e.stopPropagation();
  };

  return (
    <Popover
      content={renderContent()}
      overlayClassName="action_popover"
      placement="right"
      trigger={["click"]}
      open={open}
      onOpenChange={visivleChange}
    >
      <img
        src={TripleDotAct}
        className={css.action_btn}
        onClick={(e) => actionClick(e)}
      />
    </Popover>
  );
};

export default MoveAction;
