<script setup>
import { ref, watch, onMounted, onBeforeMount } from "vue";
import api from "@/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const emits = defineEmits(["toggle-active-loading", "toggle-loading"]);

const selectedStatus = ref("in_progress");
const statusActive = ref("in_progress");
const searchProjectBar = ref("");
const selectedCategory = ref("");
const selectedSort = ref("asc");
const selectedKodeProvinsi = ref("");

const page = ref(1);
const currentPage = ref(1);
const lastPage = ref();

const provinsiList = ref();
const projectList = ref();
const projectCount = ref(0);

const statusList = ref([
  {
    key: "in_progress",
    status: "Proyek Dibuka",
  },
  {
    key: "in_review",
    status: "Segera Dibuka",
  },
  {
    key: "completed",
    status: "Proyek Selesai",
  },
]);

const changeStatus = (status) => {
  selectedStatus.value = status === "in_progress" ? "in_progress" : status;
  statusActive.value = status;
  console.log(selectedStatus.value);
};

const formattedDate = (date) => {
  const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const d = new Date(date);
  const tahun = d.getFullYear();
  const namaHari = hari[d.getDay()]; // Mendapatkan nama hari
  const tanggal = d.getDate(); // Tanggal (1-31)
  const namaBulan = bulan[d.getMonth()]; // Nama bulan
  const jam = String(d.getHours()).padStart(2, "0"); // Jam dalam format 24 jam
  const menit = String(d.getMinutes()).padStart(2, "0"); // Menit

  return `${namaHari}, ${tanggal}-${namaBulan}-${tahun}`;
};

const getPublicProjectList = async () => {
  console.log("sort : ", selectedSort.value);
  console.log("status : ", selectedStatus.value);
  console.log("category : ", selectedCategory.value);
  console.log("search : ", searchProjectBar.value);

  try {
    const response = await api.get(`/project/public/list`, {
      params: {
        kode_provinsi: "11.00",
        limit: 3,
        status: selectedStatus.value,
        category: selectedCategory.value,
        sort: selectedSort.value,
        search: searchProjectBar.value,
        shuffle: true,
        page: page.value,
      },
    });

    console.log("project  : ", response.data);

    if (response.status === 200) {
      const projectsListData = response.data.projects.map((project) => ({
        projectId: project.project_id,
        projectTitle: project.project_title,
        projectDescription: project.project_description,
        projectStartDate: formattedDate(project.project_start_date),
        projectEndDate: formattedDate(project.project_end_date),
        projectStatus: project.project_status,
        projectCategory: project.project_category,
        projectAddress: project.project_address,
        projectImage: project.project_image,
        projectTargetAmount: project.project_target_amount,
        projectProgressAmount: project.project_progress_amount,
        projectProgressPercentage: project.project_progress_percentage,
        projectTags: project.project_tags.map((tag) => ({
          tagId: tag.tag_id,
          tagName: tag.tag_name,
        })),
      }));

      lastPage.value = response.data.pagination.last_page;

      projectList.value = projectsListData;
      projectCount.value = response.data.pagination.total;

      console.log("Project List : ", projectList.value);
    }
  } catch (error) {
    console.log("error public : ", error);
  }
};

const getProvinsi = async () => {
  try {
    const responses = await api.get("provinsi/list");
    console.log(responses.data);
    const provinsiLists = responses.data.provinsi.map((province) => ({
      kodeProvinsi: province.kode_provinsi,
      namaProvinsi: province.nama_provinsi,
    }));

    provinsiList.value = provinsiLists;
  } catch (error) {
    console.error(
      error.response.data ? error.response.data : "Error Fetching Provinsi"
    );
  }
};

const fetcData = async () => {
  try {
    await Promise.all([getPublicProjectList(), getProvinsi()]);
  } catch (error) {
    console.log("Error fetch Home Page");
  }
};

watch([page], getPublicProjectList);

onMounted(async () => {
  await fetcData();
  emits("toggle-loading"); // Matikan loading setelah fetching selesai
});

onBeforeMount(() => {
  emits("toggle-active-loading");
});
</script>

<template>
  <!-- Stats Section -->
  <div class="max-w-7xl mx-auto p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
      <div class="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center md:justify-start md:items-start">
        <h3 class="text-gray-500 md:text-sm text-lg">Total Proyek Aktif</h3>
        <p class="md:text-2xl text-3xl font-bold">24 Proyek</p>
        <div class="flex items-center mt-2 text-green-600">
          <span class="md:text-xs text-sm">↑ 12% dari bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center md:justify-start md:items-start">
        <h3 class="text-gray-500 md:text-sm text-lg">Total Dana Terkumpul</h3>
        <p class="md:text-2xl text-3xl font-bold">Rp 6.4 Miliar</p>
        <div class="flex items-center mt-2 text-green-600">
          <span class="md:text-xs text-sm">↑ 8% dari bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center md:justify-start md:items-start">
        <h3 class="text-gray-500 md:text-sm text-lg">Total Volunteer Terlibat</h3>
        <p class="md:text-2xl text-3xl font-bold">2032 Volunteer</p>
        <div class="flex items-center mt-2 text-gray-600">
          <span class="md:text-xs text-sm">Sama dengan bulan lalu</span>
        </div>
      </div>
      <div class="bg-white p-6 rounded-lg shadow flex flex-col justify-center items-center md:justify-start md:items-start">
        <h3 class="text-gray-500 md:text-sm text-lg">Total Donatur</h3>
        <p class="md:text-2xl text-3xl font-bold">1,240 Donatur</p>
        <div class="flex items-center mt-2 text-green-600">
          <span class="md:text-xs text-sm">↑ 15% dari bulan lalu</span>
        </div>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div class="bg-white p-4 rounded-lg shadow mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input
            type="text"
            v-model="searchProjectBar"
            placeholder="Cari proyek..."
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <select
          v-model="selectedCategory"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Kategori Proyek</option>
          <option value="donation">Donasi</option>
          <option value="volunteer">Volunteer</option>
        </select>
        <select
          v-model="selectedKodeProvinsi"
          id="province"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Province</option>
          <option
            v-for="provinsi in provinsiList"
            :key="provinsi.kodeProvinsi"
            :value="provinsi.kodeProvinsi"
          >
            {{ provinsi.namaProvinsi }}
          </option>
        </select>

        <button
          @click="getPublicProjectList"
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
        <p class="text-gray-500">
          Menampilkan 3 dari {{ projectCount }} proyek
        </p>
      </div>
    </div>

    <!-- Filter Pills -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="status in statusList"
        :key="status.key"
        :class="{
          'bg-green-200 text-green-700': statusActive === status.key,
        }"
        class="px-4 py-2 bg-green-50 rounded-full hover:bg-green-200"
        @click="changeStatus(status.key)"
      >
        {{ status.status }}
      </button>

      <div class="flex-1"></div>
      <router-link
        to="/project/list"
        class="text-green-600 hover:text-green-800"
      >
        Lihat Semua Proyek
      </router-link>
    </div>

    <!-- Project Cards (with hover effects) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projectList"
        class="border rounded-lg overflow-hidden bg-white transition-transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="relative">
          <div
            class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
          >
            ROI 16%
          </div>
          <img
            :src="project.projectImage"
            :alt="project.projectTitle"
            class="w-full h-48 object-cover"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 flex items-center justify-center"
          >
            <!-- <div class="bg-white/90 backdrop-blur rounded-full p-4">
              <span class="text-green-700 font-bold"></span>
            </div> -->
          </div>
        </div>

        <div class="p-4">
          <div class="flex justify-between mb-2">
            <span class="text-gray-600"
              >{{
                project.projectCategory === "donation"
                  ? "Donasi Terkumpul"
                  : "Partisipasi Volunteer"
              }}
            </span>
            <span class="text-red-500 font-bold"
              >{{ project.projectCategory === "donation" ? "Rp" : "" }}
              {{ project.projectProgressAmount }}
              {{ project.projectCategory === "volunteer" ? "Orang" : "" }}</span
            >
          </div>

          <div class="flex gap-2 mb-4">
            <span
              v-for="tag in project.projectTag"
              :key="tag.tagId"
              class="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
              >{{ tag.tagName }}</span
            >
          </div>

          <h3 class="font-bold text-lg mb-2 hover:text-green-600">
            <router-link :to="`/project/${project.projectId}`">{{
              project.projectTitle
            }}</router-link>
          </h3>

          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              class="bg-blue-600 h-2 rounded-full"
              :style="{
                width: `${project?.projectProgressPercentage}%`,
              }"
            ></div>
          </div>

          <p class="text-gray-600 text-sm mb-4">
            {{ project.projectDescription }}
            <router-link :to="`/project/${project.projectId}`">{{
              project.projectTitle
            }}</router-link>
          </p>

          <div class="flex justify-between items-center pt-4 border-t">
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >
                {{ project.projectStatus === "in_progress" ? "Dibuka" : "" }}
                {{
                  project.projectStatus === "in_review" ? "Segera Dibuka" : ""
                }}
                {{ project.projectStatus === "completed" ? "Selesai" : "" }}
              </span>
            </div>
            <div
              v-if="project.projectStatus !== 'in_review'"
              class="flex items-center gap-2"
            >
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
              <span class="text-gray-700"
                >{{ project.projectCategory === "donation" ? "Rp" : "" }}
                {{ project.projectTargetAmount }}
                {{
                  project.projectCategory === "volunteer" ? "Orang" : ""
                }}</span
              >
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
            @click="
              () => {
                currentPage--;
                page--;
              }
            "
            :disabled="currentPage === 1"
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
            @click="
              () => {
                currentPage++;
                page++;
              }
            "
            :disabled="currentPage === lastPage"
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
