import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import css from "./index.module.less";

const InputOutputWrap = ({
  title,
  children,
  callback,
  btnPosition = "right",
}) => {
  const styObj =
    btnPosition == "right" ? { right: "-12px" } : { left: "-12px" };
  const [isHidden, setIsHidden] = useState(false);
  const [direction, setDirection] = useState(
    btnPosition == "right" ? "left" : "right"
  );

  const handleClick = () => {
    setIsHidden(!isHidden);
    setDirection(direction == "right" ? "left" : "right");
    callback && callback(isHidden);
  };

  return (
    <div
      className={css.InputOutCard}
      style={{ width: isHidden ? "0px" : "326px" }}
    >
      <div style={{ width: "100%", overflow: "hidden" }}>
        <div className={css.title}>{title}</div>
      </div>
      <div className={css.scroll}>{children}</div>
      <div
        className={css.shrinkExtend}
        style={styObj}
        onClick={() => handleClick()}
      >
        <div className={css.round}>
          {direction == "left" ? (
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
