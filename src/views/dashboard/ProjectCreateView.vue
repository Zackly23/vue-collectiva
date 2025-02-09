<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import readXlsxFile from "read-excel-file";

const projectId = "6f9266cc-2ca6-44f1-94a1-db5151744e28";
const route = useRoute();
const router = useRouter();
const stepProjectNumber = ref(route.query.step || "1");
const categoryProject = ref("");
const beneficiaryType = ref("");
const beneficiaryRelation = ref("");
const creatorType = ref("");
const iconList = ref();
const timelineList = ref();
const timelineDataUploadList = ref([]);
const timelineData = ref({
  date: "",
  time: "",
  action: "",
  icon: "",
  iconName: "",
});
const stepProjectCreation = ref([
  { stepNumber: "1", stepName: "Biodata", stepPassed: true },
  { stepNumber: "2", stepName: "General", stepPassed: false },
  { stepNumber: "3", stepName: "Location", stepPassed: false },
  { stepNumber: "4", stepName: "Timeline", stepPassed: false },
  { stepNumber: "5", stepName: "Documents", stepPassed: false },
]);

const imagePreview = ref(null);

// Path file di folder public (langsung diakses)
const templateUrl = ref("/timeline_template.xlsx");

// Fungsi untuk mencocokkan icon
const getMatchingIconId = (iconName) => {
  const match = iconList.value.find(
    (icon) => icon.iconName.toLowerCase() == iconName.toLowerCase()
  );


  const iconData = {
    iconId: match.iconId,
    icon: match.icon,
    iconBackground: match.iconBackground,
  };
  return match ? iconData : null;
};

// Fungsi untuk mengelompokkan data berdasarkan tanggal
const groupTimelineData = (data) => {
  return data.reduce((acc, item) => {
    const {
      timelineDateFull,
      timelineDateDay,
      timelineDateMonth,
      timelineTime,
      timelineTaskAction,
      timelineIconId,
      timelineIcon,
      timelineIconBackground,
    } = item;

    // Cek apakah tanggal sudah ada dalam hasil akhir
    let existingGroup = acc.find(
      (group) => group.timelineDate === timelineDateFull
    );

    if (!existingGroup) {
      existingGroup = {
        timelineDate: timelineDateFull,
        timelineDateDay,
        timelineDateMonth,
        timelineDetail: [],
      };
      acc.push(existingGroup);
    }

    // Tambahkan detail ke tanggal yang sesuai
    existingGroup.timelineDetail.push({
      timelineDetailAction: timelineTaskAction,
      timelineDetailTime: timelineTime,
      timelineDetailIconId: timelineIconId,
      timelineDetailIcon: timelineIcon,
      timelineDetailIconBackground: timelineIconBackground,
    });

    return acc;
  }, []);
};

// Fungsi untuk menangani unggahan file
const handleFileTimelineUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  readXlsxFile(file, {
    dateFormat: "yyyy/mm/dd",
  }).then((rows) => {
    const timelineDataRows = [];

    rows.forEach((dataRow, indexRow) => {
      if (indexRow === 0) {
        console.log("Header :", dataRow);
      } else {
        const timelineRowData = {
          timelineDateFull: dataRow[0].toISOString().split("T")[0], // Format tanggal "YYYY-MM-DD"
          timelineDateDay: dataRow[0].toISOString().split("T")[0].split("-")[2], // Hari dalam angka (tanggal)
          timelineDateMonth: dataRow[0].toLocaleString("id-ID", { month: "long" }), // Nama bulan
          timelineTime: dataRow[1], // Waktu
          timelineTaskAction: dataRow[2], // Tugas
          timelineIconId: getMatchingIconId(dataRow[3]).iconId, // ID ikon
          timelineIcon: getMatchingIconId(dataRow[3]).icon,
          timelineIconBackground: getMatchingIconId(dataRow[3]).iconBackground,
        };

        timelineDataRows.push(timelineRowData);
      }
    });

    // Kelompokkan data berdasarkan tanggal
    const groupedData = groupTimelineData(timelineDataRows);

    // Urutkan data yang telah dikelompokkan berdasarkan timelineDate (ascending)
    timelineDataUploadList.value = groupedData.sort((a, b) => {
      return new Date(a.timelineDate) - new Date(b.timelineDate);
    });

    console.log("Grouped Timeline Data:", timelineDataUploadList.value);
  }).finally(() => {
    // Reset nilai input file agar event change dapat terpicu kembali ketika file yang sama dipilih
    event.target.value = "";
  });
};


const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const removeImage = () => {
  imagePreview.value = null;
  const fileInput = document.getElementById("import-file");
  if (fileInput) {
    fileInput.value = ""; // Reset input file agar bisa upload gambar yang sama
  }
};

const goToStep = (step) => {
  // stepProjectNumber.value = stepProjectNumber.value + 1;
  router.push({
    path: "/dashboard/project-create",
    query: {
      step: step,
    },
  });
  console.log("step : ", step);
};

const resetTimelineData = () => {
  timelineData.value = {
    date: "",
    time: "",
    action: "",
    icon: "",
    iconName: "",
  };
};

const createNewTimeline = () => {
  console.log("Data timeline sebelum diproses: ", timelineData.value);
  
  // Dapatkan data ikon berdasarkan input icon
  const iconData = getMatchingIconId(timelineData.value.icon);

  // Pastikan tanggal sudah diisi dan dalam format "YYYY-MM-DD"
  const timelineDate = timelineData.value.date;
  if (!timelineDate) {
    console.error("Tanggal tidak boleh kosong!");
    return;
  }

  // Buat objek detail baru
  const newTimelineDetail = {
    timelineDetailAction: timelineData.value.action,
    timelineDetailTime: timelineData.value.time,
    timelineDetailIconId: iconData ? iconData.iconId : null,
    timelineDetailIcon: iconData ? iconData.icon : null,
    timelineDetailIconBackground: iconData ? iconData.iconBackground : null,
  };

  // Cek apakah timelineDataUploadList sudah memiliki data
  if (!timelineDataUploadList.value || timelineDataUploadList.value.length === 0) {
    // Jika belum ada data, buat grup baru untuk tanggal tersebut
    const newGroup = {
      timelineDate: timelineDate,
      // Dapatkan hari (0: Minggu, 1: Senin, dst.) dan nama bulan dari tanggal
      timelineDateDay: timelineDate.split('-')[2],
      timelineDateMonth: new Date(timelineDate).toLocaleString("id-ID", { month: "long" }),
      timelineDetail: [newTimelineDetail],
    };

    console.log('new group : ', newGroup);
    timelineDataUploadList.value.push(newGroup);
  } else {
    // Jika sudah ada data, cari grup dengan tanggal yang sama
    const existingGroup = timelineDataUploadList.value.find(
      (group) => group.timelineDate === timelineDate
    );

    if (existingGroup) {
      // Jika grup untuk tanggal tersebut sudah ada, tambahkan detail baru ke grup tersebut
      existingGroup.timelineDetail.push(newTimelineDetail);
    } else {
      // Jika tidak ada grup untuk tanggal tersebut, buat grup baru dan push ke timelineDataUploadList
      const newGroup = {
        timelineDate: timelineDate,
        timelineDateDay: new Date(timelineDate).getDay(),
        timelineDateMonth: new Date(timelineDate).toLocaleString("id-ID", { month: "long" }),
        timelineDetail: [newTimelineDetail],
      };
      timelineDataUploadList.value.push(newGroup);
    }
  }

  // Urutkan timelineDataUploadList berdasarkan tanggal (ascending)
  timelineDataUploadList.value.sort((a, b) => new Date(a.timelineDate) - new Date(b.timelineDate));

  console.log("Data timeline yang telah dikelompokkan dan diurutkan:", timelineDataUploadList.value);

  // Reset data input
  resetTimelineData();
};

//API
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

watch(
  () => route.query.step,
  (newStep) => {
    if (newStep) {
      stepProjectNumber.value = newStep;
      console.log("Step changed to:", newStep);
    }
  },
  { immediate: true } // Agar watch langsung dijalankan saat komponen dimuat
);

const isTagDropdownOpen = ref(false);
const selectedTags = ref([]);

const projectTagList = ref([
  { tagId: 1, tagName: "Vue.js" },
  { tagId: 2, tagName: "React" },
  { tagId: 3, tagName: "Angular" },
  { tagId: 4, tagName: "Svelte" },
  { tagId: 5, tagName: "Tailwind" },
  { tagId: 6, tagName: "Laravel" },
]);

const toggleTagSelection = (tag) => {
  if (isTagSelected(tag)) {
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

const removeTag = (tag) => {
  selectedTags.value = selectedTags.value.filter((t) => t.tagId !== tag.tagId);
};

onMounted(() => {
  getIconList();
  // getTimeline();
});
</script>

<template>
  <main class="bg-gray-100 dark:bg-gray-900 p-6">
    <div
      class="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <!-- <h4 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Create Project</h4> -->

      <!-- Step Progress -->
      <div class="flex justify-center gap-4 md:gap-8 mb-4">
        <div
          @click="goToStep(step.stepNumber)"
          v-for="(step, index) in stepProjectCreation"
          :key="step.stepNumber"
          class="flex items-center cursor-pointer"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="w-10 h-10 flex items-center justify-center text-lg font-semibold rounded-full"
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
        class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 rounded-lg shadow"
      >
        <h5 class="text-xl font-semibold text-black dark:text-white mb-4">
          Informasi Pembuat dan Penerima Manfaat
        </h5>

        <!-- Informasi Creator (Pembuat Proyek) -->
        <div>
          <h1 class="mb-3 text-lg text-gray-800 dark:text-white">
            Informasi Creator
          </h1>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nama Lengkap -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nama Lengkap <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorName"
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Email <span class="text-red-500">*</span></label
              >
              <input
                type="email"
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorEmail"
                required
              />
            </div>

            <!-- Nomor Telepon/WhatsApp -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nomor Telepon/WhatsApp
                <span class="text-red-500">*</span></label
              >
              <input
                type="tel"
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorPhone"
                required
              />
            </div>

            <!-- Sosial Media -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Sosial Media (Opsional)</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorSocialMedia"
              />
            </div>

            <!-- Tipe Creator -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Tipe Creator <span class="text-red-500">*</span></label
              >
              <select
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorType"
                required
              >
                <option value="perorangan">Perorangan</option>
                <option value="organisasi">Organisasi/Lembaga</option>
              </select>
            </div>

            <!-- Nama Organisasi/Lembaga (Muncul jika memilih "Organisasi") -->
            <div v-if="creatorType === 'organisasi'">
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nama Organisasi/Lembaga
                <span class="text-red-500">*</span></label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="organizationName"
              />
            </div>

            <!-- Tautan Media Sosial atau Website -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Tautan Media Sosial atau Website (Opsional)</label
              >
              <input
                type="url"
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorWebsite"
              />
            </div>

            <!-- Nomor Identitas -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nomor Identitas (KTP/SIM/Paspor) (Opsional)</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="creatorID"
              />
            </div>

            <!-- Unggah Dokumen Proposal -->
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Unggah Dokumen Proposal (Opsional)</label
              >
              <input
                type="file"
                class="w-full px-4 py-2 border rounded-md"
                @change="handleFileUpload"
              />
            </div>
          </div>
        </div>

        <!-- Penerima Manfaat Section -->
        <div class="mt-5">
          <h1 class="mb-3 text-lg text-gray-800 dark:text-white">
            Penerima Manfaat
          </h1>

          <!-- Jenis Penerima Manfaat -->
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium"
              >Jenis Penerima Manfaat</label
            >
            <select
              v-model="beneficiaryType"
              class="w-full px-4 py-2 border rounded-md"
            >
              <option value="" disabled="true" hidden selected class="">
                Pilih Jenis Penerima Manfaat
              </option>
              <option value="perorangan">Perorangan</option>
              <option value="lembaga">Lembaga/Organisasi</option>
            </select>
          </div>

          <!-- Jika Perorangan -->
          <div
            v-if="beneficiaryType === 'perorangan'"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
          >
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nama Lengkap</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="beneficiaryName"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >NIK (Opsional)</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="beneficiaryNIK"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Alamat</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="beneficiaryAddress"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nomor Telepon (Opsional)</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="beneficiaryPhone"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Kondisi/Kebutuhan</label
              >
              <textarea
                class="w-full px-4 py-2 border rounded-md"
                v-model="beneficiaryNeeds"
              ></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Dokumen Pendukung (Opsional)</label
              >
              <input
                type="file"
                class="w-full px-4 py-2 border rounded-md"
                @change="handleFileUpload"
              />
            </div>
          </div>

          <!-- Jika Lembaga -->
          <div
            v-if="beneficiaryType === 'lembaga'"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3"
          >
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nama Lembaga</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="organizationName"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nomor Registrasi (Opsional)</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="organizationRegNumber"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Alamat Lembaga</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="organizationAddress"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Penanggung Jawab (Nama & Jabatan)</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="organizationPIC"
              />
            </div>
            <div>
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Nomor Telepon Lembaga</label
              >
              <input
                type="text"
                class="w-full px-4 py-2 border rounded-md"
                v-model="organizationPhone"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Kondisi/Kebutuhan</label
              >
              <textarea
                class="w-full px-4 py-2 border rounded-md"
                v-model="beneficiaryNeeds"
              ></textarea>
            </div>
            <div class="md:col-span-2">
              <label class="block text-gray-700 dark:text-gray-300 font-medium"
                >Dokumen Pendukung (Opsional)</label
              >
              <input
                type="file"
                class="w-full px-4 py-2 border rounded-md"
                @change="handleFileUpload"
              />
            </div>
          </div>

          <!-- Hubungan dengan Penerima Manfaat -->
          <div class="mt-5">
            <label class="block text-gray-700 dark:text-gray-300 font-medium"
              >Hubungan dengan Penerima Manfaat</label
            >
            <select
              v-model="beneficiaryRelation"
              class="w-full px-4 py-2 border rounded-md"
            >
              <option value="diri-sendiri">Diri Sendiri</option>
              <option value="keluarga">Keluarga</option>
              <option value="teman">Teman/Kenalan</option>
              <option value="organisasi">Mewakili Organisasi</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <!-- Jika Lainnya, Tambah Input -->
          <div v-if="beneficiaryRelation === 'lainnya'" class="mt-3">
            <label class="block text-gray-700 dark:text-gray-300 font-medium"
              >Jelaskan Hubungan</label
            >
            <input
              type="text"
              class="w-full px-4 py-2 border rounded-md"
              v-model="beneficiaryRelationOther"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <button
            @click="goToStep(2)"
            class="px-6 py-2 bg-primary text-white rounded-md shadow-md hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition-all duration-300"
          >
            Simpan
          </button>
        </div>
      </div>

      <!-- General Section -->
      <div
        v-if="stepProjectNumber == 2"
        class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 rounded-lg shadow"
      >
        <h5 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Edit Form
        </h5>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="title"
              class="block text-gray-700 dark:text-gray-300 font-medium"
              >Title</label
            >
            <input
              id="title"
              placeholder="Masukkan Judul Project kamu"
              type="text"
              class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label class="block text-gray-700 dark:text-gray-300 font-medium"
              >Tags</label
            >
            <div class="relative w-full flex items-center">
              <!-- Button to Open Dropdown -->
              <button
                @click="isTagDropdownOpen = !isTagDropdownOpen"
                class="w-full px-3 py-2 border rounded-md text-gray-700 bg-white focus:outline-none focus:ring focus:ring-blue-300"
              >
                Select Tags
              </button>

              <!-- Dropdown List -->
              <div
                v-if="isTagDropdownOpen"
                class="absolute z-10 w-full bg-white border rounded-md shadow-md top-10 max-h-48 overflow-y-auto"
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
                    @change="toggleTagSelection(tag)"
                  />
                  {{ tag.tagName }}
                </div>
              </div>
            </div>

            <!-- Display Selected Tags -->
            <div v-if="selectedTags.length" class="mt-2 flex flex-wrap gap-2">
              <span
                v-for="(tag, index) in selectedTags"
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
            >Description</label
          >
          <textarea
            id="description"
            placeholder="Masukkan Deskripsi Project kamu"
            class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            rows="4"
          ></textarea>
        </div>

        <!-- Upload Image Section -->
        <div class="mt-4">
          <h6 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Upload Image
          </h6>
          <div class="flex items-center justify-center">
            <label
              for="import-file"
              class="flex flex-col items-center justify-center w-full sm:min-h-[150px] bg-white dark:bg-box-dark p-2 rounded-lg border-2 border-dashed border-[#c6d0dc] dark:border-box-dark-up hover:border-primary dark:hover:border-primary cursor-pointer transition-all duration-300 ease-linear"
            >
              <div
                v-if="!imagePreview"
                class="flex flex-col items-center justify-center pt-3 pb-3"
              >
                <div class="text-[40px] text-light dark:text-subtitle-dark">
                  <i class="uil uil-cloud-upload"></i>
                </div>
                <p
                  class="text-[14px] font-medium text-dark dark:text-title-dark"
                >
                  Drop File or <span class="text-primary">Browse</span>
                </p>
              </div>
              <input
                id="import-file"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleImageUpload"
              />

              <!-- Preview Image -->
              <div v-if="imagePreview" class="w-full mt-2">
                <img
                  :src="imagePreview"
                  class="w-full h-80 object-cover rounded-md"
                />
              </div>
            </label>
          </div>
          <div v-if="imagePreview" class="mt-2">
            <button
              @click="removeImage"
              class="bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 transition-all duration-300 ease-in-out"
            >
              ✕ Remove
            </button>
          </div>
        </div>

        <!-- Date Inputs -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label
              for="start_date"
              class="block text-gray-700 dark:text-gray-300 font-medium"
              >Start Date</label
            >
            <input
              id="start_date"
              type="date"
              class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label
              for="end_date"
              class="block text-gray-700 dark:text-gray-300 font-medium"
              >End Date</label
            >
            <input
              id="end_date"
              type="date"
              class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <!-- Category Project  -->

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label
              for="category"
              class="block text-gray-700 dark:text-gray-300 font-medium"
            >
              Category
            </label>
            <select
              v-model="categoryProject"
              class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              name="category"
              id=""
            >
              <option value="donasi">Donasi</option>
              <option value="volunteer">Volunteer</option>
            </select>
          </div>

          <!-- Target Donasi -->
          <div v-if="categoryProject === 'donasi'">
            <label
              for="target_donasi"
              class="block text-gray-700 dark:text-gray-300 font-medium"
            >
              Target Donasi (Rp)
            </label>
            <div
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 text-[15px] dark:bg-gray-800 px-4 py-2 flex items-center focus:ring-blue-400 focus:border-blue-400"
            >
              <span class="text-gray-500 dark:text-gray-400 mr-2">
                <i class="uil uil-money-bill"></i>
              </span>
              <input
                type="number"
                class="outline-none placeholder:text-gray-400 text-body dark:text-gray-300 w-full bg-transparent"
                placeholder="Masukkan target donasi"
                id="target_donasi"
                name="target_donasi"
                min="0"
              />
            </div>
          </div>

          <!-- Target Volunteer -->
          <div v-if="categoryProject === 'volunteer'">
            <label
              for="target_volunteer"
              class="block text-gray-700 dark:text-gray-300 font-medium"
            >
              Target Volunteer (Orang)
            </label>
            <div
              class="w-full rounded-md border border-gray-300 dark:border-gray-600 text-[15px] dark:bg-gray-800 px-4 py-2 flex items-center focus:ring-blue-400 focus:border-blue-400"
            >
              <span class="text-gray-500 dark:text-gray-400 mr-2">
                <i class="uil uil-users-alt"></i>
              </span>
              <input
                type="number"
                class="outline-none placeholder:text-gray-400 text-body dark:text-gray-300 w-full bg-transparent"
                placeholder="Masukkan jumlah volunteer"
                id="target_volunteer"
                name="target_volunteer"
                min="1"
              />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="goToStep(1)"
            type="submit"
            class="px-[30px] h-[44px] bg-red-600 text-white text-sm py-2 rounded-md shadow-md hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 transition-all duration-300 ease-in-out"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Kembali
          </button>
          <button
            @click="goToStep(3)"
            class="px-[30px] h-[44px] bg-primary border-primary text-white text-sm py-2 rounded-md shadow-md hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition-all duration-300 ease-in-out"
          >
            Simpan
          </button>
        </div>
      </div>

      <!-- Location Form  -->
      <div
        v-if="stepProjectNumber == 3"
        class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 rounded-lg shadow"
      >
        <h5 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Edit Location
        </h5>

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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Province</option>
              <option value="aceh">Aceh</option>
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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Kabupaten</option>
              <option value="aceh">Aceh</option>
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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-h-40 overflow-y-auto"
            >
              <option value="">Select Kecamatan</option>
              <option>Kemalang</option>
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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 max-h-40 overflow-y-auto"
              size="1"
            >
              <option value="">Select Desa</option>
              <option value="sidorejo">Sidorejo</option>
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
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="goToStep(2)"
            type="submit"
            class="px-[30px] h-[44px] bg-red-600 text-white text-sm py-2 rounded-md shadow-md hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 transition-all duration-300 ease-in-out"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Kembali
          </button>
          <button
            @click="goToStep(4)"
            class="px-[30px] h-[44px] bg-primary border-primary text-white text-sm py-2 rounded-md shadow-md hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition-all duration-300 ease-in-out"
          >
            Simpan
          </button>
        </div>
      </div>

      <!-- Timeline  -->
      <div
        v-if="stepProjectNumber == 4"
        class="bg-white dark:bg-gray-700 pb-6 pl-6 pr-6 pt-2 rounded-lg shadow"
      >
        <div class="flex justify-between mb-4">
          <h5 class="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Create Timeline
          </h5>

          <div class="flex justify-center gap-2">
            <!-- Button untuk Download Template -->
            <a
              :href="templateUrl"
              download="timeline_template.xlsx"
              class="flex items-center justify-center h-10 px-3 bg-green-600 text-white text-[13px] rounded-md shadow-md hover:bg-white hover:text-green-500 hover:ring-2 hover:ring-green-500 transition-all duration-300 ease-in-out"
            >
              Download Template
            </a>

            <!-- Button untuk Upload File -->
            <label
              for="uploadFile"
              class="flex items-center justify-center h-10 px-3 bg-red-600 text-white text-[13px] rounded-md shadow-md hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 transition-all duration-300 ease-in-out cursor-pointer"
            >
              Upload 
            </label>
            <input
              type="file"
              id="uploadFile"
              class="hidden"
              accept=".xlsx, .xls"
              @change="handleFileTimelineUpload"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div>
              <div class="flex space-x-3 space-y-1">
                <!-- Date -->
                <div class="w-1/2">
                  <label class="block mb-1 text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <input
                    type="date"
                    v-model="timelineData.date"
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
                    v-model="timelineData.time"
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
                  v-model="timelineData.action"
                  class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-600"
                />
              </div>

              <!-- Icon -->
              <div>
                <label class="block mb-1 text-sm font-medium text-gray-700">
                  Icon
                </label>
                <select
                  v-model="timelineData.icon"
                  class="w-full px-3 py-1.5 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-600"
                >
                  <option :value="timelineData.icon">
                    {{ timelineData.iconName }}
                  </option>
                  <option
                    v-for="icon in iconList"
                    :value="icon.iconName"
                    :key="icon.iconId"
                  >
                    {{ icon.iconName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="w-full mt-4">
              <button
                @click="createNewTimeline"
                class="w-full px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md shadow-md hover:bg-white hover:text-blue-500 hover:ring-2 hover:ring-blue-500 transition-all duration-300 ease-in-out"
              >
                New Timeline
              </button>
            </div>
          </div>

          <!-- List Timeline  -->
          <div class="flex justify-center items-center border-t-1 mt-3 md:border-l-1 md:mt-0 md:border-t-0  ">
            <div class="max-h-[300px] w-full scrollbar overflow-y-auto p-[20px] mb-6">
              <div
                v-for="(timeline, index) in timelineDataUploadList"
                :key="index"
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
                      {{ timeline.timelineDateDay }}
                    </h1>
                    <span
                      class="capitalize text-xs text-body dark:text-white/60"
                    >
                      {{ timeline.timelineDateMonth }}
                    </span>
                  </div>
                  <div>
                    <div
                      v-for="(detail, index) in timeline.timelineDetail"
                      :key="index"
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
                          class="mb-0 -mt-1 text-sm font-medium text-dark dark:text-white/60"
                        >
                          <!-- {{ detail.name }} -->
                          <span
                            class="mx-0.5 text-body dark:text-white/60 font-normal"
                            >{{ detail.timelineDetailAction }}</span
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="goToStep(3)"
            type="submit"
            class="px-[30px] h-[44px] bg-red-600 text-white text-sm py-2 rounded-md shadow-md hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 transition-all duration-300 ease-in-out"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Kembali
          </button>
          <button
            @click="goToStep(5)"
            class="px-[30px] h-[44px] bg-primary border-primary text-white text-sm py-2 rounded-md shadow-md hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition-all duration-300 ease-in-out"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
