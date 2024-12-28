import React, { useState, useRef, useMemo, forwardRef } from "react";
import { useSize } from "ahooks";
import HTMLFlipBook from "react-pageflip";
import classNames from "classnames";
import { sum } from "lodash";
import { pageCompMap } from "../../bookConfig";
import CoverPage from "../CoverPage";
import EndPage from "../EndPage";
import css from "./index.module.less";

const AdminBook = ({ pageList, visiblePageArray, onPage }, ref) => {
  const divRef = useRef(null);
  const size = useSize(divRef);

  const renderBook = () => {
    return size ? (
      <HTMLFlipBook
        ref={ref}
        width={size?.width / 2}
        height={size?.height}
        minWidth={400}
        minHeight={500}
        maxWidth={1050}
        maxHeight={1000}
        maxShadowOpacity={0.5}
        flippingTime={500}
        disableFlipByClick={true}
        size="stretch"
        showCover={true}
        onFlip={(e) => onPage(e)}
      >
        {pageList.map((pageObj, index) => {
          const lastIdx = pageList.length - 1;
          switch (index) {
            case 0:
              return <CoverPage key={index} />;

            case lastIdx:
              return <EndPage key={index} />;

            default:
              return renderLeafPage(pageObj, index);
          }
        })}
      </HTMLFlipBook>
    ) : null;
  };

  const renderLeafPage = (pageObj, index) => {
    const { contentVOList = [], number: chapterNo, totalName } = pageObj;
    const prevPages = sum(
      pageList.slice(0, index).map((el) => el?.contentVOList?.length || 1)
    );
    return contentVOList.map((el, idx) => {
      const PageComp = pageCompMap[el.name];
      const pageNum = prevPages + idx;
      const pageVisible = visiblePageArray.includes(pageNum);
      const leftPage = pageNum % 2 !== 0;
      return (
        <div
          key={`${chapterNo}_${index}_${idx}`}
          className={classNames({
            [css.eachPageCompWrapper]: true,
            [css.eachLeftPageWrapper]: leftPage,
            [css.eachRightPageWrapper]: !leftPage,
          })}
        >
          <div className={leftPage ? css.leftPageNo : css.rightPageNo}>
            {pageNum}
          </div>
          <PageComp initData={{ ...el, pageNum, chapterNo, pageVisible }} />
        </div>
      );
    });
  };

  return (
    <div ref={divRef} className={css.moduleBox}>
      {renderBook()}
    </div>
  );
};

export default forwardRef(AdminBook);
