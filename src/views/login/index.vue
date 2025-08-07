<template>
  <div class="login">
    <div class="login_left dfcc cfff">德扑总后台</div>
    <div class="login_center">
      <div class="tai_ji">
        <div class="one"></div>
        <div class="two"></div>
      </div>
    </div>
    <div class=" login_right dfcc">
      <div class="login_box">
        <el-form ref="ruleFormRef" class="form form2" :model="loginForm" hide-required-asterisk :rules="rules"
          label-width="82px" label-position="right">
          <h2 class="title">登 录</h2>
          <el-form-item label="用户名" style="width: 100%" prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" style="width: 100%" prop="password">
            <el-input show-password v-model="loginForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
        <div class="dfcc mt20">
          <el-button class="login_btn" @click="login">登录</el-button>
        </div>
      </div>
    </div>
    <el-dialog v-model="state.imageShow" title="请选择最符合描述的图片" width="400">
      <div class="mb5 f5">“ {{ getDictLabel('imageKey', state.imgInfo?.word) }} ”</div>
      <div class="dfcw">
        <div v-for="(v, i) in state.imgInfo.imgVos" :key="i" class="img_box mb10 cursor" @click="selectImg(v.id)">
          <img class="w100 h100" style="vertical-align: bottom;" :src="v.imgUrl" />
          <div class="dfcc select_icon" v-if="loginForm.verifyValue.includes(v.id)">
            <el-icon color="#67C23A" :size="40">
              <CircleCheckFilled />
            </el-icon>
          </div>
        </div>
      </div>
      <div class="dfcsb mt-2">
        <div class="dfc cursor" @click="refreshCaptcha">
          <el-icon :size="20">
            <RefreshRight />
          </el-icon>
          <div class="">换一组</div>
        </div>
        <el-button type="primary" @click="handleLogin" :loading="state.loginLoading">确定</el-button>
      </div>
    </el-dialog>
    <div class="dfcc w100 mask" v-if="state.captchaShow" @click="state.captchaShow = false">
      <!-- <div id="recaptcha-container"></div> -->
      <VueRecaptcha v-if="state.captchaShow" :sitekey="googleKey" ref="recaptcha" size="normal" theme="light"
        @verify="onVerify" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, useTemplateRef, computed, nextTick } from 'vue';
import { userInfoStore } from '@/stores/user.js';
import { onKeyStroke } from '@vueuse/core';
import { localGet } from "@/utils/local.js";
import { ElMessage, ElNotification } from "element-plus";
import Router, { resetRouter } from "@/router/index";
import { getDictLabel } from '@/utils/dict';
import VueRecaptcha from 'vue3-recaptcha2';
import { getCaptcha, checkGoogle } from "@/api/page/login.js";
const googleKey = import.meta.env.VITE_GOOGLE_KEY;



const userInfo = userInfoStore();
const loginForm = reactive({
  username: "",
  password: "",
  verifyId: '',
  verifyValue: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const state = reactive({
  loginLoading: false,
  imgInfo: [],
  imageShow: false,
  captchaShow: false,
})
const ruleFormRef = ref(null);
const recaptcha = ref(null);

// 登录
const login = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      // loginForm.verifyValue = [];
      // const res = await getCaptcha({ username: loginForm.username });
      // // console.log(res);
      // loginForm.verifyId = res.sign;
      // state.imgInfo = res
      // state.imageShow = true;
      state.captchaShow = true;
      // let time = setTimeout(() => {
      //   recaptcha.value.reset();
      //   clearTimeout(time);
      // }, 600)
    }
  })
}

const onVerify = async (token) => {
  // console.log('✅ 验证通过，token:', token);
  const res = await checkGoogle({
    key: loginForm.username,
    token: localGet("uuid"),
    secret: loginForm.password,
    response: token
  })
  if (res.success) {
    loginForm.verifyId = localGet("uuid");
    handleLogin();
  } else {
    recaptcha.value.reset();
  }
}

const renderRecaptcha = () => {
  window.grecaptcha.render('recaptcha-container', {
    // sitekey: '6LckLYIrAAAAAOtg8z5URMAG-4MFAj3iE99o5CgK', // 从 Google 管理后台获取
    sitekey: '6LeAgY4rAAAAAD8v4scYcgKIlVtI36BhFI9E6epg', // 从 Google 管理后台获取
    callback: async (token) => {
      // console.log('✅ 验证通过，token:', token);
      if (res.success) {
        loginForm.verifyId = localGet("uuid");
        handleLogin();
      } else {
        window.grecaptcha.reset();
      }
    },
    'expired-callback': () => {
      console.warn('⚠️ 验证过期');
    }
  });
}

// 弹窗确定
const handleLogin = async () => {
  // if (loginForm.verifyValue.length < 1) return ElMessage.error('请选择图片！');
  // state.loginLoading = true;

  try {
    await userInfo.login(loginForm)
  } catch (error) {
    // refreshCaptcha();
    state.captchaShow = false;
  } finally {
    state.loginLoading = false;

  }
}

// 刷新图片列表
const refreshCaptcha = async () => {
  loginForm.verifyValue = [];
  const res = await getCaptcha({ username: loginForm.username })
  loginForm.verifyId = res.sign;
  state.imgInfo = res
}

// 选择图片
const selectImg = (val) => {
  if (loginForm.verifyValue.includes(val)) {
    loginForm.verifyValue = loginForm.verifyValue.filter(item => item != val);
  } else {
    loginForm.verifyValue.push(val)
  }
}

onKeyStroke('Enter', (e) => {
  login();
})

onMounted(() => {


})
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #000 0, #000 50%, #fff 50%);
  display: flex;
  overflow: hidden;
  position: relative;

  .login_center {
    position: absolute;
    top: 50%;
    left: 45%;
    transform: translate(-50%, -50%);

    .tai_ji {
      width: 200px;
      height: 200px;
      background-color: #000;
      // border: 1px solid #fff;
      border-radius: 50%;
      background: linear-gradient(to right, black 50%, white 50%);
      position: relative;
      top: 50%;
      left: 50%;
      animation: rota 2s linear infinite;

      .one {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: -webkit-radial-gradient(center, white 20%, black 20%);
        position: absolute;
        top: 0;
        left: 50px;
      }

      .two {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: -webkit-radial-gradient(center, black 20%, white 20%);
        position: absolute;
        bottom: 0;
        left: 50px;
      }
    }

    @keyframes rota {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }
  }


  @keyframes collide {
    0% {
      transform: translateX(0);
    }

    /* 碰撞阶段 */
    50% {
      transform: translateX(100%);
    }

    70% {
      transform: translateX(95%);
    }


    100% {
      transform: translateX(100%);
    }
  }

  @keyframes collide-right {
    0% {
      transform: translateX(0);
    }

    50% {
      transform: translateX(-100%);
    }

    70% {
      transform: translateX(-95%);
    }

    100% {
      transform: translateX(-100%);
    }
  }

  .login_left {
    width: 50%;
    height: 100%;
    position: absolute;
    left: -50%;
    animation: collide 2s cubic-bezier(.41, 1.13, .54, 1.16) forwards;
    font-size: 50px;
    font-weight: 700;
  }

  .login_right {
    width: 50%;
    height: 100%;
    position: absolute;
    right: -50%;
    animation: collide-right 2s cubic-bezier(.41, 1.13, .54, 1.16) forwards;

    .login_box {
      position: relative;
      width: 400px;
      min-height: 400px;
      background: rgba(255, 255, 255, .1);
      border-radius: 10px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      // align-items: center;
      flex-direction: column;
      backdrop-filter: blur(5px);
      box-shadow: 0px 0px 12px rgba(0, 0, 0, .12);
      border: 1px solid rgba(255, 255, 255, .5);
      border-right: 1px solid rgba(255, 255, 255, .2);
      border-bottom: 1px solid rgba(255, 255, 255, .2);

      .el-form-item:last-child {
        margin-bottom: 0 !important;

        .el-checkbox__label {
          color: #000;
        }
      }

      .title {
        width: 100%;
        text-align: center;
        font-size: 30px !important;
        font-weight: 600;
        color: #8f2c24;
        margin-bottom: 10px;
      }

      .login_btn {
        margin-top: 10px;
        height: 40px;
        width: 150px;
        position: relative;
        background-color: transparent;
        cursor: pointer;
        border: 2px solid #000;
        overflow: hidden;
        border-radius: 6px;
        color: #000;
        transition: all 0.5s ease-in-out;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          transition: all 0.5s ease-in-out;
          background-color: #000;
          border-radius: 30px;
          visibility: hidden;
          height: 10px;
          width: 10px;
          z-index: -1;
        }

        &:hover {
          box-shadow: 1px 1px 200px #000;
          color: #fff;
          border: none;
        }

        &:hover::after {
          visibility: visible;
          transform: scale(100) translateX(2px);
        }
      }
    }
  }

  .img_box {
    width: calc((100% - 20px) / 3);
    aspect-ratio: 1;
    margin-right: 10px;
    position: relative;

    &:nth-child(3n) {
      margin-right: 0;
    }

    .select_icon {
      position: absolute;
      width: 100%;
      height: 100%;
      inset: 0;

      background-color: rgba($color: #000000, $alpha: 0.5);
    }
  }

  .mask {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 99;
  }
}
</style>