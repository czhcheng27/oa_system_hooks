import React from "react";
import AudiImg from "./audi.jpg";
import BenzImg from "./benz.jpg";
import BmwImg from "./bmw.jpg";
import css from "./index.module.less";

const Carousel3D = () => {
  return (
    <div className={css.container}>
      <div className={css.cardBox}>
        <div className={css.card}>
          <img src={AudiImg} />
        </div>
        <div className={css.card}>
          <img src={BenzImg} />
        </div>
        <div className={css.card}>
          <img src={BmwImg} />
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;
