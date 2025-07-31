<template>
    <div>
        <Table v-if="state.pageIndex == 0" :data="state.tableData" :columns="columns" :page="state.formData.pageNum"
            :size="state.formData.pageSize" :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #bigShareholderProfitPercent="{ row }">
                <div>{{ row.bigShareholderProfitPercent * 100 }}%</div>
            </template>
            <template #shareholderProfitPercent="{ row }">
                <div>{{ row.shareholderProfitPercent * 100 }}%</div>
            </template>
            <template #agentProfitPercent="{ row }">
                <div>{{ row.agentProfitPercent * 100 }}%</div>
            </template>
            <template #statAddAt="{ row }">
                <div>{{ dayjs(row.statAddAt).format('YYYY-MM-DD HH:mm:ss') }}</div>
            </template>
            <template #option="{ row }">
                <el-button type="primary" link @click="monthBillBtn(row.adminId)">月度账单</el-button>
                <el-button type="primary" link @click="configBtn(row)">配置</el-button>
            </template>
        </Table>
        <monthBill v-else @go-back="state.pageIndex = 0" :adminId="state.adminId" />
        <deployRatio v-model:show="state.ratioShow" :bigInfo="state.bigInfo" @refresh="getData" />
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import deployRatio from "./deployRatio.vue";
import monthBill from "./monthBill/index.vue";
import { getMajorShareholderList } from "@/api/page/majorShareholderConfig.js";
import { ElMessage, dayjs } from 'element-plus';

const columns = [
    { prop: "adminId", align: "center", label: "大股东编号", width: "160" },
    { prop: "realName", align: "center", label: "大股东昵称", width: "160" },
    { prop: "shareholderCount", align: "center", label: "大股东旗下股东数量", width: "160" },
    { prop: "agentCount", align: "center", label: "股东下级代理数量", width: "160" },
    { prop: "memberCount", align: "center", label: "旗下会员数量", width: "160" },
    { prop: "finalWinLoss", align: "center", label: "总输赢金额", width: "160" },
    { prop: "totalRebateAmount", align: "center", label: "总返水金额", width: "160" },
    { prop: "bigShareholderProfitPercent", align: "center", label: "大股东分润比例", width: "160" },
    { prop: "shareholderProfitPercent", align: "center", label: "股东分润比例", width: "160" },
    { prop: "agentProfitPercent", align: "center", label: "代理分润比例", width: "160" },
    { prop: "bigShareholderUrl", align: "center", label: "大股东后台链接", width: "200" },
    { prop: "shareholderUrl", align: "center", label: "股东后台链接", width: "200" },
    { prop: "agentUrl", align: "center", label: "代理后台链接", width: "200" },
    { prop: "statAddAt", align: "center", label: "股东添加时间", width: "200" },
    { prop: "option", align: "center", label: "操作", width: "180", fixed: "right" },
]

const state = reactive({
    formData: {
        page: 1,
        size: 10
    },//搜索参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
    ratioShow: false,//分润配置弹窗
    pageIndex: 0,//页面索引
    bigInfo: {
        subId: '',//大股东id
        subProfit: null,//大股东分润比例
    },//大股东信息
    adminId: "",//大股东id
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getMajorShareholderList(state.formData);
        state.tableData = res.records;
        state.total = res.total;
    } finally {
        state.loading = false;
    }
};

// 月度账单
const monthBillBtn = (adminId) => {
    state.pageIndex = 1;
    state.adminId = adminId;
};
// 页数/条数切换
const changePage = (e) => {
    state.formData.page = e.page;
    state.formData.size = e.size;
    getData();
};

// 配置
const configBtn = (row) => {
    state.ratioShow = true;
    state.bigInfo.subId = row.adminId;
    state.bigInfo.subProfit = row.bigShareholderProfitPercent;
}




getData();

</script>

<style lang="scss" scoped></style>
<style lang="scss" scoped></style>