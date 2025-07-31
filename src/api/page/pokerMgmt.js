import request from "@/api/request.js";

// 获取德州牌局列表

export function getDdzRoomList(data) {
  return request({
    url: "/club/admin/table/list",
    method: "POST",
    data,
  });
}

// 预查询后台俱乐部和联盟分佣发放金额
export function getCommissionList(data) {
  return request({
    url: "/order-settle/GM-order-settle/preQueryProvide",
    method: "POST",
    data,
  });
}

// 发放
export function provideCommission(data) {
  return request({
    url: "/order-settle/GM-order-settle/gmTablePayProvide",
    method: "POST",
    data,
  });
}

// 牌局结算信息
export function getRoomSettleInfo(data) {
  return request({
    url: "/dp-game-settle/GM-game-settle/table_settle",
    method: "POST",
    data,
  });
}

// 公牌列表
export function getPublicCardList(data) {
  return request({
    url: "/dp-game-settle/GM-game-settle/round_boards",
    method: "POST",
    data,
  });
}

// 公牌详情
export function getPublicCardDetail(params) {
  return request({
    url: "/dp-game-settle/GM-game-settle/round_detail",
    method: "GET",
    params,
  });
}
