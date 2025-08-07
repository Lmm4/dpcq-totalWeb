<template>
    <div class="month_bill">
        <div class="dfc mb20">
            <el-icon class="mr20 cursor" @click="emit('goBack')">
                <Back />
            </el-icon>
            <div class="f16 c424 fw5 mr20">月份账单</div>
            <div class="mr20 time_box">
                <el-date-picker class="w100" v-model="state.time" type="daterange" :shortcuts="shortcuts" />
            </div>
            <el-button type="primary" @click="getMonthBillList">搜索</el-button>
        </div>
        <el-table :data="state.monthBillData" border style="width: 100%">
            <el-table-column label="日期开始" align="center" width="180">
                <template #default="{ row }">
                    <div>{{ dayjs(row.startDate).format('YYYY-MM-DD') }}</div>
                </template>
            </el-table-column>
            <el-table-column label="日期结束" align="center" width="180">
                <template #default="{ row }">
                    <div>{{ dayjs(row.endDate).format('YYYY-MM-DD') }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="username" label="股东昵称" align="center" width="180" />
            <el-table-column prop="newAgentCount" label="新增代理" align="center" width="180" />
            <el-table-column prop="newPlayerCount" label="新增会员" align="center" width="180" />
            <el-table-column prop="totalPlayerCount" label="会员总数" align="center" width="180" />
            <el-table-column prop="orderCount" label="注单数" align="center" width="180" />
            <el-table-column prop="betAmount" label="流水" align="center" width="180" />
            <el-table-column prop="validBetAmount" label="有效流水" align="center" width="180" />
            <el-table-column prop="finalWinLoss" label="输赢总额" align="center" width="220" />
            <el-table-column prop="promotion" label="活动优惠" align="center" width="220" />
            <el-table-column prop="agentRebate" label="代理返水" align="center" width="220" />
            <el-table-column prop="feeAmount" label="手续费" align="center" width="220" />
            <el-table-column label="操作" align="center" width="160" fixed="right">
                <template #default="{ row }">
                    <el-button type="primary" link @click="generateBillBtn(row)">查看账单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="dfcR mt20">
            <el-pagination v-model:current-page="state.monthBillFrom.page" v-model:page-size="state.monthBillFrom.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper"
                :total="state.monthTotal" />
        </div>
        <div class="dfc mb20 mt30">
            <div class="f16 c424 fw5 mr20">用户游戏数据</div>
            <div class="mr20">
                <el-input v-model="state.gameFrom.username" style="width: 240px" placeholder="请输入用户昵称" />
            </div>
            <div class="mr20 time_box">
                <el-date-picker class="w100" v-model="state.time1" type="daterange" :shortcuts="shortcuts" />
            </div>
            <el-button type="primary" @click="getUserGameDataFn">搜索</el-button>
        </div>
        <el-table :data="state.gameData" border style="width: 100%">
            <el-table-column prop="date" label="日期" align="center" />
            <el-table-column prop="userId" label="用户ID" align="center" />
            <el-table-column prop="userName" label="会员昵称" align="center" />
            <el-table-column prop="siteName" label="游戏场馆" align="center" />
            <el-table-column prop="gameName" label="游戏项目" align="center" />
            <el-table-column prop="orderCount" label="注单数" align="center" />
            <el-table-column prop="betAmount" label="流水" align="center" />
            <el-table-column prop="validBetAmount" label="有效流水" align="center" />
            <el-table-column prop="winLossAmount" label="输赢总额" align="center" />
        </el-table>
        <div class="dfcR mt20">
            <el-pagination v-model:current-page="state.gameFrom.page" v-model:page-size="state.gameFrom.size"
                :page-sizes="[5, 10, 20, 25]" layout="total, sizes, prev, pager, next, jumper"
                :total="state.gameTotal" />
        </div>
        <generateBill v-model:show="state.billShow" :billInfo="state.billInfo" />
    </div>
</template>

<script setup>
import { reactive, defineEmits, watch, defineProps, onMounted } from "vue";
import { ElMessage, dayjs } from 'element-plus';
import generateBill from './generateBill.vue';
import { getShareholderMonthBill, getUserGameData } from "@/api/page/majorShareholderConfig.js";
const emit = defineEmits(['goBack']);
const props = defineProps({
    adminId: {
        type: [String, Number],
        required: true
    },
})

const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setDate(start.getDate() - 7)
            return [start, end]
        },
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 1)
            return [start, end]
        },
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 3)
            return [start, end]
        },
    },
]

const state = reactive({
    monthBillData: [],
    time: [],
    time1: [],
    billShow: false,
    monthBillFrom: {
        startDate: "",
        endDate: "",
        page: 1,
        size: 10,
        adminId: props.adminId
    },
    monthTotal: 0,
    gameFrom: {
        startDate: "",
        endDate: "",
        username: "",
        page: 1,
        size: 10,
        adminId: props.adminId
    },
    gameData: [],
    gameTotal: 0,
    billInfo: {},// 账单信息
})


// 生成账单
const generateBillBtn = (row) => {
    state.billInfo = row;
    state.billShow = true;
}

// 获取月份账单列表
const getMonthBillList = async () => {
    const res = await getShareholderMonthBill(state.monthBillFrom);
    state.monthBillData = res.records;
    state.monthTotal = res.total;
}

// 获取用户游戏数据
const getUserGameDataFn = async () => {
    const res = await getUserGameData(state.gameFrom);
    state.gameData = res.records;
    state.gameTotal = res.total;
}

// 月度账单时间监听
watch(() => state.time, (val) => {
    if (val) {
        state.monthBillFrom.startDate = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
        state.monthBillFrom.endDate = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
    } else {
        state.monthBillFrom.startDate = '';
        state.monthBillFrom.endDate = '';
    }
}, { deep: true });

// 用户游戏数据监听
watch(() => state.time1, (val) => {
    if (val) {
        state.gameFrom.startDate = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
        state.gameFrom.endDate = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
    } else {
        state.gameFrom.startDate = '';
        state.gameFrom.endDate = '';
    }
}, { deep: true });

// 月度账单分页监听
watch([() => state.monthBillFrom.page, () => state.monthBillFrom.size], () => {
    getMonthBillList();
});

// 用户游戏分页监听
watch([() => state.gameFrom.page, () => state.gameFrom.size], () => {
    getUserGameDataFn();
});

onMounted(() => {
    getMonthBillList();
    getUserGameDataFn();

})
</script>

<style lang="scss" scoped>
.month_bill {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 0;
    }

    // &::-webkit-scrollbar-thumb {
    //     /*滚动条里面小方块*/
    //     border-radius: 0;
    //     // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //     background: #e1e2e5;
    // }

    .time_box {
        max-width: 400px;

        :deep(.el-date-editor) {
            width: 100% !important;
            box-sizing: border-box;
        }
    }
}
</style>