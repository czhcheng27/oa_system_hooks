import React from "react";
import InfoDetail from "../infoDetail";
import ScrollItem from "../scrollItem";
import css from "./index.module.less";

const OutBox = ({ data, warnDay }) => {
  return (
    <div className={css.box_wrap}>
      <div className={css.left_area}>
        {data.map((item, index) => {
          return <InfoDetail key={index} data={item} warnDay={warnDay} />;
        })}
      </div>

      <div className={css.right_area}>
        {data.map((item, index) => {
          return <ScrollItem key={index} data={item} warnDay={warnDay} />;
        })}
      </div>
    </div>
  );
};

export default OutBox;
