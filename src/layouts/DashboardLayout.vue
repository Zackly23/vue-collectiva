<script setup>
import "../../src/assets/vendor_assets/css/apexcharts.min.css";
import "../../src/assets/vendor_assets/css/datepicker.min.css";
import "../../src/assets/vendor_assets/css/line-awesome.min.css";
import "../../src/assets/vendor_assets/css/nouislider.min.css";
import "../../src/assets/vendor_assets/css/quill.snow.css";
import "../../src/assets/vendor_assets/css/svgMap.min.css";
import "../../src/assets/vendor_assets/css/svgMap.min.css";
// import "../../src/assets/theme_assets/tailwind/tailwind.css";

import AsideComponent from "@/components/dashboard/AsideComponent.vue";
import HeaderComponent from "@/components/dashboard/HeaderComponent.vue";
import PreloaderComponent from "@/components/dashboard/PreloaderComponent.vue";
import FooterComponent from "@/components/dashboard/FooterComponent.vue";

import { ref } from "vue";

const isCollapsed = ref(true);
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

const toggleAside = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <div
    class="flex flex-col min-h-screen print-active bg-white [&.dark]:bg-main-dark font-jost relative text-[15px] font-normal leading-[1.5] m-0 p-0"
  >
    <AsideComponent :isCollapsed="isCollapsed" />
    <div
      :class="{
        'relative flex flex-col flex-1 !transition-all !duration-[0.2s] ease-linear delay-[0s] bg-normalBG dark:bg-main-dark': true,
        'xl:ps-[280px]': !isCollapsed, // Jika tidak collapse
        'xl:ps-[0px]': isCollapsed, // Jika collapse
      }"
      id="content"
    >
      <HeaderComponent @toggle-aside="toggleAside" :isCollapsed="isCollapsed" />
      <main class="flex-grow">
        <router-view
          @toggle-active-loading="toggleActiveLoading"
          @toggle-loading="toggleLoading"
        />
      </main>
      <FooterComponent />
    </div>
    <PreloaderComponent v-if="isLoading" />
  </div>
</template>

<style>
@font-face {
  font-family: jost;
  src: url("../assets/vendor_assets/fonts/Jost-Medium.ttf");
}
</style>
