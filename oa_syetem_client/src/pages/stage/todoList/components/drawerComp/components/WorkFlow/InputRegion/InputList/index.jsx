import React, { useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { Tooltip } from "antd";
import { ExclamationCircleFilled, CheckCircleFilled } from "@ant-design/icons";
import { getInputTime } from "../../../../../../../../../utils";
import { colorFont, colorObj, stateFont } from "../../const";
import ORG from "../../assets/org.png";
import Apply from "../../assets/apply.png";
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

  const renderRowTop = (data) => {
    const { status, inoutlistDesc, approvalStatus } = data;
    return (
      <>
        {/* <div className={css.oneLineTitleXin}>
          <img src={status == 0 ? ORG : Apply} />
        </div> */}
        <div className={css.oneLineTitle}>
          <span>{inoutlistDesc}</span>
        </div>
        {approvalStatus && colorObj[approvalStatus] ? (
          <div
            className={css.oneLineState}
            style={{
              backgroundImage: colorObj[approvalStatus],
              color: colorFont[approvalStatus],
            }}
          >
            {stateFont[approvalStatus]}
          </div>
        ) : null}
      </>
    );
  };

  const renderRowBot = (data) => {
    let diffToday = null;
    let advent = false;
    let overdue = false;
    if (data.newTime) {
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
          title={
            (data.userName ?? data.approvalName) +
            " " +
            (data.orgName ?? data.approvalOrgName)
          }
          className={css.TwoLineTitle}
        >
          <>{renderName(data)}</>
        </div>
        <div
          className={classNames({
            [css.TwoLineTime]: true,
            [css.advent]: advent,
            [css.overdue]: overdue,
          })}
        >
          {/* {data.newTime ? getInputTime(data.newTime) : ""} */}
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
              {advent ? <CheckCircleFilled /> : <ExclamationCircleFilled />}
            </Tooltip>
          ) : null}
        </div>
      </>
    );
  };

  const renderName = (data) => {
    const { userName, orgName, status, approvalName, approvalOrgName } = data;
    if (!status) {
      const name = userName ? "Sender：" + userName : null;
      const desc = orgName ? orgName : null;
      return (
        <>
          {name}
          {desc}
        </>
      );
    } else {
      const name = approvalName ? "Approver：" + approvalName : null;
      const desc = approvalOrgName ? approvalOrgName : null;
      return (
        <>
          {name}
          {desc}
        </>
      );
    }
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
            <div className={css.rowTop}>{renderRowTop(el)}</div>
            <div className={css.rowBot}>{renderRowBot(el)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default InputList;
