<script setup></script>

<template>
  <!-- Stats Section -->
  <div class="max-w-7xl mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Total Proyek Aktif</h3>
        <p class="text-2xl font-bold">24</p>
        <div class="flex items-center mt-2 text-green-600">
          <span class="text-xs">↑ 12% dari bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Total Dana Terkumpul</h3>
        <p class="text-2xl font-bold">Rp 6.4M</p>
        <div class="flex items-center mt-2 text-green-600">
          <span class="text-xs">↑ 8% dari bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Total Volunteer Terlibat</h3>
        <p class="text-2xl font-bold">2032</p>
        <div class="flex items-center mt-2 text-gray-600">
          <span class="text-xs">Sama dengan bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-gray-500 text-sm">Total Donatur</h3>
        <p class="text-2xl font-bold">1,240</p>
        <div class="flex items-center mt-2 text-green-600">
          <span class="text-xs">↑ 15% dari bulan lalu</span>
        </div>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Cari proyek..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option>Kategori Proyek</option>
          <option>Donasi</option>
          <option>Volunteer</option>
          <option>Penggalangan Dana</option>
        </select>
        <select
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option>Wilayah - Kota</option>
          <option>Yogyakarta</option>
          <option>Jakarta</option>
          <option>Bandung</option>
        </select>
        <button
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Terapkan Filter
        </button>
      </div>
    </div>

    <!-- Main Content Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Pilihan Proyek</h1>
        <p class="text-gray-500">Menampilkan 3 dari 25 proyek</p>
      </div>
      <div class="flex gap-2">
        <button class="px-4 py-2 border rounded-lg hover:bg-gray-50">
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Filter Pills -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        class="px-4 py-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"
      >
        Proyek Dibuka
      </button>
      <button
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
      >
        Segera Dibuka
      </button>
      <button
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
      >
        Proyek Selesai
      </button>
      <div class="flex-1"></div>
      <button class="text-green-600 hover:text-green-800">
        Lihat Semua Proyek
      </button>
    </div>

    <!-- Project Cards (with hover effects) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        class="border rounded-lg overflow-hidden bg-white transition-transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="relative">
          <div
            class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
          >
            ROI 16%
          </div>
          <img
            src=""
            alt="Project 1"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center"
          >
            <div class="bg-white/90 backdrop-blur rounded-full p-4">
              <span class="text-green-700 font-bold">Pendanaan Terpenuhi</span>
            </div>
          </div>
        </div>

        <div class="p-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Dana Terkumpul</span>
            <span class="text-red-500 font-bold">Rp 4.000.000.000</span>
          </div>

          <div class="flex gap-2 mb-4">
            <span
              class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >Efek Utang</span
            >
            <span
              class="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
              >entertainment</span
            >
          </div>

          <h3 class="font-bold text-lg mb-2 hover:text-green-600">
            <a href="#">EBU Film "Tak Ingin Usai di S..."</a>
          </h3>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
          </div>

          <p class="text-gray-600 text-sm mb-4">
            PT Kavita Dana Asia memiliki proyek produksi konten film. Sehingga
            perolehan dana dari hasil penawaran efek atas Penerbitan Ef...
            <a href="#" class="text-green-600 hover:text-green-800 ml-1"
              >Baca Detail</a
            >
          </p>

          <div class="flex justify-between items-center pt-4 border-t">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                Selesai
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              <span class="text-gray-700">Rp 4.000.000.000</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border rounded-lg overflow-hidden bg-white transition-transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="relative">
          <div
            class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
          >
            ROI 16%
          </div>
          <img
            src=""
            alt="Project 1"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center"
          >
            <div class="bg-white/90 backdrop-blur rounded-full p-4">
              <span class="text-green-700 font-bold">Pendanaan Terpenuhi</span>
            </div>
          </div>
        </div>

        <div class="p-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Dana Terkumpul</span>
            <span class="text-red-500 font-bold">Rp 4.000.000.000</span>
          </div>

          <div class="flex gap-2 mb-4">
            <span
              class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >Efek Utang</span
            >
            <span
              class="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
              >entertainment</span
            >
          </div>

          <h3 class="font-bold text-lg mb-2 hover:text-green-600">
            <a href="#">EBU Film "Tak Ingin Usai di S..."</a>
          </h3>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
          </div>

          <p class="text-gray-600 text-sm mb-4">
            PT Kavita Dana Asia memiliki proyek produksi konten film. Sehingga
            perolehan dana dari hasil penawaran efek atas Penerbitan Ef...
            <a href="#" class="text-green-600 hover:text-green-800 ml-1"
              >Baca Detail</a
            >
          </p>

          <div class="flex justify-between items-center pt-4 border-t">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                Selesai
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              <span class="text-gray-700">Rp 4.000.000.000</span>
            </div>
          </div>
        </div>
      </div>

      <div
        class="border rounded-lg overflow-hidden bg-white transition-transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="relative">
          <div
            class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
          >
            ROI 16%
          </div>
          <img src="" alt="Project 1" class="w-full h-48 object-cover" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center"
          >
            <div class="bg-white/90 backdrop-blur rounded-full p-4">
              <span class="text-green-700 font-bold">Pendanaan Terpenuhi</span>
            </div>
          </div>
        </div>

        <div class="p-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600">Dana Terkumpul</span>
            <span class="text-red-500 font-bold">Rp 4.000.000.000</span>
          </div>

          <div class="flex gap-2 mb-4">
            <span
              class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >Efek Utang</span
            >
            <span
              class="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
              >entertainment</span
            >
          </div>

          <h3 class="font-bold text-lg mb-2 hover:text-green-600">
            <a href="#">EBU Film "Tak Ingin Usai di S..."</a>
          </h3>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-blue-600 h-2 rounded-full" style="width: 100%"></div>
          </div>

          <p class="text-gray-600 text-sm mb-4">
            PT Kavita Dana Asia memiliki proyek produksi konten film. Sehingga
            perolehan dana dari hasil penawaran efek atas Penerbitan Ef...
            <a href="#" class="text-green-600 hover:text-green-800 ml-1"
              >Baca Detail</a
            >
          </p>

          <div class="flex justify-between items-center pt-4 border-t">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                Selesai
              </span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-green-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
              <span class="text-gray-700">Rp 4.000.000.000</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional cards with same structure... -->
    </div>

    <!-- Enhanced Pagination -->
    <div
      class="mt-8 flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow"
    >
      <div class="flex flex-1 items-center justify-end">
        <div class="flex gap-3">
          <button
            class="inline-flex items-center justify-center p-3 rounded-lg border border-gray-200 text-gray-400 hover:text-green-600 hover:border-green-600 transition-all"
          >
            <span class="sr-only">Previous</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="inline-flex items-center justify-center p-3 rounded-lg border border-gray-200 text-gray-400 hover:text-green-600 hover:border-green-600 transition-all"
          >
            <span class="sr-only">Next</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
