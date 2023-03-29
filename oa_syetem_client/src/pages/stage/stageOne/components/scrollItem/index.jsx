import React, { useState } from "react";
import { Popover } from "antd";
import StageFlow from "../../../../../components/StageFlow";
import css from "./index.module.less";

const ScrollItem = ({ data, warnDay }) => {
  const [dis, setDis] = useState("-50%");
  const [nextPopoverVisible, setNextPopoverVisible] = useState(false);
  const [prevPopoverVisible, setPrevPopoverVisible] = useState(false);

  return (
    <div className={css.scrollItem}>
      <div className={css.area} style={{ transform: `translate(${dis}, 0)` }}>
        <div className={css.applyFor}>
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
            // isHover={isHover}
          ></StageFlow>
        </div>
        <div className={css.implement}>
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
            setChangeStatus={data["status"] == 3 ? true : false}
            setChangeType={data.isUrgent}
            warnNum={warnDay}
            //   isHover={isHover}
          ></StageFlow>
        </div>
      </div>
    </div>
  );
};

export default ScrollItem;
