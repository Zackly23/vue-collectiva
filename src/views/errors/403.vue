<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6"
  >
  <h1 class="text-[100px] font-extrabold text-red-600 dark:text-title-dark">
      403
    </h1>
    <!-- Gambar Ilustrasi -->
    <img
      src="../../assets/images/page/403.png"
      alt="404 Not Found"
      class="w-100 md:w-96 h-auto mb-2"
    />

    <!-- Teks Informasi -->
 
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-300">
      Maaf! Akses ditolak
    </h2>
    <p class="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
    Anda Tidak Memiliki Akses untuk Melihat Halaman Ini
    </p>

    <!-- Tombol Kembali -->
    <button
      @click="goHome"
      class="mt-6 px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-400 transition"
    >
      Kembali ke Beranda
    </button>
  </div>
</template>
