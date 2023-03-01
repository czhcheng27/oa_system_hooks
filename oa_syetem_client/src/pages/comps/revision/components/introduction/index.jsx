import React, { forwardRef, useImperativeHandle } from "react";
import { Form, Input } from "antd";
import css from "./index.module.less";

const { Item } = Form;

// eslint-disable-next-line react/display-name
const Introduction = forwardRef((props, ref) => {
  const [introForm] = Form.useForm();

  useImperativeHandle(ref, () => ({
    introData: () => {
      return introForm.getFieldsValue();
    },
  }));

  return (
    <div>
      <Form form={introForm} labelCol={{ flex: "80px" }}>
        <Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Please Input Content" }]}
        >
          <Input placeholder="Please Input Content" />
        </Item>
      </Form>
    </div>
  );
});

export default Introduction;
