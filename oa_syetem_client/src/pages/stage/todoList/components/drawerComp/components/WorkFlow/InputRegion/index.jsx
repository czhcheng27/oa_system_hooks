import React, { useState } from "react";
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
        <div className={css.TwoLineTime}>
          {data.newTime ? `Due: ${data.newTime}` : ""}
          {data.newTime ? <ExclamationCircleFilled /> : null}
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
          const { inoutlistDesc, orgName, userName, newTime } = el;
          return (
            <div key={index} className={css.input_card}>
              <div className={css.rowTop}>{renderRowTop(inoutlistDesc)}</div>
              <div className={css.rowBot}>{renderRowBot(el)}</div>
            </div>
          );
        })}
      </div>
    </InputOutputWrap>
  );
};

export default InputRegion;
