import React from "react";
import { Spin, Empty } from "antd";
import EmptyImg from "./imgs/nodata.png";
import OvertimeImg from "./imgs/overtime.png";
import css from "./loadingTip.module.less";

const LoadingTip = ({ status, text, retry }) => {
  const renderRetry = () => {
    return (
      <div>
        Interface exception, please
        <span onClick={retry} className={css.retry}>
          click retry
        </span>
      </div>
    );
  };

  const renderNormal = () => {
    return text ? text : "Interface exception, please try again later...";
  };

  return (
    <div className={css.tipArea}>
      {status == 0 && <Spin tip={text || "Data loading..."}></Spin>}
      {status == 1 && (
        <Empty
          image={EmptyImg}
          className={css.nodata}
          description={text ? text : "No data yet, please take a break~"}
        />
      )}
      {status == 2 && (
        <Empty
          image={OvertimeImg}
          description={retry ? renderRetry() : renderNormal()}
        />
      )}
    </div>
  );
};

export default LoadingTip;
