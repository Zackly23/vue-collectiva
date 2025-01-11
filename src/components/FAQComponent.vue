<script setup></script>

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

      <div class="grid md:grid-cols-2 gap-6 mt-8">
        <!-- FAQ Item 1 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 text-left focus:outline-none"
            onclick="toggleFAQ(this)"
          >
            <div class="flex items-start gap-4">
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
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Bagaimana cara bergabung menjadi volunteer?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 chevron"
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
                <div class="faq-content mt-4">
                  <p class="text-gray-600 leading-relaxed">
                    Anda dapat bergabung menjadi volunteer dengan mengisi
                    formulir pendaftaran pada halaman
                    <a
                      href="#"
                      class="text-green-600 hover:text-green-700 font-medium"
                      >pendaftaran volunteer</a
                    >. Proses pendaftaran sangat mudah dan cepat.
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- FAQ Item 2 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 text-left focus:outline-none"
            onclick="toggleFAQ(this)"
          >
            <div class="flex items-start gap-4">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Apakah ada syarat khusus untuk menjadi volunteer?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 chevron"
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
                <div class="faq-content mt-4">
                  <p class="text-gray-600 leading-relaxed">
                    Tidak ada syarat khusus. Semua orang yang memiliki keinginan
                    untuk membantu dipersilakan bergabung. Namun, untuk beberapa
                    kegiatan tertentu mungkin memerlukan keterampilan spesifik.
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- FAQ Item 3 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 text-left focus:outline-none"
            onclick="toggleFAQ(this)"
          >
            <div class="flex items-start gap-4">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Apakah volunteer akan mendapatkan kompensasi?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 chevron"
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
                <div class="faq-content mt-4">
                  <p class="text-gray-600 leading-relaxed">
                    Kegiatan volunteer bersifat sukarela. Namun, Anda akan
                    mendapatkan pengalaman berharga, sertifikat partisipasi, dan
                    kesempatan networking yang luas.
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>

        <!-- FAQ Item 4 -->
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 text-left focus:outline-none"
            onclick="toggleFAQ(this)"
          >
            <div class="flex items-start gap-4">
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
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold text-gray-800">
                    Bagaimana jika saya tidak dapat hadir pada jadwal kegiatan?
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 chevron"
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
                <div class="faq-content mt-4">
                  <p class="text-gray-600 leading-relaxed">
                    Jika Anda tidak dapat hadir, harap segera menginformasikan
                    kepada koordinator kegiatan minimal 24 jam sebelumnya
                    melalui kontak yang tersedia.
                  </p>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Additional Help Section -->
      <div class="mt-12 text-center">
        <p class="text-gray-600 mb-4">Masih punya pertanyaan lain?</p>
        <a
          href="#"
          class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors"
        >
          Hubungi Tim Kami
        </a>
      </div>
    </div>
</template>