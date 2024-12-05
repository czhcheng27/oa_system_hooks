import React from "react";
import classNames from "classnames";
import css from "./headerTitle.module.css";

export const HeaderTitle = ({ title, children }) => {
  return (
    <div className={classNames(css.wrapper)}>
      <div className={classNames(css.form_header_title)}>
        <i></i>
        <span className={classNames(css.form_header_word)}>{title}</span>
      </div>

      <div className={classNames(css.children)}>{children}</div>
    </div>
  );
};
