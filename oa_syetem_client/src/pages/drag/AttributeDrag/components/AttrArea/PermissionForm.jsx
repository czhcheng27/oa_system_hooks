import React, { useState, useContext } from "react";
import { LayoutContext } from "../DrawerLayout";
import css from "./index.module.less";

const PermissionForm = () => {
  const { activeComp } = useContext(LayoutContext);
  const Comp = activeComp?.permissionComp;
  return (
    <div>
      {Comp ? (
        <Comp />
      ) : (
        <div
          className={`${css.empty} ${css.permission}`}
          data-des="Permission Config is Not Opened"
        />
      )}
    </div>
  );
};

export default PermissionForm;
