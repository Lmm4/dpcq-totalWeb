<template>
    <div>
        <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="渠道编号">
                <el-input v-model="formData.channelId" placeholder="请输入渠道编号" clearable />
            </el-form-item>
            <el-form-item label="渠道名称">
                <el-input v-model="formData.name" placeholder="请输入渠道名称" clearable />
            </el-form-item>
            <el-form-item label="日期时间">
                <el-date-picker v-model="state.time" type="daterange" :shortcuts="shortcuts" start-placeholder="开始时间"
                    end-placeholder="结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" @change="timeChange" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
                <el-button type="primary" @click="refresh(formRef)" icon="Refresh">重置</el-button>
                <el-button @click="state.addShow = true" icon="plus">新增渠道</el-button>
            </el-form-item>
        </el-form>
        <!-- 新增渠道 -->
        <el-dialog v-model="state.addShow" title="新增渠道" width="500" @close="addFormRef.resetFields()" destroy-on-close>
            <el-form :model="state.addForm" label-width="auto" ref="addFormRef">
                <el-form-item label="渠道名称" prop="name" :rules="[
                    {
                        required: true,
                        message: '请输入渠道名称',
                        trigger: 'blur'
                    }
                ]">
                    <el-input v-model="state.addForm.name" />
                </el-form-item>
                <el-form-item label="渠道负责人" prop="manager" :rules="[
                    {
                        required: true,
                        message: '请输入渠道负责人',
                        trigger: 'blur'
                    }
                ]">
                    <el-input v-model="state.addForm.manager" />
                </el-form-item>
                <el-form-item label="落地页URL" prop="url" :rules="[
                    {
                        required: true,
                        message: '请输入落地页URL',
                        trigger: 'blur'
                    }
                ]">
                    <el-input v-model="state.addForm.url" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="state.addShow = false">取消</el-button>
                    <el-button type="primary" @click="sure"> 确定 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { addChannel } from "@/api/page/channelRet.js";
import { ElMessage, dayjs } from "element-plus";
const props = defineProps(["onSearch"]);
const formRef = ref();
const shortcuts = [
    {
        text: '最近一周',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        }
    },
    {
        text: '最近一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        }
    },
    {
        text: '最近三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        }
    }
]
const state = reactive({
    time: [],
    addShow: false, //修改弹窗
    addForm: {
        name: '',
        manager: '',
        url: ''
    }, //新增表单
})
const addFormRef = ref()

const formData = reactive({
    channelId: undefined,
    name: undefined,
    startData: undefined,
    endData: undefined,
});

const refresh = () => {
    Object.assign(formData, {
        channelId: undefined,
        name: undefined,
        startData: undefined,
        endData: undefined,
    });
    props.onSearch(formData);
};
const onSubmit = () => {
    props.onSearch(formData);
};

//时间处理
const timeChange = (val) => {
    if (val) {
        formData.startData = val[0];
        formData.endData = val[1];
    } else {
        formData.startData = undefined;
        formData.endData = undefined;
    }
}

// 确定
const sure = () => {
    addFormRef.value.validate(async (valid) => {
        if (valid) {
            const res = await addChannel(state.addForm)
            if (res) {
                state.addShow = false
                ElMessage.success('添加成功')
                onSubmit()
            }
        }
    })
}

</script>
<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>
