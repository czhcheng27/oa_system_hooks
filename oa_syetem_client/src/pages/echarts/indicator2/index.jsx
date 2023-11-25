/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from "react";
import { Segmented } from "antd";
import classNames from "classnames";
import LoadingTip from "@/components/LoadingTip";
import FullCycle from "./components/FullCycle";
import { projectTypes, viewTypes, pscNodeOpts, initCensusData } from "./const";
import { mockKcpFull, mockPscCurr, mockPscFull } from "./mock";
import AmplifyIcon from "./assets/amplify.png";
import css from "./index.module.less";
import CurView from "./components/CurView";

export const Dmc010Context = createContext();

export default function IndicatorTwo() {
  const [projectType, setProjectType] = useState("01");
  const [viewType, setViewType] = useState("01"); // 01-全周期查询 02-当前状态查询
  const [leftSelectNode, setLeftSelectNode] = useState("psc");
  const [actNode, setActNode] = useState(pscNodeOpts[0]);
  const [censusData, setCensusData] = useState(initCensusData);
  const [listData, setListData] = useState([]);
  const [pageTip, setPageTip] = useState({ show: false, status: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    console.log("1");
    getListData();
  }, [projectType, leftSelectNode]);

  const getListData = () => {
    setPageTip({ ...pageTip, status: 0, show: true });
    const res = leftSelectNode === "psc" ? mockPscCurr : mockKcpFull;
    // const res = leftSelectNode === "psc" ? mockPscFull : mockKcpFull;
    setListData(res);
    setTimeout(() => {
      setPageTip({ show: false });
    }, 200);
  };
  const renderNode = () => {
    return pscNodeOpts.map((node, index) => {
      const value = censusData[pscNodeOpts[index].code];
      return (
        <div
          key={index}
          className={classNames({
            [css.eachNode]: true,
            [css.actNode]: actNode.code === node.code,
          })}
          onClick={() => setActNode(node)}
        >
          <div>{node.label}</div>
          {renderNodeNums(node, value)}
        </div>
      );
    });
  };

  const renderNodeNums = (node, value) => {
    return node.code == "monthNodes" ? (
      <div className={css[node.code]}>
        <span onClick={(e) => currentMonthClick(e, "numerator", node)}>
          {value.isCurrentMonthFinish}
        </span>{" "}
        /{" "}
        <span onClick={(e) => currentMonthClick(e, "denominator", node)}>
          {value.isCurrentMonth}
        </span>
      </div>
    ) : (
      <div className={css[node.code]}>{value}</div>
    );
  };

  const currentMonthClick = (e, code, node) => {
    e.stopPropagation();
    setActNode({ ...node, split: code });
  };

  return (
    <Dmc010Context.Provider
      value={{
        listData,
        actNode,
        leftSelectNode,
      }}
    >
      <div className={css.dmc010}>
        <div
          style={{ height: isFullscreen ? "100%" : "auto" }}
          className={classNames({
            [css.bottomBox]: true,
            [css.fullscreen]: isFullscreen,
          })}
        >
          <div className={css.bot}>
            {/* first row */}
            <div className={css.firstRow}>
              <div className={css.firLeft}>
                <div>项目运行状态</div>
                <div className={css.segBox1}>
                  <Segmented
                    options={projectTypes}
                    value={projectType}
                    onChange={(value) => setProjectType(value)}
                  />
                </div>
              </div>
              <div className={css.firRight}>
                <div className={css.segBox2}>
                  <Segmented
                    options={viewTypes}
                    value={viewType}
                    onChange={(value) => setViewType(value)}
                  />
                </div>
                <img
                  src={AmplifyIcon}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  alt="AmplifyIcon"
                />
              </div>
            </div>

            {/* second row */}
            <div className={css.sndRow}>
              <div className={css.leftSelect}>
                <div
                  className={classNames({
                    [css.normalLeftSelect]: true,
                    [css.actLeftSelect]: leftSelectNode == "psc",
                  })}
                  onClick={() => setLeftSelectNode("psc")}
                >
                  PSC
                </div>
                <div
                  className={classNames({
                    [css.normalLeftSelect]: true,
                    [css.actLeftSelect]: leftSelectNode == "kcp",
                  })}
                  onClick={() => setLeftSelectNode("kcp")}
                >
                  KCP
                </div>
              </div>
              <div className={css.nodeBox}>{renderNode()}</div>
            </div>

            {/* bot flow */}
            <div
              id="containerBotBox"
              className={css.botBox}
              style={{ height: isFullscreen ? "calc(100% - 116px)" : "410px" }}
            >
              {pageTip.show && (
                <LoadingTip status={pageTip.status} text={pageTip.text} />
              )}
              {!pageTip.show && viewType === "01" ? <FullCycle /> : <CurView />}
            </div>
          </div>
        </div>
      </div>
    </Dmc010Context.Provider>
  );
}
