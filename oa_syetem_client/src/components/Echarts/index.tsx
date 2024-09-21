import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import css from "./index.module.less";

interface EchartsProps {
  key: string;
  options: object;
  clickMethod?: (p) => void;
}

const Echarts: React.FC<EchartsProps> = ({ key, options, clickMethod }) => {
  const echartsRef = useRef<any>(),
    myChartRef = useRef<any>();
  useEffect(() => {
    setTimeout(() => {
      myChartRef.current = echarts.init(echartsRef.current);
      myChartRef.current.setOption(options);
    });
    if (clickMethod) {
      myChartRef.current.on("click", function (params) {
        clickMethod(params);
      });
    }
    window.addEventListener("resize", handleSize, false);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [options]);

  const handleSize = () => {
    myChartRef.current.resize();
  };
  return <div className={css.echarts} ref={echartsRef}></div>;
};

export default Echarts;
