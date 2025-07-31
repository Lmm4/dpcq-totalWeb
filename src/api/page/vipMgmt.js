import request from "@/api/request.js";

// 获取会员列表
export function getVipList(data) {
  return request({
    url: "/user/admin/user/list",
    method: "POST",
    data,
  });
}

// 修改国家
export function updateCountry(data) {
  return request({
    url: "/user/admin/user/setUserCountry",
    method: "POST",
    data,
  });
}

// 上下分
export function manualUpDown(data) {
  return request({
    url: "/wallet/admin/manualUpDown",
    method: "POST",
    data,
  });
}

// 用户所有资产余额
export function getUserAssets(params) {
  return request({
    url: `/wallet/admin/user/all/balance`,
    method: "GET",
    params,
  });
}

// 用户交易记录
export function getTransactionList(params) {
  return request({
    url: "/wallet/admin/records",
    method: "GET",
    params,
  });
}

// 用户登录记录
export function getLoginLogList(data) {
  return request({
    url: "/user/admin/user/loginRecord",
    method: "POST",
    data,
  });
}
