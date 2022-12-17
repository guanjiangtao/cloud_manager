import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'
axios.defaults.withCredentials = true;// 允许跨域携带cookie
/**
 * 请求类
 */
export class BaseApi {
  servers;

  /**
   * 初始化servers
   * @param hot
   */
  constructor() {
    const headers = new Headers();
    headers.set('App-Version', '0.1.0');
    headers.set("Access-Control-Allow-Methods","GET,POST");
    this.servers = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      headers,
      timeout: 5000,
    });
    this.servers.defaults.timeout = 50000;
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      return Promise.reject(error.response || '网络繁忙，请稍候再试！');
    })
  }

  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @param fileList
   * @returns {Promise<any>}
   */
  connection(method = 'GET', url, body, fileList) {
    // 如果存在token则绑定token
    if (store.getters.token) {
      this.servers.headers['X-Token'] = getToken()
    }
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'};
      const param = new window.FormData();
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) param.append(key, body[key]);
      }
      fileList.forEach(file => param.append('files', file));
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (method === 'get') {
      url = `${url}?${qs.stringify(body)}`;
      body = {}
    }
    return Promise.resolve(this.servers[method](url, body))
  }
}

export const server = new BaseApi();
