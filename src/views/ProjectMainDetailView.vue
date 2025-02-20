<script setup>
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;
const route = useRoute();
const projectId = route.params.projectId ? route.params.projectId : null;
console.log("projectId : ", projectId);

const initialMap = ref(null);
const isCriteriaModalOpen = ref(false);
const commentText = ref("");
const isRoleModalOpen = ref(false);
const isTimelineModalOpen = ref(false);
const timelineList = ref();
const projectDetail = ref();
const lampiranList = ref();
const projectList = ref();
const commentList = ref();

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

//API
const getProjectDetail = async () => {
  try {
    const responses = await axios.get(
      `${API_BASE_URL}/api/v1/test-public-project-id/${projectId}`
    );
    console.log(
      "project: ",
      JSON.parse(responses.data.project_details[0].project_criteria)
    );
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
          }))
        : [{ key: "", value: "" }],
      projectRole: project.project_role
        ? JSON.parse(project.project_role).map((role) => ({
            key: role.key,
            value: role.value,
          }))
        : [{ key: "", value: "" }],
      projectCreatorName: project.project_creator_name,
      projectKodeDesa: project.project_kode_desa,
      projectPointLatitude: project.project_latitude,
      projectPointlongitude: project.project_longitude,
      projectCategory: project.project_category,
      userOrganizationName: project.user_organization_name,
      userBadge: project.user_badge,
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
    const response = await axios.get(
      `${API_BASE_URL}/api/v1/test-public-projects`,
      {
        params: {
          status: "in progress",
          category: "",
          sort: "asc",
          search: "",
          kode_provinsi: "",
          limit: 3,
          random: Math.random(), // ✅ Tambahkan parameter random agar cache dihindari

        },
      }
    );

    console.log("project  : ", response.data);

    if (response.status === 200) {
      const projectsListData = response.data.projects.map((item) => ({
        projectId: item.project_title,
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
    const responses = await axios.get(
      `${API_BASE_URL}/api/v1/test-comment-project-id/${projectId}`
    );
    console.log("comments : ", responses.data.comments);
    const commentLists = responses.data.comments.map((comment) => ({
      commentId: comment.project_comment_id,
      userName: comment.user_name,
      userAvatar: comment.user_avatar,
      userBadge: comment.user_badge,
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
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
    };

    // 🔹 Jika user login, tambahkan Authorization
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 🔹 Kirim request
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/test-comment-project-id/${projectId}`,
      {
        comment: commentText.value,
      },
      { headers }
    );
      
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
    const responses = await axios.get(
      `${API_BASE_URL}/api/v1/test-project-timeline-id/${projectId}`
    );
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
    const responses = await axios.get(
      `http://localhost:8000/api/v1/test-project-lampiran-id/${projectId}`
    );
    console.log("lampiran : ", responses.data);
    const lampiranLists = responses.data.project_lampiran.map((lampiran) => ({
      lampiranId: lampiran.project_lampiran_id,
      lampiranName: lampiran.project_lampiran_name,
      lampiranUrl: lampiran.project_lampiran_url,
    }));

    lampiranList.value = lampiranLists;
    console.log("lampiran : ", lampiranList.value);
  } catch (error) {
    console.error(error.response.data);
  }
};

onMounted(() => {
  getProjectDetail();
  getLampiran();
  getTimeline();
  getComments();
  getPublicProjectList();
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
                >X {{ projectTag.tagName }}</span
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
                    <span class="text-blue-600 text-lg">📄</span>
                    <span class="text-gray-700 text-sm font-medium">{{
                      file.lampiranName
                    }}</span>
                  </div>
                  <button
                    class="text-blue-500 hover:text-blue-700 transition"
                    @click="previewFile(file)"
                  >
                    ⬇
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
                class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                @click="openGeneralModal('timeline')"
              >
                📅 Lihat Timeline
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
                  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                  @click="openGeneralModal('kriteria')"
                >
                  <span class="m-0 hidden xl:block">📌 Lihat Kriteria</span>
                  <span class="m-0 hidden md:block xl:hidden">📌 Kriteria</span>
                  <span class="m-0 block md:hidden">📌 Kriteria</span>
                </button>
                <button
                  class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                  @click="openGeneralModal('role')"
                >
                  <span class="m-0 hidden xl:block">👥 Lihat Role</span>
                  <span class="m-0 hidden md:block xl:hidden">👥 Role</span>
                  <span class="m-0 block md:hidden">👥 Role</span>
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-1">
                Persyaratan dan peran dalam proyek.
              </p>
            </div>
          </div>

          <!-- Lokasi  -->
          <div
            class="col-start-1 col-span-2 md:col-start-2 md:col-span-1 bg-white border rounded-lg shadow-md p-6 h-[400px] md:h-full"
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
        <div class="bg-white border rounded-lg p-6 mb-6">
          <div class="flex items-center space-x-4">
            <img
              src="C:\Users\hp\Pictures\Filtering\david.jpg"
              alt="Profil"
              class="w-12 h-12 rounded-full"
            />
            <div>
              <h3 class="font-semibold">
                {{ projectDetail?.projectCreatorName }}
              </h3>
              <span
                class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                >{{ projectDetail?.userBadge }}</span
              >
              <p
                v-if="projectDetail?.userOrganizationName !== 'tidak ada'"
                class="text-sm text-gray-600 mt-1"
              >
                Organisasi: {{ projectDetail?.userOrganizationName }}
              </p>
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
                      class="inline-block bg-green-100 text-green-800 text-xs ml-2 px-2 py-1 rounded mt-1"
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
          
          class="mt-8">
            <div class="flex items-start space-x-4">
              <img
                src="C:\Users\hp\Pictures\Filtering\david.jpg"
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
        <div class="bg-white border rounded-lg p-6 top-4 shadow-md">
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
            <div class="grid grid-cols-2 gap-2 text-center">
              <div class="bg-gray-100 p-3 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">Terkumpul</p>
                <p class="text-lg font-bold text-green-600">
                  {{ projectDetail?.projectProgressAmount }}
                </p>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">Target</p>
                <p class="text-lg font-bold text-gray-700">
                  {{ projectDetail?.projectTargetAmount }}
                </p>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">Donatur</p>
                <p class="text-lg font-bold text-gray-700">
                  {{ projectDetail?.projectDonaturAmount }}
                </p>
              </div>
              <div class="bg-gray-100 p-3 rounded-lg">
                <p class="text-sm font-semibold text-gray-700">Hari Tersisa</p>
                <p class="text-lg font-bold text-gray-700">
                  {{ projectDetail?.projectDiffDay }}
                </p>
              </div>
            </div>

            <!-- Donasi Button -->
            <button
              class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold transition duration-200"
            >
              Donasi Sekarang
            </button>
            <div class="text-xs text-gray-500 text-center">
              Pemrosesan pembayaran aman oleh Stripe Dapat dikurangkan pajak di
              AS
            </div>
          </div>
        </div>

        <!-- Sidebar Proyek Lainnya -->
        <div class="col-span-3 mt-12 top-64">
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
                  <a
                    href="#"
                    class="text-green-600 text-sm mt-2 inline-block font-medium"
                    >Lihat Detail</a
                  >
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
                    class="inline-block bg-green-100 text-green-800 text-xs ml-2 px-2 py-1 rounded mt-1"
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
        <div class="mt-8">
          <div class="flex items-start space-x-4">
            <img
              src="C:\Users\hp\Pictures\Filtering\david.jpg"
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
      <div class="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
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
      <div class="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
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
      <div class="relative w-full max-w-3xl bg-white rounded-lg shadow-lg">
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
</template>
