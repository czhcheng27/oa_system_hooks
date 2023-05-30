import React, { useState } from "react";
import classNames from "classnames";
import { mockCardTitleList } from "../../mockData";
import css from "./index.module.less";
import Chart1 from "../Chart1";
import Chart2 from "../Chart2";
import Chart3 from "../Chart3";
import Earth from "../Earth";
import Chart6 from "../Chart6";
import Chart5 from "../Chart5";
import Chart9 from "../Chart9";
import Chart8 from "../Chart8";
import Chart7 from "../Chart7";

const ScreenContainer = (props) => {
  const [amplifyExist, setAmplifyExist] = useState(false);
  const [amplifyActive, setAmplifyActive] = useState(false);
  const [amplifySize, setAmplifySize] = useState(false);
  const [amplifyCode, setAmplifyCode] = useState("");
  const [amplifyHidden, setAmplifyHidden] = useState(false);

  const compileCard = (code) => {
    return (
      <div
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
        {compileCardTitle(code)}
      </div>
    );
  };

  //  编译
  const compileCardGroup1 = (code, isCenter, eventCenter) => {
    return code == 1 ? (
      <Chart1
        isCenter={isCenter}
        eventCenter={eventCenter}
        eventHandle={(code, type) => eventHandle(code, type)}
      />
    ) : code == 2 ? (
      <Chart2 isCenter={isCenter} eventCenter={eventCenter} />
    ) : (
      <Chart3 isCenter={isCenter} eventCenter={eventCenter} />
    );
  };

  const compileCardGroup2 = () => {
    return <Earth />;
  };

  const compileCardGroup3 = (code, isCenter, eventCenter) => {
    return code == 5 ? (
      <Chart5 isCenter={isCenter} eventCenter={eventCenter} />
    ) : (
      <Chart6 isCenter={isCenter} eventCenter={eventCenter} />
    );
  };

  const compileCardGroup4 = (code, isCenter, eventCenter, configData) => {
    return code == 7 ? (
      <Chart7 isCenter={isCenter} eventCenter={eventCenter} />
    ) : code == 8 ? (
      <Chart8
        isCenter={isCenter}
        eventCenter={eventCenter}
        eventHandle={(code, type) => eventHandle(code, type)}
      />
    ) : (
      <Chart9 isCenter={isCenter} eventCenter={eventCenter} />
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
  const compileCardTitle = (code) => {
    return (
      <div className={css.cardTitle}>
        <span>{mockCardTitleList[code - 1]}</span>
      </div>
    );
  };

  const compileAmplifyCard = () => {
    return amplifyCode ? (
      <div
        className={classNames(
          css.amplifyCard,
          css["cardNode" + amplifyCode],
          amplifyExist ? css.amplifyExistCard : null,
          amplifyHidden ? css.amplifyHiddenCard : null
        )}
      >
        <div className={classNames(css.amplifyNode)}>
          {amplifyCode < 4
            ? compileCardGroup1(amplifyCode, amplifySize, true)
            : amplifyCode > 6
            ? compileCardGroup4(amplifyCode, amplifySize, true)
            : compileCardGroup3(amplifyCode, amplifySize, true)}
          {compileCardIcon()}
          {compileCardTitle(amplifyCode)}
        </div>
      </div>
    ) : null;
  };

  const eventHandle = (code, type) => {
    if (type == "amplify") {
      if (!amplifyCode) amplifyCard(code);
      else if (code != amplifyCode) closeHandle(code);
      else closeHandle("");
    } else if (type == "close") closeHandle("");
  };

  const closeHandle = (code) => {
    setAmplifyHidden(true);
    setTimeout(() => {
      setAmplifyCode("");
      setAmplifyExist(false);
      setAmplifyActive(false);
      setAmplifySize(false);
      setAmplifyHidden(false);
      if (code) amplifyCard(code);
    }, 500);
  };

  const amplifyCard = (code) => {
    setAmplifyCode(code);
    setTimeout(() => {
      setAmplifyExist(true);
      setAmplifyActive(true);
      setTimeout(() => {
        if (amplifyCode) setAmplifyActive(false);
      }, 700);
    }, 10);

    setTimeout(() => {
      console.log("amplifyActive", amplifyActive);
      if (amplifyCode) setAmplifySize(true);
    }, 1410);
  };

  return (
    <div className={css.containerBox}>
      <div className={css.containerPosition}>
        {mockCardTitleList.map((item, index) => compileCard(index + 1))}
        {compileAmplifyCard()}
      </div>
    </div>
  );
};

export default ScreenContainer;
