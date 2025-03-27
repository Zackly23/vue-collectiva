<script setup>
const props = defineProps({
  suspendedTime: Number,
});
</script>

<template>
  <div
    class="min-h-[60px] w-full bg-yellow-200 mb-6 rounded-md p-4 border-l-4 border-yellow-500"
  >
    <h3 class="text-lg font-semibold text-yellow-800">
      Akun Anda Telah Ditangguhkan
    </h3>
    <p class="text-yellow-900">
      Akun Anda telah ditangguhkan selama
      <strong>{{ props.suspendedTime }}</strong> hari akibat laporan yang kami
      terima. Selama masa penangguhan, beberapa fitur mungkin tidak dapat
      digunakan seperti biasa.
    </p>
    <p class="text-yellow-900">
      Kami menyarankan Anda untuk meninjau kebijakan kami dan menghubungi
      dukungan pelanggan jika membutuhkan bantuan lebih lanjut.
    </p>
  </div>
</template>
