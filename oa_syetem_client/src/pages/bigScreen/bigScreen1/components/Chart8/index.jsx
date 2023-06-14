import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import BarLine8 from "./BarLine8";
import css from "./index.module.less";
import { mockChartData8 } from "../../mockData";

const { TabPane } = Tabs;

const Chart8 = ({ isCenter, filterParams, filterHandle }) => {
  const renderTop = () => {
    return (
      <Tabs onChange={filterHandle} activeKey={filterParams}>
        <TabPane tab="tab1" key="bucUnit" />
        <TabPane tab="tab2" key="sdcCover" />
        <TabPane tab="tab3" key="optimalRate" />
      </Tabs>
    );
  };

  return (
    <div className={css.chart8_wrap}>
      <div className={css.top_box}>{renderTop()}</div>
      <BarLine8
        type={filterParams}
        isCenter={isCenter}
        chartData={mockChartData8}
      />
    </div>
  );
};

export default Chart8;
