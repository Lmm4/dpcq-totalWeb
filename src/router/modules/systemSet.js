import layout from "@/views/layout/index.vue";

export default {
  path: "/systemSet",
  component: layout,
  name: "systemSet",
  meta: {
    title: "系统设置",
  },
  children: [
    {
      path: "/sysMaint",
      component: () => import("@/views/systemSet/sysMaint/index.vue"),
      hidden: true,
      name: "sysMaint",
      meta: {
        title: "系统维护",
      },
    },
    {
      path: "/gameSet",
      component: () => import("@/views/systemSet/gameSet/index.vue"),
      hidden: true,
      name: "gameSet",
      meta: {
        title: "游戏设定",
      },
    },
    {
      path: "/downloadLink",
      component: () => import("@/views/systemSet/downloadLink/index.vue"),
      hidden: true,
      name: "downloadLink",
      meta: {
        title: "下载链接",
      },
    },
    {
      path: "/currencyMgmt",
      component: () => import("@/views/systemSet/currencyMgmt/index.vue"),
      hidden: true,
      name: "currencyMgmt",
      meta: {
        title: "货币配置",
      },
    },
    {
      path: "/roleMgmt",
      component: () => import("@/views/systemSet/roleMgmt/index.vue"),
      hidden: true,
      name: "roleMgmt",
      meta: {
        title: "角色管理",
      },
    },
  ],
};
