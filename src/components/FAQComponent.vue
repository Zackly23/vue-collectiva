<script setup>
import { ref } from "vue";

// Simpan dropdown yang terbuka
const openDropdown = ref(null);

// Fungsi untuk toggle FAQ
const toggleDropdown = (index) => {
  openDropdown.value = openDropdown.value === index ? null : index;
};

// Cek apakah FAQ aktif
const isFAQActive = (index) => {
  return openDropdown.value === index;
};
</script>

<template>
  <!-- FAQ Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        Pertanyaan Umum (FAQ)
      </h2>
      <p class="text-lg text-gray-600">
        Temukan jawaban untuk pertanyaan yang sering diajukan
      </p>
    </div>

    <div class="flex flex-col md:flex-row md:gap-2 mt-8 items-start">
      <div
        class="w-full md:w-1/2 bg-white rounded-xl transition-all duration-200 md:p-4 space-y-4 pb-0"
      >
        <!-- FAQ Item 1 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 pb-2 text-left focus:outline-none"
            @click="toggleDropdown(1)"
          >
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Content -->
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Bagaimana cara saya bisa berdonasi?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isFAQActive(1) }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
          <!-- FAQ Content -->
          <div
            class="overflow-hidden transition-all duration-300 px-6"
            :style="
              isFAQActive(1)
                ? 'max-height: 200px; opacity: 1;'
                : 'max-height: 0; opacity: 0;'
            "
          >
            <p class="text-gray-600 leading-relaxed pb-4">
              Anda dapat berdonasi dengan menekan
              <span class="text-green-600 hover:text-green-700 font-medium">
                Donasi Sekarang
              </span>
              pada setiap proyek yang anda inginkan, lalu selesaikan pembayaran
              melalui transfer bank, e-wallet, atau kartu kredit.
            </p>
          </div>
        </div>

        <!-- FAQ Item 2 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 pb-2 text-left focus:outline-none"
            @click="toggleDropdown(2)"
          >
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Content -->
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Bagaimana saya tahu donasi saya digunakan dengan baik?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isFAQActive(2) }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
          <!-- FAQ Content -->
          <div
            class="overflow-hidden transition-all duration-300 px-6"
            :style="
              isFAQActive(2)
                ? 'max-height: 200px; opacity: 1;'
                : 'max-height: 0; opacity: 0;'
            "
          >
            <p class="text-gray-600 leading-relaxed pb-4">
              Kami menyediakan
              <span class="font-medium"
                >laporan transparan dan update berkala</span
              >
              tentang penggunaan dana dan perkembangan proyek yang Anda dukung
              melalui menu kontribusi. Setiap creator memiliki
              <span class="font-medium">kewajiban</span> untuk melaporkan
              dokumen kegiatan yang dilaksanakan.
            </p>
          </div>
        </div>
      </div>

      <div
        class="w-full md:w-1/2 bg-white rounded-xl transition-all duration-200 md:p-4 space-y-4 pt-4"
      >
        <!-- FAQ Item 3  -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 pb-2 text-left focus:outline-none"
            @click="toggleDropdown(3)"
          >
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Content -->
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Bagaimana cara bergabung menjadi volunteer?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isFAQActive(3) }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
          <!-- FAQ Content -->
          <div
            class="overflow-hidden transition-all duration-300 px-6"
            :style="
              isFAQActive(3)
                ? 'max-height: 200px; opacity: 1;'
                : 'max-height: 0; opacity: 0;'
            "
          >
            <p class="text-gray-600 leading-relaxed pb-4">
              Anda dapat bergabung menjadi volunteer dengan mengisi formulir
              pendaftaran pada halaman
              <span class="text-green-600 hover:text-green-700 font-medium">
                volunteer</span
              >
              setiap proyek volunteer. Nantinya pendaftar akan dilakukan seleksi
              terkait kriteria serta guna memastikan kebutuhan role yang
              dibutuhkan.
            </p>
          </div>
        </div>

        <!-- FAQ Item 4 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 pb-2 text-left focus:outline-none"
            @click="toggleDropdown(4)"
          >
            <div class="flex items-start gap-4">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <!-- Content -->
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Bagaimana proses penarikan dana Donasi di platform ini?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isFAQActive(4) }"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </button>
          <!-- FAQ Content -->
          <div
            class="overflow-hidden transition-all duration-300 px-6"
            :style="
              isFAQActive(4)
                ? 'max-height: 200px; opacity: 1;'
                : 'max-height: 0; opacity: 0;'
            "
          >
            <p class="text-gray-600 leading-relaxed pb-4">
              Anda dapat mengajukan penarikan dana melalui halaman proyek donasi
              yang ingin ditarik dan mengisi formulir penarikan. Proses
              pencairan biasanya memakan waktu
              <span class="font-medium"> 7 hari kerja</span>. Setiap penarikan
              akan dikenakan biaya administrasi sebesar
              <span class="font-medium">0.5% dari total dana yang ditarik</span
              >. Untuk informasi lebih lanjut, silakan kunjungi
              <router-link
                to=""
                class="text-green-600 hover:text-green-700 font-medium"
              >
                Halaman Bantuan Penarikan Dana </router-link
              >.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Additional Help Section -->
    <div class="mt-12 text-center">
      <p class="text-gray-600 mb-4">Masih punya pertanyaan lain?</p>
      <a
        href="https://wa.me/6281228313265?text=Halo,%20saya%20ingin%20bertanya%20tentang%20SHCUnion."
        target="_blank"
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
      >
        Hubungi Tim Kami
      </a>
    </div>
  </div>
</template>
