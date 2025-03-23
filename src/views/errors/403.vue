<script setup></script>

<template>
  <div class="forbidden">
    <h1>403 - Akses Ditolak</h1>
    <p>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
    <router-link to="/">Kembali ke Beranda</router-link>
  </div>
</template>

<style scoped>
.forbidden {
  text-align: center;
  margin-top: 50px;
}
</style>
