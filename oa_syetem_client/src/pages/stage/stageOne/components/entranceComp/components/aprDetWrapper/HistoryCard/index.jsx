import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import useHorizonalScroll from "src/components/HorizontalScroll";
import css from "./index.module.less";

const statusMap = {
  "01": "Pending",
  "03": "Passed",
  "04": "Declined",
};

const HistoryCard = ({ listData, actIdx, cardClick }) => {
  // console.log('listData', listData, actIdx);
  const arrLength = listData.length;
  const scrollRef = useHorizonalScroll();

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
          {isApproving ? "In Progress" : statusMap[el.projectStatus]}
        </div>
      </div>
    );
  };

  const renderTitle = (index) => {
    let title;
    if (arrLength == 1) {
      title = "Initial Version";
    } else if (arrLength > 1) {
      if (index == 0) {
        title = "Latest Version";
      } else if (index == arrLength - 1) {
        title = "Initial Version";
      } else {
        // title = `第${arrLength - 1 - index}次变更`;
        title = `Version${arrLength - 1 - index}`;
      }
    }
    return title;
  };

  const renderBot = (data, index) => {
    const { created, approvalTime, changeDescription } = data;
    return (
      <>
        {created && <div>Create Time：{created}</div>}
        {approvalTime && <div>Approve Time：{approvalTime}</div>}
        {arrLength != index + 1 &&
          renderChangeReason(data, index, changeDescription)}
      </>
    );
  };

  const renderChangeReason = (data, index, changeDescription) => {
    return (
      <div className={css.reaonRow}>
        <div>Reason：</div>
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
        <div>Reason</div>
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
