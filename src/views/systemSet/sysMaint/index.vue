<template>
    <div>
        <div class="dfc mb10">
            <div class="mr20">系统维护</div>
            <el-switch v-model="state.switchVal" width="60" inline-prompt active-text="开启" inactive-text="关闭"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" @change="dialogBtn" />
        </div>
        <div class="mb20">公告：通知：于2024年9月27日 16点28分 系统将会进行更新，更新时间为3小时，平台将进入维护阶段，届时用户无法进行对局比赛，为表达歉意，我们为每人提供10元传奇币奖励</div>
        <div> Notice: The system will be updated at 16:28 on September 27, 2024, with a duration
            of 3 hours. The platform will enter the maintenance phase, and users will not be
            able to participate in matches at that time. To express our apologies, we will
            provide a 10 yuan Legend Coin reward for each person</div>
        <el-dialog v-model="state.bulletinShow" title="系统维护(当用户开启系统维护时，必须填写通知公告)" width="800"
            :close-on-press-escape="false" :close-on-click-modal="false" :before-close="handleClose">
            <div class="mb10">中文通告</div>
            <el-input v-model="state.cnTextarea" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                placeholder="请填写中文通告..." />
            <div class="mb10 mt20">英文通告</div>
            <el-input v-model="state.enTextarea" :autosize="{ minRows: 4, maxRows: 6 }" type="textarea"
                placeholder="请填写英文通告..." />
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancelBtn">取消</el-button>
                    <el-button type="primary" @click="confirmMaintainBtn">
                        确定
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { reactive } from "vue";
const state = reactive({
    switchVal: false,
    bulletinShow: false,//公告弹窗
    cnTextarea: "",//中文通告
    enTextarea: "",//英文通告
});


const dialogBtn = () => {
    if (state.switchVal) {
        state.bulletinShow = true;
    } else {
        state.bulletinShow = false;
    }
};

// 确认维护
const confirmMaintainBtn = () => {
    state.bulletinShow = false;
};

// 取消按钮
const cancelBtn = () => {
    state.bulletinShow = false;
    state.switchVal = false;
};


// 右上角关闭按钮
const handleClose = () => {
    state.bulletinShow = false;
    state.switchVal = false;
};

</script>

<style lang="scss" scoped></style>