import React, { ReactNode, useState } from "react";
import { Typography } from "antd";
import css from "./index.module.less";

const { Text } = Typography;
interface AutoTooltipProps {
  txt: string;
  maxWidth?: string;
  div?: ReactNode;
}

const AutoTooltip: React.FC<AutoTooltipProps> = ({
  txt,
  maxWidth = "100%",
  div,
}) => {
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
