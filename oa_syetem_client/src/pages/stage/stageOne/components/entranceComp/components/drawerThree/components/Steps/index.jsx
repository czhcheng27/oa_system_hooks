import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import { stepName } from "../../const";
import arrowIcon from "../../img/arrow.png";
import css from "./index.module.less";

const Steps = ({ current = 1, onClick }) => {
  return (
    <div className={css.step}>
      {stepName.map((el, index) => {
        return (
          <div key={index} className={css.each_item}>
            <div
              className={classNames({
                [css.text]: true,
                [css.finish]: current > index,
                [css.current]: current === index,
              })}
            >
              {index + 1}.{el}
            </div>
            {index !== stepName.length - 1 && (
              <div className={css.arrow}>
                <img src={arrowIcon} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
