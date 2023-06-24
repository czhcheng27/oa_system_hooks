import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const RotateVehicle = (props) => {
  const [initClickX, setInitClickX] = useState(); // 鼠标初次点击页面的 X 位置

  const dragStart = (ev) => {
    // console.log("dragStart", ev.pageX);
    setInitClickX(ev.pageX);
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

  const movingHandle = (ev) => {
    // console.log("initClickX", initClickX);
    const { pageX } = ev;
    // console.log("pageX", pageX);
    const img = document
      .getElementById("imgContentBeatle")
      .querySelector("img");
    console.log("img", img);
    if (pageX > initClickX) {
      console.log("Right");
      img.src = require("../../assets/beatle/beatle15.png").default;
    } else {
      console.log("Left");
    }
  };

  return (
    <div className={css.moduleBox}>
      <div
        id="imgContentBeatle"
        className={css.imgContent}
        // onMouseDown={mouseDown}
        onMouseDown={dragStart}
      >
        <img
          src={require("../../assets/beatle/beatle1.png").default}
          alt="beatles"
        />
      </div>
      <div className={css.rotateDeg} />
    </div>
  );
};

export default RotateVehicle;
