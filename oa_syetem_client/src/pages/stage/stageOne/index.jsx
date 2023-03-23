import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import OutBox from "./components/outBox";
import { data } from "./const";
import css from "./index.module.less";

const StageDash = (props) => {
  return (
    <div>
      <div>Title</div>

      {/* content */}
      <div>
        <div>view filter wrapper</div>
        <div>page table</div>
        <div className={css.setChangeWrap}>
          <OutBox data={data} warnDay={5} />
        </div>
      </div>
    </div>
  );
};

export default StageDash;
