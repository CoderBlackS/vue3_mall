<template>
  <div class="login-panel">
    <div class="login-logo" data-v-37dfd6fc="">
      <img class="login-icon" src="../../../../src/assets/img/logo.svg" />
      <p class="logo-text">uno-Admin</p>
    </div>
    <login-account ref="accountRef"></login-account>
    <div class="login-btn">
      <el-button :icon="CircleClose" round size="large">重置</el-button>
      <el-button
        :icon="UserFilled"
        @click="handleLoginClick"
        round
        size="large"
        type="primary"
      >
        登录
      </el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LoginAccount from './Login-account.vue'
import { CircleClose, UserFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
const accountRef = ref<InstanceType<typeof LoginAccount>>()
const handleLoginClick = () => {
  accountRef.value?.loginAction()
}
</script>

<style scoped lang="less">
.login-panel {
  width: 420px;
  padding: 50px 40px 45px;
  border-radius: 10px;
  box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
  .login-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 45px;
    .login-icon {
      width: 60px;
      height: 52px;
    }
    .logo-text {
      padding-left: 25px;
      font-size: 42px;
      font-weight: bold;
      color: #34495e;
      white-space: nowrap;
    }
  }
  .login-btn {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
    white-space: nowrap;
    .el-button {
      width: 185px;
    }
  }
}
</style>
