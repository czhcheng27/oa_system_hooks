import React, { useContext, useState } from "react";
import { Form, Segmented, Tag } from "antd";
import { useUpdateEffect } from "ahooks";
import { alignmentStyles, fontStyles } from "../const";
import { LayoutContext } from "../../../DrawerLayout";
import css from "./index.module.less";

const { CheckableTag } = Tag;
const { Item } = Form;

const StyleOpt = () => {
  const [form] = Form.useForm();

  const { setAttrOpt } = useContext(LayoutContext);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    // console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const handleChangeValues = () => {
    const data = form.getFieldsValue();
    const obj = { ...data, other: selectedTags };
    setAttrOpt(obj);
  };

  useUpdateEffect(() => {
    handleChangeValues();
  }, [selectedTags]);

  return (
    <div className={css.moduleBox}>
      <Form
        form={form}
        labelCol={{ style: { width: "95px" } }}
        autoComplete="off"
        onValuesChange={handleChangeValues}
      >
        <Item initialValue={"left"} label="Text Align" name="textAlign">
          <Segmented options={alignmentStyles} />
        </Item>
        <Item label="Other" name="other">
          {fontStyles.map(({ icon, name }) => (
            <CheckableTag
              key={name}
              checked={selectedTags.indexOf(name) > -1}
              onChange={(checked) => handleChange(name, checked)}
            >
              {icon}
            </CheckableTag>
          ))}
        </Item>
      </Form>
    </div>
  );
};

export default StyleOpt;
