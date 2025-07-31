<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="角色名称">
      <el-input v-model="formData.name" placeholder="请输入角色名称" clearable />
    </el-form-item>
    <el-form-item label="角色标识">
      <el-input v-model="formData.code" placeholder="请输入角色标识" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formData.status" clearable placeholder="请选择状态">
        <el-option label="开启" :value="0" />
        <el-option label="关闭" :value="1" />
      </el-select>
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
const formRef = ref();


const formData = reactive({
  name: undefined,
  code: undefined,
  status: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    name: undefined,
    code: undefined,
    status: undefined,
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
