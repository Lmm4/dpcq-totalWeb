<template>
    <el-dialog v-model="show" title="比例配置" width="500" @close="formDataRef.resetFields()">
        <el-form ref="formDataRef" :model="formData" :rules="rules" label-width="auto" label-position="top">
            <el-form-item label="股东分润比例" prop="subProfit">
                <el-input-number class="w100" v-model="formData.subProfit" placeholder="请输入大股东分润比例" :controls="false"
                    :min="0" :max="100">
                    <template #suffix>
                        <span>%</span>
                    </template>
                </el-input-number>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="show = false">取消</el-button>
                <el-button type="primary" @click="sure" :loading="loading">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref, reactive, watch } from "vue";
import { deployShareholderRatio } from "@/api/page/majorShareholderConfig.js";
import { ElMessage } from "element-plus";
import { toDecimal } from '@/utils/utils.js';



const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    bigInfo: {
        type: Object,
        default: () => ({
            subId: '',
            subProfit: null,
        })
    }
})

const formDataRef = ref(null);
const loading = ref(false);

const formData = reactive({
    subId: '',
    subProfit: null,
})

const rules = reactive({
    subProfit: [
        { required: true, message: '请输入大股东分润比例', trigger: 'change' },
    ],
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

// 比例确定
const sure = () => {
    formDataRef.value.validate(async (valid) => {
        if (valid) {
            try {
                loading.value = true;
                let primary = { ...formData };
                primary.subProfit = toDecimal(primary.subProfit);
                await deployShareholderRatio(primary);
                ElMessage.success("比例配置成功");
                show.value = false; // 关闭对话框
                emit('refresh');

            } catch (error) {
                // ElMessage.error(error.response.data.error);
            } finally {
                loading.value = false;
            }
        } else {
            ElMessage.error("请填写完整信息");
            return false;
        }
    })
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        formData.subId = props.bigInfo.subId;
        formData.subProfit = props.bigInfo.subProfit * 100;
    } else {
        formDataRef.value.resetFields();
    }
});
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    text-align: left;
}
</style>