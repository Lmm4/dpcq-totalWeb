import axios from "axios";
import { ElMessage, dayjs } from "element-plus";
import { localGet, localRemove, localSet } from "@/utils/local.js";
import { tagsViewStore } from "@/stores/tagsView.js";
import qs from "qs";
import Router from "@/router/index";
import { v4 as uuidv4 } from "uuid";
async function generateSHA256(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
}
// 配置新建一个 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 50000,
});
localSet("uuid", uuidv4());

// 添加请求拦截器
request.interceptors.request.use(
  // 请求成功
  async (config) => {
    const token = localGet("tokenObject")?.token;
    if (token) {
      config.headers["authorization"] = `${token}`;
    }
    const uuid = uuidv4();
    const dayTime = dayjs().valueOf();
    config.headers["X-Request-ID"] = uuid;
    config.headers["X-Send-At"] = dayTime;
    config.headers["X-Device-ID"] = localGet("uuid");
    config.headers["X-Client-Version"] = "Vue H5 1.0";

    // console.log(qs.stringify(config.params));
    // console.log(config);

    let url;
    if (config.method == "get") {
      url = `${config.method.toUpperCase()}_${config.url}_${qs.stringify(
        config.params
      )}_${uuid}_${dayTime}_${localGet("uuid")}_Vue H5 1.0_${
        token ? token : ""
      }_`;
    } else if (config.method == "post") {
      url = `${config.method.toUpperCase()}_${
        config.url
      }__${uuid}_${dayTime}_${localGet("uuid")}_Vue H5 1.0_${
        token ? token : ""
      }_${JSON.stringify(config.data)}`;
    }

    // console.log(url);
    try {
      const hash = await generateSHA256(url);
      config.headers["X-Signature"] = hash;
    } catch (err) {
      console.log(err);
    }
    return config;
  },
  // 请求失败
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  // 响应成功
  (response) => {
    const res = response.data;
    // console.log(response);
    const tagsViewInfo = tagsViewStore();
    if (Number(response.status) == 200) {
      return Promise.resolve(res);
    } else if (Number(response.status) == 400) {
      ElMessage.error(res.message);
      return Promise.reject(res);
    } else if (Number(response.status) == 401) {
      ElMessage.error("登录令牌失效，请重新登录！");
      localRemove("tokenObject");
      tagsViewInfo.delAllViews();
      let time = setTimeout(() => {
        Router.push({
          path: "/",
        });
        clearTimeout(time);
      }, 1000);
    } else if (Number(res.code) == 402) {
      ElMessage.error("令牌验证错误！");
      localRemove("userInfo");
      tagsViewInfo.delAllViews();
      let time = setTimeout(() => {
        Router.push({
          path: "/",
        });
        clearTimeout(time);
      }, 1000);
    } else {
      ElMessage.error(response.data.message || "接口异常");
      return Promise.reject(response.data);
    }
  },
  // 响应失败
  (error) => {
    const tagsViewInfo = tagsViewStore();
    if (error.message.indexOf("timeout") != -1) {
      ElMessage.error("网络超时");
    } else if (error.message == "Network Error") {
      ElMessage.error("网络连接错误");
    } else if (error.status == 401) {
      ElMessage.error("登录令牌失效，请重新登录！");
      localRemove("tokenObject");
      tagsViewInfo.delAllViews();
      let time = setTimeout(() => {
        clearTimeout(time);
        Router.push({
          path: "/",
        });
      }, 1500);
    } else if (error.status == 418) {
      ElMessage.error("请求不通过！");
    } else {
      ElMessage.error(error.response?.data.message);
    }
    return Promise.reject(error);
  }
);

// 导出 axios 实例
export default request;
