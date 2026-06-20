import PageLogin from "@/views/Auth/Pages/PageLogin.vue";

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
];

export default authRouter;
