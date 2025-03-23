import { useAuthStore } from "@/store/auth";

export default {
  mounted(el, binding) {
    const authStore = useAuthStore();
    const userRoles =
      authStore.roles || JSON.parse(localStorage.getItem("roles") || "[]");
    const userPermissions =
      authStore.permissions ||
      JSON.parse(localStorage.getItem("permissions") || "[]");

    const { role, permission } = binding.value || {};

    // Cek apakah user memiliki role yang diizinkan
    const hasRole = role ? role.some((r) => userRoles.includes(r)) : true;

    // Cek apakah user memiliki permission yang diizinkan
    const hasPermission = permission
      ? permission.some((p) => userPermissions.includes(p))
      : true;

    // Sembunyikan elemen jika user tidak memenuhi akses
    if (!hasRole || !hasPermission) {
      el.style.display = "none";
    }
  },
};
