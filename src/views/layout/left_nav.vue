<template>
  <div class="left_nav">
    <div class="nav_head">
      <h3 class="title dfcc" v-if="!menuState"><img class="nav_head_img" src="@/assets/logo.png" /><span
          class="ml10">德扑传奇后台</span></h3>
      <img v-else class="nav_head_img mt10" src="@/assets/logo.png" />
    </div>
    <el-menu router @select="selectMenu" :default-active="defaultActive" class="el-menu" background-color="#333"
      unique-opened :collapse="menuState" text-color="#fff">
      <el-menu-item index="index">
        <SvgIcon name="home"></SvgIcon>
        <template #title>
          <span class="ml10">首页</span>
        </template>
      </el-menu-item>
      <template v-for="(v, i) in state.menu" :key="i">
        <el-sub-menu v-if="v.hasChildren" :index="v.id">
          <template #title>
            <SvgIcon :name="v.icon"></SvgIcon>
            <span class="ml10">{{ v.name }}</span>
          </template>
          <el-menu-item v-for="(item, index) in v.children" :key="index" :index="item.id">
            <span class="dfc">{{ item.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="v.id">
          <SvgIcon :name="v.icon"></SvgIcon>
          <template #title>
            <span class="ml10">{{ v.name }}</span>
          </template>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch, reactive } from "vue";
import { settingStore } from "@/stores/settings";
import { permissionStore } from "@/stores/permission.js";
import { useRoute } from "vue-router";
import { constantRouterMap } from "@/router/index.js";
const permissionInfo = permissionStore();

const route = useRoute();
const settingInfo = settingStore();
const { menuState } = storeToRefs(settingInfo);
const defaultActive = ref("");

watch(route, (value) => {
  defaultActive.value = value.name;
});

const state = reactive({
  menu: [
    {
      id: "systemSet",
      icon: "set",
      name: "系统设置",
      hasChildren: true,
      children: [
        {
          id: "roleMgmt",
          name: "角色管理",
        },
        {
          id: "sysMaint",
          name: "系统维护",
        },
        {
          id: "gameSet",
          name: "游戏设定",
        },
        {
          id: "downloadLink",
          name: "下载链接",
        },
        {
          id: "currencyMgmt",
          name: "货币配置",
        }
      ]
    },
    {
      id: "vipMgmt",
      icon: "vip",
      name: "会员管理",
      hasChildren: true,
      children: [
        {
          id: "vipList",
          name: "会员列表",
        },
        // {
        //   id: "blackList",
        //   name: "黑名单列表",
        // }
      ]
    },
    {
      id: "pokerMgmt",
      icon: "pokerMgmt",
      name: "牌局管理",
      hasChildren: true,
      children: [
        {
          id: "texasHoldem",
          name: "德州牌局管理",
        },
        {
          id: "shortDeck",
          name: "短牌牌局管理",
        },
        {
          id: "aofTexas",
          name: "AOF德州牌局管理",
        },
        {
          id: "aofShortDeck",
          name: "AOF短牌牌局管理",
        }
      ]
    },
    {
      id: "clubMgmt",
      icon: "clubs",
      name: "俱乐部管理",
      hasChildren: true,
      children: [
        {
          id: "clubList",
          name: "俱乐部列表",
        },
        {
          id: "clubTrans",
          name: "俱乐部交易流水",
        },
        // {
        //   id: "clubBgList",
        //   name: "背景图列表",
        // }
      ]
    },
    {
      id: "financeMgmt",
      icon: "finance",
      name: "财务管理",
      hasChildren: true,
      children: [
        {
          id: "rechargeMgmt",
          name: "充值管理",
        },
        {
          id: "withdrawMgmt",
          name: "提现管理",
        },
        {
          id: "platformRev",
          name: "平台收益账单",
        },
        {
          id: "platformColl",
          name: "平台归集账单",
        }
      ]
    },
    // {
    //   id: "productMgmt",
    //   icon: "product",
    //   name: "商品管理",
    //   hasChildren: false
    // },
    {
      id: "allianceMgmt",
      icon: "alliance",
      name: "联盟管理",
      hasChildren: false
    },
    {
      id: "channelRet",
      icon: "channel",
      name: "渠道留存",
      hasChildren: false
    },
    {
      id: "liveCasino",
      icon: "game",
      name: "视讯游戏",
      hasChildren: false
    },
    {
      id: "majorShareholderConfig",
      icon: "game",
      name: "大股东配置",
      hasChildren: false
    },
  ]
});



const selectMenu = () => { };
onMounted(() => {
  defaultActive.value = route.name;
  // state.menu = permissionInfo.routes;
});
</script>

<style lang="scss" scoped>
.left_nav {
  background-color: #333;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 3px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  &:-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: var(--prism-background_box);
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 3px;
    background: var(--prism-background_box);
  }

  .nav_head {
    display: flex;
    align-items: center;
    padding: 0 var(--el-menu-base-level-padding);

    .title {
      margin-top: 20px;
      text-align: center;
      color: #fff;
      width: 100%;
      font-size: 16px;
    }

    .nav_head_img {
      // border-radius: 50%;
      width: 32px;
      height: 32px;
    }
  }

  .menu_seach {
    padding: 0 10px;
    box-sizing: border-box;

    .el-autocomplete {
      width: 100%;
    }
  }

  .el-menu--collapse {
    width: 80px;

    .el-tooltip {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
    }

    .el-submenu__title {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      padding-right: 9px;
    }
  }

  ::v-deep(.el-menu) {
    height: 100%;
    border-right: none;

    .el-menu-item {
      display: flex;
      align-items: center;
    }

    .el-submenu__title {
      display: flex;
      padding-left: 9px;
      align-items: center;
    }
  }
}
</style>