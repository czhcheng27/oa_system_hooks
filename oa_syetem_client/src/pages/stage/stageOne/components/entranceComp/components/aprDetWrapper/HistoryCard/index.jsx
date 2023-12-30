import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import { useHorizontalScroll } from "../../../../../../../../components/HorizontalScroll";
// import { useHorizontalScroll } from "@/components/HorizontalScroll";
import css from "./index.module.less";

const statusMap = {
  "01": "未审批",
  "03": "已通过",
  "04": "已驳回",
};

const HistoryCard = ({ listData, actIdx, cardClick }) => {
  // console.log('listData', listData, actIdx);
  const arrLength = listData.length;
  const scrollRef = useHorizontalScroll();

  const renderCard = () => {
    return listData?.map((el, index) => {
      return (
        <div
          key={index}
          className={classNames(
            `${index == listData.length - 1 ? css.last : css.normal}`,
            {
              [css.card]: true,
              [css.active]: actIdx == index,
            }
          )}
          onClick={() => cardClick(el, index)}
        >
          {renderTitleArea(el, index)}
          <div>{renderBot(el, index)}</div>
          <div className={css.flash}>
            <div></div>
          </div>
        </div>
      );
    });
  };

  const renderTitleArea = (el, index) => {
    const isApproving = !["01", "03", "04"].includes(el.projectStatus);
    return (
      <div>
        {renderTitle(index)}
        <div
          className={classNames(
            css.node,
            css[isApproving ? "node02" : `node${el.projectStatus}`]
          )}
        >
          {isApproving ? "审批中" : statusMap[el.projectStatus]}
        </div>
      </div>
    );
  };

  const renderTitle = (index) => {
    let title;
    if (arrLength == 1) {
      title = "原始版本";
    } else if (arrLength > 1) {
      if (index == 0) {
        title = "最新变更";
      } else if (index == arrLength - 1) {
        title = "原始版本";
      } else {
        title = `第${arrLength - 1 - index}次变更`;
      }
    }
    return title;
  };

  const renderBot = (data, index) => {
    const { created, approvalTime, changeDescription } = data;
    return (
      <>
        {created && <div>创建时间：{created}</div>}
        {approvalTime && <div>审批通过时间：{approvalTime}</div>}
        {arrLength != index + 1 &&
          renderChangeReason(data, index, changeDescription)}
      </>
    );
  };

  const renderChangeReason = (data, index, changeDescription) => {
    return (
      <div className={css.reaonRow}>
        <div>变更原因：</div>
        <div
          className={css.changeReasonSpan}
          id={`div${index}`}
          onMouseEnter={() => mouseEnter(index)}
        >
          {changeDescription}
          {renderHoverArea(data, index)}
        </div>
      </div>
    );
  };

  const renderHoverArea = (data, index) => {
    return (
      <div className={css.movingDiv} id={`movingDiv${index}`}>
        <div>变更原因</div>
        <div>{data.changeDescription}</div>
      </div>
    );
  };

  const mouseEnter = (index) => {
    let scopeDiv = document.getElementById(`div${index}`);
    scopeDiv.addEventListener("mousemove", (e) => {
      move(e, index);
    });
  };

  const move = (e, index) => {
    let x = e.clientX;
    let y = e.clientY;
    let windowWidth = window.innerWidth;
    let myDiv = document.getElementById(`movingDiv${index}`);
    if (windowWidth - x - 20 > 276) {
      myDiv.style.left = x + 20 + "px";
    } else {
      myDiv.style.left = x - 20 - 276 + "px";
    }
    myDiv.style.top = y + 20 + "px";
  };

  return (
    <div className={css.hcBox}>
      <div className={css.content}>
        <div id="listArea" ref={scrollRef} className={css.listArea}>
          {renderCard()}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
