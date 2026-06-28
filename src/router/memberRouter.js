import PageIndex from "@/views/Member/Pages/PageIndex.vue";
import PageForm from "@/views/Member/Pages/PageForm.vue";
import { whereRole, allRole } from "@/extends/constants/role";

const memberRouter = [
  {
    path: "/members",
    children: [
      {
        path: "",
        component: PageIndex,
        meta: {
          title: "Manajemen Anggota",
          auth: true,
          roles: allRole,
          layout: "main",
        },
        name: "list-member",
      },
      {
        path: "create",
        component: PageForm,
        meta: {
          title: "Tambah Anggota",
          auth: true,
          roles: allRole,
          layout: "main",
        },
        name: "create-member",
      },
      {
        path: "edit/:id",
        component: PageForm,
        meta: {
          title: "Edit Anggota",
          auth: true,
          roles: allRole,
          layout: "main",
        },
        name: "edit-member",
      },
    ],
  },
  {
    path: "/register",
    component: () => import("@/views/Member/Pages/PagePublicRegistration.vue"),
    meta: {
      title: "Pendaftaran Anggota",
      auth: false,
      layout: "blank",
    },
    name: "public-register",
  },
  {
    path: "/checkout",
    component: () => import("@/views/Member/Pages/PageCheckout.vue"),
    meta: {
      title: "Checkout KTA",
      auth: false,
      layout: "blank",
    },
    name: "public-checkout",
  },
];

export default memberRouter;
