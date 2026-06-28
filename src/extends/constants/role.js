import { useProfileStore } from "@/stores/ProfileStore";

const allRole = [
  "SUPER_ADMIN",
  "ADMIN_PUSAT",
  "ADMIN_DAERAH",
  "ADMIN_CABANG",
  "ADMIN_RANTING",
  "OPERATOR",
];

function whereRole(data) {
  const result = [];
  if (Array.isArray(data)) {
    data.forEach((role) => {
      if (allRole.includes(role)) {
        result.push(role);
      }
    });
  } else {
    result.push(data);
  }
  return result;
}

function WhereNotRole(data) {
  const result = [];
  if (Array.isArray(data)) {
    allRole.forEach((role) => {
      if (!data.includes(role)) {
        result.push(role);
      }
    });
  } else {
    allRole.forEach((role) => {
      if (role != data) {
        result.push(role);
      }
    });
  }

  return result;
}

function checkRolePermission(data) {
  const profileStore = useProfileStore();

  var bool = false;
  if (profileStore.user && data) {
    if (data.includes(profileStore.user.role)) {
      bool = true;
    }
  }
  return bool;
}

export { allRole, whereRole, WhereNotRole, checkRolePermission };
