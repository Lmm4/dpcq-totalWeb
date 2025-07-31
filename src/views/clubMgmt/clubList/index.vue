<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #clubType="{ row }">
                {{ getDictLabel('clubTypeOptions', row.clubType) }}
            </template>
            <template #createAt="{ row }">
                {{ dayjs(row.createAt).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
            <template #option="{ row }">
                <el-button link type="primary" @click="balanceOperationBtn(row.id)">余额操作</el-button>
                <el-button link type="primary" @click="clubSetBtn(row.id)">俱乐部设定</el-button>
                <el-button link type="primary" @click="viewFlowBtn(row.id)">查看流水</el-button>
            </template>
            <template #upgrade="{ row }">
                <el-button v-if="row.unionId === 0" link type="primary" @click="upUnionBtn(row.id)">升级为联盟</el-button>
                <el-button link v-if="row.unionId !== 0 && row.mainClubFlag === 1" type="primary"
                    @click="unionConfigInfoBtn(row.id)">已获得联盟权限 设置联盟分成配置</el-button>
            </template>
        </Table>
        <!-- 升级联盟配置 -->
        <unionConfigInfo v-model:unionIsShow="state.unionIsShow" v-model:clubId="state.clubId" />
        <!-- 俱乐部设定 -->
        <clubSet v-model:clubIsShow="state.clubShow" :clubIsId="state.clubId" />
        <!-- 余额操作 -->
        <balanceOperation v-model:balanceIsShow="state.balanceShow" v-model:clubId="state.clubId" />
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
import { getDictLabel } from '@/utils/dict';
import { dayjs, ElMessageBox } from 'element-plus';
import unionConfigInfo from '@/components/unionConfigInfo.vue';
import clubSet from './clubSet.vue';
import balanceOperation from './balanceOperation.vue';
import Router from "@/router/index";
import { getClubList, upgradeToUnion } from "@/api/page/clubMgmt.js";

const columns = [
    {
        prop: "id",
        align: "center",
        label: "俱乐部ID",
        width: "120",
    },
    {
        prop: "clubType",
        align: "center",
        label: "俱乐部类型",
        width: "120",
    },
    {
        prop: "name",
        align: "center",
        label: "俱乐部名称",
        width: "120",
    },
    {
        prop: "createBy",
        align: "center",
        label: "拥有者ID",
        width: "140",
    },
    {
        prop: "createByName",
        align: "center",
        label: "拥有者昵称",
        width: "130",
    },
    {
        prop: "clubAssets",
        align: "center",
        label: "俱乐部资产",
        width: "120",
    },
    {
        prop: "totalMembers",
        align: "center",
        label: "俱乐部会员人数",
        width: "130",
    },
    {
        prop: "currentTable",
        align: "center",
        label: "目前牌桌数",
        width: "120",
    },
    {
        prop: "pumpingIncome",
        align: "center",
        label: "总抽水收入",
        width: "160",
    },
    {
        prop: "insuranceIncome",
        align: "center",
        label: "总保险收入",
        width: "160",
    },
    {
        prop: "incrementIncome",
        align: "center",
        label: "增值付费收入",
        width: "160",
    },
    {
        prop: "createAt",
        align: "center",
        label: "注册时间",
        width: "200",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "250",
        fixed: "right"
    },
    {
        prop: "upgrade",
        align: "center",
        label: "升级",
        width: "250",
        fixed: "right"
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
    unionIsShow: false, // 升级联盟弹窗
    clubId: "",//俱乐部id
    clubShow: false,//俱乐部设定弹窗
    balanceShow: false,//余额操作弹窗
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        const res = await getClubList(state.formData);
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

// 升级联盟
const upUnionBtn = (clubId) => {
    ElMessageBox.confirm('请确认是否升级为联盟?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        const res = await upgradeToUnion({ clubId });
        if (res) {
            getData();
        }
    })
}

// 联盟配置
const unionConfigInfoBtn = (id) => {
    state.unionIsShow = true;
    state.clubId = id;
}

// 俱乐部设定
const clubSetBtn = (id) => {
    state.clubId = id;
    state.clubShow = true;
}

// 余额操作
const balanceOperationBtn = (id) => {
    state.clubId = id;
    state.balanceShow = true;
}

// 查看流水
const viewFlowBtn = (clubId) => {
    Router.push({ path: '/checkFlow', query: { clubId } });
}


getData();

</script>

<style lang="scss" scoped></style>