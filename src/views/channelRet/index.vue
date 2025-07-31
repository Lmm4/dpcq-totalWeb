<template>
    <div>
        <Table v-if="state.pageIndex == 0" :data="state.tableData" :columns="columns" :page="state.formData.pageNum"
            :size="state.formData.pageSize" :total="state.total" @pagination="changePage" :loading="state.loading">
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
                {{ getDictLabel('tabletype', row.tabletype) }}
            </template>
            <template #gameLobbyCn="{ row }">
                <div>{{ row.gameLobbyCn }}{{ row.tablename.split("#")[1] }}</div>
            </template>
            <template #retention="{ row }">
                <el-button type="primary" @click="retentionBtn(row.channelId)">留存记录 </el-button>
            </template>
            <template #option="{ row }">
                <el-button link type="primary" @click="detailsBtn(row.channelId)"> 详情 </el-button>
                <el-button link type="primary" @click="viewChannelUsers(row.channelId)"> 查看渠道成员 </el-button>
                <el-button link type="primary" @click="resetLink(row.channelId)"> 重置后台链接 </el-button>
                <el-button link type="primary" @click="totalData(row.channelId)"> 渠道总数据 </el-button>
            </template>
        </Table>
        <channelUsers v-else-if="state.pageIndex == 1" :channelId="state.channelId" @go-back="state.pageIndex = 0" />
        <retentionStatistics v-else-if="state.pageIndex == 2" @go-back="state.pageIndex = 0"
            :ChannelId="state.channelId" />
        <!-- 渠道详情 -->
        <el-dialog v-model="state.detailShow" title="渠道详情" width="90%" destroy-on-close>
            <detailsList v-if="state.detailShow" :ChannelId="state.channelId" />
        </el-dialog>

        <!-- 渠道总数据 -->
        <el-dialog v-model="state.totalShow" title="渠道总数据" width="800px" destroy-on-close>
            <el-table :data="state.totalData" border style="width: 100%">
                <el-table-column prop="amount" label="总得分" align="center" />
                <el-table-column prop="bet" label="总押分" align="center" />
                <el-table-column prop="validbet" label="总投注" align="center" />
                <el-table-column prop="win" label="总结算金额" align="center" />
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getDictLabel } from '@/utils/dict';
import detailsList from './detailsList.vue';
import { ElMessage, ElMessageBox } from "element-plus";
import retentionStatistics from './retentionStatistics.vue';
import channelUsers from './channelUsers.vue';
import { getChannelList, resetChannel, getChannelTotal } from "@/api/page/channelRet.js";



const columns = [
    { prop: "name", label: "渠道名称", align: "center", width: "100" },
    { prop: "channelId", label: "渠道编号", align: "center", width: "100" },
    { prop: "manager", label: "渠道负责人", align: "center", width: "100" },
    { prop: "visits", label: "访问量", align: "center", width: "100" },
    { prop: "downloads", label: "安装量", align: "center", width: "100" },
    { prop: "newUsers", label: "新增用户数", align: "center", width: "100" },
    { prop: "activeUsers", label: "活跃用户数", align: "center", width: "100" },
    { prop: "registers", label: "累计用户", align: "center", width: "100" },
    { prop: "rechargers", label: "充值用户数", align: "center", width: "100" },
    { prop: "rechargeAmount", label: "充值金额", align: "center", width: "100" },
    { prop: "arppu", label: "平均充值金额（ARPPU）", align: "center", width: "120" },
    { prop: "rechargeCount", label: "充值次数", align: "center", width: "100" },
    { prop: "firstRechargeCount", label: "首次充值用户数", align: "center", width: "130" },
    { prop: "firstRechargeAmount", label: "首次充值金额", align: "center", width: "120" },
    { prop: "firstRechargeConvertRate", label: "首次充值转化率", align: "center", width: "130" },
    { prop: "withdraws", label: "提现用户数", align: "center", width: "100" },
    { prop: "withdrawAmount", label: "提现金额", align: "center", width: "100" },
    { prop: "awppu", label: "平均提现金额", align: "center", width: "110" },
    { prop: "withdrawCount", label: "提现次数", align: "center", width: "100" },
    { prop: "firstWithdrawCount", label: "首次提现用户数", align: "center", width: "130" },
    { prop: "firstWithdrawAmount", label: "首次提现金额", align: "center", width: "130" },
    { prop: "firstWithdrawConvertRate", label: "首次提现转化率", align: "center", width: "130" },
    { prop: "income", label: "净收益", align: "center", width: "100" },
    { prop: "cost", label: "成本", align: "center", width: "100" },
    { prop: "roi", label: "投资回报率（ROI）", align: "center", width: "100" },
    { prop: "arpu", label: "ARPU", align: "center", width: "100" },
    { prop: "retention", label: "留存数", align: "center", width: "120" },
    { prop: "createTime", label: "创建时间", align: "center", width: "170" },
    { prop: "url", label: "渠道链接", align: "center", width: "180" },
    { prop: "adminUrl", label: "后台地址", align: "center", width: "180" },
    { prop: "option", align: "center", label: "操作", width: "200", fixed: "right" }
]
const state = reactive({
    formData: {
        page: 1,
        size: 10,
    },//搜索参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
    detailShow: false, //详情弹窗
    channelId: '', //渠道id
    pageIndex: 0, //页面索引
    totalShow: false,//渠道总数据弹窗
    totalData: [] //渠道总数据
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getChannelList(state.formData);
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


// 渠道总数据
const totalData = async (channelId) => {
    state.totalShow = true;
    const res = await getChannelTotal({ channelId });
    state.totalData = [res.data];

}

// 详情
const detailsBtn = (channelId) => {
    state.channelId = channelId;
    state.detailShow = true;
}

// 查看渠道成员
const viewChannelUsers = (channelId) => {
    state.pageIndex = 1;
    state.channelId = channelId;
}
// 查看留存记录
const retentionBtn = (channelId) => {
    state.channelId = channelId;
    state.pageIndex = 2;
}

// 重置后台链接
const resetLink = (channelId) => {
    ElMessageBox.confirm('请确认是否重置该链接?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning', })
        .then(async () => {
            const res = await resetChannel({ channelId });
            if (res) {
                ElMessage.success('重置成功');
                getData();
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