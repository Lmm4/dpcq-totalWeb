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
                        <div>当前已归集</div>
                        <div class="mt10">{{ state.totalData.collected ? state.totalData.collected : 0 }}</div>
                    </el-card>
                    <el-card class="card mr20">
                        <div>当前未归集</div>
                        <div class="mt10">{{ state.totalData.uncollected ? state.totalData.uncollected : 0 }}</div>
                    </el-card>
                    <el-card class="card mr20">
                        <div>TRX邮费余额(实时)</div>
                        <div class="mt10">{{ state.totalData.trxBalance ? state.totalData.trxBalance : 0 }}</div>
                    </el-card>
                    <el-card class="card">
                        <div>ETH邮费余额(实时)</div>
                        <div class="mt10">0</div>
                    </el-card>
                </div>
            </template>
            <template #option="{ row }">
                <el-button link type="success" @click="feeInBtn(row.walletId)">
                    手续费转入
                </el-button>
                <el-button link type="warning" @click="manualBtn(row.walletId)">
                    手动归集
                </el-button>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus";
import { getWalletList, transferFee, gather, gatherStatistics } from "@/api/page/financeMgmt.js";



const columns = [
    {
        prop: "walletId",
        align: "center",
        label: "钱包ID",
        width: "auto",
    },
    {
        prop: "userId",
        align: "center",
        label: "用户ID",
        width: "160",
    },
    {
        prop: "nickName",
        align: "center",
        label: "用户昵称",
        width: "160",
    },
    {
        prop: "address",
        align: "center",
        label: "钱包地址",
        width: "160",
    },
    {
        prop: "balance",
        align: "center",
        label: "钱包U余额",
        width: "160",
    },
    {
        prop: "mainBalance",
        align: "center",
        label: "钱包主币余额",
        width: "160",
    },
    {
        prop: "mainToken",
        align: "center",
        label: "已归集金额",
        width: "160",
    },
    {
        prop: "num",
        align: "center",
        label: "归集次数",
        width: "160",
    },
    {
        prop: "lastGatherTime",
        align: "center",
        label: "上次归集时间",
        width: "160",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "180",
        fixed: "right",
    }
]
const state = reactive({
    formData: {
        page: 1,
        size: 10,
        chainId: 1,
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
        const res = await getWalletList(state.formData);
        state.tableData = res.records;
        state.total = res.total;
        const res1 = await gatherStatistics();
        state.totalData = res1;
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

// 手续费转入
const feeInBtn = (walletId) => {
    ElMessageBox.confirm('是否操作手续费转入?', '手续费转入操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(async () => {
            const res = await transferFee({ walletId });
            if (res) {
                ElMessage.success('手续费转入操作成功');
            }
            getData();
        })

}

// 手动归集
const manualBtn = (walletId) => {
    ElMessageBox.confirm('是否操作手动归集?', '手动归集操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(async () => {
            const res = await gather({ walletId });
            if (res) {
                ElMessage.success('手动归集操作成功');
            }
            getData();
        })
}



getData();
</script>

<style lang="scss" scoped>
.card {
    width: calc((100% - 60px)/4);

    :deep(.el-card__body) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
}
</style>