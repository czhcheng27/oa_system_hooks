import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import css from './index.module.less';

const styleObj = Object.assign({
  display: 'inline-block',
  color: '#6893DA',
});

const DelChapter = ({ delChapter, setHoverIndex, clickDelBtnFn, setBtnClicked }) => {
  const visivleChange = (visible) => {
    !visible && setBtnClicked(false);
  };

  return (
    <Popconfirm
      overlayClassName="pop_confirm"
      placement="right"
      title="确定删除此组件?"
      okText="是"
      cancelText="否"
      autoAdjustOverflow={false}
      onVisibleChange={visivleChange}
      onConfirm={(e) => (delChapter(), setBtnClicked(false), e.stopPropagation())}
      onCancel={(e) => (setBtnClicked(false), setHoverIndex([]), e.stopPropagation())}
    >
      <CloseCircleOutlined
        className={css.del_btn}
        style={styleObj}
        onClick={(e) => (clickDelBtnFn(), setBtnClicked(true), e.stopPropagation())}
      />
    </Popconfirm>
  );
};

export default DelChapter;
