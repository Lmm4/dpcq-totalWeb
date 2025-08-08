<template>
    <el-dialog v-model="show" title="生成账单" width="80%">
        <el-table :data="state.tableData" border style="width: 100%">
            <el-table-column prop="username" label="股东昵称" align="center" />
            <el-table-column prop="finalWinLoss" label="账变信息" align="center" />
            <el-table-column prop="feeAmount" label="手续费" align="center" />
            <el-table-column prop="siteFeeAmount" label="场馆费" align="center" />
            <el-table-column prop="totalAmount" label="总计" align="center" />
            <el-table-column prop="companyProfit" align="center">
                <template #header>
                    <div>公司分润{{ state.companyTitle }}%</div>
                </template>
            </el-table-column>
            <el-table-column prop="bigAdminProfit" align="center">
                <template #header>
                    <div>大股东分润{{ state.bigTitle }}%</div>
                </template>
            </el-table-column>
            <el-table-column prop="settleAmount" label="结算" align="center" />
        </el-table>
        <template #footer>
            <div class="dialog-footer">
                <!-- <el-button @click="show = false">取消</el-button> -->
                <el-button type="primary" @click="show = false">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, reactive, watch } from "vue";
import { generateBill } from "@/api/page/majorShareholderConfig.js";

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    billInfo: {
        type: Object,
        required: true
    }
})

const state = reactive({
    tableData: []
})



const emit = defineEmits(['update:show'])
const show = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})

const getInfo = async () => {
    const res = await generateBill(props.billInfo);
    state.companyTitle = res.companyProfitRate * 100;
    state.bigTitle = res.bigAdminProfitRate * 100;
    state.tableData.push(res);

}

watch(() => props.show, (newVal) => {
    if (newVal) {
        getInfo();
    } else {
        state.tableData = [];
        state.companyTitle = 0;
        state.bigTitle = 0;
    }
})
</script>

<style lang="scss" scoped></style>