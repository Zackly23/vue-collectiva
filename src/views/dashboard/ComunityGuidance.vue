<script setup>
import { ref, onMounted, onBeforeMount, computed } from "vue";

// Simpan dropdown yang terbuka
const openDropdown = ref(null);
const searchQuery = ref(""); // Menyimpan keyword pencarian

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);

// Fungsi untuk toggle FAQ
const toggleDropdown = (index) => {
  openDropdown.value = openDropdown.value === index ? null : index;
};

// Cek apakah FAQ aktif
const isFAQActive = (index) => {
  return openDropdown.value === index;
};

const faqs = ref([
  {
    question: "Bagaimana cara menjadi volunteer?",
    answer: `
      <p class="text-gray-600 leading-relaxed pb-4">
        Anda dapat bergabung menjadi volunteer dengan mengisi formulir
        pendaftaran pada halaman 
        <span class="text-green-600 hover:text-green-700 font-medium">
          volunteer
        </span> 
        setiap proyek volunteer. Nantinya pendaftar akan dilakukan seleksi
        terkait kriteria serta guna memastikan kebutuhan role yang dibutuhkan.
      </p>`,
  },
  {
    question: "Apa itu SHCUnion?",
    answer: `
      <p class="text-gray-600 leading-relaxed pb-4">
        <strong>SHCUnion</strong> adalah platform layanan digital untuk berbagai kebutuhan.
      </p>`,
  },
  {
    question: "Bagaimana cara menjadi volunteer?",
    answer: `
      <p class="text-gray-600 leading-relaxed pb-4">
        Anda dapat bergabung menjadi volunteer dengan mengisi formulir
        pendaftaran pada halaman 
        <span class="text-green-600 hover:text-green-700 font-medium">
          volunteer
        </span> 
        setiap proyek volunteer. Nantinya pendaftar akan dilakukan seleksi
        terkait kriteria serta guna memastikan kebutuhan role yang dibutuhkan.
      </p>`,
  },
  {
    question: "Bagaimana cara menjadi volunteer?",
    answer: `
      <p class="text-gray-600 leading-relaxed pb-4">
        Anda dapat bergabung menjadi volunteer dengan mengisi formulir
        pendaftaran pada halaman 
        <span class="text-green-600 hover:text-green-700 font-medium">
          volunteer
        </span> 
        setiap proyek volunteer. Nantinya pendaftar akan dilakukan seleksi
        terkait kriteria serta guna memastikan kebutuhan role yang dibutuhkan.
      </p>`,
  },
  {
    question: "Bagaimana cara melakukan penarikan?",
    answer: `
      <p class="text-gray-600 leading-relaxed pb-4">
        Anda dapat melakukan penarikan dengan mengisi formulir
        pendaftaran pada halaman 
        <span class="text-green-600 hover:text-green-700 font-medium">
          volunteer
        </span> 
        setiap proyek volunteer. Nantinya pendaftar akan dilakukan seleksi
        terkait kriteria serta guna memastikan kebutuhan role yang dibutuhkan.
      </p>`,
  },
]);

// Filter FAQ berdasarkan search query
const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs.value;
  return faqs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

onMounted(async () => {
  emits("toggle-loading"); // Matikan loading setelah fetching selesai
});

onBeforeMount(() => {
  emits("toggle-active-loading");
});
</script>

<template>
  <!-- FAQ Section -->
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12">
        <!-- Breadcrumb Section -->
        <div
          class="leading-[1.8571428571] flex flex-wrap sm:justify-between justify-center items-center ssm:mb-[33px] mb-[10px] max-sm:flex-col gap-x-[15px] gap-y-[5px]"
        >
          <!-- Title -->
          <!-- <h4
              class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold"
            >
              chat
            </h4> -->
          <!-- Breadcrumb Navigation -->
          <div class="flex flex-wrap justify-center">
            <nav>
              <ol
                class="flex flex-wrap p-0 mb-0 list-none gap-[8px] max-sm:justify-center"
              >
                <!-- Parent Link -->
                <li class="inline-flex items-center">
                  <a
                    class="text-[14px] font-normal leading-[20px] text-body dark:text-neutral-200 hover:text-primary group"
                    href="index.html"
                  >
                    <i
                      class="uil uil-estate text-light dark:text-white/50 me-[8px] text-[16px] group-hover:text-current"
                    ></i
                    >Dashboard</a
                  >
                </li>
                <!-- Middle (Conditional) -->

                <li
                  class="inline-flex items-center before:content-[''] before:w-1 before:h-1 before:ltr:float-left rtl:float-right before:bg-light-extra before:me-[7px] before:pe-0 before:rounded-[50%]"
                >
                  <span
                    class="text-[14px] font-normal leading-[20px] text-body dark:text-neutral-200 transition duration-300 capitalize"
                    >Informasi</span
                  >
                </li>

                <!-- Child (Current Page) -->
                <li
                  class="inline-flex items-center before:content-[''] before:w-1 before:h-1 before:ltr:float-left rtl:float-right before:bg-light-extra before:me-[7px] before:pe-0 before:rounded-[50%]"
                  aria-current="page"
                >
                  <span
                    class="text-[14px] font-normal leading-[20px] flex items-center capitalize text-light dark:text-subtitle-dark"
                    >panduan</span
                  >
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-800 mb-4">
        Panduan Penggunaan Aplikasi
      </h2>
      <div
        class="flex items-center bg-white rounded-xl dark:bg-box-dark-up h-[40px] 4xl:w-[350px] w-full px-[25px]"
      >
        <input
          type="search"
          name="search"
          v-model="searchQuery"
          placeholder="Search here..."
          class="bg-only-transparent text-[14px] w-full h-[40px] pe-[15px] py-[10px] outline-none border-none text-light dark:text-subtitle-dark placeholder:text-light dark:placeholder:text-subtitle-dark search-close-icon:appearance-none search-close-icon:w-[20px] search-close-icon:h-[23px] search-close-icon:bg-[url(../../assets/images/svg/x.svg)] search-close-icon:cursor-pointer"
        />
        <i class="uil uil-search text-light-extra dark:text-subtitle-dark"></i>
      </div>
    </div>

    <div class="flex flex-col md:flex-row md:gap-2 mt-8 items-start">
      <div
        class="w-full bg-white rounded-xl transition-all duration-200 md:p-4 space-y-4 pb-0"
      >
        <!-- FAQ Item 1 -->
        <div
          v-for="(faq, index) in filteredFaqs"
          :key="index"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
        >
          <button
            class="w-full p-6 pb-2 text-left focus:outline-none"
            @click="toggleDropdown(index)"
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
                    {{ faq.question }}
                  </h3>
                  <svg
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isFAQActive(index) }"
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
              isFAQActive(index)
                ? 'max-height: 200px; opacity: 1;'
                : 'max-height: 0; opacity: 0;'
            "
          >
            <p
              v-html="faq.answer"
              class="text-gray-600 leading-relaxed pb-4"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
