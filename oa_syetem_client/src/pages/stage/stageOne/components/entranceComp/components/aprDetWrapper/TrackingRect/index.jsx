import React, { useEffect } from "react";
import css from "./index.module.less";

const arr = [1, 2, 3, 4, 5, 6];
const images = require.context("../../../assets", false, /\.jpg$/);

const imageMap = {};
images.keys().forEach((key) => {
  const cleanKey = key.replace("./", ""); // 例如 image1.jpg
  imageMap[cleanKey] = images(key);
});

const TrackingRect = (props) => {
  useEffect(() => {
    rectMovingFunc(1);
  }, []);

  const rectMovingFunc = (num) => {
    const elm = document.getElementById(`tracking_img${num}`);
    const pointer = document.getElementById("tracking_pointer");
    const w = elm.offsetWidth;
    const h = elm.offsetHeight;
    const x = elm.offsetLeft;
    const y = elm.offsetTop;
    pointer.style.setProperty("--x", x + "px");
    pointer.style.setProperty("--y", y + "px");
    pointer.style.setProperty("--width", w + "px");
    pointer.style.setProperty("--height", h + "px");
  };
  return (
    <div className={css.container}>
      {arr.map((el, index) => {
        const imgName = `image${index + 1}.jpg`;
        return (
          <div key={index} className={css.eachItem}>
            <img
              id={`tracking_img${index + 1}`}
              onMouseEnter={() => rectMovingFunc(index + 1)}
              src={imageMap[imgName]}
              alt=""
            />
          </div>
        );
      })}
      <div className={css.pointer} id="tracking_pointer" />
    </div>
  );
};

export default TrackingRect;
