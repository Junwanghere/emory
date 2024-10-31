<script setup name="Login">
import { ref, computed } from 'vue'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authRegisterAPI } from '@/apis/auth.js'




const displayMode = ref('login')
const userEmail = ref('')
const password = ref('')
const confirmPassword = ref('')

const registerForm = ref(null)

const onRegister = async () => {
  const res = await authRegisterAPI(userEmail.value, password.value)
  resetInfo()
}

const onSubmit = () => {

}


const loginWithGoogle = () => {

}

const resetInfo = () => {
  userEmail.value = ''
  password.value = ''
  confirmPassword.value = ''
}

const toggleMode = () => {
  if (displayMode.value == 'login') {
    resetInfo()
    displayMode.value = 'register'
  } else {
    resetInfo()
    displayMode.value = 'login'
  }
}

const useremailRule = [
  { pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, message: '不是有效的email', trigger: 'onChange' }
]

const passwordRule = [
  { required: true, message: '請填寫密碼', trigger: 'onBlur' },
  { pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, message: '密碼需包含數字、大寫字母、小寫字母各一個', trigger: 'onChange' },
  {
    validator(value) {
      return value.length >= 8
    }, message: '密碼最少需為8位', trigger: ['onChange','onBlur']
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
</script>
<template>
  <div class="welcome-sec text-3xl">Welcome!</div>

  <van-form v-if="displayMode == 'login'" @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="userEmail" name="Email" label="Email" placeholder="請輸入email" :rules="useremailRule" />
      <van-field v-model="password" type="password" name="密碼" label="密碼" placeholder="密碼"
        :rules="[{ required: true, message: '請填寫密碼' }]" />
    </van-cell-group>
    <div class="link-container">
      <a href="#">忘記密碼？</a>
      <a href="#" @click="toggleMode">還沒有帳號嗎？立即註冊</a>
    </div>

    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
      <van-button icon="public/official-Google-Logo-PNG-Image.png" @click="loginWithGoogle" style="margin-top: 5px;"
        round block>
        用Google開始
      </van-button>
      <van-button style="margin-top: 5px;" round block type="primary">
        其他登入方式1
      </van-button>
    </div>
  </van-form>
  <van-form 
    ref="registerForm" 
    :show-error-message="true"
    v-else @submit="onRegister"
  >
    <van-cell-group inset>
      <van-field 
        v-model="userEmail" 
        name="Email" 
        label="Email" 
        placeholder="請輸入email" 
        :rules="useremailRule" 
      />
      <van-field 
        v-model="password" 
        type="password" 
        name="密碼" 
        label="密碼" 
        placeholder="密碼" 
        :rules="passwordRule" 
      />
      <van-field 
        v-model="confirmPassword" 
        type="password" 
        name="確認密碼" 
        label="確認密碼" 
        placeholder="密碼"
        :rules="confirmPasswordRule" 
        />

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