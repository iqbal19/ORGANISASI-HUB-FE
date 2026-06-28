import PageLogin from "@/views/Auth/Pages/PageLogin.vue";
import AccountActivation from "@/views/Auth/Pages/AccountActivation.vue";

const authRouter = [
  {
    path: "/login",
    name: "login",
    component: PageLogin,
    meta: {
      title: "Login",
      auth: false,
      layout: "default",
    },
  },
  {
    path: "/aktivasi-akun",
    name: "AccountActivation",
    component: AccountActivation,
    meta: {
      title: "Aktivasi Akun",
      auth: false,
      layout: "default",
    },
  },
];

export default authRouter;
