<template>
    <div class="appMainFix">
      <router-view class="router-view" v-slot="{Component}">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="visitedViews">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>

  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { tagsViewStore } from '@/stores/tagsView';
const tagsViewInfo = tagsViewStore();
const { visitedViews } =storeToRefs(tagsViewInfo)

</script>

<style scoped lang="scss">
.appMainFix {
  > ::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 0px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  > ::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: var(--theme);
  }

  > ::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 3px;
    background: #ededed;
  }
}

.appMainFix {
  // overflow-x: hidden;
  background-color: var(--prism-background);
  padding: 20px;
  flex: 1;
  display: flex;
  overflow: auto;

  .router-view {
    padding: 20px;
    background-color: var(--prism-background_box);
    flex: 1;
    overflow-x: hidden;
    box-sizing: border-box;
    box-shadow: 0px 0px 12px rgba(0,0,0,0.12);
  }
}

</style>