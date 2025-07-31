import request from "@/api/request.js";

// 获取充值列表
export function getRechargeList(data) {
  return request({
    url: "/tron/admin/recharge/query/page",
    method: "POST",
    data,
  });
}

// 手动上分
export function manualRecharge(data) {
  return request({
    url: "/tron/admin/recharge/manual",
    method: "POST",
    data,
  });
}

// 提现记录
export function getWithdrawList(data) {
  return request({
    url: "/tron/admin/withdraw/query/page",
    method: "POST",
    data,
  });
}

// 提现初审
export function withdrawFirstCheck(data) {
  return request({
    url: "/tron/admin/withdraw/pre-check",
    method: "POST",
    data,
  });
}

// 提现复审
export function withdrawSecondCheck(data) {
  return request({
    url: "/tron/admin/withdraw/final-check",
    method: "POST",
    data,
  });
}

// 用户钱包地址列表
export function getWalletList(data) {
  return request({
    url: "/tron/admin/gather/list",
    method: "POST",
    data,
  });
}

// 钱包手续费转入
export function transferFee(data) {
  return request({
    url: "/tron/admin/gather/fee-in",
    method: "POST",
    data,
  });
}

//钱包归集
export function gather(data) {
  return request({
    url: "/tron/admin/gather/manual",
    method: "POST",
    data,
  });
}

// 归集统计
export function gatherStatistics() {
  return request({
    url: "/tron/admin/gather/count",
    method: "GET",
  });
}
