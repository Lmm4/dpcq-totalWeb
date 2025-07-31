<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="用户昵称">
      <el-input v-model="formData.nickName" placeholder="请输入用户昵称" clearable />
    </el-form-item>
    <el-form-item label="用户ID">
      <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
    </el-form-item>
    <el-form-item label="用户子钱包地址">
      <el-input v-model="formData.address" placeholder="请输入用户子钱包地址" clearable />
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
  nickName: undefined,
  userId: undefined,
  address: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    nickName: undefined,
    userId: undefined,
    address: undefined,
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
