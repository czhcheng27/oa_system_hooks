import React, { useEffect } from "react";
import { Form, Input } from "antd";
import CompWrapper from "../compWrapper";
import css from "./index.module.less";

const { Item } = Form;

const TextArea = ({ props, onDelete, comValueUpdate }) => {
  const [textareaForm] = Form.useForm();
  const { content, id } = props;

  const handleChange = () => {
    const newValue = textareaForm.getFieldsValue();
    comValueUpdate(id, newValue);
  };

  useEffect(() => {
    props && textareaForm.setFieldsValue(content ? JSON.parse(content) : "");
  }, [props]);
  return (
    <CompWrapper prop={{ props, onDelete }}>
      <div className={css.right}>
        <Form form={textareaForm}>
          <Item name="contentValue">
            <Input.TextArea
              rows={7}
              onChange={handleChange}
              placeholder="请输入内容"
            />
          </Item>
        </Form>
      </div>
    </CompWrapper>
  );
};

export default TextArea;
