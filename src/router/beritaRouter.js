import PageIndex from "@/views/Berita/Pages/PageIndex.vue";
import {
  WhereNotRole,
  allRole,
  checkRolePermission,
  whereRole,
} from "@/extends/constants/role";

const beritaRouter = [
  {
    path: "/berita",
    children: [
      {
        path: "",
        component: PageIndex,
        meta: {
          title: "Berita",
          auth: true,
          roles: allRole,
          layout: "main",
        },
        name: "list-berita",
      },
    ],
  },
];

export default beritaRouter;
