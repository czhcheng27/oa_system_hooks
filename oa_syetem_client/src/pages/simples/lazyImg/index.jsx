import React, { useEffect, useState } from "react";
import ZhaoImg from "./assets/zhaoyun.jpeg";
import BandImg from "./assets/bgBand.png";
import css from "./index.module.less";

const LazyImg = () => {
  useEffect(() => {
    // 创建一个 Observer 观察者
    // entries：获取到的是所有元素交叉的结果
    const ob = new IntersectionObserver(
      (entries) => {
        console.log("回调函数：在交叉改变的时候运行", entries);
        for (let entry of entries) {
          // 交叉了
          if (entry.isIntersecting) {
            // entry.target 交叉的目标元素
            const img = entry.target;
            img.src = img.dataset.src;

            // 一旦加载完成，就不需要观察了
            ob.unobserve(img);
          }
        }
      },
      {
        root: null, // 默认是视窗
        rootMargin: "0px", // 根据视窗的大小，向外扩展 0px
        threshold: 0, // 交叉比例，0 表示没有交叉，1表示完全交叉
      }
    );

    // 获取到所有图片进行观察
    const imgs = document.querySelectorAll("img[data-src]");
    console.log("imgs", imgs);

    // 对所有图片进行观察
    imgs.forEach((img) => {
      // 开始观察
      ob.observe(img);
    });
  }, []);
  return (
    <div>
      <div className={css.item}>
        <img src={BandImg} data-src={ZhaoImg} alt="a" />
      </div>
      <div className={css.item}>
        <img src={BandImg} data-src={ZhaoImg} alt="a" />
      </div>
      <div className={css.item}>
        <img src={BandImg} data-src={ZhaoImg} alt="a" />
      </div>
      <div className={css.item}>
        <img src={BandImg} data-src={ZhaoImg} alt="a" />
      </div>
      <div className={css.item}>
        <img src={BandImg} data-src={ZhaoImg} alt="a" />
      </div>
    </div>
  );
};

export default LazyImg;
