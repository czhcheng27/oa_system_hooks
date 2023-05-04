import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const FieldOperation = ({ toggle, zoom }) => {
  return (
    <div className={css.fieldOperation}>
      <div className={css.left}>Frontend</div>
      <div className={css.right}>
        <span className={`${css.icon} ${css.toggle}`} onClick={toggle} />
        <span className={`${css.icon} ${css.zoom}`} onClick={zoom} />
      </div>
    </div>
  );
};

export default FieldOperation;
