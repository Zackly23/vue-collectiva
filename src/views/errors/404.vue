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
  <h1 class="text-[100px] font-extrabold text-primary dark:text-title-dark">
      404
    </h1>
    <!-- Gambar Ilustrasi -->
    <img
      src="../../assets/images/page/404.png"
      alt="404 Not Found"
      class="w-100 md:w-96 h-auto mb-2"
    />

    <!-- Teks Informasi -->
 
    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-300">
      Oops! Halaman tidak ditemukan
    </h2>
    <p class="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-md">
      Halaman yang Anda cari mungkin telah dihapus atau URL salah.
    </p>

    <!-- Tombol Kembali -->
    <button
      @click="goHome"
      class="mt-6 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
    >
      Kembali ke Beranda
    </button>
  </div>
</template>
