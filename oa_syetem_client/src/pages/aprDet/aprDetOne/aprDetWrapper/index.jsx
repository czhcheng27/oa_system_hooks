import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import LoadingTip from "src/components/LoadingTip";
import DrawerHeader from "../../../../components/DrawerHeader";
import css from "./index.module.less";
import Approval from "../components/approval";

const AprDetWrapper = ({ open, onClose }) => {
  const [pageTip, setPageTip] = useState({ show: true, status: 0 });

  useEffect(() => {
    setTimeout(() => {
      setPageTip({ show: false });
    }, 500);
  }, []);
  return (
    <Drawer
      className={css.drawer}
      width="90%"
      open={open}
      onClose={onClose}
      maskClosable={false}
    >
      <div className={css.taskExecution}>
        <DrawerHeader pageName={"查看审批详情"} backPrev={onClose}>
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
};

export default AprDetWrapper;
