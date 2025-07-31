<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #calcMethod="{ row }">
                {{ getDictLabel('calcMethod', row.calcMethod) }}
            </template>
            <template #type="{ row }">
                {{ getDictLabel('gameType', row.type) }}
            </template>
            <template #liveVideoFlag="{ row }">
                {{ getDictLabel('openOrClose', row.liveVideoFlag) }}
            </template>
            <template #tableStatus="{ row }">
                {{ getDictLabel('cardOptions', row.tableStatus) }}
            </template>
            <template #currencyType="{ row }">
                {{ getDictLabel('currencyOptions', row.currencyType) }}
            </template>
            <template #settlementStatus="{ row }">
                {{ getDictLabel('settlementStatus', row.settlementStatus) }}
            </template>
            <template #perLotServer="{ row }">
                {{ getDictLabel('perLotServer', row.perLotServer) }}
            </template>
            <template #preFlopFreeFlag="{ row }">
                {{ getDictLabel('openOrClose', row.preFlopFreeFlag) }}
            </template>
            <template #threePeopleOffFlag="{ row }">
                {{ getDictLabel('openOrClose', row.threePeopleOffFlag) }}
            </template>
            <template #potBelowFreeFlag="{ row }">
                {{ getDictLabel('openOrClose', row.potBelowFreeFlag) }}
            </template>
            <template #serviceFeeCap="{ row }">
                {{ row.serviceFeeCap == -1 ? '无上限' : row.serviceFeeCap }}
            </template>
            <template #startAt="{ row }">
                {{ row.startAt ? dayjs(row.startAt).format("YYYY-MM-DD HH:mm:ss") : '-' }}
            </template>
            <template #endAt="{ row }">
                {{ row.endAt ? dayjs(row.endAt).format("YYYY-MM-DD HH:mm:ss") : '-' }}
            </template>
            <template #closeAt="{ row }">
                {{ row.closeAt ? dayjs(row.closeAt).format("YYYY-MM-DD HH:mm:ss") : '-' }}
            </template>
            <template #option="{ row }">
                <el-button type="primary" link @click="details(row.id)">详情</el-button>
                <el-button v-if="row.tableStatus == 3 && row.settlementStatus == false && row.totalIncome > 0"
                    type="primary" link @click="issueBtn(row)">发放</el-button>
            </template>
        </Table>
        <el-dialog v-model="state.issueShow" title="发放" width="500">
            <div class="dfc">当前牌局总收入:{{ state.totalIncome }}</div>
            <el-divider />
            <el-form :model="state.issueForm" label-width="auto">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="收取服务费">
                            <el-input-number class="w100" v-model="state.issueForm.rate" :controls="false"
                                @change="changeRate" :min="0" :max="100">
                                <template #suffix>
                                    <span>%</span>
                                </template>
                            </el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="俱乐部所得">{{ state.income.clubShare }}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联盟所得">{{ state.income.unionShare }}</el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="平台所得">{{ state.income.serverShare }}</el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input v-model="state.issueForm.comment" :rows="4" type="textarea" placeholder="请输入备注" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.issueShow = false">取消</el-button>
                    <el-button type="primary" @click="grantBtn">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getDictLabel } from '@/utils/dict';
import Router from "@/router/index";
import { debounce } from "@/utils/utils.js";
import { dayjs, ElMessage } from "element-plus";
import { getDdzRoomList, getCommissionList, provideCommission } from "@/api/page/pokerMgmt.js";

const columns = [
    {
        prop: "id",
        align: "center",
        label: "牌桌ID",
        width: "160",
    },
    {
        prop: "clubId",
        align: "center",
        label: "俱乐部ID",
        width: "160",
    },
    {
        prop: "unionId",
        align: "center",
        label: "联盟ID",
        width: "160",
    },
    {
        prop: "name",
        align: "center",
        label: "牌桌名称",
        width: "160",
    },
    {
        prop: "type",
        align: "center",
        label: "玩法类型",
        width: "160",
    },
    {
        prop: "liveVideoFlag",
        align: "center",
        label: "是否开启实时视频",
        width: "160",
    },
    {
        prop: "liveVideoFees",
        align: "center",
        label: "实时视频费用(小时)",
        width: "160",
    },
    {
        prop: "gameDuration",
        align: "center",
        label: "游戏对局时长(小时)",
        width: "160",
    },
    {
        prop: "tableStatus",
        align: "center",
        label: "牌桌状态",
        width: "160",
    },
    {
        prop: "startAt",
        align: "center",
        label: "开始时间",
        width: "160",
    },
    {
        prop: "endAt",
        align: "center",
        label: "结束时间",
        width: "160",
    },
    {
        prop: "closeAt",
        align: "center",
        label: "牌桌关闭时间",
        width: "160",
    },
    {
        prop: "currencyType",
        align: "center",
        label: "货币类型",
        width: "160",
    },
    {
        prop: "totalPumping",
        align: "center",
        label: "总抽水收入",
        width: "160",
    },
    {
        prop: "totalInsurance",
        align: "center",
        label: "总保险收入",
        width: "160",
    },
    {
        prop: "totalIncrement",
        align: "center",
        label: "增值付费收入",
        width: "160",
    },
    {
        prop: "totalIncome",
        align: "center",
        label: "当前牌局总收入",
        width: "160",
    },
    {
        prop: "settlementStatus",
        align: "center",
        label: "发放状态",
        width: "160",
    },
    {
        prop: "perLotServer",
        align: "center",
        label: "每手服务费",
        width: "160",
    },
    {
        prop: "calcMethod",
        align: "center",
        label: "计算方式",
        width: "160",
    },
    {
        prop: "calcRate",
        align: "center",
        label: "比例",
        width: "160",
    },
    {
        prop: "preFlopFreeFlag",
        align: "center",
        label: "比例-preFlop结束免费",
        width: "170",
    },
    {
        prop: "threePeopleOffFlag",
        align: "center",
        label: "比例-低于三人五折",
        width: "160",
    },
    {
        prop: "potBelowFreeFlag",
        align: "center",
        label: "比例-底池低于此值免费是否开启",
        width: "160",
    },
    {
        prop: "potBelowFree",
        align: "center",
        label: "比例-底池低于此值免费",
        width: "170",
    },
    {
        prop: "serviceFeeCap",
        align: "center",
        label: "比例-服务费封顶",
        width: "160",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "160",
        fixed: "right",
    }
]

const state = reactive({
    formData: {
        page: 1,
        size: 10,
        type: "classic_texas",
    },//搜索参数
    total: 0,//总条数
    tableData: [],//表格
    loading: false,//加载状态
    issueShow: false,//发放弹窗
    issueForm: {
        tableId: "",
        organizeType: "club",
        rate: 3,
        comment: "",
    },//发放表单
    totalIncome: "",//当前牌局总收入
    income: {
        clubShare: "",
        unionShare: "",
        serverShare: ""
    },//收入所得
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getDdzRoomList(state.formData);
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

// 牌局配置详情
const details = (tableId) => {
    Router.push({ path: '/gameConfigInfo', query: { tableId } });
}

// 修改服务费
const changeRate = (e) => {
    getPreQueryProvide(e);
}

const getPreQueryProvide = debounce(async (e) => {
    const res = await getCommissionList({
        tableId: state.issueForm.tableId,
        organizeType: state.issueForm.organizeType,
        rate: Number(e) * 100,
    })
    state.income.clubShare = res.clubShare;
    state.income.unionShare = res.unionShare;
    state.income.serverShare = res.serverShare;
}, 1000, true)

// 发放
const issueBtn = (row) => {
    state.issueForm.tableId = row.id;
    state.issueForm.rate = 3;
    state.issueForm.organizeType = row.unionId == 0 ? 'club' : 'union';
    state.totalIncome = row.totalIncome;
    getPreQueryProvide(3);
    state.issueShow = true;
}

//发放确定
const grantBtn = async () => {
    let params = { ...state.issueForm };
    params.rate = params.rate * 100;
    const res = await provideCommission(params);
    if (res) {
        ElMessage.success('发放成功');
        state.issueShow = false;

    }
}

getData();

</script>

<style lang="scss" scoped></style>