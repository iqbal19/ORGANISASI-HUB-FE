import PageSettings from "@/views/Organization/Pages/PageSettings.vue";
import { whereRole } from "@/extends/constants/role";

const settingsRouter = [
  {
    path: "/settings",
    component: PageSettings,
    meta: {
      title: "Pengaturan Organisasi",
      auth: true,
      roles: whereRole(["ADMIN_PUSAT", "ADMIN_DAERAH"]),
      layout: "main",
    },
    name: "settings-organization-self",
  },
];

export default settingsRouter;
