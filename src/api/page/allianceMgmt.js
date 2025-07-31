import request from "@/api/request.js";

// 联盟列表
export function getAllianceList(data) {
  return request({
    url: "/club/admin/union/list",
    method: "POST",
    data,
  });
}

// 获取联盟分成
export function getAllianceCommission(params) {
  return request({
    url: "/club/admin/union/rate",
    method: "GET",
    params,
  });
}

// 配置联盟分成
export function setAllianceCommission(data) {
  return request({
    url: "/club/admin/union/updateClubConfig",
    method: "POST",
    data,
  });
}
