<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" :selectData="state.selectData" />
            </template>
            <template #status="{ row }">
                {{ getDictLabel('gameVideoStatus', row.status) }}
            </template>
            <template #roundnumber="{ row }">
                <div>ID:{{ row.roundnumber }}</div>
            </template>
            <template #tabletype="{ row }">
                {{ getDictLabel('gameVideoType', row.tabletype) }}
            </template>
            <template #gameLobbyCn="{ row }">
                <div>{{ row.gameLobbyCn }}{{ row.tablename.split("#")[1] }}</div>
            </template>
            <template #option="{ row }">
                <el-button type="primary" link @click="detailsBtn(row)">详情</el-button>
            </template>
            <template #datetime="{ row }">
                {{ dayjs(row.datetime).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
        </Table>
        <el-dialog v-model="state.detailsShow" title="投注详情" width="90%">
            <Table :data="state.detailData" :columns="detailColumns" :page="state.detailFrom.page"
                :size="state.detailFrom.size" :total="state.detailTotal" @pagination="changePageSize"
                :loading="state.detailLoading">
                <template #status="{ row }">
                    {{ getDictLabel('gameVideoStatus', row.status) }}
                </template>
                <template #roundnumber="{ row }">
                    <div>ID:{{ row.roundnumber }}</div>
                </template>
                <template #tabletype="{ row }">
                    {{ getDictLabel('gameVideoType', row.tabletype) }}
                </template>
                <template #gameLobbyCn="{ row }">
                    <div>{{ row.gameLobbyCn }}{{ row.tablename.split("#")[1] }}</div>
                </template>
                <template #option="{ row }">
                    <el-button type="primary" link @click="detailsBtn(row)">详情</el-button>
                </template>
            </Table>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getDictLabel } from '@/utils/dict';
import { dayjs, ElMessage, ElMessageBox } from "element-plus";
import { getChannelRetList, getBetList } from "@/api/page/liveCasino.js";



const columns = [
    {
        prop: "userId",
        align: "center",
        label: "用户ID",
        width: "120",
    },
    {
        prop: "account",
        align: "center",
        label: "平台用户昵称",
        width: "120",
    },
    {
        prop: "datetime",
        align: "center",
        label: "结算时间",
        width: "180",
    },
    {
        prop: "status",
        align: "center",
        label: "状态",
        width: "120",
    },
    {
        prop: "bet",
        align: "center",
        label: "本局押分",
        width: "120",
    },
    {
        prop: "amount",
        align: "center",
        label: "本局得分",
        width: "120",
    },
    {
        prop: "win",
        align: "center",
        label: "结算金额",
        width: "120",
    },
    {
        prop: "validbet",
        align: "center",
        label: "有效投注",
        width: "120",
    },
    {
        prop: "rake",
        align: "center",
        label: "抽水金额",
        width: "120",
    },
    {
        prop: "roomfee",
        align: "center",
        label: "开房费用",
        width: "120",
    },
    {
        prop: "roundnumber",
        align: "center",
        label: "局号",
        width: "130",
    },
    {
        prop: "tabletype",
        align: "center",
        label: "游戏类型",
        width: "120",
    },
    {
        prop: "gameLobbyCn",
        align: "center",
        label: "桌台名称",
        width: "120",
    },
    {
        prop: "tableid",
        align: "center",
        label: "桌台ID",
        width: "120",
    },
    {
        prop: "mtcode",
        align: "center",
        label: "交易代码",
        width: "200",
    },
    {
        prop: "round",
        align: "center",
        label: "游戏回合编号",
        width: "120",
    },
    {
        prop: "gamecode",
        align: "center",
        label: "厂商游戏代码",
        width: "120",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "auto",
        fixed: "right",
    }
]

const detailColumns = [
    { prop: "userId", align: "center", label: "玩家ID", width: "auto" },
    { prop: "status", align: "center", label: "状态", width: "auto" },
    { prop: "datetime", align: "center", label: "投注时间", width: "auto" },
    { prop: "amount", align: "center", label: "投注金额", width: "auto" },
    { prop: "ip", align: "center", label: "客户端IP", width: "auto" },
    { prop: "tabletype", align: "center", label: "游戏类型", width: "auto" },
    { prop: "gameLobbyCn", align: "center", label: "桌台名称", width: "auto" },
    { prop: "tableid", align: "center", label: "桌台ID", width: "auto" },
    { prop: "gamecode", align: "center", label: "厂商游戏代码", width: "auto" },
    { prop: "mtcode", align: "center", label: "交易代码", width: "auto" },
    { prop: "round", align: "center", label: "游戏回合编号", width: "auto" },
]
const state = reactive({
    formData: {
        page: 1,
        size: 10,
    },//搜索参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
    detailLoading: false,//加载状态
    selectData: 0,//选择的数据
    detailsShow: false,//详情弹窗
    detailData: [],//投注列表
    detailFrom: {
        page: 1,
        size: 10,
        userId: '',
        round: '',
    },//投注请求
    detailTotal: 0,
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getChannelRetList(state.formData);
        state.tableData = res.records;
        state.total = res.total;
        state.selectData = res.totalValidbet;
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

// 详情页页数/条数切换
const changePageSize = (e) => {
    state.detailFrom.page = e.page;
    state.detailFrom.size = e.size;
    getDetailList();
};

// 详情
const detailsBtn = (row) => {
    state.detailFrom.round = row.round;
    state.detailFrom.userId = row.userId;
    state.detailsShow = true;
    getDetailList();
}

const getDetailList = async () => {
    const res = await getBetList(state.detailFrom);
    state.detailData = res.records;
    state.detailTotal = res.total;

}


getData();
</script>

<style lang="scss" scoped>
.card {
    width: calc((100% - 40px)/3);

    :deep(.el-card__body) {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>