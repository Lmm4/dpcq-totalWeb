<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #gameType="{ row }">
                <div>{{ getDictLabel('fgGameType', row.gameType) }}</div>
            </template>
            <template #betTime="{ row }">
                <div>{{ dayjs(row.betTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getFGOrderDataList } from "@/api/page/orderDataManage.js";
import { getDict, getDictLabel } from '@/utils/dict';
import { dayjs } from "element-plus";


const columns = [
    { prop: "userId", align: "center", label: "用户ID", width: "140" },
    { prop: "username", align: "center", label: "用户账号", width: "140" },
    { prop: "gameType", align: "center", label: "游戏类型", width: "140" },
    { prop: "deviceName", align: "center", label: "设备名", width: "140" },
    { prop: "endChips", align: "center", label: "结束筹码", width: "140" },
    { prop: "allBets", align: "center", label: "总投注", width: "140" },
    { prop: "result", align: "center", label: "总输赢", width: "140" },
    { prop: "allWins", align: "center", label: "总奖金", width: "140" },
    { prop: "jackpotBonus", align: "center", label: "jackpot 奖金", width: "140" },
    { prop: "betTime", align: "center", label: "投注时间", width: "180" },
    { prop: "totalBets", align: "center", label: "总下注", width: "140" },
    { prop: "roundId", align: "center", label: "牌局ID", width: "140" },
    { prop: "typeName", align: "center", label: "捕鱼场景", width: "140" },
    { prop: "bulletCount", align: "center", label: "子弹个数", width: "140" },
    { prop: "startChips", align: "center", label: "开始筹码", width: "140" },
    { prop: "parentName", align: "center", label: "(大股东/股东/代理)", width: "180" },
]

const state = reactive({
    formData: {
        page: 1,
        size: 10
    },//搜索参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getFGOrderDataList(state.formData);
        state.tableData = res.records;
        state.total = res.total;
    } finally {
        state.loading = false;
    }
};
// 页数/条数切换
const changePage = (e) => {
    state.formData.page = e.page;
    state.formData.size = e.size;
    getData();
};

getData();

</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped></style>