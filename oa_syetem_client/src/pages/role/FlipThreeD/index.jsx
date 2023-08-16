import React from "react";
import css from "./index.module.less";

const FlipThreeD = (props) => {
  return (
    <div className={css.card}>
      <div className={css.front}>
        <p>dddddd</p>
      </div>

      {/* back */}
      <div className={css.back}>
        <div className={`${css.hero} ${css.threeD}`}>
          <h2>Zhao</h2>
          <div>
            <span>Assissan</span>
            <span>Warrior</span>
          </div>
        </div>
        <div className={`${css.desc} ${css.threeD}`}>
          Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao
          Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun
          Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao
          Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun Zhao Yun
          Zhao Yun Zhao Yun{" "}
        </div>
      </div>
    </div>
  );
};

export default FlipThreeD;
