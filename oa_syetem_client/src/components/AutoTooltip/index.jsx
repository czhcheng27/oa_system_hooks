import React, { useState } from "react";
import { Typography } from "antd";
import css from "./index.module.less";

const { Paragraph, Text } = Typography;

const AutoTooltip = ({ txt, children, maxWidth = "100%", div }) => {
  console.log("div", div);
  const tooltipObj = {
    title: txt + "1",
    // overlayClassName: css.tooltip_obj,
    overlayStyle: { maxWidth },
    getPopupContainer: (triggerNode) => div ?? triggerNode.parentNode,
  };
  const [hasEllipsis, setHasEllipsis] = useState(false);
  return (
    <Text
      className={css.typography_wrapper}
      ellipsis={{
        onEllipsis: (ellipsis) => {
          // console.log('Ellipsis changed:', ellipsis);
          setHasEllipsis(ellipsis);
        },
        tooltip: hasEllipsis ? tooltipObj : false,
      }}
    >
      {txt}
    </Text>
  );
};

export default AutoTooltip;
