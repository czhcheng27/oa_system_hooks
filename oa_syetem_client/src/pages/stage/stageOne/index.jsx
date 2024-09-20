import React, { useState, useEffect } from "react";
import { Button } from "antd";
import LoadingTip from "src/components/LoadingTip";
import CarouselComp from "./components/carouselComp";
import EntranceComp from "./components/entranceComp";
import OutBox from "./components/outBox";
import TitleParts from "./components/titlePart";
import ViewFilter from "./components/viewFilter";
import TipBox from "./components/tipBox";
import { data } from "./const";
import { toggle } from "../../../utils/fullScreen";
import css from "./index.module.less";

const StageDash = (props) => {
  const [pageTip, setPageTip] = useState({ show: true, status: 0 });
  const [listData, setListData] = useState(data);

  const loadingFunc = (code) => {
    setPageTip({ show: true, status: 0 });
    setTimeout(() => {
      switch (code) {
        case 1:
          return setPageTip({ show: true, status: 1 });

        case 2:
          return setPageTip({ show: true, status: 2 });

        default:
          return setPageTip({ show: false });
      }
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setPageTip({ show: false });
    }, 1500);
  }, []);

  const handleFullScreen = () => {
    const elm = document.querySelector(".progress_wrapper");
    toggle(elm);
  };

  return (
    <div className={css.stageDash}>
      {/* top banner */}
      <div className={css.topBanner}>
        <div className={css.bannerTitle}>Storage One Banner</div>
      </div>

      {/* enter area */}
      <div className={css.enterArea}>
        <EntranceComp />
      </div>

      {/* Carousel area */}
      <div className={css.carouselComp_wrapper}>
        <CarouselComp />
      </div>

      {/* content info */}
      <div className={`${css.progress_wrapper} progress_wrapper`}>
        <div className={css.titleParts_wrapper}>
          <Button
            onClick={handleFullScreen}
            type="primary"
            className={css.fsBtn}
          >
            Fullscreen
          </Button>
          <TitleParts />
        </div>
        <div className={css.viewfilterWrap}>
          <ViewFilter
            loadingFunc={loadingFunc}
            setListData={setListData}
            data={data}
          />
        </div>
        <div className={css.setChangeWrap}>
          {pageTip.show ? (
            <div className={css.statusTipWrap}>
              <LoadingTip status={pageTip.status} />
            </div>
          ) : (
            <OutBox data={listData} warnDay={5} />
          )}
        </div>
      </div>

      {/* tip box */}
      <TipBox />
    </div>
  );
};

export default StageDash;
