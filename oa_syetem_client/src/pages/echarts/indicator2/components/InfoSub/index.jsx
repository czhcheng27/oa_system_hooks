import React, { useEffect, useState } from 'react';
import UserIcon from '../../assets/userIcon.png';
import css from './index.module.less';

const InfoSub = ({ listData, index }) => {
  const { projectNo, projectName, days, managerName, nodeNmae } = listData;

  const renderTop = () => {
    return (
      <div className={css.top}>
        <div title={projectNo}>{projectNo}</div>
        <div title={projectName}>{projectName}</div>
        {days < 0 ? (
          <div className={css.overdue}>{`逾期${Math.abs(days)}天`}</div>
        ) : (
          <div className={css.normal}>
            距量产启动
            <span className={css.daycss}>{`${days}天`}</span>
          </div>
        )}
      </div>
    );
  };

  const renderBot = () => {
    return (
      <div className={css.bottom}>
        <img src={UserIcon} />
        <div>{`项目经理：${managerName}`}</div>
        <div>{`当前节点：${nodeNmae}`}</div>
      </div>
    );
  };

  return (
    <div className={css.left} id="left">
      {renderTop()}
      {renderBot()}
    </div>
  );
};

export default InfoSub;
