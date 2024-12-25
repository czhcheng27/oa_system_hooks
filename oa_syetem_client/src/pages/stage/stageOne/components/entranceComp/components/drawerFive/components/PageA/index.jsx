import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import css from "./index.module.less";

const PageA = ({ initData }, ref) => {
  const { pageNum } = initData;
  return (
    <div ref={ref} className={css.moduleBox}>
      PageA
      <div>{pageNum}</div>
    </div>
  );
};

export default forwardRef(PageA);
