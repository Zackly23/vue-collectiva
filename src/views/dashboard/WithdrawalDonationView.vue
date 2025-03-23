<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";
import { useToast } from "vue-toast-notification";
import SoftWarningComponent from "@/components/dashboard/modal/SoftWarningComponent.vue";

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const router = useRouter();
const route = useRoute();
const isConfirmatioModalOpen = ref(false);
const projectId = route.params.projectId;
const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;


const rekening = ref({
  namaPenerima: "",
  namaPernerimaChecking: "",
  bank: "",
  nomor: "",
  scanRekening: null,
});

const loading = ref(false);
const errorMessage = ref("");

const bankOptions = [
  "BCA",
  "BRI",
  "Mandiri",
  "BNI",
  "CIMB Niaga",
  "Bank Syariah Indonesia",
  "Bank Mega",
  "Bank Danamon",
  "Bank Permata",
  "OCBC NISP",
  "Bank BTN",
];

const imagePreview = ref(null);
const toastNotification = useToast();

const formatNomorRekening = () => {
  rekening.value.nomor = rekening.value.nomor.replace(/\D/g, ""); // Hanya angka
};

const cekNomorRekening = async () => {
  if (!rekening.value.nomor || !rekening.value.bank) return;

  loading.value = true;
  errorMessage.value = "";
  rekening.value.namaPernerimaChecking = null;

  try {
    // Simulasi API cek rekening (Ganti dengan API asli)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Contoh hasil pengecekan (simulasi)
    const response = {
      success: true,
      namaPenerima: "John Doe",
    };

    if (response.success) {
      rekening.value.namaPernerimaChecking = response.namaPenerima;
    } else {
      errorMessage.value = "Nomor rekening tidak valid.";
    }
  } catch (error) {
    errorMessage.value = "Gagal mengecek nomor rekening.";
  } finally {
    loading.value = false;
  }
};

const errors = ref({
  namaPenerima: null,
  namaPernerimaChecking: null,
  bank: null,
  nomor: null,
});



const projectDetail = ref({
  projectId: "",
  projectTitle: "",
  projectAddress: "",
  projectProgressAmount: null,
});

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

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);

    rekening.value.scanRekening = file;
  }
};

const removeImage = () => {
  imagePreview.value = null;
  const fileInput = document.getElementById("import-file");
  if (fileInput) {
    fileInput.value = ""; // Reset input file agar bisa upload gambar yang sama
  }
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

const getProjectDetail = async () => {
  console.log("proej : ", projectId);
  try {
    const responses = await api.get(`/project/${projectId}/detail`);
    console.log(
      "project: ",
      JSON.parse(responses.data.project_details[0].project_criteria)
    );
    console.log(JSON.parse(responses.data.project_details[0].project_criteria));
    const projectdetailList = responses.data.project_details.map((project) => ({
      projectId: project.project_id,
      projectTitle: project.project_title,
      projectAddress: project.project_address,
      projectProgressAmount: project.project_progress_amount,
      projectCriteria: project.project_criteria
        ? JSON.parse(project.project_criteria).map((criteria) => ({
            key: criteria.key,
            value: criteria.value,
            role: criteria.role,
            fulfilled: false,
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
    // console.log("project detail : ", projectDetail[0].value);

    // initialMapLayer();
  } catch (error) {
    console.error("error Fetch Project : ", error);
  }
};

const storeDonationWithdrawal = async () => {
  try {
 
    const formData = new FormData();
    formData.append("nomor_rekening", rekening.value.nomor);
    formData.append("nama_penerima", rekening.value.namaPenerima);
    formData.append("jumlah_penarikan", parseFloat(projectDetail.value.projectProgressAmount));
    formData.append("scan_rekening", rekening.value.scanRekening);
    formData.append("email", userProfile.value.email);
    formData.append("full_name", userProfile.value.fullName);
    formData.append("email", userProfile.value.email);
    formData.append("address", userProfile.value.address);
    formData.append("channel_bank", rekening.value.bank);
    formData.append("phone_number", userProfile.value.phoneNumber);
    
    const response = await api.post(
      `/project/${projectId}/donation/withdrawal`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status == 200 || response.status == 201) {
      openNotificatication("Data Penarikan Berhasil Dikirim");
      console.log('withdrawal : ', response.data)
      router.push(`/dashboard/project/${projectId}`);
    }
  } catch (error) {
    console.error("error store Penarikan Dana", error);
  }
};

const fetchData = async () => {
  try {
    await Promise.all([getUserProfile(), getProjectDetail()]);
  } catch (error) {
    console.log("error : ", error);
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
              Konfirmasi Penarikan Donasi
            </h1>
            <p class="text-gray-600 mt-2">
              Silakan lengkapi informasi Anda dan konfirmasi Penarikan Donasi.
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
                Informasi Pengguna
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

          <!-- Informasi Penarikan Donasi  -->
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >2</span
                >
                Informasi Penarikan
              </h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Saldo Tersedia -->
                <div>
                  <label
                    for="saldo"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Jumlah Donasi</label
                  >

                  <div class="p-2 pl-4 bg-gray-100 rounded-lg">
                    <p class="text-[20px] font-semibold text-green-600">
                      Rp {{ projectDetail.projectProgressAmount }}
                    </p>
                  </div>
                </div>

                <!-- Select Bank -->
                <div>
                  <label
                    for="bank"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Bank</label
                  >
                  <select
                    id="bank"
                    name="bank"
                    v-model="rekening.bank"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="" disabled selected>Pilih Bank</option>
                    <option
                      v-for="bank in bankOptions"
                      :key="bank"
                      :value="bank"
                    >
                      {{ bank }}
                    </option>
                  </select>
                  <p v-if="errors.bank" class="text-red-500 text-sm mt-1">
                    {{ errors.bank }}
                  </p>
                </div>
                <div>
                  <label
                    for="penerima"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Nama Penerima</label
                  >
                  <input
                    type="text"
                    id="penerima"
                    name="penerima"
                    v-model="rekening.namaPenerima"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                  />
                  <p
                    v-if="errors.namaPenerima"
                    class="text-red-500 text-sm mt-1"
                  >
                    {{ errors.namaPenerima }}
                  </p>
                </div>

                <!-- Nomor Rekening -->
                <div>
                  <label
                    for="no_rekening"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Nomor Rekening</label
                  >
                  <div class="relative">
                    <input
                      type="text"
                      id="no_rekening"
                      name="no_rekening"
                      v-model="rekening.nomor"
                      @input="formatNomorRekening"
                      @blur="cekNomorRekening"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Masukkan nomor rekening"
                    />
                    <!-- Icon Loading -->
                    <div
                      v-if="loading"
                      class="absolute inset-y-0 right-3 flex items-center"
                    >
                      <svg
                        class="w-5 h-5 text-gray-500 animate-spin"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    </div>
                    <!-- Icon Checklist -->
                    <div
                      v-if="rekening.namaPernerimaChecking"
                      class="absolute inset-y-0 right-3 flex items-center text-green-500"
                    >
                      ✔
                    </div>
                  </div>
                  <!-- Nama Penerima -->
                  <p
                    v-if="rekening.namaPernerimaChecking"
                    class="text-green-600 text-sm mt-1"
                  >
                    Nama Penerima: {{ rekening.namaPernerimaChecking }}
                  </p>
                  <p v-if="errorMessage" class="text-red-500 text-sm mt-1">
                    {{ errorMessage }}
                  </p>
                </div>

                <!-- Upload Image Section -->
                <div class="col-span-2">
                  <label
                    for="scan_rekening"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Upload Foto Rekening</label
                  >
                  <div class="flex items-center justify-center">
                    <label
                      for="import-file"
                      class="flex flex-col items-center justify-center w-full sm:min-h-[150px] bg-white dark:bg-box-dark p-2 rounded-lg border-2 border-dashed border-[#c6d0dc] dark:border-box-dark-up hover:border-primary dark:hover:border-primary cursor-pointer transition-all duration-300 ease-linear"
                    >
                      <div
                        v-if="!imagePreview"
                        class="flex flex-col items-center justify-center pt-3 pb-3"
                      >
                        <div
                          class="text-[40px] text-light dark:text-subtitle-dark"
                        >
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
              </div>
            </div>
          </div>

          <div class="flex justify-end mt-4">
            <button
              @click="() => (isConfirmatioModalOpen = true)"
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
            >
              Proses Penarikan
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <SoftWarningComponent
    :is-confirmation-modal-open="isConfirmatioModalOpen"
    :description="'Apakah Anda yakin ingin mengirim data penarikan ini? Pastikan semua data sudah diisi dengan benar sebelum melanjutkan.'"
    @close-confirmation-modal="() => (isConfirmatioModalOpen = false)"
    @action-modal="storeDonationWithdrawal"
    :action="'Kirim Data'"
    :title="'Konfirmasi Penarikan Donasi'"
  />
</template>
