import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
// import { DcpTinymce } from "dcp-design-react";
import CompWrapper from "../compWrapper";
import CmTinymce from "../../cmTinymce";
import css from "./index.module.less";

const { Item } = Form;
let mount = true;

const TextArea = ({ props, comValueUpdate, onDelete, drag }) => {
  const [textareaForm] = Form.useForm();
  const { content, id } = props;

  const handleChange = () => {
    const newValue = textareaForm.getFieldsValue();
    mount && comValueUpdate(id, newValue);
  };

  useEffect(() => {
    if (props) {
      mount = false;
      textareaForm.setFieldsValue(content ? JSON.parse(content) : "");
      setTimeout(() => {
        mount = true;
      }, 500);
    }
  }, [props]);

  return (
    <CompWrapper prop={{ props, onDelete, drag }}>
      <div className={css.right}>
        <Form form={textareaForm}>
          <Item name="contentValue">
            <Input.TextArea
              rows={7}
              onChange={handleChange}
              placeholder="Please type in your content"
            />
          </Item>
        </Form>
      </div>
      {/* <Form form={textareaForm} className={css.txt_form}>
        <Item name="contentValue">
          <CmTinymce
            inline={true}
            selectorName="textArea_comp_rt"
            onChange={handleChange}
          />
        </Item>
      </Form> */}
    </CompWrapper>
  );
};

export default TextArea;
