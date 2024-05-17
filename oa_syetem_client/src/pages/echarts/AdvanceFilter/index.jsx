import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { Button } from "antd";
import css from "./index.module.less";
import { McDrawer } from "../../../components/McDrawer";

const AdvanceFilter = (props) => {
  const drawerRef = useRef();
  return (
    <div>
      <Button
        onClick={() =>
          drawerRef.current.openHandle({
            type: "advanceFilter",
            title: "Advance Filter",
            width: 776,
            confirmBtnTxt: "Filter",
            closeBtnTxt: "Clear",
          })
        }
      >
        Advance Filter
      </Button>

      <McDrawer ref={drawerRef} />
    </div>
  );
};

export default AdvanceFilter;
