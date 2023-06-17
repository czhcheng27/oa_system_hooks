import React, { useState } from "react";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { mockMonth, mockYear, mockprojectList } from "./mock";
import css from "./index.module.less";

const BackEnd = (props) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const renderHeaderYear = () => {
    return (
      <div className={css.chartsYear}>
        {mockYear.map((item, index) => {
          return (
            <div className={css.yearCol} key={index}>
              {item} Year
            </div>
          );
        })}
      </div>
    );
  };

  const renderHeaderMonth = () => {
    return (
      <div className={css.chartsMonth}>
        {mockMonth.map((item, index) => {
          return (
            <div className={css.monthCol} key={index}>
              {item}M
            </div>
          );
        })}
      </div>
    );
  };

  const renderHeaderMoving = () => {
    return (
      <div className={css.yearMoveBox}>
        <Button
          shape="circle"
          icon={<LeftOutlined className={css.yearMoveButton} />}
          size="small"
          onClick={() => {
            moveMonth(-1);
          }}
        />
        <Button
          shape="circle"
          icon={<RightOutlined className={css.yearMoveButton} />}
          size="small"
          onClick={() => {
            moveMonth(1);
          }}
        />
      </div>
    );
  };

  //  切换类目
  const moveMonth = (type) => {
    const element = document.getElementById("chartsScroll");
    element.scrollTo(element.scrollLeft + type * 100, element.scrollTop);
  };

  //  设置滚动条目
  const setChartsScroll = () => {
    setTimeout(() => {
      const element = document.getElementById("chartsScroll");
      setScrollLeft(element.scrollLeft * -1);
      setScrollTop(element.scrollTop * -1);
    }, 10);
  };

  return (
    <div className={css.chartsBox}>
      {/* header */}
      <div className={css.chartsHeadBox}>
        <div className={css.chartsLeftHead}>Total: 111</div>
        <div
          className={css.chartsRightHead}
          style={{ left: scrollLeft + "px" }}
        >
          {renderHeaderYear()}
          {renderHeaderMonth()}
        </div>
        {renderHeaderMoving()}
      </div>

      {/* content */}
      <div className={css.chartsInfoBox}>
        <div className={css.chartsLeft} style={{ top: scrollTop + "px" }}>
          {mockprojectList.map((item, index) => {
            return (
              <div className={css.projectRow} key={index}>
                <div className={css.projectLabel}>{item.title}</div>
                <div className={css.projectInfo}>
                  <span>{item.info}</span>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={css.chartsRight}
          id="chartsScroll"
          onScroll={() => setChartsScroll()}
        >
          <div className={css.chartsMonthBox}>
            {mockprojectList.map((item, index) => {
              return (
                <div
                  className={css.chartsCol}
                  key={index}
                  id={"hoursCharts" + index}
                  style={{
                    width: mockMonth.length
                      ? mockMonth.length * 35 + "px"
                      : "2940px",
                  }}
                ></div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackEnd;
