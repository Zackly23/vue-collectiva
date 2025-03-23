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

    // Jika user tidak memiliki role/permission yang sesuai, disable elemen
    // Jika user tidak memiliki izin, disable elemen dan cegah event click
    if (!hasRole || !hasPermission) {
      el.style.cursor = "not-allowed"; // Ubah cursor
      el.style.opacity = "0.5"; // Buat transparan seperti disabled
      el.style.pointerEvents = "none"; // Cegah interaksi (klik, hover, dll.)

      // Mencegah event @click berjalan
      el.addEventListener("click", (event) => {
        event.stopImmediatePropagation(); // Blokir event click dari bubbling
        event.preventDefault(); // Cegah action default
        console.warn("Akses ditolak: Anda tidak memiliki izin.");
      });
    }
  },
};
