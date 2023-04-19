import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Drawer } from "antd";
import css from "./index.module.less";

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
    <div>
      <Drawer title="sss" open={visible} onClose={() => cancelHandle()}>
        {console.log("aa", receiveData)}
        sss
      </Drawer>
    </div>
  );
});

export default DrawerComp;
