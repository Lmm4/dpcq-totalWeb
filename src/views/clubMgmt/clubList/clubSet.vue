<template>
  <el-dialog v-model="dialogVisible" title="俱乐部设定" width="60%">
    <el-row>
      <el-col :span="12">
        <div class="f18 mb10 dfc">
          <div class="mr10">俱乐部人数限制：</div>
          <el-input-number style="width: 240px;" v-model="state.maxMemberCount" placeholder="请输入俱乐部人数限制" :min="0"
            :max="9999" controls-position="right" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="f18 mb10 dfc">
          <div class=" mr10">最大牌桌数：</div>
          <el-input-number style="width: 240px;" v-model="state.maxTableCount" placeholder="请输入最大牌桌数" :min="0"
            :max="9999" controls-position="right" />
        </div>
      </el-col>
    </el-row>
    <el-divider />
    <el-table :data="state.tableData" border style="width: 100%">
      <el-table-column prop="name" label="费用名称" align="center" />
      <el-table-column label="俱乐部分成(%)" align="center">
        <template #default="{ row }">
          <el-input-number :min="0" :max="100" controls-position="right" v-model="row.club" />
        </template>
      </el-table-column>
      <el-table-column label="联盟分成(%)" align="center">
        <template #default="{ row }">
          <el-input-number :min="0" :max="100" controls-position="right" v-model="row.union" />
        </template>
      </el-table-column>
      <el-table-column label="平台分成(%)" align="center">
        <template #default="{ row }">
          <el-input-number :min="0" :max="100" controls-position="right" v-model="row.platform" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="updateRateClubBtn">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, defineProps, watch } from 'vue'
import { getClubSetting, updateClubSetting } from '@/api/page/clubMgmt.js';
import { ElMessage } from 'element-plus';

const props = defineProps({
  clubIsShow: {
    type: Boolean,
    required: true
  },
  clubIsId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:clubIsShow'])

const state = reactive({
  tableData: [
    {
      name: "保险",
      club: 0,
      platform: 0,
      union: 0
    },
    {
      name: "抽水",
      club: 0,
      platform: 0,
      union: 0
    },
    {
      name: "增值消费",
      club: 0,
      platform: 0,
      union: 0
    }
  ],
  maxMemberCount: null,
  maxTableCount: null
})
// 提交配置更新
const updateRateClubBtn = async () => {
  if (!state.maxMemberCount) {
    ElMessage.error("俱乐部人数必填")
    return
  } else {
    let num = Number(state.maxMemberCount)
    if (num < 0 || num > 9999) {
      ElMessage.error("俱乐部人数不能大于9999且不能小于0")
      return
    }
  }
  if (!state.maxTableCount) {
    ElMessage.error("最大牌桌数必填")
    return
  } else {
    let num = Number(state.maxTableCount)
    if (num < 0 || num > 9999) {
      ElMessage.error("最大牌桌数不能大于9999且不能小于0")
      return
    }
  }
  let type = state.tableData.some(item => {
    let rate = item.union + item.club + item.platform
    if (rate !== 100) {
      ElMessage.error(`${item.name}分成比例不为100`)
    }
    return rate !== 100
  })
  if (type) return
  let data = {
    clubId: props.clubIsId,
    clubInsuranceRate: Number(state.tableData[0].club) * 100,
    platInsuranceRate: Number(state.tableData[0].platform) * 100,
    unionInsuranceRate: Number(state.tableData[0].union) * 100,
    clubPumpingRate: Number(state.tableData[1].club) * 100,
    platPumpingRate: Number(state.tableData[1].platform) * 100,
    unionPumpingRate: Number(state.tableData[1].union) * 100,
    clubIncrementRate: Number(state.tableData[2].club) * 100,
    platIncrementRate: Number(state.tableData[2].platform) * 100,
    unionIncrementRate: Number(state.tableData[2].union) * 100,
    maxMemberCount: Number(state.maxMemberCount),
    maxTableCount: Number()
  }
  const res = await updateClubSetting(data);
  if (res) {
    ElMessage.success("修改成功")
    dialogVisible.value = false
  } else {
    ElMessage.success("修改失败")
  }
}
const cancel = () => {
  dialogVisible.value = false
}
const getDetails = async (clubId) => {
  const res = await getClubSetting({ clubId });
  if (res) {
    state.tableData = [
      {
        name: "保险",
        club: handleNum(res.clubInsuranceRate),
        platform: handleNum(res.platInsuranceRate),
        union: handleNum(res.unionInsuranceRate)
      },
      {
        name: "抽水",
        club: handleNum(res.clubPumpingRate),
        platform: handleNum(res.platPumpingRate),
        union: handleNum(res.unionPumpingRate)
      },
      {
        name: "增值消费",
        club: handleNum(res.clubIncrementRate),
        platform: handleNum(res.platIncrementRate),
        union: handleNum(res.unionIncrementRate)
      }
    ]
    state.maxMemberCount = res.maxMemberCount;
    state.maxTableCount = res.maxTableCount;
  }
}
const handleNum = (num) => {
  let n = Number(num)
  return n > 0 ? n / 100 : 0
}
const dialogVisible = computed({
  get() {
    return props.clubIsShow
  },
  set(value: boolean) {
    emit('update:clubIsShow', value)
  }
})
watch(() => props.clubIsId, (newVal) => {
  getDetails(newVal);
});
</script>

<style lang="scss" scoped></style>
