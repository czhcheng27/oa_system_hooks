import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Button, Drawer, Space } from "antd";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import css from "./index.module.less";
import Steps from "./components/Steps";
import { stepName } from "./const";
import SplitTask from "./components/SplitTask";
import CombineTeam from "./components/CombineTeam";
import SubmitTask from "./components/SubmitTask";

const DrawerThree = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  const [visible, setVisible] = useState(false);
  const [curStep, setCurStep] = useState(0);

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  const stepClick = (idx) => {
    setCurStep(idx);
  };

  const renderPreNextBtn = () => {
    const length = stepName.length;
    return (
      <Space>
        {curStep ? (
          <Button onClick={() => setCurStep(curStep - 1)}>Prev</Button>
        ) : null}
        <Button
          onClick={() => curStep != length - 1 && setCurStep(curStep + 1)}
          type="primary"
        >
          {curStep == length - 1 ? "Submit" : "next"}
        </Button>
      </Space>
    );
  };

  return (
    <Drawer
      className={css.drawer}
      width="100%"
      open={visible}
      onClose={closeHandle}
    >
      <div className={css.details}>
        <DrawerHeader
          background="white"
          pageName={`Create Action Plan`}
          backPrev={() => closeHandle()}
        >
          {renderPreNextBtn()}
        </DrawerHeader>

        <Steps current={curStep} onClick={(idx) => stepClick(idx)} />
        {curStep == 0 && <SplitTask />}
        {curStep == 1 && <CombineTeam />}
        {curStep == 2 && <SubmitTask />}
      </div>
    </Drawer>
  );
});

export default DrawerThree;
