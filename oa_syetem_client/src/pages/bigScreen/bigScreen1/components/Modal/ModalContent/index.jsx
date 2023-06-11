import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import { message } from "antd";
import { mockChartData3 } from "../../../mockData";
import {
  get3dBarSeries,
  get3dBarSeriesCap,
  getLineSeries,
  releasedBarColor2,
} from "../../../../../../utils/echarts";
import { modalOptions } from "../modalDict";
import { nextTick } from "../../../../../../utils";
import css from "./index.module.less";

const ModalContent = ({ modalDict, closeModal }) => {
  const [firstType, setFirstType] = useState("");
  const [firstFilterShow, setFirstFilterShow] = useState(false);
  const [firstFilterOption, setFirstFilterOption] = useState({
    type: "",
    key: "",
    params: {},
  });
  const [secondType, setSecondType] = useState("");

  useEffect(() => {
    mateChartData();
  }, []);

  const mateChartData = () => {
    const mateOption = getMateOption();
    if (mateOption) {
      const { firstType, secondType, firstOption } = mateOption;
      setFirstType(firstType);
      setFirstFilterShow(!!mateOption.firstFilterOption);
      setFirstFilterOption(mateOption.firstFilterOption ?? firstFilterOption);
      setSecondType(secondType);
      if (firstType == "chart") {
        getFirstChartData(firstOption);
      }
    } else {
      message.error("Params Match Failed");
      closeModal();
    }
  };

  const getMateOption = () => {
    return modalOptions?.["modal" + modalDict.title]?.find(
      (item) => item?.name == modalDict?.sub
    );
  };

  const getFirstChartData = (firstOption) => {
    if (modalDict.title == "Left") {
      getLeftFirstChartData(firstOption);
    }
  };

  const getLeftFirstChartData = (firstOption) => {
    if (modalDict.sub == "Chart3") getCartesianPlane(firstOption);
  };

  const getCartesianPlane = (firstOption) => {
    firstOption.xAxis.data = mockChartData3.map((item) => item.org);
    const data = mockChartData3.map((item) => item.equipNumber);
    const rate = mockChartData3.map((item) => item.equipRate);
    firstOption.series = [
      { ...get3dBarSeries(releasedBarColor2), name: "Equip Number", data },
      { ...get3dBarSeriesCap("#89F7FE"), name: "Equip Number", data },
      { ...getLineSeries(), name: "Rate", data: rate, symbol: `circle` },
    ];
    nextTick(() => drawChart(firstOption, "DMC007Modal1", "first"));
  };

  const drawChart = (chartOption, id, index) => {
    const dom = document.getElementById(id);
    if (!dom) return;
    const chart = dom && echarts.init(dom);
    chart.clear();
    chart.off("click");
    chart.setOption(chartOption);
  };

  const compileContainerFirstBox = () => {
    return (
      <>
        {firstFilterShow ? compileFilterBox(firstFilterOption, "first") : null}
        {firstType == "chart" ? (
          <div className={css.chartBox} id="DMC007Modal1"></div>
        ) : (
          compileFirstTable()
        )}
      </>
    );
  };

  const compileFilterBox = () => {
    return <div>sss</div>;
  };

  const compileFirstTable = () => {
    return "compileFirstTable";
  };

  const compileContainerSecondBox = () => {
    return "compileContainerSecondBox";
  };
  return (
    <div className={css.containerBox}>
      {compileContainerFirstBox()}
      {compileContainerSecondBox()}
    </div>
  );
};

export default ModalContent;
