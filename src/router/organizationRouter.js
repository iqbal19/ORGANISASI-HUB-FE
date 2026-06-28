import PageIndex from "@/views/Organization/Pages/PageIndex.vue";
import PageSettings from "@/views/Organization/Pages/PageSettings.vue";
import { whereRole } from "@/extends/constants/role";

const organizationRouter = [
  {
    path: "/organization",
    children: [
      {
        path: "",
        component: PageIndex,
        meta: {
          title: "Organisasi",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "list-organization",
      },
      {
        path: "settings/:id",
        component: PageSettings,
        meta: {
          title: "Pengaturan Organisasi",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "settings-organization",
      },
    ],
  },
];

export default organizationRouter;
