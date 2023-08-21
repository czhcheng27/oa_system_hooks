import React from "react";
import FlipThreeD from "./FlipThreeD";
import Carousel3D from "./Carousel3D";
import LotterySpin from "./LotterySpin";
import css from "./index.module.less";

const text =
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor hicarchitecto explicabo animi, optio quaerat, id, fugiat voluptates remodit ipsum ipsam unde incidunt recusandae natus consequunturperferendis repellat totam?";

const Role = (props) => {
  return (
    <div className={css.moduleBox}>
      <div className={css.container}>
        <div className={css.textBox}>{text}</div>
        <div className={css.eraser}>
          <span className={css.text}>{text}</span>
        </div>
      </div>
      <FlipThreeD />
      <div className={css.carouselBox}>
        <Carousel3D />
      </div>
      <div className={css.lotteryBox}>
        <LotterySpin />
      </div>
    </div>
  );
};

export default Role;
