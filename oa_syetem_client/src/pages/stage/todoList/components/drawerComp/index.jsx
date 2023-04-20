import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Drawer, Button } from "antd";
import DrawerHeader from "../../../../../components/DrawerHeader";
import InfoArea from "./components/InfoArea";
import FieldOperation from "./components/FieldOperation";
import Operation from "./components/Operation";
import css from "./index.module.less";

const DrawerComp = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [rotateY, setRotateY] = useState(0);
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
          <InfoArea data={receiveData} />
          <div
            className={`${css.main}`}
            style={{ transform: `rotateY(${rotateY}deg)` }}
          >
            {/* 正面 */}
            <div
              className={css.detailsBox}
              style={{ zIndex: (rotateY / 180) % 2 ? -1 : 1 }}
            >
              <div className={css.topWrap}>
                <FieldOperation toggle={() => setRotateY(rotateY + 180)} />
              </div>
              <div
                className={css.bottomWrap}
                style={{ background: "green" }}
              ></div>
            </div>

            {/* 背面 */}
            <div
              className={css.tempPlanBox}
              style={{ zIndex: (rotateY / 180) % 2 ? 1 : -1 }}
            >
              <div className={css.topWrap}>
                <Operation toggle={() => setRotateY(rotateY + 180)} />
              </div>
              <div className={css.bottomWrap} style={{ background: "red" }}>
                <div style={{ height: "2000px" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
});

export default DrawerComp;
