import React, { useState, useContext } from "react";
import { LayoutContext } from "../DrawerLayout";
import css from "./index.module.less";

const AttrForm = () => {
  const { activeComp } = useContext(LayoutContext);
  const Comp = activeComp?.attrComp;
  return (
    <div>
      {Comp ? (
        <Comp />
      ) : (
        <div
          className={`${css.empty}`}
          data-des="Attribute Config is Not Opened"
        />
      )}
    </div>
  );
};

export default AttrForm;
