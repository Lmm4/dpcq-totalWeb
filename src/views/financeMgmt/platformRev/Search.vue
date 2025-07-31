<template>
  <el-form ref="formRef" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item label="牌局ID">
      <el-input v-model="formData.gameId" placeholder="请输入牌局ID" clearable />
    </el-form-item>
    <el-form-item label="牌局名称">
      <el-input v-model="formData.gameName" placeholder="请输入牌局名称" clearable />
    </el-form-item>
    <el-form-item label="俱乐部查询">
      <el-input v-model="formData.clubInquiry" placeholder="请输入俱乐部查询" clearable />
    </el-form-item>
    <el-form-item label="联盟查询">
      <el-select v-model="formData.allianceSearch" placeholder="请选择联盟查询" clearable>
        <el-option label="小联盟" :value="0" />
        <el-option label="大联盟" :value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="订单编号">
      <el-input v-model="formData.orderNumber" placeholder="请输入订单编号" clearable />
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
  time: [],
})

const formData = reactive({
  gameId: undefined,
  gameName: undefined,
  clubInquiry: undefined,
  allianceSearch: undefined,
  orderNumber: undefined,
  startTime: undefined,
  endTime: undefined,
});

const refresh = () => {
  Object.assign(formData, {
    gameId: undefined,
    gameName: undefined,
    clubInquiry: undefined,
    allianceSearch: undefined,
    orderNumber: undefined,
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
