<script setup>
import { ref, onMounted } from "vue";
import { start } from "@popperjs/core";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";

const token = localStorage.getItem("token");
const router = useRouter();
const route = useRoute();
const projectId = route.params.projectId;
const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;
const projectDetail = ref();
const tabCheked = ref("criteria");
const userProfile = ref({
  userId: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  email: "",
});

const eWalletPaymentMethod = ref([
  {
    eWalletName: "QRIS",
    description: "Didukung oleh sebagian besar aplikasi emoney dan bank",
    icon: "",
    alt: "QRIS Logo",
  },
  {
    eWalletName: "OVO Ewallet",
    description: "OVO Ewallet",
    icon: "",
    alt: "OVO Logo",
  },
  {
    eWalletName: "LinkAja Ewallet",
    description: "LinkAja Ewallet",
    icon: "",
    alt: "LinkAja Logo",
  },
  {
    eWalletName: "DANA Ewallet",
    description: "DANA Ewallet",
    icon: "",
    alt: "DANA Logo",
  },
]);

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
    const response = await api.get("/test-profile");

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

const startPaymentTransaction = async () => {
  try {
    console.log("push to payment");
    router.push({
      path: `/donation/payment/${projectId}`,
      name: "donation-payment",
      query: { orderId: "PA9855919" },
    });
  } catch (error) {
    console.log(error);
  }
};

const getProjectDetail = async () => {
  try {
    const responses = await api.get(`/test-project-id/${userId}/${projectId}`);
    console.log(
      "project: ",
      JSON.parse(responses.data.project_details[0].project_criteria)
    );
    console.log(JSON.parse(responses.data.project_details[0].project_criteria));
    const projectdetailList = responses.data.project_details.map((project) => ({
      projectId: project.project_id,
      projectTitle: project.project_title,
      projectCriteria: project.project_criteria
        ? JSON.parse(project.project_criteria).map((criteria) => ({
            key: criteria.key,
            value: criteria.value,
          }))
        : [{ key: "", value: "" }],
      projectRole: project.project_role
        ? JSON.parse(project.project_role).map((role) => ({
            key: role.key,
            value: role.value,
          }))
        : [{ key: "", value: "" }],
    }));

    projectDetail.value = projectdetailList[0];

    // selectedTags.value = projectdetailList[0].projectTags.map((tag) => tag.tagName);
    console.log("project detail : ", projectDetail[0].value);

    initialMapLayer();
  } catch (error) {
    console.error("error Fetch Project : ", error);
  }
};

onMounted(() => {
  getUserProfile();
  getProjectDetail();
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
              Complete Your Payment
            </h1>
            <p class="text-gray-600 mt-2">
              Please provide your information and select a payment method to
              continue.
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
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    ></div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      v-model="userProfile.phoneNumber"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0812 3456 7890"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="alamat"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Alamat</label
                  >
                  <div class="relative">
                    <input
                      type="text"
                      id="alamat"
                      name="alamat"
                      v-model="userProfile.address"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
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
                class="px-6 py-4 max-h-[50vh]"
              >
                <table class="min-w-full bg-white border rounded-md mt-1 mb-2">
                  <!-- Klik pada header untuk menambah baris -->
                  <thead>
                    <tr class="bg-gray-100">
                      <th
                        class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                      >
                        Kriteria
                      </th>
                      <th
                        class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                      >
                        Nilai
                      </th>
                      <th
                        class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                      >
                        Role
                      </th>
                      <th
                        class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                      >
                        Memenuhi?
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(
                        criteria, index
                      ) in projectDetail?.projectCriteria"
                      :key="index"
                    >
                      <td class="border px-4 py-2">
                        <span
                          class="flex justify-center items-center w-full px-2 py-1 border-0 outline-none focus:ring-0 bg-transparent text-center"
                        >
                          {{ criteria.key }}
                        </span>
                      </td>
                      <td class="border px-4 py-2">
                        <span
                          class="flex justify-center items-center w-full px-2 py-1 border-0 outline-none focus:ring-0 bg-transparent text-center"
                        >
                          {{ criteria.value }}
                        </span>
                      </td>
                      <td class="border px-4 py-2">
                        <span
                          class="flex justify-center items-center w-full px-2 py-1 border-0 outline-none focus:ring-0 bg-transparent text-center"
                        >
                          {{ criteria.role }}
                        </span>
                      </td>
                      <td class="border px-4 py-2">
                        <input
                          type="radio"
                          checked
                          class="flex justify-center items-center w-full px-2 py-1 border-0 outline-none focus:ring-0 bg-transparent text-center"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                        Ini adallah role yang kamu pilih
                      </span>
                    </label>
                  </div>
                  <!-- <img :src="role.icon" :alt="role.key" class="h-8" /> -->
                  <span class="h-8">
                    {{ role.value }}
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="start_date"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Tanggal Mulai</label
                  >
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label
                    for="end_date"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Tanggal Selesai</label
                  >
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              @click="startPaymentTransaction"
              class="bg-blue-500 text-white rounded-lg p-3 mt-4"
            >
              Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
