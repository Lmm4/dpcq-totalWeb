<template>
    <div>
        <el-tabs v-model="state.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="特效列表" :name="0">
                <specialEffects />
            </el-tab-pane>
            <!-- <el-tab-pane label="装扮列表" :name="1">
                <dressUpList :apiUrl="'24.44.23.15:8080'" />
            </el-tab-pane>
            <el-tab-pane label="道具列表" :name="2">
                <propList :apiUrl="'24.44.23.15:8080'" />
            </el-tab-pane>
            <el-tab-pane label="游戏商品数据统计" :name="3">
                <productStatistics />
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import specialEffects from "./specialEffectsList.vue";
const state = reactive({
    activeName: 0,
});
</script>

<style lang="scss" scoped></style>