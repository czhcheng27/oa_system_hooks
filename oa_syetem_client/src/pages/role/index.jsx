import React from "react";
import FlipThreeD from "./FlipThreeD";
import Carousel3D from "./Carousel3D";
import LotterySpin from "./LotterySpin";
import css from "./index.module.less";

const Role = (props) => {
  return (
    <div style={{ height: "100%" }}>
      Role
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
