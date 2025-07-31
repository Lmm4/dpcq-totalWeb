<template>
    <el-dialog v-model="dialogVisible" title="联盟配置信息" width="50%">
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="name" label="费用名称" align="center" />
            <el-table-column label="俱乐部分成(%)" align="center">
                <template #default="{ row }">
                    <el-input-number :min="0" :max="100" controls-position="right" v-model="row.club" />
                </template>
            </el-table-column>
            <el-table-column label="联盟分成(%)" align="center">
                <template #default="{ row }">
                    <el-input-number :min="0" :max="100" controls-position="right" v-model="row.union" />
                </template>
            </el-table-column>
            <el-table-column label="平台分成(%)" align="center">
                <template #default="{ row }">
                    <el-input-number :min="0" :max="100" controls-position="right" v-model="row.platform" />
                </template>
            </el-table-column>
        </el-table>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="changeRate">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { defineProps, watch, reactive, computed } from 'vue';
import { getAllianceCommission, setAllianceCommission } from "@/api/page/allianceMgmt.js";
import { ElMessage } from 'element-plus'

const props = defineProps({
    unionIsShow: {
        type: Boolean,
        required: true
    },
    clubId: {
        type: String,
        required: true
    }
})
const state = reactive({
    tableData: [
        {
            name: "保险",
            club: 0,
            platform: 0,
            union: 0
        },
        {
            name: "抽水",
            club: 0,
            platform: 0,
            union: 0
        },
        {
            name: "增值消费",
            club: 0,
            platform: 0,
            union: 0
        }
    ],
    unionId: ""
})

const emit = defineEmits(['update:unionIsShow'])

const dialogVisible = computed({
    get() {
        return props.unionIsShow
    },
    set(value) {
        emit('update:unionIsShow', value)
    }
})
const getAllianceRateAction = async (clubId) => {
    const res = await getAllianceCommission({ clubId });
    state.unionId = res.unionId;
    state.tableData[0] = {
        name: "保险",
        union: handleNum(res.unionInsuranceRate),
        club: handleNum(res.clubInsuranceRate),
        platform: handleNum(res.platInsuranceRate)
    }
    state.tableData[1] = {
        name: "抽水",
        union: handleNum(res.unionPumpingRate),
        club: handleNum(res.clubPumpingRate),
        platform: handleNum(res.platPumpingRate)
    }
    state.tableData[2] = {
        name: "增值消费",
        union: handleNum(res.unionIncrementRate),
        club: handleNum(res.clubIncrementRate),
        platform: handleNum(res.platIncrementRate)
    }
}
const handleNum = (num) => {
    return num > 0 ? num / 100 : 0
}
const changeRate = async () => {
    const type = state.tableData.some((item) => {
        const rate = item.union + item.club + item.platform
        if (rate !== 100) {
            ElMessage.error(`${item.name}分成比例不为100`)
        }
        return rate !== 100
    })
    if (type) return
    const data = {
        unionId: state.unionId, // No comments found.
        clubInsuranceRate: state.tableData[0].club * 100, // 俱乐部保险分成比例
        platInsuranceRate: state.tableData[0].platform * 100, // 平台保险分成比例
        unionInsuranceRate: state.tableData[0].union * 100, // 联盟保险分成比例
        clubPumpingRate: state.tableData[1].club * 100, // 俱乐部抽水分成比例
        platPumpingRate: state.tableData[1].platform * 100, // 平台抽水分成比例
        unionPumpingRate: state.tableData[1].union * 100, // 联盟抽水分成比例
        clubIncrementRate: state.tableData[2].club * 100, // 俱乐部增值服务分成比例
        platIncrementRate: state.tableData[2].platform * 100, // 平台增值服务分成比例
        unionIncrementRate: state.tableData[2].union * 100 // 联盟增值服务分成比例
    }
    const res = await setAllianceCommission(data);
    if (res) {
        ElMessage.success('修改成功')
        dialogVisible.value = false;
    }
}
watch(() => props.unionIsShow, (newVal) => {
    if (newVal) {
        getAllianceRateAction(props.clubId)
    }
}
)
</script>

<style lang="scss" scoped>
.input {
    width: 100px;
}
</style>
