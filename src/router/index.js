import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import PageLanding from "@/views/Landing/PageLanding.vue";
import PageDashboard from "@/views/Dashboard/Pages/PageDashboard.vue";
import DynamicLanding from "@/views/Landing/DynamicLanding.vue";
import PageOrgLanding1 from "@/views/OrgLanding/design-1/PageOrgLanding1.vue";
import PageOrgLanding2 from "@/views/OrgLanding/design-2/PageOrgLanding2.vue";
import PageOrgLanding3 from "@/views/OrgLanding/design-3/PageOrgLanding3.vue";
import PageOrgLanding4 from "@/views/OrgLanding/design-4/PageOrgLanding4.vue";
import PageOrgLanding5 from "@/views/OrgLanding/design-5/PageOrgLanding5.vue";
import PageOrgLanding6 from "@/views/OrgLanding/design-6/PageOrgLanding6.vue";
import PageTerms from "@/views/Landing/PageTerms.vue";
import PagePrivacy from "@/views/Landing/PagePrivacy.vue";
import PageNotFound from "@/views/Error/Pages/PageNotFound.vue";
import PageForbidden from "@/views/Error/Pages/PageForbidden.vue";
import AuthRouter from "./authRouter";
import userRouter from "./userRouter";
import berandaRouter from "./berandaRouter";
import organizationRouter from "./organizationRouter";
import settingsRouter from "./settingsRouter";
import referenceRouter from "./referenceRouter";
import memberRouter from "./memberRouter";
import productRouter from "./productRouter";
import productionRouter from "./productionRouter";
import beritaRouter from "./beritaRouter";
import anggotaRouter from "./anggotaRouter";

const baseUrl = "/";

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: [
    {
      path: "/",
      name: "dynamic-landing",
      component: DynamicLanding,
      meta: {
        title: "Organisasi Hub - Platform Organisasi Digital",
        auth: false,
      },
    },
    {
      path: "/landing",
      name: "landing",
      component: PageLanding,
      meta: {
        title: "Landing Organisasi",
        auth: false,
      },
    },
    {
      path: "/terms",
      name: "terms",
      component: PageTerms,
      meta: {
        title: "Syarat & Ketentuan",
        auth: false,
      },
    },
    {
      path: "/privacy",
      name: "privacy",
      component: PagePrivacy,
      meta: {
        title: "Kebijakan Privasi",
        auth: false,
      },
    },
    {
      path: "/preview/org-design-1",
      name: "org-design-1",
      component: PageOrgLanding1,
      meta: {
        title: "Preview Design 1 - Professional Blue",
        auth: false,
      },
    },
    {
      path: "/preview/org-design-2",
      name: "org-design-2",
      component: PageOrgLanding2,
      meta: {
        title: "Preview Design 2 - Modern Emerald",
        auth: false,
      },
    },
    {
      path: "/preview/org-design-3",
      name: "org-design-3",
      component: PageOrgLanding3,
      meta: {
        title: "Preview Design 3 - Bold Dark",
        auth: false,
      },
    },
    {
      path: "/preview/org-design-4",
      name: "org-design-4",
      component: PageOrgLanding4,
      meta: {
        title: "Preview Design 4 - Creative",
        auth: false,
      },
    },
    {
      path: "/preview/org-design-5",
      name: "org-design-5",
      component: PageOrgLanding5,
      meta: {
        title: "Preview Design 5 - Corporate",
        auth: false,
      },
    },
    {
      path: "/preview/org-design-6",
      name: "org-design-6",
      component: PageOrgLanding6,
      meta: {
        title: "Preview Design 6 - Tech",
        auth: false,
      },
    },
    ...AuthRouter,
    ...berandaRouter,
    ...userRouter,
    ...organizationRouter,
    ...settingsRouter,
    ...referenceRouter,
    ...memberRouter,
    ...productRouter,
    ...productionRouter,
    ...beritaRouter,
    ...anggotaRouter,
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
      path: "/:slug",
      name: "org-slug",
      component: DynamicLanding,
      meta: {
        title: "Organisasi Hub - Platform Organisasi Digital",
        auth: false,
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

  // Bypass dihapus agar guard berjalan semestinya
  // Hapus sisa mock data dari localStorage jika masih ada (karena persist)
  if (authStore.authUser?.access_token?.includes("mock_jwt")) {
    authStore.clear();
    profileStore.clear();
  }

  const isAuthenticated = !!authStore.authUser;
  const requiresAuth = to.matched.some((record) => record.meta.auth);

  if (to.name === "login" && isAuthenticated) {
    if (profileStore.user?.role === "ANGGOTA") {
      next({ name: "dashboard-anggota" });
    } else {
      next({ name: "beranda" });
    }
    return;
  }

  if (requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    // Cek permissions (role)
    const requiredRoles = to.meta.roles || [];
    if (requiredRoles.length > 0) {
      const userRole = profileStore.user?.role;
      if (!userRole) {
        next({ name: "login" });
      } else {
        const hasRole = requiredRoles.includes(userRole);
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
