<template>
    <div class="home" :class="{ 'hideSidebar': menuState }" ref='el'>
        <leftNav class="home_NavMenu"></leftNav>
        <div class="home_container">
            <rightTop ></rightTop>
            <tagsView></tagsView>
            <AppMain></AppMain>
        </div>
    </div>
</template>

<script setup >
import leftNav from './left_nav.vue';
import rightTop from './right_top.vue';
import AppMain from './app_main.vue';
import tagsView from './tags_view.vue';
import { storeToRefs } from 'pinia';
import { settingStore } from '@/stores/settings';
const settingInfo = settingStore();
const { menuState } =storeToRefs(settingInfo)

</script>

<style scoped lang="scss">
.home {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    .home_NavMenu {
        width: 200px;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        transition: width 0.28s;
    }

    .home_container {
        margin-left: 200px;
        transition: margin-left 0.28s;
        position: relative;
        display: flex;
        flex: 1;
        width: calc(100% - 200px);
        flex-direction: column;
        height: 100%;
       
    }


}

.hideSidebar {
    .home_NavMenu {
        width: 80px !important;
    }

    .home_container {
        height: 100%;
        width:calc(100% - 80px);
        margin-left: 80px;
    }

    .sidebar-logo-container {
        position: relative;
        width: 80px !important;

        .sidebar-logo {
            margin-left: 25px;
        }

        div {
            display: none;
        }
    }

    .SidebarItem {
        .item_icon {
            margin-right: 0px;
        }

        span {
            font-size: 0px;
        }

        .el-submenu__icon-arrow {
            display: none !important;
        }
    }
}
</style>