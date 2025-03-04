<script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  // // Reactive state untuk mengontrol preloader
  // const isLoading = ref(true);
  
  // // Fungsi untuk menghapus preloader
  // const hidePreloader = () => {
  //   isLoading.value = false;
  // };
  
  // // Tambahkan event listener saat komponen di-mount
  // onMounted(() => {
  //   window.addEventListener("load", hidePreloader);
  // });
  
  // // Hapus event listener saat komponen sudah di mount
  // onBeforeUnmount(() => {
  //   window.removeEventListener("load", hidePreloader);
  // });

  // const props = defineProps({
  //   isLoading: Boolean,
  // });

  </script>

<template>
    <div
     
      class="preloader fixed w-full h-full z-[9999] flex items-center justify-center top-0 bg-white dark:bg-black"
    >
      <div
        class="animate-spin inline-block w-[50px] h-[50px] border-[3px] border-current border-t-transparent text-primary rounded-full"
        role="status"
        aria-label="loading"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>
  /* Tambahkan gaya tambahan jika diperlukan */
  </style>
  