<script setup>
import { ref, watch, onMounted, onBeforeMount } from "vue";
import api from "@/api";

const emits = defineEmits(["toggle-active-loading", "toggle-loading"]);

const selectedStatus = ref("in_progress");
const statusActive = ref("in_progress");
const page = ref(1);
const currentPage = ref(1);
const lastPage = ref();
const searchProjectBar = ref("");
const selectedCategory = ref("");
const selectedSort = ref("asc");
const selectedKodeProvinsi = ref("");
const selectedKodeKabupaten = ref("");
const selectedMonth = ref("");

const provinsiList = ref();
const kabupatenList = ref();
const projectList = ref();
const projectCount = ref(0);

const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const bulan = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const formattedDate = (date) => {
  const d = new Date(date);
  const tahun = d.getFullYear();
  const namaHari = hari[d.getDay()]; // Mendapatkan nama hari
  const tanggal = d.getDate(); // Tanggal (1-31)
  const namaBulan = bulan[d.getMonth()]; // Nama bulan
  const jam = String(d.getHours()).padStart(2, "0"); // Jam dalam format 24 jam
  const menit = String(d.getMinutes()).padStart(2, "0"); // Menit

  return `${tanggal} ${namaBulan} ${tahun}`;
};

const getPublicProjectList = async () => {
  console.log("sort : ", selectedSort.value);
  console.log("status : ", selectedStatus.value);
  console.log("category : ", selectedCategory.value);
  console.log("search : ", searchProjectBar.value);
  console.log("page : ", page.value);
  console.log("bulan : ", selectedMonth.value);

  try {
    const response = await api.get(`/project/public/list`, {
      params: {
        kode_provinsi: selectedKodeProvinsi.value,
        kode_kabupaten: selectedKodeKabupaten.value,
        limit: 3,
        status: selectedStatus.value,
        category: selectedCategory.value,
        sort: selectedSort.value,
        search: searchProjectBar.value,
        page: page.value,
        shuffle: false,
        bulan: selectedMonth.value,
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

const getKabupaten = async (kodeProvinsi) => {
  try {
    const responses = await api.get(`/provinsi/${kodeProvinsi}/kabupaten/list`);
    console.log(responses.data);
    const kabupatenLists = responses.data.kabupaten.map((kabupaten) => ({
      kodeKabupaten: kabupaten.kode_kabupaten,
      namaKabupaten: kabupaten.nama_kabupaten,
    }));

    kabupatenList.value = kabupatenLists;
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
  <div class="max-w-7xl mx-auto p-6">
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
          @change="getKabupaten(selectedKodeProvinsi)"
          v-model="selectedKodeProvinsi"
          id="province"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Pilih Provinsi</option>
          <option
            v-for="provinsi in provinsiList"
            :key="provinsi.kodeProvinsi"
            :value="provinsi.kodeProvinsi"
          >
            {{ provinsi.namaProvinsi }}
          </option>
        </select>
        <select
          v-model="selectedKodeKabupaten"
          :disabled="!selectedKodeProvinsi"
          id="province"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Pilih Kabupaten</option>
          <option
            v-for="kabupaten in kabupatenList"
            :key="kabupaten.kodeKabupaten"
            :value="kabupaten.kodeKabupaten"
          >
            {{ kabupaten.namaKabupaten }}
          </option>
        </select>
        <select
          v-model="selectedMonth"
          class="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Pilih Bulan</option>
          <option
            v-for="(month, index) in bulan"
            :key="index"
            :value="index + 1"
          >
            {{ month }}
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

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Filter Proyek</h1>
        <p class="text-gray-500">
          Menampilkan 12 dari {{ projectCount }} proyek
        </p>
      </div>
    </div>

    <!-- Project Cards (with hover effects) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-if="projectList?.length !== 0"
        v-for="project in projectList"
        class="border rounded-lg overflow-hidden bg-white transition-transform hover:scale-[1.02] hover:shadow-lg"
      >
        <div class="relative">
          <div></div>
          <div
            class="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full"
          >
            {{
              project.projectCategory === "donation" ? "Donasi" : "Volunteer"
            }}
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
                class="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
              >
                Deadline {{ project.projectEndDate }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <i class="ui uil-crosshair text-lg text-green-700"></i>
              <span class="text-green-700 font-semibold"
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

      <!-- projectList is null  -->
      <div
        v-else
        class="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10"
      >
        <p class="text-gray-500 text-lg">Tidak ada proyek yang ditemukan.</p>
      </div>
      <!-- Additional cards with same structure... -->
    </div>

    <!-- Page Number  -->

    <!-- Enhanced Pagination -->
    <div v-if="projectList?.length !== 0" class="flex justify-end w-full mt-6">
      <div class="flex gap-x-2">
        <!-- Tombol First -->
        <button
          @click="
            () => {
              currentPage = 1;
              page = 1;
            }
          "
          :disabled="currentPage === 1"
          class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          First
        </button>

        <!-- Tombol Previous -->
        <button
          @click="
            () => {
              currentPage--;
              page--;
            }
          "
          :disabled="currentPage === 1"
          class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Numbering -->
        <span
          v-for="num in lastPage"
          :key="num"
          @click="
            () => {
              currentPage = num;
              page = num;
            }
          "
          class="px-3 py-2 rounded cursor-pointer"
          :class="{
            'bg-blue-500 text-white': num === currentPage,
            'bg-gray-200': num !== currentPage,
          }"
        >
          {{ num }}
        </span>

        <!-- Tombol Next -->
        <button
          @click="
            () => {
              currentPage++;
              page++;
            }
          "
          :disabled="currentPage === lastPage"
          class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!-- Tombol Last -->
        <button
          @click="
            () => {
              currentPage = lastPage;
              page = lastPage;
            }
          "
          :disabled="currentPage === lastPage"
          class="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  </div>
</template>
