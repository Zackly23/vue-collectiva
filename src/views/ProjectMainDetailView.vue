<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toast-notification";
import api from "@/api";
import ReportCaseModalComponent from "@/components/ReportCaseModalComponent.vue";
import SoftWarningComponent from "@/components/dashboard/modal/SoftWarningComponent.vue";

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const messageText = ref("");
const isMessagePopUpOpen = ref(false);
const isSocialMediaPopupOpen = ref(false);
const toastNotification = useToast();
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const route = useRoute();
const router = useRouter();
const projectId = route.params.projectId ? route.params.projectId : null;
console.log("projectId : ", projectId);

const isReportCaseModalOpen = ref(false);
const isReportConfirmationModalOpen = ref(false);
const reportData = ref();

const initialMap = ref(null);
const isDetailDropdown = ref(false);
const isCriteriaModalOpen = ref(false);
const commentText = ref("");
const isRoleModalOpen = ref(false);
const isTimelineModalOpen = ref(false);
const timelineList = ref();
const projectDetail = ref();
const lampiranList = ref();
const projectList = ref();
const commentList = ref();

const sosmedList = ref([
  { name: "instagram", label: "instagram", color: "text-white bg-[#E4405F]" }, // Instagram (pink kemerahan)
  { name: "facebook", label: "facebook-f", color: "text-white bg-[#1877F2]" }, // Facebook (biru)
  { name: "twitter", label: "twitter", color: "text-white bg-[#1DA1F2]" }, // Twitter/X (biru muda)
  { name: "linkedin", label: "linkedin", color: "text-white bg-[#0A66C2]" }, // LinkedIn (biru tua)
]);

const openReportModal = () => {
  isReportCaseModalOpen.value = true;
  isDetailDropdown.value = false;
  isSocialMediaPopupOpen.value = false;
  isMessagePopUpOpen.value = false;
};
const closeReportModal = () => {
  isReportCaseModalOpen.value = false;
};

const closeConfirmationReportModal = () => {
  isReportConfirmationModalOpen.value = false;
};

const toggleMessagePopUp = () => {
  isMessagePopUpOpen.value = !isMessagePopUpOpen.value;
  isSocialMediaPopupOpen.value = false;
  isReportCaseModalOpen.value = false;
};

const toggleSocialMediaPopUp = () => {
  isSocialMediaPopupOpen.value = !isSocialMediaPopupOpen.value;
  isMessagePopUpOpen.value = false;
  isReportCaseModalOpen.value = false;
};

const toggleDetailDropdown = () => {
  isDetailDropdown.value = !isDetailDropdown.value;

  if (!isDetailDropdown.value) {
    isSocialMediaPopupOpen.value = false;
    isMessagePopUpOpen.value = false;
  }
};

const openNotificatication = (message) => {
  toastNotification.open({
    type: "success",
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

const shareSocialMedia = async (platform) => {
  try {
    const response = await api.get(
      `/project/${projectId}/spreader/${user.user_id}/share/${platform}`
    );
    console.log("social media : ", response.data);
    if (response.status == 200) {
      console.log("Share to ", platform);
      openNotificatication("Berhasil membagikan proyek ke " + platform);
      isSocialMediaPopupOpen.value = false;
      // Open url from response (share_url)
      window.open(response.data.share_url, "_blank");
    }
  } catch (error) {
    console.error("error membagikan project ", error);
  }
};

const sendMessage = async () => {
  console.log("Send data to private chat");

  try {
    console.log(
      "userid : ",
      user.user_id,
      "dan sender : ",
      projectDetail.value.projectCreatorId
    );
    const response = await api.post(
      `/user/${user.user_id}/chat/private/${projectDetail.value.projectCreatorId}`, // Pastikan userID valid
      {
        sender_id: user.user_id, // ID pengirim
        private_chat_text: messageText.value, // Konsisten dengan key di server
      },
      {
        headers: {
          "Content-Type": "multipart/form-data", // Perbaikan pada huruf kecil
        },
      }
    );

    if (response.status == 200) {
      console.log(response.data); // Log respons dari server
      toggleMessagePopUp();
      messageText.value = "";
    }
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
  }
};

const reportUser = async (data) => {
  reportData.value = data;

  console.log("data : ", data);
  console.log("formDsata : ", reportData.value);

  isReportConfirmationModalOpen.value = true;
};

// Submit report
const handleSubmitReport = async () => {
  try {
    console.log("formsata : ", reportData.value);
    const formData = new FormData();

    formData.append("reported_case", reportData.value.selectedCase);
    formData.append("reported_comment", reportData.value.clarityReport);
    formData.append("reported_segment", "project");
    if (reportData.value.reportAttachment) {
      formData.append("reported_image", reportData.value.reportAttachment);
    }
    formData.append("project_id", projectId);
    const response = await api.post(
      `/user/${projectDetail.value.projectCreatorId}/report`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("user telah direport");
    console.log("response report : ", response.data);
    if (response.status == 201) {
      openNotificatication("Laporan Report Telah Berhasil Dikirim");
      isReportConfirmationModalOpen.value = false;
      isReportCaseModalOpen.value = false;
    }
  } catch (error) {
    console.error("error report : ", error);
  }
};

//Open Modal
const openGeneralModal = (value) => {
  console.log(value);
  switch (value) {
    case "timeline":
      isTimelineModalOpen.value = true;
      break;
    case "kriteria":
      isCriteriaModalOpen.value = true;
      break;
    case "role":
      isRoleModalOpen.value = true;
      break;
    default:
      isTimelineModalOpen.value = false;
      isLocationModalOpen.value = false;
  }
};

const closeTimelineModal = () => {
  isTimelineModalOpen.value = false;
};

const closeCriteriaModal = () => {
  isCriteriaModalOpen.value = false;
};

const closeRoleModal = () => {
  isRoleModalOpen.value = false;
};

const previewFile = (lampiran) => {
  window.open(lampiran.lampiranUrl, "_blank");
};

const initialMapLayer = () => {
  if (initialMap.value) {
    // Jika map sudah ada, hapus peta lama
    initialMap.value.remove();
  }

  initialMap.value = L.map("map").setView(
    [
      projectDetail.value.projectPointLatitude,
      projectDetail.value.projectPointlongitude,
    ],
    16
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(initialMap.value);

  L.marker([
    projectDetail.value.projectPointLatitude,
    projectDetail.value.projectPointlongitude,
  ])
    .addTo(initialMap.value)
    .bindPopup("Lokasi Utama Proyek.")
    .openPopup();
};

const gotoProjectId = (idProject) => {
  window.location.href = `/project/${idProject}`;
};

//API
const getProjectDetail = async () => {
  try {
    const responses = await api.get(`/project/${projectId}/public/detail`);

    console.log("project: ", responses.data);
    console.log(JSON.parse(responses.data.project_details[0].project_criteria));
    const projectdetailList = responses.data.project_details.map((project) => ({
      projectId: project.project_id,
      projectTitle: project.project_title,
      projectDescription: project.project_description,
      projectStartDate: project.project_start_date,
      projectEndDate: project.project_end_date,
      projectStartDateFull: project.project_start_date_full,
      projectEndDateFull: project.project_end_date_full,
      projectTargetAmount: project.project_target_amount,
      projectProgressAmount: project.project_progress_amount,
      projectProgressPercentage: project.project_progress_percentage,
      projectDonaturAmount: project.project_donatur_amount,
      projectAddress: project.project_address,
      projectDiffDay: project.project_diff_day,
      projectImage: project.project_image,
      projectStatus: project.project_status,
      projectTags: project.project_tags.map((tag) => ({
        tagId: tag.tag_id,
        tagName: tag.tag_name,
      })),
      projectCriteria: project.project_criteria
        ? JSON.parse(project.project_criteria).map((criteria) => ({
            key: criteria.key,
            value: criteria.value,
            role: criteria.role,
          }))
        : [{ key: "", value: "" }],
      projectRole: project.project_role
        ? JSON.parse(project.project_role).map((role) => ({
            key: role.key,
            value: role.value,
          }))
        : [{ key: "", value: "" }],
      projectCreatorId: project.project_creator_id,
      projectCreatorName: project.project_creator_name,
      projectCreatorAvatar: project.user_avatar,
      projectKodeDesa: project.project_kode_desa,
      projectPointLatitude: project.project_latitude,
      projectPointlongitude: project.project_longitude,
      projectCategory: project.project_category,
      userOrganizationName: project.user_organization_name,
      userBadge: project.user_badge,
      userBadgeColor: project.user_badge_color,
      userParticipation: project.user_participation,
      userJabatan: project.user_jabatan,
    }));

    projectDetail.value = projectdetailList[0];

    // selectedTags.value = projectdetailList[0].projectTags.map((tag) => tag.tagName);
    console.log("project detail : ", projectDetail.value);

    initialMapLayer();
  } catch (error) {
    console.error("error Fetch Project : ", error);
  }
};

const getPublicProjectList = async () => {
  try {
    const response = await api.get("/project/public/list", {
      params: {
        status: "in_progress",
        category: "",
        sort: "asc",
        search: "",
        kode_provinsi: "",
        limit: 3,
        shuffle: true,
        random: Math.random(), // ✅ Tambahkan parameter random agar cache dihindari
      },
    });

    console.log("project  : ", response.data);

    if (response.status === 200) {
      const projectsListData = response.data.projects.map((item) => ({
        projectId: item.project_id,
        projectTitle: item.project_title,
        projectDescription: item.project_description,
        projectImage: item.project_image,
        projectCategory: item.projectCategory,
      }));

      projectList.value = projectsListData;

      console.log("Project List : ", projectList.value);
    }
  } catch (error) {
    console.log("error public : ", error);
  }
};

//Get Comment
const getComments = async () => {
  try {
    const responses = await api.get(`/project/${projectId}/comment`);
    console.log("comments : ", responses.data.comments);
    const commentLists = responses.data.comments.map((comment) => ({
      commentId: comment.project_comment_id,
      userName: comment.user_name,
      userAvatar: comment.user_avatar,
      userBadge: comment.user_badge,
      userBadgeColor: comment.user_badge_color,
      comment: comment.comment,
      sendDate: comment.send_date,
      sendTime: comment.send_time,
    }));

    commentList.value = commentLists;
    console.log("comment list : ", commentList.value);
  } catch (error) {
    console.error(error);
  }
};

//Store

// ✅ Fungsi untuk mengirim komentar (Guest bisa)
const storeComment = async () => {
  try {
    console.log("comment : ", commentText.value);
    // 🔹 Cek apakah user login (cek token di localStorage)
    const token = localStorage.getItem("access_token");

    // 🔹 Kirim request
    const response = await api.post(`/project/${projectId}/comment`, {
      comment: commentText.value,
    });

    if (response.status === 201) {
      console.log("Komentar berhasil dikirim:", response.data);
      getComments();
      commentText.value = "";
    }
  } catch (error) {
    console.error("Gagal mengirim komentar:", error.response?.data || error);
  }
};

// get Evaluation
const getTimeline = async () => {
  try {
    const responses = await api.get(`/project/${projectId}/timeline`);
    console.log("timeline : ", responses.data.project_timeline);
    const timelineLists = responses.data.project_timeline.map((timeline) => ({
      timelineId: timeline.project_timeline_id,
      timelineDate: {
        timelineDateDay: timeline.project_timeline_date[0],
        timelineDateMonth: timeline.project_timeline_date[1],
      },
      details: timeline.project_timeline_details.map((detail) => ({
        timelineDetailId: detail.project_timeline_detail_id,
        timelineDateFull: detail.project_timeline_date_full,
        timelinenDetailAction: detail.description,
        timelineDetailTime: detail.time,
        timelineDetailIconId: detail.icon_id,
        timelineDetailIcon: detail.icon,
        timelineDetailIconName: detail.icon_name,
        timelineDetailIconBackground: detail.icon_background,
      })),
    }));

    timelineList.value = timelineLists;
    console.log("timelinesList : ", timelineList.value);
  } catch (error) {
    console.error(error);
  }
};

const getLampiran = async () => {
  try {
    const responses = await api.get(`/project/${projectId}/lampiran/list`);
    console.log("lampiran : ", responses.data);
    const lampiranLists = responses.data.project_lampiran.map((lampiran) => ({
      lampiranId: lampiran.project_lampiran_id,
      lampiranName: lampiran.project_lampiran_name,
      lampiranUrl: lampiran.project_lampiran_url,
      lampiranSection: lampiran.project_lampiran_section,
    }));

    lampiranList.value = lampiranLists.filter(
      (item) => item.lampiranSection == "lampiran"
    );

    console.log("lampiran : ", lampiranList.value);
  } catch (error) {
    console.error(error.response.data);
  }
};

const fetchData = async () => {
  try {
    await Promise.all([
      getProjectDetail(),
      getLampiran(),
      getTimeline(),
      getComments(),
      getPublicProjectList(),
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
  <div class="max-w-6xl mx-auto px-4 py-8">
    <div class="grid grid-cols-12 gap-6">
      <!-- Bagian Konten Utama -->
      <div class="col-start-1 col-span-12 md:col-span-9">
        <!-- Carousel Proyek -->
        <div class="bg-white border rounded-lg shadow-md mb-6">
          <div class="relative h-96 overflow-hidden">
            <div class="flex transition-transform duration-500" id="carousel">
              <div class="w-full flex-shrink-0 object-cover">
                <img
                  :src="projectDetail?.projectImage"
                  alt="Project Image 1"
                  class="w-full h-96 object-cover"
                />
              </div>
              <!-- <div class="w-full flex-shrink-0">
                <img
                  src="C:/Users/hp/Downloads/jkt48.jpg"
                  alt="Project Image 2"
                  class="w-full h-96 object-cover"
                />
              </div>
              <div class="w-full flex-shrink-0">
                <img
                  src="C:/Users/hp/Downloads/eren.jpg"
                  alt="Project Image 3"
                  class="w-full h-96 object-cover"
                />
              </div> -->
            </div>

            <!-- Tombol Navigasi Carousel -->
            <!-- <div class="absolute bottom-4 right-4 flex space-x-2">
              <button
                id="prevSlide"
                class="bg-gray-200/50 p-3 rounded-full hover:bg-gray-300/70 transition duration-300 shadow-sm hover:shadow-md"
              >
                <i class="fas fa-chevron-left text-gray-600"></i>
              </button>
              <button
                id="nextSlide"
                class="bg-gray-200/50 p-3 rounded-full hover:bg-gray-300/70 transition duration-300 shadow-sm hover:shadow-md"
              >
                <i class="fas fa-chevron-right text-gray-600"></i>
              </button>
            </div> -->
          </div>

          <!-- Konten Proyek -->
          <div class="p-6 pb-3">
            <h2 class="text-xl md:text-3xl font-bold text-gray-800 mb-4">
              {{ projectDetail?.projectTitle }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ projectDetail?.projectDescription }}
            </p>
          </div>

          <!-- Detail Tambahan -->
          <!-- Linimasa -->
          <section class="p-6 pt-1 pb-2">
            <h4 class="text-sm text-gray-500 mb-2">Linimasa Proyek</h4>
            <p class="text-gray-700">
              {{ projectDetail?.projectStartDate }} -
              {{ projectDetail?.projectEndDate }}
            </p>
          </section>

          <!-- Kategori -->
          <section class="p-6 pt-1">
            <h4 class="text-sm text-gray-500 mb-2">Kategori</h4>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="projectTag in projectDetail?.projectTags"
                class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ projectTag.tagName }}</span
              >
            </div>
          </section>

          <!-- Alamat -->
        </div>

        <!-- Informasi dan Lokasi Proyek -->
        <div class="grid grid-cols-2 gap-6 mb-6">
          <div
            class="col-start-1 col-span-2 md:col-start-1 md:col-span-1 bg-white border rounded-lg shadow-md p-6"
          >
            <h3 class="text-xl font-bold text-gray-800 mb-4">
              Informasi Tambahan
            </h3>

            <!-- 📂 Lampiran File -->
            <div class="mb-6">
              <h4 class="text-sm text-gray-500 mb-2">Lampiran File</h4>
              <div v-if="lampiranList?.length" class="space-y-3">
                <div
                  v-for="(file, index) in lampiranList"
                  :key="file.lampiranId"
                  class="flex items-center justify-between bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition"
                >
                  <div class="flex items-center gap-3">
                    <i class="ui uil-file text-md"></i>
                    <span class="text-gray-700 text-sm font-medium">{{
                      file.lampiranName
                    }}</span>
                  </div>
                  <button
                    class="ml-4 flex justify-center items-center"
                    @click="previewFile(file)"
                  >
                    <i class="ui uil-eye text-md text-center"></i>
                  </button>
                </div>
              </div>
              <p v-else class="text-sm text-gray-500">
                Belum ada lampiran tersedia.
              </p>
            </div>

            <!-- Timeline Proyek -->
            <div class="mb-6">
              <h4 class="text-sm text-gray-500 mb-2">Timeline Proyek</h4>
              <button
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex justify-center items-center space-x-1"
                @click="openGeneralModal('timeline')"
              >
                <i class="ui uil-calendar-alt m-0 hidden xl:block"></i>
                <i
                  class="ui uil-calendar-alt m-0 hidden md:block xl:hidden"
                ></i>
                <i class="ui uil-calendar-alt m-0 block md:hidden"></i>

                <span class="m-0 hidden xl:block">Lihat Timeline</span>
                <span class="m-0 hidden md:block xl:hidden">Timeline</span>
                <span class="m-0 block md:hidden">Timeline</span>
              </button>
              <p class="text-xs text-gray-500 mt-1">
                Jadwal proyek dari awal hingga akhir.
              </p>
            </div>

            <!-- Kriteria dan Role -->
            <div v-if="projectDetail?.projectCategory === 'volunteer'">
              <h4 class="text-sm text-gray-500 mb-2">Kriteria dan Role</h4>
              <div class="flex gap-2">
                <button
                  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex justify-center items-center space-x-1"
                  @click="openGeneralModal('kriteria')"
                >
                  <i class="ui uil-clipboard-alt m-0 hidden xl:block"></i>
                  <i
                    class="ui uil-clipboard-alt m-0 hidden md:block xl:hidden"
                  ></i>
                  <i class="ui uil-clipboard-alt m-0 block md:hidden"></i>

                  <span class="m-0 hidden xl:block">Lihat Kriteria</span>
                  <span class="m-0 hidden md:block xl:hidden">Kriteria</span>
                  <span class="m-0 block md:hidden">Kriteria</span>
                </button>
                <button
                  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex justify-center items-center space-x-1"
                  @click="openGeneralModal('role')"
                >
                  <i class="ui uil-users-alt m-0 hidden xl:block"></i>
                  <i class="ui uil-users-alt m-0 hidden md:block xl:hidden"></i>
                  <i class="ui uil-users-alt m-0 block md:hidden"></i>

                  <span class="m-0 hidden xl:block">Lihat Role</span>
                  <span class="m-0 hidden md:block xl:hidden">Role</span>
                  <span class="m-0 block md:hidden">Role</span>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Persyaratan dan peran dalam proyek.
              </p>
            </div>
          </div>

          <!-- Lokasi  -->
          <div
            class="col-start-1 col-span-2 md:col-start-2 md:col-span-1 bg-white border rounded-lg shadow-md p-6 h-[400px] md:h-full min-h-[350px]"
          >
            <h3 class="text-xl font-bold text-gray-800 mb-4">Lokasi Proyek</h3>
            <div
              id="map"
              class="h-[70%] bg-gray-100 rounded-lg shadow-inner relative z-0"
            ></div>

            <section class="mt-4">
              <p class="text-gray-700">
                Kantor Proyek Utama: {{ projectDetail?.projectAddress }}
              </p>
            </section>
          </div>
        </div>
        <div class="bg-white border rounded-lg p-4 pl-6 mb-6">
          <div class="flex justify-between items-center space-x-4">
            <div>
              <div class="flex justify-center items-center space-x-2">
                <img
                  :src="projectDetail?.projectCreatorAvatar"
                  alt="Profil"
                  class="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 class="font-semibold">
                    {{ projectDetail?.projectCreatorName }}
                  </h3>
                  <span
                    class="inline-block text-xs px-2 py-1 rounded"
                    :class="projectDetail?.userBadgeColor"
                    >{{ projectDetail?.userBadge }}</span
                  >
                  <p
                    v-if="projectDetail?.userOrganizationName"
                    class="text-sm text-gray-600 mt-1"
                  >
                    {{ projectDetail?.userJabatan }} -
                    {{ projectDetail?.userOrganizationName }}
                  </p>
                </div>
              </div>
            </div>
            <div class="relative" data-te-dropdown-ref>
              <button
                data-dropdown-button="header"
                @click="toggleDetailDropdown"
                class="text-[18px] absolute bottom-[10px] right-0 text-light dark:text-subtitle-dark"
                type="button"
                id="inboxEllipsis"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
              >
                <i class="uil uil-ellipsis-v"></i>
              </button>
              <ul
                :class="{ hidden: !isDetailDropdown }"
                class="absolute z-[1000] ltr:float-left rtl:float-right m-0 right-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                aria-labelledby="inboxEllipsis"
                data-te-dropdown-menu-ref
              >
                <li>
                  <button
                    @click="toggleSocialMediaPopUp"
                    class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up gap-[6px]"
                    data-te-dropdown-item-ref
                  >
                    <i class="uil uil-users-alt"></i> Share
                  </button>
                </li>

                <li v-access="{ permission: ['report-user-chat'] }">
                  <button
                    @click="openReportModal"
                    class="block text-left w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    <i class="uil uil-ban"></i> Report
                  </button>
                </li>
                <li
                  v-access="{
                    role: ['admin', 'active', 'verified', 'reported'],
                  }"
                  class="relative"
                >
                  <button
                    @click="toggleMessagePopUp"
                    class="block text-left w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                    href="#"
                    data-te-dropdown-item-ref
                  >
                    <i class="uil uil-chat"></i> Chat
                  </button>
                </li>
              </ul>
              <!-- Share Social Media  -->
              <div
                v-if="isSocialMediaPopupOpen"
                class="absolute top-0 right-24 w-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center p-2 gap-2 z-[999]"
              >
                <!-- Input Chat -->
                <div class="w-full flex justify-between items-center gap-x-6">
                  <button
                    @click="shareSocialMedia(sosmed.name)"
                    v-for="sosmed in sosmedList"
                    :key="sosmed.name"
                    :title="sosmed.name"
                  >
                    <i
                      :class="[
                        'ui',
                        `uil-${sosmed.label}`,
                        'text-[24px]',
                        ` ${sosmed.color}`,
                        'px-1 rounded-lg',
                      ]"
                    ></i>
                  </button>
                </div>
              </div>

              <div
                v-if="isMessagePopUpOpen"
                class="absolute top-[63px] right-24 min-w-[320px] w-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg flex items-center p-2 gap-2 z-[999]"
              >
                <!-- Input Chat -->
                <input
                  v-model="messageText"
                  type="text"
                  placeholder="Type a message..."
                  class="flex-1 h-[30px] px-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-dark dark:text-white outline-none focus:ring-2 focus:ring-blue-400"
                />

                <!-- Tombol Kirim -->
                <button
                  @click="sendMessage"
                  type="button"
                  class="bg-blue-500 hover:bg-blue-600 transition-all duration-200 h-[30px] w-[30px] rounded-full flex items-center justify-center shadow-md"
                >
                  <i class="uil uil-message text-[20px] text-white"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Dukungan Komunitas -->
        <div
          class="hidden md:block bg-white border rounded-lg shadow-md p-6 mb-6 col-start-1 col-span-12 md:col-span-9"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Dukungan Komunitas
          </h2>
          <div class="space-y-6">
            <div
              v-for="comment in commentList"
              :key="comment.commentId"
              class="flex items-start space-x-3"
            >
              <img
                :src="comment.userAvatar"
                alt="Pengguna"
                class="w-8 h-8 rounded-full"
              />
              <div class="flex-1">
                <!-- Nama dan Waktu -->
                <div class="flex items-center justify-between">
                  <div>
                    <span class="font-semibold text-gray-800">{{
                      comment.userName
                    }}</span>
                    <span
                      class="inline-block text-xs ml-2 px-2 py-1 rounded mt-1"
                      :class="comment.userBadgeColor"
                      >{{ comment.userBadge }}</span
                    >
                  </div>
                  <span
                    class="text-gray-500 text-sm ml-auto whitespace-nowrap"
                    >{{ comment.sendDate }}</span
                  >
                </div>
                <!-- Komentar -->
                <p class="text-gray-600 mt-3">
                  {{ comment.comment }}
                </p>
              </div>
            </div>
          </div>
          <div
            v-access="{
              role: ['admin', 'active', 'verified', 'reported'],
              permission: ['send-donation'],
            }"
            class="mt-8"
          >
            <div class="flex items-start space-x-4">
              <img
                :src="user.profile_picture"
                alt="User Avatar"
                class="w-8 h-8 rounded-full mt-2"
              />
              <div class="flex-1">
                <textarea
                  class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all resize-none"
                  rows="4"
                  v-model="commentText"
                  placeholder="Write your comment..."
                ></textarea>
                <button
                  type="submit"
                  @click="storeComment"
                  class="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full"
                >
                  Tambahkan Komentar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--Donasi-->

      <div class="col-start-1 col-span-12 md:col-span-3 sticky top">
        <div class="bg-white border rounded-lg p-6 pb-4 top-4 shadow-md">
          <h2 class="font-bold text-xl text-gray-800 mb-4">Dukung Kami</h2>
          <div class="space-y-4">
            <!-- Progress Bar -->
            <div class="bg-gray-200 rounded-full h-4">
              <div
                class="bg-green-600 h-4 rounded-full"
                :style="{
                  width: `${projectDetail?.projectProgressPercentage}%`,
                }"
              ></div>
            </div>

            <!-- Donasi Info -->
            <div class="grid grid-cols-1 gap-2 text-center">
              <div class="bg-gray-100 p-1 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">
                  {{
                    projectDetail?.projectCategory === "donation"
                      ? "Terkumpul"
                      : "Partisipan"
                  }}
                </p>
                <p class="text-lg md:text-[16px] font-bold text-green-600">
                  {{
                    projectDetail?.projectCategory === "donation" ? "Rp " : ""
                  }}
                  {{ projectDetail?.projectProgressAmount }}
                  {{
                    projectDetail?.projectCategory === "volunteer"
                      ? "Orang "
                      : ""
                  }}
                </p>
              </div>
              <div class="bg-gray-100 p-1 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">Target</p>
                <p class="text-lg md:text-[16px] font-bold text-gray-700">
                  {{
                    projectDetail?.projectCategory === "donation" ? "Rp " : ""
                  }}
                  {{ projectDetail?.projectTargetAmount }}
                  {{
                    projectDetail?.projectCategory === "volunteer"
                      ? "Orang "
                      : ""
                  }}
                </p>
              </div>
              <!-- <div
                v-if="projectDetail?.projectCategory === 'donation'"
                class="bg-gray-100 p-1 rounded-lg"
              >
                <p class="text-sm font-semibold text-gray-700">Donatur</p>
                <p class="text-lg font-bold text-gray-700">
                  {{ projectDetail?.projectDonaturAmount }}
                </p>
              </div> -->

              <div class="bg-gray-100 p-1 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">Hari Tersisa</p>
                <p class="text-[16px] font-bold text-gray-700">
                  {{ projectDetail?.projectDiffDay }} Hari
                </p>
              </div>
            </div>

            <!-- Donasi Button -->
            <router-link
              v-if="
                projectDetail?.projectCategory === 'donation' &&
                projectDetail.projectProgressPercentage < 100 &&
                projectDetail.projectStatus !== 'completed'
              "
              :to="`/project/${projectId}/donation`"
              class="flex justify-center items-center w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition duration-200"
            >
              Donasi Sekarang
            </router-link>

            <router-link
              v-if="
                projectDetail?.projectCategory === 'volunteer' &&
                !projectDetail?.userParticipation &&
                projectDetail.projectStatus == 'in_progress'
              "
              :to="`/project/${projectId}/volunteer`"
              class="flex justify-center items-center w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition duration-200"
            >
              Bergabung Sekarang
            </router-link>
            <!-- <div class="text-xs text-gray-500 text-center">
              Pemrosesan pembayaran aman oleh Stripe Dapat dikurangkan pajak di
              AS
            </div> -->
          </div>
        </div>

        <!-- Sidebar Proyek Lainnya -->
        <div class="col-span-3 mt-8 top-64">
          <div class="bg-white border rounded-lg shadow-md p-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              Proyek Lainnya
            </h2>
            <div class="grid grid-cols-1 gap-6">
              <div
                v-for="p in projectList"
                :key="p.projectId"
                class="border rounded-lg shadow overflow-hidden"
              >
                <img
                  :src="p.projectImage"
                  :alt="p.projectTitle"
                  class="w-full h-40 object-cover"
                />
                <div class="p-4">
                  <h3 class="font-bold text-gray-800 mb-2">
                    {{ p.projectTitle }}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {{ p.projectDescription }}
                  </p>
                  <button
                    @click="gotoProjectId(p.projectId)"
                    class="text-green-600 text-sm mt-2 inline-block font-medium"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dukungan Komunitas -->
      <div
        class="md:hidden bg-white border rounded-lg shadow-md p-6 mb-6 col-start-1 col-span-12 md:col-span-9"
      >
        <h2 class="text-2xl font-bold text-gray-800 mb-6">
          Dukungan Komunitas
        </h2>
        <div class="space-y-6">
          <div
            v-for="comment in commentList"
            :key="comment.commentId"
            class="flex items-start space-x-3"
          >
            <img
              :src="comment.userAvatar"
              alt="Pengguna"
              class="w-8 h-8 rounded-full"
            />
            <div class="flex-1">
              <!-- Nama dan Waktu -->
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-semibold text-gray-800">{{
                    comment.userName
                  }}</span>
                  <span
                    class="inline-block text-xs ml-2 px-2 py-1 rounded mt-1"
                    :class="comment.userBadgeColor"
                    >{{ comment.userBadge }}</span
                  >
                </div>
                <span class="text-gray-500 text-sm ml-auto whitespace-nowrap">{{
                  comment.sendDate
                }}</span>
              </div>
              <!-- Komentar -->
              <p class="text-gray-600 mt-3">
                {{ comment.comment }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-access="{
            role: ['admin', 'active', 'verified', 'reported'],
            permission: ['send-donation'],
          }"
          class="mt-8"
        >
          <div class="flex items-start space-x-4">
            <img
              :src="user.profile_picture"
              alt="User Avatar"
              class="w-8 h-8 rounded-full mt-2"
            />
            <div class="flex-1">
              <textarea
                class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all resize-none"
                rows="4"
                v-model="commentText"
                placeholder="Write your comment..."
              ></textarea>
              <button
                type="submit"
                @click="storeComment"
                class="mt-3 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium w-full"
              >
                Tambahkan Komentar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Kriteria Modal -->
  <div>
    <div
      v-if="isCriteriaModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-xl md:max-w-3xl bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <h5 class="text-lg font-semibold text-gray-800">
            Kriteria Volunteer
          </h5>
          <button
            @click="closeCriteriaModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="px-6 py-4 overflow-y-auto max-h-[50vh]">
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
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(criteria, index) in projectDetail.projectCriteria"
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Role Modal -->
  <!-- Role Modal -->
  <div>
    <div
      v-if="isRoleModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-xl md:max-w-3xl bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Kebutuhan Role</h5>
          <button
            @click="closeRoleModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="px-6 py-4 overflow-y-auto max-h-[50vh]">
          <table class="min-w-full bg-white border rounded-md mt-1 mb-2">
            <thead @click="addRole" class="cursor-pointer">
              <tr class="bg-gray-100">
                <th
                  class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                >
                  Role
                </th>
                <th
                  class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                >
                  Jumlah
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(role, index) in projectDetail.projectRole"
                :key="index"
              >
                <td class="border px-4 py-2">
                  <span
                    class="flex justify-center items-center w-full px-2 py-1 border-0 outline-none focus:ring-0 bg-transparent text-center"
                  >
                    {{ role.key }}
                  </span>
                </td>
                <td class="border px-4 py-2">
                  <span
                    class="flex justify-center items-center w-full px-2 py-1 border-0 outline-none focus:ring-0 bg-transparent text-center"
                  >
                    {{ role.value }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Timeline  -->
  <div>
    <div
      v-if="isTimelineModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-xl md:max-w-3xl bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b">
          <h5 class="text-lg font-semibold text-gray-800">
            Estimasi Timeline Proyek
          </h5>
          <button
            @click="closeTimelineModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body (Scrollable) -->
        <div class="max-h-[378px] scrollbar overflow-y-auto p-[40px]">
          <div
            v-for="timeline in timelineList"
            :key="timeline.timelineId"
            class="pb-5 mb-5 border-b border-regular dark:border-white/10 last:border-none last:mb-0"
          >
            <div class="flex items-center gap-x-[30px] gap-y-[5px]">
              <div
                class="flex items-center justify-center flex-col bg-regularBG dark:bg-white/10 h-full border dark:border-white/10 rounded-[10px] min-h-[20px] p-[4px] min-w-[65px]"
              >
                <!-- Adjusted text sizes -->
                <h1
                  class="mb-0 text-md font-semibold uppercase text-dark dark:text-white/60"
                >
                  {{ timeline.timelineDate.timelineDateDay }}
                </h1>
                <span class="capitalize text-sm text-body dark:text-white/60">
                  {{ timeline.timelineDate.timelineDateMonth }}
                </span>
              </div>
              <div>
                <div
                  v-for="detail in timeline.details"
                  :key="detail.timelineDetailId"
                  class="flex mb-[25px] last:mb-0 w-full gap-x-[15px]"
                >
                  <div class="flex items-center min-w-[22px]">
                    <div
                      class="flex items-center justify-center w-10 h-10 rounded-full"
                      :class="detail.timelineDetailIconBackground"
                    >
                      <i
                        :class="detail.timelineDetailIcon"
                        class="mt-[2px]"
                      ></i>
                    </div>
                  </div>
                  <div>
                    <h1
                      class="mb-0 -mt-1 text-md font-medium text-dark dark:text-white/60"
                    >
                      <!-- {{ detail.name }} -->
                      <span
                        class="mx-0.5 text-body dark:text-white/60 font-normal"
                        >{{ detail.timelinenDetailAction }}</span
                      >
                      <!-- {{ detail.target }} -->
                    </h1>
                    <p
                      class="mb-0 text-sm capitalize text-light-extra dark:text-white/60"
                    >
                      {{ detail.timelineDetailTime }} WIB
                    </p>
                  </div>
                </div>

                <!-- <div class="flex mb-[25px] last:mb-0 items-center justify-center w-full gap-x-[15px]">
                      <div
                        class="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary"
                      >
                        <i class="uil uil-plus"></i>
                      </div>
                    </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- report Case Modal -->
  <ReportCaseModalComponent
    :is-modal-open="isReportCaseModalOpen"
    @close-report-modal="closeReportModal"
    @submit-report="reportUser"
  />
  <!-- End: Main Content -->

  <!-- Approve Project  -->
  <SoftWarningComponent
    :is-confirmation-modal-open="isReportConfirmationModalOpen"
    :description="'    Apakah Anda yakin ingin Menlaporkan hal ini? Pastikan Seluruh data sudah sesuai dan apa adanya.'"
    @close-confirmation-modal="closeConfirmationReportModal"
    @action-modal="handleSubmitReport"
    :action="'Report'"
    :title="'Konfirmasi Report Case'"
  />
</template>
