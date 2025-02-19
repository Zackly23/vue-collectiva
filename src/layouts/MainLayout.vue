<script setup>
import NavbarComponent from '@/components/NavbarComponent.vue';
import FooterComponent from '@/components/dashboard/FooterComponent.vue';
</script>

<template>
  <NavbarComponent />
  <main>
    <router-view />
  </main>
  <FooterComponent />
</template>
