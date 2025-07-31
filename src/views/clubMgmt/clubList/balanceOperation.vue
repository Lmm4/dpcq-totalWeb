<template>
  <!-- 余额操作弹框 -->
  <el-dialog v-model="dialogVisible" title="俱乐部余额操作" width="500">
    <div class="dfc">
      <p class="mr10">目前俱乐部余额:</p>
      {{ balance }}
    </div>
    <el-divider />
    <div class="text-18px">
      <el-form ref="ruleFormRef" :model="ruleForm" label-width="auto">
        <el-form-item label="原因" prop="type" required :rules="[
          {
            required: true,
            message: '请选择原因',
            trigger: 'blur'
          }
        ]">
          <el-select v-model="ruleForm.type" placeholder="请选择原因">
            <el-option :label="item.label" :value="item.value" v-for="item in getDict('upAndDown')" :key="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="变化值" prop="amount" required :rules="[
          {
            required: true,
            message: '请输入变化值',
            trigger: 'blur'
          }
        ]">
          <el-input type="number" v-model="ruleForm.amount" placeholder="请输入变化值" />
        </el-form-item>
        <el-form-item label="备注" prop="memo" required :rules="[
          {
            required: true,
            message: '请输入备注',
            trigger: 'blur'
          }
        ]">
          <el-input v-model="ruleForm.memo" type="textarea" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, reactive, watch } from 'vue'
import { getClubBalance, manualUpDown } from '@/api/page/clubMgmt.js';
import { getDict } from '@/utils/dict.js';
import { ElMessage } from 'element-plus';

const props = defineProps({
  balanceIsShow: {
    type: Boolean,
    required: true
  },
  clubId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:balanceIsShow'])

// 选择表单
const ruleForm = reactive({
  type: '',
  amount: '',
  memo: ''
})
const ruleFormRef = ref()
const balance = ref('')

const dialogVisible = computed({
  get() {
    return props.balanceIsShow
  },
  set(value: boolean) {
    emit('update:balanceIsShow', value)
  }
})
const getBalance = async (clubId) => {
  const res = await getClubBalance({ clubId });
  balance.value = res;
}
const submit = () => {
  ruleFormRef.value.validate(async (res) => {
    if (res) {
      let data = {
        ...ruleForm,
        userId: props.clubId,
        symbol: 'DPCQ'
      }
      const resp = await manualUpDown(data);
      if (resp) {
        ElMessage.success(`修改成功`)
        dialogVisible.value = false;
      }
    }
  })
}
watch(
  () => props.balanceIsShow,
  async () => {
    const { balanceIsShow, clubId } = props
    if (balanceIsShow && clubId) {
      getBalance(clubId)
    } else {
      if (ruleFormRef.value) {
        ruleFormRef.value.resetFields()
      }
    }
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped></style>
