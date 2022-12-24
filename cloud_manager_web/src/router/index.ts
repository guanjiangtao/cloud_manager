import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';
import user from './modules/user';
import login from './modules/login';
import otherRoutes from './modules/others';
import cvm from './modules/cvm';

export interface IRouter {
  path: string;
  redirect?: string;
  Component?: React.FC<BrowserRouterProps> | (() => any);
  /**
   * 当前路由是否全屏显示
   */
  isFullPage?: boolean;
  /**
   * meta未赋值 路由不显示到菜单中
   */
  meta?: {
    title?: string;
    Icon?: React.FC;
    /**
     * 侧边栏隐藏该路由
     */
    hidden?: boolean;
    /**
     * 单层路由
     */
    single?: boolean;
  };
  children?: IRouter[];
}

const routes: IRouter[] = [
  {
    path: '/login',
    Component: lazy(() => import('pages/Login')),
    isFullPage: true,
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    redirect: '/cvm/list',
  },
];

const allRoutes = [...routes,...cvm, ...user, ...login, ...otherRoutes];

export default allRoutes;
