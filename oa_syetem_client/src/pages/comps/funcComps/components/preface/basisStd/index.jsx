import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";
import { dataHasBeenUpdated } from "@/redux/actions";
import SwitchWrapper from "../../switchWrapper";
import { preface_basisStd_warnMsg as warnMsg } from "../../../warnMsg";
import css from "./index.module.less";

let mount = true;

// eslint-disable-next-line react/display-name
const BasisStd = forwardRef(({ basisStd }, ref) => {
  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const [stdNo, setStdNo] = useState("");
  const [stdName, setStdName] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useImperativeHandle(ref, () => ({
    getBasisStd: () => {
      const data = { stdNo, stdName, switchStatus: isSwitchOn, warnMsg };
      return data;
    },
  }));

  useEffect(() => {
    mount = false;
    if (basisStd) {
      const { stdNo, stdName, switchStatus } = basisStd;
      setStdNo(stdNo);
      setStdName(stdName);
      setIsSwitchOn(switchStatus);
      setTimeout(() => {
        mount = true;
      }, 800);
    }
  }, [basisStd]);

  const switchFunction = (data) => {
    setIsSwitchOn(data);
    dispatch(dataHasBeenUpdated(true));
    const res = { stdNo, stdName, switchStatus: data, warnMsg };
    outlineAllData[1].data.basisStd = res;
  };

  useEffect(() => {
    if (mount) {
      const data = { stdNo, stdName, switchStatus: isSwitchOn, warnMsg };
      outlineAllData[1].data.basisStd = data;
    }
  }, [stdNo, stdName]);

  return (
    <SwitchWrapper
      label="Basis Standard"
      switchVal={isSwitchOn}
      switchFunc={switchFunction}
    >
      <div className={css.first_row}>
        This document was drafted in accordance with
      </div>
      <div className={css.second_row}>
        <span>
          <Input
            value={stdNo}
            onChange={(e) => (
              setStdNo(e.target.value), dispatch(dataHasBeenUpdated(true))
            )}
            placeholder="Please enter the standard number"
          />
        </span>
        <span>
          <Input
            value={stdName}
            onChange={(e) => (
              setStdName(e.target.value), dispatch(dataHasBeenUpdated(true))
            )}
            placeholder="Please enter the standard name"
          />
        </span>
        <span>'s regulations</span>
      </div>
    </SwitchWrapper>
  );
});

export default BasisStd;
