<script setup name="Login">
import { ref, watch } from "vue";
import {
  authRegisterAPI,
  authLoginAPI,
  signInWithPopupAPI,
} from "@/apis/auth.js";
import { useRoute, useRouter } from "vue-router";
import { showSuccessToast, showToast, showFailToast } from "vant";

const route = useRoute();
const router = useRouter();

const displayMode = ref("login");
const userEmail = ref("");
const password = ref("");
const confirmPassword = ref("");
const registerForm = ref(null);
const loginForm = ref(null);

const onRegister = async () => {
  const result = await authRegisterAPI(userEmail.value, password.value);
  if (result == "註冊成功") {
    showSuccessToast("註冊成功！");
  } else if (result == "已註冊過") {
    showToast("該帳號已註冊過");
  } else {
    showFailToast("註冊失敗");
    resetInfo();
    registerForm.value.resetValidation();
    return;
  }
  resetInfo();
  router.push({
    path: "/auth/login",
  });
};

const onSignIn = async () => {
  const res = await authLoginAPI(userEmail.value, password.value);
  if (res) {
    router.push({
      name: "home",
    });

    showSuccessToast("登入成功！");
    resetInfo();
  } else {
    console.log("密碼錯誤/發生錯誤 ");
  }
};

const loginWithGoogle = async () => {
  const res = await signInWithPopupAPI();
  if (res) {
    resetInfo();
    router.push({
      name: "home",
    });
    showSuccessToast("登入成功！");
  } else {
    //沒有登入成功
    console.log("沒有登入成功");
  }
};

const resetInfo = () => {
  userEmail.value = "";
  password.value = "";
  confirmPassword.value = "";
};

const toggleMode = () => {
  if (displayMode.value == "login") {
    resetInfo();
    router.push({
      path: "register",
    });
  } else {
    resetInfo();
    router.push({
      path: "login",
    });
  }
};

const useremailRule = [
  { required: true, message: "請填寫email", trigger: "onBlur" },
  {
    pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    message: "不是有效的email",
    trigger: ["onChange", "onBlur"],
  },
];

const passwordRule = [
  { required: true, message: "請填寫密碼", trigger: "onBlur" },
  {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
    message: "密碼需包含數字、大寫字母、小寫字母各一個",
    trigger: "onChange",
  },
  {
    validator(value) {
      return value.length >= 8;
    },
    message: "密碼最少需為8位",
    trigger: ["onChange", "onBlur"],
  },
];

const confirmPasswordRule = [
  { required: true, message: "請再次輸入密碼" },
  {
    validator(value) {
      return value == password.value;
    },
    message: "請確認密碼是否一致",
    trigger: ["onChange", "onBlur"],
  },
];

watch(
  () => {
    return route.params.mode;
  },
  () => {
    displayMode.value = route.params.mode;
  },
  { immediate: true },
);
</script>
<template>
  <div
    class="container overflow-hidden pb-8 w-full relative h-screen flex items-center justify-center"
  >
    <van-form
      class="w-10/12"
      ref="loginForm"
      v-if="displayMode == 'login'"
      @submit="onSignIn"
    >
      <div class="w-full overflow-hidden">
        <img
          class="object-cover w-full h-full scale-150"
          src="@/assets/emotions/emory4.png"
          alt=""
        />
      </div>
      <h2 class="text-3xl font-bold text-center p-5">登入</h2>
      <van-cell-group inset>
        <van-field
          left-icon="contact"
          v-model="userEmail"
          name="Email"
          placeholder="請輸入email"
          :rules="useremailRule"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          left-icon="lock"
          placeholder="密碼"
          :rules="[
            { required: true, message: '密碼不得為空', trigger: 'onBlur' },
          ]"
        />
      </van-cell-group>
      <p class="tracking-wide text-xs text-right mt-3 mb-2 pr-2">
        還沒有帳號嗎？
        <a href="#" @click="toggleMode" class="underline underline-offset-2"
          >立即註冊</a
        >
      </p>

      <div>
        <van-button
          color="#FECE2E"
          size="large"
          round
          block
          type="primary"
          native-type="submit"
          style="margin-bottom: 10px"
        >
          登入
        </van-button>

        <van-button
          style="border: none; box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.15)"
          size="large"
          icon="/official-Google-Logo-PNG-Image.png"
          @click="loginWithGoogle"
          round
          block
        >
          用Google開始
        </van-button>
      </div>
    </van-form>

    <van-form
      class="w-10/12"
      ref="registerForm"
      :show-error-message="true"
      v-else
      @submit="onRegister"
    >
      <div class="w-full overflow-hidden">
        <img
          class="object-cover w-full h-full scale-150"
          src="@/assets/emotions/emory3.png"
          alt=""
        />
      </div>
      <h2 class="text-3xl font-bold text-center p-5">註冊</h2>
      <van-cell-group inset>
        <van-field
          left-icon="contact"
          v-model="userEmail"
          name="Email"
          placeholder="請輸入email"
          :rules="useremailRule"
        />
        <van-field
          v-model="password"
          type="password"
          name="密碼"
          left-icon="lock"
          placeholder="密碼"
          :rules="passwordRule"
        />
        <van-field
          v-model="confirmPassword"
          type="password"
          name="確認密碼"
          left-icon="lock"
          placeholder="確認密碼"
          :rules="confirmPasswordRule"
        />
      </van-cell-group>
      <a
        class="tracking-wide text-xs block text-right mt-3 mb-2 pr-2 underline underline-offset-2"
        href="#"
        @click="toggleMode"
        >去登入</a
      >
      <van-button
        color="#59B379"
        size="large"
        round
        block
        type="primary"
        native-type="submit"
      >
        註冊
      </van-button>
    </van-form>
  </div>
</template>

<style scoped>
:deep(.van-icon) {
  font-size: 1.5rem;
}

:deep(.van-field__left-icon) {
  margin-left: 0.8rem;
}

:deep(.van-field__error-message) {
  position: absolute;
  top: 150%;
  left: 0;
}

.welcome-sec {
  width: 100%;
  aspect-ratio: 1 / 0.9;
  border: 1px solid black;
}

.van-cell-group {
  margin: 0;
  overflow: visible;
  background-color: transparent;
}

.van-cell {
  padding: 0;
  height: 50px;
  gap: 10px;
  align-items: center;
  border-radius: 999px;
  margin-top: 20px;
  overflow: unset;
  background-color: #f1f1f1;
}

:deep(.van-field__control) {
  width: 90%;
  font-size: 0.9rem;
}

:deep(.van-field__value) {
  position: relative;
}

.container::before {
  content: url(@/assets/emotions/happy.png);
  display: inline-block;
  position: absolute;
  bottom: -2rem;
  right: -1rem;
  transform: scale(120%) rotate(-20deg);
}
</style>
