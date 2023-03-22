import React from "react";
import { Spin, Empty } from "antd";
import EmptyImg from "./imgs/nodata.png";
import OvertimeImg from "./imgs/overtime.png";
import css from "./loadingTip.module.less";

const LoadingTip = ({ status, text, retry }) => {
  const renderRetry = () => {
    return (
      <div>
        网络超时，请
        <span onClick={retry} className={css.retry}>
          点击重试
        </span>
      </div>
    );
  };

  const renderNormal = () => {
    return text ? text : "网络超时，请一会儿重试...";
  };

  return (
    <div className={css.tipArea}>
      {status == 0 && <Spin tip={text || "数据加载中..."}></Spin>}
      {status == 1 && (
        <Empty
          image={EmptyImg}
          className={css.nodata}
          description={text ? text : "暂无数据，休息一会吧~"}
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
