import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Button, Drawer, Space } from "antd";
import { createUidKey } from "../../../../../../../utils";
import DrawerHeader from "../../../../../../../components/DrawerHeader";
import Steps from "./components/Steps";
import SplitTask from "./components/SplitTask";
import CombineTeam from "./components/CombineTeam";
import SubmitTask from "./components/SubmitTask";
import { stepName } from "./const";
import css from "./index.module.less";

const DrawerThree = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    openHandle,
  }));

  const [visible, setVisible] = useState(false);
  const [curStep, setCurStep] = useState(0);
  const [taskData, setTaskData] = useState([]);

  const openHandle = () => {
    setVisible(true);
  };

  const closeHandle = () => {
    setVisible(false);
  };

  const stepClick = (idx) => {
    setCurStep(idx);
  };

  const addTask = () => {
    const res = taskData.map((el, index) => {
      el.isTyping = false;
      return el;
    });
    setTaskData([...res, { name: "", id: createUidKey(), isTyping: true }]);
  };

  const nameClick = (txt, id, code) => {
    const res = taskData.map((el) => {
      if (el.id == id) {
        el.name = txt;
        if (code !== "onBlur") {
          el.isTyping = false;
        }
      }
      return el;
    });
    setTaskData(res);
  };

  const handleCardClick = (id) => {
    const res = taskData.map((el, index) => {
      if (el.id == id) {
        el.isTyping = true;
      }
      return el;
    });
    setTaskData(res);
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
          {curStep == length - 1 ? "Submit" : "Next"}
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
        {curStep == 0 && (
          <SplitTask
            taskData={taskData}
            addTask={addTask}
            nameClick={nameClick}
            cardClickCb={handleCardClick}
          />
        )}
        {curStep == 1 && <CombineTeam />}
        {curStep == 2 && <SubmitTask />}
      </div>
    </Drawer>
  );
});

export default DrawerThree;
