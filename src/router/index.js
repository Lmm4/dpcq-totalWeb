import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/login/index.vue";
import layout from "@/views/layout/index.vue";
import home from "@/views/home/index.vue";

//自动注册路由
const requireRoutes = import.meta.glob("./modules/*.js", { eager: true });
let routeMap = [];
let routeMap1 = [];
for (const path in requireRoutes) {
  if (requireRoutes[path].default.children == undefined) {
    routeMap1.push(requireRoutes[path].default);
  } else {
    routeMap.push(requireRoutes[path].default);
  }
}
export const constantRouterMap = [
  ...routeMap,
  ...[
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/redirect",
      component: layout,
      name: "重定向",
      meta: {
        hidden: true,
      },
      children: [
        {
          path: "/index",
          name: "index",
          component: home,
          meta: {
            title: "首页",
            affix: true,
          },
        },
        ...routeMap1,
        {
          path: ":path(.*)",
          component: () => import("@/views/redirect/index.vue"),
        },
      ],
    },

    {
      path: "/404",
      component: () => import("@/views/error_page/404.vue"),
      meta: {
        title: "404",
      },
    },
  ],
];

const router = createRouter({
  //createWebHistory路由模式路径不带#号(生产环境下不能直接访问项目，需要nginx转发)
  //createWebHashHistory路由模式路径带#号
  history: createWebHistory(),
  routes: constantRouterMap,
  scrollBehavior: (_to, _from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        left: 0,
        top: 0,
      };
    }
  },
});
/** 重置路由 */
export function resetRouter() {
  const whiteList = ["/login", "/404"]; //重定向白名单
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      if (route.name && !whiteList.includes(route.name)) {
        router.hasRoute(route.name) && router.removeRoute(route.name);
      }
    });
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload();
  }
}

export default router; //导出
