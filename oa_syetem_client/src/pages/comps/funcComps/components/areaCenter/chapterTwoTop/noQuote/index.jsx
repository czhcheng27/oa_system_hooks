import React from "react";
import SwitchWrapper from "@/pages/comps/revision/switchWrapper";
import css from "./index.module.less";

const NoQuote = ({ noQuoteStch, setNoQuoteStch }) => {
  return (
    <div>
      <SwitchWrapper
        label={"引用文件(无引用)"}
        interlock={true}
        from="a"
        switchVal={noQuoteStch}
        switchFunc={setNoQuoteStch}
      >
        本文件没有规范性引用文件。
      </SwitchWrapper>
    </div>
  );
};

export default NoQuote;
