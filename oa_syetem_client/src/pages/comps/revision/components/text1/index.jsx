import React from "react";
import { Input } from "antd";
import CompWrapper from "../compWrapper";
import { colorCompMap } from "../../mapConst";
import css from "./index.module.less";

const Text1 = ({ props, onDelete, comValueUpdate }) => {
  const { content, id, code } = props;

  return (
    <CompWrapper prop={{ props, onDelete }}>
      <div className={css.right}>
        <p style={colorCompMap[props.comType].midTxt}>{code}</p>
        <Input
          defaultValue={content ? JSON.parse(content) : ""}
          placeholder="Please type in your content"
          onChange={(e) => comValueUpdate(id, e.target.value)}
        />
      </div>
    </CompWrapper>
  );
};

export default Text1;
