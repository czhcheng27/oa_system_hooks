import React, { useState } from "react";
import { Form, Input, Row, Col } from "antd";
import { colorCompMap } from "../../mapConst";
import DelPop from "../../delPop";
import css from "./index.module.less";

const { Item } = Form;

const Text2 = ({ props, onDelete }) => {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  return (
    <div
      className={css.wrapper}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => !btnClicked && setHoverStatus(false)}
    >
      <div className={css.left}>
        <img
          src={require(`../areaLeft/comps/icons/${props.comType}.png`).default}
          alt={props.desc}
        />
        <p style={colorCompMap[props.comType].midTxt}>{props.desc}</p>
      </div>
      <div className={css.right}>
        <Form>
          <Row gutter={16}>
            <Col span={10}>
              <Item label="Code" name="code">
                <Input />
              </Item>
            </Col>
            <Col span={13}>
              <Item label="Content" name="content">
                <Input />
              </Item>
            </Col>
          </Row>
        </Form>
      </div>
      <DelPop
        onDelete={onDelete}
        setBtnClicked={setBtnClicked}
        hoverStatus={hoverStatus}
        setHoverStatus={setHoverStatus}
      />
    </div>
  );
};

export default Text2;
