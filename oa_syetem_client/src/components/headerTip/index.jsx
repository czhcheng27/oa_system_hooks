import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import css from './index.module.less';

const HeaderTip = ({ children }) => {
  return <div className={css.infoSplit}>{children}</div>;
};

export default HeaderTip;
