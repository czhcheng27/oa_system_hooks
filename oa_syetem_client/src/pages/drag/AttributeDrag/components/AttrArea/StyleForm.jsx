import React, { useState, useContext } from "react";
import { LayoutContext } from "../DrawerLayout";
import css from "./index.module.less";

const StyleForm = () => {
  const { activeComp } = useContext(LayoutContext);
  const Comp = activeComp?.styleComp;
  return (
    <div>
      {Comp ? (
        <Comp />
      ) : (
        <div
          className={`${css.empty} ${css.style}`}
          data-des="Style Config is Not Opened"
        />
      )}
    </div>
  );
};

export default StyleForm;
