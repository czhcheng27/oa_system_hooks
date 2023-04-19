import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Drawer, Button } from "antd";
import css from "./index.module.less";
import DrawerHeader from "../../../../../components/DrawerHeader";

const DrawerComp = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [receiveData, setReceiveData] = useState();

  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  //  关闭抽屉
  const openHandle = (data) => {
    setVisible(true);
    setReceiveData(data);
  };

  //  关闭抽屉
  const cancelHandle = () => {
    setVisible(false);
  };
  return (
    <Drawer
      className={css.drawer}
      width="90%"
      open={visible}
      onClose={() => cancelHandle()}
    >
      <div className={css.details}>
        <DrawerHeader pageName=" View details" backPrev={() => cancelHandle()}>
          <div className={css.btnArea}>
            <Button>Save</Button>
            <Button type="primary">Submit</Button>
          </div>
        </DrawerHeader>

        {/* content */}
        <div className={css.content}>
          <div style={{ height: "1000px" }}>as</div>
        </div>
      </div>
    </Drawer>
  );
});

export default DrawerComp;
