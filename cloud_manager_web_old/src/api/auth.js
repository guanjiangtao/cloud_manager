

import {server} from '@/utils/request'

export function getAuthCenterByList(params) {
  return server.connection("GET", "getAuthCenterByList", params);
}


export function addAuth(params) {
  return server.connection("POST", "addAuth", params);
}

export function deleteAuthById(params) {
  return server.connection("GET", "deleteAuthById", params);
}

export function getAuthCount(params) {
  return server.connection("GET", "getAuthCount", params);
}

export function getAuthById(params) {
  return server.connection("GET", "getAuthById", params);
}
