import layout from "@/views/layout/index.vue";

export default {
  path: "/orderDataManage",
  component: layout,
  name: "orderDataManage",
  meta: {
    title: "注单数据管理",
  },
  children: [
    {
      path: "/fgGame",
      component: () => import("@/views/orderDataManage/fgGame/index.vue"),
      hidden: true,
      name: "fgGame",
      meta: {
        title: "FG游戏",
      },
    },
    {
      path: "/g9Game",
      component: () => import("@/views/orderDataManage/g9Game/index.vue"),
      hidden: true,
      name: "g9Game",
      meta: {
        title: "9G游戏",
      },
    },
    {
      path: "/dbPeopleGame",
      component: () => import("@/views/orderDataManage/dbPeopleGame/index.vue"),
      hidden: true,
      name: "dbPeopleGame",
      meta: {
        title: "DB真人",
      },
    },
    {
      path: "/astarGame",
      component: () => import("@/views/orderDataManage/astarGame/index.vue"),
      hidden: true,
      name: "astarGame",
      meta: {
        title: "亚星游戏",
      },
    },
    {
      path: "/wmGame",
      component: () => import("@/views/orderDataManage/wmGame/index.vue"),
      hidden: true,
      name: "wmGame",
      meta: {
        title: "WM游戏",
      },
    },
  ],
};
