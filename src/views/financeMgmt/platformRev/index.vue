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
                        <div>根据所选的时间查看该时间段内的资金变动</div>
                        <div class="mt10">200</div>
                    </el-card>
                    <el-card class="card mr20">
                        <div>累计总收入</div>
                        <div class="mt10">200</div>
                    </el-card>
                    <el-card class="card">
                        <div>累计总支出</div>
                        <div class="mt10">200</div>
                    </el-card>
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
        label: "牌局ID",
        width: "auto",
    },
    {
        prop: "gameName",
        align: "center",
        label: "牌局名称",
        width: "auto",
    },
    {
        prop: "clubAffiliation",
        align: "center",
        label: "所属俱乐部",
        width: "auto",
    },
    {
        prop: "belongingAlliance",
        align: "center",
        label: "所属联盟",
        width: "100",
    },
    {
        prop: "proportion",
        align: "center",
        label: "抽水/保险/增值",
        width: "auto",
    },
    {
        prop: "incomeAmount",
        align: "center",
        label: "收入金额",
        width: "auto",
    },
    {
        prop: "balanceChanges",
        align: "center",
        label: "平台余额变动",
        width: "auto",
    },
    {
        prop: "createTime",
        align: "center",
        label: "日期时间",
        width: "auto",
    },
    {
        prop: "orderNumber",
        align: "center",
        label: "订单编号",
        width: "auto",
    }
]
const state = reactive({
    formData: {
        page: 1,
        size: 10,
    },//搜索参数
    total: 0,//总条数
    tableData: [
        {
            id: "1234",
            gameName: "测试牌局",
            clubAffiliation: "俱乐部-阿飞",
            belongingAlliance: "-",
            proportion: "0%/50%/50%",
            incomeAmount: "0/-100/50",
            balanceChanges: "550",
            createTime: "2024年9月29日 17点55分",
            orderNumber: "23131616145165161616",
        },
    ],//表格
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
        // const res = await getWithdrawList(state.formData);
        // state.tableData = res.page.records;
        // state.total = res.page.total;
        // state.totalData = res.rechargeCount;
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