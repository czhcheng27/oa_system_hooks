import React, { useEffect, useRef } from "react";
import * as echarts from "echarts"; //(*===所有)，导入所有 并命名为echarts
import { message } from "antd";

const colorMap = {
  "Ahead of Schedule": "#11C58A",
  "Accomplish on Schedule": "#24E4BD",
  "Overdue Completion": "#70EEEE",
  "According to Schedule": "#65B1FE",
  "exceed the time limit": "#FEA6A6",
  "To Be Started": "#C6E0FE",
  "Delayed Start": "#FFA943",
};

const nameMap = {
  1: "Ahead of Schedule",
  2: "Accomplish on Schedule",
  3: "Overdue Completion",
  4: "According to Schedule",
  5: "Exceed the Time Limit",
  6: "To Be Started",
  7: "Delayed Start",
};

const seriesItem = {
  type: "bar",
  stack: "total",
  barWidth: 12,
  label: {
    show: false,
  },
  itemStyle: {
    borderRadius: [0, 0, 0, 0],
  },
  emphasis: {
    focus: "series",
    disabled: true,
  },
};

const TaskBar = (props) => {
  const { data = [] } = props;
  const chartRef = useRef(null);

  const xAxisData = data.map((item) => item.areaName);

  const areaIdMap = data.reduce((pre, item) => {
    pre[item.areaName] = item.areaId;
    return pre;
  }, {});

  let seriesData = [];
  data.forEach((item, index) => {
    (item.opInfoMap || []).forEach((child) => {
      const name = nameMap[child.taskStatus];
      const seriesIndex = seriesData.findIndex(
        (series) => series.name === name
      );
      if (seriesIndex < 0) {
        seriesData.push({
          ...seriesItem,
          name,
          // data: [],
          data: [child.count],
          percent: [child.percent],
          orgData: [child.count],
          itemStyle: {
            ...seriesItem.itemStyle,
            normal: { color: colorMap[name] },
          },
        });
      } else {
        seriesData[seriesIndex].orgData.push(child.count);
        seriesData[seriesIndex].data.push(child.count);
        seriesData[seriesIndex].percent.push(child.percent);
      }
    });
  });
  // console.log('seriesData', seriesData);

  const options = {
    // 提示框组件
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      order: "seriesDesc",
      formatter: function (params) {
        //这里就是控制显示的样式
        var relVal =
          '<span style="font-size:14px;font-weight: 600;color: #20253B";>' +
          params[0].axisValue +
          "</span>";
        let value = 0;
        const length = params.length - 1;
        for (var x = length; x >= 0; x--) {
          value += params[x].value;
        }
        for (var i = length; i >= 0; i--) {
          //marker 就是带颜色的小圆圈 seriesName x轴名称  value  y轴值 后面就是计算百分比
          if (params[i].value !== 0) {
            relVal +=
              "<br/>" +
              params[i].marker +
              params[i].seriesName +
              "&nbsp&nbsp   " +
              parseFloat(params[i].value) +
              "&nbsp&nbsp   " +
              // Math.round((100 * params[i].value) / value) +
              ((100 * parseFloat(params[i].value)) / parseFloat(value)).toFixed(
                2
              ) +
              "%";
          }
        }
        return relVal;
      },
    },
    dataZoom: [
      //滚动条
      {
        show: xAxisData.length > 5,
        type: "slider",
        realtime: true,
        startValue: 0,
        endValue: 14,
        xAxisIndex: [0],
        bottom: "10",
        left: "30",
        height: 10,
        borderColor: "rgba(0,0,0,0)",
        textStyle: {
          color: "#05D5FF",
        },
      },
    ],
    grid: {
      top: "8%",
      left: "3%",
      right: "3%",
      bottom: "10%",
      containLabel: true,
    },
    // x轴
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0, //全部显示x轴
        rotate: 45,
        formatter: function (obj, index) {
          return obj.length > 4 ? obj.substring(0, 4) + ".." : obj;
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      // data: [],
      data: xAxisData || [],
    },
    // y轴
    yAxis: {
      nameTextStyle: {
        fontSize: 14,
        color: "#636E95",
        align: "right",
        verticalAlign: "bottom",
        lineHeight: 20,
      },
      type: "value",
      // series: seriesData || [],
    },
    // yAxis: [
    //   {
    //     min: 0, //最小百分比
    //     max: 100, //最大百分比
    //     type: 'value',
    //     // name: '单位（%）',
    //     nameGap: 35,
    //     nameTextStyle: { color: '#666666' },
    //     axisTick: { show: false },
    //     axisLabel: {
    //       show: true,
    //       interval: 0, // 使x轴文字显示全
    //       color: '#666666',
    //       formatter: '{value}%', //y轴数值，带百分号
    //     },
    //     axisLine: { show: true, lineStyle: { color: '#dddddd' } },
    //     splitLine: { lineStyle: { type: 'dashed', color: '#eeeeee' } },
    //   },
    // ],
    series: seriesData.reverse() || [],
    // animation: false,
  };

  const onBarClick = (chart) => {
    chart.getZr().on("click", (params) => {
      let pointInPixel = [params.offsetX, params.offsetY];
      if (chart.containPixel("grid", pointInPixel)) {
        let pointInGrid = chart.convertFromPixel(
          {
            seriesIndex: 0,
          },
          pointInPixel
        );
        let xIndex = pointInGrid[0]; //索引
        let handleIndex = Number(xIndex);
        // let seriesObj = chart.getOption(); //图表object对象
        var op = chart.getOption();
        //获得图表中点击的列
        var colName = op.xAxis[0].data[handleIndex]; //获取点击的列名
        // console.log('colName', colName);
        message.success(`You click ${colName},    id: ${areaIdMap[colName]}`);
        // console.log(handleIndex, seriesObj);
        // clickBar(seriesObj);
      }
    });
  };

  useEffect(() => {
    // 创建一个echarts实例，返回echarts实例。不能在单个容器中创建多个echarts实例
    const chart = echarts.init(chartRef.current);

    // 设置图表实例的配置项和数据
    chart.setOption(options);

    // 点击柱状图方法
    onBarClick(chart);

    // 组件卸载
    return () => {
      chart.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div style={{ width: "100%", height: "400px" }} ref={chartRef}></div>;
};

export default TaskBar;
