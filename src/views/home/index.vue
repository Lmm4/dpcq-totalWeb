<template>
    <div class="index">
        <el-row :gutter="20" justify="space-between">
            <el-col :span="12">
                <el-card class="mb20" style="width: 100%;">
                    <div class="tc f20 fw6 mt20 mb20">
                        <el-statistic :value="outputValue">
                            <template #title>
                                <div class="f20 fw6 tc">
                                    <div>平台充提总额</div>
                                    <p class="f12">(总充值-总提现)</p>
                                </div>
                            </template>
                        </el-statistic>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="mb20 ">
                    <div class="tc f20 fw6 mt20 mb20">
                        <el-statistic :value="outputValue">
                            <template #title>
                                <div class="f20 fw6 tc">
                                    <div>平台利润总额</div>
                                    <p class="f12">(总抽水+总增值费+其他费用+保险费用+保险盈亏)</p>
                                </div>
                            </template>
                        </el-statistic>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup>
import { useTransition } from '@vueuse/core';
import { reactive, ref } from 'vue';

const source = ref(0);
const outputValue = useTransition(source, {
    duration: 1500,
})
source.value = 172000
</script>

<style lang="scss" scoped></style>