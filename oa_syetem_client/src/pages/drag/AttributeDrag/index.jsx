import React, { useState } from "react";
import { Button } from "antd";
import DrawerLayout from "./components/DrawerLayout";
import css from "./index.module.less";

const AttributeDrag = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // 打开抽屉
  const openDrawer = () => {
    setDrawerVisible(true);
  };

  // 关闭抽屉
  const closeDrawer = (cb) => {
    setDrawerVisible(false);
    cb && cb();
  };

  return (
    <div>
      <Button onClick={openDrawer}>Click to create template</Button>

      {drawerVisible && <DrawerLayout closeDrawer={closeDrawer} />}
    </div>
  );
};

export default AttributeDrag;
