import React, { useState } from "react";
import classNames from "classnames";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import Chart3 from "../Chart3";
import Chart4 from "../Chart4";
import Chart5 from "../Chart5";
import Chart6 from "../Chart6";
import Chart7 from "../Chart7";
import Chart8 from "../Chart8";
import Chart9 from "../Chart9";
import Modal from "../Modal";
import { cardTitleList } from "../../const";
import css from "./index.module.less";

const initParam = {
  sorter: "up",
  date: "all",
  fields: ["all"],
  levels: ["all"],
  segment: "cumulate",
  tab: "stdAbly",
};

const ScreenContainer = (props) => {
  const [amplifyCode, setAmplifyCode] = useState("");
  const [amplifyExist, setAmplifyExist] = useState(false);
  const [amplifyShow, setAmplifyShow] = useState(false);
  const [chart1Params, setChart1Params] = useState(initParam);
  const [chart8Params, setChart8Params] = useState("bucUnit");
  const [modalShow, setModalShow] = useState(false);
  const [modalDict, setModalDict] = useState({ code: null, name: "" });

  const compileCard = (code) => {
    return (
      <div
        key={code}
        className={classNames(
          css.cardNode,
          code == 4 ? css.cardActiveNode : null,
          css["cardNode" + code]
        )}
      >
        {code == 4
          ? compileCardGroup2()
          : code < 4
          ? compileCardGroup1(code, false, false)
          : code > 6
          ? compileCardGroup4(code, false, false)
          : compileCardGroup3(code, false, false)}
        {compileCardIcon()}
        {compileCardTitle(code, "in")}
      </div>
    );
  };

  //  编译
  const compileCardGroup1 = (code, isCenter) => {
    return code == 1 ? (
      <Chart1
        isCenter={isCenter}
        filterParams={chart1Params}
        filterHandle={setChart1Params}
      />
    ) : code == 2 ? (
      <Chart2 isCenter={isCenter} />
    ) : (
      <Chart3 isCenter={isCenter} />
    );
  };

  const compileCardGroup2 = () => {
    return <Chart4 openModal={openModal} />;
  };

  const compileCardGroup3 = (code, isCenter) => {
    return code == 5 ? (
      <Chart5 isCenter={isCenter} />
    ) : (
      <Chart6 isCenter={isCenter} />
    );
  };

  const compileCardGroup4 = (code, isCenter) => {
    return code == 7 ? (
      <Chart7
        isCenter={isCenter}
        filterParams={chart8Params}
        filterHandle={setChart8Params}
      />
    ) : code == 8 ? (
      <Chart8 isCenter={isCenter} />
    ) : (
      <Chart9 isCenter={isCenter} />
    );
  };

  //  编译图标
  const compileCardIcon = () => {
    return (
      <>
        <div className={css.cardRightTop}></div>
        <div className={css.cardLeftBottom}></div>
        <div className={css.cardRightBottom}></div>
      </>
    );
  };

  //  编译标题
  const compileCardTitle = (index, type) => {
    return (
      <div className={css.cardTitle}>
        <span>{cardTitleList[index - 1].title}</span>
        {cardTitleList[index - 1].zoom ? compileZoomIcon(index, type) : null}
      </div>
    );
  };

  const compileZoomIcon = (index, type) => {
    return (
      <div className={css.amplifyIcon}>
        {type == "in" && amplifyCode != index ? (
          <div className={css.zoomIn} onClick={() => amplifyHandle(index)} />
        ) : type == "out" ? (
          <div className={css.zoomOut} onClick={() => closeHandle("")} />
        ) : null}
      </div>
    );
  };

  // 打开下钻弹窗
  const openModal = (modalDict) => {
    setModalDict(modalDict);
    setModalShow(true);
  };

  //  编译放大区
  const compileAmplifyCard = () => {
    return amplifyCode ? (
      <div
        className={classNames(
          css.amplifyCard,
          css["cardNode" + amplifyCode],
          amplifyExist ? css.amplifyExistCard : null,
          amplifyShow ? css.amplifyShowCard : null
        )}
      >
        <div className={classNames(css.amplifyNode)}>
          {amplifyCode < 4
            ? compileCardGroup1(amplifyCode, true)
            : amplifyCode > 6
            ? compileCardGroup4(amplifyCode, true)
            : compileCardGroup3(amplifyCode, true)}
          {compileCardIcon()}
          {compileCardTitle(amplifyCode, "out")}
        </div>
      </div>
    ) : null;
  };

  const amplifyHandle = (index) => {
    if (!amplifyCode) amplifyCard(index);
    else if (index != amplifyCode) closeHandle(index);
  };

  const closeHandle = (index) => {
    setAmplifyShow(false);
    setTimeout(() => {
      setAmplifyCode("");
      setAmplifyExist(false);
      if (index) amplifyCard(index);
    }, 500);
  };

  const amplifyCard = (code) => {
    setAmplifyCode(code);
    setTimeout(() => {
      setAmplifyExist(true);
      setAmplifyShow(true);
    }, 50);
  };

  return (
    <div className={css.containerBox}>
      <div className={css.containerPosition}>
        {cardTitleList.map((item, index) => compileCard(index + 1))}
        {compileAmplifyCard()}

        <Modal
          modalShow={modalShow}
          modalDict={modalDict}
          closeHandle={() => setModalShow(false)}
        />
      </div>
    </div>
  );
};

export default ScreenContainer;
