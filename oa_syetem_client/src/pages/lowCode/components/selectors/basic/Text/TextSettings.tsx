import React from "react";
import { Form, Slider, Typography } from "antd";
import { useNode } from "@craftjs/core";

export const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }));

  return (
    <Form layout="vertical">
      <Form.Item label={<Typography.Text strong>Font size</Typography.Text>}>
        <Slider
          value={fontSize || 7}
          step={1}
          min={1}
          max={50}
          onChange={(value) => {
            setProp((props: { fontSize: number }) => (props.fontSize = value));
          }}
        />
      </Form.Item>
    </Form>
  );
};
