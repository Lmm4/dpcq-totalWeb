<template>
    <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="用户ID">
            <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
        </el-form-item>
        <el-form-item label="平台用户昵称">
            <el-input v-model="formData.account" placeholder="请输入平台用户昵称" clearable />
        </el-form-item>
        <el-form-item label="状态">
            <el-select v-model="formData.status" placeholder="请选择状态" clearable>
                <el-option v-for="(v, i) in getDict('gameVideoStatus')" :key="i" :label="v.label" :value="v.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="游戏类型">
            <el-select v-model="formData.tabletype" placeholder="请选择游戏类型" clearable>
                <el-option v-for="(v, i) in getDict('gameVideoType')" :key="i" :label="v.label" :value="v.value" />
            </el-select>
        </el-form-item>
        <el-form-item label="局号">
            <el-input v-model="formData.roundnumber" placeholder="请输入局号" clearable />
        </el-form-item>
        <el-form-item label="日期时间">
            <el-date-picker v-model="state.time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
                format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" @change="timeChange" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
            <el-button type="primary" @click="refresh(formRef)" icon="Refresh">重置</el-button>
        </el-form-item>
        <el-form-item>
            <div>根据所选累计的有效投注额：{{ state.selectData }}</div>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive, toRef, watch } from "vue";
import { getDict } from '@/utils/dict';
import { dayjs } from "element-plus";
const props = defineProps(["onSearch", 'selectData']);
const formRef = ref();

const state = reactive({
    time: [],
    selectData: 0,
})

watch(() => props.selectData, (val) => {
    if (val) {
        state.selectData = val;
    } else {
        state.selectData = 0;
    }
});

const formData = reactive({
    userId: undefined,
    account: undefined,
    status: undefined,
    tabletype: undefined,
    roundnumber: undefined,
    startTime: undefined,
    endTime: undefined,
});

const refresh = () => {
    Object.assign(formData, {
        userId: undefined,
        account: undefined,
        status: undefined,
        tabletype: undefined,
        roundnumber: undefined,
        startTime: undefined,
        endTime: undefined,
    });
    props.onSearch(formData);
};
const onSubmit = () => {
    props.onSearch(formData);
};

//时间处理
const timeChange = (val) => {
    if (val) {
        formData.startTime = val[0];
        formData.endTime = val[1];
    } else {
        formData.startTime = undefined;
        formData.endTime = undefined;
    }
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
