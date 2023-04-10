import React, { useState } from "react";
import { Popover } from "antd";
import StageFlow from "../../../../../components/StageFlow";
import css from "./index.module.less";

const ScrollItem = ({ data, warnDay }) => {
  const [dis, setDis] = useState("-50%");
  const [nextPopoverVisible, setNextPopoverVisible] = useState(false);
  const [prevPopoverVisible, setPrevPopoverVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const handlMouseEnter = () => {
    setIsHover(true);
  };

  const handlMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      className={css.scrollItem}
      onMouseEnter={handlMouseEnter}
      onMouseLeave={handlMouseLeave}
    >
      <div className={css.area} style={{ transform: `translate(${dis}, 0)` }}>
        {/* 前50% */}
        <div className={css.applyFor}>
          <div className={css.flowWrap}>
            <Popover
              placement="topRight"
              overlayClassName={css.popover}
              title=""
              content="展示实施阶段节点"
              open={nextPopoverVisible}
              onOpenChange={(visible) => {
                setNextPopoverVisible(visible);
              }}
            >
              <span
                className={css.nextBtn}
                onClick={() => {
                  setNextPopoverVisible(false);
                  setDis("-50%");
                }}
              ></span>
            </Popover>
            <StageFlow
              data={data.ciBusinessUnitDTOList}
              formalApprovalDate={data.formalApprovalDate}
              setChangeStatus={data["approvalProgress"] == 3 ? true : false}
              setChangeType={data.isUrgent}
              warnNum={warnDay}
              isHover={isHover}
            ></StageFlow>
          </div>
        </div>
        {/* 后50% */}
        <div className={css.implement}>
          <div className={css.flowWrap}>
            <Popover
              placement="top"
              overlayClassName={css.popover}
              title=""
              content="展示申请阶段节点"
              open={prevPopoverVisible}
              onOpenChange={(visible) => {
                setPrevPopoverVisible(visible);
              }}
            >
              <span
                className={css.prevBtn}
                onClick={() => {
                  setPrevPopoverVisible(false);
                  setDis(0);
                }}
              ></span>
            </Popover>
            <StageFlow
              data={data.ciBusinessUnitDTOList}
              formalApprovalDate={data.formalApprovalDate}
              setChangeStatus={data["status"] == 3 ? true : false} // status == 3 代表阶段全部完成
              setChangeType={data.isUrgent}
              warnNum={warnDay}
              isHover={isHover}
            ></StageFlow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollItem;
