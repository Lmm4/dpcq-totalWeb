import request from "@/api/request.js";

// 获取游戏设置列表
export function getGameSetList() {
  return request({
    url: "/user/admin/user/getGameSetList",
    method: "GET",
  });
}

// 设置是否开启
export function setGameOpen(data) {
  return request({
    url: "/user/admin/user/setGameSet",
    method: "POST",
    data,
  });
}

// 获取下载链接地址
export function getDownloadUrl() {
  return request({
    url: "/user/admin/user/getConfig",
    method: "GET",
  });
}

// 修改下载链接地址
export function updateDownloadUrl(data) {
  return request({
    url: "/user/admin/user/updateConfig",
    method: "POST",
    data,
  });
}
