import React, { useContext, useState } from "react";
import { Form, Input, InputNumber } from "antd";
import { LayoutContext } from "../../../DrawerLayout";
import css from "./index.module.less";

const { Item } = Form;

const AttrOpt = () => {
  const { setAttrOpt } = useContext(LayoutContext);
  const [form] = Form.useForm();
  const handleChange = (value, allVal) => {
    setAttrOpt(allVal);
  };
  return (
    <div className={css.moduleBox}>
      <Form
        form={form}
        autoComplete="off"
        labelCol={{ style: { width: "95px" } }}
        onValuesChange={handleChange}
      >
        <Item label="Label Content" name="content">
          <Input placeholder="please type..." />
        </Item>
        <Item label="Width" name="width">
          <InputNumber addonAfter="px" placeholder="please type..." />
        </Item>
        <Item label="Height" name="height">
          <InputNumber addonAfter="px" placeholder="please type..." />
        </Item>
      </Form>
    </div>
  );
};

export default AttrOpt;
