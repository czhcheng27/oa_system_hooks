import React, { useState } from "react";
import { Button } from "antd";
import AprDetWrapper from "./aprDetWrapper";
import css from "./index.module.less";

const AprDetOne = (props) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setDrawerVisible(true)}>
        Click
      </Button>
      {drawerVisible && (
        <AprDetWrapper
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
        />
      )}
    </div>
  );
};

export default AprDetOne;
