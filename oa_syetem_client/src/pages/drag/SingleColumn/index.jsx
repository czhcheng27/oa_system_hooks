import React from "react";
import JSDrag from "./JSDrag";
import css from "./index.module.css";

const SingleColumn = (props) => {
  return (
    <div className={css.wrapper}>
      <div className={css.left_area}>
        <header>JS</header>
        <div>
          <JSDrag />
        </div>
      </div>
      <div className={css.right_area}>
        <header>react-beautiful-dnd</header>
        <div></div>
      </div>
    </div>
  );
};

export default SingleColumn;
