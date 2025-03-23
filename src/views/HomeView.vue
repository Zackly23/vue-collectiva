<script setup>
import NavbarComponent from "@/components/NavbarComponent.vue";
import HeroComponent from "@/components/HeroComponent.vue";
import HomeProjectComponent from "@/components/HomeProjectComponent.vue";
import FAQComponent from "@/components/FAQComponent.vue";

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);

</script>

<template>
  <div>
    <HeroComponent />
    <HomeProjectComponent
      @toggle-active-loading="emits('toggle-active-loading')"
      @toggle-loading="emits('toggle-loading')"
    />
    <FAQComponent />
  </div>
</template>
