import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import ActionPlan from "./components/ActionPlan";
import ApprovalView from "./components/ApprovalView";
import { approvalData } from "./mock";
import SVG6 from "../assets/svg6";
import css from "./index.module.less";

const ApprovalFlow = (props) => {
  const [dis, setDis] = useState(0);
  const [isApprovalFlow, setIsApprovalFlow] = useState(true);
  const renderTop = () => {
    return (
      <div className={css.top}>
        <div className={css.top_left}>
          <SVG6 />
          <span className={css.titleFont}>Approval Flow</span>
        </div>
        {/* <div className={css.top_right}>top_right</div> */}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={css.center} style={{ transform: `translate(${dis}, 0)` }}>
        <div className={css.view}>
          <ApprovalView data={approvalData} />
        </div>
        <div className={css.plan}>
          <ActionPlan />
        </div>
      </div>
    );
  };

  const renderBot = () => {
    return (
      <div className={css.bot}>
        <div
          className={css.bot_line}
          style={{ padding: isApprovalFlow ? "13px 4px" : "13px 10px" }}
          onClick={() => (setIsApprovalFlow(!isApprovalFlow), setDis(0))}
        >
          <div
            className={css.innerline}
            style={{ background: isApprovalFlow ? "#0053d9" : "#d7dbdf" }}
          />
        </div>
        <div
          className={css.bot_line}
          style={{ padding: isApprovalFlow ? "13px 10px" : "13px 4px" }}
          onClick={() => (setIsApprovalFlow(!isApprovalFlow), setDis("-50%"))}
        >
          <div
            className={css.innerline}
            style={{ background: !isApprovalFlow ? "#0053d9" : "#d7dbdf" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={css.ApprovalFlow_wrapper}>
      <div className={css.ApprovalFlow}>
        {renderTop()}
        {renderContent()}
        {renderBot()}
      </div>
    </div>
  );
};

export default ApprovalFlow;
