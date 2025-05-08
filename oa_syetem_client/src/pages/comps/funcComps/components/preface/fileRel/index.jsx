import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import classNames from "classnames";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { dataHasBeenUpdated, updateOutlineAllData } from "@/redux/actions";
import { cloneDeep, createUidKey, checkIsPositiveIntegerEx0 } from "@/utils";
import {
  preface_fileRel_warnMsg as warnMsg,
  preface_fileRel_valueData_warnMsg as valueData_warnMsg,
} from "../../../warnMsg";
import CmTinymce from "../../../cmTinymce";
import PopCom from "../../popCom";
import SwitchWrapper from "../../switchWrapper";
import css from "./index.module.less";

const { Item } = Form;
let mount = true;

const initContent = [
  {
    partNo: "",
    contentTxt: "",
    id: "initContentId",
    warnMsg: valueData_warnMsg,
  },
];

// eslint-disable-next-line react/display-name
const FileRel = forwardRef(({ fileRel }, ref) => {
  const [infoForm] = Form.useForm();

  const dispatch = useDispatch();

  const outlineAllData = useSelector((s) => s.rdcTestOutlineAllData);

  const [valueData, setValueData] = useState(initContent);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  useImperativeHandle(ref, () => ({
    getFileRel: () => {
      const infoData = infoForm.getFieldsValue();
      const data = { infoData, valueData, switchStatus: isSwitchOn };
      return data;
    },
  }));

  const updateFunc = (swch, text, value) => {
    const topValue = infoForm.getFieldsValue();
    dispatch(dataHasBeenUpdated(true));
    const cbData = {
      switchStatus: swch ?? isSwitchOn,
      infoData: text ? { ...text, warnMsg } : { ...topValue, warnMsg },
      valueData: value ?? valueData,
    };
    const _temp = cloneDeep(outlineAllData[1]);
    const a = { ..._temp, data: { ..._temp.data, fileRel: cbData } };
    outlineAllData[1] = a;
    dispatch(updateOutlineAllData(outlineAllData));
  };

  const switchFunction = (data) => {
    setIsSwitchOn(data);
    updateFunc(data, null, null);
  };

  const valueChange = (value, obj, name) => {
    const newData = cloneDeep(valueData);
    newData.map((el) => {
      if (el.id === obj.id) el[name] = value;
      return el;
    });
    setValueData(newData);
    mount && updateFunc(null, null, newData);
  };

  const btnAction = (data, action) => {
    const curIndex = valueData.findIndex((el) => el.id === data.id);
    const newData = cloneDeep(valueData);
    if (action === "add") {
      newData.splice(curIndex + 1, 0, {
        ...initContent[0],
        id: createUidKey(),
      });
    } else if (action === "del") {
      newData.splice(curIndex, 1);
    }
    setValueData(newData);
    mount && updateFunc(null, null, newData);
  };

  const renderContent = () => {
    const disable = valueData.length === 1;
    return (
      !!valueData.length &&
      valueData.map((el, index) => {
        return (
          <div key={index} className={css.content_wrapper}>
            <div className={css.content}>
              <p>
                No.
                <Input
                  value={el.partNo}
                  onChange={(e) => (
                    valueChange(
                      checkIsPositiveIntegerEx0(e.target.value),
                      el,
                      "partNo"
                    ),
                    dispatch(dataHasBeenUpdated(true))
                  )}
                />
              </p>
              <CmTinymce
                inline={true}
                value={el.contentTxt}
                selectorName="fileRel_content"
                onChange={(data) => (
                  valueChange(data, el, "contentTxt"),
                  dispatch(dataHasBeenUpdated(true))
                )}
              />
              <div className={css.symbol}>
                {index + 1 === valueData.length ? "。" : ";"}
              </div>
              <div className={css.handle_btn}>
                <PlusCircleOutlined onClick={() => btnAction(el, "add")} />
                <PopCom
                  position={"left"}
                  title={"Delete?"}
                  disable={disable}
                  handleConfirm={() => !disable && btnAction(el, "del")}
                >
                  {
                    <MinusCircleOutlined
                      className={classNames({ [css.diable_hover]: disable })}
                    />
                  }
                </PopCom>
              </div>
            </div>
          </div>
        );
      })
    );
  };

  useEffect(() => {
    if (fileRel) {
      mount = false;
      infoForm.setFieldsValue(fileRel.infoData ?? "");
      setValueData(fileRel.valueData ?? initContent);
      setIsSwitchOn(fileRel.switchStatus);
      setTimeout(() => {
        mount = true;
      }, 500);
    }
  }, [fileRel]);

  const handleChange = () => {
    const topValue = infoForm.getFieldsValue();
    updateFunc(null, topValue, null);
  };

  return (
    <SwitchWrapper
      label="File Relations"
      switchVal={isSwitchOn}
      switchFunc={switchFunction}
    >
      <div className={css.top_wrapper}>
        <Form form={infoForm} labelCol={{ flex: "60px" }} autoComplete="off">
          <div>This file is</div>
          <div className={css.second_row}>
            <Item name="stdNo">
              <Input
                placeholder="Please enter the standard number"
                onChange={handleChange}
              />
            </Item>
            <Item name="stdName">
              <Input
                placeholder="Please enter the standard name"
                onChange={handleChange}
              />
            </Item>
          </div>
          <div className={css.third_row}>
            's No.
            <Item name="partNo">
              <Input onChange={handleChange} />
            </Item>{" "}
            part，
          </div>
          <div className={css.fourth_row}>
            <Item name="publishedNo">
              <Input
                placeholder="Please enter the standard number"
                onChange={handleChange}
              />
            </Item>
            <span>The following sections have been released：</span>
          </div>
        </Form>
      </div>

      <div className={css.bot_wrapper}>{renderContent()}</div>
    </SwitchWrapper>
  );
});

export default FileRel;
