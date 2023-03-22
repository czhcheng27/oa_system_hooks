import React from "react";
import SwitchWrapper from "../../../../switchWrapper";
import css from "./index.module.less";

const FirstLunch = ({ firstLunchStch, setFirstLunchStch }) => {
  return (
    <SwitchWrapper
      label={"Version information (first release)"}
      interlock={true}
      from="a"
      switchVal={firstLunchStch}
      switchFunc={setFirstLunchStch}
      noNeedStaple={true}
    >
      This document is published for the first time。
    </SwitchWrapper>
  );
};

export default FirstLunch;
