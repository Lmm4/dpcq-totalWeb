import layout from "@/views/layout/index.vue";

export default {
  path: "/financeMgmt",
  component: layout,
  name: "financeMgmt",
  meta: {
    title: "财务管理",
  },
  children: [
    {
      path: "/rechargeMgmt",
      component: () => import("@/views/financeMgmt/rechargeMgmt/index.vue"),
      hidden: true,
      name: "rechargeMgmt",
      meta: {
        title: "充值管理",
      },
    },
    {
      path: "/withdrawMgmt",
      component: () => import("@/views/financeMgmt/withdrawMgmt/index.vue"),
      hidden: true,
      name: "withdrawMgmt",
      meta: {
        title: "提现管理",
      },
    },
    {
      path: "/platformRev",
      component: () => import("@/views/financeMgmt/platformRev/index.vue"),
      hidden: true,
      name: "platformRev",
      meta: {
        title: "平台收益账单",
      },
    },
    {
      path: "/platformColl",
      component: () => import("@/views/financeMgmt/platformColl/index.vue"),
      hidden: true,
      name: "platformColl",
      meta: {
        title: "平台归集账单",
      },
    },
  ],
};
