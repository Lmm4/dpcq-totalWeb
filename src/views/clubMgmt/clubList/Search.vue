<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="俱乐部ID">
      <el-input v-model="formData.id" placeholder="请输入俱乐部ID" clearable />
    </el-form-item>
    <el-form-item label="俱乐部名称">
      <el-input v-model="formData.name" placeholder="请输入俱乐部名称" clearable />
    </el-form-item>
    <el-form-item label="联盟ID">
      <el-input v-model="formData.unionId" placeholder="请输入联盟ID" clearable />
    </el-form-item>
    <el-form-item label="俱乐部类型">
      <el-select v-model="formData.clubType" placeholder="请选择俱乐部类型">
        <el-option v-for="item in getDict('clubTypeOptions')" :key="item.value" :label="item.label"
          :value="item.value" />
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
import { getDict } from '@/utils/dict';
const props = defineProps(["onSearch"]);
const formRef = ref();


const formData = reactive({
  id: undefined,
  name: undefined,
  unionId: undefined,
  clubType: undefined
});

const refresh = () => {
  Object.assign(formData, {
    id: undefined,
    name: undefined,
    unionId: undefined,
    clubType: undefined
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
