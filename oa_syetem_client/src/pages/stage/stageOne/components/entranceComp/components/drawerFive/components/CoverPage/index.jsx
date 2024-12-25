import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import css from "./index.module.less";

const CoverPage = (props, ref) => {
  return (
    <div className={css.cover} ref={ref} data-density="hard">
      <div className={css.book_cover}>CoverPage</div>
    </div>
  );
};

export default forwardRef(CoverPage);
