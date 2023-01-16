import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import * as echarts from "echarts"; //(*===所有)，导入所有 并命名为echarts
import {
  getFinishNumArray,
  getTotalNumArray,
  rateNum,
  name2RateMap,
  getPlaceholder,
  getPlaceholder2,
  colorMap,
  nameMap,
  seriesItem,
} from "../mock";
import { message } from "antd";

const TaskBar = (props) => {
  const { data = [], clickBar, isActivity } = props;
  const chartRef = useRef(null);

  const xAxisData = data.map((item) =>
    isActivity ? item.activityCode : item.areaName
  );

  const areaIdMap = data.reduce((pre, item) => {
    pre[item.areaName] = item.areaId;
    return pre;
  }, {});

  //数据格式化为[{ '活动编码 activityCode': '活动名称 areaName'}, {...}, {...}]
  const activityCode2areaNameMap = data.reduce((pre, item) => {
    pre[item.activityCode] = item.areaName;
    return pre;
  }, {});

  //数据格式化为[{ '活动编码 activityCode': '活动Id areaId'}, {...}, {...}]
  const activityCode2areaIdMap = data.reduce((pre, item) => {
    pre[item.activityCode] = item.areaId;
    return pre;
  }, {});

  const totalNum = getTotalNumArray(data);
  const finishRate = rateNum(getFinishNumArray(data), getTotalNumArray(data));
  const nameRateMap = name2RateMap(data, finishRate, isActivity);

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

  seriesData.push({
    type: "bar",
    stack: "y",
    barWidth: 12,
    data: totalNum,
    barGap: "-100%",
    label: {
      show: true,
      position: "top",
      color: "#000",
      formatter: function (params) {
        return nameRateMap[params.name] + "%";
      },
    },
    itemStyle: {
      borderRadius: [0, 0, 0, 0],
      color: "#FFFFFF",
    },
    emphasis: {
      focus: "series",
      disabled: true,
    },
  });

  const options = {
    // 提示框组件
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      order: "seriesDesc",
      formatter: function (params) {
        params.splice(0, 1);
        //这里就是控制显示的样式
        var relVal =
          '<span style="font-size:14px;font-weight: 600;color: #20253B";>' +
          `${
            isActivity
              ? activityCode2areaNameMap[params[0].axisValue]
              : params[0].axisValue
          }` +
          "</span>";
        let value = 0;
        const length = params.length - 1;
        for (var x = length; x >= 0; x--) {
          value += params[x].value;
        }
        for (var i = length; i >= 0; i--) {
          let percent = (
            (100 * parseFloat(params[i].value)) /
            parseFloat(value)
          ).toFixed(2);
          //marker 就是带颜色的小圆圈 seriesName x轴名称  value  y轴值 后面就是计算百分比
          if (params[i].value !== 0) {
            relVal +=
              "<br/>" +
              params[i].marker +
              params[i].seriesName +
              "&nbsp&nbsp&nbsp&nbsp&nbsp" +
              '<span style="font-weight:400;font-size: 13px;margin-top:4px;display: inline-block;">' +
              getPlaceholder(params[i].seriesName, params[i].value.toString()) +
              parseFloat(params[i].value) +
              getPlaceholder2(params[i].value.toString(), percent.toString()) +
              percent +
              "%" +
              "</span>";
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
        let seriesObj = chart.getOption(); //图表object对象
        // var op = chart.getOption();
        //获得图表中点击的列
        var colName = seriesObj.xAxis[0].data[handleIndex]; //获取点击的列名
        message.success(`You clicked ${colName}`);
      }
    });
  };

  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    chart.setOption(options);
    onBarClick(chart);

    return () => {
      chart.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div style={{ width: "100%", height: "400px" }} ref={chartRef}></div>;
};

export default TaskBar;
