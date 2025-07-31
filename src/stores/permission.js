import { defineStore } from "pinia";
// import { getRouter } from "@/api/page/user";
export const permissionStore = defineStore("permissionInfo", {
  // 开启数据缓存
  persist: {
    enabled: true,
  },
  state: () => {
    return {
      routes: [],
      addRoutes: [],
      buttons: [],
    };
  },
  actions: {
    // getAllMenus() {
    //     return new Promise(resolve => {
    //         // console.log(data);
    //         getRouter().then((res)=>{
    //             console.log(res);
    //             // this.routes=data
    //             resolve()
    //         })
    //     })
    // },
  },
});
