<template>
    <div class="right_top">
        <div class="dfc">
            <el-icon :size="20" class="icon cursor" @click="changeMenuState">
                <Fold v-if="!menuState" />
                <Expand v-else />
            </el-icon>
            <div class="dfc ml20 f14 c6b">
                <div> 系统时间</div>
                <div class="ml10">{{ state.time }}</div>
            </div>
        </div>
        <div class="right_top_right">

            <el-tooltip class="item" effect="light" content="全屏" placement="bottom">
                <svg t="1724813759775" v-if="isFullscreen" class="icon icon_svg f24 mr20 cursor" @click="toggle"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1074" width="200"
                    height="200">
                    <path
                        d="M354.133333 682.666667H256v-42.666667h170.666667v170.666667H384v-98.133334L243.2 853.333333l-29.866667-29.866666L354.133333 682.666667z m358.4 0l140.8 140.8-29.866666 29.866666-140.8-140.8V810.666667h-42.666667v-170.666667h170.666667v42.666667h-98.133334zM354.133333 384L213.333333 243.2l29.866667-29.866667L384 354.133333V256h42.666667v170.666667H256V384h98.133333z m358.4 0H810.666667v42.666667h-170.666667V256h42.666667v98.133333L823.466667 213.333333l29.866666 29.866667L712.533333 384z"
                        p-id="1075"></path>
                </svg>
                <svg t="1724814051199" v-else class="icon icon_svg f24 mr20 cursor" @click="toggle"
                    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1227" width="200"
                    height="200">
                    <path
                        d="M285.866667 810.666667H384v42.666666H213.333333v-170.666666h42.666667v98.133333l128-128 29.866667 29.866667-128 128z m494.933333 0l-128-128 29.866667-29.866667 128 128V682.666667h42.666666v170.666666h-170.666666v-42.666666h98.133333zM285.866667 256l128 128-29.866667 29.866667-128-128V384H213.333333V213.333333h170.666667v42.666667H285.866667z m494.933333 0H682.666667V213.333333h170.666666v170.666667h-42.666666V285.866667l-128 128-29.866667-29.866667 128-128z"
                        p-id="1228"></path>
                </svg>
            </el-tooltip>
            <label class="switch mr20">
                <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill="#ffd43b">
                            <circle r="5" cy="12" cx="12"></circle>
                            <path
                                d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z">
                            </path>
                        </g>
                    </svg></span>
                <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z">
                        </path>
                    </svg></span>
                <input type="checkbox" v-model="isDark" class="input" @change="themeChange">
                <span class="slider"></span>
            </label>
            <!-- <img class="right_top_right_img" src="@/assets/avatar.png" /> -->
            <el-popover placement="bottom" popper-class="log_out_popover" trigger="hover">
                <div class="log_out" @click="logOut">退出登录</div>
                <template #reference>
                    <div class="right_top_right_text">
                        <div>{{ userInfo.userInfo.userName }}</div>
                        <div class="dfc">
                            在线
                        </div>
                    </div>
                </template>
            </el-popover>
        </div>
    </div>
</template>


<script setup>
import { storeToRefs } from 'pinia';
import { settingStore } from '@/stores/settings';
import { userInfoStore } from '@/stores/user';
import { tagsViewStore } from "@/stores/tagsView";
import { refreshToken } from "@/api/page/login.js";
import { localGet, localRemove, localSet } from "@/utils/local.js";
import { reactive, ref, onBeforeUnmount, onMounted } from "vue";
import { useDark, useToggle, useColorMode, useFullscreen } from '@vueuse/core';
import { dayjs } from "element-plus";
import Router from "@/router/index";


const tagsViewInfo = tagsViewStore();
const isDark = useDark();
const colorMode = useColorMode();//主题色
const toggleDark = useToggle(isDark);
const { isFullscreen, toggle } = useFullscreen();//全屏函数

const settingInfo = settingStore();
const userInfo = userInfoStore();
const { menuState } = storeToRefs(settingInfo)
// 展开/收缩左侧列表
const changeMenuState = () => {
    settingInfo.changeSetting(!menuState.value)
}

const state = reactive({
    time: "",
    timeClear: null,
    timeClear1: null
})

// 获取当前时间并计时
const getTime = () => {
    state.timeClear = setInterval(() => {
        state.time = dayjs().format("YYYY年MM月DD日 HH时mm分ss秒")
    }, 1000)
}

// 切换主题色
const themeChange = (val) => {
    toggleDark()
    isDark.value = val.target._modelValue
    if (isDark.value) {
        colorMode.value = "dark"
    } else {
        colorMode.value = "light"
    }
}
// 退出登录
const logOut = () => {
    userInfo.logout();
    tagsViewInfo.delAllViews();
}

// 是否正在刷新 Token
let isRefreshing = false;
// **刷新 Token 方法**
const refreshTokens = async () => {
    const tokenObject = localGet("tokenObject");
    const refresh = tokenObject?.refresh;

    if (!refresh) {
        console.error("❌ 无法刷新 Token，refreshToken 为空！");
        return null;
    }

    try {
        const res = await refreshToken({ refresh });
        if (res) {
            // 计算新的过期时间
            const newExpireTime = dayjs().valueOf() + 540 * 1000;
            tokenObject.expireTime = newExpireTime;
            tokenObject.token = res;
            localSet("tokenObject", tokenObject);
            return res;
        }
    } catch (error) {
        console.error("❌ 刷新 Token 失败，请重新登录！", error);
        return null;
    } finally {
        isRefreshing = false;
    }
};

// **检查 Token 是否即将过期**
const checkTokenExpire = async () => {
    const tokenObject = localGet("tokenObject");
    if (!tokenObject || !tokenObject.expireTime) return;

    const expireTime = tokenObject.expireTime;
    const currentTime = dayjs().valueOf();
    const remainingTime = expireTime - currentTime;
    // console.log(remainingTime);

    if (remainingTime <= 0) {
        // 9 分钟内
        if (!isRefreshing) {
            isRefreshing = true;
            await refreshTokens();
        }
    }
};


onMounted(() => {
    // **定时器：每 1 分钟检查一次**
    state.timeClear1 = setInterval(() => {
        checkTokenExpire()
    }, 30000);
    getTime();
})

onBeforeUnmount(() => {
    clearInterval(state.timeClear);
    clearInterval(state.timeClear1);
})

</script>

<style scoped lang="scss">
.right_top {
    height: 50px;
    background-color: var(--prism-topbackground);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: var(--prism-text-color);
    padding-right: 30px;

    .switch {
        font-size: 14px;
        position: relative;
        display: inline-block;
        width: 40px;
        height: 20px;

        input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .sun svg {
            position: absolute;
            top: 3px;
            left: 23px;
            z-index: 1;
            height: 14px;
            animation: rotate 15s linear infinite;
        }

        .moon svg {
            fill: #73C0FC;
            position: absolute;
            top: 3px;
            left: 2px;
            z-index: 1;
            width: 14px;
            height: 14px;
            animation: tilt 5s linear infinite;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #73C0FC;
            transition: .4s;
            border-radius: 30px;

            &:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                border-radius: 20px;
                left: 2px;
                bottom: 2px;
                z-index: 2;
                background-color: #e8e8e8;
                transition: .4s;
            }


        }

        @keyframes rotate {

            0% {
                transform: rotate(0);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        @keyframes tilt {

            0% {
                transform: rotate(0deg);
            }

            25% {
                transform: rotate(-10deg);
            }

            75% {
                transform: rotate(10deg);
            }

            100% {
                transform: rotate(0deg);
            }
        }

        .input:checked+.slider {
            background-color: #183153;
        }

        .input:focus+.slider {
            box-shadow: 0 0 1px #183153;
        }

        .input:checked+.slider:before {
            transform: translateX(20px);
        }
    }



    .right_top_right {
        display: flex;
        align-items: center;

        .icon_svg {
            fill: var(--prism-text-color);
            width: 24px;
            height: 24px;
        }

        .right_top_right_img {
            border-radius: 50%;
            margin-right: 10px;
            width: 32px;
            height: 32px;
        }

        .right_top_right_text {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>