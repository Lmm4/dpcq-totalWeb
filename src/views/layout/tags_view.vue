<template>
  <div class="tagView">
    <el-scrollbar :class="[show ? 'tagView_scroll' : 'tagView_scroll2']" @scroll="handleScroll">
      <router-link class="tags-view-item" v-for="(item, index) in tagsViewInfo.visitedViews"
        :class="isActive(item) ? 'active' : ''" :key="index"
        :to="{ path: item.path, params: item.params, name: item.name }"
        @click.middle="!isAffix(item) ? delTag(item) : ''" @contextmenu.prevent="openMenu(item, $event, true)">
        <el-icon v-if="isActive(item)" :class="refreshIcon ? 'animationActive' : ''" @click="iconRefresh(item, $event)">
          <RefreshRight />
        </el-icon>
        <span class="tags-view-item-name">{{
          item.meta.title || item.name
        }}</span>
        <span class="el-icon-close" v-if="!isAffix(item)">
          <el-icon :size="14" @click.prevent.stop="delTag(item)">
            <Close />
          </el-icon>
        </span>
      </router-link>
    </el-scrollbar>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li v-if="!isAffix(selectedTag)" @click="delTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { tagsViewStore } from "@/stores/tagsView";
const tagsViewInfo = tagsViewStore();
const instance = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const show = ref(true);
const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref([]);
const refreshIcon = ref(false);

watch([visible, route], (value) => {
  value[0]
    ? document.body.addEventListener("click", closeMenu)
    : document.body.removeEventListener("click", closeMenu);
  value[1] ? addTags() : "";
});
// 添加标签
const addTags = () => {
  const { name } = route;
  if (name) {
    tagsViewInfo.addView(route);
    show.value = false;
    let time = setTimeout(() => {
      show.value = true;
      clearTimeout(time);
    }, 100);
  }
};
// 是否是当前页面
const isActive = (value) => {
  return value.path === route.path;
};
//是否是默认首页
const isAffix = (tag) => {
  return tag.meta && tag.meta.affix;
};

//改变标签
const changeTag = (route) => {
  router.push({
    name: route.name,
    params: route.params,
  });
};

//删除标签
const delTag = (route) => {
  tagsViewInfo.delView(route).then(({ visitedViews }) => {
    if (isActive(route)) {
      //关闭当前页
      toLastView(visitedViews, route);
    }
  });
};

const toLastView = (visitedViews, route) => {
  const latestView = visitedViews.slice(-1)[0];
  if (latestView) {
    //跳转到上一页
    router.push({
      name: latestView.name,
      params: latestView.params,
    });
  }
};
/** 打开右键菜单面板 */
const openMenu = (item, e, visable) => {
  const menuMinWidth = 105;
  // 当前组件距离浏览器左端的距离
  const offsetLeft = instance.proxy.$el.getBoundingClientRect().left;
  // 当前组件宽度
  const offsetWidth = instance.proxy.$el.offsetWidth;
  // 面板的最大左边距
  const maxLeft = offsetWidth - menuMinWidth;
  // 面板距离鼠标指针的距离
  const left15 = e.clientX - offsetLeft + 15;
  left.value = left15 > maxLeft ? maxLeft : left15;
  top.value = e.clientY;
  // 显示面板
  visible.value = visable;
  // 更新当前正在右键操作的标签页
  selectedTag.value = item;
};
const iconRefresh = (item, e) => {
  // router.go(0)
  setTimeout(async () => {
    await openMenu(item, e, false);
    await refreshSelectedTag(selectedTag.value, item);
  }, 100);
};

const refreshSelectedTag = (view, item) => {
  tagsViewInfo.delCachedView(view).then(() => {
    refreshIcon.value = true;
    let time = setTimeout(() => {
      refreshIcon.value = false;
      clearTimeout(time);
      router.replace({
        path: "/redirect" + view.path,
        query: item.query,
      });
    }, 500);
  });
};
// 关闭其他
const closeOthersTags = () => {
  router.push(selectedTag.value);
  tagsViewInfo.delOthersViews(selectedTag.value);
};
// 关闭所有
const closeAllTags = () => {
  tagsViewInfo.delAllViews().then(({ visitedViews }) => {
    router.push({
      name: visitedViews[0].name,
      params: visitedViews[0].params,
    });
  });
};
/** 关闭右键菜单面板 */
const closeMenu = () => {
  visible.value = false;
};
const handleScroll = () => {
  closeMenu();
};

onMounted(() => {
  addTags();
});
</script>

<style scoped lang="scss">
.tagView {
  height: 34px;
  width: 100%;
  background: var(--prism-line-highlight-background);
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .tagView_scroll {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 34px;

    .el-scrollbar__bar {
      bottom: 0px;
    }

    :deep(.el-scrollbar__wrap) {
      height: 34px;
      display: flex;
      align-items: center;

      .el-scrollbar__view {
        display: flex;
        align-items: center;
      }
    }
  }

  .tagView_scroll2 {
    width: 100%;
    height: 34px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;

    .el-scrollbar__bar {
      bottom: 0px;
    }

    :deep(.el-scrollbar__wrap) {
      height: 34px;
      display: flex;
      align-items: center;

      .el-scrollbar__view {
        display: flex;
        align-items: center;
      }
    }
  }

  :deep(.tags-view-item) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid var(--tag);
    color: var(--auto);
    background: var(--pris-add);
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    text-decoration: none;

    .tags-view-item-name {
      padding: 0 5px 0 5px;
    }

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;
    }

    .el-icon-close {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      line-height: 26px;
      text-align: center;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }

    .animationActive {
      animation: loading-rotate 0.5s linear infinite;
    }

    @keyframes loading-rotate {
      100% {
        transform: rotate(360deg);
      }
    }
  }

  .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
