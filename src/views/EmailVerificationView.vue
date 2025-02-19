<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const route = useRoute();
const router = useRouter();
const status = ref("loading"); // "loading", "success", "error"
const message = ref("Verifying your email...");

// Fungsi untuk verifikasi email
const verifyEmail = async () => {
  try {
    const { id, hash } = route.params;
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/email/verify/${id}/${hash}`,
      {
        headers: {
          "Content-Type": "application",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      status.value = "success";
      message.value = "Email successfully verified! Redirecting...";
      setTimeout(() => router.push("/"), 3000);
    } else {
      throw new Error("Verification failed");
    }
  } catch (error) {
    console.error("error : ", error);
    status.value = "error";
    message.value = "Verification failed. The link may be invalid or expired.";
    setTimeout(() => router.push("/"), 3000);
  }
};

// Jalankan verifikasi saat komponen dimuat
onMounted(() => {
  verifyEmail();
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <div class="text-center">
      <div
        v-if="status === 'loading'"
        class="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
      ></div>
      <div
        v-if="status === 'success'"
        class="text-green-600 text-lg font-semibold"
      >
        ✅ Success!
      </div>
      <div v-if="status === 'error'" class="text-red-600 text-lg font-semibold">
        ❌ Error!
      </div>
      <p class="text-gray-700">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Animasi loading */
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
