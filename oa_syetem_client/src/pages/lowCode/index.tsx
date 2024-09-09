import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Canvas from "./components/editor/Canvas";
import css from "./index.module.less";
import DrawerHeader from "src/components/DrawerHeader";

interface LowCodeProps {
  name: string;
}

const LowCode: React.FC<LowCodeProps> = ({ name }) => {
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
          <DrawerHeader
            // pageName={"Back"}
            backPrev={() => setDrawerVisible(false)}
          ></DrawerHeader>

          <Canvas name="canvas" />
        </div>
      </Drawer>
    </div>
  );
};

export default LowCode;
