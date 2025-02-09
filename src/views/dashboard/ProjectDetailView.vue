<script setup>
import { ref, onMounted, onBeforeMount, toRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-sugar.css';


//Toast Notification
const toastNotification = useToast();

const isConfirmationModalOpen = ref(false);
const isConfirmationInactiveModalOpen = ref(false);
const initialMap = ref(null);
const router = useRouter();
const route = useRoute();
const dropdownEvaluationId = ref();
// Reactive modal state
const isTagDropdownOpen = ref(false);
//
const userId =  JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).user_id : null;
const projectId = route.params.projectid;
console.log("project id : ", projectId);
const editModeFromProject = route.query.edit;
console.log('edit mode from quey : ', editModeFromProject);

//Data
const editMode = ref(editModeFromProject);

//Wilayah
const provinsiList = ref();
const kabupatenList = ref();
const kecamatanList = ref();
const desaList = ref();

//General
const iconList = ref();
const projectTagList = ref();
const selectedTags = ref([]);
const timelineList = ref();
const lampiranList = ref();
const timelineDetailList = ref([]);
const timelineDetailData = ref();
const evaluationList = ref();
const projectDetail = ref();
const projectModalData = ref({
  projectTitle: "",
  projectDescription: "",
  projectTags: [],
  projectImage: null,
  projectStartDate: null,
  projectEndDate: null,
});

// Modal
const isLocationModalOpen = ref(false);
const isTimelineModalOpen = ref(false);
const isProjectModalOpen = ref(false); //General Form
const isFileModalOpen = ref(false);

//State Reference
const isUpdating = ref(false);

const selectedTimeline = ref({
  timelineIdStore: "",
  timelineId: "",
  timelineDetailId: "",
});

const activityData = ref({
  date: "",
  time: "",
  action: "",
  icon: "",
  iconName: "",
});

const isDateSelected = ref(false);

const disableSelectDate = () => {
  isDateSelected.value = !isDateSelected.value;
};

//Open Modal
const openGeneralModal = (value) => {
  console.log(value);
  switch (value) {
    case "general":
      isProjectModalOpen.value = true;
      break;
    case "timeline":
      isTimelineModalOpen.value = true;
      break;
    case "file":
      isFileModalOpen.value = true;
      break;
    case "lokasi":
      isLocationModalOpen.value = true;
      break;
    default:
      isTimelineModalOpen.value = false;
      isLocationModalOpen.value = false;
      isProjectModalOpen.value = false;
      isFileModalOpen.value = false;
  }
};

const openConfirmationModal = () => {
  isConfirmationModalOpen.value = true;
};

const closeConfirmationModal = () => {
  isConfirmationModalOpen.value = false;
};

const openConfirmationInactiveModal = () => {
  isConfirmationInactiveModalOpen.value = true;
};

const closeConfirmationInactiveModal = () => {
  isConfirmationInactiveModalOpen.value = false;
};

// Close modal function
const closeFileModal = () => {
  isFileModalOpen.value = false;
};

const closeTimelineModal = () => {
  isTimelineModalOpen.value = false;
  resetSelectedTimeline();
  resetActivityData();
};

const closeLocationModal = () => {
  isLocationModalOpen.value = false;
};

const closeProjectModal = () => {
  isProjectModalOpen.value = false;
};

// Fungsi reset data
const resetActivityData = () => {
  activityData.value = {
    date: "",
    time: "",
    action: "",
    icon: "",
    iconName: "",
  };
};

const resetSelectedTimeline = () => {
  selectedTimeline.value = {
    timelineId: "",
    timelineDetailId: "",
    timelineIdStore: "",
  };
};

const resetLocationForm = () => {
  locationForm.value = {
    address: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    latitude: "",
    longitude: "",
  };
};

// Mengubah mode (Add / Update)
const setMode = (updateMode) => {
  isUpdating.value = updateMode;
  isDateSelected.value = false;
  resetSelectedTimeline();
  resetActivityData();
};

const storeTimeline = async () => {
  try {
    if (!isUpdating.value) {
      const newData = [
        {
          timeline_date: formatDate(activityData.value.date),
          timeline_detail: [
            {
              description: activityData.value.action,
              time: activityData.value.time,
              icon_id: activityData.value.icon,
            },
          ],
        },
      ];

      const response = await axios.post(
        `http://localhost:8000/api/v1/test-project-timeline/${projectId}`,
        newData
      );

      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        openNotificatication(`Timeline ${activityData.value.date} Berhasil Dibuat`)
        // closeActivityModal();
        getTimeline(); // Refresh data
      }
    }

    resetSelectedTimeline();
    resetActivityData();
  } catch (error) {
    console.error("Error saving activity:", error);
  }
};

const storeTimelineDetail = async () => {
  try {
    if (!isUpdating.value) {
      const formData = new FormData();
      formData.append("description", activityData.value.action);
      formData.append("icon_id", activityData.value.icon);
      formData.append("time", activityData.value.time);

      const response = await axios.post(
        `http://localhost:8000/api/v1/test-project-timeline-detail/${selectedTimeline.value.timelineIdStore}`,
        formData
      );

      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        openNotificatication(`Detail Timeline Berhasil Ditambahkan`);
        // closeActivityModal();
        getTimeline(); // Refresh data
      }
    }

    resetSelectedTimeline();
    resetActivityData();
  } catch (error) {
    console.error("Error saving activity:", error);
  }
};

// Simpan Timeline (Add atau Update)
const updateTimeline = async () => {
  console.log("activityData :", activityData.value);
  console.log("timelineid : ", selectedTimeline.value.timelineId);
  console.log("timelinedetailid : ", selectedTimeline.value.timelineDetailId);
  console.log("activityData sebelum dikirim:", activityData.value);
  console.log("description:", activityData.value.action);
  console.log("icon_id:", activityData.value.icon);

  try {
    if (isUpdating.value) {
      const formData = new FormData();
      formData.append("project_timeline_id", selectedTimeline.value.timelineId);
      formData.append(
        "project_timeline_detail_id",
        selectedTimeline.value.timelineDetailId
      );
      formData.append("timeline_date", formatDate(activityData.value.date));
      formData.append("description", activityData.value.action);
      formData.append("icon_id", activityData.value.icon);
      formData.append("time", activityData.value.time);
      formData.append("_method", "PUT");

      const response = await axios.post(
        `http://localhost:8000/api/v1/test-project-timeline-update-id/${projectId}`,
        formData
      );

      if (response.status == 200 || response.status == 201) {
        console.log(response.data);
        openNotificatication(`Timeline ${activityData.value.date} Berhasil Diupdate`);
        // closeActivityModal();
        getTimeline(); // Refresh data
      }
    }

    resetSelectedTimeline();
  } catch (error) {
    console.error("Error saving activity:", error);
  }
};

const populateTimelineDetail = (selectedTimelineId) => {
  const filteredTimelines = timelineList.value.filter(
    (item) => item.timelineId === selectedTimelineId
  );

  // Gabungkan semua details dari semua timeline yang cocok
  timelineDetailList.value = filteredTimelines.flatMap((timeline) =>
    toRaw(timeline.details)
  );

  // console.log("detail :", timelineDetailList.value);

  selectedTimeline.value.timelineId = selectedTimelineId;
  console.log(selectedTimeline.value);
};

const populateTimelineDetailData = (selectedTimelineDetailId) => {
  const timelineDataDetail = timelineDetailList.value.find(
    (item) => item.timelineDetailId === selectedTimelineDetailId
  );

  console.log("ss ", toRaw(timelineDataDetail));
  const timelineData = toRaw(timelineDataDetail);
  console.log("ssss :", timelineData.timelineDetailIcon);
  activityData.value.date = timelineData.timelineDateFull;
  activityData.value.action = timelineData.timelinenDetailAction;
  activityData.value.time = timelineData.timelineDetailTime;
  activityData.value.icon = timelineData.timelineDetailIconId;
  activityData.value.iconName = timelineData.timelineDetailIconName;

  timelineDetailData.value = toRaw(timelineDataDetail);

  // console.log("ssss : ", timelineDetailData.value.timelinenDetailAction);
  selectedTimeline.value.timelineDetailId = selectedTimelineDetailId;

  console.log(selectedTimeline.value);
};
// New Activity Template
const newActivity = ref({
  date: "",
  time: "",
  action: "",
  icon: "",
});

// Modal Function
const closeActivityModal = () => {
  isActivityModalOpen.value = false;
};

const locationForm = ref({
  address: "",
  provinsi: "",
  kabupaten: "",
  kecamatan: "",
  desa: "",
  latitude: "",
  longitude: "",
});

const updateLocation = async () => {
  console.log("Location Form Data:", locationForm.value);

  const formData = new FormData();
  formData.append("kode_desa", locationForm.value.desa);
  formData.append("project_addres", locationForm.value.address);
  formData.append("latitude", locationForm.value.latitude);
  formData.append("longitude", locationForm.value.longitude);

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/test-project-update-location-id/${projectId}`, // Perbaiki URL
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
    if (response.status === 200) {
      getProjectDetail();
      resetLocationForm();
      closeLocationModal();
      openNotificatication(`Lokasi Project Berhasil Diupdate`);
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

// Toggle dropdown visibility
const toggleTagDropdown = () => {
  isTagDropdownOpen.value = !isTagDropdownOpen.value;
};

//Toggle Edit Mode
const toggleEditMode = () => {
  editMode.value = !editMode.value;
};

// Toggle tag selection
const toggleTagSelection = (tag) => {
  const tagExists = selectedTags.value.some((t) => t.tagId === tag.tagId);

  if (tagExists) {
    selectedTags.value = selectedTags.value.filter(
      (t) => t.tagId !== tag.tagId
    );
  } else {
    selectedTags.value.push(tag);
  }
};

const isTagSelected = (tag) => {
  return selectedTags.value.some((t) => t.tagId === tag.tagId);
};

const checkIncludeTag = (tag) => {
  const tagExist = projectModalData.value.projectTags.find(
    (t) => t.tag_name === tag.tagName
  );

  if (tagExist) {
    // Cek apakah tag sudah ada di selectedTags sebelum menambahkannya

    return true;
  }

  return false;
};

const saveChangeEvaluation = async () => {
  console.log("save change evaluation");
  console.log("evaluationList : ", evaluationList.value);

  try {
    const evaluationData = evaluationList.value.map((evaluation) => ({
      project_evaluation_id: evaluation.evaluationId,
      project_evaluation_check: evaluation.evaluationChecked,
    }));

    console.log("evaluationData : ", evaluationData);

    const response = await axios.put(
      `http://localhost:8000/api/v1/test-project-evaluation-id/${projectId}`,
      evaluationData, // Kirim langsung sebagai JSON
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      console.log("Update Success:", response.data);
      openNotificatication('List Evaluasi Berhasil Diupdate');
    }
  } catch (error) {
    console.error("Error updating evaluation:", error);
  }
};

const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
};

// Submit form function
const updateProjectDetail = async () => {
  // Pastikan `projectTags` adalah array objek yang benar
  projectModalData.value.projectTags = selectedTags.value.map((tag) => ({
    tagId: tag.tagId,
    tagName: tag.tagName,
  }));

  

  console.log("ProjectModalData:", projectModalData.value);

  // Buat FormData
  const formData = new FormData();
  formData.append("project_title", projectModalData.value.projectTitle);
  formData.append(
    "project_description",
    projectModalData.value.projectDescription
  );
  formData.append(
    "start_date",
    formatDate(projectModalData.value.projectStartDate)
  );
  formData.append(
    "end_date",
    formatDate(projectModalData.value.projectEndDate)
  );
  if (projectModalData.value.projectImage instanceof File) {
    formData.append("project_image", projectModalData.value.projectImage);
  }

  // Konversi array `projectTags` ke JSON string agar bisa dikirim dalam FormData
  // Menambahkan array project_tags ke FormData
  if (projectModalData.value.projectTags.length !== 0) {
    projectModalData.value.projectTags.forEach((tag, index) => {
    formData.append(`project_tags[${index}][tagId]`, tag.tagId);
    formData.append(`project_tags[${index}][tagName]`, tag.tagName);
  });

}

  formData.append("_method", "PUT");

  try {
    const response = await axios.post(
      `http://localhost:8000/api/v1/test-project-update-id/${projectId}`, // Perbaiki URL
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);
    if (response.status === 200) {
      // Perbarui projectDetail setelah update berhasil
      // const newData = response.data.project_detail.map((project) => ({

      // }))
      openNotificatication(`Project ${projectId} Berhasil Diupdate`);
      getProjectDetail();
      closeProjectModal();
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }

  console.log("Form data submitted:", projectModalData.value);
};

// Handle file upload
const handleFileUpload = (event) => {
  projectModalData.value.projectImage = event.target.files[0];
};

const toggleEvaluation = (todoId) => {
  dropdownEvaluationId.value =
    dropdownEvaluationId.value === todoId ? null : todoId;
};

const closeDropdownOnClickOutside = (event) => {
  if (
    !event.target.closest("[data-dropdown-button]") &&
    !event.target.closest("[data-dropdown-content]")
  ) {
    dropdownEvaluationId.value = null;
  }
};

//Fungsional Method

// Fungsi untuk membuka file di tab baru
const previewFile = (lampiran) => {
  window.open(lampiran.lampiranUrl, "_blank");
};

// Fungsi untuk menambahkan file baru
const addFile = () => {
  console.log("tambah file");
  // Trigger input file
  const fileInput = document.getElementById("file-upload");

  fileInput.onchange = null;

  fileInput.click();

  fileInput.onchange = async (event) => {
    const newFile = event.target.files[0];
    if (!newFile) {
      console.error("No file selected.");
      return;
    }

    console.log("tambah : ", newFile);

    // Buat FormData
    const formData = new FormData();
    formData.append("project_lampiran[]", newFile); // Pastikan nama field sesuai di Laravel
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/test-project-lampiran/${projectId}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // **Tambahkan ke lampiranList setelah sukses**
      if (response.status == 201) {
        openNotificatication('Lampiran Berhasil Ditambahkan');
        getLampiran();
        console.log("lampiranList updated: ", lampiranList.value);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

// Fungsi untuk mengganti file yang sudah ada
const updateFile = async (lampiranId) => {
  console.log("index : ", lampiranId);

  // Trigger input file
  const fileInput = document.getElementById("file-upload");

  fileInput.onchange = null;

  fileInput.click();

  fileInput.onchange = async (event) => {
    const newFile = event.target.files[0];
    if (!newFile) {
      console.error("No file selected.");
      return;
    }

    console.log("filebaru : ", newFile);

    // Buat FormData
    const formData = new FormData();
    formData.append("project_lampiran", newFile); // Pastikan nama field sesuai di Laravel
    formData.append("_method", "PUT"); // Laravel membutuhkan ini untuk PUT method dengan FormData

    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/test-project-update-lampiran/${projectId}/${lampiranId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("respon lampiran update: ", response.data);
      // **Update lampiranList setelah sukses**
      if (response.status == 200) {
        getLampiran();
        openNotificatication(`Lampiran ${lampiranId} Berhasil Diupdate`);
        console.log("lampiranList updated: ", lampiranList.value);
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
};


const openNotificatication = (message) => {
  toastNotification.open({
    type: 'success',
    message: message,
    position: 'top-right',
    duration: 3000,
  });
}

//Change Status Project to In active
const updateStatusProject = async () => {
  console.log("ubah status");
  try {
    const response = await axios.put(
      `http://localhost:8000/api/v1/test-project-status-id/${projectId}`
    );

    if (response.status == 200) {
      console.log("response status", response.data);
    }

    openNotificatication(`Status Project ${projectId} berhasil Diupdate`);
    getProjectDetail();
  } catch (error) {
    console.error(error.response);
  }

  isConfirmationInactiveModalOpen.value = false;
};

//Hapus Project
const deleteProjectId = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/v1/test-project-delete/${projectId}`
    );
    console.log(response.data);
    if (response.status == 200) {
      openNotificatication(`Project ${projectId} Berhasil Dihapus`);
      setTimeout(() => {
        router.push("/dashboard/project");
      }, 200);
    }
  } catch (error) {
    console.error(error.response);
  }
};

// Fungsi untuk menghapus file
const deleteFile = async (lampiranId) => {
  try {
    const responses = await axios.delete(
      `http://localhost:8000/api/v1/test-project-lampiran/${projectId}/${lampiranId}`
    );
    console.log("lampiran : ", responses.data);

    if (responses.status == 200) {
      getLampiran();
      openNotificatication(`lampiran ${lampiranId} Berhasil Dihapus`);
      console.log("new lampiran list : ", lampiranList.value);
    }

    console;
  } catch (error) {
    console.error(error.response.data);
  }
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
      `http://localhost:8000/api/v1/test-project-id/${userId}/${projectId}`
    );
    console.log(responses.data);
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
      projectCreatorName: project.project_creator_name,
      projectKodeDesa: project.project_kode_desa,
      projectPointLatitude: project.project_latitude,
      projectPointlongitude: project.project_longitude,
      projectCategory: project.project_category,
    }));

    projectDetail.value = projectdetailList[0];
    projectModalData.value.projectTitle = projectdetailList[0].projectTitle;
    projectModalData.value.projectDescription =
      projectdetailList[0].projectDescription;
    projectModalData.value.projectStartDate =
      projectdetailList[0].projectStartDateFull;
    projectModalData.value.projectEndDate =
      projectdetailList[0].projectEndDateFull;
    projectModalData.value.projectTags = projectdetailList[0].projectTags;
    projectModalData.value.projectImage = projectdetailList[0].projectImage;

    // selectedTags.value = projectdetailList[0].projectTags.map((tag) => tag.tagName);

    console.log("pmd : ", projectModalData.value);

    initialMapLayer();
  } catch (error) {
    console.error("error Fetch Project : ", error);
  }
};

// get Evaluation
const getTimeline = async () => {
  try {
    const responses = await axios.get(
      `http://localhost:8000/api/v1/test-project-timeline-id/${projectId}`
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

//get Evaluation
const getEvaluationList = async () => {
  try {
    const responses = await axios.get(
      `http://localhost:8000/api/v1/test-project-evaluation-id/${projectId}`
    );

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

//getProvince
const getProvinsi = async () => {
  try {
    const responses = await axios.get(
      "http://localhost:8000/api/v1/test-location-provinsi"
    );

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

//Get Kecamatan
const getKabupaten = async (kodeProvinsi) => {
  try {
    const responses = await axios.get(
      `http://localhost:8000/api/v1/test-location-kabupaten/${kodeProvinsi}`
    );
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

//Get Kabupaten
const getKecamatan = async (kodeKabupaten) => {
  try {
    console.log(kodeKabupaten);
    const responses = await axios.get(
      `http://localhost:8000/api/v1/test-location-kecamatan/${kodeKabupaten}`
    );
    console.log(responses.data);

    const kecamatanLists = responses.data.kecamatan.map((kecamatan) => ({
      kodeKecamatan: kecamatan.kode_kecamatan,
      namaKecamatan: kecamatan.nama_kecamatan,
    }));

    kecamatanList.value = kecamatanLists;
  } catch (error) {
    console.error(
      error.response.data ? error.response.data : "Error Fetching Provinsi"
    );
  }
};

//Get Desa
const getDesa = async (kodeKecamatan) => {
  try {
    const responses = await axios.get(
      `http://localhost:8000/api/v1/test-location-desa/${kodeKecamatan}`
    );
    console.log(responses.data);

    const desaLists = responses.data.desa.map((desa) => ({
      kodeDesa: desa.kode_desa,
      namaDesa: desa.nama_desa,
    }));

    desaList.value = desaLists;
  } catch (error) {
    console.error(
      error.response.data ? error.response.data : "Error Fetching Provinsi"
    );
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

const getProjectTagsList = async () => {
  try {
    const responses = await axios.get(
      "http://localhost:8000/api/v1/test-project-tag"
    );

    const tagLists = responses.data.project_tags.map((tag) => ({
      tagId: tag.tag_id,
      tagName: tag.tag_name,
      tagSlug: tag.tag_slug,
      tagColor: tag.tag_color,
    }));

    projectTagList.value = tagLists;

    console.log("tag bos ", projectTagList.value);
  } catch (error) {
    console.error(error);
  }
};

const getIconList = async () => {
  try {
    const responses = await axios.get("http://localhost:8000/api/v1/test-icon");

    const iconLists = responses.data.icons.map((icon) => ({
      iconId: icon.icon_id,
      icon: icon.icon,
      iconName: icon.icon_name,
      iconBackground: icon.icon_background,
    }));

    iconList.value = iconLists;

    console.log("woy ", iconList.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getProjectDetail();
  getLampiran();
  getProvinsi();
  getIconList();
  getProjectTagsList();
  getEvaluationList();
  getTimeline();
  document.addEventListener("click", closeDropdownOnClickOutside);
});

onBeforeMount(() => {
  document.removeEventListener("click", closeDropdownOnClickOutside);
});
</script>

<template>
  <main class="bg-normalBG dark:bg-main-dark">
    <div
      class="mx-[30px] min-h-[calc(100vh-195px)] mb-[30px] ssm:mt-[30px] mt-[15px]"
    >
      <div
        class="flex items-center md:justify-between justify-center max-md:flex-col max-sm:flex-wrap gap-x-[30px] gap-y-[15px]"
      >
        <div
          class="inline-flex items-center flex-wrap gap-x-[30px] gap-y-[15px] max-md:justify-center"
        >
          <h1
            class="text-dark dark:text-title-dark text-[20px] font-semibold mb-0"
          >
            Application UI Design
          </h1>
          <div
            class="flex items-center max-xs:flex-wrap max-xs:justify-center gap-x-[10px] gap-y-[5px]"
          >
            <button
              type="button"
              class="flex items-center px-[15px] text-[12px] text-white rounded-[5px] font-semibold bg-primary border-1 border-primary h-[35px] gap-[6px] transition-[0.3s] capitalize whitespace-nowrap hover:bg-primary-hbr"
            >
              <i class="uil uil-plus text-[14px]"></i>
              <span class="m-0 text-[14px]">Create Project</span>
            </button>
            <button
              v-if="projectDetail?.projectStatus !== 'in active'"
              @click="openConfirmationInactiveModal"
              class="inline-flex items-center justify-center w-full px-[15px] h-[35px] gap-[7px] border-1 rounded-[5px] cursor-pointer whitespace-nowrap border-normal bg-white text-body dark:text-title-dark dark:bg-box-dark-up dark:border-box-dark-up"
            >
              <i class="uil uil-check text-[15px]"></i>
              <span class="text-sm"> Mark As In-Active </span>
            </button>

            <div v-if="projectDetail?.projectStatus === 'in active'">
              <label
                for="react-option"
                class="border-gray-200 bg-gray-500 text-white inline-flex items-center justify-center w-full px-[15px] h-[35px] gap-[7px] border-1 rounded-[5px] peer-checked:border-success peer-checked:bg-success peer-checked:text-white dark:text-title-dark dark:bg-box-dark-up dark:border-box-dark-up whitespace-nowrap hover:bg-white hover:text-black"
              >
                <i class="uil uil-check text-[15px]"></i>
                <div class="block">
                  <div class="w-full text-sm">In Active</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-x-[6px] gap-y-[3px]">
          <button
            @click="toggleEditMode"
            type="button"
            class="flex items-center px-[15px] text-[12px] text-dark dark:text-title-dark rounded-[6px] font-semibold bg-white dark:bg-box-dark-up border-1 border-white dark:border-box-dark-up h-[35px] gap-[6px] transition-[0.3s] capitalize whitespace-nowrap"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <i v-if="!editMode" class="uil uil-edit-alt text-[14px]"></i>
            <i v-if="editMode" class="uil uil-save text-[14px]"></i>

            <span class="m-0">{{ editMode ? "Save" : "Edit" }}</span>
          </button>
          <button
            type="button"
            class="flex items-center px-[15px] text-[12px] text-danger rounded-[6px] font-semibold bg-white dark:bg-box-dark-up border-1 border-white dark:border-box-dark-up h-[35px] gap-[6px] transition-[0.3s] capitalize whitespace-nowrap"
            data-te-ripple-init
            data-te-ripple-color="light"
            @click="openConfirmationModal"
          >
            <i class="uil uil-edit-alt text-[14px]"></i>
            <span class="m-0">Delete Project</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-12 sm:gap-[25px] gap-y-[25px] mt-[30px]">
        <div class="col-span-12 2xl:col-span-3 md:col-span-5">
          <div
            class="px-[25px] pt-[20px] pb-[23px] bg-success rounded-xl mb-[25px]"
          >
            <div class="flex justify-between mb-[17px]">
              <h6
                class="text-white dark:text-title-dark font-medium text-[16px] capitalize"
              >
                progress
              </h6>
              <span
                class="text-white dark:text-title-dark font-medium text-[16px] capitalize"
                >{{ projectDetail?.projectProgressPercentage }}%</span
              >
            </div>
            <div
              class="flex items-center gap-x-[10px] gap-y-[5px] flex-wrap text-[14px] font-normal text-body dark:text-title-dark"
            >
              <div
                class="h-[8px] flex-1 w-[185px] overflow-hidden bg-white/30 rounded-[20px]"
              >
                <div
                  class="h-[8px] bg-white rounded-e-[20px]"
                  :style="{
                    width: `${projectDetail?.projectProgressPercentage}%`,
                  }"
                ></div>
              </div>
            </div>
          </div>
          <div
            class="bg-white dark:bg-box-dark p-[25px] rounded-10 gap-[25px] flex flex-wrap flex-col"
          >
            <div class="flex items-center gap-x-[20px] gap-y-[10px]">
              <div
                class="bg-primary/10 flex h-[60px] items-center justify-center rounded-xl text-primary w-[60px]"
              >
                <i class="text-[26px] uil uil-list-ul"></i>
              </div>
              <div>
                <h1
                  class="text-dark dark:text-title-dark text-[20px] font-semibold mb-[3px] capitalize"
                >
                   {{ projectDetail?.projectDonaturAmount }} 
                </h1>
                <p class="mb-0 capitalize text-body dark:text-subtitle-dark">
                  {{
                    projectDetail?.projectCategory === "donation"
                      ? "Donasi"
                      : "Volunteer"
                  }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-x-[20px] gap-y-[10px]">
              <div
                class="bg-secondary/10 flex h-[60px] items-center justify-center rounded-xl text-secondary w-[60px]"
              >
                <i class="text-[26px] uil uil-chart-pie"></i>
              </div>
              <div>
                <h1
                  class="text-dark dark:text-title-dark text-[20px] font-semibold mb-[3px] capitalize"
                >
                  {{ projectDetail?.projectDiffDay }}
                </h1>
                <p class="mb-0 capitalize text-body dark:text-subtitle-dark">
                  Hari Tersisa
                </p>
              </div>
            </div>

            <div class="flex items-center gap-x-[20px] gap-y-[10px]">
              <div
                class="bg-success/10 flex h-[60px] items-center justify-center rounded-xl text-success w-[60px]"
              >
                <i class="text-[26px] uil uil-money-withdraw"></i>
              </div>
              <div>
                <h1
                  class="text-dark dark:text-title-dark text-[20px] font-semibold mb-[3px] capitalize"
                >
                  {{ projectDetail?.projectCategory === 'donation' ? 'Rp ' : ''}} {{ projectDetail?.projectTargetAmount }}
                </h1>
                <p class="mb-0 capitalize text-body dark:text-subtitle-dark">
                  Target
                  {{
                    projectDetail?.projectCategory === "donation"
                      ? "Donasi"
                      : "Volunteer"
                  }}
                </p>
              </div>
            </div>

            <div
              v-if="projectDetail?.projectCategory === 'donation'"
              class="flex items-center gap-x-[20px] gap-y-[10px]"
            >
              <div
                class="bg-warning/10 flex h-[60px] items-center justify-center rounded-xl text-warning w-[60px]"
              >
                <i class="text-[26px] uil uil-bell"></i>
              </div>
              <div>
                <h1
                  class="text-dark dark:text-title-dark text-[20px] font-semibold mb-[3px] capitalize"
                >
                  Rp {{ projectDetail?.projectProgressAmount }}
                </h1>
                <p class="mb-0 capitalize text-body dark:text-subtitle-dark">
                  Total Donasi
                </p>
              </div>
            </div>
          </div>
          <div
            class="mt-5 pb-6 text-base bg-white dark:bg-box-dark p-4 rounded-lg gap-3 flex flex-col shadow-sm"
          >
            <div
              class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative mb-[25px]"
            >
              <div class="w-full flex justify-between items-center">
                <!-- Judul -->
                <h3
                  class="py-3 px-6 text-lg font-semibold text-dark dark:text-title-dark"
                >
                  Tags
                </h3>

                <!-- Ikon -->
                <i
                  @click="openGeneralModal('general')"
                  v-if="editMode"
                  class="uil uil-edit-alt text-[14px] mr-6 cursor-pointer"
                ></i>
              </div>
              <div class="p-[15px] flex items-center gap-[15px] flex-wrap">
                <div
                  v-for="tag in projectDetail?.projectTags"
                  :key="tag"
                  data-te-chip-init
                  data-te-ripple-init
                  class="[word-wrap: break-word] flex cursor-pointer items-center justify-between rounded-[5px] bg-deepBG px-[10px] py-[4px] text-[15px] font-medium capitalize leading-[1.4] text-body shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-box-dark-up dark:text-neutral-200"
                >
                  {{ tag.tagName }}
                  <span
                    data-te-chip-close
                    class="float-right w-4 cursor-pointer ps-[5px] text-[10px] text-light opacity-[.53] transition-all duration-200 ease-in-out hover:text-dark dark:text-neutral-400 dark:hover:text-neutral-100"
                  >
                    <i class="uil uil-multiply"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Body Content  -->
        <div class="col-span-12 2xl:col-span-6 md:col-span-7">
          <div class="bg-white dark:bg-box-dark rounded-[10px] h-full">

            <div class="w-full flex justify-end items-center">
              <!-- Ikon -->
              <i
                @click="openGeneralModal('general')"
                v-if="editMode"
                class="uil uil-edit-alt text-[14px] mr-10 mt-4 cursor-pointer"
              ></i>
            </div>
            <div
              :class="{
                'py-[10px]': editMode,
              }"
              class="px-[25px] py-[20px] border-b border-regular dark:border-box-dark-up"
            >
              <h1
                class="m-0 text-lg font-semibold text-dark dark:text-title-dark"
              >
                {{ projectDetail?.projectTitle }}
              </h1>
            </div>

            <div class="p-4">
              <!-- Gambar dengan ukuran proporsional dan padding -->
              <img
                :src="projectDetail?.projectImage"
                alt="Project Image"
                class="object-cover w-full max-h-[300px] rounded-[10px]"
              />
            </div>
            <div class="p-[25px]">
              <div>
                <p
                  class="text-body dark:text-subtitle-dark mb-[20px] leading-[1.6666666667] text-[15px] font-normal"
                >
                  {{ projectDetail?.projectDescription }}
                </p>
              </div>
              <div
                class="flex items-center mt-[25px] gap-x-20 gap-y-[15px] flex-wrap"
              >
                <div>
                  <span
                    class="mb-[3px] block text-light dark:text-subtitle-dark text-[13px]"
                    >Project Owner</span
                  >
                  <p class="font-medium text-body dark:text-subtitle-dark">
                    {{ projectDetail?.projectCreatorName }}
                  </p>
                </div>
                <div>
                  <span
                    class="mb-[3px] block text-light dark:text-subtitle-dark text-[13px]"
                    >Target</span
                  >
                  <p class="font-medium text-body dark:text-subtitle-dark">
                    {{ projectDetail?.projectCategory === 'donation' ? 'Rp ' : '' }} {{ projectDetail?.projectTargetAmount }} {{ projectDetail?.projectCategory === 'donation' ? '' : ' p' }}
                  </p>
                </div>
                <div>
                  <span
                    class="mb-[3px] block text-light dark:text-subtitle-dark text-[13px]"
                    >Start Date</span
                  >
                  <p class="font-medium text-primary">
                    {{ projectDetail?.projectStartDate }} 
                  </p>
                </div>
                <div>
                  <span
                    class="mb-[3px] block text-light dark:text-subtitle-dark text-[13px]"
                    >Deadline</span
                  >
                  <p class="font-medium text-danger">
                    {{ projectDetail?.projectEndDate }}
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <!-- <h4
                  class="text-base font-medium text-dark dark:text-title-dark mb-4"
                >
                  File Attached
                </h4> -->
                <div class="w-full flex justify-between items-center">
                  <!-- Judul -->
                  <h4
                    class="text-base font-medium text-dark dark:text-title-dark mb-4"
                  >
                    File Attached
                  </h4>

                  <!-- Ikon -->
                  <i
                    @click="openGeneralModal('file')"
                    v-if="editMode"
                    class="uil uil-edit-alt text-[14px] mr-4 cursor-pointer"
                  ></i>
                </div>
                <ul class="space-y-4">
                  <li
                    v-for="lampiran in lampiranList"
                    class="flex items-center justify-between p-3 bg-gray-100 dark:bg-box-dark-up rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-box-dark transition"
                  >
                    <div class="flex items-center gap-4">
                      <i class="ui uil-file"></i>

                      <a
                        href="#"
                        class="text-sm font-medium text-dark dark:text-title-dark hover:underline"
                        download="file2.pdf"
                      >
                        {{ lampiran.lampiranName }}
                      </a>
                    </div>
                    <button
                      class="text-sm text-white bg-primary hover:bg-primary-dark px-3 py-1 rounded-lg shadow-sm transition"
                      @click="previewFile(lampiran)"
                    >
                      Preview
                    </button>
                  </li>
                </ul>
              </div>
              
            </div>

            <p v-if="!lampiranList?.length" class="text-sm text-gray-400 text-center">Belum ada Lampiran</p>

          </div>

        </div>
        <!-- Donatur  -->
        <div class="col-span-12 2xl:col-span-3">
          <!-- Top Donatur Section -->
          <div
            class="bg-white hidden dark:bg-box-dark min-h-[482px] rounded-[10px]"
          >
            <div
              class="flex items-center justify-between px-[25px] py-3 border-b border-regular dark:border-box-dark-up"
            >
              <h3
                class="m-0 text-lg font-semibold text-dark dark:text-title-dark"
              >
                Top Donatur
              </h3>
            </div>
            <div class="flex flex-col gap-y-[25px] p-[25px]">
              <div class="flex items-center gap-x-[15px]">
                <div>
                  <img
                    alt="avatar"
                    class="object-cover w-[45px] h-[45px] rounded-full"
                    src="../../assets/images/avatars/t5.png"
                  />
                </div>
                <div>
                  <h6
                    class="text-dark dark:text-title-dark text-sm font-semibold mb-0.5"
                  >
                    Meyri Carles
                  </h6>
                  <p
                    class="mb-0 text-light dark:text-subtitle-dark text-[14px] font-normal"
                  >
                    Web Developer
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-x-[15px]">
                <div>
                  <img
                    alt="avatar"
                    class="object-cover w-[45px] h-[45px] rounded-full"
                    src="../../assets/images/avatars/t1.jpg"
                  />
                </div>
                <div>
                  <h6
                    class="text-dark dark:text-title-dark text-sm font-semibold mb-0.5"
                  >
                    Tuhin Molla
                  </h6>
                  <p
                    class="mb-0 text-light dark:text-subtitle-dark text-[14px] font-normal"
                  >
                    Project Manager
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-x-[15px]">
                <div>
                  <img
                    alt="avatar"
                    class="object-cover w-[45px] h-[45px] rounded-full"
                    src="../../assets/images/avatars/t2.jpg"
                  />
                </div>
                <div>
                  <h6
                    class="text-dark dark:text-title-dark text-sm font-semibold mb-0.5"
                  >
                    Billal Hossain
                  </h6>
                  <p
                    class="mb-0 text-light dark:text-subtitle-dark text-[14px] font-normal"
                  >
                    App Developer
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-x-[15px]">
                <div>
                  <img
                    alt="avatar"
                    class="object-cover w-[45px] h-[45px] rounded-full"
                    src="../../assets/images/avatars/t3.jpg"
                  />
                </div>
                <div>
                  <h6
                    class="text-dark dark:text-title-dark text-sm font-semibold mb-0.5"
                  >
                    Khalid Hasan
                  </h6>
                  <p
                    class="mb-0 text-light dark:text-subtitle-dark text-[14px] font-normal"
                  >
                    App Developer
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-x-[15px]">
                <div>
                  <img
                    alt="avatar"
                    class="object-cover w-[45px] h-[45px] rounded-full"
                    src="../../assets/images/avatars/t4.jpg"
                  />
                </div>
                <div>
                  <h6
                    class="text-dark dark:text-title-dark text-sm font-semibold mb-0.5"
                  >
                    Meyri Carles
                  </h6>
                  <p
                    class="mb-0 text-light dark:text-subtitle-dark text-[14px] font-normal"
                  >
                    UI Designer
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline  -->
          <div
            class="block opacity-100 bg-white pb-5"
            id="tabs-activities"
            role="tabpanel"
            aria-labelledby="tabs-activities-tab"
          >
            <div class="w-full flex justify-between items-center">
              <!-- Judul -->
              <h3
                class="py-3 px-6 text-lg font-semibold text-dark dark:text-title-dark"
              >
                Timelines
              </h3>

              <!-- Ikon -->
              <i
                @click="openGeneralModal('timeline')"
                v-if="editMode"
                class="uil uil-edit-alt text-[14px] mr-10 cursor-pointer"
              ></i>
            </div>

            <div class="max-h-[378px] scrollbar overflow-y-auto p-[20px]">
              <div
                v-for="timeline in timelineList"
                :key="timeline.timelineId"
                class="pb-5 mb-5 border-b border-regular dark:border-white/10 last:border-none last:mb-0"
              >
                <div class="flex items-center gap-x-[15px] gap-y-[5px]">
                  <div
                    class="flex items-center justify-center flex-col bg-regularBG dark:bg-white/10 h-full border dark:border-white/10 rounded-[10px] min-h-[20px] p-[4px] min-w-[65px]"
                  >
                    <!-- Adjusted text sizes -->
                    <h1
                      class="mb-0 text-sm font-semibold uppercase text-dark dark:text-white/60"
                    >
                      {{ timeline.timelineDate.timelineDateDay }}
                    </h1>
                    <span
                      class="capitalize text-xs text-body dark:text-white/60"
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
                          class="flex items-center justify-center w-6 h-6 rounded-full"
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
                          class="mb-0 -mt-1 text-sm font-medium  text-dark dark:text-white/60"
                        >
                          <!-- {{ detail.name }} -->
                          <span
                            class="mx-0.5 text-body dark:text-white/60 font-normal"
                            >{{ detail.timelinenDetailAction }}</span
                          >
                          <!-- {{ detail.target }} -->
                        </h1>
                        <p
                          class="mb-0 text-xs capitalize text-light-extra dark:text-white/60"
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
          <!-- End of Timeline  -->

          <!-- Lokasi Proyek Section -->
          <div class="bg-white dark:bg-box-dark rounded-lg mt-6 p-6">
            <div class="w-full flex justify-between items-center">
              <!-- Judul -->
              <h3
                class="py-3 text-lg font-semibold text-dark dark:text-title-dark"
              >
                Lokasi Project
              </h3>

              <!-- Ikon -->
              <i
                @click="openGeneralModal('lokasi')"
                v-if="editMode"
                class="uil uil-edit-alt text-[14px] cursor-pointer mr-4"
              ></i>
            </div>
            <div
              id="map"
              class="h-60 bg-gray-200 rounded-lg shadow-inner relative z-0"
            ></div>
            <h3
              class="mt-3 text-sm font-medium capitalize text-dark dark:text-white/60 flex items-center gap-2"
            >
              <i class="uil uil-location-point text-secondary text-lg mr-1">
              </i>
              <span>{{ projectDetail?.projectAddress }}</span>
            </h3>
          </div>
        </div>

        <div class="col-span-12 2xl:col-span-12">
          <div class="bg-white dark:bg-box-dark rounded-[10px] min-h-[300px]">
            
            <ul
              class="flex relative items-center gap-x-[30px] px-[25px] py-[17px] border-b border-regular dark:border-box-dark-up"
              role="tablist"
              data-te-nav-ref
            >
              <li role="presentation">
                <a
                  href="#tabs-list"
                  data-te-toggle="pill"
                  data-te-target="#tabs-list"
                  data-te-nav-active
                  role="tab"
                  aria-controls="tabs-list"
                  aria-selected="true"
                  class="relative py-5 text-sm font-medium after:absolute after:start-0 after:bottom-0 after:w-full after:h-[1px] text-body dark:text-subtitle-dark data-[te-nav-active]:text-primary data-[te-nav-active]:after:bg-primary cursor-pointer duration-300 ease-in-out capitalize"
                >
                  Evaluation List
                </a>
              </li>

              <li role="presentation">
                <a
                  href="#tabs-activites"
                  data-te-toggle="pill"
                  data-te-target="#tabs-activites"
                  role="tab"
                  aria-controls="tabs-activites"
                  aria-selected="false"
                  class="relative py-5 text-sm font-medium after:absolute after:start-0 after:bottom-0 after:w-full after:h-[1px] text-body dark:text-subtitle-dark data-[te-nav-active]:text-primary data-[te-nav-active]:after:bg-primary cursor-pointer duration-300 ease-in-out capitalize"
                >
                  Supporting Documents
                </a>
              </li>
              <li class="absolute right-6" role="presentation">
                <button
                  type="submit"
                  @click="saveChangeEvaluation"
                  class="flex items-center text-left rounded bg-primary/10 py-[12px] px-[18px] text-[12px] font-semibold capitalize leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary hover:text-white focus:outline-none focus:ring-0 gap-[8px]"
                >
                  <i class="uil uil-plus text-[12px]"></i>
                  Save Changes
                </button>
              </li>
            </ul>

            <div
              class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block pb-[25px]"
              id="tabs-list"
              role="tabpanel"
              aria-labelledby="tabs-list-tab"
              data-te-tab-active
            >
              <div class="relative py-[15px] overflow-x-auto max-h-[360px]">
                <table
                  id="tableDragAndDrop"
                  class="min-w-full text-sm font-light text-start whitespace-nowrap py-[15px]"
                >

                  <!-- Tambahkan bagian thead -->
                  <thead v-if="evaluationList">
                    
                    <tr>
                      <th
                        class="px-[25px] py-[8px] text-center text-sm font-medium text-dark dark:text-title-dark"
                      ></th>
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
                            <input
                              :id="`todolist-todo-${evaluation.evaluationId}`"
                              type="checkbox"
                              :true-value="1"
                              :false-value="0"
                              v-model="evaluation.evaluationChecked"
                              class="relative ltr:float-left rtl:float-right me-[10px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-1 border-solid border-normal outline-none before:pointer-events-none before:absolute before:h-[10px] before:w-[0.5px] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] checked:border-success checked:bg-success checked:before:opacity-[0.16] checked:after:absolute checked:after:mt-0 checked:after:ms-[5px] checked:after:block checked:after:h-[10px] checked:after:w-[5px] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] dark:border-white/10 dark:checked:border-success dark:checked:bg-success after:top-[2px] [&:checked~.label]:line-through [&:checked~.label]:text-primary"
                            />
                            <span
                              :class="{
                                'line-through': evaluation.evaluationChecked,
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
                                'bg-red-100 text-red-700'
                             :
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
                        <div
                          class="text-light dark:text-subtitle-dark text-[19px] flex items-center justify-end p-0 m-0 gap-[20px]"
                        >
                          <ul class="flex items-center justify-end gap-[15px]">
                            <li>
                              <span
                                class="block text-xs leading-none capitalize whitespace-nowrap text-light-extra dark:text-subtitle-dark"
                              >
                                {{ evaluation.evaluationTime }}
                              </span>
                            </li>
                            <li>
                              <a
                                href="#"
                                class="w-[30px] min-w-[30px] h-[30px] rounded-full object-cover"
                                data-te-toggle="tooltip"
                                data-te-placement="top"
                                title="Rony"
                              >
                                <img
                                  class="rounded-full"
                                  src="../../assets/images/sellers/1.png"
                                />
                              </a>
                            </li>
                            <!-- <li>
                              <a
                                href="#"
                                class="text-light-extra dark:text-subtitle-dark text-[18px]"
                              >
                                <i class="uil uil-compress"></i>
                              </a>
                            </li> -->
                            <!-- <li>
                              <div data-te-dropdown-ref>
                                <button
                                  class="text-[18px] text-light dark:text-subtitle-dark"
                                  @click="toggleEvaluation(todo.id)"
                                  type="button"
                                  :id="`projectDrops-todo-${index}`"
                                  data-te-dropdown-toggle-ref
                                  data-dropdown-button="evaluation"
                                  aria-expanded="false"
                                >
                                  <i class="uil uil-ellipsis-v"></i>
                                </button>
                                <ul
                                  :class="{
                                    'absolute z-[1000] right-[-10px]  m-0  min-w-max list-none  rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block': true,
                                    hidden: dropdownEvaluationId !== todo.id,
                                  }"
                                  :aria-labelledby="`projectDrops-todo-${index}`"
                                  data-dropdown-content="evaluation"
                                >
                                  <li>
                                    <a
                                      class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark"
                                      href="#"
                                      >View</a
                                    >
                                  </li>
                                  <li>
                                    <a
                                      class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark"
                                      href="#"
                                      >Edit</a
                                    >
                                  </li>
                                  <li>
                                    <a
                                      class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark"
                                      href="#"
                                      >Delete</a
                                    >
                                  </li>
                                </ul>
                              </div>
                            </li> -->
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p v-if="!evaluationList?.length" class="text-sm text-gray-400 text-center h-full">Belum ada Evaluasi</p>

          </div>
        </div>
      </div>

      <!--Vertically centered modal-->
    </div>
  </main>

  <!-- Modal -->
  <div>
    <!-- Modal -->
    <div
      v-if="isProjectModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Edit Form</h5>
          <button
            @click="closeProjectModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4 grid grid-cols-2 gap-6">
          <!-- Title -->
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              v-model="projectModalData.projectTitle"
              :placeholder="projectModalData.projectTitle"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <!-- Tags -->
          <div>
            <label
              for="tags"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <div class="relative">
              <!-- Button to Open Dropdown -->
              <button
                @click="toggleTagDropdown"
                class="w-full px-3 py-2 border rounded-md text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Select Tags
              </button>

              <!-- Dropdown List -->
              <div
                v-if="isTagDropdownOpen"
                class="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1 max-h-48 overflow-y-auto"
              >
                <div
                  v-for="tag in projectTagList"
                  :key="tag.tagId"
                  @click="toggleTagSelection(tag)"
                  class="flex items-center px-4 py-2 cursor-pointer"
                  :class="{
                    'bg-gray-200': isTagSelected(tag),
                    'hover:bg-blue-100': !isTagSelected(tag),
                  }"
                >
                  <input
                    type="checkbox"
                    class="mr-2"
                    :checked="isTagSelected(tag)"
                    @click.stop="toggleTagSelection(tag)"
                  />
                  {{ tag.tagName }}
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              v-model="projectModalData.projectDescription"
              :placeholder="projectModalData.projectDescription"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
            ></textarea>
          </div>

          <!-- Image -->
          <div>
            <label
              for="image"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              @change="handleFileUpload"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <!-- Start Date  -->
          <div>
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              id="date"
              type="date"
              v-model="projectModalData.projectStartDate"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <!-- End Date -->
          <div>
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              id="date"
              type="date"
              v-model="projectModalData.projectEndDate"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t">
          <button
            @click="updateProjectDetail"
            class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            @click="closeProjectModal"
            class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <!-- Modal -->
    <div
      v-if="isLocationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg mt-[50px]"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Edit Location</h5>
          <button
            @click="closeLocationModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

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
            <textarea
              id="address"
              v-model="locationForm.address"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows="1"
            ></textarea>
          </div>

          <!-- Province -->
          <div>
            <label
              for="province"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Province
            </label>
            <select
              id="province"
              v-model="locationForm.provinsi"
              @change="getKabupaten(locationForm.provinsi)"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
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
          </div>

          <!-- Kabupaten -->
          <div>
            <label
              for="kabupaten"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Kabupaten
            </label>
            <select
              id="kabupaten"
              v-model="locationForm.kabupaten"
              @change="getKecamatan(locationForm.kabupaten)"
              :disabled="!locationForm.provinsi"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Kabupaten</option>
              <option
                v-for="kabupaten in kabupatenList"
                :key="kabupaten.kodeKabupaten"
                :value="kabupaten.kodeKabupaten"
              >
                {{ kabupaten.namaKabupaten }}
              </option>
            </select>
          </div>

          <!-- Kecamatan -->
          <div>
            <label
              for="kecamatan"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Kecamatan
            </label>
            <select
              id="kecamatan"
              v-model="locationForm.kecamatan"
              @change="getDesa(locationForm.kecamatan)"
              :disabled="!locationForm.kabupaten"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-h-40 overflow-y-auto"
            >
              <option value="">Select Kecamatan</option>
              <option
                v-for="kecamatan in kecamatanList"
                :key="kecamatan.kodeKecamatan"
                :value="kecamatan.kodeKecamatan"
              >
                {{ kecamatan.namaKecamatan }}
              </option>
            </select>
          </div>

          <!-- Desa -->
          <div>
            <label
              for="desa"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Desa
            </label>
            <select
              id="desa"
              v-model="locationForm.desa"
              :disabled="!locationForm.kecamatan"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-h-40 overflow-y-auto"
              size="1"
            >
              <option value="">Select Desa</option>
              <option
                v-for="desa in desaList"
                :key="desa.kodeDesa"
                :value="desa.kodeDesa"
              >
                {{ desa.namaDesa }}
              </option>
            </select>
          </div>

          <!-- Latitude -->
          <div>
            <label
              for="latitude"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Latitude
            </label>
            <input
              id="latitude"
              type="text"
              v-model="locationForm.latitude"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <!-- Longitude -->
          <div>
            <label
              for="longitude"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Longitude
            </label>
            <input
              id="longitude"
              type="text"
              v-model="locationForm.longitude"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t">
          <button
            @click="updateLocation"
            class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            @click="closeLocationModal"
            class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div
      v-if="isTimelineModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-3xl p-4 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-2 border-b">
          <h5 class="text-lg font-semibold text-gray-800">
            {{ isUpdating ? "Update Activity" : "Add New Activity" }}
          </h5>
          <button
            @click="closeTimelineModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center mt-2">
          <button
            @click="setMode(false)"
            :class="[
              !isUpdating ? 'bg-blue-500 text-white' : 'bg-gray-200',
              'px-3 py-1.5 rounded-l-md',
            ]"
          >
            Add New
          </button>
          <button
            @click="setMode(true)"
            :class="[
              isUpdating ? 'bg-blue-500 text-white' : 'bg-gray-200',
              'px-3 py-1.5 rounded-r-md',
            ]"
          >
            Update
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-2 space-y-2">
          <!-- Jika Mode Update, Pilih Aktivitas -->
          <div>
            <div v-if="!isUpdating">
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Select Date
                <span
                  :class="{
                    'text-xs hover:underline': true,
                    'text-blue-400': isDateSelected,
                    'text-gray-500 ': !isDateSelected,
                  }"
                >
                  <button @click="disableSelectDate">
                    (action baru ?)
                  </button></span
                >
              </label>

              <select
                v-model="selectedTimeline.timelineIdStore"
                :disabled="!isDateSelected"
                class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="" disabled>Select a date</option>
                <option
                  v-for="timeline in timelineList"
                  :key="timeline.timelineId"
                  :value="timeline.timelineId"
                >
                  {{
                    timeline.timelineDate.timelineDateDay +
                    " " +
                    timeline.timelineDate.timelineDateMonth
                  }}
                </option>
              </select>
            </div>
            <div v-if="isUpdating">
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Select Date
              </label>
              <select
                v-model="selectedTimeline.timelineId"
                @change="populateTimelineDetail(selectedTimeline.timelineId)"
                class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="" disabled>Select a date</option>
                <option
                  v-for="timeline in timelineList"
                  :key="timeline.timelineId"
                  :value="timeline.timelineId"
                >
                  {{
                    timeline.timelineDate.timelineDateDay +
                    " " +
                    timeline.timelineDate.timelineDateMonth
                  }}
                </option>
              </select>
            </div>

            <div v-if="isUpdating">
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Select Activity
              </label>
              <select
                v-model="selectedTimeline.timelineDetailId"
                :disabled="!selectedTimeline.timelineId"
                @change="
                  populateTimelineDetailData(selectedTimeline.timelineDetailId)
                "
                class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="" disabled selected>Select an activity</option>
                <option
                  v-for="detail in timelineDetailList"
                  :key="detail.timelineDetailId"
                  :value="detail.timelineDetailId"
                >
                  {{ detail.timelinenDetailAction }}
                </option>
              </select>
            </div>
          </div>

          <!-- Input Form -->
          <div v-if="!isUpdating || selectedTimeline.timelineDetailId">
            <div class="flex space-x-3 space-y-1">
              <!-- Date -->
              <div class="w-1/2">
                <label class="block mb-1 text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  v-model="activityData.date"
                  :disabled="isDateSelected"
                  class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-600"
                />
              </div>

              <!-- Time -->
              <div class="w-1/2">
                <label class="block mb-1 text-sm font-medium text-gray-700">
                  Time
                </label>
                <input
                  type="time"
                  v-model="activityData.time"
                  class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-600"
                />
              </div>
            </div>

            <!-- Action -->
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Action
              </label>
              <input
                type="text"
                v-model="activityData.action"
                class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-600"
              />
            </div>

            <!-- Icon -->
            <div>
              <label class="block mb-1 text-sm font-medium text-gray-700">
                Icon
              </label>
              <select
                v-model="activityData.icon"
                class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-600"
              >
                <option :value="activityData.icon">
                  {{ activityData.iconName }}
                </option>
                <option
                  v-for="icon in iconList"
                  :value="icon.iconId"
                  :key="icon.iconId"
                >
                  {{ icon.iconName }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-2 border-t">
          <button
            v-if="isUpdating"
            @click="updateTimeline"
            class="px-3 py-1.5 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Update Timeline
          </button>
          <button
            v-if="!isUpdating"
            @click="storeTimeline"
            class="px-3 py-1.5 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            New Timeline
          </button>
          <button
            v-if="!isUpdating"
            @click="storeTimelineDetail"
            class="px-3 py-1.5 ml-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Action
          </button>
          <button
            @click="closeTimelineModal"
            class="px-3 py-1.5 ml-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div
      v-if="isFileModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Manage Files</h5>
          <button
            @click="closeFileModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4 space-y-4">
          <!-- Daftar File -->
          <div v-if="lampiranList" class="space-y-2">
            <div
              v-for="lampiran in lampiranList"
              :key="lampiran.lampiranId"
              class="flex items-center justify-between p-2 border rounded-md"
            >
              <div class="flex items-center space-x-3 min-w-0">
                <i class="uil uil-file text-xl text-gray-600"></i>
                <span class="truncate w-3/4">{{ lampiran.lampiranName }}</span>
              </div>

              <div class="flex space-x-3 flex-shrink-0">
                <!-- Preview -->
                <button
                  @click="previewFile(lampiran)"
                  class="text-blue-500 hover:text-blue-700"
                  title="Preview"
                >
                  <i class="uil uil-eye text-xl"></i>
                </button>

                <!-- Update -->
                <button
                  @click="updateFile(lampiran.lampiranId)"
                  class="text-yellow-500 hover:text-yellow-700"
                  title="Update"
                >
                  <i class="uil uil-edit text-xl"></i>
                </button>

                <!-- Delete -->
                <button
                  @click="deleteFile(lampiran.lampiranId)"
                  class="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <i class="uil uil-trash-alt text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          <p v-else class="text-gray-500 text-center">No files uploaded.</p>

          <!-- Tambah File -->
          <div class="flex justify-center pt-4">
            <label
              for="file-upload"
              class="flex items-center px-4 py-2 text-white bg-green-500 rounded cursor-pointer hover:bg-green-600"
            >
              <i class="uil uil-plus mr-2"></i> Add File
              <input
                id="file-upload"
                type="file"
                class="hidden"
                accept=".pdf"
                @click="addFile"
              />
            </label>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t">
          <button
            @click="closeFileModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <div
      v-if="isConfirmationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Konfirmasi Hapus</h5>
          <button
            @click="closeConfirmationModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4 text-center">
          <img
            src="../../assets/images/confirmations/red warning.png"
            alt="Warning"
            class="mx-auto mb-4 w-16 h-16"
          />
          <p class="text-gray-600">
            Apakah Anda yakin ingin menghapus proyek ini? Tindakan ini tidak
            dapat dibatalkan.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t space-x-2">
          <button
            @click="closeConfirmationModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            @click="deleteProjectId"
            class="px-4 py-2 text-white bg-red-400 rounded hover:bg-red-500"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mark as In active -->
  <div>
    <div
      v-if="isConfirmationInactiveModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">
            Konfirmasi Non Aktif Project
          </h5>
          <button
            @click="closeConfirmationInactiveModal"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4 text-center">

          <img
            src="../../assets/images/confirmations/yellow warning.png"
            alt="Warning"
            class="mx-auto mb-4 w-16 h-16"
          />
          <p class="text-gray-600">
            Apakah Anda yakin ingin mengnon-aktifkan proyek ini? Tindakan ini
            tidak dapat dibatalkan.
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t space-x-2">
          <button
            @click="closeConfirmationInactiveModal"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            @click="updateStatusProject"
            class="px-4 py-2 text-black bg-yellow-300 rounded hover:bg-yellow-400"
          >
            Ubah Status
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
