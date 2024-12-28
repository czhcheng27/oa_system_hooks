import React, { useState, useEffect, useContext, forwardRef } from "react";
import { FlipBookContext } from "../..";
import css from "./index.module.less";

const PageD = ({ initData }, ref) => {
  const { pageNum, chapterNo, pageVisible } = initData;
  const { getChapterPageParam, updateChapterPageParam } =
    useContext(FlipBookContext);

  useEffect(() => {
    if (pageVisible) {
      console.log(`调用第"${pageNum}"页的接口`);
    }
  }, [pageVisible]);

  return (
    <div ref={ref} className={css.moduleBox}>
      {pageVisible ? <>chapter{chapterNo} PageD</> : null}
    </div>
  );
};

export default forwardRef(PageD);
