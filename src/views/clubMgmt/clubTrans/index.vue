<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getClubBillFlow } from "@/api/page/clubMgmt.js";

const columns = [
    {
        prop: "clubId",
        align: "center",
        label: "俱乐部ID",
        width: "auto",
    },
    {
        prop: "clubName",
        align: "center",
        label: "俱乐部名称",
        width: "auto",
    },
    {
        prop: "type",
        align: "center",
        label: "交易类型",
        width: "auto",
    },
    {
        prop: "relation",
        align: "center",
        label: "交易对象",
        width: "auto",
    },
    {
        prop: "balanceChange",
        align: "center",
        label: "资金变动",
        width: "260",
    },
    {
        prop: "balanceAfter",
        align: "center",
        label: "钱包余额",
        width: "auto",
    },
    {
        prop: "createTime",
        align: "center",
        label: "日期时间",
        width: "auto",
    }
]

const state = reactive({
    formData: {
        page: 1,
        size: 10,
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
        const res = await getClubBillFlow(state.formData);
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