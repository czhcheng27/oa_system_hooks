import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import css from "./index.module.less";

const CreateActionPlan = (props) => {
  const renderBot = () => {};
  return (
    <div className={css.c_plan_wrap}>
      <div>top</div>
      {renderBot()}
    </div>
  );
};

export default CreateActionPlan;
