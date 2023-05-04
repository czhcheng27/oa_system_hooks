import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button, Drawer } from "antd";
import LoadingTip from "../../../../../../../components/LoadingTip";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import css from "./index.module.less";
import Approval from "../approval";

const AprDetWrapper = forwardRef(({ onClose }, ref) => {
  const [visible, setVisible] = useState(false);
  const [pageTip, setPageTip] = useState({ show: true, status: 0 });

  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  //  open抽屉
  const openHandle = (data) => {
    setVisible(true);
  };

  //  关闭抽屉
  const cancelHandle = () => {
    setVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setPageTip({ show: false });
    }, 500);
  }, []);
  return (
    <Drawer
      className={css.drawer}
      width="90%"
      open={visible}
      onClose={onClose}
      maskClosable={false}
    >
      <div className={css.taskExecution}>
        <DrawerHeader pageName={"View Details"} backPrev={onClose}>
          <div className={css.btns}>
            <Button type="primary" onClick={onClose}>
              Close
            </Button>
          </div>
        </DrawerHeader>
        {pageTip.show && (
          <LoadingTip status={pageTip.status} text={pageTip.text} />
        )}
        {!pageTip.show && (
          <div className={css.content}>
            <div className={css.approvalContentLeft}>sadasd</div>
            <div className={css.approvalContentRight}>
              <Approval />
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
});

export default AprDetWrapper;
