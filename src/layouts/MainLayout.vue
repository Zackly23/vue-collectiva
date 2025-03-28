<script setup>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/dashboard/FooterComponent.vue";
import PreloaderComponent from "@/components/dashboard/PreloaderComponent.vue";
import { ref } from "vue";

const isLoading = ref(true);

const toggleLoading = () => {
  console.log("before loading : ", isLoading.value);

  isLoading.value = false;
  console.log("loading : ", isLoading.value);
};

const toggleActiveLoading = () => {
  console.log("before loading : ", isLoading.value);

  isLoading.value = true;
  console.log("loading : ", isLoading.value);
};
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <NavbarComponent />
    <main class="flex-grow">
      <router-view
        @toggle-active-loading="toggleActiveLoading"
        @toggle-loading="toggleLoading"
      />
    </main>
    <FooterComponent />
  </div>
  <PreloaderComponent v-if="isLoading" />
</template>
