import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import { mockCardTitleList } from "../../mockData";
import css from "./index.module.less";

const ScreenContainer = (props) => {
  const [activeCard, setActiveCard] = useState("4");

  const compileCard = (code) => {
    return (
      <div
        className={classNames(
          css.cardNode,
          activeCard == code ? css.cardActiveNode : null,
          css["cardNode" + code]
        )}
      >
        {compileCardTitle(code)}
        {compileCardIcon()}
      </div>
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

  return (
    <div className={css.containerBox}>
      <div className={css.containerPosition}>
        {compileCard(1)}
        {compileCard(2)}
        {compileCard(3)}
        {compileCard(4)}
        {compileCard(5)}
        {compileCard(6)}
        {compileCard(7)}
        {compileCard(8)}
        {compileCard(9)}
      </div>
    </div>
  );
};

export default ScreenContainer;
