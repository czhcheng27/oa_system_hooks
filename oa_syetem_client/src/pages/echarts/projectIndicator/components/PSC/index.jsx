import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import PSCEcharts from "./PSCEcharts";
import PSCView from "./PSCView";
import css from "./index.module.less";

const PSC = (props) => {
  return (
    <div className={css.wrapper}>
      <PSCView />
      <PSCEcharts />
    </div>
  );
};

export default PSC;
