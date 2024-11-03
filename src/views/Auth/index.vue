<script setup name="Login">
import { ref, watch } from 'vue'
import { authRegisterAPI, authLoginAPI, signInWithGoogleAPI, signInWithPopupAPI } from '@/apis/auth.js'
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';


const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const displayMode = ref('login')
const userEmail = ref('')
const password = ref('')
const confirmPassword = ref('')
const registerForm = ref(null)
const loginForm = ref(null)

const onRegister = async () => {
  const result = await authRegisterAPI(userEmail.value, password.value)
  if (result == '註冊成功') {
    showSuccessToast('註冊成功！');
  } else if (result == '已註冊過') {
    showToast('該帳號已註冊過')
  } else {
    showFailToast('註冊失敗')
    resetInfo()
    registerForm.resetValidation()
    return
  }
  resetInfo()
  router.push({
    path: '/auth/login'
  })
}

const onSignIn = async () => {
  const res = await authLoginAPI(userEmail.value, password.value)
  if (res) {
    userStore.setUser(res)
    router.push({
      name: 'home'
    })
    showSuccessToast('登入成功！');
    resetInfo()
  } else {
    console.log('密碼錯誤/發生錯誤 ')
  }
}


const loginWithGoogle = async () => {
  const res = await signInWithPopupAPI()
  if (res) {
    userStore.setUser(res)
    resetInfo()
    router.push({
      name: 'home'
    })
    showSuccessToast('登入成功！');
  } else {
    //沒有登入成功
    console.log('沒有登入成功')
  }

}




const resetInfo = () => {
  userEmail.value = ''
  password.value = ''
  confirmPassword.value = ''
}

const toggleMode = () => {
  if (displayMode.value == 'login') {
    resetInfo()
    router.push({
      path: 'register'
    })
  } else {
    resetInfo()
    router.push({
      path: '/auth'
    })
  }
}

const useremailRule = [
  { required: true, message: '請填寫email', trigger: 'onBlur' },
  { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '不是有效的email', trigger: 'onChange' }
]

const passwordRule = [
  { required: true, message: '請填寫密碼', trigger: 'onBlur' },
  { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, message: '密碼需包含數字、大寫字母、小寫字母各一個', trigger: 'onChange' },
  {
    validator(value) {
      return value.length >= 8
    }, message: '密碼最少需為8位', trigger: ['onChange', 'onBlur']
  }
]

const confirmPasswordRule = [
  { required: true, message: '請再次輸入密碼' },
  {
    validator(value) {
      return value == password.value
    }, message: '請確認密碼是否一致', trigger: ['onChange', 'onBlur']
  }
]

watch(() => {
  return route.params.mode
}, () => {
  displayMode.value = route.params.mode
}, { immediate: true })

</script>
<template>
  <div class="welcome-sec text-3xl">Welcome!</div>

  <van-form ref="loginForm" v-if="displayMode == 'login'" @submit="onSignIn">
    <van-cell-group inset>
      <van-field v-model="userEmail" name="Email" label="Email" placeholder="請輸入email" :rules="useremailRule" />
      <van-field v-model="password" type="password" name="password" label="密碼" placeholder="密碼"
        :rules="[{ required: true, message: '密碼不得為空', trigger: 'onBlur' }]" />
    </van-cell-group>
    <div class="link-container">
      <a href="#" @click="toggleMode">立即註冊</a>
    </div>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
      <van-button icon="/official-Google-Logo-PNG-Image.png" @click="loginWithGoogle" style="margin-top: 5px;" round
        block>
        用Google開始
      </van-button>
    </div>
  </van-form>

  <van-form ref="registerForm" :show-error-message="true" v-else @submit="onRegister">
    <van-cell-group inset>
      <van-field v-model="userEmail" name="Email" label="Email" placeholder="請輸入email" :rules="useremailRule" />
      <van-field v-model="password" type="password" name="密碼" label="密碼" placeholder="密碼" :rules="passwordRule" />
      <van-field v-model="confirmPassword" type="password" name="確認密碼" label="確認密碼" placeholder="密碼"
        :rules="confirmPasswordRule" />

    </van-cell-group>
    <a href="#" @click="toggleMode">去登入</a>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        註冊
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

.van-field__label {
  width: 3rem;
}
</style>