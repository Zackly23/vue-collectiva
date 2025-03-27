<script setup>
import api from "@/api";
import { ref, onMounted, onBeforeMount, watch } from "vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useToast } from "vue-toast-notification";
import SoftWarningComponent from "@/components/dashboard/modal/SoftWarningComponent.vue";
import HardWarningComponent from "@/components/dashboard/modal/HardWarningComponent.vue";
import SuspendModalComponent from "@/components/dashboard/modal/SuspendModalComponent.vue";

const toastNotification = useToast();
const isVerifyUserModalOpen = ref(false);
const isApprovalProjectModalOpen = ref(false);
const isDeleteAccountModalOpen = ref(false);
const isSuspendModalOpen = ref(false);
const suspendData = ref();
const clarityReport = ref("");
const suspendDuration = ref(0);
const isSuspendConfirmationModalOpen = ref(false);
const isReportCaseModalOpen = ref(false);
const isReportDetailOpen = ref(false);
const isAccountUserOpen = ref(false);
const activeReportedUserId = ref("");
const selectedSosialMedia = ref("");
const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const accountList = ref();
const project_id = ref("");
const userStatistic = ref();
const userReportedCaseList = ref();
const reportDetail = ref();
const userProfile = ref({
  userId: "",
  fullName: "",
  address: "",
  birthDate: "",
  profilePicture: "",
  profileCover: "",
  phoneNumber: "",
  jenisKelamin: "",
  nik: "",
  jabatan: "",
  organizationName: "",
  ktpFile: null,
  email: "",
  socialMedia: {
    facebook: "",
    twitter: "",
    instagram: "",
    github: "",
    medium: "",
    linkedin: "",
  },
});

const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;

const isProjectModalOpen = ref(false);

const searchText = ref("");
const page = ref(1);
const currentPage = ref(1);
const lastPage = ref();

const coloumActive = ref({
  full_name: {
    state: false,
    query: "full_name",
  },
  date: {
    state: false,
    query: "created_at",
  },
  project: {
    state: false,
    query: "total_project",
  },
  contribution: {
    state: false,
    query: "total_contribution",
  },
  status: {
    state: false,
    query: "status",
  },
});

const closeSuspendModal = () => {
  isSuspendModalOpen.value = false;
};

const closeAccountModal = () => {
  console.log("decline");
  isAccountUserOpen.value = false;
};

const closeReportCaseModal = async (userId) => {
  await updateReportCase(userId);
  isReportCaseModalOpen.value = false;
};

const getActiveQueries = () => {
  return Object.entries(coloumActive.value)
    .filter(([_, value]) => value.state)
    .map(([_, value]) => value.query);
};

const coloumClick = (coloum) => {
  console.log(coloum);
  if (coloum === "full_name") {
    coloumActive.value.full_name.state = !coloumActive.value.full_name.state;
  } else if (coloum === "date") {
    coloumActive.value.date.state = !coloumActive.value.date.state;
  } else if (coloum === "project") {
    coloumActive.value.project.state = !coloumActive.value.project.state;
  } else if (coloum === "contribution") {
    coloumActive.value.contribution.state =
      !coloumActive.value.contribution.state;
  } else if (coloum === "status") {
    coloumActive.value.status.state = !coloumActive.value.status.state;
  }

  console.log("coloumActive", coloumActive.value);
  console.log("check active : ", isColoumActive(coloum));
};

const closeConfirmationApprovalModal = () => {
  isApprovalProjectModalOpen.value = false;
};

const openConfirmationApprovalModal = () => {
  isApprovalProjectModalOpen.value = true;
};

const openConfirmationDeleteProjectModal = (userId) => {
  activeReportedUserId.value = userId;
  isDeleteAccountModalOpen.value = true;
};

const suspendUser = (data) => {
  suspendData.value = data;

  clarityReport.value = suspendData.value.clarityReport;
  suspendDuration.value = suspendData.value.suspendDuration;

  console.log("data : ", data);
  console.log("formDsata : ", suspendData.value);

  isSuspendConfirmationModalOpen.value = true;
};

const handleSubmitSuspend = async () => {
  try {
    console.log("formsata : ", suspendData.value);
    console.log('clarity : ', clarityReport.value);
    console.log('duration : ', suspendDuration.value);
    const formData = new FormData();

    formData.append("suspended_reason", clarityReport.value);
    formData.append("suspend_duration", suspendDuration.value);
    formData.append("status", "suspended");

    const response = await api.post(
      `/user/${activeReportedUserId.value}/suspend`,
      formData
    );

    console.log("user telah disuspend");
    // console.log("response report : ", response.data);
    if (response.status == 200) {
      isSuspendConfirmationModalOpen.value = false;
      isSuspendModalOpen.value = false;
      isReportCaseModalOpen.value = false;
      suspendData.value.clarityReport = "";
      suspendData.value.suspendDuration = "";
      openNotificatication(" User Telah Berhasil ditangguhkan");

      await getAccountList();
      await getAccountCardStatistic();
    }
  } catch (error) {
    console.error("error report : ", error);
  }
};

const verifyUser = async () => {
  try {
    const response = await api.put(`/user/${userProfile.value.userId}/verify`);

    if (response.status == 200) {
      console.log("Verifiikasi selesai : ", response.data);
      isVerifyUserModalOpen.value = false;
      openNotificatication("User Berhasil Diverifikasi");
      await getAccountList();
    }
  } catch (error) {
    console.error("error verifikasi : ", error);
    openNotificatication("User Gagal Diverifikasi", "error");
  }
};

const openVerifyUserModal = () => {
  isVerifyUserModalOpen.value = true;
};

const closeVerifyUserModal = () => {
  isVerifyUserModalOpen.value = false;
};
const openReportDetail = async (userId, reportCaseId) => {
  try {
    const response = await api.get(
      `/user/${userId}/reportcase/${reportCaseId}/detail`
    );

    console.log("detail : ", response.data);
    const report = response.data.report_detail;

    const reportDetails = {
      reportCaseId: report.reported_case_id,
      reporterCaseId: report.reporter_case_id,
      reporterCaseId: report.reporter_case_id,
      reporterCaseName: report.reporter_case_name,
      reportedComment: report.reported_comment,
      reportedCase: report.reported_case,
      reportedSegment: report.reported_segment,
      reportedImage: report.reported_image,
      reportedDate: report.reported_date,
      reportedProjectId: report.project_id,
      reportedProjectTitle: report.project_title,
    };

    reportDetail.value = reportDetails;

    isReportDetailOpen.value = true;

    console.log("report Detail : ", reportDetail.value);
  } catch (error) {
    console.error("error", error);
  }
};

const closeConfirmationDeleteAccountModal = () => {
  isDeleteAccountModalOpen.value = false;
};

const isColoumActive = (coloum) => {
  return coloumActive.value[coloum]?.state ?? false;
};

//API

const updateReportCase = async (userId) => {
  try {
    const reportCaseData = userReportedCaseList.value.map((report) => ({
      report_case_id: report.reportCaseId,
      checked: report.reportedChecked,
    }));

    console.log("report : ", reportCaseData);

    const response = await api.put(
      `/user/${userId}/reportcase/update`,
      reportCaseData // Kirim langsung sebagai JSON
    );

    if (response.status === 200) {
      console.log("Update Success:", response.data);
      // openNotificatication("List Evaluasi Berhasil Diupdate");
    }
  } catch (error) {
    console.error("Error updating evaluation:", error);
  }
};

const getAccountCardStatistic = async () => {
  try {
    const response = await api.get("/account/manage/account/statistic");

    // const projectCardStastistic = response.data.project_statistics.map((statistic) => {

    // })
    console.log("before: ", userStatistic.value);
    userStatistic.value = response.data.project_statistic;
    console.log("after: ", userStatistic.value);
  } catch (error) {
    console.log("error : ", error.response.data);
  }
};

const getAccountList = async () => {
  try {
    const querySort = getActiveQueries();
    console.log("query sort : ", querySort);
    const response = await api.get("/account/manage/account/list", {
      params: {
        search: searchText.value,
        query_sort: querySort,
        limit: 8,
        page: page.value,
      },
    });

    if (response.status === 200) {
      console.log("response data : ", response.data);
      const accountLists = response.data.accounts.map((user) => ({
        userId: user.user_id,
        userName: user.user_full_name,
        userAvatar: user.user_avatar,
        userCreated: user.user_created,
        userTotalProject: user.user_project,
        userTotalContribution: user.user_contribution,
        userStatus: user.user_status,
      }));

      accountList.value = accountLists;
      lastPage.value = response.data.last_page;
      console.log("account : ", accountList.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const getReportedList = async (userId) => {
  try {
    activeReportedUserId.value = userId;

    const response = await api.get(`/user/${userId}/reportcase/list`);

    console.log("user : ", response.data.report_cases);

    const reportedList = response.data.report_cases.map((report) => ({
      reportCaseId: report.reported_case_id,
      reporterCaseId: report.reporter_case_id,
      reporterCaseName: report.reporter_case_name,
      reportedComment: report.reported_comment,
      reportedCase: report.reported_case,
      reportedSegment: report.reported_segment,
      reportedImage: report.reported_image,
      reportedDate: report.reported_date,
      reportedChecked: report.reported_check,
    }));

    if (response.status == 200) {
      userReportedCaseList.value = reportedList;
      isReportCaseModalOpen.value = true;
    }

    console.log("reported list : ", userReportedCaseList.value);
  } catch (error) {
    console.error("error Fetch report : ", error);
  }
};

const getUserProfile = async (userId) => {
  try {
    const response = await api.get(`/user/${userId}/profile`);

    console.log("user : ", response.data.user);
    const data = response.data.user;
    userProfile.value = {
      userId: data.user_id,
      fullName: data.full_name, // Ambil dari response.full_name
      address: data.address, // Ambil dari response.address
      birthDate: data.birth_date, // Ambil dari response.birth_date (atau format sesuai kebutuhan)
      phoneNumber: data.phone_number, // Ambil dari response.phone_number
      jenisKelamin: data.jenis_kelamin, // Ambil dari response.jenis_kelamin
      profilePicture: data.profile_picture,
      profileCover: data.profile_cover,
      nik: data.nik,
      ktpFile: data.scan_ktp, // Belum tersedia, default null
      email: data.email, // Ambil dari response.email
      organizationName: data.organization_name,
      jabatan: data.jabatan,
      socialMedia: JSON.parse(data.social_media), // Parsing string JSON menjadi objek
    };

    isAccountUserOpen.value = true;
    console.log("user : ", userProfile.value);
  } catch (error) {
    console.error("error Fetch User : ", error);
  }
};

const openNotificatication = (message, typeNotification = "success") => {
  toastNotification.open({
    type: typeNotification,
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

const deleteAccountId = async () => {
  try {
    const response = await api.delete(
      `/account/manage/account/${activeReportedUserId.value}`
    );
    console.log(response.data);
    if (response.status == 200) {
      closeConfirmationDeleteAccountModal();

      openNotificatication(
        `User ${activeReportedUserId.value} Berhasil Dihapus`
      );
      await getAccountList();
    }
  } catch (error) {
    console.error(error.response);
  }
};

const updateStatusProject = async (newStatus) => {
  console.log("ubah status");
  try {
    const response = await api.put(`/project/${project_id.value}status`, {
      status: newStatus,
    });

    if (response.status == 200) {
      console.log("response status", response.data);
      closeConfirmationApprovalModal();
      closeEvaluationModal();
      openNotificatication(
        `Status Project ${project_id.value} berhasil Diupdate`
      );

      await getProjectList();
    }
  } catch (error) {
    console.error(error.response);
  }

  isProjectModalOpen.value = false;
};

watch([coloumActive, searchText, page], getAccountList, { deep: true });

const fetchData = async () => {
  try {
    await Promise.all([getAccountList(), getAccountCardStatistic()]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  try {
    await fetchData();
  } catch (error) {
    console.error("erro in mounted");
  }
  emits("toggle-loading"); // Matikan loading setelah fetching selesai
});

onBeforeMount(() => {
  emits("toggle-active-loading"); // Aktifkan loading sebelum fetching dimulai
});
</script>

<template>
  <div class="relative py-4 bg-white">
    <!-- Card Statistic  -->
    <div class="grid grid-cols-12 gap-[25px] px-8 mb-10">
      <div class="col-span-12 text-xl">Statistik Akun</div>
      <div
        v-for="statistic in userStatistic"
        :key="statistic.statistic_id"
        class="col-span-15 2xl:col-span-3 sm:col-span-5 gap-x-6"
      >
        <div
          bordered="false"
          class="bg-gray-100 dark:bg-box-dark py-[15px] px-[20px] pb-[12px] overflow-hidden rounded-10 relative text-[12px] text-body dak:text-subtitle-dark"
        >
          <div class="flex justify-between">
            <div>
              <span
                class="font-normal text-body dark:text-subtitle-dark text-15"
                >{{ statistic.statistic_name }}</span
              >
              <h4
                class="mb-0 text-2xl max-lg:text-[20px] max-sm:text-xl font-semibold leading-normal text-dark dark:text-title-dark"
              >
                <div
                  class="flex items-center countCategories"
                  :data-number="statistic.statistic_number"
                >
                  <span class="countNumber">
                    {{ statistic.statistic_number }} Akun</span
                  >
                </div>
              </h4>
              <div>
                <span
                  class="inline-flex items-center w-full h-11 rounded-lg gap-[10px]"
                >
                  <span
                    :class="{
                      'flex font-medium gap-[2px] items-center text-sm': true,
                      'text-success': statistic.statistic_status === 'up',
                      'text-danger': statistic.statistic_status === 'down',
                    }"
                  >
                    <i
                      :class="{
                        'uil uil-arrow-up': statistic.statistic_status === 'up',
                        'uil uil-arrow-down':
                          statistic.statistic_status === 'down',
                        'text-[18px]': true,
                      }"
                    ></i>
                    {{ statistic.statistic_percentage }}%
                  </span>
                  <span class="text-sm text-light dark:text-subtitle-dark"
                    >Since last month</span
                  >
                </span>
              </div>
            </div>
            <div
              class="absolute bg-primary/10 flex h-full items-center justify-start max-md:w-[210px] max-ssm:w-[230px] overflow-hidden px-[30px] rounded-full left-[75%] text-primary top-0 w-[230px]"
            >
              <div class="flex items-center justify-center text-primary">
                <div class="flex items-center text-primary text-[36px]">
                  <i :class="statistic.statistic_icon"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center mx-4">
      <div class="text-xl ml-4">Tabel Akun</div>
      <!-- Search Bar -->
      <div class="flex justify-end items-center mb-4 px-4">
        <input
          v-model="searchText"
          type="text"
          placeholder="Cari akun..."
          class="border rounded-lg px-3 min-w-[300px] py-2 w-full"
        />
      </div>
    </div>

    <!-- Table  -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm font-light text-start whitespace-nowrap">
        <thead class="">
          <tr>
            <th
              @click="coloumClick('full_name')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Nama Pengguna
              <i
                v-if="isColoumActive('full_name')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>

            <th
              @click="coloumClick('date')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Tanggal Pembuatan
              <i
                v-if="isColoumActive('date')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>
            <th
              @click="coloumClick('project')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Total Project
              <i
                v-if="isColoumActive('project')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>
            <th
              @click="coloumClick('contribution')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Total Kontribusi
              <i
                v-if="isColoumActive('contribution')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>
            <th
              @click="coloumClick('status')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Status Akun
              <i
                v-if="isColoumActive('status')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>
            <th
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in accountList" :key="user.userId">
            <td class="px-6 py-3">
              <div class="pl-6">
                <div class="flex items-center space-x-2">
                  <img
                    class="w-8 h-8 rounded-full"
                    :src="user.userAvatar"
                    alt="Avatar"
                  />
                  <span> {{ user.userName }}</span>
                </div>
              </div>
            </td>

            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ user.userCreated }}
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ user.userTotalProject }} Project
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ user.userTotalContribution }} Kontribusi
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                <span
                  class="px-3 py-1 text-sm font-medium rounded-lg"
                  :class="{
                    'bg-purple-100 text-purple-700':
                      user.userStatus === 'active',
                    'bg-green-100 text-green-700':
                      user.userStatus === 'in progress',
                    'bg-red-100 text-red-700': user.userStatus === 'reported',
                    'bg-blue-100 text-blue-700': user.userStatus === 'verified',
                    'bg-gray-100 text-gray-700':
                      user.userStatus === 'suspended',
                  }"
                >
                  {{ user.userStatus.replace("_", " ") }}</span
                >
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center gap-x-2">
                <!-- View (Lihat Detail) -->
                <button
                  @click="getUserProfile(user.userId)"
                  class="py-1 px-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
                  title="Lihat Detail"
                >
                  <i class="uil uil-eye text-[16px]"></i>
                </button>

                <!-- Edit (Evaluasi) -->
                <button
                  @click="getReportedList(user.userId)"
                  class="py-1 px-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  title="Evaluasi"
                >
                  <i class="uil uil-edit-alt text-[16px]"></i>
                </button>

                <!-- Delete (Hapus) -->
                <button
                  @click="openConfirmationDeleteProjectModal(user.userId)"
                  class="px-2 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                  title="Hapus Project"
                >
                  <i class="uil uil-trash-alt text-[16px]"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <div class="flex flex-col items-center mt-4 px-6">
      <!-- Info Halaman (Tengah Bawah) -->
      <span class="text-center"
        >Halaman {{ currentPage }} dari {{ lastPage }}</span
      >

      <!-- Tombol Prev & Next (Pojok Kanan Bawah) -->
      <div class="flex justify-end w-full mt-2">
        <div class="flex gap-x-4">
          <button
            @click="
              () => {
                currentPage--;
                page--;
              }
            "
            :disabled="currentPage === 1"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Prev
          </button>
          <button
            @click="
              () => {
                currentPage++;
                page++;
              }
            "
            :disabled="currentPage === lastPage"
            class="px-4 py-2 bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- Modal -->
    <div
      v-if="isAccountUserOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-xl md:max-w-2xl p-6 bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Informasi User</h5>
          <button
            @click="closeAccountModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div
          class="md:pl-0 pl-4 pt-10 pb-12 pr-6 max-h-[300px] md:max-h-[350px] overflow-x-auto"
        >
          <div class="grid grid-cols-12 gap-y-6 sm:gap-x-6 content-center">
            <div class="col-span-12 xl:col-start-2 xl:col-span-11 space-y-4">
              <!-- Foto Profile di Tengah  -->
              <div
                class="sm:px-[25px] px-[15px] pb-[18px] flex justify-center items-center"
              >
                <figure
                  class="relative mb-0 max-w-[120px] h-[120px] inline-block bg-normalBG dark:bg-box-dark-up rounded-full"
                >
                  <img
                    id="widget-profile-upload-image"
                    class="max-w-[120px] min-w-[120px] h-[120px] rounded-full inline-block object-cover"
                    :src="userProfile.profilePicture"
                    alt="author"
                  />
                  <div class="absolute rounded-md bottom-0 end-[5px]">
                    <label
                      id="widget-profile-uploader"
                      for="widget-profile-dropzone-file"
                      class="flex flex-col items-center justify-center w-[40px] h-[40px] transition duration-150 ease-linear border-white border-solid border-4 rounded-full cursor-pointer xs:px-3 group bg-primary"
                    >
                      <div class="flex flex-col items-center justify-center">
                        <div class="text-[16px] text-white">
                          <i class="uil uil-camera"></i>
                        </div>
                      </div>
                      <input
                        id="widget-profile-dropzone-file"
                        type="file"
                        accept="image/*"
                        @change="(e) => handleImageUpload(e, 'profile')"
                        class="hidden"
                      />
                    </label>
                  </div>
                </figure>
              </div>
              <div class="grid grid-cols-2 space-y-2">
                <!-- Nama Lengkap -->
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <span class="w-full py-2">
                    {{ userProfile.fullName }}
                  </span>
                </div>
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Email
                  </label>
                  <span class="w-full py-2">
                    {{ userProfile.email }}
                  </span>
                </div>
                <!-- NIK -->
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Nomor Induk Kependudukan
                  </label>

                  <span class="w-full py-2">
                    {{ userProfile.nik }}
                  </span>
                </div>
                <!-- Alamat -->
                <div class="col-span-2 mt-2">
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Alamat
                  </label>
                  <span class="w-full py-2">
                    {{ userProfile.address }}
                  </span>
                </div>
                <!-- Tanggal Lahir  -->
                <div>
                  <label
                    for="start_date"
                    class="block text-gray-700 dark:text-gray-300 font-medium"
                    >Tanggal Lahir</label
                  >
                  <span class="w-full py-2">
                    {{ userProfile.birthDate }}
                  </span>
                </div>
                <!-- Jenis Kelamin -->
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                    >Jenis Kelamin</label
                  >
                  <span class="w-full py-2">
                    {{ userProfile.jenisKelamin }}
                  </span>
                </div>

                <!-- Pekerjaan  -->

                <!-- Organisasi  -->
                <div>
                  <label
                    for="organisasi"
                    class="block text-gray-700 dark:text-gray-300 font-medium"
                    >Organisasi
                    <span class="text-xs text-gray-600">(opsional)</span></label
                  >
                  <span class="w-full py-2">
                    {{ userProfile.organizationName }}
                  </span>
                </div>

                <!-- Jabatan  -->
                <div>
                  <label
                    for="jabatan"
                    class="block text-gray-700 dark:text-gray-300 font-medium"
                    >Jabatan
                    <span class="text-xs text-gray-600">(opsional)</span></label
                  >
                  <span class="w-full py-2">
                    {{ userProfile.jabatan }}
                  </span>
                </div>

                <!-- KTP -->
                <div class="mt-4 col-span-2">
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                    >Scan KTP</label
                  >
                  <div class="flex items-center justify-center mb-4">
                    <label
                      for="import-file"
                      class="flex flex-col items-center justify-center w-full sm:min-h-[150px] bg-white dark:bg-box-dark p-2 rounded-lg border-2 border-dashed border-[#c6d0dc] dark:border-box-dark-up hover:border-primary dark:hover:border-primary cursor-pointer transition-all duration-300 ease-linear"
                    >
                      <!-- Preview Image -->
                      <div v-if="userProfile?.ktpFile" class="w-full mt-2">
                        <img
                          :src="userProfile?.ktpFile"
                          class="w-full h-80 object-cover rounded-md"
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <!-- Nomor Telepon -->
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Nomor Telephone
                  </label>
                  <span class="w-full py-2">
                    {{ userProfile.phoneNumber }}
                  </span>
                </div>

                <!-- Sosial Media -->
                <div class="flex flex-col gap-1">
                  <!-- Label & Select -->
                  <div class="flex items-center">
                    <label class="text-gray-700 dark:text-gray-300 font-medium">
                      Sosial Media
                    </label>
                  </div>
                  <div class="relative flex justify-start gap-x-2">
                    <select
                      class="appearance-none text-sm bg-transparent text-black font-medium cursor-pointer focus:outline-none focus:ring-0 text-left w-[15%]"
                      v-model="selectedSosialMedia"
                    >
                      <option selected disabled value="">
                        Pilih Sosial Media
                      </option>
                      <option value="twitter">Twitter</option>
                      <option value="facebook">Facebook</option>
                      <option value="instagram">Instagram</option>
                      <option value="linkedin">LinkedIn</option>
                      <option value="github">Github</option>
                    </select>

                    <!-- Nilai Sosial Media -->
                    <span>|</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      {{ userProfile.socialMedia[selectedSosialMedia] || "-" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Approve -->
        <div class="border-t flex justify-end mt-2">
          <div class="flex justify-center items-center gap-x-1 mt-4 pr-6 pt-2">
            <button
              @click="openVerifyUserModal"
              class="px-4 py-2 ml-3 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Verify
            </button>
            <button
              @click="closeAccountModal"
              class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Report  -->
  <div>
    <!-- Modal -->
    <div
      v-if="isReportCaseModalOpen"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Evaluasi</h5>
          <button
            @click="closeReportCaseModal(activeReportedUserId)"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div class="relative py-[15px] overflow-x-auto max-h-[360px]">
          <table
            id="tableDragAndDrop"
            class="min-w-full text-sm font-light text-start whitespace-nowrap p-[15px]"
          >
            <!-- Tambahkan bagian thead -->
            <thead>
              <tr>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Pelapor
                </th>

                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Report
                </th>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Case
                </th>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Component
                </th>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Tanggal Pelaporan
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="report in userReportedCaseList"
                :key="report.reportCaseId"
                class="dark:hover:shadow"
              >
                <td>
                  <div
                    class="flex items-center justify-start ps-[25px] pe-[25px] py-[8px]"
                  >
                    <label
                      :for="`todolist-todo-${report.reportCaseId}`"
                      class="todo-title text-[14px] font-normal leading-[25px] text-theme-gray dark:text-subtitle-dark capitalize"
                    >
                      <input
                        :id="`todolist-todo-${report.reportCaseId}`"
                        type="checkbox"
                        :true-value="1"
                        :false-value="0"
                        v-model="report.reportedChecked"
                        class="relative ltr:float-left rtl:float-right me-[10px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-1 border-solid border-normal outline-none before:pointer-events-none before:absolute before:h-[10px] before:w-[0.5px] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] checked:border-success checked:bg-success checked:before:opacity-[0.16] checked:after:absolute checked:after:mt-0 checked:after:ms-[5px] checked:after:block checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] dark:border-white/10 dark:checked:border-success dark:checked:bg-success after:top-[2px] [&:checked~.label]:line-through [&:checked~.label]:text-primary"
                      />
                      <span
                        :class="{
                          'line-through': report.reportedChecked,
                        }"
                        >{{ report.reporterCaseName }}</span
                      >
                    </label>
                  </div>
                </td>
                <td>
                  <div
                    @click="
                      openReportDetail(
                        activeReportedUserId,
                        report.reportCaseId
                      )
                    "
                    class="flex items-center justify-start ps-[25px] pe-[25px] py-[8px]"
                  >
                    <label
                      class="todo-title text-[14px] font-normal leading-[25px] text-theme-gray dark:text-subtitle-dark capitalize"
                    >
                      <span
                        class="cursor-pointer hover:underline hover:text-blue-400"
                        :class="{
                          'line-through': report.reportedChecked,
                        }"
                        >{{ report.reportedComment }}</span
                      >
                    </label>
                  </div>
                </td>

                <td>
                  <div
                    class="flex items-center justify-center ps-[25px] pe-[25px] py-[8px]"
                  >
                    <span
                      class="px-3 py-1 text-sm font-medium rounded-lg"
                      :class="{
                        'bg-green-100 text-green-700':
                          report.reportedCase === 'approved',
                        'bg-red-100 text-red-700':
                          report.reportedCase === 'rejected',
                        'bg-blue-100 text-blue-700':
                          report.reportedCase === 'in review',

                        'line-through': report.reportedChecked,
                      }"
                    >
                      {{ report.reportedCase }}
                    </span>
                  </div>
                </td>

                <td>
                  <div
                    class="flex items-center justify-center ps-[25px] pe-[25px] py-[8px]"
                  >
                    <span
                      class="px-3 py-1 text-sm font-medium rounded-lg"
                      :class="{
                        'line-through': report.reportedChecked,

                        'bg-blue-100 text-blue-700':
                          report.reportedSegment === 'image',
                        'bg-green-100 text-green-700':
                          report.reportedSegment === 'title',
                        'bg-yellow-100 text-yellow-700':
                          report.reportedSegment === 'description',
                        'bg-purple-100 text-purple-700':
                          report.reportedSegment === 'point',
                        'bg-red-100 text-red-700':
                          report.reportedSegment === 'address',
                        'bg-indigo-100 text-indigo-700':
                          report.reportedSegment === 'tag',
                        'bg-gray-100 text-gray-700':
                          report.reportedSegment === 'file attachment',
                        'bg-red-50 text-red-500':
                          report.reportedSegment === 'timelines',
                        'bg-orange-100 text-orange-700':
                          report.reportComponent === 'date',
                        'bg-teal-100 text-teal-700':
                          report.reportComponent === 'amount',
                        'bg-cyan-100 text-cyan-700':
                          report.reportComponent === 'article',
                        'bg-emerald-100 text-emerald-700':
                          report.reportComponent === 'campaign',
                        'bg-amber-100 text-amber-700':
                          report.reportComponent === 'strategy',
                        'bg-lime-100 text-lime-700':
                          report.reportComponent === 'feedback',
                        'bg-gray-100 text-gray-700': ![
                          'image',
                          'title',
                          'description',
                          'point',
                          'address',
                          'tag',
                          'file attachment',
                          'timelines',
                          'date',
                          'amount',
                          'article',
                          'campaign',
                          'strategy',
                          'feedback',
                        ].includes(report.reportedSegment), // Default color jika tidak ada di daftar
                      }"
                    >
                      {{ report.reportedSegment }}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    class="flex items-center justify-center ps-[25px] pe-[25px] py-[8px]"
                  >
                    <label
                      class="todo-title text-[14px] font-normal leading-[25px] text-theme-gray dark:text-subtitle-dark capitalize"
                    >
                      <span
                        :class="{
                          'line-through': report.reportedChecked,
                        }"
                        >{{ report.reportedDate }}</span
                      >
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Approve -->
        <div class="border-t flex justify-end mt-2">
          <div class="mt-4 pr-6 pt-2">
            <button
              @click="() => (isSuspendModalOpen = true)"
              class="px-4 py-2 -[16px] text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Suspend
            </button>
            <button
              @click="closeReportCaseModal(activeReportedUserId)"
              class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Report Detail  -->
  <div>
    <!-- Modal -->
    <div
      v-if="isReportDetailOpen"
      class="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-xl md:max-w-2xl p-6 bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Informasi Report</h5>
          <button
            @click="() => (isReportDetailOpen = false)"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div
          class="md:pl-0 pl-4 pt-10 pb-12 pr-6 max-h-[300px] md:max-h-[350px] overflow-x-auto"
        >
          <div class="grid grid-cols-12 gap-y-6 sm:gap-x-6 content-center">
            <div class="col-span-12 xl:col-start-2 xl:col-span-11 space-y-4">
              <div class="grid grid-cols-2 space-y-2">
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Nama Pelapor
                  </label>
                  <span class="w-full py-2">
                    {{ reportDetail.reporterCaseName }}
                  </span>
                </div>
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Kasus
                  </label>
                  <span class="w-full py-2">
                    {{ reportDetail.reportedCase }}
                  </span>
                </div>
                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Tanggal
                  </label>
                  <span class="w-full py-2">
                    {{ reportDetail.reportedDate }}
                  </span>
                </div>

                <div>
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Segment
                  </label>
                  <span class="w-full py-2">
                    {{ reportDetail.reportedSegment }}
                  </span>
                </div>

                <div v-if="reportDetail.reportedSegment === 'project'">
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Project
                  </label>
                  <router-link
                    :to="`/dashboard/project/${reportDetail.reportedProjectId}`"
                    class="cursor-pointer"
                  >
                    <span class="w-full py-2">
                      {{ reportDetail.reportedProjectTitle }}
                    </span>
                  </router-link>
                </div>

                <!-- KTP -->
                <div class="mt-4 col-span-2">
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1 mt-2"
                    >Bukti Laporan</label
                  >
                  <div class="flex items-center justify-center mb-4">
                    <label
                      for="import-file"
                      class="flex flex-col items-center justify-center w-full sm:min-h-[150px] bg-white dark:bg-box-dark p-2 rounded-lg border-2 border-dashed border-[#c6d0dc] dark:border-box-dark-up hover:border-primary dark:hover:border-primary cursor-pointer transition-all duration-300 ease-linear"
                    >
                      <!-- Preview Image -->
                      <div
                        v-if="reportDetail?.reportedImage"
                        class="w-full mt-2"
                      >
                        <img
                          :src="reportDetail?.reportedImage"
                          class="w-full h-80 object-cover rounded-md"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <div class="col-span-2">
                  <label
                    class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                  >
                    Clarify
                  </label>
                  <span class="w-full py-2">
                    {{ reportDetail.reportedComment }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Approve -->
        <div class="border-t flex justify-end mt-2">
          <div class="mt-4 pr-6 pt-2">
            <button
              @click="() => (isReportDetailOpen = false)"
              class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Verify  -->
  <SoftWarningComponent
    :is-confirmation-modal-open="isVerifyUserModalOpen"
    :description="'    Apakah Anda yakin ingin mem-verifikasi user ini? Pastikan Seluruh data sudah sesuai ketentuan.'"
    @close-confirmation-modal="closeVerifyUserModal"
    @action-modal="verifyUser"
    :action="'Verify User'"
    :title="'Konfirmasi Verifikasi User'"
  />

  <!-- Suspend  -->
  <SuspendModalComponent
    :is-modal-open="isSuspendModalOpen"
    @close-report-modal="closeSuspendModal"
    @submit-report="suspendUser"
  />

  <SoftWarningComponent
    :is-confirmation-modal-open="isSuspendConfirmationModalOpen"
    :description="'    Apakah Anda yakin ingin Men-suspend user ini? Pastikan Seluruh data sudah sesuai ketentuan.'"
    @close-confirmation-modal="() => (isSuspendConfirmationModalOpen = false)"
    @action-modal="handleSubmitSuspend"
    :action="'Suspend User'"
    :title="'Konfirmasi Suspend User'"
  />

  <!-- Approve Project  -->

  <!-- Konfirmasi Delete Modal  -->
  <HardWarningComponent
    :is-confirmation-modal-open="isDeleteAccountModalOpen"
    :description="'    Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan.'"
    @close-confirmation-modal="closeConfirmationDeleteAccountModal"
    @action-modal="deleteAccountId"
    :action="'Hapus'"
    :title="'Konfirmasi Hapus'"
  />
</template>

<style scoped>
/* Dropdown Animations */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  overflow: hidden;
}

.dropdown-enter-from,
.dropdown-leave-to {
  max-height: 0;
  opacity: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
text
