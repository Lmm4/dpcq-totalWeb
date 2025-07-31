<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="用户ID">
      <el-input v-model="formData.userId" placeholder="请输入用户ID" clearable />
    </el-form-item>
    <el-form-item label="交易类型">
      <el-select v-model="formData.type" placeholder="请选择交易类型">
        <el-option v-for="item in state.typeOptions" :key="item.type" :label="item.desc" :value="item.type" />
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
import { getBillTypes } from '@/api/page/clubMgmt.js';
import { useRoute } from 'vue-router';
const route = useRoute();
const props = defineProps(["onSearch"]);
const formRef = ref();

const state = reactive({
  typeOptions: []
})

const formData = reactive({
  userId: route.query.id,
  type: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    userId: undefined,
    type: undefined,
  });
  props.onSearch(formData);
};
const onSubmit = () => {
  props.onSearch(formData);
};

const getType = async () => {
  const res = await getBillTypes({ category: 'USER' });
  state.typeOptions = res;
}

getType()
</script>
<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
