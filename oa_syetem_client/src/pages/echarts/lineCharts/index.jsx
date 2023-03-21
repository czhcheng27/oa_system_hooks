import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import ChartOne from "./chartOne";
import css from "./index.module.less";

const LineCharts = (props) => {
  return (
    <div>
      <ChartOne />
    </div>
  );
};

export default LineCharts;
