<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #startTime="{ row }">
                {{ row.startTime ? dayjs(row.startTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
            </template>
            <template #endTime="{ row }">
                {{ row.endTime ? dayjs(row.endTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { dayjs, ElMessage } from "element-plus";
import { getRoomSettleInfo } from "@/api/page/pokerMgmt.js";
import { useRoute } from 'vue-router';
const route = useRoute();

const columns = [
    {
        prop: "tableId",
        align: "center",
        label: "牌桌ID",
        width: "160",
    },
    {
        prop: "userId",
        align: "center",
        label: "用户ID",
        width: "160",
    },
    {
        prop: "userName",
        align: "center",
        label: "昵称",
        width: "160",
    },
    {
        prop: "startTime",
        align: "center",
        label: "开始时间",
        width: "160",
    },
    {
        prop: "endTime",
        align: "center",
        label: "结束时间",
        width: "160",
    },
    {
        prop: "totalBet",
        align: "center",
        label: "总输赢",
        width: "160",
    },
    {
        prop: "roundNum",
        align: "center",
        label: "游戏手数",
        width: "160",
    },
    {
        prop: "safe",
        align: "center",
        label: "保险盈亏",
        width: "160",
    },
    {
        prop: "service",
        align: "center",
        label: "抽水",
        width: "160",
    },
    {
        prop: "bringIn",
        align: "center",
        label: "总带入",
        width: "160",
    },
    {
        prop: "bringInCount",
        align: "center",
        label: "带入次数",
        width: "160",
    },
    {
        prop: "lieTu",
        align: "center",
        label: "猎兔费用",
        width: "160",
    },
    {
        prop: "seeHands",
        align: "center",
        label: "偷偷看牌费用",
        width: "160",
    },
    {
        prop: "delay",
        align: "center",
        label: "延时费用",
        width: "160",
    },
    {
        prop: "expression",
        align: "center",
        label: "互动表情费用",
        width: "160",
    }
]

const state = reactive({
    formData: {
        page: 1,
        size: 10,
        tableId: route.query.tableId,
        tableStatus: false,
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
        const res = await getRoomSettleInfo(state.formData);
        state.tableData = res.userDataList;
        state.total = 0;
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