import React, { useEffect } from "react";
import css from "./index.module.less";

const AnimationDelay = () => {
  useEffect(() => {
    const inp = document.querySelector("input") as HTMLInputElement;
    const face = document.querySelector(".face") as HTMLElement;
    const leftEye = document.querySelector(".leftEye") as HTMLElement;
    const rightEye = document.querySelector(".rightEye") as HTMLElement;
    const mouth = document.querySelector(".mouth") as HTMLElement;
    console.log(`1111`, inp, face, leftEye, rightEye, mouth, inp.value);
    inp.oninput = (e) => {
      changeFunc(face, leftEye, rightEye, mouth, inp.value);
    };
    changeFunc(face, leftEye, rightEye, mouth, inp.value);
  }, []);

  const changeFunc = (
    face: HTMLElement,
    leftEye: HTMLElement,
    rightEye: HTMLElement,
    mouth: HTMLElement,
    value: string
  ) => {
    calc(face, value);
    calc(leftEye, value);
    calc(rightEye, value);
    calc(mouth, value);
  };

  const calc = (dom: HTMLElement, value: string) => {
    dom.style.setProperty("--delay", `-${value}s`);
  };

  return (
    <div className={css.box}>
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
