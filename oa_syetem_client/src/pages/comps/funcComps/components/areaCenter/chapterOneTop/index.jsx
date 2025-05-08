import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
// import { DcpTinymce } from 'dcp-design-react';
import { dataHasBeenUpdated } from "@/redux/actions";
// import SwitchWrapper from "../../../../switchWrapper";
// import { toolkitInit } from "../../../const";
import css from "./index.module.less";

const { Item } = Form;
let mount = true;

const ChapterOneTop = ({ activeOutline, comValueUpdate }) => {
  // const {
  //   id,
  //   data: { state, scope },
  // } = activeOutline;
  // const [stateForm] = Form.useForm();
  // const [scopeForm] = Form.useForm();

  // const dispatch = useDispatch();

  // const isdragging = useSelector((s) => s.rdcDragStart);

  // const [stateData, setStateData] = useState("");
  // const [scopeData, setScopeData] = useState("");
  // const [combineData, setCombineData] = useState();

  // const [stateSwitch, setStateSwitch] = useState(true);
  // const [scopeSwitch, setScopeSwitch] = useState(true);

  // useEffect(() => {
  //   mount = false;
  //   stateForm.setFieldValue("state", state.value);
  //   scopeForm.setFieldValue("scope", scope.value);
  //   setStateData(state.value);
  //   setScopeData(scope.value);
  //   setStateSwitch(state.switchStatus);
  //   setScopeSwitch(scope.switchStatus);
  //   setCombineData(activeOutline.data);
  //   setTimeout(() => {
  //     mount = true;
  //   }, 1000);
  // }, [activeOutline]);

  // const dcpTxtChange = (data, name) => {
  //   name === "state" ? setStateData(data) : setScopeData(data);
  //   const returnData = {
  //     state: {
  //       switchStatus: stateSwitch,
  //       value: name === "state" ? data : stateData,
  //     },
  //     scope: {
  //       switchStatus: scopeSwitch,
  //       value: name === "scope" ? data : scopeData,
  //     },
  //   };
  //   setCombineData(returnData);
  //   mount &&
  //     (comValueUpdate(null, null, null, id, returnData),
  //     dispatch(dataHasBeenUpdated(true)));
  // };

  // const switchFunc = (data, name) => {
  //   name === "state" ? setStateSwitch(data) : setScopeSwitch(data);
  //   const formatData = {
  //     ...combineData,
  //     [name]: { ...combineData[name], switchStatus: data },
  //   };
  //   setCombineData(formatData);
  //   mount &&
  //     (comValueUpdate(null, null, null, id, formatData),
  //     dispatch(dataHasBeenUpdated(true)));
  // };

  return (
    <div>
      {/* <SwitchWrapper
        label={'范围陈述'}
        switchVal={stateSwitch}
        switchFunc={(data) => switchFunc(data, 'state')}
      >
        <div className={css.childrenBox}>
          <div className={css.leftLabel}>本文件</div>
          <Form form={stateForm} labelCol={{ flex: '60px' }} autoComplete="off">
            <Item name="state">
              <DcpTinymce
                className={css.content_state_tinymce}
                tinymce={{
                  ...toolkitInit,
                  selector: 'content_state_tinymce',
                  placeholder: '',
                }}
                onChange={(data) => dcpTxtChange(data, 'state')}
              />
            </Item>
          </Form>
        </div>
        {isdragging && <div className={css.overlay} />}
      </SwitchWrapper>

      <SwitchWrapper
        label={'适用界限'}
        switchVal={scopeSwitch}
        switchFunc={(data) => switchFunc(data, 'scope')}
      >
        <div className={css.childrenBox}>
          <div className={css.leftLabel}>本文件</div>
          <Form form={scopeForm} labelCol={{ flex: '60px' }} autoComplete="off">
            <Item name="scope">
              <DcpTinymce
                className={css.content_scope_tinymce}
                tinymce={{
                  ...toolkitInit,
                  selector: 'content_scope_tinymce',
                  placeholder: '',
                }}
                onChange={(data) => dcpTxtChange(data, 'scope')}
              />
            </Item>
          </Form>
        </div>
        {isdragging && <div className={css.overlay} />}
      </SwitchWrapper> */}
    </div>
  );
};

export default ChapterOneTop;
