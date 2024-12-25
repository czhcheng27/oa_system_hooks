import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  forwardRef,
} from "react";
import css from "./index.module.less";

const EndPage = (props, ref) => {
  return (
    <div ref={ref} data-density="hard" className={css.cover}>
      <div className={css.text}>EndPage</div>
    </div>
  );
};

export default forwardRef(EndPage);
