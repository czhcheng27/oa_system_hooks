import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import css from "./index.module.less";

const PageC = ({ initData }, ref) => {
  return (
    <div ref={ref} className={css.moduleBox}>
      PageC
    </div>
  );
};

export default forwardRef(PageC);
