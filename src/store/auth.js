import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  states: () => ({
    user: null,
    roles: JSON.parse(localStorage.getItem("roles")) || [],
    permissions: JSON.parse(localStorage.getItem("permissions")) || [],
  }),
  actions: {
    setUser(user, roles, permissions) {
      this.user = user;
      this.roles = roles;
      this.permissions = permissions;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("roles", JSON.stringify(roles));
      localStorage.setItem("permissions", JSON.stringify(permissions));
    },
    logout() {
      this.user = null;
      this.roles = [];
      this.permissions = [];
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
      localStorage.removeItem("permissions");
    },
  },
});
