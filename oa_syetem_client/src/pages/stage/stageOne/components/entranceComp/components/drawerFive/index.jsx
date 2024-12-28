import React, {
  useState,
  useEffect,
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  createContext,
} from "react";
import { Drawer } from "antd";
import { useUpdateEffect } from "ahooks";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import AdminBook from "./components/AdminBook";
import { mockData } from "./mock";
import {
  initParamsArray,
  initVisiblePages,
  setCustomizeParams,
} from "./bookConfig";
import css from "./index.module.less";

export const FlipBookContext = createContext();
const DrawerFive = forwardRef((props, ref) => {
  const flipBookRef = useRef(null);
  const botPageNumRef = useRef(0);

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
  const [visiblePageArray, setVisiblePageArray] = useState(initVisiblePages); // 当前页面可见的页数集合

  const totalPages = pageFlip?.getPageCount() - 1;

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
    setCustomizeParams(initParamsArray, mockData);
  };

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  const onPage = (e) => {
    const curPageNum = e.data;
    botPageNumRef.current = curPageNum;
    setPage(curPageNum);
    getVisiblePageArray();
  };

  // 获取可见页数的数组
  const getVisiblePageArray = () => {
    const botNum = botPageNumRef.current;
    const isOdd = botPageNumRef.current % 2 !== 0;
    const oddArray = [
      botNum - 2,
      botNum - 1,
      botNum,
      botNum + 1,
      botNum + 2,
      botNum + 3,
    ];
    const evenArray = [
      botNum - 3,
      botNum - 2,
      botNum - 1,
      botNum,
      botNum + 1,
      botNum + 2,
    ];
    const suppose = isOdd ? oddArray : evenArray; // 正常翻页情况下的可见页数数组
    setVisiblePageArray(suppose);
  };

  /**
   * 获取对应的章节的页面的具体参数值
   * @param {String} chapterNo 章节号
   * @param {String} pageName 章节下的页面的名字
   * @param {String} param 参数字段名
   * @returns
   */
  const getChapterPageParam = (chapterNo, pageName, param) => {
    const chapter = bookArray.find((el) => el.number === chapterNo);
    if (!chapter) return;
    const obj = chapter["contentVOList"].find((el) => el.name === pageName);
    return obj[param];
  };

  /**
   * 更新相应章节的页面的具体参数值
   * @param {Array} chapterNo 章节号
   * @param {String} pageName 章节下的页面的名字
   * @param {String} param 参数字段名
   * @param {String} value 更新值
   */
  const updateChapterPageParam = (chapterNo, pageName, param, value) => {
    const res = bookArray.map((chapter) => {
      const { number: chptNo, contentVOList } = chapter;
      if (chptNo === chapterNo) {
        const pageIndex = contentVOList.findIndex(
          (page) => page.name === pageName
        );
        contentVOList[pageIndex][param] = value;
      }
      return chapter;
    });
    setBookArray(res);
  };

  return (
    <FlipBookContext.Provider
      value={{
        visiblePageArray,
        getChapterPageParam,
        updateChapterPageParam,
      }}
    >
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
            <AdminBook
              ref={flipBookRef}
              pageList={bookArray}
              visiblePageArray={visiblePageArray}
              onPage={onPage}
            />
          </div>
        </div>
      </Drawer>
    </FlipBookContext.Provider>
  );
});

export default memo(DrawerFive);
