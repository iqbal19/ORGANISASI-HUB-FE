import PageProducts from "@/views/Products/Pages/PageProducts.vue";

const routes = [
  {
    path: "/products",
    name: "products",
    component: PageProducts,
    meta: {
      title: "Master Produk",
      auth: true,
      roles: ["SUPER_ADMIN"],
      layout: "main",
      hasBack: false,
    },
  },
];

export default routes;
