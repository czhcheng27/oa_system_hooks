import React, { useState, useEffect } from "react";
import BarLine2 from "./BarLine2";
import { mockChartData2Bot, mockChartData2Top } from "../../mockData";
import css from "./index.module.less";

const Chart2 = ({ isCenter }) => {
  const id = isCenter ? "centerChart2" : "chart2";
  const [topData, setTopData] = useState(mockChartData2Top);

  useEffect(() => {
    if (isCenter) {
      document.getElementById(id).style.setProperty("--scaleSize", "2");
    }
  }, [isCenter]);

  const renderTop = () => {
    return topData.map((el, index) => {
      return (
        <div className={css.each_row} key={index}>
          {renderEachRow(el)}
        </div>
      );
    });
  };

  const renderEachRow = (data) => {
    const { title, value } = data;
    return (
      <>
        <div>{title}</div>
        <div>{value}</div>
      </>
    );
  };
  return (
    <div id={id} className={css.chart2_wrap}>
      <div className={css.top_box}>{renderTop()}</div>
      <BarLine2 isCenter={isCenter} chartData={mockChartData2Bot} />
    </div>
  );
};

export default Chart2;
