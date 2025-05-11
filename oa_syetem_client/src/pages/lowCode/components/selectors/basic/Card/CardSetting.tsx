import React from "react";
import { Form, Typography, Input, Checkbox, Select } from "antd";
import { useNode } from "@craftjs/core";
import { priorityOpts } from "./const";

const { TextArea } = Input;
const { Text } = Typography;
const { Item } = Form;

export const CardSettings = () => {
  const {
    actions: { setProp },
    title,
    description,
    priority,
    checked,
    owner,
  } = useNode((node) => ({
    title: node.data.props.title,
    description: node.data.props.description,
    priority: node.data.props.priority,
    checked: node.data.props.checked,
    owner: node.data.props.owner,
  }));

  const changeFunc = (name: string, value: boolean | string) => {
    setProp((props) => (props[name] = value));
  };

  return (
    <Form layout="vertical">
      <Item label={<Text strong>Task Name</Text>}>
        <Input
          value={title}
          onChange={(e) => changeFunc("title", e.target.value)}
        />
      </Item>

      <Item label={<Text strong>Description</Text>}>
        <TextArea
          value={description}
          onChange={(e) => changeFunc("description", e.target.value)}
        />
      </Item>

      <Item label={<Text strong>Priority</Text>}>
        <Select
          value={priority}
          options={priorityOpts}
          onChange={(value) => changeFunc("priority", value)}
        />
      </Item>

      <Item label={<Text strong>Complete</Text>}>
        <Checkbox
          checked={checked}
          onChange={(e) => changeFunc("checked", e.target.checked)}
        >
          <span>{checked ? "Completed" : "Pending"}</span>
        </Checkbox>
      </Item>

      <Item label={<Text strong>Author</Text>}>
        <Input
          value={owner}
          onChange={(e) => changeFunc("owner", e.target.value)}
        />
      </Item>
    </Form>
  );
};
