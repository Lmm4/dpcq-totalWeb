import request from "@/api/request.js";

// 获取图片验证
export function getCaptcha(params) {
  return request({
    url: "/user/verify/img",
    method: "GET",
    params,
  });
}

// 登录
export function login(data) {
  return request({
    url: "/user/admin/login",
    method: "POST",
    data,
  });
}

// 刷新token

export function refreshToken(params) {
  return request({
    url: `/user/refresh`,
    method: "GET",
    params,
  });
}

// 获取谷歌验证码
export function checkGoogle(data) {
  return request({
    url: "/user/user/login/recaptcha/api/siteverify",
    method: "POST",
    data,
  });
}
