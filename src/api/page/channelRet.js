import request from "@/api/request.js";

// 获取渠道列表
export function getChannelList(params) {
  return request({
    url: "/data/admin/channel/list",
    method: "GET",
    params,
  });
}

// 新增渠道
export function addChannel(data) {
  return request({
    url: "/data/admin/channel/add",
    method: "POST",
    data,
  });
}

// 重置后台链接
export function resetChannel(params) {
  return request({
    url: "/data/admin/channel/resetAdminUrl",
    method: "GET",
    params,
  });
}

// 渠道总数据
export function getChannelTotal(params) {
  return request({
    url: "/dp-game-yx/yx-admin/channelStatistics",
    method: "GET",
    params,
  });
}

// 获取渠道详情列表
export function getChannelDetailList(params) {
  return request({
    url: "/data/admin/channel/detail/list",
    method: "GET",
    params,
  });
}

// 修改渠道单日成本
export function updateChannelCost(data) {
  return request({
    url: "/data/admin/channel/setCost",
    method: "POST",
    data,
  });
}

// 新增渠道用户
export function addChannelUser(data) {
  return request({
    url: "/data/admin/channel/addUser",
    method: "POST",
    data,
  });
}

// 删除渠道用户
export function delChannelUser(data) {
  return request({
    url: "//data/admin/channel/delUser",
    method: "POST",
    data,
  });
}

//获取渠道成员列表
export function getChannelUserList(params) {
  return request({
    url: "/data/admin/channel/users",
    method: "GET",
    params,
  });
}

// 用户总数据
export function getChannelUserTotal(params) {
  return request({
    url: "/dp-game-yx/yx-admin/userStatistics",
    method: "GET",
    params,
  });
}

// 获取渠道留存数列表
export function getChannelRetentionList(params) {
  return request({
    url: "/data/admin/channel/retain/list",
    method: "GET",
    params,
  });
}
