<template>
    <div>
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="type" label="类型" align="center" />
            <el-table-column prop="state" label="状态" align="center">
                <template #default="{ row }">
                    <div>
                        <el-switch v-model="row.enable" class="ml-2" inline-prompt :active-value="true"
                            :inactive-value="false"
                            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="开启"
                            inactive-text="关闭" @change="handleChange(row)" />
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { getGameSetList, setGameOpen } from '@/api/page/systemSet.js';
import { reactive, ref } from 'vue';
const state = reactive({
    tableData: []
})

// 状态
const handleChange = async (row) => {
    try {
        const res = await setGameOpen({ id: row.id, enable: row.enable })
        if (res) {
            getList()
            ElMessage.success('操作成功')
        }
    } catch (error) { }
}

const getList = async () => {
    const res = await getGameSetList()
    state.tableData = res;
}
getList();
</script>

<style lang="scss" scoped></style>