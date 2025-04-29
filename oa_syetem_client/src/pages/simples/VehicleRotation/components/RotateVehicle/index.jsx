import React, { useState } from "react";
import css from "./index.module.less";

// 1. 导入所有图片
const images = require.context("../../assets/beatle", false, /\.png$/);

// 2. 用数字作为 key 构造映射
const imageMap = {};
images.keys().forEach((key) => {
  const match = key.match(/beatle(\d+)\.png$/);
  if (match) {
    const idx = parseInt(match[1], 10);
    imageMap[idx] = images(key);
  }
});

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
    if (initClickX === null) return;
    const { pageX } = ev;
    const img = document
      .getElementById("imgContentBeatle")
      ?.querySelector("img");

    const x = Math.floor((pageX - initClickX) / 20);
    const newImgIdx = generateIdx(imgIdx + x);

    if (img) {
      img.src = imageMap[newImgIdx];
    }
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
        <img src={imageMap[imgIdx]} alt="beatles" />
      </div>
      <div className={css.rotateDeg} />
    </div>
  );
};

export default RotateVehicle;
