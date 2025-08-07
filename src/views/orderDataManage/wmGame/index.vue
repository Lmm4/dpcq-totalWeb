<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #setTime="{ row }">
                <div>{{ dayjs(row.wmBetLog?.setTime).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
            <template #round="{ row }">
                <div>{{ row.wmBetLog?.round }}-{{ row.wmBetLog?.subround }}</div>
            </template>
            <template #fullName="{ row }">
                <div>{{ row.userInfoDTO.fullName.join(',') }}</div>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getWMOrderDataList } from "@/api/page/orderDataManage.js";
import { getDict, getDictLabel } from '@/utils/dict';
import { dayjs } from "element-plus";


const columns = [
    { prop: "userInfoDTO.userId", align: "center", label: "用户ID", width: "auto" },
    { prop: "userInfoDTO.username", align: "center", label: "用户账号", width: "auto" },
    { prop: "wmBetLog.gameName", align: "center", label: "游戏类型", width: "auto" },
    { prop: "wmBetLog.event", align: "center", label: "局号", width: "180" },
    { prop: "wmBetLog.tableId", align: "center", label: "桌台ID", width: "auto" },
    { prop: "wmBetLog.bet", align: "center", label: "本局压分", width: "auto" },
    { prop: "wmBetLog.winLoss", align: "center", label: "本局得分", width: "auto" },
    { prop: "wmBetLog.validBet", align: "center", label: "有效投注额", width: "140" },
    { prop: "setTime", align: "center", label: "结算时间", width: "180" },
    { prop: "round", align: "center", label: "游戏回合编号", width: "180" },
    { prop: "wmBetLog.ip", align: "center", label: "客户端IP", width: "140" },
    { prop: "fullName", align: "center", label: "(大股东/股东/代理)", width: "180" },
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
        const res = await getWMOrderDataList(state.formData);
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