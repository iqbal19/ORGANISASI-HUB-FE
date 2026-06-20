import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import PageDashboard from "@/views/Dashboard/Pages/PageDashboard.vue";
import PageNotFound from "@/views/Error/Pages/PageNotFound.vue";
import PageForbidden from "@/views/Error/Pages/PageForbidden.vue";
import AuthRouter from "./authRouter";
import userRouter from "./userRouter";
import berandaRouter from "./berandaRouter";

const baseUrl = "/";

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: PageDashboard,
      meta: {
        title: "Dashboard",
        auth: false,
      },
    },
    ...AuthRouter,
    ...berandaRouter,
    ...userRouter,
    {
      path: "/403",
      name: "403",
      component: PageForbidden,
      meta: {
        auth: false,
        layout: "default",
        hasBack: false,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: PageNotFound,
      meta: {
        auth: false,
        layout: "default",
        hasBack: false,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const profileStore = useProfileStore();

  // Auto-login jika belum terotentikasi (Bypass BE)
  if (!authStore.authUser) {
    authStore.setAuthUser({
      access_token: "mock_jwt_access_token",
      refresh_token: "mock_jwt_refresh_token"
    });
  }
  if (!profileStore.user) {
    profileStore.setUser({
      id: "1",
      nama: "Super Admin",
      email: "admin@berau.go.id",
      username: "admin",
      role: "ADMIN_APLIKASI"
    });
  }

  const isAuthenticated = !!authStore.authUser;

  if (to.meta.auth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = profileStore.user?.role;
      if (!userRole) {
        next({ name: "login" });
      } else {
        const hasRole = to.meta.roles.includes(userRole);
        if (!hasRole) {
          next({ name: "403" });
        } else {
          next();
        }
      }
    } else {
      next();
    }
  }
});

export default router;
