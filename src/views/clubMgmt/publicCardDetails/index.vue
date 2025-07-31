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
            <template #boards="{ row }">
                {{ countPublicCards(row.boards) }}
            </template>
            <template #option="{ row }">
                <el-button type="primary" link @click="details(row.roundId)">详情</el-button>
            </template>
        </Table>
        <!-- 详情弹框 -->
        <el-dialog v-model="state.detailsShow" title="公牌详情" width="1300">
            <el-table :data="state.detailsTableData" border style="width: 100%">
                <el-table-column prop="position" label="座位号" align="center" />
                <el-table-column prop="userId" label="用户ID" align="center" />
                <el-table-column prop="userName" label="昵称" align="center" />
                <el-table-column label="手牌" align="center">
                    <template #default="{ row }">
                        {{ countPublicCards(row.hands) }}
                    </template>
                </el-table-column>
                <el-table-column prop="water" label="抽水" align="center" />
                <el-table-column prop="safe" label="保险" align="center" />
                <el-table-column prop="betTotal" label="盈亏" align="center" />
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { dayjs, ElMessage } from "element-plus";
import { countPublicCards } from '@/utils/utils';
import { getPublicCardList, getPublicCardDetail } from "@/api/page/pokerMgmt.js";
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
        prop: "roundId",
        align: "center",
        label: "轮号",
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
        prop: "dealer",
        align: "center",
        label: "Dealer位",
        width: "110",
    },
    {
        prop: "sb",
        align: "center",
        label: "小盲位",
        width: "100",
    },
    {
        prop: "bb",
        align: "center",
        label: "大盲位",
        width: "100",
    },
    {
        prop: "maxBet",
        align: "center",
        label: "池子信息",
        width: "100",
    },
    {
        prop: "bringIn",
        align: "center",
        label: "总带入",
        width: "160",
    },
    {
        prop: "boards",
        align: "center",
        label: "公牌",
        width: "auto",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "140",
    }
]

const state = reactive({
    formData: {
        page: 1,
        size: 10,
        tableId: route.query.tableId,
    },//搜索参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
    detailsShow: false,//详情弹窗
    detailsTableData: [],//详情表格数据
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getPublicCardList(state.formData);
        state.tableData = res.roundBoards;
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

// 详情弹窗
const details = async (roundId) => {
    state.detailsShow = true;
    const res = await getPublicCardDetail({
        roundId,
        tableId: route.query.tableId
    })
    state.detailsTableData = res.userDataList
}



getData();

</script>

<style lang="scss" scoped></style>