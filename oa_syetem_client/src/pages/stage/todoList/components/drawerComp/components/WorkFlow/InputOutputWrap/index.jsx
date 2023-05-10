import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import css from "./index.module.less";

const InputOutputWrap = ({ title, children, callback }) => {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <div
      className={css.InputOutCard}
      style={{ width: isHidden ? "0px" : "326px" }}
    >
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div className={css.title}>{title}</div>
      </div>
      <div className={css.scroll}>
        <div style={{ height: "auto" }}>{children}</div>
      </div>
      <div
        className={css.shrinkExtend}
        style={{ right: "-12px" }}
        onClick={() => (setIsHidden(!isHidden), callback(isHidden))}
      >
        <div className={css.round}>
          {!isHidden ? (
            <DoubleLeftOutlined style={{ color: "#0051E1" }} />
          ) : (
            <DoubleRightOutlined style={{ color: "#0051E1" }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InputOutputWrap;
