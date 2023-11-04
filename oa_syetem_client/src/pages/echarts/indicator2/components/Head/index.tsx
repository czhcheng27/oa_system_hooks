import React from 'react';
import css from './index.module.less';
import { tool } from '@/hoc';

interface Props {}

@tool
class Head extends React.Component<Props> {
  state = {};

  componentDidUpdate(prevProps: Readonly<Props>, prevState, snapshot?: any): void {}

  componentDidMount() {
    // this.getDetail('');
  }

  render() {
    return <div className={css.headBox}></div>;
  }
}

export default Head;
