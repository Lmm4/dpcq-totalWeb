<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading" :expandConfig="expandConfig">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #gameType="{ row }">
                <div>{{ getDictLabel('dbPeopleGameType', row.dbGamePayout.gameTypeId) }}</div>
            </template>
            <template #payoutTime="{ row }">
                <div>{{ dayjs(row.dbGamePayout?.payoutTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
            <template #transferType="{ row }">
                <div>{{ getDictLabel('businessType', row.dbGamePayout?.transferType) }}</div>
            </template>
            <template #fullName="{ row }">
                <div>{{ row.userInfo.fullName.join(',') }}</div>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getDBOrderDataList } from "@/api/page/orderDataManage.js";
import { getDict, getDictLabel } from '@/utils/dict';
import { dayjs } from "element-plus";
const expandConfig = {
    show: true,
    prop: 'dbBetList',
    columns: [
        { label: '交易单号', prop: 'transferNo', align: 'center' },
        { label: '下注总金额正数', prop: 'betTotalAmount', align: 'center' },
        { label: '下注操作过后的余额', prop: 'betAfterAmount', align: 'center' },
        { label: '下注时间', prop: 'betTime', align: 'center', isTime: true }
    ]
};

const columns = [
    { prop: "userInfo.userId", align: "center", label: "用户ID", width: "auto" },
    { prop: "userInfo.username", align: "center", label: "用户账号", width: "auto" },
    { prop: "gameType", align: "center", label: "游戏类型", width: "auto" },
    { prop: "payoutTime", align: "center", label: "派彩时间", width: "auto" },
    { prop: "dbGamePayout.roundNo", align: "center", label: "局号", width: "auto" },
    { prop: "dbGamePayout.payoutAmount", align: "center", label: "派彩金额", width: "auto" },
    { prop: "dbGamePayout.payoutAfterAmount", align: "center", label: "派彩过后的金额", width: "auto" },
    { prop: "transferType", align: "center", label: "业务类型", width: "auto" },
    { prop: "fullName", align: "center", label: "(大股东/股东/代理)", width: "180" },
    { prop: "dbGamePayout.transferNo", align: "center", label: "交易单号", width: "auto" },
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
        const res = await getDBOrderDataList(state.formData);
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