<template>
    <div>
        <Table :data="state.tableData" :columns="columns" :page="state.formData.pageNum" :size="state.formData.pageSize"
            :total="state.total" @pagination="changePage" :loading="state.loading">
            <template #tableHeader>
                <Search @search="search" />
            </template>
            <template #option="{ row }">
                <el-button type="primary" link>编辑</el-button>
                <el-button type="primary" link>菜单权限</el-button>
                <el-button type="primary" link>按钮权限</el-button>
                <el-button type="danger" link>删除</el-button>
            </template>
        </Table>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import Table from "@/components/table.vue";
import Search from "./Search.vue";
const columns = [
    { prop: "id", align: "center", label: "角色编号", width: "auto" },
    { prop: "name", align: "center", label: "角色名称", width: "auto" },
    { prop: "type", align: "center", label: "角色类型", width: "auto" },
    { prop: "code", align: "center", label: "角色标识", width: "auto" },
    { prop: "sort", align: "center", label: "显示顺序", width: "auto" },
    { prop: "remark", align: "center", label: "备注", width: "auto" },
    { prop: "status", align: "center", label: "状态", width: "auto" },
    { prop: "createTime", align: "center", label: "创建时间", width: "auto" },
    { prop: "option", align: "center", label: "操作", width: "300" },
]
const state = reactive({
    formData: {
        page: 1,
        size: 10
    },//搜索参数
    total: 0,//总条数
    tableData: [{
        id: 1,
        name: "超级管理员",
        type: "系统角色",
        code: "super_admin",
        sort: 0,
        remark: "拥有所有权限",
        status: "启用",
        createTime: "2023-01-15 10:30:00",
    },
    {
        id: 2,
        name: "财务专员",
        type: "业务角色",
        code: "finance",
        sort: 1,
        remark: "负责财务审核",
        status: "启用",
        createTime: "2023-02-20 14:15:00",
    },
    {
        id: 3,
        name: "内容编辑",
        type: "业务角色",
        code: "editor",
        sort: 2,
        remark: "管理文章和页面",
        status: "禁用",
        createTime: "2023-03-05 09:00:00",
    },
    {
        id: 4,
        name: "客服主管",
        type: "管理角色",
        code: "support_lead",
        sort: 3,
        remark: "处理客户投诉",
        status: "启用",
        createTime: "2023-04-10 16:45:00",
    },
    {
        id: 5,
        name: "开发工程师",
        type: "技术角色",
        code: "dev",
        sort: 4,
        remark: "系统开发和维护",
        status: "启用",
        createTime: "2023-05-12 11:20:00",
    },
    {
        id: 6,
        name: "产品经理",
        type: "管理角色",
        code: "pm",
        sort: 5,
        remark: "需求规划和设计",
        status: "启用",
        createTime: "2023-06-18 13:10:00",
    },],//表格
    loading: false,//加载状态
})

const search = (data) => {
    state.formData = { ...state.formData, ...data };
    getData();
};

const getData = async () => {
    state.loading = true;
    try {
        // const res = await getVipList(state.formData);
        // state.tableData = res.records;
        // state.total = res.total;
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
</script>

<style lang="scss" scoped></style>