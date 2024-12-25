import React, {
  useState,
  useEffect,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
} from "react";
import { Drawer } from "antd";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import AdminBook from "./components/AdminBook";
import { mockData } from "./mock";
import css from "./index.module.less";
import { useUpdateEffect } from "ahooks";

const DrawerFive = forwardRef((props, ref) => {
  const flipBookRef = useRef(null);

  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  const [visible, setVisible] = useState(false);
  const [bookArray, setBookArray] = useState([]);
  const [page, setPage] = useState(0);
  const [isCoverClosed, setIsCoverClosed] = useState(true);
  const [isOpeningCover, setIsOpeningCover] = useState(false);
  const [isBackCoverClosed, setIsBackCoverClosed] = useState(false);
  const [isOpeningBackCover, setIsOpeningBackCover] = useState(false);
  const [pageFlip, setPageFlip] = useState(null);

  const totalPages = pageFlip?.getPageCount() - 1;
  console.log(`totalPages`, totalPages);

  useEffect(() => {
    getBookChapter();
  }, []);

  useUpdateEffect(() => {
    const funcs = flipBookRef?.current?.pageFlip();
    setPageFlip(funcs);
    if (page === totalPages) {
      setIsBackCoverClosed(true);
      setIsOpeningBackCover(false);
    }
    if (page !== 0) {
      setIsCoverClosed(false);
    }
    if (page !== totalPages && page !== 0) {
      setIsCoverClosed(false);
      setIsOpeningCover(true);
      setIsOpeningBackCover(false);
      setIsBackCoverClosed(false);
    }
    if (page === 0) {
      setIsOpeningCover(false);
      setIsCoverClosed(true);
    }
  }, [page]);

  const getBookChapter = () => {
    setBookArray(mockData);
  };

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  const onPage = (e) => {
    const curPageNum = e.data;
    console.log(`onPage`, e, curPageNum);
    setPage(curPageNum);
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
          pageName={`Drawer Five`}
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

        {/* center book */}
        <div
          className={classNames({
            [css.adminBookBox]: true,
            [css.coverClosed]: isCoverClosed,
            [css.openBook]: isOpeningCover,
            [css.backCoverClosed]: isBackCoverClosed,
            [css.openBackBook]: isOpeningBackCover,
          })}
        >
          <AdminBook ref={flipBookRef} pageList={bookArray} onPage={onPage} />
        </div>
      </div>
    </Drawer>
  );
});

export default memo(DrawerFive);
