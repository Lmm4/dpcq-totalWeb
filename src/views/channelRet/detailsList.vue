<template>
  <div>
    <el-form :inline="true" :model="state.formInline" class="demo-form-inline">
      <el-form-item label="时间">
        <el-date-picker v-model="state.time" type="daterange" :shortcuts="shortcuts" format="YYYY-MM-DD"
          value-format="YYYY-MM-DD" @change="timeChange" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="state.tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" align="center" min-width="110" />
      <el-table-column prop="visits" label="访问量" align="center" min-width="100" />
      <el-table-column prop="downloads" label="安装量" align="center" min-width="100" />
      <el-table-column prop="newUsers" label="新增用户数" align="center" min-width="100" />
      <el-table-column prop="activeUsers" label="活跃用户数" align="center" min-width="100" />
      <el-table-column prop="registers" label="累计用户" align="center" min-width="100" />
      <el-table-column prop="rechargers" label="充值用户数" align="center" min-width="100" />
      <el-table-column prop="rechargeAmount" label="充值金额" align="center" min-width="100" />
      <el-table-column prop="arppu" label="平均充值金额（ARPPU）" align="center" min-width="120" />
      <el-table-column prop="rechargeCount" label="充值次数" align="center" min-width="100" />
      <el-table-column prop="firstRechargeCount" label="首次充值用户数" align="center" min-width="130" />
      <el-table-column prop="firstRechargeAmount" label="首次充值金额" align="center" min-width="120" />
      <el-table-column prop="firstRechargeConvertRate" label="首次充值转化率" align="center" min-width="130">
        <template #default="{ row }">
          <div>{{ row.firstRechargeConvertRate * 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column prop="withdraws" label="提现用户数" align="center" min-width="100" />
      <el-table-column prop="withdrawAmount" label="提现金额" align="center" min-width="100" />
      <el-table-column prop="awppu" label="平均提现金额" align="center" min-width="110" />
      <el-table-column prop="withdrawCount" label="提现次数" align="center" min-width="100" />
      <el-table-column prop="firstWithdrawCount" label="首次提现用户数" align="center" min-width="130" />
      <el-table-column prop="firstWithdrawAmount" label="首次提现金额" align="center" min-width="130" />
      <el-table-column prop="firstWithdrawConvertRate" label="首次提现转化率" align="center" min-width="130">
        <template #default="{ row }">
          <div>{{ row.firstWithdrawConvertRate * 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column prop="income" label="净收益" align="center" min-width="100" />
      <el-table-column prop="cost" label="成本" align="center" min-width="100">
        <template #default="{ row, $index }">
          <el-input v-model="row.cost" @input="debouncedInput($event, row, $index)" />
        </template>
      </el-table-column>
      <el-table-column prop="roi" label="投资回报率（ROI）" align="center" min-width="100">
        <template #default="{ row }">
          <div>{{ row.roi * 100 }}%</div>
        </template>
      </el-table-column>
      <el-table-column prop="arpu" label="ARPU" align="center" min-width="100" />
    </el-table>
    <div class="dfce">
      <el-pagination v-model:current-page="state.formInline.page" v-model:page-size="state.formInline.size"
        :page-sizes="[5, 10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="state.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { reactive, defineProps } from 'vue';
import { dayjs } from "element-plus";
import { getChannelDetailList, updateChannelCost } from "@/api/page/channelRet.js";

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

const props = defineProps({
  ChannelId: String
})

const state = reactive({
  formInline: {
    channelId: '',
    startData: '',
    endData: '',
    page: 1,
    size: 10
  },
  time: [],
  tableData: [], //表格数据
  total: 0 //总条数
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

// 条数
const handleSizeChange = (e) => {
  state.formInline.size = e
  getList()
}

// 页数
const handleCurrentChange = (e) => {
  state.formInline.page = e
  getList()
}

// 获取列表
const getList = async () => {
  state.formInline.channelId = props.ChannelId ?? '';
  const res = await getChannelDetailList(state.formInline)
  state.tableData = res.records;

  state.total = res.total;
}

// 防抖函数
const debounce = (func, delay) => {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const debouncedInput = debounce(async (value, row, index) => {
  const res = await updateChannelCost({
    channelId: props.ChannelId,
    cost: value,
    date: row.date
  })
  if (res) {
    getList()
  }
}, 1000)

getList()
</script>

<style scoped lang="scss">
.dfce {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
