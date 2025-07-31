import layout from "@/views/layout/index.vue";

export default {
  path: "/vipMgmt",
  component: layout,
  name: "vipMgmt",
  meta: {
    title: "会员管理",
  },
  children: [
    {
      path: "/vipList",
      component: () => import("@/views/vipMgmt/vipList/index.vue"),
      hidden: true,
      name: "vipList",
      meta: {
        title: "会员列表",
      },
    },
    {
      path: "/blackList",
      component: () => import("@/views/vipMgmt/blackList/index.vue"),
      hidden: true,
      name: "blackList",
      meta: {
        title: "黑名单列表",
      },
    },
    {
      path: "/loginInfo",
      component: () => import("@/views/vipMgmt/loginInfo/index.vue"),
      hidden: true,
      name: "loginInfo",
      meta: {
        title: "登录信息",
      },
    },
    {
      path: "/vipDetails",
      component: () => import("@/views/vipMgmt/vipDetails/index.vue"),
      hidden: true,
      name: "vipDetails",
      meta: {
        title: "会员详情",
      },
    },
  ],
};
