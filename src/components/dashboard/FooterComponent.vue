<script setup>
import { ref } from "vue";

const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <!-- Footer -->
  <footer class="px-[25px] bg-white dark:bg-box-dark">
    <!-- Footer content -->
    <div
      class="bottom-0 flex justify-between flex-wrap py-[22px] gap-x-[30px] gap-y-[15px] max-ssm:gap-y-[8px] items-center max-md:flex-col"
    >
      <!-- Copyright information -->
      <div
        class="flex items-center gap-[4px] text-[14px] font-medium max-md:text-center text-body dark:text-subtitle-dark"
      >
        © <span class="current-year">{{ currentYear }}</span>
        <a href="#" class="text-primary">SHCUnion</a>
      </div>

      <!-- Footer navigation links -->
      <div class="justify-end md:justify-center items-center flex gap-[15px]">
        <a
          href="#"
          class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
          >About</a
        >
        <a
          href="#"
          class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
          >Team</a
        >
        <a
          href="#"
          class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
          >Contact</a
        >
      </div>
    </div>
  </footer>
  <!-- end: Footer -->
</template>
