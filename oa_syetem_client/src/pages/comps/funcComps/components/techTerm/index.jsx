import React, { useEffect } from "react";
import { Form, Input, Row, Col } from "antd";
import CompWrapper from "../compWrapper";
import css from "./index.module.less";

const { Item } = Form;
let mount = true;

const TechTerm = ({ props, comValueUpdate, onDelete, drag }) => {
  const { content, id } = props;
  const [termForm] = Form.useForm();

  const handleChange = () => {
    const termInfo = termForm.getFieldsValue();
    mount && comValueUpdate(id, termInfo);
  };

  useEffect(() => {
    if (props) {
      mount = false;
      termForm.setFieldsValue(content ? JSON.parse(content) : "");
      setTimeout(() => {
        mount = true;
      }, 500);
    }
  }, [props]);

  return (
    <CompWrapper prop={{ props, onDelete, drag }}>
      <div className={css.term_wrapper}>
        <div className={css.top}>
          <Form form={termForm} className={css.form_wrapper} autoComplete="off">
            {/* <Form form={termForm} layout="inline" className={css.form_wrapper}> */}
            {/* <Item name="termName" label="术语">
              <Input onChange={handleChange} placeholder="填写术语" />
            </Item>
            <Item name="engWord" label="英文对应词">
              <Input onChange={handleChange} placeholder="填写英文对应词" />
            </Item>
            <Item name="deftn" label="定义">
              <Input onChange={handleChange} placeholder="填写定义" />
            </Item> */}
            <Row style={{ marginLeft: "90px" }}>
              <Col span={10}>
                <Item name="termName" label="术语">
                  <Input onChange={handleChange} placeholder="填写术语" />
                </Item>
              </Col>
              <Col style={{ paddingLeft: "16px" }} span={14}>
                <Item name="engWord" label="英文对应词">
                  <Input onChange={handleChange} placeholder="填写英文对应词" />
                </Item>
              </Col>
            </Row>
            <Row style={{ marginTop: "16px" }}>
              <Col span={24}>
                <Item name="deftn" label="定义" className={css.second_row}>
                  <Input onChange={handleChange} placeholder="填写定义" />
                </Item>
              </Col>
            </Row>
          </Form>
        </div>

        {/* <div className={css.bot}>
          <div>定义</div>
          <Input value={definition} onChange={(e) => defChange(e.target.value)} />
        </div> */}
      </div>
    </CompWrapper>
  );
};

export default TechTerm;
