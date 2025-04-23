<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import { useToast } from "vue-toast-notification";


const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const token = localStorage.getItem("access_token");
const toastNotification = useToast();
const router = useRouter();
const route = useRoute();
const projectId = route.params.projectId;
const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;
const involvementDetail = ref({
  startDate: "",
  endDate: "",
  startTime: "",
  endTime: "",
});

const projectDetail = ref({
  projectId: "",
  projectTitle: "",
  projectAddress: "",
  projectCriteria: [
    {
      key: "",
      value: "",
      role: "",
      fulfilled: false,
    },
  ],
  projectRole: [
    {
      key: "",
      value: "",
    },
  ],
});

const tabCheked = ref("criteria");
const userProfile = ref({
  userId: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  email: "",
});

const openNotificatication = (message) => {
  toastNotification.open({
    type: "success",
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

const isTabChecked = (tab) => {
  return tabCheked.value === tab;
};

const checkedTab = (tab) => {
  tabCheked.value = tab;
};

const roleChecked = ref({});
const roleProject = ref("");

const isRoleChecked = (role) => {
  return roleChecked.value.key === role.key;
};

const checkedRole = (role) => {
  console.log("checked : ", role);
  roleChecked.value.key = role.key;
  roleProject.value = role.key;
  console.log("ewallet : ", roleChecked.value);

  //   checkTotalAmountPayment();
};

const getUserProfile = async () => {
  try {
    const response = await api.get(`/user/${userId}/profile`);

    console.log("user : ", response.data.user);
    const data = response.data.user;
    userProfile.value = {
      userId: data.user_id,
      fullName: data.full_name, // Ambil dari response.full_name
      phoneNumber: data.phone_number, // Ambil dari response.phone_number
      email: data.email, // Ambil dari response.email
    };

    console.log("user profile HEADER : ", userProfile.value);
  } catch (error) {
    console.error("error Fetch User : ", error);
  }
};

const storeVolunteerInvolvment = async () => {
  try {
    const criteria = JSON.stringify(
      projectDetail.value.projectCriteria.map((criteria) => ({
        key: criteria.key,
        value: criteria.value,
        role: criteria.role,
      }))
    );
    console.log("checked criteria : ", criteria);
    console.log("involvement start time : ", involvementDetail.value.startTime);
    console.log("involvement END time : ", involvementDetail.value.endTime);
    console.log('role : ', roleChecked.value)

    console.log("store volunteer Information");
    const formData = new FormData();

    formData.append("email", userProfile.value.email);
    formData.append("full_name", userProfile.value.fullName);
    formData.append("address", userProfile.value.address);
    formData.append("phone_number", userProfile.value.phoneNumber);
    formData.append(
      "criteria_checked",
      JSON.stringify(
        projectDetail.value.projectCriteria.map((criteria) => ({
          key: criteria.key,
          value: criteria.value,
          role: criteria.role,
          checked: criteria.fulfilled
        }))
      )
    );
    formData.append(
      "involvement_start_date",
      involvementDetail.value.startDate
    );
    formData.append("involvement_end_date", involvementDetail.value.endDate);
    formData.append(
      "involvement_start_time",
      involvementDetail.value.startTime
    );
    formData.append("involvement_end_time", involvementDetail.value.endTime);
    formData.append("role", roleChecked.value.key);

    const response = await api.post(`/project/${projectId}/volunteer/store`, formData);

    console.log("volunteer bergabung : ", response.data);
    openNotificatication(`Anda Berhasil Bergabung dalam Volunteer ${projectDetail.projectTitle}`)
    router.push({
      path: `/project/${projectId}`,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProjectDetail = async () => {
  try {
    const responses = await api.get(`/project/${projectId}/public/detail`);
    console.log(
      "project: ",
      JSON.parse(responses.data.project_details[0].project_criteria)
    );
    console.log(JSON.parse(responses.data.project_details[0].project_criteria));
    const projectdetailList = responses.data.project_details.map((project) => ({
      projectId: project.project_id,
      projectTitle: project.project_title,
      projectAddress: project.project_address,
      projectCriteria: project.project_criteria
        ? JSON.parse(project.project_criteria).map((criteria) => ({
            key: criteria.key,
            value: criteria.value,
            role: criteria.role,
            fulfilled: false,
          }))
        : [{ key: "", value: "" }],
      projectRole: project.project_roles
        ? project.project_roles.map((role) => ({
            key: role.role,
            value: role.jumlah,
            sisa: role.sisa
          }))
        : [{ key: "", value: "" }],
    }));

    projectDetail.value = projectdetailList[0];

    // selectedTags.value = projectdetailList[0].projectTags.map((tag) => tag.tagName);
    // console.log("project detail : ", projectDetail[0].value);

    // initialMapLayer();
  } catch (error) {
    console.error("error Fetch Project : ", error);
  }
};

const fetchData = async () => {
  try {
    await Promise.all([
    getUserProfile(),
    getProjectDetail()
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  await fetchData(); // Tunggu semua data selesai
  emits("toggle-loading"); // Matikan loading setelah fetching selesai

});

onBeforeMount(() => {
  emits("toggle-active-loading"); // Aktifkan loading sebelum fetching dimulai
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto p-4 md:p-6">
      <!-- Page Title -->

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-8 gap-6">
        <div class="col-span-8 lg:col-start-2 lg:col-span-6">
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-800">
              Konfirmasi Keikutsertaan Anda
            </h1>
            <p class="text-gray-600 mt-2">
              Silakan lengkapi informasi Anda dan konfirmasi keikutsertaan
              sebagai volunteer.
            </p>
          </div>
        </div>
        <!-- Left Column - User Information -->
        <div class="col-span-8 lg:col-start-2 lg:col-span-6">
          <!-- User Information Section -->
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-10"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >1</span
                >
                User Information
              </h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="fullName"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Full Name</label
                  >
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    v-model="userProfile.fullName"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="userProfile.email"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Phone Number</label
                  >
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    v-model="userProfile.phoneNumber"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="0812 3456 7890"
                  />
                </div>
                <div>
                  <label
                    for="alamat"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Alamat Pengguna</label
                  >
                  <input
                    type="text"
                    id="alamat"
                    name="alamat"
                    v-model="userProfile.address"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <!-- Project Volunteer memenuhi 1 baris penuh -->
                <div class="col-span-1 md:col-span-2">
                  <label
                    for="projectTitle"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Proyek Volunteer</label
                  >
                  <div
                    id="projectTitle"
                    name="projectTitle"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {{ projectDetail.projectTitle }}
                  </div>
                </div>

                <!-- Alamat Proyek memenuhi 1 baris penuh -->
                <div class="col-span-1 md:col-span-2">
                  <label
                    for="alamatProyek"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Alamat Proyek</label
                  >
                  <div
                    id="alamatProyek"
                    name="alamatProyek"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {{ projectDetail.projectAddress }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Criteria and Role  Section -->
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-10"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >2</span
                >
                Infromasi Kriteria dan Kebutuhan Role
              </h2>
            </div>

            <!-- Kriteria dan Role Tabs -->
            <div class="border-b border-gray-200">
              <div class="flex -mb-px">
                <button
                  @click="checkedTab('criteria')"
                  :class="{
                    'py-4 px-6': true,
                    ' text-gray-400 hover:text-gray-500 border-b-2 border-transparent':
                      !isTabChecked('criteria'),
                    ' border-b-2 border-blue-500 text-blue-600 font-medium':
                      isTabChecked('criteria'),
                  }"
                >
                  Kriteria
                </button>
                <button
                  @click="checkedTab('role')"
                  :class="{
                    'py-4 px-6': true,
                    ' text-gray-400 hover:text-gray-500 border-b-2 border-transparent':
                      !isTabChecked('role'),
                    'border-b-2 border-blue-500 text-blue-600 font-medium':
                      isTabChecked('role'),
                  }"
                >
                  Role
                </button>
              </div>
            </div>

            <!-- Checked Criteria -->
            <div class="p-6">
              <!-- Criteria Option -->

              <div
                v-if="isTabChecked('criteria')"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <div
                  v-for="criteria in projectDetail?.projectCriteria"
                  :key="criteria.key"
                  @click="criteria.fulfilled = !criteria.fulfilled"
                  :class="{
                    'mb-4 border rounded-lg transition-all cursor-pointer': true,
                    'border-gray-200 hover:border-gray-300':
                      !criteria.fulfilled,
                    'border-green-300 bg-green-50': criteria.fulfilled,
                  }"
                >
                  <div class="p-4 flex items-center justify-between">
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        v-model="criteria.fulfilled"
                        class="w-5 h-5 text-green-600 border-gray-300 focus:ring-green-500"
                      />
                      <label class="ml-3 flex flex-col">
                        <span class="font-medium text-gray-900">
                          {{ criteria.key }}
                        </span>

                        <span class="text-sm text-gray-500">
                          <span class="font-semibold"
                            >({{ criteria.value }})</span
                          >
                        </span>
                        <span class="text-sm text-gray-500">
                          Role: {{ criteria.role !== 'all' ? criteria.role : 'Semua Role' }}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Role Option  -->

              <div
                v-else
                v-for="role in projectDetail?.projectRole"
                :class="{
                  'mb-4 border rounded-lg  transition-all': true,
                  'border-gray-200 hover:border-gray-300': !isRoleChecked(role),
                  'border-blue-200  bg-blue-50': isRoleChecked(role),
                }"
                @click="checkedRole(role)"
                :key="role.key"
              >
                <div class="p-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      :checked="isRoleChecked(role)"
                      class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label class="ml-3 flex flex-col">
                      <span class="font-medium text-gray-900">{{
                        role.key
                      }}</span>
                      <span class="text-sm text-gray-500">
                        Kebutuhan Role : {{ role.value }}
                      </span>
                    </label>
                  </div>
                  <!-- <img :src="role.icon" :alt="role.key" class="h-8" /> -->
                  <span class="h-8">
                    {{ role.sisa }}
                  </span>
                </div>
                <!-- <div
                  class="absolute top-0 right-0 h-full w-1 bg-blue-500 rounded-r-lg"
                ></div> -->
              </div>
            </div>
          </div>

          <!-- Date Involvement and Hours  -->
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >3</span
                >
                Date Involvement and Hours
              </h2>
            </div>
            <div class="p-6">
              <!-- Grid untuk Tanggal -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label
                    for="start_date"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Mulai
                  </label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    v-model="involvementDetail.startDate"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label
                    for="end_date"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Selesai
                  </label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    v-model="involvementDetail.endDate"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <!-- Grid untuk Jam -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="start_time"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Waktu Mulai
                  </label>
                  <div class="relative">
                    <input
                      type="time"
                      id="start_time"
                      name="start_time"
                      v-model="involvementDetail.startTime"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <span class="absolute right-4 top-3 text-gray-400">
                      <i class="uil uil-time"></i>
                    </span>
                  </div>
                </div>
                <div>
                  <label
                    for="end_time"
                    class="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Waktu Selesai
                  </label>
                  <div class="relative">
                    <input
                      type="time"
                      id="end_time"
                      name="end_time"
                      v-model="involvementDetail.endTime"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <span class="absolute right-4 top-3 text-gray-400">
                      <i class="uil uil-time"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end mt-4">
            <button
              @click="storeVolunteerInvolvment"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Gabung Sebagai Volunteer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
