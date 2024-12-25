import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import css from "./index.module.less";

const PageB = ({ initData }, ref) => {
  return (
    <div ref={ref} className={css.moduleBox}>
      PageB
    </div>
  );
};

export default forwardRef(PageB);
