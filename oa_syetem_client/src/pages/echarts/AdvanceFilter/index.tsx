import React, { useRef } from "react";
import { Button } from "antd";
import { McDrawer } from "src/components/McDrawer";

const AdvanceFilter = (props) => {
  const drawerRef = useRef<any>();

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

      <McDrawer
        ref={drawerRef}
        callback={(type, res) => console.log(`callback`, type, res)}
      />
    </div>
  );
};

export default AdvanceFilter;
