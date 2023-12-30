import React from "react";
import { useSelector } from "react-redux";
import { Popover } from "antd";
import { resortIdx } from "../../../../../../utils";
import PopCom from "../../../popCom";
import { independentComps } from "../../../const";
import TripleDotAct from "../imgs/tripleDotAct.png";
import Up from "../imgs/up.png";
import UpDis from "../imgs/upDis.png";
import Down from "../imgs/down.png";
import DownDis from "../imgs/downDis.png";
import Delete from "../imgs/delete.png";
import css from "./index.module.less";
import { findUpperObj } from "../../../../../../utils";

const MoveAction = ({
  upDisNum = null, //从第几个的index开始禁止上移
  delChildNode,
  selectData,
  activeOutline,
  setActiveOutline,
  eliminateDotIcon,
  clickDotIconFn,
  setBtnClicked,
}) => {
  const { id: selId } = selectData;
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);
  const curOutline = findUpperObj(outlineAllData, selId); // 当前的外层大纲对象
  const curIdNo = outlineAllData.findIndex((el) => el.id === curOutline.id);

  const visivleChange = (visible) => {
    !visible && eliminateDotIcon();
  };

  const renderContent = () => {
    const selIdNo = curOutline.children.findIndex((el) => el.id == selId); // 当前选择的子节点的index No.
    const upDis = selIdNo == (upDisNum ?? 0); // 如果无输入的特殊需求（无 upDisNum），则第一位禁止上移
    const dnDis = selIdNo + 1 === outlineAllData[curIdNo].children.length; // 最后一位禁止下移
    return (
      <div className={css.content_wrapper}>
        <div
          className={upDis ? css.disabled : ""}
          onClick={(e) => !upDis && moveAction(e, "up")}
        >
          <p>上移</p>
          <img src={upDis ? UpDis : Up} />
        </div>
        <div
          className={dnDis ? css.disabled : ""}
          onClick={(e) => !dnDis && moveAction(e, "down")}
        >
          <p>下移</p>
          <img src={dnDis ? DownDis : Down} />
        </div>
        <PopCom
          title={"确定删除吗"}
          handleConfirm={(e) => (
            delChildNode(), setBtnClicked(false), e?.stopPropagation()
          )}
        >
          <div>
            <p>删除</p>
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
    eliminateDotIcon(); // 进行完移动操作后清除尾部三个点的icon图标
    resortIdx(outlineAllData[curIdNo].children, curOutline.id); // 对数组内各个对象的index及name重新赋值
    const independent = independentComps.includes(activeOutline.id);
    !independent && setActiveOutline(selectData); // 如果当前激活的 outline 是正文内容则需要 setActiveOutline
  };

  const actionClick = (e) => {
    clickDotIconFn() && setBtnClicked(true) && e.stopPropagation();
  };

  return (
    <Popover
      content={renderContent()}
      overlayClassName="action_popover"
      placement="right"
      trigger={["click"]}
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
