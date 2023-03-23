import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import InfoDetail from "../infoDetail";
import ScrollItem from "../scrollItem";
import css from "./index.module.less";

const OutBox = ({ data, warnDay }) => {
  return (
    <div className={css.box_wrap}>
      <div className={css.left_area}>
        <InfoDetail />
      </div>

      <div className={css.right_area}>
        {data.map((item, index) => {
          return (
            <ScrollItem key={index} data={item} warnDay={warnDay}></ScrollItem>
          );
        })}
      </div>
    </div>
  );
};

export default OutBox;
