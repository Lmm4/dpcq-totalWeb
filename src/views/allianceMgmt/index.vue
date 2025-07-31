<template>
    <div>
        <el-card>
            <template #header>
                <div class="dfcR">
                    <el-button type="primary" @click="goAllianceBackendBtn">进入联盟后台</el-button>
                </div>
            </template>
            <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum"
                :size="state.formData.pageSize" :total="state.total" @pagination="changePage" :loading="state.loading">
                <template #createTime="{ row }">
                    {{ dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
                </template>
                <template #option="{ row }">
                    <el-button link type="primary" @click="modifyConfigBtn(row.clubId)">修改配置</el-button>
                </template>
            </Table>
        </el-card>
        <!-- 联盟配置 -->
        <unionConfigInfo v-model:unionIsShow="state.unionIsShow" v-model:clubId="state.clubId" />
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import { dayjs, ElMessage } from "element-plus";
import unionConfigInfo from '@/components/unionConfigInfo.vue';
import { getAllianceList } from "@/api/page/allianceMgmt.js";



const columns = [
    {
        prop: "unionId",
        align: "center",
        label: "联盟ID",
        width: "160",
    },
    {
        prop: "userId",
        align: "center",
        label: "联盟股东ID",
        width: "160",
    },
    {
        prop: "userName",
        align: "center",
        label: "联盟股东名称",
        width: "160",
    },
    {
        prop: "unionName",
        align: "center",
        label: "联盟名称",
        width: "160",
    },
    {
        prop: "clubName",
        align: "center",
        label: "主俱乐部名称",
        width: "160",
    },
    {
        prop: "clubId",
        align: "center",
        label: "主俱乐部ID",
        width: "160",
    },
    {
        prop: "unionWalletBalance",
        align: "center",
        label: "联盟钱包余额",
        width: "160",
    },
    {
        prop: "unionClubCount",
        align: "center",
        label: "联盟下级俱乐部数量",
        width: "160",
    },
    {
        prop: "createTime",
        align: "center",
        label: "创建时间",
        width: "auto",
    },
    {
        prop: "option",
        align: "center",
        label: "操作",
        width: "100",
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
    unionIsShow: false, // 升级联盟弹窗
    clubId: "",//俱乐部id
})

const getData = async () => {
    state.loading = true;
    try {
        const res = await getAllianceList(state.formData);
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

// 进入联盟后台
const goAllianceBackendBtn = () => {
    // window.open(`http://pro.union.dpcq.vip`)
};

// 联盟配置
const modifyConfigBtn = (id) => {
    state.unionIsShow = true;
    state.clubId = id;
}

getData();
</script>

<style lang="scss" scoped></style>