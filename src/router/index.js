import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home/index.vue";
import Diary from "@/views/Diary/index.vue";
import Auth from "@/views/Auth/index.vue";
import { useUserStore } from "@/stores/user";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Analysis from "@/views/Analysis/index.vue";
import Calendar from "@/views/Calendar/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL || "/"),
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { requiresAuth: true },
      redirect: "/home/calendar",
      children: [
        {
          path: "calendar",
          name: "calendar",
          component: Calendar,
        },
        {
          path: "analysis",
          name: "analysis",
          component: Analysis,
        },
      ],
    },
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/diary",
      name: "diary",
      component: Diary,
      meta: { requiresAuth: true },
    },
    {
      path: "/auth/:mode",
      name: "auth",
      component: Auth,
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();
        resolve(user);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  // 等待 Firebase 完成身份驗證狀態的檢查
  try {
    const user = await getCurrentUser();
    userStore.setUser(user);
    if (requiresAuth && !user) {
      next("/auth/login");
    } else {
      next();
    }
  } catch (error) {
    next("/auth/login");
  }
});

export default router;
