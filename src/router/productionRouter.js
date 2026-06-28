import PageIndex from "@/views/Production/Pages/PageIndex.vue";
import { whereRole } from "@/extends/constants/role";

const productionRouter = [
  {
    path: "/production",
    component: PageIndex,
    meta: {
      title: "Produksi KTA",
      auth: true,
      roles: whereRole(["SUPER_ADMIN", "ADMIN_PUSAT"]),
      layout: "main",
    },
    name: "list-production",
  },
  {
    path: "/production/cetak",
    component: () => import("@/views/Production/Pages/PageCetak.vue"),
    meta: {
      title: "Cetak KTA",
      auth: true,
      roles: whereRole(["SUPER_ADMIN", "ADMIN_PUSAT"]),
      layout: "default", // use blank layout
    },
    name: "cetak-production",
  },
];

export default productionRouter;
