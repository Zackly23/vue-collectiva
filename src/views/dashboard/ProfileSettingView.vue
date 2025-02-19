<script setup>
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const route = useRoute();
const settingTab = ref(
  route.query.settingTab ? route.query.settingTab : "edit"
);
const user = JSON.parse(localStorage.getItem("user"));
const userId = user.user_id;
const isEmailVerified = ref(user.email_verified_at ? true : false);
const token = localStorage.getItem("token");
const passwordData = ref({
  oldPassword: "",
  newPassword: "",
  newConfirmationPassword: "",
});
const userProfile = ref({
  fullName: "",
  address: "",
  birthDate: "",
  profilePicture: "",
  profileCover: "",
  phoneNumber: "",
  jenisKelamin: "",
  nik: "",
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
// const imagePreview = ref(null);
const ktpImage = ref(null);
const profileImage = ref(null);
const coverImage = ref(null);
const activeTab = ref("edit");
const profileTabList = ref([
  {
    tabName: "Edit Profile",
    tabSlug: "edit",
    tabIcon: "uil uil-user",
  },
  {
    tabName: "Account Settings",
    tabSlug: "account",
    tabIcon: "uil uil-setting",
  },
  {
    tabName: "Social Profiles",
    tabSlug: "social",
    tabIcon: "uil uil-users-alt",
  },
  {
    tabName: "Notifications",
    tabSlug: "notification",
    tabIcon: "uil uil-bell",
  },
]);

const socialMediaFields = ref([
  {
    id: "facebook",
    label: "Facebook",
    icon: "uil uil-facebook-f",
    buttonClass: "bg-facebook border-facebook",
    placeholder: "https://facebook.com/",
  },
  {
    id: "twitter",
    label: "X",
    icon: "uil uil-twitter",
    buttonClass: "bg-twitter border-twitter",
    placeholder: "https://twitter.com/",
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: "uil uil-instagram",
    buttonClass: "bg-instagram border-instagram",
    placeholder: "https://instagram.com/",
  },
  {
    id: "github",
    label: "Github",
    icon: "uil uil-github",
    buttonClass: "bg-github border-github",
    placeholder: "https://github.com/",
  },
  {
    id: "medium",
    label: "Medium",
    icon: "uil uil-medium-m",
    buttonClass: "bg-medium border-medium",
    placeholder: "https://medium.com/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "uil uil-linkedin",
    buttonClass: "bg-linkedin border-linkedin",
    placeholder: "https://linkedin.com/",
  },
]);

const handleImageUpload = (event, type) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    const result = e.target.result;
    if (type === "ktp") {
      ktpImage.value = result;
      userProfile.value.ktpFile = file;
    } else if (type === "profile") {
      profileImage.value = result;
      userProfile.value.profilePicture = file;
    } else if (type === "cover") {
      coverImage.value = result;
      userProfile.value.profileCover = file;
    }
  };

  reader.readAsDataURL(file);
};

const removeImage = () => {
  ktpImage.value = null;
  const fileInput = document.getElementById("import-file");
  if (fileInput) {
    fileInput.value = ""; // Reset input file agar bisa upload gambar yang sama
  }
};

const checkActiveTab = (tab) => {
  console.log('setting tab : ', settingTab.value)
  return settingTab.value === tab ? true : false;
};

const activatedTab = (tab) => {
  console.log("activetab before : ", activeTab.value);

  activeTab.value = tab;
  console.log("activetab after : ", activeTab.value);
};

//API
const changePassword = async () => {
  console.log("password : ", passwordData.value);
  try {
    const passwordRequest = {
      current_password: passwordData.value.oldPassword,
      new_password: passwordData.value.newPassword,
      new_password_confirmation: passwordData.value.newConfirmationPassword,
    };

    const response = await axios.post(
      `${API_BASE_URL}/api/v1/password/change`,
      passwordRequest,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      console.log("Password Berhasil Diubah");
    }
  } catch (error) {
    console.error("error change password : ", error);
  }
};

const verifyEmail = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/email/verification`,
      {},
      {
        headers: {
          "Content-Type": "application",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Email Verifikasi Telah dikirim");
    } else if (response.status === 404) {
      console.log("User tidak ditemukan");
    } else {
      console.log("Ada kesalahan pada sistem");
    }
  } catch (error) {
    console.error("error verifikasi : ", error);
  }
};

const updateSocialMedia = async () => {
  console.log("update social media to : ", userProfile.value.socialMedia);
  try {
    const formData = new FormData();

    formData.append(
      "social_media",
      JSON.stringify(userProfile.value.socialMedia)
    );

    formData.append("_method", "PUT");

    // Lakukan request POST ke endpoint API yang sesuai
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/test-profile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 200) {
      console.log("Social Media updated successfully:", response.data);
      getUserProfile();
    }
  } catch (error) {
    console.error("Error updating Social Media:", error);
  }
};

const updateUserProfile = async () => {
  console.log("update profile : ", userProfile.value);
  try {
    const formData = new FormData();

    formData.append("full_name", userProfile.value.fullName);
    formData.append("address", userProfile.value.address);
    formData.append("nik", userProfile.value.nik);

    if (userProfile.value.birthDate) {
      formData.append("birth_date", userProfile.value.birthDate);
    }

    // Pastikan file yang diupload adalah File object
    if (
      userProfile.value.profilePicture &&
      userProfile.value.profilePicture instanceof File
    ) {
      formData.append("profile_picture", userProfile.value.profilePicture);
    }
    if (
      userProfile.value.profileCover &&
      userProfile.value.profileCover instanceof File
    ) {
      formData.append("profile_cover", userProfile.value.profileCover);
    }
    if (
      userProfile.value.ktpFile &&
      userProfile.value.ktpFile instanceof File
    ) {
      formData.append("scan_ktp", userProfile.value.ktpFile);
    }

    formData.append("phone_number", userProfile.value.phoneNumber);
    formData.append("jenis_kelamin", userProfile.value.jenisKelamin);
    formData.append("email", userProfile.value.email);
    formData.append(
      "social_media",
      JSON.stringify(userProfile.value.socialMedia)
    );
    formData.append("_method", "PUT");

    // Lakukan request POST ke endpoint API yang sesuai
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/test-profile/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status == 200) {
      console.log("Profile updated successfully:", response.data);
      getUserProfile();
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }
};

const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/test-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("is email verified : ", isEmailVerified.value);
    console.log("user : ", response.data.user);
    const data = response.data.user;
    userProfile.value = {
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

      socialMedia: JSON.parse(data.social_media), // Parsing string JSON menjadi objek
    };

    profileImage.value = userProfile.value.profilePicture;
    coverImage.value = userProfile.value.profileCover;
    ktpImage.value = userProfile.value.ktpFile;
    console.log("user profile HEADER : ", userProfile.value);
  } catch (error) {
    console.error("error Fetch User : ", error);
  }
};

watch(
  () => route.query.settingTab,
  (tab) => {
    if (tab) {
      settingTab.value = tab;
      console.log("tab changed to:", tab);
    }
  },
  { immediate: true } // Agar watch langsung dijalankan saat komponen dimuat
);

onMounted(() => {
  getUserProfile();
});
</script>

<template>
  <main class="bg-normalBG dark:bg-main-dark">
    <div
      class="mx-[30px] min-h-[calc(100vh-195px)] mb-[30px] ssm:mt-[30px] mt-[15px]"
    >
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12">
          <!-- Breadcrumb Section -->
          <div
            class="leading-[1.8571428571] flex flex-wrap sm:justify-between justify-center items-center ssm:mb-[33px] mb-[18px] max-sm:flex-col gap-x-[15px] gap-y-[5px]"
          >
            <!-- Title -->
            <h4
              class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold"
            >
              profile settings
            </h4>
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
                      >profile settings</span
                    >
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-12 sm:gap-[25px] gap-y-[25px]">
        <!-- Start sidebar -->
        <div class="col-span-12 2xl:col-span-3">
          <!-- Auhtor -->
          <div class="bg-white dark:bg-box-dark rounded-[10px] text-center">
            <div class="sm:px-[25px] px-[15px] pt-[25px] pb-[18px]">
              <figure
                class="relative mb-0 max-w-[120px] h-[120px] inline-block bg-normalBG dark:bg-box-dark-up rounded-full"
              >
                <img
                  id="widget-profile-upload-image"
                  class="max-w-[120px] min-w-[120px] h-[120px] rounded-full inline-block object-cover"
                  :src="
                    profileImage ? profileImage : userProfile.profilePicture
                  "
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
              <div class="mt-[28px]">
                <h3
                  class="text-[18px] mb-[6px] font-medium text-dark dark:text-title-dark leading-[23px] hover:[&>a]:text-primary"
                >
                  <a class="text-dark dark:text-title-dark" href="#">{{
                    userProfile.fullName
                  }}</a>
                </h3>
                <p class="text-[15px] text-light dark:text-subtitle-dark">
                  UI/UX Designer
                </p>
              </div>
            </div>
            <div class="border-t border-regular dark:border-box-dark-up">
              <nav class="px-[20px] pt-8 pb-5">
                <ul class="listItemActive" role="tablist" data-te-nav-ref>
                  <li role="presentation" v-for="profileTab in profileTabList">
                    <router-link
                      :to="{
                        path: '/dashboard/profile/setting',
                        query: {
                          settingTab: profileTab.tabSlug,
                        },
                      }"
                      data-te-toggle="pill"
                      data-te-target="#tabs-editProfile"
                      role="tab"
                      aria-controls="tabs-editProfile"
                      aria-selected="true"
                      class="[&.active]:bg-primary/10 [&.active]:text-primary bg-transparent cursor-pointer dark:text-subtitle-dark duration-300 flex font-normal gap-[12px] items-center px-[10px] [&.active]:px-[20px] hover:px-[20px] py-[10px] rounded-[6px] text-[14px] text-light transition-[0.3s] w-full"
                      :class="{
                        active: checkActiveTab(profileTab.tabSlug),
                      }"
                      data-te-nav-active
                    >
                      <i :class="[profileTab.tabIcon, 'text-[18px]']"></i>
                      {{ profileTab.tabName }}
                    </router-link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <!-- End: Auhtor -->
        </div>
        <!-- End sidebar -->
        <!-- Start Content -->
        <div class="col-span-12 2xl:col-span-9">
          <!-- Author profile cover -->
          <div
            v-if="settingTab === 'edit'"
            class="relative z-[1] bg-dark rounded-10 w-full flex mb-[25px]"
            data-te-ripple-init
            data-te-ripple-color="dark"
          >
            <img
              id="profile-upload-image"
              class="w-full sm:min-h-[240px] sm:max-h-[240px] object-cover rounded-10"
              :src="coverImage ? coverImage : userProfile.profileCover"
              alt="banner"
            />
            <div class="absolute rounded-md top-[15px] end-[15px]">
              <label
                id="profile-uploader"
                for="profile-dropzone-file"
                class="flex flex-col items-center justify-center px-4 py-2 transition duration-150 ease-linear border-white border-solid rounded-lg cursor-pointer border-1 xs:px-3 border-opacity-30 hover:bg-white hover:text-dark group"
              >
                <div class="flex flex-col items-center justify-center">
                  <p class="text-white gap-[8px] group-hover:text-dark">
                    <i
                      class="uil uil-camera text-[16px] text-white group-hover:text-dark"
                    ></i>
                    Change Cover
                  </p>
                </div>
                <input
                  @change="(e) => handleImageUpload(e, 'cover')"
                  id="profile-dropzone-file"
                  type="file"
                  accept="image/*"
                  class="hidden"
                />
              </label>
            </div>
          </div>
          <!-- End Author profile cover -->
          <!-- Tab Content -->
          <!-- Edit Profile -->
          <div
            v-if="settingTab === 'edit'"
            id="tabs-editProfile"
            role="tabpanel"
            aria-labelledby="tabs-editProfile-tab"
            class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            data-te-tab-active
          >
            <div class="bg-white dark:bg-box-dark rounded-10">
              <!-- Header -->
              <div
                class="py-4 px-6 text-dark dark:text-title-dark font-medium text-lg border-b border-regular dark:border-box-dark-up"
              >
                <h1 class="mb-1">Edit Profile</h1>
                <span class="text-sm text-light dark:text-subtitle-dark">
                  Set Up Your Personal Information
                </span>
              </div>

              <!-- Form Content -->
              <div class="px-6 pt-10 pb-12">
                <div
                  class="grid grid-cols-12 gap-y-6 sm:gap-x-6 content-center"
                >
                  <div
                    class="col-span-12 xl:col-start-2 xl:col-span-10 space-y-4"
                  >
                    <!-- Nama Lengkap -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        v-model="userProfile.fullName"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <!-- NIK -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        Nomor Induk Kependudukan
                      </label>
                      <input
                        type="text"
                        v-model="userProfile.nik"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <!-- Alamat -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        Alamat
                      </label>
                      <textarea
                        v-model="userProfile.address"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </div>
                    <!-- Tanggal Lahir  -->
                    <div>
                      <label
                        for="start_date"
                        class="block text-gray-700 dark:text-gray-300 font-medium"
                        >Tanggal Lahir</label
                      >
                      <input
                        id="start_date"
                        type="date"
                        v-model="userProfile.birthDate"
                        class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <!-- Jenis Kelamin -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                        >Jenis Kelamin</label
                      >
                      <select
                        v-model="userProfile.jenisKelamin"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="laki-laki">Laki-laki</option>
                        <option value="perempuan">Perempuan</option>
                      </select>
                    </div>
                    <!-- Unggah Scan KTP -->
                    <div class="mt-4">
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                        >Unggah Scan KTP</label
                      >
                      <div class="flex items-center justify-center">
                        <label
                          for="import-file"
                          class="flex flex-col items-center justify-center w-full sm:min-h-[150px] bg-white dark:bg-box-dark p-2 rounded-lg border-2 border-dashed border-[#c6d0dc] dark:border-box-dark-up hover:border-primary dark:hover:border-primary cursor-pointer transition-all duration-300 ease-linear"
                        >
                          <div
                            v-if="!ktpImage"
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
                              Drop File or
                              <span class="text-primary">Browse</span>
                            </p>
                          </div>
                          <input
                            id="import-file"
                            type="file"
                            class="hidden"
                            accept="image/*"
                            @change="(e) => handleImageUpload(e, 'ktp')"
                          />

                          <!-- Preview Image -->
                          <div v-if="ktpImage" class="w-full mt-2">
                            <img
                              :src="ktpImage ? ktpImage : userProfile.ktpFile"
                              class="w-full h-80 object-cover rounded-md"
                            />
                          </div>
                        </label>
                      </div>
                      <span v-if="ktpImage" class="text-xs text-gray-500"
                        >*Pastikan file yang diunggah jelas dan dapat
                        terbaca.</span
                      >

                      <div v-if="ktpImage" class="mt-2">
                        <button
                          @click="removeImage"
                          class="bg-red-600 text-white text-sm px-4 py-2 rounded-md shadow-md hover:bg-white hover:text-red-500 hover:ring-2 hover:ring-red-500 transition-all duration-300 ease-in-out"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                    <!-- Nomor Telepon -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        Nomor Telephone
                      </label>
                      <input
                        v-model="userProfile.phoneNumber"
                        type="text"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <!-- Tombol Aksi -->
                    <div
                      class="flex flex-wrap items-center gap-3 mt-8 justify-end"
                    >
                      <button
                        @click="updateUserProfile"
                        type="button"
                        class="group text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition duration-300 rounded-6 h-9 sm:px-5 px-4 flex items-center gap-2"
                      >
                        Update Profile
                      </button>
                      <button
                        type="button"
                        class="group text-sm font-semibold text-theme-gray bg-normalBG dark:bg-box-dark-up dark:text-title-dark border border-gray-300 hover:bg-gray-100 transition duration-300 rounded-6 h-9 sm:px-5 px-4 flex items-center gap-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- end Edit Profile -->
          <!-- timeline -->
          <div
            v-if="settingTab === 'account'"
            class="opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-accountSettings"
            role="tabpanel"
            aria-labelledby="tabs-accountSettings-tab"
          >
            <div class="bg-white dark:bg-box-dark rounded-10">
              <div
                class="py-[18px] px-[25px] text-dark dark:text-title-dark font-medium text-[17px] border-regular dark:border-box-dark-up border-b"
              >
                <h1
                  class="mb-0 text-lg font-medium text-dark dark:text-title-dark"
                >
                  Account Settings
                </h1>
                <span
                  class="mb-0.5 text-light dark:text-subtitle-dark text-13 font-normal"
                  >Update your username and manage your account</span
                >
              </div>
              <div class="px-[25px] pb-[50px] pt-[40px]">
                <div
                  class="grid grid-cols-12 sm:gap-[25px] gap-y-[25px] content-center"
                >
                  <div
                    class="col-span-12 xl:col-start-2 xl:col-span-10 space-y-4"
                  >
                    <!-- Email -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        Email
                        <span
                          v-if="isEmailVerified"
                          class="text-xs text-green-600"
                          >*verified</span
                        >
                      </label>
                      <input
                        v-model="userProfile.email"
                        type="email"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div v-if="!isEmailVerified" class="mt-2">
                        <button
                          @click="verifyEmail"
                          class="bg-primary text-white text-xs px-2 py-2 rounded-md shadow-md hover:bg-white hover:text-primary hover:ring-2 hover:ring-primary transition-all duration-300 ease-in-out"
                        >
                          Verify Email
                        </button>
                      </div>
                    </div>
                    <!-- Password  -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        Password
                      </label>
                      <input
                        v-model="passwordData.oldPassword"
                        type="password"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <!-- New Password  -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        New Password
                      </label>
                      <input
                        v-model="passwordData.newPassword"
                        type="password"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <!-- Confirmation New Password  -->
                    <div>
                      <label
                        class="block text-gray-700 dark:text-gray-300 font-medium mb-1"
                      >
                        ConfirmationNew Password
                      </label>
                      <input
                        v-model="passwordData.newConfirmationPassword"
                        type="password"
                        class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <!-- Tombol Aksi -->
                    <div
                      class="flex flex-wrap items-center justify-end gap-3 mt-8"
                    >
                      <button
                        @click="changePassword"
                        type="button"
                        class="group text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition duration-300 rounded-6 h-9 sm:px-5 px-4 flex items-center gap-2"
                      >
                        Update Account
                      </button>
                      <button
                        type="button"
                        class="group text-sm font-semibold text-theme-gray bg-normalBG dark:bg-box-dark-up dark:text-title-dark border border-gray-300 hover:bg-gray-100 transition duration-300 rounded-6 h-9 sm:px-5 px-4 flex items-center gap-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div class="col-span-12">
                    <hr
                      class="h-[1px] bg-regular dark:bg-box-dark-up border-0"
                    />
                  </div>
                  <div class="col-span-12 xl:col-start-4 xl:col-span-6">
                    <div class="flex items-center justify-between gap-[15px]">
                      <div>
                        <h1
                          class="text-base font-semibold text-dark dark:text-title-dark"
                        >
                          Close Account
                        </h1>
                        <p class="mb-0 text-body dark:text-subtitle-dark">
                          Delete Your Account and Account data
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="bg-danger whitespace-nowrap hover:bg-danger-hbr inline-flex items-center outline-none shadow-none duration-300 text-white capitalize px-[15px] text-[15px] border-danger font-semibold hover:border-danger-hbr rounded-[5px] gap-[8px] h-[40px]"
                        >
                          Close account
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end Account Setting -->

          <!-- Social Profiles -->
          <div
            v-if="settingTab === 'social'"
            class="opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-socialProfile"
            role="tabpanel"
            aria-labelledby="tabs-socialProfile-tab"
          >
            <div class="bg-white dark:bg-box-dark rounded-10">
              <div
                class="py-[18px] px-[25px] text-dark dark:text-title-dark font-medium text-[17px] border-regular dark:border-box-dark-up border-b"
              >
                <h1
                  class="mb-0 text-lg font-medium text-dark dark:text-title-dark"
                >
                  Change Password
                </h1>
                <span
                  class="mb-0.5 text-light dark:text-subtitle-dark text-13 font-normal"
                  >Change Or Reset Your Account Password</span
                >
              </div>
              <div class="px-[25px] pb-[50px] pt-[40px]">
                <div
                  class="grid grid-cols-12 sm:gap-[25px] gap-y-[25px] content-center"
                >
                  <div class="col-span-12 xl:col-start-2 xl:col-span-10">
                    <div>
                      <div
                        v-for="(item, index) in socialMediaFields"
                        :key="item.id"
                        class="mb-6"
                      >
                        <label
                          :for="item.id"
                          class="block mb-2 text-sm font-medium capitalize text-dark dark:text-title-dark"
                        >
                          {{ item.label }}:
                        </label>
                        <div
                          class="w-full rounded-6 border border-normal dark:bg-box-dark-up dark:border-box-dark-up text-[15px] outline-none placeholder:text-[#A0A0A0] text-theme-gray dark:text-subtitle-dark inline-flex items-center"
                        >
                          <button
                            type="button"
                            :class="[
                              'h-[48px] inline-flex items-center justify-center ms-[1px] outline-none rounded-4 shadow-none w-[48px]',
                              item.buttonClass,
                            ]"
                          >
                            <i :class="[item.icon, 'text-[20px]']"></i>
                          </button>
                          <input
                            :id="item.id"
                            type="text"
                            v-model="userProfile.socialMedia[item.id]"
                            :placeholder="item.placeholder"
                            class="bg-transparent border-none outline-none shadow-none min-h-[50px] placeholder:text-[14px] placeholder:text-theme-gray dark:placeholder:text-subtitle-dark px-[20px] w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      class="static flex flex-wrap items-center gap-[10px] sm:mt-[43px] mt-[24] justify-end"
                    >
                      <button
                        @click="updateSocialMedia"
                        type="button"
                        class="group text-[13px] border-normal font-semibold text-white dark:text-title-dark btn-outlined h-[37px] dark:border-box-dark-up sm:px-[20px] px-[15px] rounded-6 flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary-hbr bg-primary transition duration-300"
                        data-te-ripple-init=""
                        data-te-ripple-color="light"
                      >
                        Update Social profile
                      </button>
                      <button
                        type="button"
                        class="group text-[13px] font-semibold text-theme-gray bg-normalBG dark:bg-box-dark-up dark:text-title-dark btn-outlined h-[37px] dark:border-box-dark-up sm:px-[20px] px-[15px] rounded-6 flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-dark transition duration-300 border-1 border-normal"
                        data-te-ripple-init=""
                        data-te-ripple-color="light"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- end activity -->
          <!-- notifications -->
          <div
            v-if="activatedTab === 'notification'"
            class="opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            id="tabs-notification"
            role="tabpanel"
            aria-labelledby="tabs-notification-tab"
          >
            <div class="bg-white dark:bg-box-dark rounded-10">
              <div
                class="py-[18px] px-[25px] text-dark dark:text-title-dark font-medium text-[17px] border-regular dark:border-box-dark-up border-b"
              >
                <h1
                  class="mb-0 text-lg font-medium text-dark dark:text-title-dark"
                >
                  Notifications
                </h1>
                <span
                  class="mb-0.5 text-light dark:text-subtitle-dark text-13 font-normal"
                  >Choose What Notification you will Receive</span
                >
              </div>
              <div class="px-[25px] pb-[37px] pt-[30px]">
                <div
                  class="bg-regularBG dark:bg-box-dark-up px-[25px] pb-[25px] pt-[15px] max-sm:px-[15px] rounded-[10px]"
                >
                  <div class="flex items-center justify-between h-[50px]">
                    <h2
                      class="text-light dark:text-white/60 text-[15px] font-medium"
                    >
                      Notifications
                    </h2>
                    <button
                      class="switch-trigger font-normal text-info text-[13px] border-none outline-none shadow-none bg-transparent"
                    >
                      Toggle all
                    </button>
                  </div>
                  <div
                    class="bg-white dark:bg-box-dark shadow-[0_5px_20px_rgba(173,181,217,0.05)] rounded-[10px]"
                  >
                    <ul>
                      <li
                        class="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular last:border-none dark:border-box-dark-up gap-[15px]"
                      >
                        <div>
                          <h4
                            class="mb-0.5 text-body dark:text-title-dark text-sm font-medium capitalize"
                          >
                            company name
                          </h4>
                          <p
                            class="mb-0 text-sm capitalize text-light dark:text-subtitle-dark"
                          >
                            Get Company News, announcements, and product updates
                          </p>
                        </div>
                        <label
                          for="switch1"
                          class="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            id="switch1"
                            name="switch1"
                            type="checkbox"
                            value=""
                            class="sr-only peer switch-group"
                          />
                          <div
                            class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                          ></div>
                        </label>
                      </li>
                      <li
                        class="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular last:border-none dark:border-box-dark-up gap-[15px]"
                      >
                        <div>
                          <h4
                            class="mb-0.5 text-body dark:text-title-dark text-sm font-medium capitalize"
                          >
                            Meetups Near You
                          </h4>
                          <p
                            class="mb-0 text-sm capitalize text-light dark:text-subtitle-dark"
                          >
                            Get Company News, announcements, and product updates
                          </p>
                        </div>
                        <label
                          for="switch2"
                          class="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            id="switch2"
                            name="switch2"
                            type="checkbox"
                            value=""
                            class="sr-only peer switch-group"
                          />
                          <div
                            class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                          ></div>
                        </label>
                      </li>
                      <li
                        class="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular last:border-none dark:border-box-dark-up gap-[15px]"
                      >
                        <div>
                          <h4
                            class="mb-0.5 text-body dark:text-title-dark text-sm font-medium capitalize"
                          >
                            Opportunities
                          </h4>
                          <p
                            class="mb-0 text-sm capitalize text-light dark:text-subtitle-dark"
                          >
                            Get Company News, announcements, and product updates
                          </p>
                        </div>
                        <label
                          for="switch3"
                          class="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            id="switch3"
                            name="switch3"
                            type="checkbox"
                            value=""
                            class="sr-only peer switch-group"
                          />
                          <div
                            class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                          ></div>
                        </label>
                      </li>
                      <li
                        class="flex items-center justify-between mb-0 px-[25px] py-[20px] border-b border-regular last:border-none dark:border-box-dark-up gap-[15px]"
                      >
                        <div>
                          <h4
                            class="mb-0.5 text-body dark:text-title-dark text-sm font-medium capitalize"
                          >
                            Weekly Newsletters
                          </h4>
                          <p
                            class="mb-0 text-sm capitalize text-light dark:text-subtitle-dark"
                          >
                            Get Company News, announcements, and product updates
                          </p>
                        </div>
                        <label
                          for="switch4"
                          class="relative inline-flex items-center cursor-pointer"
                        >
                          <input
                            id="switch4"
                            name="switch4"
                            type="checkbox"
                            value=""
                            class="sr-only peer switch-group"
                          />
                          <div
                            class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                          ></div>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  class="static flex flex-wrap items-center gap-[10px] sm:mt-[43px] mt-[24]"
                >
                  <button
                    type="button"
                    class="group text-[13px] border-normal font-semibold text-white dark:text-title-dark btn-outlined h-[37px] dark:border-box-dark-up sm:px-[20px] px-[15px] rounded-6 flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-primary-hbr bg-primary transition duration-300"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                  >
                    Update Social profile
                  </button>
                  <button
                    type="button"
                    class="group text-[13px] font-semibold text-theme-gray bg-normalBG dark:bg-box-dark-up dark:text-title-dark btn-outlined h-[37px] dark:border-box-dark-up sm:px-[20px] px-[15px] rounded-6 flex items-center gap-[5px] leading-[22px] hover:text-white hover:bg-dark transition duration-300 border-1 border-normal"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- end activity -->
          <!-- End: Tab Content -->
        </div>
        <!-- End Content -->
      </div>
    </div>
  </main>
</template>
