import { server } from '@/utils/request'

export function login(data) {
  return server.connection("POST", "login", data);
}

export function getInfo(token) {
  return server.connection("GET", "getUserInfoById", { token });
}

export function logout() {
  return server.connection("POST", "logout", {  });
}
