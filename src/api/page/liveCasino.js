import request from "@/api/request.js";

// 获取结算列表
export function getChannelRetList(params) {
  return request({
    url: "/dp-game-yx/yx-admin/rollin/list",
    method: "GET",
    params,
  });
}

// 获取投注列表
export function getBetList(params) {
  return request({
    url: "/dp-game-yx/yx-admin/rollout/list",
    method: "GET",
    params,
  });
}
