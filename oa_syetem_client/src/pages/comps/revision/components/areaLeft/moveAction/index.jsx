import React from "react";
import { useSelector } from "react-redux";
import { Popover } from "antd";
import { resortIdx } from "@/utils";
import PopCom from "../../../popCom";
import { independentComps } from "../../../const";
import TripleDotAct from "../imgs/tripleDotAct.png";
import Up from "../imgs/up.png";
import UpDis from "../imgs/upDis.png";
import Down from "../imgs/down.png";
import DownDis from "../imgs/downDis.png";
import Delete from "../imgs/delete.png";
import css from "./index.module.less";

const MoveAction = ({
  delChapter,
  selectData,
  activeOutline,
  setActiveOutline,
  eliminateDotIcon,
  clickDotIconFn,
  setBtnClicked,
}) => {
  const outlineAllData = useSelector((s) => s.rdcOutlineAllData);
  const cntIdx = outlineAllData.findIndex((el) => el.index === "content");

  const visivleChange = (visible) => {
    !visible && eliminateDotIcon();
  };

  const renderContent = () => {
    const upDis = selectData.index == 4;
    const dnDis = selectData.index == outlineAllData[cntIdx].children.length;
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
            delChapter(), setBtnClicked(false), e.stopPropagation()
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
    const arr = outlineAllData[cntIdx].children;
    const idx = arr.findIndex((el) => el.index == selectData.index);
    if (action == "up") {
      swapArray(arr, idx - 1, idx);
    } else if (action == "down") {
      swapArray(arr, idx, idx + 1);
    }
    eliminateDotIcon(); // 进行完移动操作后清除尾部三个点的icon图标
    resortIdx(outlineAllData[cntIdx].children); // 对数组内各个对象的index及name重新赋值
    const independent = independentComps.includes(activeOutline.index);
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
      onVisibleChange={visivleChange}
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
