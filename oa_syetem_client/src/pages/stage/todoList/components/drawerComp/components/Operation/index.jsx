import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const Operation = ({ toggle, zoom }) => {
  return (
    <div className={css.fieldOperation}>
      <div className={css.left}>Backend</div>
      <div className={css.right}>
        <span className={`${css.icon} ${css.toggle}`} onClick={toggle}></span>
        <span className={`${css.icon} ${css.zoom}`} onClick={zoom}></span>
      </div>
    </div>
  );
};

export default Operation;
