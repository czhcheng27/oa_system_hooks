import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import BarLine2 from "./BarLine2";
import { mockChartData2Bot, mockChartData2Top } from "../../mockData";
import css from "./index.module.less";

const Chart2 = ({ isCenter }) => {
  const [topData, setTopData] = useState(mockChartData2Top);

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
    <div className={css.chart2_wrap}>
      <div className={css.top_box}>{renderTop()}</div>
      <BarLine2 isCenter={isCenter} chartData={mockChartData2Bot} />
    </div>
  );
};

export default Chart2;
