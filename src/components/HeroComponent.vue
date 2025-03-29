<script setup></script>

<template>
  <div class="bg-gradient-to-b from-green-50/50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-8">
          <h1 class="text-4xl md:text-5xl font-bold leading-tight">
            Bersama <span class="text-green-600">SHCUnion</span>, Kita Bisa
            Membantu Mereka yang Membutuhkan
          </h1>
          <div
            class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl block md:hidden"
          >
            <img
              src="../assets/images/hero/plain-hero-image-project.png"
              alt="Charity illustration"
              class="object-cover w-full h-full"
            />
          </div>
          <p class="text-lg text-gray-600 leading-relaxed">
            Jadilah bagian dari perubahan besar dengan donasi kecil Anda. Setiap
            langkah kecil membawa harapan besar.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link
              to="/project/list"
              class="px-4 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 font-semibold text-center transition-all"
            >
              Lihat Proyek
            </router-link>
            <a
              href="#"
              class="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 font-semibold text-center shadow-lg shadow-green-600/20 transition-all"
            >
              Pelajari Selengkapnya
            </a>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <div
            class="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl md:block hidden"
          >
            <img
              src="../assets/images/hero/plain-hero-image-project.png"
              alt="Charity illustration"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
