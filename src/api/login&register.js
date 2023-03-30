/**
 * 注册登录
 */
import request from "@/utils/request";

export function login(password, username) {
  return request({
    url: "/api/login/userLogin",
    method: "post",
    params: {
      password,
      username,
    },
  });
}

export function adminLogin(password, username) {
  return request({
    url: "/api/login/adminLogin",
    method: "post",
    params: {
      password,
      username,
    },
  });
}

export function superAdminLogin(password, username) {
  return request({
    url: "/api/login/superAdminLogin",
    method: "post",
    params: {
      password,
      username,
    },
  });
}

export function userRegister(userInfoDO) {
  return request({
    url: "/api/register/userRegister",
    method: "post",
    data: userInfoDO,
  });
}
