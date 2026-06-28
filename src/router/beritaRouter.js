const beritaRouter = [
  {
    path: "/kelola-berita",
    name: "berita-list",
    component: () => import("@/views/Berita/Pages/PageBeritaList.vue"),
    meta: {
      title: "Manajemen Berita",
      auth: true,
      roles: ["SUPER_ADMIN", "ADMIN_PUSAT", "ADMIN_DAERAH", "ADMIN_CABANG"],
      layout: "main",
    },
  },
  {
    path: "/kelola-berita/create",
    name: "berita-create",
    component: () => import("@/views/Berita/Pages/PageBeritaForm.vue"),
    meta: {
      title: "Tambah Berita",
      auth: true,
      roles: ["SUPER_ADMIN", "ADMIN_PUSAT", "ADMIN_DAERAH", "ADMIN_CABANG"],
      layout: "main",
    },
  },
  {
    path: "/kelola-berita/edit/:id",
    name: "berita-edit",
    component: () => import("@/views/Berita/Pages/PageBeritaForm.vue"),
    meta: {
      title: "Ubah Berita",
      auth: true,
      roles: ["SUPER_ADMIN", "ADMIN_PUSAT", "ADMIN_DAERAH", "ADMIN_CABANG"],
      layout: "main",
    },
  },
  {
    path: "/kelola-berita/:slug",
    name: "berita-detail",
    component: () => import("@/views/Berita/Pages/PageBeritaDetail.vue"),
    meta: {
      title: "Detail Berita",
      auth: true,
      roles: ["SUPER_ADMIN", "ADMIN_PUSAT", "ADMIN_DAERAH", "ADMIN_CABANG"],
      layout: "main",
    },
  },
];

export default beritaRouter;
