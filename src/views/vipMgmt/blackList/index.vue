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
import { getLoginLogList } from "@/api/page/vipMgmt.js";

const columns = [
    {
        prop: "number",
        align: "center",
        label: "编号",
        width: "auto",
    },
    {
        prop: "id",
        align: "center",
        label: "用户ID",
        width: "auto",
    },
    {
        prop: "account",
        align: "center",
        label: "用户账号",
        width: "auto",
    },
    {
        prop: "userName",
        align: "center",
        label: "用户昵称",
        width: "auto",
    },
    {
        prop: "regIp",
        align: "center",
        label: "注册IP",
        width: "260",
    },
    {
        prop: "LastLoginTime",
        align: "center",
        label: "最后登录时间",
        width: "auto",
    },
    {
        prop: "LastLoginIp",
        align: "center",
        label: "最后登录IP",
        width: "auto",
    },
    {
        prop: "addBlackListTime",
        align: "center",
        label: "添加黑名单时间",
        width: "auto",
    },
    {
        prop: "addReason",
        align: "center",
        label: "添加原因",
        width: "auto",
    },
    {
        prop: "addRole",
        align: "center",
        label: "添加角色",
        width: "auto",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "auto",
    }
]

const state = reactive({
    formData: {
        page: 1,
        size: 10,
        userId: route.query.id
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
        const res = await getLoginLogList(state.formData);
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