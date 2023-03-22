import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Input } from "antd";
import SwitchWrapper from "../../../switchWrapper";
import css from "./index.module.less";

// eslint-disable-next-line react/display-name
const BasisStd = forwardRef(({ basisStd }, ref) => {
  const [stdNo, setStdNo] = useState("");
  const [stdName, setStdName] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useImperativeHandle(ref, () => ({
    getBasisStd: () => {
      const data = { stdNo, stdName, switchStatus: isSwitchOn };
      return data;
    },
  }));

  useEffect(() => {
    if (basisStd) {
      const { stdNo, stdName, switchStatus } = basisStd;
      setStdNo(stdNo);
      setStdName(stdName);
      setIsSwitchOn(switchStatus);
    }
  }, [basisStd]);

  return (
    <SwitchWrapper
      label="Basis Standard"
      switchVal={isSwitchOn}
      switchFunc={setIsSwitchOn}
    >
      <div className={css.first_row}>
        This document was drafted in accordance with{" "}
      </div>
      <div className={css.second_row}>
        <span>
          <Input
            value={stdNo}
            onChange={(e) => setStdNo(e.target.value)}
            placeholder="Please enter the standard number"
          />
        </span>
        <span>
          <Input
            value={stdName}
            onChange={(e) => setStdName(e.target.value)}
            placeholder="Please enter the standard name"
          />
        </span>
        <span>'s regulations</span>
      </div>
    </SwitchWrapper>
  );
});

export default BasisStd;
