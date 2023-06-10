import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import SelectFilter from "../SelectFilter";
import { dateOpts } from "../../const";
import UpBg from "../../assets/upBg.png";
import DownBg from "../../assets/downBg.png";
import css from "./index.module.less";

const Chart1 = ({ isCenter, filterParams, filterHandle }) => {
  const { date, sorter } = filterParams;

  const renderTopCorner = () => {
    return (
      <div className={css.filter_area}>
        {renderSorter()}
        {renderDateFilter()}
      </div>
    );
  };

  const renderSorter = () => {
    const data = sorter == "up" ? "down" : "up";
    const Icon = sorter == "up" ? UpBg : DownBg;
    return (
      <div className={css.topCorner_sorter}>
        <img src={Icon} onClick={() => callbackFun(data, "sorter")} />
      </div>
    );
  };

  const renderDateFilter = () => {
    return (
      <div className={css.topCorner_date}>
        <SelectFilter
          type="date"
          callback={callbackFun}
          options={dateOpts}
          initVal={date}
        />
      </div>
    );
  };

  // 更新过滤参数，回调传回父组件更新
  const callbackFun = (data, type) => {
    const params = { ...filterParams, [type]: data };
    filterHandle(params);
  };

  return (
    <div className={css.chart1_wrap}>
      {renderTopCorner()}

      <div className={css.content}>Chart1</div>
    </div>
  );
};

export default Chart1;
