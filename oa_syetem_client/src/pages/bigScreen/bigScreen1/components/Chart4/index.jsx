import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";
import Earth from "../Earth";

const Chart4 = (props) => {
  return (
    <div className={css.chartBox}>
      <Earth />
    </div>
  );
};

export default Chart4;
