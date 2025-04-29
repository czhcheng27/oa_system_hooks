import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import classNames from "classnames";
import { leftButton, rightButton } from "../../const";
import CloseIcon from "../../assets/icon20.png";
import css from "./index.module.less";
import { useNavigate } from "react-router-dom";

const ScreenHeader = ({ activeCode, callback }) => {
  const navigate = useNavigate();
  const compileButton = (type, list) => {
    return (
      <div className={classNames(css.buttonBox, css[type + "ButtonBox"])}>
        {list.map((item, index) => {
          return renderEachBtn(item, index, type);
        })}
      </div>
    );
  };

  const renderEachBtn = (item, index, type) => {
    return (
      <div
        className={classNames(
          css.buttonNode,
          css[type + "Button"],
          activeCode == item.code ? css.buttonActiveNode : null
        )}
        onClick={() => callback(item.code)}
        key={index}
      >
        <span>{item.label}</span>
      </div>
    );
  };

  return (
    <div className={css.headBox}>
      {compileButton("left", leftButton)}
      <div className={css.headTitle}>
        <div>Big Screen Demo</div>
      </div>
      {compileButton("right", rightButton)}
      <img
        src={CloseIcon}
        className={css.closeIcon}
        onClick={() => navigate("/home", { replace: true })}
      />
    </div>
  );
};

export default ScreenHeader;
