import React, { useEffect } from "react";
import { mockChartData3 } from "../../mockData";
import css from "./index.module.less";

const Chart3 = ({ isCenter }) => {
  const id = isCenter ? "centerChart3" : "chart3";

  useEffect(() => {
    if (isCenter) {
      document.getElementById(id).style.setProperty("--scaleSize", "2");
    }
  }, [isCenter]);
  const renderEachRow = (el, index) => {
    const { equipNumber, equipName, equipRate } = el;
    return (
      <>
        <div
          className={`${css.rowNum} ${
            index < 3 ? css[`rowNum${index + 1}`] : css.rowNum4
          }`}
        >{`${index < 9 ? "0" : ""}${index + 1}`}</div>
        <div className={css.equipName}>{equipName}</div>
        <div className={css.equipNaum}>Equip Num: {equipNumber}</div>
        <div className={css.equipRate}>
          Rate: <span>{equipRate}</span>
        </div>
      </>
    );
  };
  return (
    <div id={id} className={css.chart3_wrap}>
      <div className={css.content}>
        <div className={css.innerContent}>
          {mockChartData3.map((el, index) => {
            return (
              <div key={index} className={css.each_row}>
                {renderEachRow(el, index)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Chart3;
