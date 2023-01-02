import React from "react";
import css from "./index.module.css";

const TopImg = (props) => {
  return (
    <div className={css.topImg_wrapper}>
      <div className={css.content}>
        <div className={css.top_text}>Focus Setting</div>
        <div className={css.bot_text}>
          <span>Please choose question type & project</span>
        </div>
      </div>
    </div>
  );
};

export default TopImg;
