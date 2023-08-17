import React from "react";
import css from "./index.module.less";

const Carousel3D = (props) => {
  return (
    <div className={css.container}>
      <div className={css.cardBox}>
        <div className={css.card}>
          <img src={require("./audi.jpg").default} />
        </div>
        <div className={css.card}>
          <img src={require("./benz.jpg").default} />
        </div>
        <div className={css.card}>
          <img src={require("./bmw.jpg").default} />
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;
