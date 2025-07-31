<template>
  <!-- 留存统计 -->
  <div class="index">
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item>
        <el-icon class="cursor" size="22" @click="emit('goBack')">
          <ArrowLeftBold />
        </el-icon>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="state.time" type="daterange" :shortcuts="shortcuts" format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" @change="timeChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="dfc mb20">
      <el-radio-group v-model="state.radioType" @change="radioChange">
        <el-radio-button label="留存数" :value="0" />
        <el-radio-button label="留存率" :value="1" />
      </el-radio-group>
    </div>
    <el-table :data="state.tableData" border style="width: 100%">
      <el-table-column fixed="left" prop="date" label="时间" align="center" min-width="100" />
      <el-table-column fixed="left" prop="newUsers" label="新增用户" align="center" min-width="100" />

      <!-- 根据最大列数动态渲染 retainData 列 -->
      <template v-if="state.radioType == 0">
        <el-table-column v-for="(column, index) in maxColumnsCount" :key="'retainData-' + index"
          :label="'第 ' + (index + 1) + '天'" align="center" min-width="100" :prop="`day${index + 1}`" />
      </template>

      <!-- 根据最大列数动态渲染 retainRate 列 -->
      <template v-else>
        <el-table-column v-for="(column, index) in maxColumnsCount" :key="'retainRate-' + index"
          :label="'第 ' + (index + 1) + '天'" align="center" min-width="100" :prop="`dayRate${index + 1}`" />

      </template>
    </el-table>
  </div>
</template>

<script setup>
import { reactive, defineProps, computed } from 'vue';
import { dayjs } from "element-plus";
import { getChannelRetentionList } from '@/api/page/channelRet.js';
const emit = defineEmits(['goBack'])
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
const state = reactive({
  formInline: {
    channelId: '',
    startData: '',
    endData: ''
  },
  time: [],
  tableData: [
    {
      date: '',
      newUsers: 0,
      retainData: [], // 留存数据
      retainRate: [] // 留存率
    }
  ], //表格数据
  radioType: 0,//单选
})

// 计算最大列数
const maxColumnsCount = computed(() => {
  if (state.tableData.length > 0) {
    let count = 0
    // 遍历所有属性
    for (let key in state.tableData[0]) {
      if (state.tableData[0].hasOwnProperty(key) && key.startsWith('dayRate')) {
        count++
      }
    }
    return count
  }
})

// 单选
const radioChange = (value) => {
  state.radioType = value
}
// 重置
const resetForm = () => {
  state.formInline = {
    channelId: '',
    startData: '',
    endData: ''
  }
  state.time = []
}

const props = defineProps({
  ChannelId: Number
})

// 选择时间
const timeChange = (val) => {
  if (val) {
    state.formInline.startData = val[0]
    state.formInline.endData = val[1]
  } else {
    state.formInline.startData = ''
    state.formInline.endData = ''
    state.time = []
  }
}

// 获取列表
const getList = async () => {
  state.formInline.channelId = props.ChannelId ?? ''
  const res = await getChannelRetentionList(state.formInline)
  state.tableData = res.records
}

getList()
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;

  .dfce {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .dfc {
    display: flex;
    align-items: center;
  }

  .mb20 {
    margin-bottom: 20px;
  }

  .cursor {
    cursor: pointer;
  }
}
</style>
