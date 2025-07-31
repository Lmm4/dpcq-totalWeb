<template>
    <div>
        <el-form :model="form" ref="formRef" label-width="auto">
            <el-form-item label="汇率转换">
                <div class="flex">
                    <el-input v-model="form.legendCoin" style="max-width: 200px">
                        <template #append>传奇币</template>
                    </el-input>
                    <span class="mr5 ml5"> = </span>
                    <el-input v-model="form.legendCoin" style="max-width: 200px">
                        <template #append>RMB</template>
                    </el-input>
                </div>
            </el-form-item>
            <el-form-item label="转账给俱乐部最低转账金额">
                <el-input v-model="form.legendCoin" style="max-width: 200px">
                    <template #append>传奇币</template>
                </el-input>
            </el-form-item>
            <el-form-item label="转账给用户最低转账金额">
                <el-input v-model="form.legendCoin" style="max-width: 200px">
                    <template #append>传奇币</template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit(formRef)">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
    name: "",
    legendCoin: "1",
});


const submit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
        if (valid) {
            // await updateUserPassword(password.oldPassword, password.newPassword);
            // message.success(t("common.updateSuccess"));
        }
    });
};
</script>

<style lang="scss" scoped></style>