/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import css from "./index.module.less";

const radius = 30;

const Waapi = () => {
  //   window.addEventListener("click", (e) => {
  //     const pointer = document.createElement("div");
  //     pointer.classList.add("pointer");
  //     pointer.style.left = `${e.clientX}px`;
  //     pointer.style.top = `${e.clientY}px`;
  //     document.body.appendChild(pointer);
  //     pointer.addEventListener("animationend", () => {
  //       pointer.remove();
  //     });
  //   });

  useEffect(() => {
    listenDom();
    const boxes = document.getElementById("moduleBox");
    const myObserver = new ResizeObserver((entries) => {
      listenDom();
    });
    boxes && myObserver.observe(boxes);
  }, []);

  const listenDom = () => {
    const ball = document.querySelector("#ball");
    const box = document.querySelector("#moduleBox");
    init(ball, box);
    box &&
      box.addEventListener("click", function (e) {
        const x = e.clientX - box.getBoundingClientRect().left - radius;
        const y = e.clientY - box.getBoundingClientRect().top - radius;
        move(x, y, ball, box);
      });
  };

  const init = (ball, box) => {
    const x = box.clientWidth / 2;
    const y = box.clientHeight / 2;
    ball.style.transform = `translate(${x - radius}px, ${y - radius}px)`;
  };

  const move = (x, y, ball, box) => {
    const boxLeft = box.getBoundingClientRect().left;
    const boxTop = box.getBoundingClientRect().top;
    const initX = ball.getBoundingClientRect().left - boxLeft;
    const initY = ball.getBoundingClientRect().top - boxTop;
    ball.getAnimations().forEach((ani) => ani.cancel());
    const rad = Math.atan2(y - initY, x - initX);
    const deg = (rad * 180) / Math.PI;
    ball.animate(
      [
        {
          transform: `translate(${initX}px, ${initY}px) rotate(${deg}deg)`,
          easing: "ease-out",
        },
        {
          transform: `translate(${initX}px, ${initY}px) rotate(${deg}deg) scaleX(1.5)`,
          offset: 0.6,
        },
        {
          transform: `translate(${x}px, ${y}px) rotate(${deg}deg) scaleX(1.5)`,
          offset: 0.8,
          easing: "ease-in",
        },
        {
          transform: `translate(${x}px, ${y}px) rotate(${deg}deg)`,
        },
      ],
      {
        duration: 1000,
        fill: "forwards",
      }
    );
  };

  return (
    <div className={`${css.moduleBox} moduleBox`} id="moduleBox">
      <div className={`${css.ball} ball`} id="ball"></div>
    </div>
  );
};

export default Waapi;
