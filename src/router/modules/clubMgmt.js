import layout from "@/views/layout/index.vue";

export default {
  path: "/clubMgmt",
  component: layout,
  name: "clubMgmt",
  meta: {
    title: "俱乐部管理",
  },
  children: [
    {
      path: "/clubList",
      component: () => import("@/views/clubMgmt/clubList/index.vue"),
      hidden: true,
      name: "clubList",
      meta: {
        title: "俱乐部列表",
      },
    },
    {
      path: "/clubTrans",
      component: () => import("@/views/clubMgmt/clubTrans/index.vue"),
      hidden: true,
      name: "clubTrans",
      meta: {
        title: "俱乐部交易流水",
      },
    },
    {
      path: "/clubBgList",
      component: () => import("@/views/clubMgmt/clubBgList/index.vue"),
      hidden: true,
      name: "clubBgList",
      meta: {
        title: "背景图列表",
      },
    },
    {
      path: "/checkFlow",
      component: () => import("@/views/clubMgmt/checkFlow/index.vue"),
      hidden: true,
      name: "checkFlow",
      meta: {
        title: "查看流水",
      },
    },
    {
      path: "/publicCardDetails",
      component: () => import("@/views/clubMgmt/publicCardDetails/index.vue"),
      hidden: true,
      name: "publicCardDetails",
      meta: {
        title: "公牌详情",
      },
    },
  ],
};
