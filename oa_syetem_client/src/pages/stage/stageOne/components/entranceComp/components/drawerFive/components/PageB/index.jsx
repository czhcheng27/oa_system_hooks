import React, { useState, useEffect, forwardRef, useContext } from "react";
import { FlipBookContext } from "../..";
import css from "./index.module.less";

const PageB = ({ initData }, ref) => {
  const { pageNum, chapterNo, pageVisible } = initData;
  const { getChapterPageParam, updateChapterPageParam } =
    useContext(FlipBookContext);

  useEffect(() => {
    if (pageVisible) {
      console.log(`call page"${pageNum}" api, and render page${pageNum}`);
    }
  }, [pageVisible]);

  return (
    <div ref={ref} className={css.moduleBox}>
      {pageVisible ? <>chapter{chapterNo} PageB</> : null}
    </div>
  );
};

export default forwardRef(PageB);
