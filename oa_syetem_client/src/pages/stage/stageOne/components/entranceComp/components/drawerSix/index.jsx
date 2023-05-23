import React, {
  useState,
  useEffect,
  forwardRef,
  memo,
  useImperativeHandle,
} from "react";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import css from "./index.module.less";

const DrawerSix = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openHandle,
  }));
  const [visible, setVisible] = useState(false);

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  return (
    <Drawer
      className={css.drawer}
      width="90%"
      open={visible}
      onClose={closeHandle}
    >
      <div className={css.details}>
        <DrawerHeader
          background="white"
          pageName={`Drawer Six`}
          backPrev={() => closeHandle()}
        >
          <div
            className={css.closeIcon}
            style={{ cursor: "pointer" }}
            onClick={closeHandle}
          >
            <CloseOutlined />
          </div>
        </DrawerHeader>

        <div></div>
      </div>
    </Drawer>
  );
});

export default memo(DrawerSix);
