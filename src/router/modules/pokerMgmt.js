import layout from "@/views/layout/index.vue";

export default {
  path: "/pokerMgmt",
  component: layout,
  name: "pokerMgmt",
  meta: {
    title: "牌局管理",
  },
  children: [
    {
      path: "/texasHoldem",
      component: () => import("@/views/pokerMgmt/texasHoldem/index.vue"),
      hidden: true,
      name: "texasHoldem",
      meta: {
        title: "德州牌局管理",
      },
    },
    {
      path: "/shortDeck",
      component: () => import("@/views/pokerMgmt/shortDeck/index.vue"),
      hidden: true,
      name: "shortDeck",
      meta: {
        title: "短牌牌局管理",
      },
    },
    {
      path: "/aofTexas",
      component: () => import("@/views/pokerMgmt/aofTexas/index.vue"),
      hidden: true,
      name: "aofTexas",
      meta: {
        title: "AOF德州牌局管理",
      },
    },
    {
      path: "/aofShortDeck",
      component: () => import("@/views/pokerMgmt/aofShortDeck/index.vue"),
      hidden: true,
      name: "aofShortDeck",
      meta: {
        title: "AOF短牌牌局管理",
      },
    },
    {
      path: "/gameConfigInfo",
      component: () => import("@/views/pokerMgmt/gameConfigInfo/index.vue"),
      hidden: true,
      name: "gameConfigInfo",
      meta: {
        title: "牌局配置信息",
      },
    },
  ],
};
