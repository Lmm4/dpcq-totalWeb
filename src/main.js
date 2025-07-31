import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "./permission";
import router from "@/router"; //1. 引入路由对象
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import piniaPluginPersist from "pinia-plugin-persist";
import { createPinia } from "pinia";
import SvgIcon from "@/components/SvgIcon.vue";
import "virtual:svg-icons-register";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.component("Svg-icon", SvgIcon);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});

app.use(router); //2. 使用路由对象
app.mount("#app");
