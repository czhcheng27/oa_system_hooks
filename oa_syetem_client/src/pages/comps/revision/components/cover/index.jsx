import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import { isDate } from "../../../../../utils";
import css from "./index.module.less";

const { Item } = Form;

// eslint-disable-next-line react/display-name
const Cover = forwardRef((props, ref) => {
  const [coverForm] = Form.useForm();

  const validateDate = (_, value) => {
    const verifyResult = isDate(value);
    if (!verifyResult) {
      return Promise.reject("Please Input Correct ");
    } else {
      coverForm.setFieldValue(_.field, verifyResult);
      return Promise.resolve();
    }
  };

  useImperativeHandle(ref, () => ({
    coverData: () => {
      return coverForm.validateFields();
    },
  }));

  return (
    <div>
      <Form labelCol={{ flex: "120px" }} form={coverForm}>
        <Item
          label="Standard Name"
          name="standardName"
          rules={[{ required: true, message: "Please Input Standard Name" }]}
        >
          <Input placeholder="Please Input Standard Name" />
        </Item>
        <Item
          label="Publish Date"
          name="publishDate"
          validateTrigger={["onBlur"]}
          rules={[
            { validator: validateDate },
            { required: true, message: "Please Input Publish Date" },
          ]}
        >
          <Input placeholder="Please Input Publish Date" />
        </Item>
      </Form>
    </div>
  );
});

export default Cover;
