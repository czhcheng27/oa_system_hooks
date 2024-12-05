import React, { useState } from "react";
import { Button, Drawer } from "antd";
import DrawerHeader from "src/components/DrawerHeader";
// import Canvas from "./components/editor/Canvas";
import css from "./index.module.less";

const LowCode: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  return (
    <div className={css.moduleBox}>
      <Button onClick={() => setDrawerVisible(true)}>
        Open LowCode Drawer
      </Button>
      <Drawer
        className={css.drawer}
        width={"100%"}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <div className={css.drawer_content}>
          <DrawerHeader backPrev={() => setDrawerVisible(false)}></DrawerHeader>

          {/* <Canvas /> */}
        </div>
      </Drawer>
    </div>
  );
};

export default LowCode;
