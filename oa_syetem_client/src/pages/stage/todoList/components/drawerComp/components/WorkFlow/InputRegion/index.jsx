import React, { useState } from "react";
import classNames from "classnames";
import moment from "moment";
import { Tooltip } from "antd";
import { FullscreenOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import InputOutputWrap from "../InputOutputWrap";
import { inputData } from "../mock";
import SVG2 from "../assets/svg2";
import ORG from "../assets/org.png";
import css from "./index.module.less";

const InputRegion = (props) => {
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
    <InputOutputWrap
      btnPosition="right"
      title={
        <div className={css.inputTitle}>
          <div className={css.inputTitleRight}>
            <SVG2 />
            <span className={css.titleFont}>Input</span>
          </div>
          <div className={css.inputTitleRight}>
            <FullscreenOutlined
              //   onClick={() => {
              //     setInputCardIndex(0);
              //     setInputDetails(true);
              //   }}
              className={css.inputTitle1}
            />
          </div>
        </div>
      }
    >
      <div className={css.content}>
        {inputData.map((el, index) => {
          return (
            <div key={index} className={css.input_card}>
              <div className={css.rowTop}>{renderRowTop(el.inoutlistDesc)}</div>
              <div className={css.rowBot}>{renderRowBot(el)}</div>
            </div>
          );
        })}
      </div>
    </InputOutputWrap>
  );
};

export default InputRegion;
