<template>
    <el-dialog v-model="show" title="添加大股东" width="500" @close="addFormRef.resetFields()">
        <el-form ref="addFormRef" :model="formData" :rules="rules" label-width="auto" label-position="top">
            <el-form-item label="大股东域名配置" prop="bigShareholderBackendUrl">
                <el-select v-model="formData.bigShareholderBackendUrl" placeholder="请选择大股东域名" clearable>
                    <el-option v-for="item in options" :key="item.id" :label="item.value" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="大股东昵称" prop="realName">
                <el-input v-model="formData.realName" maxlength="16" placeholder="请输入股东昵称" />
            </el-form-item>
            <el-form-item label="大股东账号" prop="username">
                <el-input v-model="formData.username" maxlength="12" placeholder="请输入大股东账号" />
            </el-form-item>
            <el-form-item label="大股东密码" prop="password">
                <el-input v-model="formData.password" maxlength="32" placeholder="请输入大股东密码" />
            </el-form-item>
            <el-form-item label="大股东分润比例" prop="bigShareholderProfitRatio">
                <el-input-number class="w100" v-model="formData.bigShareholderProfitRatio" placeholder="请输入大股东分润比例"
                    :controls="false" :min="0" :max="100">
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
import { addMajorShareholder, getDomainConfig } from "@/api/page/majorShareholderConfig.js";
import { toDecimal } from '@/utils/utils.js';
import { ElMessage } from "element-plus";



const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
})

const options = ref([]);

const addFormRef = ref(null);
const loading = ref(null);

const formData = reactive({
    bigShareholderBackendUrl: '',
    realName: '',
    bigShareholderProfitRatio: null,
    username: '',
    password: '',
})

const rules = reactive({
    bigShareholderBackendUrl: [
        { required: true, message: '请选择大股东域名', trigger: 'blur' },
    ],
    realName: [
        { required: true, message: '请输入大股东昵称', trigger: 'blur' },
    ],
    username: [
        { required: true, message: '请输入大股东账号', trigger: 'blur' },
        {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{4,12}$/,
            message: '账号必须为4-12位字母和数字组合，不能纯字母或纯数字',
            trigger: 'blur'
        }

    ],
    password: [
        { required: true, message: '请输入大股东密码', trigger: 'blur' },
        { min: 6, max: 32, message: '密码长度必须在6-20位之间', trigger: 'blur' }
    ],
    bigShareholderProfitRatio: [
        { required: true, message: '请输入大股东分润比例', trigger: 'blur' },
    ],
})

const emit = defineEmits(['update:show', 'refresh'])
const show = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})

// 获取域名配置
const getDomainConfigFn = async () => {
    const res = await getDomainConfig();
    options.value = res;
}

// 确定新增
const sure = () => {
    addFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                loading.value = true;
                let primary = { ...formData };
                primary.bigShareholderProfitRatio = toDecimal(primary.bigShareholderProfitRatio);
                await addMajorShareholder(primary);
                ElMessage.success('新增股东成功');
                emit('refresh');
                show.value = false;
            } catch (error) {
                // console.error("新增股东失败:", error);
                ElMessage.error(error.response.data.error);
            } finally {
                loading.value = false;
            }
        }
    })
}

watch(() => props.show, (newVal) => {
    if (newVal) {
        getDomainConfigFn();
    }
})
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    text-align: left;
}
</style>