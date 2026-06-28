import { whereRole } from "@/extends/constants/role";

const referenceRouter = [
  {
    path: "/reference",
    children: [
      {
        path: "province",
        component: () => import("@/views/Reference/Pages/PageProvince.vue"),
        meta: {
          title: "Provinsi",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "list-province",
      },
      {
        path: "regency",
        component: () => import("@/views/Reference/Pages/PageRegency.vue"),
        meta: {
          title: "Kabupaten/Kota",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "list-regency",
      },
      {
        path: "district",
        component: () => import("@/views/Reference/Pages/PageDistrict.vue"),
        meta: {
          title: "Kecamatan",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "list-district",
      },
      {
        path: "positions",
        component: () => import("@/views/Reference/Pages/PagePositions.vue"),
        meta: {
          title: "Jabatan",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "list-positions",
      },
    ],
  },
];

export default referenceRouter;
