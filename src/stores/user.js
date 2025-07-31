import { defineStore } from "pinia";
import { dayjs } from "element-plus";
import { localRemove, localGet, localSet } from "@/utils/local";
import Router, { resetRouter } from "@/router/index";
import { login } from "@/api/page/login.js";
import { permissionStore } from "@/stores/permission.js";

export const userInfoStore = defineStore("userInfo", {
  // 开启数据缓存
  persist: {
    enabled: true,
  },
  state: () => {
    return {
      token: localGet("tokenObject")?.token,
      userInfo: {},
    };
  },
  actions: {
    // 登录
    login(data) {
      return new Promise((resolve, reject) => {
        data.verifyValue = data.verifyValue.join(",");
        login(data)
          .then((res) => {
            res.expireTime = dayjs().valueOf() + 540 * 1000;
            localSet("tokenObject", res);
            Router.push({
              name: "index",
            });
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取token
    getToken(data) {
      return new Promise((resolve, reject) => {
        getToken(data)
          .then((res) => {
            if (res.code == 200) {
              const { token } = res.data;
              localSet("token", token);
              this.token = token;
              resolve("success");
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        const permission = permissionStore();
        userInfo()
          .then((res) => {
            if (res.code == 200) {
              const { permissions, roles, token, user } = res.data;
              localSet("permissions", permissions);
              permission.getAllMenus();
              localSet("roles", roles);
              localSet("token", token);
              localSet("userInfo", user);
              this.userInfo = user;
              resolve("success");
            } else {
              reject(res);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    //退出登录
    logout() {
      return new Promise((resolve) => {
        // this.token = "";
        // this.userInfo = {};
        Router.push({
          name: "login",
        });
        localRemove("tokenObject");
        // localRemove("permissions");
        // localRemove("roles");
        // localRemove("token");
        resolve();
      });
    },
  },
});
