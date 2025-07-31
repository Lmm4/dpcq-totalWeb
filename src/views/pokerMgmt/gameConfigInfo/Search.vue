<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="牌桌ID">
      <el-input v-model="formData.tableId" placeholder="请输入牌桌ID" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
      <el-button type="primary" @click="refresh(formRef)" icon="Refresh">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps(["onSearch"]);
import { useRoute } from 'vue-router';
const route = useRoute();

const formRef = ref();


const formData = reactive({
  tableId: route.query.tableId || undefined,
  tableName: undefined,
  currencyType: undefined,
  startAt: undefined,
  endAt: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    tableId: undefined,

  });
  props.onSearch(formData);
};
const onSubmit = () => {
  props.onSearch(formData);
};

</script>
<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
