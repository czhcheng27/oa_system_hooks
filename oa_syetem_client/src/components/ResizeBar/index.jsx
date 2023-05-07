import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const ResizeBar = ({ func, min = 314, max = 628 }) => {
  //  拖拽收缩框回调
  const dragStart = (ev) => {
    ev.preventDefault();
    document.addEventListener("mousemove", movingHandle, { passive: true });
    document.addEventListener("mouseup", dragStop, {
      passive: true,
      once: true,
    });
  };

  //  鼠标放开，移除监听
  const dragStop = () => {
    document.removeEventListener("mousemove", movingHandle);
  };

  //  计算并赋值宽度
  const movingHandle = (ev) => {
    const { pageX } = ev;
    let offset = pageX;
    if (pageX < min) {
      offset = min;
    }
    if (pageX > max) {
      offset = max;
    }
    func(offset);
  };

  return (
    <div className={css.resizeBar} draggable="true" onMouseDown={dragStart} />
  );
};

export default ResizeBar;
