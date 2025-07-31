<template>
  <!-- 渠道统计 -->
  <div class="index">
    <div class="dfc mb20">
      <el-icon class="cursor" size="22" @click="emit('goBack')">
        <ArrowLeftBold />
      </el-icon>
      <el-button class="ml20" type="primary" @click="state.addShow = true"> 新增渠道用户 </el-button>
    </div>
    <el-table :data="state.tableData" border style="width: 100%">
      <el-table-column prop="userId" label="用户ID" align="center" min-width="100" />
      <el-table-column prop="nickName" label="昵称" align="center" min-width="100" />
      <el-table-column prop="balance" label="个人钱包余额" align="center" min-width="100" />
      <el-table-column prop="rechargeTotal" label="累计总充值" align="center" min-width="100" />
      <el-table-column prop="withdrawTotal" label="累计总提现" align="center" min-width="100" />
      <el-table-column prop="time" label="加入时间" align="center" min-width="100" />
      <el-table-column prop="rechargers" label="操作" align="center" min-width="100">
        <template #default="{ row }">
          <el-button type="primary" text @click="userTotal(row.userId)"> 用户总计 </el-button>
          <el-button type="primary" text @click="delBtn(row.userId)"> 删除 </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="dfce">
      <el-pagination v-model:current-page="state.formInline.page" v-model:page-size="state.formInline.size"
        :page-sizes="[5, 10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="state.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 新增渠道用户 -->
    <el-dialog v-model="state.addShow" title="新增渠道用户" width="500" @close="dialogClose" destroy-on-close>
      <el-form :model="state.addForm" label-width="auto" ref="formRef">
        <el-form-item label="渠道ID" prop="channelId" :rules="[
          {
            required: true,
            message: '请输入渠道名称',
            trigger: 'blur'
          }
        ]">
          <el-input disabled v-model="state.addForm.channelId" />
        </el-form-item>
        <el-form-item label="渠道用户ID" prop="userId" :rules="[
          {
            required: true,
            message: '请输入渠道用户ID',
            trigger: 'blur'
          }
        ]">
          <el-input v-model="state.addForm.userId" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="state.addShow = false">取消</el-button>
          <el-button type="primary" @click="sure"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 用户总数据 -->
    <el-dialog v-model="state.totalShow" title="用户总数据" width="800px" destroy-on-close>
      <el-table :data="state.totalData" border style="width: 100%">
        <el-table-column prop="amount" label="总得分" align="center" />
        <el-table-column prop="bet" label="总押分" align="center" />
        <el-table-column prop="validbet" label="总投注" align="center" />
        <el-table-column prop="win" label="总结算金额" align="center" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, defineProps, defineEmits } from 'vue';
import { addChannelUser, delChannelUser, getChannelUserList, getChannelUserTotal } from "@/api/page/channelRet.js";
import { ElMessage, ElMessageBox } from 'element-plus';
const emit = defineEmits(['goBack'])

const state = reactive({
  formInline: {
    channelId: '',
    page: 1,
    size: 10
  },
  time: [],
  tableData: [], //表格数据
  total: 0, //总条数
  addShow: false, //修改弹窗
  addForm: {
    channelId: '',
    userId: ''
  }, //新增表单
  totalShow: false,
  totalData: [],//用户总数据
})

const props = defineProps({
  channelId: Number
})

const formRef = ref()



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

// 弹窗关闭
const dialogClose = () => {
  state.addForm.userId = ''
}

// 删除
const delBtn = (id) => {
  ElMessageBox.confirm('是否删除该渠道用户?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await delChannelUser({ channelId: state.formInline.channelId, userId: id })
      if (res) {
        ElMessage.success('删除成功')
        getList()
      }
    })
    .catch(() => { })
}

// 确定
const sure = () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await addChannelUser(state.addForm)
      if (res) {
        state.addShow = false
        ElMessage.success('添加成功')
        getList()
      }
    }
  })
}

// 用户总计
const userTotal = async (userId) => {
  state.totalShow = true;
  const res = await getChannelUserTotal({ userId });
  state.totalData = [res.data];
}

// 获取列表
const getList = async () => {
  state.formInline.channelId = props.channelId ?? ''
  state.addForm.channelId = props.channelId ?? ''
  const res = await getChannelUserList(state.formInline)
  state.tableData = res.records
  state.total = res.total
}

onMounted(() => {
  getList();
})
</script>

<style scoped lang="scss">
.index {
  width: 100%;
  height: 100%;

  .mb20 {
    margin-bottom: 20px;
  }

  .ml20 {
    margin-left: 20px;
  }

  .cursor {
    cursor: pointer;
  }

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
}
</style>
