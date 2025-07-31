import { defineStore } from "pinia";
export const tagsViewStore = defineStore("tagsViewInfo", {
  // 开启数据缓存
  persist: {
    enabled: true,
  },
  state: () => {
    return {
      visitedViews: [], //已缓存路由
      cachedViews: [],
    };
  },
  actions: {
    addView(view) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    delView(view) {
      return new Promise((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersViews(view) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
        });
      });
    },
    // 删除所有
    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },

    addVisitedView(view) {
      const index = this.visitedViews.findIndex((v) => v.path == view.path);
      if (index != -1) {
        this.visitedViews[index].params = view.params;
      } else {
        let temp = this.visitedViews;

        //添加当前页
        temp.push({
          fullPath: view.fullPath,
          hash: view.hash,
          // matched: view.matched,  暂不使用，使用会报错
          meta: view.meta,
          name: view.name,
          path: view.path,
          query: view.query,
          params: view.params,
        });
        //获取默认页
        let affixRoute = temp.filter((item) => item.meta && item.meta.affix);
        //获取非默认页
        temp = temp.filter((item) => !(item.meta && item.meta.affix));
        //组合tagView 默认页在前，其他页面在后面
        this.visitedViews = [...affixRoute, ...temp];
      }
    },
    addCachedView(view) {
      if (this.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name);
      }
    },
    delVisitedView(view) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...this.visitedViews]);
      });
    },
    delCachedView(view) {
      return new Promise((resolve) => {
        // console.log(this.cachedViews);
        const index = this.cachedViews.indexOf(view.name);
        index > -1 && this.cachedViews.splice(index, 1);
        resolve([...this.cachedViews]);
      });
    },
    delOthersVisitedViews(view) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta.affix || v.path === view.path;
        });
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersCachedViews(view) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name);
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1);
        } else {
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllVisitedViews() {
      const affixTags = this.visitedViews.filter((tag) => tag.meta.affix);
      this.visitedViews = affixTags;
    },
    delAllCachedViews() {
      this.cachedViews = [];
    },
  },
});
