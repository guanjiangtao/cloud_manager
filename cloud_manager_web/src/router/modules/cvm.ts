import { lazy } from 'react';
import { ServerIcon } from 'tdesign-icons-react';
import { IRouter } from '../index';

const cvm: IRouter[] = [
  {
    path: '/cvm',
    meta: {
      title: '机器管理',
      Icon: ServerIcon,
    },
    children: [
      {
        path: 'list',
        Component: lazy(() => import('pages/Cvm/List')),
        meta: {
          title: '机器列表',
        },
      },
      {
        path: 'apply',
        Component: lazy(() => import('pages/Cvm/Apply')),
        meta: {
          title: '申请机器',
        },
      },
    ],
  },
];

export default cvm;
