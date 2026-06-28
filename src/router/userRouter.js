import PageIndex from "@/views/User/Pages/PageIndex.vue";
import {
  WhereNotRole,
  allRole,
  checkRolePermission,
  whereRole,
} from "@/extends/constants/role";

const useRouter = [
  {
    path: "/user",
    children: [
      {
        path: "",
        component: PageIndex,
        meta: {
          title: "User",
          auth: true,
          roles: whereRole(["SUPER_ADMIN"]),
          layout: "main",
        },
        name: "list-user",
      },
    ],
  },
];

export default useRouter;
