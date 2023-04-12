import React, { useState, useEffect } from "react";
import LoadingTip from "../../../components/LoadingTip";
import OutBox from "./components/outBox";
import ViewFilter from "./components/viewFilter";
import { data } from "./const";
import css from "./index.module.less";

const StageDash = (props) => {
  const [pageTip, setPageTip] = useState({ show: true, status: 0 });
  const [listData, setListData] = useState(data);

  const loadingFunc = () => {
    setPageTip({ show: true, status: 0 });
    setTimeout(() => {
      setPageTip({ show: false });
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      setPageTip({ show: false });
    }, 1500);
  }, []);
  return (
    <div>
      <div>Title</div>

      {/* content */}
      <div>
        <div>view filter wrapper</div>
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
    </div>
  );
};

export default StageDash;
