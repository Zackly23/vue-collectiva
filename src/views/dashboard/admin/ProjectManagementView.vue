<script setup>
import api from "@/api";
import { ref, onMounted, onBeforeMount, watch } from "vue";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import { useToast } from "vue-toast-notification";

const toastNotification = useToast();

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const projectList = ref();
const project_id = ref("");
const projectStatistics = ref();
const evaluationList = ref();

const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;
const initialMap = ref(null);
const dropdownComponentTag = ref(false);
const selectedComponentTag = ref("");
const evaluationText = ref("");
const toggleSelectTagDropdown = () => {
  dropdownComponentTag.value = !dropdownComponentTag.value;
};

const selectComponentTag = (tag) => {
  selectedComponentTag.value = tag;
  dropdownComponentTag.value = false;
};
const componentTagList = ref([
  { componentId: 1, componentTag: "image" },
  { componentId: 2, componentTag: "title" },
  { componentId: 3, componentTag: "description" },
  { componentId: 4, componentTag: "point" },
  { componentId: 5, componentTag: "address" },
  { componentId: 6, componentTag: "tag" },
  { componentId: 7, componentTag: "file attachment" },
  { componentId: 8, componentTag: "timelines" },
  { componentId: 9, componentTag: "date" },
  { componentId: 10, componentTag: "amount" },
  { componentId: 11, componentTag: "article" },
  { componentId: 12, componentTag: "campaign" },
  { componentId: 13, componentTag: "strategy" },
  { componentId: 14, componentTag: "feedback" },
]);

const isTimelineOpen = ref(false);
const isLampiranOpen = ref(false);
const isProjectModalOpen = ref(false);
const isEvaluationModalOpen = ref(false);
const searchText = ref("");
const page = ref(1);
const currentPage = ref(1);
const lastPage = ref();
const stepProjectNumber = ref(1);

//Data Detail
const locationData = ref({
  address: "",
  provinsi: {
    kode_provinsi: "",
    nama_provinsi: "",
  },
  kabupaten: {
    kode_kabupaten: "",
    nama_kabupaten: "",
  },
  kecamatan: {
    kode_kecamatan: "",
    nama_kecamatan: "",
  },
  desa: {
    kode_desa: "",
    nama_desa: "",
  },
  point: {
    latitude: -6.175372,
    longitude: 106.827194,
  },
});

const projectData = ref({
  projectTitle: "",
  projectTags: [],
  projectDescription: "",
  projectStartDate: "",
  projectEndDate: "",
  projectCategory: "",
  projectFile: "",
  projectTargetAmount: "",
  projectCriteria: [{ key: "", value: "", role: "" }],
  projectRole: [{ key: "", value: "" }],
});

const creatorInformation = ref({
  creatorName: "",
  creatorEmail: "",
  creatorPhone: "",
  creatorSocialMedia: {}, //json
  creatorType: "",
  organizationName: "",
  creatorWebsite: "",
  creatorID: "",
  creatorFile: "", //url
});
const beneficialInformation = ref({
  beneficiaryType: "",
  beneficiaryName: "",
  beneficiaryNIK: "",
  beneficiaryAddress: "",
  beneficiaryPhone: "",
  beneficiaryNeeds: "",
  organizationName: "",
  organizationRegNumber: "",
  organizationAddress: "",
  organizationPIC: "",
  organizationPhone: "",
  beneficiaryRelation: "",
  beneficiaryRelationOther: "",
  beneficiaryFile: "", //url
});
const lampiranList = ref();
const timelineList = ref();

const imagePreview = ref("");
const coloumActive = ref({
  title: {
    state: false,
    query: "project_title",
  },
  category: {
    state: false,
    query: "project_category",
  },
  date: {
    state: false,
    query: "created_at",
  },
  target: {
    state: false,
    query: "project_target_amount",
  },
  progress: {
    state: false,
    query: "project_progress_percentage",
  },
  status: {
    state: false,
    query: "project_status",
  },
});
const stepProjectCreation = ref([
  { stepNumber: "1", stepName: "Biodata", stepPassed: true },
  { stepNumber: "2", stepName: "General", stepPassed: false },
  { stepNumber: "3", stepName: "Location", stepPassed: false },
  { stepNumber: "4", stepName: "Timeline", stepPassed: false },
  { stepNumber: "5", stepName: "Documents", stepPassed: false },
]);
const closeVolunteerModal = () => {
  isVolunteerModalOpen.value = false;
};

const closeProjectModal = () => {
  console.log("decline");
  isProjectModalOpen.value = false;
  stepProjectNumber.value = 1;
};

const closeEvaluationModal = () => {
  isEvaluationModalOpen.value = false;
  evaluationList.value = null;
};

const previewFile = (lampiran) => {
  window.open(lampiran.lampiranUrl, "_blank");
};

const getActiveQueries = () => {
  return Object.entries(coloumActive.value)
    .filter(([_, value]) => value.state)
    .map(([_, value]) => value.query);
};

const coloumClick = (coloum) => {
  console.log(coloum);
  if (coloum === "title") {
    coloumActive.value.title.state = !coloumActive.value.title.state;
  } else if (coloum === "category") {
    coloumActive.value.category.state = !coloumActive.value.category.state;
  } else if (coloum === "date") {
    coloumActive.value.date.state = !coloumActive.value.date.state;
  } else if (coloum === "target") {
    coloumActive.value.target.state = !coloumActive.value.target.state;
  } else if (coloum === "progress") {
    coloumActive.value.progress.state = !coloumActive.value.progress.state;
  } else if (coloum === "status") {
    coloumActive.value.status.state = !coloumActive.value.status.state;
  }

  console.log("coloumActive", coloumActive.value);
  console.log("check active : ", isColoumActive(coloum));
};

const initialMapLayer = () => {
  if (initialMap.value) {
    // Jika map sudah ada, hapus peta lama
    initialMap.value.remove();
  }

  initialMap.value = L.map("map").setView(
    [locationData.value.point.latitude, locationData.value.point.longitude],
    16
  );

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(initialMap.value);

  L.marker([
    locationData.value.point.latitude,
    locationData.value.point.longitude,
  ])
    .addTo(initialMap.value)
    .bindPopup("Lokasi Utama Proyek.")
    .openPopup();
};

const isColoumActive = (coloum) => {
  return coloumActive.value[coloum]?.state ?? false;
};

const evaluationListUpdate = async (projectId) => {
  project_id.value = projectId;
  isEvaluationModalOpen.value = true;
  await getEvaluationList(projectId);
};

//API
const getProjectDetails = async (projectId) => {
  project_id.value = projectId;

  try {
    const [response1, response2, response3] = await Promise.all([
      getProjectDetail(projectId),
      getProjectLocation(projectId),
      getTimeline(projectId),
      getLampiran(projectId),
    ]);
  } catch (error) {
    console.log("error get all projectdetail", error);
  }
};

const getProjectDetail = async (projectId) => {
  try {
    isProjectModalOpen.value = true;

    const response = await api.get(
      `/test-project/manage/project/${projectId}/detail`
    );

    console.log("response : ", response.data);
    if (response.status == 200) {
      const data = response.data.project_detail[0]; // Ambil data pertama dari array

      projectData.value = {
        projectTitle: data.project_title || "",
        projectTags: data.project_tags
          ? data.project_tags.map((tag) => ({
              tagId: tag.tag_id,
              tagName: tag.tag.tag_name,
            }))
          : [],
        projectDescription: data.project_description || "",
        projectStartDate: data.project_start_date || "",
        projectEndDate: data.project_end_date || "",
        projectCategory: data.project_category || "",
        projectFile: data.project_image_path || "",
        projectTargetAmount: data.project_target_amount || "",
        projectCriteria: data.project_criteria
          ? JSON.parse(data.project_criteria)
          : [{ key: "", value: "", role: "" }],
        projectRole: data.project_role
          ? JSON.parse(data.project_role)
          : [{ key: "", value: "" }],
      };

      creatorInformation.value = {
        creatorName: data.project_creator_information.creator_name || "",
        creatorEmail: data.project_creator_information.creator_email || "",
        creatorPhone: data.project_creator_information.creator_phone || "",
        creatorSocialMedia: data.project_creator_information
          .creator_social_media
          ? JSON.parse(data.project_creator_information.creator_social_media)
          : {},
        creatorType: data.project_creator_information.creator_type || "",
        organizationName:
          data.project_creator_information.creator_organization_name || "",
        creatorWebsite: data.project_creator_information.creator_website || "",
        creatorID: data.project_creator_information.creator_identifier || "",
        creatorFile: data.project_creator_information.creator_file_path || "",
      };

      beneficialInformation.value = {
        beneficiaryType:
          data.project_beneficial_information.beneficiary_type || "",
        beneficiaryName:
          data.project_beneficial_information.beneficiary_name || "",
        beneficiaryNIK:
          data.project_beneficial_information.beneficiary_nik || "",
        beneficiaryAddress:
          data.project_beneficial_information.beneficiary_address || "",
        beneficiaryPhone:
          data.project_beneficial_information.beneficiary_phone || "",
        beneficiaryNeeds:
          data.project_beneficial_information.beneficiary_needs || "",
        organizationName:
          data.project_beneficial_information.organization_name || "",
        organizationRegNumber:
          data.project_beneficial_information.organization_reg_number || "",
        organizationAddress:
          data.project_beneficial_information.organization_address || "",
        organizationPIC:
          data.project_beneficial_information.organization_pic || "",
        organizationPhone:
          data.project_beneficial_information.organization_phone || "",
        beneficiaryRelation:
          data.project_beneficial_information.beneficiary_relation || "",
        beneficiaryRelationOther:
          data.project_beneficial_information.beneficiary_relation_other || "",
        beneficiaryFile:
          data.project_beneficial_information.beneficiary_file_path || "",
      };

      console.log("Mapped Project Data:", projectData.value);
      console.log("Mapped Creator Info:", creatorInformation.value);
      console.log("Mapped Beneficial Info:", beneficialInformation.value);
    }
  } catch (error) {
    console.error(error);
  }
};

const getEvaluationList = async (projectId) => {
  try {
    const responses = await api.get(`/test-project-evaluation-id/${projectId}`);

    console.log("evaluation response : ", responses.data.project_evaluation);

    const evaluationLists = responses.data.project_evaluation.map(
      (evaluation) => ({
        evaluationId: evaluation.project_evaluation_id,
        evaluationTaskComment: evaluation.project_evaluation_comment,
        evaluationChecked: evaluation.project_evaluation_check,
        evaluationStatus: evaluation.project_evaluation_status,
        // evaluationStatusColor: evaluation.project_evaluation_status_color,
        evaluationTag: evaluation.project_evaluation_tag_component,
        // evaluationTagColor: evaluation.project_evaluation_tag_component_color,
        evaluationEvaluatorAvatar: evaluation.project_evaluator_avatar,
        evaluationTime: evaluation.project_evaluation_send_time,
      })
    );

    evaluationList.value = evaluationLists;
    console.log("evaluation list : ", evaluationList.value);
  } catch (error) {
    console.error(error.response.data);
  }
};

const getTimeline = async (projectId) => {
  try {
    const responses = await api.get(`/test-project-timeline-id/${projectId}`);
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

const getLampiran = async (projectId) => {
  try {
    const responses = await api.get(`/test-project-lampiran-id/${projectId}`);
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

const getProjectLocation = async (projectId) => {
  try {
    const response = await api.get(`/test-project-location-id/${projectId}`);

    let location = response.data.project_location;

    console.log("lokasi : ", location);

    locationData.value.address = location.project_location_address;
    locationData.value.desa = location.project_location_desa;
    locationData.value.kecamatan = location.project_location_kecamatan;
    locationData.value.kabupaten = location.project_location_kabupaten;
    locationData.value.provinsi = location.project_location_provinsi;
    locationData.value.point = location.project_location_point;
  } catch (error) {
    console.error("error fetch location : ", error);
  }
};

const getProjectCardStatistic = async () => {
  try {
    const response = await api.get("/test-project/manage/project/statistic");

    // const projectCardStastistic = response.data.project_statistics.map((statistic) => {

    // })
    console.log("before: ", projectStatistics.value);
    projectStatistics.value = response.data.project_statistic;
    console.log("after: ", projectStatistics.value);
  } catch (error) {
    console.log("error : ", error.response.data);
  }
};

const getProjectList = async () => {
  try {
    const querySort = getActiveQueries();
    console.log("query sort : ", querySort);
    const response = await api.get("test-project/manage/project", {
      params: {
        search: searchText.value,
        query_sort: querySort,
        limit: 8,
        page: page.value,
      },
    });

    if (response.status === 200) {
      console.log("response data : ", response.data);
      const projectsList = response.data.projects.map((project) => ({
        projectId: project.project_id,
        projectTitle: project.project_title,
        projectStatus: project.project_status,
        projectCategory: project.project_category,
        projectTargetAmount: project.project_target_amount,
        projectProgressPercentage: project.project_progress_percentage,
        projectDateCreated: project.project_date_created,
      }));

      projectList.value = projectsList;
      lastPage.value = response.data.last_page;
      console.log("project lusr : ", projectList.value);
    }
  } catch (error) {
    console.error(error);
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

const updateStatusProject = async (newStatus) => {
  console.log("ubah status");
  try {
    const response = await api.put(
      `/test-project-status-id/${project_id.value}`,
      {
        status: newStatus,
      }
    );

    if (response.status == 200) {
      console.log("response status", response.data);
    }

    openNotificatication(
      `Status Project ${project_id.value} berhasil Diupdate`
    );
  } catch (error) {
    console.error(error.response);
  }

  isProjectModalOpen.value = false;
};

const storeEvaluation = async () => {
  try {
    const evaluasi = {
      tag_component: selectedComponentTag.value,
      task_comment: evaluationText.value,
    };

    console.log("evaluasi : ", evaluasi);
    console.log("simpan evaluasi");
    const response = await api.post(
      `/test-project-evaluation-id/${project_id.value}`,
      evaluasi
    );

    console.log("response : ", response.data);
    if (response.status == 201) {
      console.log("Evaluasi Berhasil Disimpan");
      openNotificatication("Evaluasi Berhasil Disimpan", "success");
      selectedComponentTag.value = "";
      evaluationText.value = "";
    }
  } catch (error) {
    console.error("error menyimpan evaluasi : ", error);
  }
};

watch([coloumActive, searchText, page], getProjectList, { deep: true });

const fetchData = async () => {
  try {
    await Promise.all([getProjectList(), getProjectCardStatistic()]);
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

const isCreatorOpen = ref(false);
const isBeneficiaryOpen = ref(false);

// Toggle functions
const toggleCreator = () => {
  isCreatorOpen.value = !isCreatorOpen.value;
};

const toggleBeneficiary = () => {
  isBeneficiaryOpen.value = !isBeneficiaryOpen.value;
};

// Format label from key
const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

// Navigate to next step
const goToStep = (step) => {
  console.log("Navigating to step", step);
  stepProjectNumber.value = step;
  console.log(stepProjectNumber.value);

  if (step == 3) {
    setTimeout(() => {
      initialMapLayer();
    }, 2000);
  }
};

// State untuk dropdown General Information
const isGeneralOpen = ref(false);
const isRoleOpen = ref(false);
const isCriteriaOpen = ref(false);

//State untuk dropsown Location
const isLocationOpen = ref(false);

// Fungsi Toggle
const toggleGeneralInfo = () => {
  isGeneralOpen.value = !isGeneralOpen.value;
};
</script>

<template>
  <div class="relative py-4 bg-white">
    <!-- Card Statistic  -->
    <div class="grid grid-cols-12 gap-[25px] px-8 mb-10">
      <div class="col-span-12 text-xl">Statistik Project</div>
      <div
        v-for="statistic in projectStatistics"
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
                :class="{
                  'max-lg:text-[14px]':
                    statistic.statistic_name === 'Total Donasi',
                }"
              >
                <div
                  class="flex items-center countCategories"
                  :data-number="statistic.statistic_number"
                >
                  <span class="countNumber">
                    {{
                      statistic.statistic_name === "Total Donasi"
                        ? "Rp"
                        : statistic.statistic_name === "Total Jam Volunteer"
                        ? ">"
                        : ""
                    }}
                    {{ statistic.statistic_number }} Project</span
                  >

                  <span class="ml-1">
                    {{
                      statistic.statistic_name === "Total Jam Volunteer"
                        ? " jam"
                        : ""
                    }}
                  </span>
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
      <div class="text-xl ml-4">Tabel Project</div>
      <!-- Search Bar -->
      <div class="flex justify-end items-center mb-4 px-4">
        <input
          v-model="searchText"
          type="text"
          placeholder="Cari proyek..."
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
              @click="coloumClick('title')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Judul Proyek
              <i
                v-if="isColoumActive('title')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>
            <th
              @click="coloumClick('category')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Category
              <i
                v-if="isColoumActive('category')"
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
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Target Proyek
            </th>
            <th
              @click="coloumClick('progress')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Progress Proyek
              <i
                v-if="isColoumActive('progress')"
                class="ui uil-arrow-up text-md"
              ></i>
              <i v-else class="ui uil-arrow-down text-md"></i>
            </th>
            <th
              @click="coloumClick('status')"
              class="cursor-pointer px-6 py-3 text-center text-sm font-medium text-dark dark:text-title-dark"
            >
              Status Proyek
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
          <tr v-for="project in projectList" :key="project.projectId">
            <td class="px-6 py-3">
              <div class="pl-6">
                <span> {{ project.projectTitle }}</span>
              </div>
            </td>

            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ project.projectCategory }}
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ project.projectDateCreated }}
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ project.projectCategory === "donation" ? "Rp" : "" }}
                {{ project.projectTargetAmount }}
                {{ project.projectCategory === "volunteer" ? "Orang" : "" }}
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                {{ project.projectProgressPercentage }} %
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center">
                <span
                  class="px-3 py-1 text-sm font-medium rounded-lg"
                  :class="{
                    'bg-purple-100 text-purple-700':
                      project.projectStatus === 'proposed',
                    'bg-green-100 text-green-700':
                      project.projectStatus === 'in progress',
                    'bg-red-100 text-red-700':
                      project.projectStatus === 'in review',
                    'bg-blue-100 text-blue-700':
                      project.projectStatus === 'completed',
                    'bg-gray-100 text-gray-700':
                      project.projectStatus === 'in active',
                  }"
                >
                  {{ project.projectStatus }}</span
                >
              </div>
            </td>
            <td class="px-6 py-3">
              <div class="flex justify-center items-center gap-x-2">
                <!-- View (Lihat Detail) -->
                <button
                  @click="getProjectDetails(project.projectId)"
                  class="py-1 px-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                  title="Lihat Detail"
                >
                  <i class="uil uil-edit-alt text-[16px]"></i>
                </button>

                <!-- Edit (Evaluasi) -->
                <button
                  @click="evaluationListUpdate(project.projectId)"
                  class="py-1 px-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition"
                  title="Evaluasi"
                >
                  <i class="uil uil-eye text-[16px]"></i>
                </button>

                <!-- Delete (Hapus) -->
                <button
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
      v-if="isProjectModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="mt-14 relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Detail</h5>
          <button
            @click="closeProjectModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <!-- Step Progress -->
        <div class="flex justify-center gap-2 md:gap-4 mb-4 mt-4">
          <div
            @click="goToStep(step.stepNumber)"
            v-for="(step, index) in stepProjectCreation"
            :key="step.stepNumber"
            class="flex items-center cursor-pointer"
          >
            <div class="flex flex-col items-center text-center">
              <div
                @click="goToStep(step.stepNumber)"
                class="w-8 h-8 flex items-center justify-center text-lg font-semibold rounded-full"
                :class="
                  step.stepNumber == stepProjectNumber
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-700'
                "
              >
                {{ step.stepNumber }}
              </div>
              <div class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {{ step.stepName }}
              </div>
            </div>
            <div
              v-if="index !== stepProjectCreation.length - 1"
              class="w-8 md:w-12 h-1 bg-gray-300 mx-2"
            ></div>
          </div>
        </div>

        <!-- Informasi Pembuat dan Penerima Manfaat Section -->
        <div
          v-if="stepProjectNumber == 1"
          class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 max-h-[300px] overflow-x-auto"
        >
          <!-- Informasi Creator (Dropdown) -->
          <div class="mb-5">
            <button
              @click="toggleCreator"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Informasi Creator</span
              >
              <span
                :class="{ 'rotate-180': isCreatorOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <div
                v-if="isCreatorOpen"
                class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 px-2"
              >
                <!-- Informasi Creator (Pembuat Proyek) -->
                <div>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Nama Lengkap -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nama Lengkap <span class="text-red-500">*</span></label
                      >
                      <span>{{ creatorInformation.creatorName }}</span>
                    </div>

                    <!-- Email -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Email <span class="text-red-500">*</span></label
                      >
                      <span>{{ creatorInformation.creatorEmail }}</span>
                    </div>

                    <!-- Nomor Telepon/WhatsApp -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nomor Telepon/WhatsApp
                        <span class="text-red-500">*</span></label
                      >
                      <span>{{ creatorInformation.creatorPhone }}</span>
                    </div>

                    <!-- Sosial Media -->
                    <div class="relative">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Sosial Media (Opsional)</label
                      >
                      <div class="flex justify-center items-center gap-2">
                        <div class="flex justify-start items-center">
                          <div class="relative">
                            <span>{{
                              creatorInformation.creatorSocialMedia.key
                            }}</span>
                          </div>
                        </div>
                        <span>{{
                          creatorInformation.creatorSocialMedia.value
                        }}</span>
                      </div>
                    </div>

                    <!-- Tipe Creator -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Tipe Creator <span class="text-red-500">*</span></label
                      >
                      <span>{{ creatorInformation.creatorType }}</span>
                    </div>

                    <!-- Nama Organisasi/Lembaga (Muncul jika memilih "Organisasi") -->
                    <div v-if="creatorInformation.creatorType === 'organisasi'">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nama Organisasi/Lembaga
                        <span class="text-red-500">*</span></label
                      >
                      <span>{{ creatorInformation.organizationName }}</span>
                    </div>

                    <!-- Tautan Media Sosial atau Website -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Tautan Media Sosial atau Website (Opsional)</label
                      >
                      <span>{{ creatorInformation.creatorWebsite }}</span>
                    </div>

                    <!-- Nomor Identitas -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nomor Identitas (KTP/SIM/Paspor) (Opsional)</label
                      >
                      <span>{{ creatorInformation.creatorID }}</span>
                    </div>

                    <!-- Unggah Dokumen Proposal -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Unggah Dokumen Proposal (Opsional)</label
                      >
                      <span>{{ creatorInformation.creatorFile }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Penerima Manfaat (Dropdown) -->
          <div class="">
            <button
              @click="toggleBeneficiary"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Penerima Manfaat</span
              >
              <span
                :class="{ 'rotate-180': isBeneficiaryOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <div
                v-if="isBeneficiaryOpen"
                class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-6 px-2"
              >
                <!-- Penerima Manfaat Section -->
                <div class="">
                  <!-- Jenis Penerima Manfaat -->
                  <div>
                    <label
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                      >Jenis Penerima Manfaat</label
                    >
                    <span>{{ beneficialInformation.beneficiaryType }}</span>
                  </div>

                  <!-- Jika Perorangan -->
                  <div
                    v-if="
                      beneficialInformation.beneficiaryType === 'perorangan'
                    "
                    class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
                  >
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nama Lengkap</label
                      >
                      <span>{{ beneficialInformation.beneficiaryName }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >NIK (Opsional)</label
                      >
                      <span>{{ beneficialInformation.beneficiaryNIK }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Alamat</label
                      >
                      <span>{{
                        beneficialInformation.beneficiaryAddress
                      }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nomor Telepon (Opsional)</label
                      >
                      <span>{{ beneficialInformation.beneficiaryPhone }}</span>
                    </div>
                    <div class="md:col-span-2">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Kondisi/Kebutuhan</label
                      >
                      <span>{{ beneficialInformation.beneficiaryNeeds }}</span>
                    </div>
                    <div class="md:col-span-2">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Dokumen Pendukung (Opsional)</label
                      >
                      <span>{{ beneficialInformation.beneficiaryFile }}</span>
                    </div>
                  </div>

                  <!-- Jika Lembaga -->
                  <div
                    v-if="beneficialInformation.beneficiaryType === 'lembaga'"
                    class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
                  >
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nama Lembaga</label
                      >
                      <span>{{ beneficialInformation.organizationName }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nomor Registrasi (Opsional)</label
                      >
                      <span>{{
                        beneficialInformation.organizationRegNumber
                      }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Alamat Lembaga</label
                      >
                      <span>{{
                        beneficialInformation.organizationAddress
                      }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Penanggung Jawab (Nama & Jabatan)</label
                      >
                      <span>{{ beneficialInformation.organizationPIC }}</span>
                    </div>
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Nomor Telepon Lembaga</label
                      >
                      <span>{{ beneficialInformation.organizationPhone }}</span>
                    </div>
                    <div class="md:col-span-2">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Kondisi/Kebutuhan</label
                      >
                      <span>{{ beneficialInformation.beneficiaryNeeds }}</span>
                    </div>
                    <div class="md:col-span-2">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Dokumen Pendukung (Opsional)</label
                      >
                      <span>{{ beneficialInformation.beneficiaryFile }}</span>
                    </div>
                  </div>

                  <!-- Hubungan dengan Penerima Manfaat -->
                  <div class="mt-5">
                    <label
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                      >Hubungan dengan Penerima Manfaat</label
                    >
                    <span>{{ beneficialInformation.beneficiaryRelation }}</span>
                  </div>

                  <!-- Jika Lainnya, Tambah Input -->
                  <div
                    v-if="
                      beneficialInformation.beneficiaryRelation === 'lainnya'
                    "
                    class="mt-3"
                  >
                    <label
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                      >Jelaskan Hubungan</label
                    >
                    <span>{{
                      beneficialInformation.beneficiaryRelationOther
                    }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- General Information Section (Dropdown) -->
        <div
          v-if="stepProjectNumber == 2"
          class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 max-h-[300px] overflow-x-auto"
        >
          <div class="mb-4">
            <button
              @click="toggleGeneralInfo"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >General Information</span
              >
              <span
                :class="{ 'rotate-180': isGeneralOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <div v-if="isGeneralOpen" class="mt-3 px-2">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      for="title"
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Title
                    </label>
                    <span>{{ projectData.projectTitle }}</span>
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                      >Tags</label
                    >
                    <div
                      v-if="projectData?.projectTags?.length"
                      class="mt-2 flex flex-wrap gap-2"
                    >
                      <span
                        v-for="(tag, index) in projectData.projectTags"
                        :key="index"
                        class="bg-blue-500 text-white px-2 py-1 rounded-md text-sm flex items-center"
                      >
                        {{ tag.tagName }}
                        <button
                          @click="removeTag(tag)"
                          class="ml-2 text-white hover:text-red-300"
                        >
                          &times;
                        </button>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="mt-3">
                  <label
                    for="description"
                    class="block text-gray-700 dark:text-gray-300 font-medium"
                  >
                    Description
                  </label>
                  <span>{{ projectData.projectDescription }}</span>
                </div>

                <!-- Upload Image Section -->
                <div class="mt-4">
                  <h6 class="text-gray-700 dark:text-white mb-2">
                    Image Uploaded
                  </h6>
                  <div class="flex items-center justify-center">
                    <label
                      for="import-file"
                      class="flex flex-col items-center justify-center w-full sm:min-h-[150px] bg-white dark:bg-box-dark p-2 rounded-lg border-2 border-dashed border-[#c6d0dc] dark:border-box-dark-up hover:border-primary dark:hover:border-primary cursor-pointer transition-all duration-300 ease-linear"
                    >
                      <!-- Preview Image -->
                      <div v-if="projectData?.projectFile" class="w-full mt-2">
                        <img
                          :src="projectData.projectFile"
                          class="w-full h-80 object-cover rounded-md"
                        />
                      </div>
                    </label>
                  </div>
                </div>

                <!-- Date Inputs -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label
                      for="start_date"
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Start Date
                    </label>
                    <span>{{ projectData.projectStartDate }}</span>
                  </div>
                  <div>
                    <label
                      for="end_date"
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                    >
                      End Date
                    </label>
                    <span>{{ projectData.projectEndDate }}</span>
                  </div>
                </div>

                <!--  Project Target-->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label
                      for="category"
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Category
                    </label>
                    <span>{{ projectData.projectCategory }}</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label
                      for="target"
                      class="block text-gray-700 dark:text-gray-300 font-medium"
                    >
                      Target project
                    </label>
                    <span>{{ projectData.projectTargetAmount }}</span>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Role  -->

          <div v-if="projectData?.projectCategory === 'volunteer'" class="mb-4">
            <button
              @click="() => (isRoleOpen = !isRoleOpen)"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Kebutuhan Role</span
              >
              <span
                :class="{ 'rotate-180': isRoleOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <!-- Modal Body (Scrollable) -->
              <div
                v-if="isRoleOpen"
                class="px-6 py-4 overflow-y-auto max-h-[50vh]"
              >
                <table class="min-w-full bg-white border rounded-md mt-1 mb-2">
                  <!-- Klik pada header untuk menambah baris -->
                  <thead>
                    <tr class="bg-gray-100">
                      <th
                        class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                      >
                        Role
                      </th>
                      <th
                        class="border px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-center"
                      >
                        Kebutuhan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(role, index) in projectData.projectRole"
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
            </transition>
          </div>

          <!-- Criteria  -->
          <div v-if="projectData?.projectCategory === 'volunteer'" class="mb-4">
            <button
              @click="() => (isCriteriaOpen = !isCriteriaOpen)"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Kebutuhan Kriteria</span
              >
              <span
                :class="{ 'rotate-180': isCriteriaOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <!-- Modal Body (Scrollable) -->
              <div
                v-if="isCriteriaOpen"
                class="px-6 py-4 overflow-y-auto max-h-[50vh]"
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(criteria, index) in projectData.projectCriteria"
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
            </transition>
          </div>
        </div>

        <!-- Location  -->
        <div
          v-if="stepProjectNumber == 3"
          class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 max-h-[300px] overflow-x-auto"
        >
          <div class="mb-4">
            <button
              @click="() => (isLocationOpen = !isLocationOpen)"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Location</span
              >
              <span
                :class="{ 'rotate-180': isLocationOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <div v-if="isLocationOpen" class="mt-3 px-2">
                <!-- Modal Body -->
                <div class="py-4 grid grid-cols-2 gap-6">
                  <!-- Address -->
                  <div class="col-span-2">
                    <label
                      for="address"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Address
                    </label>
                    <span>{{ locationData.address }}</span>
                  </div>

                  <!-- Province -->
                  <div>
                    <label
                      for="province"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Province
                    </label>
                    <span
                      >{{ locationData.provinsi.nama_provinsi }} -
                      {{ locationData.provinsi.kode_provinsi }}</span
                    >
                  </div>

                  <!-- Kabupaten -->
                  <div>
                    <label
                      for="kabupaten"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Kabupaten
                    </label>
                    <span
                      >{{ locationData.kabupaten.nama_kabupaten }} -
                      {{ locationData.kabupaten.kode_kabupaten }}</span
                    >
                  </div>

                  <!-- Kecamatan -->
                  <div>
                    <label
                      for="kecamatan"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Kecamatan
                    </label>
                    <span
                      >{{ locationData.kecamatan.nama_kecamatan }} -
                      {{ locationData.kecamatan.kode_kecamatan }}</span
                    >
                  </div>

                  <!-- Desa -->
                  <div>
                    <label
                      for="desa"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Desa
                    </label>
                    <span
                      >{{ locationData.desa.nama_desa }} -
                      {{ locationData.desa.kode_desa }}</span
                    >
                  </div>

                  <!-- Latitude -->
                  <div>
                    <label
                      for="latitude"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Latitude
                    </label>
                    <span>{{ locationData.point.latitude }}</span>
                  </div>

                  <!-- Longitude -->
                  <div>
                    <label
                      for="longitude"
                      class="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Longitude
                    </label>
                    <span>{{ locationData.point.longitude }}</span>
                  </div>
                </div>
              </div>
            </transition>
            <div
              id="map"
              class="h-60 bg-gray-200 rounded-lg shadow-inner relative z-0"
              :class="{
                hidden: !isLocationOpen,
              }"
            ></div>
          </div>
        </div>

        <!-- Timeline  -->
        <div
          v-if="stepProjectNumber == 4"
          class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 max-h-[300px] overflow-x-auto"
        >
          <div class="mb-4">
            <button
              @click="() => (isTimelineOpen = !isTimelineOpen)"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Timeline</span
              >
              <span
                :class="{ 'rotate-180': isTimelineOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <div v-if="isTimelineOpen" class="mt-3 px-2">
                <!-- Modal Body -->

                <div class="p-[40px] pt-[10px]">
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
                        <span
                          class="capitalize text-sm text-body dark:text-white/60"
                        >
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Lampiran  -->
        <div
          v-if="stepProjectNumber == 5"
          class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 max-h-[300px] overflow-x-auto"
        >
          <div class="mb-4">
            <button
              @click="() => (isLampiranOpen = !isLampiranOpen)"
              class="w-full text-left bg-gray-200 dark:bg-gray-800 p-3 rounded-md flex justify-between items-center"
            >
              <span class="text-[15px] text-gray-800 dark:text-white"
                >Dokumen lampiran</span
              >
              <span
                :class="{ 'rotate-180': isLampiranOpen }"
                class="transition-transform duration-300"
              >
                ▼
              </span>
            </button>

            <transition name="dropdown">
              <div v-if="isLampiranOpen" class="mt-3 px-2">
                <!-- Modal Body -->

                <div class="py-4 grid gap-6">
                  <!-- Daftar File -->
                  <div v-if="lampiranList" class="space-y-2">
                    <div
                      v-for="lampiran in lampiranList"
                      :key="lampiran.lampiranId"
                      class="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div
                        @click="previewFile(lampiran)"
                        class="flex items-center space-x-3 min-w-0 cursor-pointer hover:text-red-500"
                      >
                        <i class="uil uil-file text-xl text-gray-600"></i>
                        <span class="truncate w-3/4">{{
                          lampiran.lampiranName
                        }}</span>
                      </div>

                      <div class="flex space-x-3 flex-shrink-0 mr-2">
                        <!-- Preview -->
                        <button
                          @click="previewFile(lampiran)"
                          class="text-blue-500 hover:text-blue-700"
                          title="Preview"
                        >
                          <i class="uil uil-eye text-xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <p v-else class="text-gray-500 text-center">
                    No files uploaded.
                  </p>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end border-t">
          <div class="w-full bg-white pt-4 pb-4 p-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <!-- Textarea (col-span 3) -->
              <div class="md:col-span-3 flex flex-col">
                <textarea
                  id="evaluation_input"
                  rows="3"
                  v-model="evaluationText"
                  placeholder="Masukkan evaluasi..."
                  class="w-full p-3 pb= border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                ></textarea>
              </div>

              <!-- Select & Button (col-span 1) -->
              <div class="md:col-span-1 flex flex-col h-full justify-end">
                <div class="relative">
                  <button
                    @click="toggleSelectTagDropdown"
                    class="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-white text-center"
                  >
                    {{ selectedComponentTag || "Select Tag" }}
                  </button>

                  <div
                    v-if="dropdownComponentTag"
                    class="absolute w-full border rounded-md bg-white shadow-md max-h-40 overflow-y-auto z-50"
                  >
                    <div
                      v-for="component in componentTagList"
                      :key="component.componentId"
                      @click="selectComponentTag(component.componentTag)"
                      class="p-2 hover:bg-gray-200 cursor-pointer text-center"
                    >
                      {{ component.componentTag }}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  @click="storeEvaluation"
                  class="flex items-center justify-center px-10 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 mt-2"
                >
                  <i class="uil uil-plus text-lg mr-2"></i>
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Approve -->
        <div class="border-t flex justify-end mt-2">
          <div class="mt-4 pr-6 pt-2">
            <button
              @click="updateStatusProject('in review')"
              class="px-4 py-2 -[16px] text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Review
            </button>
            <button
              @click="closeProjectModal"
              class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Evaluation List  -->
  <div>
    <!-- Modal -->
    <div
      v-if="isEvaluationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="mt-14 relative w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Evaluasi</h5>
          <button
            @click="closeEvaluationModal"
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
                  Review
                </th>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Status
                </th>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Component
                </th>
                <th
                  class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="evaluation in evaluationList"
                :key="evaluation.evaluationId"
                class="dark:hover:shadow"
              >
                <td>
                  <div
                    class="flex items-center justify-start ps-[25px] pe-[25px] py-[8px]"
                  >
                    <label
                      :for="`todolist-todo-${evaluation.evaluationId}`"
                      class="todo-title text-[14px] font-normal leading-[25px] text-theme-gray dark:text-subtitle-dark capitalize"
                    >
                      <span
                        :class="{
                          'line-through':
                            evaluation.evaluationStatus === 'approve',
                        }"
                        >{{ evaluation.evaluationTaskComment }}</span
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
                          evaluation.evaluationStatus === 'approve',
                        'bg-red-100 text-red-700':
                          evaluation.evaluationStatus === 'rejected',
                        'bg-blue-100 text-blue-700':
                          evaluation.evaluationStatus === 'review',
                        'bg-gray-100 text-gray-700':
                          evaluation.evaluationStatus === 'draft',
                      }"
                    >
                      {{ evaluation.evaluationStatus }}
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
                        'bg-blue-100 text-blue-700':
                          evaluation.evaluationTag === 'image',
                        'bg-green-100 text-green-700':
                          evaluation.evaluationTag === 'title',
                        'bg-yellow-100 text-yellow-700':
                          evaluation.evaluationTag === 'description',
                        'bg-purple-100 text-purple-700':
                          evaluation.evaluationTag === 'point',
                        'bg-red-100 text-red-700':
                          evaluation.evaluationTag === 'address',
                        'bg-indigo-100 text-indigo-700':
                          evaluation.evaluationTag === 'tag',
                        'bg-gray-100 text-gray-700':
                          evaluation.evaluationTag === 'file attachment',
                        'bg-red-50 text-red-500':
                          evaluation.evaluationTag === 'timelines',
                        'bg-orange-100 text-orange-700':
                          evaluation.evaluationTag === 'date',
                        'bg-teal-100 text-teal-700':
                          evaluation.evaluationTag === 'amount',
                        'bg-cyan-100 text-cyan-700':
                          evaluation.evaluationTag === 'article',
                        'bg-emerald-100 text-emerald-700':
                          evaluation.evaluationTag === 'campaign',
                        'bg-amber-100 text-amber-700':
                          evaluation.evaluationTag === 'strategy',
                        'bg-lime-100 text-lime-700':
                          evaluation.evaluationTag === 'feedback',
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
                        ].includes(evaluation.evaluationTag), // Default color jika tidak ada di daftar
                      }"
                    >
                      {{ evaluation.evaluationTag }}
                    </span>
                  </div>
                </td>

                <td
                  class="px-[25px] font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]"
                >
                  <div class="flex justify-center items-center gap-x-2">
                    <!-- Approve Evaluation (Setujui) -->
                    <button
                      @click="
                        updateEvaluationStatus(
                          evaluation.evaluationId,
                          'approve'
                        )
                      "
                      class="py-1 px-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
                      title="Setujui Evaluasi"
                    >
                      <i class="uil uil-check-circle text-[14px]"></i>
                    </button>

                    <!-- Reject Evaluation (Tolak) -->
                    <button
                      @click="
                        updateEvaluationStatus(
                          evaluation.evaluationId,
                          'rejected'
                        )
                      "
                      class="py-1 px-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
                      title="Tolak Evaluasi"
                    >
                      <i class="uil uil-times-circle text-[14px]"></i>
                    </button>

                    <!-- Delete Evaluation (Hapus) -->
                    <button
                      @click="deleteEvaluationId(evaluation.evaluationId)"
                      class="px-2 py-1 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition"
                      title="Hapus Evaluasi"
                    >
                      <i class="uil uil-trash-alt text-[14px]"></i>
                    </button>
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
              @click="updateStatusProject('in progress')"
              class="px-4 py-2 -[16px] text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Approve
            </button>
            <button
              @click="closeEvaluationModal"
              class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
