<template>
  <div>
    <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="大股东昵称">
        <el-input v-model="formData.name" placeholder="请输入大股东昵称" clearable />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" icon="search">搜索</el-button>
        <el-button type="primary" @click="refresh(formRef)" icon="Refresh">重置</el-button>
        <el-button type="primary" @click="state.addShow = true" icon="plus">添加大股东</el-button>
      </el-form-item>
    </el-form>
    <addBigEquity v-model:show="state.addShow" @refresh="onSubmit" />
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import addBigEquity from "./addBigEquity.vue";
const props = defineProps(["onSearch"]);
const formRef = ref();

const state = reactive({
  addShow: false,
});

const formData = reactive({
  name: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    name: undefined,
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
