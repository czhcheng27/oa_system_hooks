import React, { useEffect } from "react";
import Scatter7 from "./Scatter7";
import { mockChartData7 } from "../../mockData";
import css from "./index.module.less";

const Chart7 = ({ isCenter = false }) => {
  const id = isCenter ? "centerChart7" : "chart7";

  const { sum, have, noPerfect, avg, scatterPointList = [] } = mockChartData7;

  const sideData7 = [
    {
      title: "Sum Num",
      value: sum ?? "0",
    },
    {
      title: "Equiped",
      value: have ?? "0",
    },
    {
      title: "Not Perfect",
      value: noPerfect ?? "0",
    },
    "divider",
    {
      title: "Overall",
      value: avg ?? "0.00",
    },
  ];

  useEffect(() => {
    if (isCenter) {
      document.getElementById(id).style.setProperty("--scaleSize", "2");
    }
  }, [isCenter]);

  const renderLeft = () => {
    return (
      <>
        {sideData7.map((el, index) => {
          const isDivider = index == 3;
          return (
            <div key={index} className={isDivider ? css.divide : css.eachBlock}>
              {isDivider ? null : renderEachBlock(el, index)}
            </div>
          );
        })}
      </>
    );
  };

  const renderEachBlock = (el, index) => {
    const { title, value } = el;
    return (
      <>
        <div className={css.title}>{title}</div>
        <div className={css.value}>{value}</div>
      </>
    );
  };

  return (
    <div id={id} className={css.chart7_wrap}>
      <div className={css.content_box}>
        <div>{renderLeft()}</div>
        <Scatter7 isCenter={isCenter} chartData={scatterPointList} />
      </div>
    </div>
  );
};

export default Chart7;
