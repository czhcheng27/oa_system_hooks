import React from "react";
import css from "./index.module.less";
import { useEffect } from "react";

const AnimationDelay = () => {
  useEffect(() => {
    const inp = document.querySelector("input");
    const face = document.querySelector(".face");
    const leftEye = document.querySelector(".leftEye");
    const rightEye = document.querySelector(".rightEye");
    const mouth = document.querySelector(".mouth");
    inp.oninput = (e) => {
      changeFunc(face, leftEye, rightEye, mouth, inp.value);
    };
    changeFunc(face, leftEye, rightEye, mouth, inp.value);
  }, []);

  const changeFunc = (face, leftEye, rightEye, mouth, value) => {
    calc(face, value);
    calc(leftEye, value);
    calc(rightEye, value);
    calc(mouth, value);
  };

  const calc = (dom, value) => {
    dom.style.setProperty("--delay", `-${value}s`);
  };

  return (
    <div className={css.box}>
      {/* <div className={`${css.ball} ball`}></div> */}
      <div className={`${css.face} face`}>
        <div className={`${css.leftEye} leftEye`}></div>
        <div className={`${css.rightEye} rightEye`}></div>
        <div className={`${css.mouth} mouth`}></div>
      </div>
      <input type="range" min={0} max={1} step={0.01} />
    </div>
  );
};

export default AnimationDelay;
