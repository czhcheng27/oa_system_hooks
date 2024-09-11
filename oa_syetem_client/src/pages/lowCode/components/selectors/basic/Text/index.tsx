import React, { useState, useRef, useEffect } from "react";
import { Input } from "antd";
import { useEditor, useNode } from "@craftjs/core";
import { TextSettings } from "./TextSettings";
import { TextProps } from "../type";

const defaultProps: TextProps = {
  text: "",
  fontSize: 12,
  textAlign: "left",
};

export const TextUserComponent = (props: Partial<TextProps>) => {
  const { text, fontSize, textAlign } = {
    ...defaultProps,
    ...props,
  };

  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((node) => ({
    selected: node.events.selected,
  }));

  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  const [editable, setEditable] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setEditable(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={(ref) => connect(drag(ref as any))}
      style={{ position: "relative" }}
    >
      <div ref={wrapperRef}>
        <Input.TextArea
          value={text}
          onChange={(e) => {
            if (enabled) {
              setProp(
                (props: { text: string }) => (props.text = e.target.value)
              );
            }
          }}
          onClick={() => {
            if (enabled) {
              setEditable(true);
            }
          }}
          style={{
            fontSize: `${fontSize}px`,
            textAlign: textAlign,
            border: editable ? "2px solid #1890ff" : "none",
            boxShadow: "none",
            padding: 0,
          }}
          readOnly={!editable}
          autoSize
        />
      </div>
    </div>
  );
};

TextUserComponent.craft = {
  props: defaultProps,
  related: {
    settings: TextSettings,
  },
};
