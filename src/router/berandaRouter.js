import PageIndex from "@/views/Beranda/Pages/PageIndex.vue";
import {
  allRole
} from "@/extends/constants/role";

const berandaRouter = [
  {
    path: "/beranda",
    children: [
      {
        path: "",
        component: PageIndex,
        meta: {
          title: "Beranda",
          auth: true,
          roles: allRole,
          layout: "main",
        },
        name: "beranda",
      },
    ],
  },
];

export default berandaRouter;
