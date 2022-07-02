<template>
  <div class="login-account">
    <el-form :rules="rules" :model="account" ref="formRef">
      <el-form-item prop="name">
        <el-input placeholder="用户名：admin / user" v-model="account.name">
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="密码：123456"
          autocomplete="new-password"
          show-password
          v-model="account.password"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineExpose } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
//获取一下store
const store = useStore()
const account = reactive({
  name: '',
  password: ''
})
const rules = {
  name: [
    { required: true, message: '用户名是必传内容~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,18}$/,
      message: '用户名必须是5-10个字母或者数字~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '密码是必传内容~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{5,18}$/,
      message: '密码必须是5-10个字母或者数字~',
      trigger: 'blur'
    }
  ]
}
//拿到组件实例
const formRef = ref<InstanceType<typeof ElForm>>()
const loginAction = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      //开启登录验证
      store.dispatch('login/accountLoginAction', { ...account })
    }
  })
}
//将需要暴露出去的数据与方法都可以暴露出去
defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
::v-deep .el-input__inner {
  height: 45px;
}
</style>
