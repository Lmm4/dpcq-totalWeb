<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="用户ID">
      <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
    </el-form-item>
    <el-form-item label="用户账号">
      <el-input v-model="formData.userName" placeholder="请输入用户账号" clearable />
    </el-form-item>
    <el-form-item label="昵称">
      <el-input v-model="formData.nikeName" placeholder="请输入昵称" clearable />
    </el-form-item>
    <el-form-item label="订单编号">
      <el-input v-model="formData.id" placeholder="请输入订单编号" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formData.status" placeholder="请选择状态" clearable>
        <el-option v-for="dict in state.stateType" :key="dict.value" :label="dict.label" :value="dict.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="收款地址">
      <el-input v-model="formData.toAddress" placeholder="请输入收款地址" clearable />
    </el-form-item>
    <el-form-item label="出款地址">
      <el-input v-model="formData.fromAddress" placeholder="请输入出款地址" clearable />
    </el-form-item>
    <el-form-item label="TXID">
      <el-input v-model="formData.hash" placeholder="请输入TXID" clearable />
    </el-form-item>
    <el-form-item label="日期时间">
      <el-date-picker v-model="state.time" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间"
        format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" @change="timeChange" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
      <el-button type="primary" @click="refresh(formRef)" icon="Refresh">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from "vue";
import { dayjs } from "element-plus";
const props = defineProps(["onSearch"]);
const formRef = ref();

const state = reactive({
  stateType: [
    { value: 'confirm', label: '已到账' },
    { value: 'abnormal', label: '交易异常' }
  ],
  time: [],
})

const formData = reactive({
  userId: undefined,
  userName: undefined,
  nikeName: undefined,
  id: undefined,
  status: undefined,
  toAddress: undefined,
  fromAddress: undefined,
  hash: undefined,
  startTime: undefined,
  endTime: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    userId: undefined,
    userName: undefined,
    nikeName: undefined,
    id: undefined,
    status: undefined,
    toAddress: undefined,
    fromAddress: undefined,
    hash: undefined,
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
    formData.startTime = dayjs(val[0]).valueOf();
    formData.endTime = dayjs(val[1]).valueOf();
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
