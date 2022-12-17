import type { EChartOption } from 'echarts';

import { ONE_WEEK_LIST, getChartDataSet, getTimeArray, getRandomInt } from 'utils/chart';

// line chart options
export const getLineChartOptions = (dateTime: Array<string> = []): EChartOption => {
  let dateArray: Array<string> = ONE_WEEK_LIST;
  if (dateTime.length > 0) {
    const dividedNum = 7;
    dateArray = getTimeArray(dateTime, dividedNum, 'YYYY-MM-DD');
  }

  return {
    grid: {
      top: '5%',
      right: '10px',
      left: '30px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['杯子', '茶叶', '蜂蜜', '面粉'],
    },
    xAxis: {
      type: 'category',
      data: dateArray,
      boundaryGap: false,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '杯子',
        stack: '总量',
        data: [
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
        ],
        type: 'line',
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '茶叶',
        stack: '总量',
        data: [
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
        ],
        type: 'line',
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '蜂蜜',
        stack: '总量',
        data: [
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
        ],
        type: 'line',
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      },
      {
        showSymbol: true,
        symbol: 'circle',
        symbolSize: 8,
        name: '面粉',
        stack: '总量',
        data: [
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
          getRandomInt(),
        ],
        type: 'line',
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1,
        },
      },
    ],
  };
};

export const getScatterChartOptions = (dateTime: Array<string> = []): EChartOption => {
  const [timeArray, inArray, outArray] = getChartDataSet(dateTime);

  return {
    xAxis: {
      data: timeArray,
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      splitLine: { show: false },
      axisLine: {
        lineStyle: {
          color: '#E3E6EB',
          width: 1,
        },
      },
    },
    yAxis: {
      type: 'value',
      // splitLine: { show: false},
      axisLabel: {
        color: 'rgba(0, 0, 0, 0.4)',
      },
      nameTextStyle: {
        padding: [0, 0, 0, 60],
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
    },
    tooltip: {
      trigger: 'item',
    },
    grid: {
      top: '5px',
      left: '25px',
      right: '5px',
      bottom: '60px',
    },
    legend: {
      left: 'center',
      bottom: '0',
      orient: 'horizontal', // legend 横向布局。
      data: ['按摩仪', '咖啡机'],
      itemHeight: 8,
      itemWidth: 8,
    },
    series: [
      {
        name: '按摩仪',
        symbolSize: 10,
        data: outArray,
        type: 'scatter',
      },
      {
        name: '咖啡机',
        symbolSize: 10,
        data: inArray,
        type: 'scatter',
      },
    ],
  };
};

// cvm分地区展示图
export const cvmRegionOptions: EChartOption = {
  title: {
    text: '分地区概览',
    textStyle: {
      fontSize: 14,
      color: '#617be3'
   }
  },
  xAxis: {
    data: ['北京', '上海', '广州', '南京', '香港', '美国']
  },
  yAxis: {},
  series: [
    {
      type: 'bar',
      data: [2, 4, 1, 5, 7, 8],
      name: '业务服务'
    },
    {
      type: 'bar',
      data: [3, 5, 1, 2, 3, 4],
      name: '平台基础服务'
    },
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28],
      name: '核心网络'
    },
    {
      type: 'bar',
      data: [23, 24, 18, 25, 27, 28],
      name: '备用账号'
    }
  ]
};