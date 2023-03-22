import React from "react";
import SwitchWrapper from "../../../switchWrapper";
import css from "./index.module.less";

const InfoPanel = (props) => {
  return (
    <SwitchWrapper
      label="Propose/focal/draft information"
      noNeedStaple={true}
      disableSwitch={true}
    >
      <div className={css.infoPabel_wrapper}>
        <div>
          This document is proposed and managed by XXX Innovation Technology
          Research Institute。
        </div>
        <div>Drafting unit of this document:</div>
        <div>The main drafter of this document:</div>
      </div>
    </SwitchWrapper>
  );
};

export default InfoPanel;
