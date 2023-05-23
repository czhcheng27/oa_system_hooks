import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";
import { mockLeftButton, mockRightButton } from "../../mockData";
import classNames from "classnames";

const ScreenHeader = ({ activeCode, callback }) => {
  const compileButton = (type, list) => {
    return (
      <div className={classNames(css.buttonBox, css[type + "ButtonBox"])}>
        {list.map((item, index) => {
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
        })}
      </div>
    );
  };

  return (
    <div className={css.headBox}>
      {compileButton("left", mockLeftButton)}
      <div className={css.headTitle}>
        <div>Big Screen Demo</div>
      </div>
      {compileButton("right", mockRightButton)}
    </div>
  );
};

export default ScreenHeader;
