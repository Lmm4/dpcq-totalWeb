<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #country="{ row }">
                <el-select v-model="row.country" placeholder="请设置国家" @change="countryBtn(row.country, row.id)">
                    <el-option v-for="item in getDict('countryList')" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </template>
            <template #search="{ row }">
                <el-button type="primary" link @click="loginInfo(row.id)">查看</el-button>
            </template>
            <template #option="{ row }">
                <el-button type="primary" link @click="vipDetails(row.id)">详情</el-button>
                <el-button type="primary" link @click="upDownPoints(row.id, 1)">上分</el-button>
                <el-button type="primary" link @click="upDownPoints(row.id, 0)">下分</el-button>
            </template>
        </Table>
        <!-- 上下分操作 -->
        <el-dialog v-model="state.integralShow" :title="state.integralFrom.type == 0 ? '用户下分操作' : '用户上分操作'" width="30%"
            @close="integralFromRef.resetFields()">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="dfc">用户德扑余额:{{ state.dpcqBalance }}</div>
                </el-col>
                <el-col :span="8">
                    <div class="dfc">用户积分余额:{{ state.pointsBalance }}</div>
                </el-col>
                <el-col :span="8">
                    <div class="dfc">用户信誉分余额:{{ state.scoreBalance }}</div>
                </el-col>
            </el-row>
            <el-divider />
            <el-form ref="integralFromRef" :model="state.integralFrom" label-width="auto">
                <el-form-item prop="symbol" label="货币类型"
                    :rules="[{ required: true, message: '请选择货币类型', trigger: 'change' }]">
                    <el-select v-model="state.integralFrom.symbol" placeholder="请选择货币类型">
                        <el-option v-for="item in getDict('currencyOptions')" :key="item.value" :label="item.label"
                            :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item prop="amount" label="金额" :rules="[{ required: true, message: '请输入金额', trigger: 'blur' }]">
                    <el-input v-model="state.integralFrom.amount" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.integralShow = false">取消</el-button>
                    <el-button type="primary" @click="manualUpDownBtn"> 确定 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getDict } from '@/utils/dict';
import { getVipList, updateCountry, manualUpDown, getUserAssets } from "@/api/page/vipMgmt.js";
import { ElMessage } from 'element-plus';
import Router from "@/router/index";

const columns = [
    {
        prop: "id",
        align: "center",
        label: "用户ID",
        width: "160",
    },
    {
        prop: "account",
        align: "center",
        label: "用户账号",
        width: "160",
    },
    {
        prop: "country",
        align: "center",
        label: "国家设置",
        width: "160",
    },
    {
        prop: "name",
        align: "center",
        label: "昵称",
        width: "160",
    },
    {
        prop: "rebateBalance",
        align: "center",
        label: "可提现反水",
        width: "160",
    },
    {
        prop: "rebateFreeze",
        align: "center",
        label: "冻结反水",
        width: "160",
    },
    {
        prop: "validbetToday",
        align: "center",
        label: "今日有效流水",
        width: "160",
    },
    {
        prop: "validbetTotal",
        align: "center",
        label: "总有效流水",
        width: "160",
    },
    {
        prop: "score",
        align: "center",
        label: "积分",
        width: "160",
    },
    {
        prop: "balance",
        align: "center",
        label: "个人钱包余额",
        width: "160",
    },
    {
        prop: "rechargeTotal",
        align: "center",
        label: "累计总充值",
        width: "160",
    },
    {
        prop: "withdrawTotal",
        align: "center",
        label: "累计总提现",
        width: "160",
    },
    {
        prop: "clubName",
        align: "center",
        label: "专属俱乐部名称",
        width: "160",
    },
    {
        prop: "clubUserCount",
        align: "center",
        label: "俱乐部用户数量",
        width: "160",
    },
    {
        prop: "createAt",
        align: "center",
        label: "注册时间",
        width: "160",
    },
    {
        prop: "registerIp",
        align: "center",
        label: "注册IP",
        width: "160",
    },
    {
        prop: "search",
        align: "center",
        label: "登录信息查询",
        width: "140",
        fixed: "right",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "180",
        fixed: "right",
    },
]

const integralFromRef = ref();
const state = reactive({
    formData: {
        page: 1,
        size: 10
    },//搜索参数
    integralFrom: {
        userId: "",
        type: null,
        symbol: "",
        amount: ""
    },//上下积分参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
    integralShow: false,//上下分弹窗
    dpcqBalance: "",//德扑余额，
    pointsBalance: "",//积分余额
    scoreBalance: "",//信誉分余额
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getVipList(state.formData);
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

// 国家设置
const countryBtn = async (country, userId) => {
    const res = await updateCountry({ userId, country })
    if (res) {
        ElMessage.success('设置国家成功')
        getData()
    }
}

// 上下分确定
const manualUpDownBtn = () => {
    integralFromRef.value.validate(async (valid) => {
        if (valid) {
            const res = await manualUpDown(state.integralFrom);
            if (res) {
                if (state.integralFrom.type == 0) {
                    ElMessage.success('下分成功')
                } else {
                    ElMessage.success('上分成功')
                }
                getData();
                state.integralShow = false;
            }

        }
    })
}

// 上下分
const upDownPoints = (userId, num) => {
    state.integralShow = true;
    state.integralFrom.userId = userId;
    state.integralFrom.type = num;
    getAmout(userId);
}

// 登录信息
const loginInfo = (id) => {
    Router.push({ path: '/loginInfo', query: { id } });
}

// 会员详情
const vipDetails = (id) => {
    Router.push({ path: '/vipDetails', query: { id } });
}

// 获取用户余额
const getAmout = async (userId) => {
    const res = await getUserAssets({ userId });
    for (let i = 0; i < res.length; i++) {
        const element = res[i]
        if (element.symbol === 'DPCQ') {
            state.dpcqBalance = element.balance;
        } else if (element.symbol === 'SCORE') {
            state.pointsBalance = element.balance;
        } else if (element.symbol === 'CREDIT') {
            state.scoreBalance = element.balance;
        }
    }
}

getData();

</script>

<style lang="scss" scoped></style>