<template>
    <el-tabs v-model="state.activeName">
        <!-- <el-tab-pane label="牌局配置信息">
            <GameConfig />
        </el-tab-pane> -->
        <el-tab-pane label="牌局结算信息" :name="0">
            <GameSettlement v-if="state.activeName == 0" />
        </el-tab-pane>
        <el-tab-pane label="公牌详情" :name="1">
            <PublicCardDetails v-if="state.activeName == 1" />
        </el-tab-pane>
    </el-tabs>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import GameConfig from "./gameConfig.vue";
import GameSettlement from "./gameSettlement.vue";
import PublicCardDetails from "./publicCardDetails.vue";
const state = reactive({
    activeName: 0
})
</script>

<style lang="scss" scoped></style>
