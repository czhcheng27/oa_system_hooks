import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button, Drawer } from "antd";
import HeaderTip from "@/components/headerTip";
import LoadingTip from "../../../../../../../components/LoadingTip";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import Approval from "../approval";
import HistoryCard from "./HistoryCard";
import { mockList } from "./mock";
import css from "./index.module.less";

const AprDetWrapper = forwardRef(({ onClose }, ref) => {
  const [visible, setVisible] = useState(false);
  const [pageTip, setPageTip] = useState({ show: true, status: 0 });
  const [listData, setListData] = useState(mockList);
  const [actIdx, setActIdx] = useState(0);

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

  const renderChangeHistory = () => {
    return (
      <>
        <HeaderTip>变更历史</HeaderTip>
        {!listData?.length ? null : (
          <HistoryCard
            listData={listData}
            cardClick={cardClick}
            actIdx={actIdx}
          />
        )}
      </>
    );
  };

  const cardClick = (data, index) => {
    setActIdx(index);
  };

  return (
    <Drawer
      className={css.drawer}
      width="90%"
      open={visible}
      onClose={cancelHandle}
      maskClosable={false}
    >
      <div className={css.taskExecution}>
        <DrawerHeader pageName={"View Details"} backPrev={cancelHandle}>
          <div className={css.btns}>
            <Button type="primary" onClick={cancelHandle}>
              Close
            </Button>
          </div>
        </DrawerHeader>
        {pageTip.show && (
          <LoadingTip status={pageTip.status} text={pageTip.text} />
        )}
        {!pageTip.show && (
          <div className={css.content}>
            <div className={css.approvalContentLeft}>
              <div className={css.history}>{renderChangeHistory()}</div>
            </div>
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
