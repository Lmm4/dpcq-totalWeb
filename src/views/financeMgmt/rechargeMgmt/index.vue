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
                        <div>根据所选的时间查看该时间段内充值的总金额（包括复充）</div>
                        <div class="mt10">{{ state.totalData.rechargeTotal }}</div>
                    </el-card>
                    <el-card class="card mr20">
                        <div>这段时间的二次以及二次以上充值的次数</div>
                        <div class="mt10">{{ state.totalData.aboveTwiceCount }}次</div>
                    </el-card>
                    <el-card class="card">
                        <div>这段时间内二次以及二次以上充值的总金额</div>
                        <div class="mt10">{{ state.totalData.aboveTwiceTotal }}</div>
                    </el-card>
                </div>
            </template>
            <template #createTime="{ row }">
                {{ dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
            </template>
            <template #status="{ row }">
                <span class="c30d" v-if="row.status == 'confirm'"> 已到账</span>
                <span class="cb1b" v-else-if="row.status == 'init'"> 初始化</span>
                <span class="cd15" v-else> 交易异常</span>
            </template>
            <template #option="{ row }">
                <el-button link type="primary" :disabled="row.status == 'confirm'"
                    @click="topScoreBtn(row.userId)">手动上分</el-button>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { dayjs, ElMessage, ElMessageBox } from "element-plus";
import { getRechargeList, manualRecharge } from "@/api/page/financeMgmt.js";



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
        label: "充值时间",
        width: "160",
    },
    {
        prop: "chainName",
        align: "center",
        label: "链",
        width: "160",
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
        prop: "userTag",
        align: "center",
        label: "用户身份标识",
        width: "160",
    },
    {
        prop: "amount",
        align: "center",
        label: "充值金额(USDT)",
        width: "160",
    },
    {
        prop: "status",
        align: "center",
        label: "状态",
        width: "160",
    },
    {
        prop: "num",
        align: "center",
        label: "充值次数",
        width: "100",
    },
    {
        prop: "toAddress",
        align: "center",
        label: "收款地址",
        width: "200",
    },
    {
        prop: "fromAddress",
        align: "center",
        label: "用户出款地址",
        width: "200",
    },
    {
        prop: "hash",
        align: "center",
        label: "TXID",
        width: "200",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "120",
        fixed: "right",
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
        const res = await getRechargeList(state.formData);
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
// 手动上分
const topScoreBtn = (userId) => {
    // console.log(id)
    ElMessageBox.confirm('是否确定手动上分操作?', '手动上分操作', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    })
        .then(async () => {
            const res = await manualRecharge({ userId });
            if (res) {
                getData();
                ElMessage.success('手动上分操作成功');
            }
        })
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