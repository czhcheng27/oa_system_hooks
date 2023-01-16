import React, { useState, useEffect, useCallback } from "react";
import { Select, Progress } from "antd";
import { apiMockDataLeft, selectOpts } from "../mock";
import css from "./index.module.less";

const PSCView = (props) => {
  const { workItemsCount, workFinishCount, workFocusCount, workItemDetails } =
    apiMockDataLeft.data;

  const [curSelect, setCurSelect] = useState(selectOpts[0].label);
  const [curWorkItem, setCurWorkItem] = useState(workItemDetails[0]); //当前选中的工作项

  return (
    <div className={css.PSCView_wrapper}>
      <div className={css.header}>
        <p>{curSelect} &nbsp; Complete Status</p>
        <Select
          className={css.select}
          options={selectOpts}
          defaultValue={selectOpts[0]}
          onChange={(value) => setCurSelect(value)}
        />
      </div>
      <div className={css.tips}>
        <div className={css.total}>
          <span>
            Task：
            <span className={css.total_active}>{workItemsCount}</span>
          </span>
          <span>
            Complete：
            <span className={css.total_active}>{workFinishCount}</span>
          </span>
          <span>
            Focus：
            <span className={css.total_active}>{workFocusCount}</span>
          </span>
        </div>
        <div className={css.add}>
          <span>Setting</span>
        </div>
      </div>
      <div className={css.box}>
        <ul>
          {workItemDetails.map((item) => {
            return (
              <li
                key={item.workItemId}
                className={
                  item.workItemId === curWorkItem.workItemId ? css.selected : ""
                }
                onClick={() => setCurWorkItem({ ...item })}
              >
                <h4 className={css.hide} title={item.workItemName}>
                  {item.workItemName}：
                </h4>
                <div className={css.progress}>
                  <Progress
                    percent={item.finishPercent + item.expirePercent}
                    success={{
                      percent: item.finishPercent,
                      strokeColor:
                        "linear-gradient(90deg, #10C48A 0%, #25E4BE 100%)",
                    }}
                    strokeColor={
                      "linear-gradient(270deg, #FDC02F 0%, #FA8C15 100%)"
                    }
                    strokeWidth={16}
                    format={(percent) => `${item.finishPercent}%`}
                  />
                </div>
                {item.workItemId === curWorkItem.workItemId ? (
                  <div className={css.selected_line}></div>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PSCView;
