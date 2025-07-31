import request from "@/api/request.js";

// 获取俱乐部交易类型
export function getBillTypes(params) {
  return request({
    url: "/wallet/admin/getBillTypes",
    method: "GET",
    params,
  });
}

// 俱乐部交易流水
export function getClubBillFlow(params) {
  return request({
    url: "/wallet/admin/club/records",
    method: "GET",
    params,
  });
}
// 获取俱乐部列表
export function getClubList(data) {
  return request({
    url: "/club/admin/club/list",
    method: "POST",
    data,
  });
}

// 升级为联盟

export function upgradeToUnion(data) {
  return request({
    url: "/club/admin/union/upgrade",
    method: "POST",
    data,
  });
}

// 获取俱乐部设定配置
export function getClubSetting(params) {
  return request({
    url: "/club/admin/club/getClubRate",
    method: "GET",
    params,
  });
}

// 修改俱乐部设定配置
export function updateClubSetting(data) {
  return request({
    url: "/club/admin/club/updateRate",
    method: "POST",
    data,
  });
}

// 俱乐部余额查询
export function getClubBalance(params) {
  return request({
    url: "/wallet/admin/club/balance",
    method: "GET",
    params,
  });
}

// 俱乐部上下分
export function manualUpDown(data) {
  return request({
    url: "/wallet/admin/club/manualUpDown",
    method: "POST",
    data,
  });
}
