import React, {
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Drawer } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import css from "./index.module.less";
import Steps from "./components/Steps";

const DrawerThree = forwardRef((props, ref) => {
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

  const renderContent = () => {
    return <div>renderContent</div>;
  };

  return (
    <Drawer
      className={css.drawer}
      width="100%"
      open={visible}
      onClose={closeHandle}
    >
      <div className={css.details}>
        <DrawerHeader
          background="white"
          pageName={`Create Action Plan`}
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

        <Steps />
        {renderContent()}
      </div>
    </Drawer>
  );
});

export default DrawerThree;
