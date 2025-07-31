import router from "./router/index";
import NProgress from "nprogress"; //
import { tagsViewStore } from "./stores/tagsView";
import { localGet } from "@/utils/local.js";

import "nprogress/nprogress.css";

const whiteList = ["/", "/login", "/404"]; //重定向白名单
NProgress.configure({
  showSpinner: false,
}); // 进度条配置
router.beforeEach(async (to, _from, next) => {
  //开启进度条
  NProgress.start();
  const tagsViewInfo = tagsViewStore();
  //获取配置信息
  //获取token,确认用户是否已登录
  // removeToken()
  const hasToken = localGet("tokenObject")?.token;
  if (whiteList.indexOf(to.path) !== -1) {
    //在登录白名单中，直接进入
    // console.log('在登录白名单中，直接进入',)
    next();
  } else {
    if (hasToken) {
      if (to.path === "/") {
        //如果已登录，则重定向到主页
        next({
          name: "index",
        });
        NProgress.done();
      } else {
        if (to.matched.length == 0) {
          next("/404");
        } else {
          //如果缓存中存在，就用缓存中的路由，因为缓存的路由信息存在参数
          // let nextRouter = store.state.tagsView.visitedViews.find(item => item.path == to
          // 	.path)
          if (to.params && Object.keys(to.params).length > 0) {
            //路由存在参数，直接跳转
            next();
          } else {
            //路由不存在参数，检查缓存中是否存在相同路由，并检查相同路由中是否携带参数
            let nextRouter = tagsViewInfo.visitedViews.find((item) => {
              item.path == to.path;
            });
            if (
              nextRouter?.params &&
              Object.keys(nextRouter.params).length > 0
            ) {
              //缓存中存在参数，使用缓存路由
              next({ ...nextRouter });
            } else {
              //缓存中不存在参数，使用原始路由
              next();
            }
          }
        }
      }
    } else {
      console.log("其他没有访问权限的页面被重定向到登录页面");
      //其他没有访问权限的页面被重定向到登录页面。
      next(`/`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
