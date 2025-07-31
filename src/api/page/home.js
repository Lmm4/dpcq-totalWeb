import request from "@/api/request.js";

// 文件上传

export function uploadFile(data) {
  return request({
    url: "/admin/storage/upload",
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
