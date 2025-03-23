<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toast-notification";

const authStore = useAuthStore();
const toastNotification = useToast();
const router = useRouter();
const isLogin = ref(false);
const activeDropdown = ref(null);
const user = ref(
  JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null
);

const openNotificatication = (message) => {
  toastNotification.open({
    type: "success",
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

const signOut = async () => {
  try {
    const response = await api.post("/logout", {});

    if (response.status === 200) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      authStore.logout();
      openNotificatication("Anda Berhasil Sign Out");

      user.value = null;
      isLogin.value = false;
      router.push("/");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

const toggleDropdown = (dropdownName) => {
  activeDropdown.value =
    activeDropdown.value === dropdownName ? null : dropdownName;
};
const isDropdownOpen = (dropdownName) => activeDropdown.value === dropdownName;

// Close dropdown on outside click
const closeDropdownOnClickOutside = (event) => {
  // Check if the click is outside any dropdown or button
  console.log(isDropdownOpen("profile"));
  if (
    !event.target.closest("[data-dropdown-button]") &&
    !event.target.closest("[data-dropdown-content]")
  ) {
    activeDropdown.value = null;
  }
};

onMounted(() => {
  document.addEventListener("click", closeDropdownOnClickOutside);
  if (user.value) {
    isLogin.value = true;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdownOnClickOutside);
});
</script>

<template>
  <nav class="border-gray-200 sticky top-0 z-50 bg-white shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/" class="cursor-pointer">
            <span class="text-2xl font-bold text-green-600">SHCUnion</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-6">
          <router-link
            to="/"
            class="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >Beranda</router-link
          >
          <router-link
            to="/project/list"
            class="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >Proyek</router-link
          >
          <a
            href="#"
            class="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >Tentang Kami</a
          >
          <a
            href="#"
            class="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >Hubungi Kami</a
          >
        </div>

        <!-- Auth Buttons -->
        <div class="flex items-center space-x-4">
          <router-link
            v-if="!isLogin"
            to="/login"
            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 shadow-md font-semibold transition-all hover:shadow-lg"
            >Masuk</router-link
          >
          <!-- <router-link
            to="/dashboard/project"
            class="bg-green-600 text-white px-3 py-3 rounded-lg hover:bg-green-700 shadow-md font-semibold transition-all hover:shadow-lg"
            >Mulai Proyek</router-link
          > -->

          <div
            v-if="user"
            class="flex justify-center items-center gap-x-3 relative"
            data-te-dropdown-ref
          >
            <span class="text-gray-700 font-medium">{{ user.full_name }}</span>
            <button
              data-dropdown-button="profile"
              @click="toggleDropdown('profile')"
              type="button"
              id="author-dropdown"
              data-te-dropdown-toggle-ref
              aria-expanded="false"
              class="flex items-center me-1.5 text-body dark:text-subtitle-dark text-sm font-medium capitalize rounded-full md:me-0 group whitespace-nowrap"
            >
              <img
                class="min-w-[32px] w-8 h-8 rounded-full xl:me-2"
                :src="user?.profile_picture"
                alt="user photo"
              />
              <i
                class="uil uil-angle-down text-light dark:text-subtitle-dark text-[18px] hidden xl:block"
              ></i>
            </button>

            <!-- Dropdown menu -->
            <div
              data-dropdown-content-="profile"
              :class="{
                'absolute z-[1000]v top-0 right-[0px] ltr:float-left rtl:float-right m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block': true,
                hidden: !isDropdownOpen('profile'),
              }"
              aria-labelledby="author-dropdown"
              data-te-dropdown-menu-ref
            >
              <div
                class="min-w-[310px] max-sm:min-w-full pt-4 px-[15px] py-[12px] bg-white dark:bg-box-dark shadow-[0_2px_8px_rgba(0,0,0,.15)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4"
              >
                <figure
                  class="flex items-center text-sm rounded-[8px] bg-section dark:bg-box-dark-up py-[20px] px-[25px] mb-[12px] gap-[15px]"
                >
                  <img
                    class="w-8 h-8 rounded-full bg-regular"
                    :src="user?.profile_picture"
                    alt="user"
                  />
                  <figcaption>
                    <div class="text-dark dark:text-title-dark mb-0.5 text-sm">
                      {{ user.full_name }}
                    </div>
                    <div class="mb-0 text-xs" :class="user?.badge_color">
                      {{ user.badge }}
                    </div>
                  </figcaption>
                </figure>
                <ul
                  class="m-0 pb-[10px] overflow-x-hidden overflow-y-auto scrollbar bg-transparent max-h-[230px]"
                >
                  <li class="w-full">
                    <div
                      class="p-0 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-box-dark-up rounded-4"
                    >
                      <router-link
                        to="/dashboard/profile/setting"
                        class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                      >
                        <i class="text-[16px] uil uil-user"></i>
                        Profile
                      </router-link>
                    </div>
                  </li>
                  <li class="w-full">
                    <!-- Dropdown Setting -->
                    <div
                      class="p-0 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-box-dark-up rounded-4"
                    >
                      <router-link
                        :to="`/dashboard/${user.user_id}`"
                        class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                      >
                        <i class="text-[16px] uil uil-setting"></i>
                        Dashboard
                      </router-link>
                    </div>
                  </li>
                  <li class="w-full">
                    <!-- Dropdown Setting -->
                    <div
                      class="p-0 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-box-dark-up rounded-4"
                    >
                      <button
                        class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                      >
                        <i class="text-[16px] uil uil-setting"></i>
                        Settings
                      </button>
                    </div>
                  </li>

                  <li class="w-full">
                    <div
                      class="p-0 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-box-dark-up rounded-4"
                    >
                      <button
                        class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                      >
                        <i class="text-[16px] uil uil-users-alt"></i>
                        Activity
                      </button>
                    </div>
                  </li>
                  <li class="w-full">
                    <div
                      class="p-0 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-box-dark-up rounded-4"
                    >
                      <button
                        class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                      >
                        <i class="text-[16px] uil uil-bell"></i>
                        Help
                      </button>
                    </div>
                  </li>
                </ul>
                <button
                  @click="signOut"
                  class="flex items-center justify-center text-sm font-medium bg-normalBG dark:bg-box-dark-up h-[50px] text-light hover:text-primary dark:hover:text-subtitle-dark dark:text-title-dark rounded-b-6 gap-[6px] w-full"
                >
                  <i class="uil uil-sign-out-alt"></i> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
