<script setup name="Login">
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const onSubmit = () => {
  console.log('登入')
}


</script>
<template>
  <div class="welcome-sec text-3xl">Welcome!</div>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="username" name="帳號" label="帳號" placeholder="帳號"
        :rules="[{ required: true, message: '請填寫帳號' }]" />
      <van-field v-model="password" type="password" name="密碼" label="密碼" placeholder="密碼"
        :rules="[{ required: true, message: '請填寫密碼' }]" />
    </van-cell-group>
    <a href="#">忘記密碼？</a>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
      <van-button style="margin-top: 5px;" round block type="primary">
        其他登入方式1
      </van-button>
      <van-button style="margin-top: 5px;" round block type="primary">
        其他登入方式1
      </van-button>
    </div>
  </van-form>


</template>

<style scoped>
.welcome-sec {
  width: 100%;
  aspect-ratio: 1 / 0.9;
  border: 1px solid black
}
</style>