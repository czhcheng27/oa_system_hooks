import React from 'react';
import css from './index.module.less';
import { Segmented, Typography } from 'antd';
const { Text } = Typography;
import { tool } from '@/hoc';
import cloneDeep from 'lodash/cloneDeep';
import { CensusItem, SuperviseNode } from '../../dataFormat';
import { getSuperviseCensusData, getSuperviseTableData } from '@/modules/main/api/dmc010';
import moment from 'moment';

interface Props {}

@tool
class Supervise extends React.Component<Props> {
  state = {
    superviseType: '01' as string,
    allScreen: false as boolean,
    censusList: [
      { label: '督办总数', value: 0, color: '#242F57' },
      { label: '已完成', value: 0, color: '#242F57' },
      { label: '已逾期', value: 0, color: '#F65B52' },
      { label: '正在进行', value: 0, color: '#FFBD24' },
    ] as CensusItem[],
    overdue: 0 as number,
    normal: 0 as number,
    ratio: 0 as number,
    tableList: [] as SuperviseNode[],
    today: '' as string,
    dimensionList: ['逾期', '>10天', '5～10天', '2～5天', '<2天'] as string[],
  };

  componentDidUpdate(prevProps: Readonly<Props>, prevState, snapshot?: any): void {}

  componentDidMount() {
    this.getDetail();
  }

  getDetail() {
    const { superviseType } = this.state;
    Promise.all([
      getSuperviseCensusData({
        superviseType,
      }),
      getSuperviseTableData({
        superviseType,
      }),
    ]).then((res: any) => {
      if (!res.some((item) => !item.success)) {
        const censusList = cloneDeep(this.state.censusList);
        censusList[0].value = res?.[0].data?.allCount;
        censusList[1].value = res?.[0].data?.finishCount;
        censusList[2].value = res?.[0].data?.overCount;
        censusList[3].value = res?.[0].data?.underWayCount;
        const { overdue, normal, ratio } = this.getRatio(res?.[1].data || []);
        this.setState({
          censusList,
          overdue,
          normal,
          ratio,
          tableList: res?.[1].data,
          today: moment().format('MM月DD日'),
        });
      }
    });
  }

  getRatio(list: any) {
    const overdueList = list?.filter((item) => item.comStatus == '02');
    const normalList = list?.filter((item) => item.comStatus != '02');
    const overdue = overdueList.length
      ? Math.max.apply(
          null,
          overdueList.map((item) => Math.abs(item.days))
        )
      : 0;
    const normal = normalList.length
      ? Math.max.apply(
          null,
          overdueList.map((item) => Math.abs(item.days))
        )
      : 0;
    const ratio = normal ? Math.trunc((overdue / (overdue + normal)) * 100) : 100;
    return {
      overdue,
      normal,
      ratio,
    };
  }

  compileHead() {
    return (
      <div className={css.headBox}>
        <div className={css.title}>督办进展</div>
        <div className={css.handleBox}>
          <Segmented
            value={this.state.superviseType}
            options={[
              { label: '集团', value: '01' },
              { label: '总院', value: '02' },
            ]}
            onChange={(superviseType) => {
              this.setState({ superviseType }, () => this.getDetail());
            }}
          />
          <div
            className={css.screen}
            onClick={() =>
              this.setState({
                allScreen: !this.state.allScreen,
              })
            }
          ></div>
        </div>
      </div>
    );
  }

  compileCensus() {
    return (
      <div className={css.censusBox}>
        {this.state?.censusList?.map((item: CensusItem, index) => {
          return (
            <div className={css.censusNode} key={index}>
              <div className={css.label}>{item.label}</div>
              <div
                className={css.number}
                style={{
                  color: item.color,
                }}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  compileBody() {
    return (
      <div className={css.bodyBox}>
        <div className={css.scrollBox}>
          {this.state?.tableList?.map((item: SuperviseNode, index) => {
            return (
              <div className={css.tableNode} key={index}>
                {this.compileInfo(item)}
                {this.compileProgress(item, index)}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  compileInfo(item: SuperviseNode) {
    return (
      <div className={css.left}>
        <div className={css.name}>
          <Text ellipsis={{ tooltip: item.taskName }}>
            <span className={css.text}>应办结时间：{item.taskName}</span>
          </Text>
        </div>
        <div className={css.info}>
          <Text ellipsis={{ tooltip: `负责人：${item.user}，应办结时间：${item.finishPlandate}` }}>
            <span className={css.text}>负责人：{item.user}</span>
            <span className={css.text}>应办结时间：{item.finishPlandate}</span>
          </Text>
        </div>
      </div>
    );
  }

  compileProgress(item: SuperviseNode, index) {
    const { ratio } = this.state;
    return (
      <div className={css.right}>
        <div
          className={css.overdue}
          style={{
            width: `calc(${ratio}%)`,
          }}
        >
          {this.compileOverdue(item)}
        </div>
        <div className={css.normal}>{this.compileNormal(item)}</div>
      </div>
    );
  }

  compileOverdue(item: SuperviseNode) {
    const { overdue } = this.state;
    return item.comStatus == '02' ? (
      <div
        className={css.progress}
        style={{
          width: `${Math.trunc((item.days / overdue) * 100)}%`,
        }}
      >
        逾期{item.days}天
      </div>
    ) : null;
  }

  compileNormal(item: SuperviseNode) {
    const { normal } = this.state;
    return item.comStatus != '02' ? (
      <div
        className={css.progress}
        style={{
          width: `${Math.trunc((item.days / normal) * 100)}%`,
          background: this.getColor(item.days || 0),
        }}
      >
        剩余{item.days}天
      </div>
    ) : null;
  }

  getColor(days: number) {
    if (days < 2) {
      return '#FF6819';
    } else if (days < 5) {
      return '#FFBD24';
    } else if (days < 10) {
      return '#FFC784';
    } else {
      return '#39CB91';
    }
  }

  compileToday() {
    const { ratio, today } = this.state;
    return (
      <div
        className={css.today}
        style={
          ratio > 90
            ? { right: '-15px' }
            : {
                left: `calc(35% + ${(65 * ratio) / 100}%)`,
              }
        }
      >
        {today}
      </div>
    );
  }

  compileDimension() {
    return (
      <div className={css.dimension}>
        {this.state?.dimensionList?.map((item, index) => {
          return (
            <div className={css.dimensionNode} key={index}>
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className={css.compBox}>
        {this.compileHead()}
        {this.compileCensus()}
        {this.compileBody()}
        {this.compileToday()}
        {this.compileDimension()}
      </div>
    );
  }
}

export default Supervise;
