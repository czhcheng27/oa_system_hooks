import React, { useEffect, useRef, cloneElement, useState } from 'react';
import { Popover } from 'antd';
import style from './index.module.less';

export default function Ellipsis({ children, content }) {
  const ref = useRef(null);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    let el = ref.current,
      range = document.createRange();
    range.setStart(el, 0);
    range.setEnd(el, el.childNodes.length);
    if (range.getBoundingClientRect()['width'] > el.getBoundingClientRect()['width']) {
      setIsShow(true);
    }
  }, []);
  return isShow ? (
    <Popover title="" content={content} overlayClassName={style.ellipsisPopover}>
      {cloneElement(children, {
        ref: ref,
      })}
    </Popover>
  ) : (
    cloneElement(children, {
      ref: ref,
    })
  );
}
