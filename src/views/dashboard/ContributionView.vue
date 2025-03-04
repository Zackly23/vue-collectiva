<script setup>
import api from "@/api";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

import "vue-toast-notification/dist/theme-sugar.css";

const userID = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null; // Ambil data JSON dari localStorage

const router = useRouter();
const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);

const projectContribution = ref();
const projectsCount = ref();
const statusActive = ref("all");
const selectedStatus = ref("");
const searchProjectBar = ref("");
const selectedCategory = ref("");
const selectedSort = ref("asc");
const statusList = ["all", "in progress", "completed"];
const dropdownEditorId = ref();

const getContributionList = async () => {
  console.log("user id : ", userID);
  console.log("sort : ", selectedSort.value);
  console.log("status : ", selectedStatus.value);
  console.log("category : ", selectedCategory.value);
  console.log("search : ", searchProjectBar.value);

  try {
    const response = await api.get(
      `/test-contribution`,
      {
        params: {
          //   user_id: userID,
          status: selectedStatus.value,
          category: selectedCategory.value,
          sort: selectedSort.value,
          search: searchProjectBar.value,
        },
      }
    );

    console.log(response.data.projects);

    const projectsContributionList = response.data.projects.map((project) => ({
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
      projectContributionDonationAmount: project.donation_amount,
      projectContributionChannelPayment: project.channel_payment,
      projectContributionStatusPayment: project.status_payment,
      projectContributionVolunteerRole: project.volunteer_role,
      projectContributionVolunteerDate: formattedDate(project.involvement_date),
      projectContributionVolunteerHour: project.volunteer_hours,
    }));

    projectContribution.value = projectsContributionList;
    projectsCount.value = response.data.projects_count;
  } catch (error) {
    console.log("error : ", error.response);
  }
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

  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
};

const toggleProjectEditor = (projectId) => {
  dropdownEditorId.value =
    dropdownEditorId.value === projectId ? null : projectId;
};

// Fungsi untuk memperbarui `selectedStatus`
const changeStatus = (status) => {
  selectedStatus.value = status === "all" ? "" : status;
  statusActive.value = status;
  console.log(selectedStatus.value);
};

//Fungsi untuk memperbarui selectedSort
const changeSortBy = (sort) => {
  selectedSort.value = selectedSort.value === "desc" ? "asc" : sort;
};

const closeDropdownOnClickOutside = (event) => {
  // Check if the click is outside any dropdown or button
  // console.log(isDropdownOpen("profile"));
  if (
    !event.target.closest("[data-dropdown-button]") &&
    !event.target.closest("[data-dropdown-content]")
  ) {
    dropdownEditorId.value = null;
  }
};




// Pantau perubahan pada status dan kategori
watch(
  [selectedStatus, selectedCategory, selectedSort, searchProjectBar],
  getContributionList
);

onMounted( async() => {
  try {
    await   getContributionList();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
  }
  emits("toggle-loading"); // Matikan loading setelah fetching selesai

  document.addEventListener("click", closeDropdownOnClickOutside);
});

onBeforeMount(() => {
  emits("toggle-active-loading");

  document.removeEventListener("click", closeDropdownOnClickOutside);
});
</script>

<template>
  <!-- Main Content -->
  <main class="bg-normalBG dark:bg-main-dark">
    <div
      class="mx-[30px] min-h-[calc(100vh-195px)] mb-[30px] ssm:mt-[30px] mt-[15px]"
    >
      <div
        class="flex items-center ssm:justify-between justify-center max-sm:flex-wrap gap-x-[30px] gap-y-[15px]"
      >
        <div
          class="leading-[1.8571428571] flex flex-wrap sm:justify-between justify-center items-center ssm:mb-[33px] mb-[18px] max-sm:flex-col gap-x-[15px] gap-y-[5px]"
        >
          <!-- Title -->
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
                    >App</span
                  >
                </li>

                <!-- Child (Current Page) -->
                <li
                  class="inline-flex items-center before:content-[''] before:w-1 before:h-1 before:ltr:float-left rtl:float-right before:bg-light-extra before:me-[7px] before:pe-0 before:rounded-[50%]"
                  aria-current="page"
                >
                  <span
                    class="text-[14px] font-normal leading-[20px] flex items-center capitalize text-light dark:text-subtitle-dark"
                    >kontribusi</span
                  >
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="inline-flex items-center">
          <h1
            class="text-dark dark:text-title-dark text-[20px] font-semibold mb-0"
          >
            Kontribusi
          </h1>
          <span
            class="relative ms-3 ps-[15px] text-body dark:text-subtitle-dark text-[15px] font-medium before:absolute before:top-0 before:start-0 before:w-[1px] before:h-6 before:bg-normal dark:before:bg-box-dark-up"
          >
            {{ projectsCount }} Kontribusi Project</span
          >
        </div>
        <router-link
          to="/"
          type="button"
          class="flex items-center px-[20px] text-sm text-white rounded-md font-semibold bg-primary border-primary h-10 gap-[6px] transition-[0.3s]"
        >
          <i class="uil uil-plus"></i>
          <span class="m-0 block md:hidden">Kontribusi</span>
          <span class="m-0 hidden md:block xl:hidden">Kontribusi</span>
          <span class="m-0 hidden xl:block">Mulai Kontribusi</span>
        </router-link>
      </div>

      <div
        class="text-[17px] flex items-center 3xl:justify-between max-3xl:flex-col justify-center gap-x-[30px] gap-y-[15px] sm:mt-[30px] mt-[15px]"
      >
        <div
          class="flex items-center gap-x-[20px] gap-y-[15px] max-md:flex-col max-md:flex-wrap"
        >
          <ul
            class="border-1 border-regular bg-white dark:bg-box-dark dark:border-box-dark-up flex items-center sm:h-[40px] rounded-6 whitespace-nowrap max-sm:flex-wrap max-sm:justify-center"
          >
            <li
              v-for="status in statusList"
              :key="status"
              :class="{
                'active bg-gray-200': statusActive === status,
              }"
              class="relative"
            >
              <button
                @click="changeStatus(status)"
                class="sm:px-[15px] px-[10px] sm:py-[10px] py-[5px] text-[14px] leading-[1.78] font-normal text-light-extra dark:text-subtitle-dark capitalize block after:content-[''] after:absolute after:w-[1px] after:h-[20px] after:bg-regular after:dark:bg-box-dark-up after:top-2/4 after:right-0 after:-translate-x-2/4 after:-translate-y-2/4 [&.mixitup-control-active]:text-primary mixitup-control-active"
                data-filter="all"
              >
                {{ status.replace("-", " ") }}
              </button>
            </li>
          </ul>
          <div
            class="flex items-center bg-white rounded-[20px] dark:bg-box-dark-up h-[40px] 4xl:w-[350px] w-full px-[25px]"
          >
            <input
              type="search"
              name="search"
              v-model="searchProjectBar"
              placeholder="Search here..."
              class="bg-only-transparent text-[14px] w-full h-[40px] pe-[15px] py-[10px] outline-none border-none text-light dark:text-subtitle-dark placeholder:text-light dark:placeholder:text-subtitle-dark search-close-icon:appearance-none search-close-icon:w-[20px] search-close-icon:h-[23px] search-close-icon:bg-[url(../../assets/images/svg/x.svg)] search-close-icon:cursor-pointer"
            />
            <i
              class="uil uil-search text-light-extra dark:text-subtitle-dark"
            ></i>
          </div>
        </div>
        <div class="flex items-center gap-x-[20px] gap-y-[10px]">
          <div class="inline-flex items-center">
            <span
              class="me-[15px] text-[14px] text-body dark:text-subtitle-dark max-xs:hidden"
              >Category :</span
            >
            <select
              class="text-[15px] px-[10px]"
              v-model="selectedCategory"
              @change="getProjectsList"
            >
              <option value="">Project Category</option>
              <option value="donation">Donasi</option>
              <option value="volunteer">Volunter</option>
            </select>
          </div>
          <div class="flex items-center gap-x-[10px] gap-y-[5px]">
            <button
              @click="changeSortBy('desc')"
              href="projects.html"
              class="flex items-center justify-center w-[40px] h-[40px] text-[18px] text-light [&.active]:text-primary [&.active]:bg-white [&.active]:shadow font-medium rounded-full transition-[0.3s] active"
            >
              <i
                v-if="selectedSort === 'desc'"
                class="uil uil-arrow-down text-[20px]"
              ></i>

              <i
                v-else-if="selectedSort === 'asc'"
                class="uil uil-arrow-up text-[20px]"
              ></i>
            </button>
            <!-- <button
              class="flex items-center justify-center w-[40px] h-[40px] text-[18px] text-light [&.active]:text-primary [&.active]:bg-white [&.active]:shadow font-medium rounded-full transition-[0.3s]"
            >
              <i class="uil uil-list-ul text-[17px]"></i>
            </button> -->
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-12 sm:gap-[25px] gap-y-[25px] mt-[30px] mixitup-gallery"
      >
        <!-- Iterasi Data Project  -->
        <div
          class="col-span-12 2xl:col-span-4 md:col-span-6 mix mix-early"
          data-order="9"
          v-for="project in projectContribution"
          :key="project.projectId"
        >
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div class="pt-[30px] px-[30px]">
              <div class="flex items-start justify-between">
                <h3 class="flex flex-wrap items-center text-base">
                  <router-link
                    :to="{ path: `/dashboard/project/${project.projectId}` }"
                    class="m-0.5 me-[11px] text-dark dark:text-title-dark hover:text-primary text-15 font-medium capitalize"
                    href="project-details.html"
                  >
                    {{ project.projectTitle }}
                  </router-link>

                  <!-- <span
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-[3px] bg-primary px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]"
                  >
                    early
                  </span> -->
                </h3>
                <div class="relative ms-[20px]" data-te-dropdown-ref>
                  <button
                    @click="toggleProjectEditor(project.projectId)"
                    class="text-[18px] text-light dark:text-subtitle-dark"
                    type="button"
                    id="projectDrops-1"
                    data-dropdown-button="project"
                    aria-expanded="false"
                  >
                    <i class="uil uil-ellipsis-v"></i>
                  </button>
                  <ul
                    :class="{
                      'absolute z-[1000] ltr:float-left  rtl:float-right m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block': true,
                      hidden: dropdownEditorId !== project.projectId,
                    }"
                    data-dropdown-content="project"
                  >
                    <li>
                      <router-link
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        :to="`project/${project.projectId}`"
                        data-te-dropdown-item-ref
                        >View</router-link
                      >
                    </li>
                    <li>
                      <a
                        :href="`https://your-api.com/documents/${project.projectId}`"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        download
                        data-te-dropdown-item-ref
                      >
                        Download Dokumen
                      </a>
                    </li>
                    <li>
                        <router-link
                        class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                        :to="`project/${project.projectId}`"
                        data-te-dropdown-item-ref
                        >View</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <img
                :src="project.projectImage"
                alt="Project Image"
                class="w-full h-40 mt-4 mb-4 rounded-lg object-cover"
              />

              <p class="text-body dark:text-subtitle-dark mt-[15px] mb-[15px]">
                {{ project.projectDescription }}
              </p>

              <div class="flex items-center mb-[15px] gap-x-[30px]">
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Start Date</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectStartDate }}</strong
                  >
                </div>
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Deadline</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectEndDate }}</strong
                  >
                </div>
              </div>

              <!-- if donation  -->
              <div
                v-if="project.projectCategory === 'donation'"
                class="pt-4 flex justify-between items-center mb-[15px] gap-x-[10px] border-t border-regular dark:border-box-dark-up"
              >
                <div class="flex flex-col items-center justify-center">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Donasi Kamu</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectContributionDonationAmount }}</strong
                  >
                </div>
                <div class="flex flex-col items-center justify-center">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Channel</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectContributionChannelPayment }}</strong
                  >
                </div>
                <div class="flex flex-col items-center justify-center">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Status</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectContributionStatusPayment }}</strong
                  >
                </div>
              </div>

              <!-- if volunteer -->
              <div
                v-if="project.projectCategory === 'volunteer'"
                class="pt-4 flex justify-between items-center mb-[15px] gap-x-[30px] border-t border-regular dark:border-box-dark-up"
              >
                <div class="flex flex-col">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Volunteer Date</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectContributionVolunteerDate }}</strong
                  >
                </div>
                <div class="flex flex-col items-center justify-center">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Volunteer Hour</span
                  ><strong class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectContributionVolunteerHour }} Jam</strong
                  >
                </div>
                <div class="flex flex-col items-center justify-center">
                  <span
                    class="text-xs mb-0.5 text-light-extra dark:text-subtitle-dark"
                    >Role</span
                  ><strong
                    class="font-medium text-body dark:text-subtitle-dark"
                    >{{ project.projectContributionVolunteerRole }}</strong
                  >
                </div>
              </div>

              <div
                class="mt-4 pb-6 border-t border-regular dark:border-box-dark-up"
              >
                <div
                  class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark mt-4"
                >
                  <span
                    :class="[
                      'inline-flex items-center justify-center whitespace-nowrap rounded-[3px] px-[6px] py-[3px] text-center align-baseline text-[10px] font-bold leading-none text-white uppercase h-[22px]',
                      project.projectCategory === 'donation'
                        ? ' bg-blue-600'
                        : ' bg-green-600',
                    ]"
                  >
                    {{ project.projectCategory }}
                  </span>
                  <div
                    class="h-[5px] flex-1 w-[185px] overflow-hidden bg-neutral-200 dark:bg-neutral-600 rounded-[20px]"
                  >
                    <div
                      :class="[
                        'h-[5px] rounded-e-[20px]',
                        project.projectCategory === 'donation'
                          ? ' bg-blue-600'
                          : ' bg-green-600',
                      ]"
                      :style="{
                        width: project.projectProgressPercentage + '%',
                      }"
                    ></div>
                  </div>
                  {{ project.projectProgressPercentage }}%
                </div>
                <p class="mt-2 text-light-extra dark:text-white/60 text-xs">
                  {{ project.projectCategory === "donation" ? "Rp" : "" }}
                  {{ project.projectProgressAmount }}
                  <!-- {{ project.projectCategory === "volunteer" ? "Volunteer" : "" }}  -->
                  dari
                  {{ project.projectCategory === "donation" ? "Rp" : "" }}
                  {{ project.projectTargetAmount }}
                  {{
                    project.projectCategory === "volunteer" ? "Volunteer" : ""
                  }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <!-- End: Main Content -->
</template>
