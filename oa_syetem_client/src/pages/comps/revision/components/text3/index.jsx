import React from "react";
import { Form, Input, Row, Col } from "antd";
import Img from "../areaLeft/comps/icons/2.png";
import css from "./index.module.less";

const { Item } = Form;

const Text3 = (props) => {
  console.log("props", props);
  return (
    <div className={css.wrapper}>
      <div className={css.left}>
        <img src={Img} alt="label 3" />
        <p>Label 3</p>
      </div>
      <div className={css.right}>
        <Form>
          <Row>
            <Col span={8}>
              <Item label="Code" name="code">
                <Input />
              </Item>
            </Col>
            <Col span={16}>
              <Item label="Content" name="content">
                <Input />
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Text3;
