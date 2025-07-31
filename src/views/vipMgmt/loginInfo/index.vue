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
import { useRoute } from 'vue-router';
import { getLoginLogList } from "@/api/page/vipMgmt.js";
const route = useRoute();

const columns = [
    {
        prop: "id",
        align: "center",
        label: "日志ID",
        width: "auto",
    },
    {
        prop: "userId",
        align: "center",
        label: "用户ID",
        width: "auto",
    },
    {
        prop: "loginTime",
        align: "center",
        label: "登录时间",
        width: "auto",
    },
    {
        prop: "ip",
        align: "center",
        label: "登录IP",
        width: "auto",
    },
    {
        prop: "ipAddr",
        align: "center",
        label: "IP地址信息",
        width: "260",
    },
    {
        prop: "gps",
        align: "center",
        label: "GPS",
        width: "auto",
    },
    {
        prop: "gpsAddr",
        align: "center",
        label: "GPS地址",
        width: "auto",
    },
    {
        prop: "device",
        align: "center",
        label: "设备信息",
        width: "auto",
    },
    {
        prop: "deviceOs",
        align: "center",
        label: "操作系统",
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