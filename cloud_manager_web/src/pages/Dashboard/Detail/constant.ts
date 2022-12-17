import { IBoardProps, ETrend } from 'components/Board';

export const PANE_LIST: Array<IBoardProps> = [
  {
    title: '当前运行的总机器数量（台）',
    count: '1126',
    trendNum: '10%',
    trend: ETrend.up,
  },
  {
    title: '新增机器数量（台）',
    count: '13',
    trendNum: '13%',
    trend: ETrend.down,
  },
  {
    title: '7天内到期机器数量（台）',
    count: '4',
    trendNum: '10%',
    trend: ETrend.up,
  },
  {
    title: '已开通IPV6机器数量（台）',
    count: '90',
    trendNum: '44%',
    trend: ETrend.down,
  }
];

export const PRODUCT_LIST = [
  {
    description: 'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
    index: 1,
    isSetup: true,
    name: 'SSL证书',
    type: 'D',
    icon: 'user',
  },
  {
    description: 'SSL证书又叫服务器证书，腾讯云为您提供证书的一站式服务，包括免费、付费证书的申请、管理及部',
    index: 1,
    isSetup: true,
    name: 'SSL证书',
    type: 'C',
    icon: 'calendar',
  },
];
