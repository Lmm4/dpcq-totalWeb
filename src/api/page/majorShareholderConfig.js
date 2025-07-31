import request from "@/api/request.js";

// 获取大股东列表
export function getMajorShareholderList(data) {
  return request({
    url: "/partner/admin/manage",
    method: "POST",
    data,
  });
}

// 新增大股东
export function addMajorShareholder(data) {
  return request({
    url: "/partner/admin/add-big-shareholder",
    method: "POST",
    data,
  });
}

// 配置分润比例
export function deployShareholderRatio(data) {
  return request({
    url: "/partner/admin/update-sub-profit",
    method: "POST",
    data,
  });
}

// 用户游戏数据
export function getUserGameData(data) {
  return request({
    url: "/partner/order/gameList",
    method: "POST",
    data,
  });
}

// 获取月度账单
export function getShareholderMonthBill(data) {
  return request({
    url: "/partner/admin/monthBillPage",
    method: "POST",
    data,
  });
}

// 生成账单
export function generateBill(data) {
  return request({
    url: "/partner/admin/bill",
    method: "POST",
    data,
  });
}
