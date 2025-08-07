<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #gameDate="{ row }">
                <div>{{ dayjs(row.gameDate).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
            <template #awardTime="{ row }">
                <div>{{ dayjs(row.awardTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { get9GOrderDataList } from "@/api/page/orderDataManage.js";
import { getDict, getDictLabel } from '@/utils/dict';
import { dayjs } from "element-plus";


const columns = [
    { prop: "userId", align: "center", label: "用户ID", width: "140" },
    { prop: "userName", align: "center", label: "用户账号", width: "140" },
    { prop: "gameName", align: "center", label: "游戏名称", width: "140" },
    { prop: "gameDate", align: "center", label: "游玩时间", width: "180" },
    { prop: "gameTypeName", align: "center", label: "游戏类型", width: "140" },
    { prop: "bet", align: "center", label: "投注金额", width: "140" },
    { prop: "validbet", align: "center", label: "有效投注", width: "140" },
    { prop: "win", align: "center", label: "游戏赢", width: "140" },
    { prop: "netWin", align: "center", label: "总输赢", width: "140" },
    { prop: "preAmount", align: "center", label: "转帐前金额", width: "140" },
    { prop: "aftAmount", align: "center", label: "转帐后金额", width: "140" },
    { prop: "awardTime", align: "center", label: "结算时间", width: "180" },
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
        const res = await get9GOrderDataList(state.formData);
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