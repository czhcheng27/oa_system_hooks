import React, { useState, useEffect } from "react";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { mockList } from "./const";
import css from "./index.module.less";
import CircleName from "../../../../../../../components/CircleName";
import TriDialogBox from "../../../../../../../components/TriDialogBox";

const Approval = (props) => {
  const renderItem = (data) => {
    return data.map((el, index) => {
      const { title, remark, time, approverVos } = el;
      const { approver, state } = approverVos[0];
      return (
        <li className={css.each_item} key={index}>
          <div className={css.item_left}>{title}</div>
          <div className={css.item_center}>
            <i>
              <CheckCircleFilled className={css.check_icon} />
            </i>
            <div className={css.vertical_line} />
          </div>
          <div className={css.item_right}>
            <CircleName name={approver} />
            <div className={css.right_time}>{time}</div>
            <TriDialogBox content={remark} />
          </div>
        </li>
      );
    });
  };
  return (
    <div>
      <div className={css.approvalHead}>
        <span>Approval Process</span>
      </div>
      <div>
        <ul>{renderItem(mockList)}</ul>
      </div>
    </div>
  );
};

export default Approval;
