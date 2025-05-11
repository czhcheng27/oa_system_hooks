import React from "react";
import { FontSizeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEditor } from "@craftjs/core";
import { Button as AntButton } from "antd";
import {
  ButtonUserComponent,
  TextUserComponent,
  CardUserComponent,
} from "../selectors/basic";

const Sidebar = () => {
  const { connectors } = useEditor();

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        marginTop: 0,
        padding: 16,
        width: "100%",
      }}
    >
      <div>Example：</div>
      <AntButton
        ref={(ref) =>
          connectors.create(ref as any, <TextUserComponent text="Hi world" />)
        }
      >
        <FontSizeOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        <span>Text</span>
      </AntButton>
      <AntButton
        ref={(ref) =>
          connectors.create(ref as any, <ButtonUserComponent text="Click me" />)
        }
      >
        <PlusCircleOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        <span>Button</span>
      </AntButton>
      <AntButton
        ref={(ref) => connectors.create(ref as any, <CardUserComponent />)}
      >
        <PlusCircleOutlined style={{ fontSize: "20px", color: "#1890ff" }} />
        <span>Card</span>
      </AntButton>
      to be continued...
    </div>
  );
};

export default Sidebar;
