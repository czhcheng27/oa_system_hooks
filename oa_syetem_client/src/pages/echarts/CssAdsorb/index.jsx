import React, { useState } from "react";
import css from "./index.module.less";

const CssAdsorb = () => {
  return (
    <div className={css.wrap}>
      <div className={css.horizental}>
        <div>Horizental</div>
        <div className={css.container}>
          <div className={css.item}>1</div>
          <div className={css.item}>2</div>
          <div className={css.item}>3</div>
          <div className={css.item}>4</div>
        </div>
      </div>

      <div className={css.vertical}>
        <div>Vertical</div>
        <div className={css.container}>
          <div className={css.item}>1</div>
          <div className={css.item}>2</div>
          <div className={css.item}>3</div>
          <div className={css.item}>4</div>
        </div>
      </div>
    </div>
  );
};

export default CssAdsorb;
