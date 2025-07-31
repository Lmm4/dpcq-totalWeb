<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="牌桌ID">
      <el-input v-model="formData.tableId" placeholder="请输入牌桌ID" clearable />
    </el-form-item>
    <el-form-item label="牌桌名称">
      <el-input v-model="formData.tableName" placeholder="请输入牌桌名称" clearable />
    </el-form-item>
    <el-form-item label="货币类型">
      <el-select v-model="formData.country" placeholder="请选择货币类型">
        <el-option v-for="item in getDict('currencyOptions')" :key="item.value" :label="item.label"
          :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间">
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
import { getDict } from '@/utils/dict';
import { dayjs } from "element-plus";
const props = defineProps(["onSearch"]);
const formRef = ref();

const state = reactive({
  time: [],
})

const formData = reactive({
  tableId: undefined,
  tableName: undefined,
  currencyType: undefined,
  startAt: undefined,
  endAt: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    tableId: undefined,
    tableName: undefined,
    currencyType: undefined,
    startAt: undefined,
    endAt: undefined,
  });
  props.onSearch(formData);
};
const onSubmit = () => {
  props.onSearch(formData);
};
//时间处理
const timeChange = (val) => {
  if (val) {
    formData.startAt = val[0];
    formData.endAt = val[1];
  } else {
    formData.startAt = undefined;
    formData.endAt = undefined;
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
