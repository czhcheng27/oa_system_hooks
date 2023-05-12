import React, { useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { Tooltip } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ORG from "../../assets/org.png";
import css from "./index.module.less";

const InputList = ({ id, inputData, openModal, setModalData }) => {
  const getInitialIdx = () => {
    return inputData.findIndex((el) => el.id == id);
  };

  const [actIdx, setActIdx] = useState(getInitialIdx());

  const handleClick = (data, idx) => {
    id && setActIdx(idx);
    openModal && openModal(data);
    setModalData && setModalData(data);
  };

  const renderRowTop = (title) => {
    return (
      <>
        <div className={css.oneLineTitleXin}>
          <img src={ORG} />
        </div>
        <div className={css.oneLineTitle}>
          <span>{title}</span>
        </div>
      </>
    );
  };

  const renderRowBot = (data) => {
    let diffToday = null;
    let advent = false;
    let overdue = false;
    if (data.approvalStatus > 2 && data.newTime) {
      diffToday = moment(moment().format("YYYY-MM-DD")).diff(
        moment(data.newTime).format("YYYY-MM-DD"),
        "days"
      );
      advent = diffToday <= 0;
      overdue = diffToday > 0;
    }
    return (
      <>
        <div
          title={data.userName + " " + data.orgName}
          className={css.TwoLineTitle}
        >
          <>
            {data.userName ? "Sender：" + data.userName + " " : null}
            {data.orgName}
          </>
        </div>
        <div
          className={classNames({
            [css.TwoLineTime]: true,
            [css.advent]: advent,
            [css.overdue]: overdue,
          })}
        >
          {data.newTime ? `${data.newTime}` : ""}
          {advent || overdue ? (
            <Tooltip
              placement="top"
              title={
                advent
                  ? diffToday === 0
                    ? "Today is dueday"
                    : `You still have ${Math.abs(diffToday)} days`
                  : `Overdue ${Math.abs(diffToday)} days`
              }
            >
              <ExclamationCircleFilled />
            </Tooltip>
          ) : null}
        </div>
      </>
    );
  };
  return (
    <div className={css.content}>
      {inputData.map((el, index) => {
        return (
          <div
            key={index}
            className={` ${css.input_card} ${
              actIdx == index ? css.active : null
            }`}
            onClick={() => handleClick(el, index)}
          >
            <div className={css.rowTop}>{renderRowTop(el.inoutlistDesc)}</div>
            <div className={css.rowBot}>{renderRowBot(el)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default InputList;
