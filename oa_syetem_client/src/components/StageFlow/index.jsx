import React, { useState, useEffect, useCallback } from "react";
import { Popover } from "antd";
import StageFlowBar from "../StageFlowBar";
import css from "./index.module.less";

const StageFlow = ({ data, warnNum, isHover, setChangeStatus }) => {
  let currentIndex = data.findIndex((item) => item["currentStage"] == 1);
  return (
    <div className={css.flow}>
      {/* top */}
      <div className={css.keyTaskArea}>
        <ul>
          {data.map((el, index) => {
            return (
              <li key={index} className={css.item}>
                <span className={css.line}></span>
                <Popover
                  overlayClassName={css.popover}
                  content={el.businessUnit}
                >
                  <span className={css.taskName}>{el.businessUnit}</span>
                </Popover>
              </li>
            );
          })}
        </ul>
      </div>

      {/* center */}
      <div className={css.barWrap}>
        <StageFlowBar
          data={data}
          warnNum={warnNum}
          isHover={isHover}
          currentIndex={currentIndex}
          setChangeStatus={setChangeStatus ? 1 : 0}
        />
      </div>

      {/* bot */}
      <div className={css.dateArea}>dateArea</div>
    </div>
  );
};

export default StageFlow;
