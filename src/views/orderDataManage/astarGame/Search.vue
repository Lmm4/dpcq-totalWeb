<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="用户ID">
      <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
    </el-form-item>
    <!-- <el-form-item label="局号">
      <el-input v-model="formData.roundNumber" placeholder="请输入局号" clearable />
    </el-form-item> -->
    <el-form-item label="用户账号">
      <el-input v-model="formData.username" placeholder="请输入用户账号" clearable />
    </el-form-item>
    <el-form-item label="游戏类型">
      <el-select v-model="formData.tableType" clearable placeholder="请选择游戏类型" style="width: 240px">
        <el-option v-for="item in getDict('typeList')" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="日期时间">
      <el-date-picker v-model="time" type="daterange" :shortcuts="shortcuts" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
      <el-button type="primary" @click="refresh(formRef)" icon="Refresh">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { dayjs } from "element-plus";
import { getDict } from "@/utils/dict.js";
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
]

const props = defineProps(["onSearch"]);
const formRef = ref();
const time = ref();


const formData = reactive({
  userId: "",
  roundNumber: "",
  username: "",
  tableType: "",
  startTime: "",
  endTime: "",
});

const refresh = () => {
  Object.assign(formData, {
    userId: "",
    roundNumber: "",
    username: "",
    tableType: "",
    startTime: "",
    endTime: "",
  });
  props.onSearch(formData);
};
const onSubmit = () => {
  props.onSearch(formData);
};

// 处理时间选择
watch(() => time.value, (val) => {
  if (val) {
    formData.startTime = dayjs(val[0]).format('YYYY-MM-DD HH:mm:ss');
    formData.endTime = dayjs(val[1]).format('YYYY-MM-DD HH:mm:ss');
  } else {
    formData.startTime = '';
    formData.endTime = '';
  }
}, { deep: true });

</script>
<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
