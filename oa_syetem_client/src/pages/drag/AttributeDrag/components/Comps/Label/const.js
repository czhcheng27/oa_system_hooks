import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  MenuOutlined,
} from "@ant-design/icons";

// 对齐方式
export const alignmentStyles = [
  { value: "left", icon: <AlignLeftOutlined /> },
  { value: "center", icon: <AlignCenterOutlined /> },
  { value: "right", icon: <AlignRightOutlined /> },
  { value: "justify", icon: <MenuOutlined /> },
];

export const fontStyles = [
  { name: "Bold", icon: <BoldOutlined /> },
  { name: "Italic", icon: <ItalicOutlined /> },
  { name: "underline", icon: <UnderlineOutlined /> },
  { name: "line-through", icon: <StrikethroughOutlined /> },
];

export const defaultOtherStyles = {
  fontWeight: "normal",
  fontStyle: "normal",
  textDecoration: "auto",
};
export const valueStyleMap = {
  Bold: "fontWeight",
  Italic: "fontStyle",
  underline: "textDecoration",
  "line-through": "textDecoration",
};
