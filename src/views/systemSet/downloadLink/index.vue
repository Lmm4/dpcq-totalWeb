<template>
    <div>
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="desc" label="系统" align="center" />
            <el-table-column prop="value" label="链接地址" align="center">
                <template #default="{ row }">
                    <el-input v-if="row.editFlag" v-model="row.editValue" placeholder="请输入链接地址" />
                    <div v-else>{{ row.value }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template #default="{ row }">
                    <el-button type="primary" @click="handleEdit(row)">{{ row.editFlag ? "保存" : "修改" }} </el-button>
                    <el-button v-if="row.editFlag" @click="cancelEdit(row)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getDownloadUrl, updateDownloadUrl } from "@/api/page/systemSet.js";
import { ElMessage } from 'element-plus';


const state = reactive({
    tableData: [],//配置表格数据
});


const getData = async () => {
    const res = await getDownloadUrl();
    state.tableData = res.map(item => ({
        ...item,
        editFlag: false, // 编辑状态
        editValue: item.value // 编辑时的临时值
    }));

}


// 修改
const handleEdit = async (row) => {
    if (row.editFlag) {
        try {
            row.value = row.editValue;
            const res = await updateDownloadUrl({ id: row.id, value: row.value, key: row.key, desc: row.desc });
            if (res) {
                ElMessage.success("更新成功");
                getData(); // 重新获取数据
            }
        } catch (error) {
            console.error("更新失败:", error);
            row.editValue = row.value;
        }
    }

    // 切换编辑状态
    row.editFlag = !row.editFlag;

    // 如果是取消编辑，恢复原值
    if (!row.editFlag) {
        row.editValue = row.value;
    }
};

// 取消
const cancelEdit = (row) => {
    row.editFlag = false;
    row.editValue = row.value; // 恢复原值
};

getData();
</script>

<style lang="scss" scoped></style>