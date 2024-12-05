import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const RotateVehicle = (props) => {
  const [imgIdx, setImgIdx] = useState(1);
  const [initClickX, setInitClickX] = useState();

  const dragStart = (ev) => {
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
    const { pageX } = ev;
    const img = document
      .getElementById("imgContentBeatle")
      .querySelector("img");
    const x = Math.floor((pageX - initClickX) / 20);
    const newImgIdx = generateIdx(imgIdx + x);
    img.src = require(`../../assets/beatle/beatle${newImgIdx}.png`).default;
    setImgIdx(newImgIdx);
  };

  const generateIdx = (num) => {
    let res;
    if (num > 36) {
      res = num % 36;
    } else if (num < 0) {
      res = 36 - ((36 - num) % 36);
    } else if (num == 0) {
      res = 36;
    } else {
      res = num;
    }
    return res;
  };

  return (
    <div className={css.moduleBox}>
      <div
        id="imgContentBeatle"
        className={css.imgContent}
        onMouseMove={(ev) => setInitClickX(ev.pageX)}
        onMouseDown={dragStart}
      >
        <img
          src={require(`../../assets/beatle/beatle${imgIdx}.png`).default}
          alt="beatles"
        />
      </div>
      <div className={css.rotateDeg} />
    </div>
  );
};

export default RotateVehicle;
