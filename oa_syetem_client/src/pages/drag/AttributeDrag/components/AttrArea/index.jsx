import React, { useState, useContext } from "react";
import { Tabs } from "antd";
import AttrForm from "./AttrForm";
import StyleForm from "./StyleForm";
import PermissionForm from "./PermissionForm";
import { LayoutContext } from "../DrawerLayout";
import css from "./index.module.less";

const AttrArea = () => {
  const { activeAttrTab, setActiveAttrTab } = useContext(LayoutContext);
  const items = [
    {
      key: "Attribute",
      label: "Attribute",
      children: <AttrForm />,
    },
    {
      key: "Style",
      label: "Style",
      children: <StyleForm />,
    },
    {
      key: "Permission",
      label: "Permission",
      children: <PermissionForm />,
    },
  ];
  return (
    <div className={css.moduleBox}>
      <Tabs
        className={css.tabWrap}
        activeKey={activeAttrTab}
        items={items}
        onChange={(key) => {
          setActiveAttrTab(key);
        }}
      />
    </div>
  );
};

export default AttrArea;
