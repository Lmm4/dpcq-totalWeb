<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #dataStatistics>
                <div class="dfc mb20">
                    <el-card class="card mr20">
                        <div>根据所选的时间查看该时间段内提现的总金额(包括复充)</div>
                        <div class="mt10">{{ state.totalData.withdrawTotal }}</div>
                    </el-card>
                    <el-card class="card mr20">
                        <div>提现钱包当前余额(实时)</div>
                        <div class="mt10">{{ state.totalData.walletBalance }}</div>
                    </el-card>
                    <el-card class="card">
                        <div>提现钱包主币余额(实时)</div>
                        <div class="mt10">{{ state.totalData.walletMainBalance }}</div>
                    </el-card>
                </div>
            </template>
            <!-- <template #createTime="{ row }">
                {{ dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            </template> -->
            <template #status="{ row }">
                {{ getDictLabel("orderStatus", row.status) }}
            </template>
            <template #auditorInit="{ row }">
                <div v-if="row.preStatus === 'none'">
                    <el-button type="success" @click="preCheckAgreeBtn(row.id)">通过</el-button>
                    <el-button type="danger" @click="preCheckRefuseBtn(row.id)">拒绝</el-button>
                </div>
                <div v-else>
                    {{ row.preCheckBy }} {{ row.preStatus == 'pass' ? "操作通过" : "操作拒绝" }}
                </div>
            </template>
            <template #auditorEnd="{ row }">
                <div v-if="row.finalStatus == 'none' && row.preStatus !== 'reject'">
                    <el-button type="success" @click="finalCheckAgreeBtn(row.id)">通过</el-button>
                    <el-button type="danger" @click="finalCheckRefuseBtn(row.id)">拒绝</el-button>
                </div>
                <div v-else>
                    {{ row.finalCheckBy }} {{ row.finalStatus == 'pass' ? "操作通过" : row.finalStatus == 'reject' ? "操作拒绝"
                        :
                        '-' }}
                </div>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import { getDictLabel } from '@/utils/dict';
import Search from "./Search.vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus";
import { withdrawSecondCheck, withdrawFirstCheck, getWithdrawList } from "@/api/page/financeMgmt.js";



const columns = [
    {
        prop: "id",
        align: "center",
        label: "订单编号",
        width: "100",
    },
    {
        prop: "createTime",
        align: "center",
        label: "提现时间",
        width: "160",
    },
    {
        prop: "checkTime",
        align: "center",
        label: "审核时间",
        width: "160",
    },
    {
        prop: "userStatus",
        align: "center",
        label: "用户账户状态",
        width: "160",
    },
    {
        prop: "withdrawType",
        align: "center",
        label: "提现类型",
        width: "160",
    },
    {
        prop: "userId",
        align: "center",
        label: "提现用户ID",
        width: "160",
    },
    {
        prop: "nickName",
        align: "center",
        label: "提现用户昵称",
        width: "160",
    },
    {
        prop: "userTag",
        align: "center",
        label: "用户身份",
        width: "160",
    },
    {
        prop: "chain",
        align: "center",
        label: "链",
        width: "160",
    },
    {
        prop: "amount",
        align: "center",
        label: "提现金额",
        width: "100",
    },
    {
        prop: "toAddress",
        align: "center",
        label: "提现地址",
        width: "200",
    },
    {
        prop: "fee",
        align: "center",
        label: "手续费",
        width: "200",
    },
    {
        prop: "actualAmount",
        align: "center",
        label: "实际提现金额",
        width: "200",
    },
    {
        prop: "status",
        align: "center",
        label: "订单状态",
        width: "200",
    },
    {
        prop: "auditorInit",
        align: "center",
        label: "审核员(初审)",
        width: "200",
    },
    {
        prop: "auditorEnd",
        align: "center",
        label: "审核员(终审)",
        width: "120",
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
    totalData: {},//总数据
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getWithdrawList(state.formData);
        state.tableData = res.page.records;
        state.total = res.page.total;
        state.totalData = res.rechargeCount;
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

// 初审-同意
const preCheckAgreeBtn = async (withdrawId) => {
    const res = await withdrawFirstCheck({ withdrawId, pass: true })
    if (res) {
        ElMessage.success("初审已同意")
    }
}

// 初审-拒绝
const preCheckRefuseBtn = async (withdrawId) => {
    const res = await withdrawFirstCheck({ withdrawId, pass: false })
    if (res) {
        ElMessage.success("初审已拒绝")
    }
}

// 终审-同意
const finalCheckAgreeBtn = async (withdrawId) => {
    const res = await withdrawSecondCheck({ withdrawId, pass: true })
    if (res) {
        ElMessage.success("终审已同意")
    }
}

// 终审-拒绝
const finalCheckRefuseBtn = async (withdrawId) => {
    const res = await withdrawSecondCheck({ withdrawId, pass: false })
    if (res) {
        ElMessage.success("终审已拒绝")
    }
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