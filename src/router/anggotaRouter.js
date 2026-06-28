import PageKartuAnggota from "@/views/Anggota/Pages/PageKartuAnggota.vue";

const anggotaRouter = [
  {
    path: "/dashboard-anggota",
    children: [
      {
        path: "",
        component: PageKartuAnggota,
        meta: {
          title: "Kartu Anggota",
          auth: true,
          roles: ["ANGGOTA"],
          layout: "default",
        },
        name: "dashboard-anggota",
      },
    ],
  },
];

export default anggotaRouter;
