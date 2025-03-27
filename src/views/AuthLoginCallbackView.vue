<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import api from "@/api";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const loading = ref(true);
const errorMessage = ref("");

const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}/profile`);

    if (response.status === 200) {
      const { user, roles, permissions } = response.data;
      authStore.setUser(user, roles, permissions);
      return true;
    }
  } catch (error) {
    console.error("Error Fetching User Profile:", error);
    errorMessage.value = "Failed to fetch user profile. Please try again.";
    return false;
  }
};

onMounted(async () => {
  const access_token = route.query.access_token;
  const refresh_token = route.query.refresh_token;
  const user_id = route.query.user_id;

  if (access_token && refresh_token && user_id) {
    try {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);

      const success = await getUserProfile(user_id);
      if (success) {
        if (localStorage.getItem("last_visited_page")) {
          console.log(
            "Redirecting to last visited page... : ",
            localStorage.getItem("last_visited_page")
          );
          router.push(localStorage.getItem("last_visited_page"));
        } else {
          console.log("Redirecting to home page...");

          router.push("/"); // Redirect ke halaman utama jika sukses
        }
      } else {
        console.error("Login failed. Redirecting to login page...", error);
        router.push("/login"); // Redirect ke halaman login jika gagal
      }
    } catch (error) {
      console.error("Login Error:", error);
      errorMessage.value = "Login failed. Please try again.";
      router.push("/login");
    }
  } else {
    errorMessage.value = "Invalid login attempt. Please try again.";
    router.push("/login");
  }

  loading.value = false;
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div v-if="loading" class="flex flex-col items-center">
        <svg class="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 0116 0H4z"
          ></path>
        </svg>
        <p class="mt-2 text-gray-600">Processing login...</p>
      </div>
      <div v-else-if="errorMessage" class="text-red-600">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>
