<template>
  <div class="login">
    <div class="login_op">
      <div class="login-left">
        <img src="../../../src/assets/img/login_left0.png" alt="login" />
      </div>
      <login-panel></login-panel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginPanel from './cpns/Login-panel.vue'
</script>

<style scoped lang="less">
.login {
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-image: url('../../../src/assets/img/login_bg.svg');
  background-color: #eeeeee;
  background-position: 50%;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login_op {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 4% 0 50px;
    background-color: hsla(0deg, 0%, 100%, 0.8);
    border-radius: 10px;
    .login-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
