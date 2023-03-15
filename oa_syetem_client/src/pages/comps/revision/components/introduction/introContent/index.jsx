import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Form, Input } from "antd";
// import { QmTinymce } from "@jiaozhiye/qm-design-react";
import { Editor } from "@tinymce/tinymce-react";
import SwitchWrapper from "../../../switchWrapper";
import { toolkitInit } from "../../../const";
import css from "./index.module.less";
import CmTinymce from "../../../cmTinymce";

const { Item } = Form;

// eslint-disable-next-line react/display-name
const IntroContent = forwardRef(({ contentData }, ref) => {
  const { switchStatus, value } = contentData || {};
  const [contentForm] = Form.useForm();

  const [contentSwitch, setContentSwitch] = useState(true);

  useImperativeHandle(ref, () => ({
    getContentData: () => {
      const contentValue = contentForm.getFieldsValue();
      console.log("contentValue", contentValue);
      const data = { switchStatus: contentSwitch, value: contentValue };
      return data;
    },
  }));

  useEffect(() => {
    if (contentData) {
      setContentSwitch(switchStatus);
      contentForm.setFieldsValue(value ?? "");
    }
  }, [contentData]);

  const onVarCompsChange = (val, obj, opts) => {
    console.log("val, obj", val, obj);
    // contentForm.setFieldsValue({ [obj.name]: val });
    // contentForm.setFieldValue(`${obj.name}`, val);
  };

  return (
    <SwitchWrapper
      label="Content"
      switchVal={contentSwitch}
      switchFunc={setContentSwitch}
    >
      <Form form={contentForm} labelCol={{ flex: "60px" }} autoComplete="off">
        <Item name="content">
          <CmTinymce
          // data={{ name: "checkContent", label: "点检描述", required: true }}
          // onChange={onVarCompsChange}
          />
        </Item>
      </Form>
    </SwitchWrapper>
  );
});

export default IntroContent;
