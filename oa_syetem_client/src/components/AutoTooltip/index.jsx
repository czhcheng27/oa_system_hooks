import React, { useState } from 'react';
import { Typography } from 'antd';
import css from './index.module.less';

const { Paragraph, Text } = Typography;

const AutoTooltip = ({ txt, children }) => {
  const [hasEllipsis, setHasEllipsis] = useState(false);
  return (
    <Text
      className={css.typography_wrapper}
      ellipsis={{
        onEllipsis: (ellipsis) => {
          // console.log('Ellipsis changed:', ellipsis);
          setHasEllipsis(ellipsis);
        },
        tooltip: hasEllipsis ? { txt } : false,
      }}
    >
      {txt}
    </Text>
  );
};

export default AutoTooltip;
