import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";
import InputRegion from "./InputRegion";
import ApprovalFlow from "./ApprovalFlow";
import OutRegion from "./OutRegion";

const WorkFlow = (props) => {
  return (
    <div className={css.workFlow_wrapper}>
      <InputRegion />
      <div className={css.center}>
        <ApprovalFlow />
      </div>
      <OutRegion />
    </div>
  );
};

export default WorkFlow;
