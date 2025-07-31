export default {
  path: "/productMgmt",
  component: () => import("@/views/productMgmt/index.vue"),
  hidden: true,
  name: "productMgmt",
  meta: {
    title: "商品管理",
  },
};
