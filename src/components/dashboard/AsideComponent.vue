<script setup>
import { ref, computed, nextTick } from "vue";

const userId = JSON.parse(localStorage.getItem("user")).user_id;
const isProjectOpen = ref(false);
const dropdownMenu = ref(null);

const isAgendaOpen = ref(false);
const dropdownAgenda = ref(null);

const isInformationOpen = ref(false);
const dropdownInformation = ref(null);

const isManagementOpen = ref(false);
const dropdownManagement = ref(null);

const dropdownAgendaStyle = computed(() => ({
  height:
    isAgendaOpen.value && dropdownAgenda.value
      ? `${dropdownAgenda.value.scrollHeight}px`
      : "0px",
}));

// Hitung tinggi dropdown untuk animasi
const dropdownStyle = computed(() => ({
  height:
    isProjectOpen.value && dropdownMenu.value
      ? `${dropdownMenu.value.scrollHeight}px`
      : "0px",
}));

const dropdownManagementStyle = computed(() => ({
  height:
    isManagementOpen.value && dropdownManagement.value
      ? `${dropdownManagement.value.scrollHeight}px`
      : "0px",
}));

const dropdownInformationstyle = computed(() => ({
  height:
    isInformationOpen.value && isInformationOpen.value
      ? `${dropdownInformation.value.scrollHeight}px`
      : "0px",
}));

// Fungsi toggle untuk setiap dropdown
const toggleDropdown = async (menu) => {
  if (menu === "project") {
    isProjectOpen.value = !isProjectOpen.value;
    isAgendaOpen.value = false; // Tutup dropdown lain
    isInformationOpen.value = false;
    isManagementOpen.value = false;
  } else if (menu === "agenda") {
    isAgendaOpen.value = !isAgendaOpen.value;
    isProjectOpen.value = false; // Tutup dropdown lain
    isInformationOpen.value = false;
    isManagementOpen.value = false;
  } else if (menu === "information") {
    isInformationOpen.value = !isInformationOpen.value;
    isProjectOpen.value = false; // Tutup dropdown lain
    isAgendaOpen.value = false;
    isManagementOpen.value = false;
  } else if (menu === "manage") {
    isManagementOpen.value = !isManagementOpen.value;
    isProjectOpen.value = false; // Tutup dropdown lain
    isInformationOpen.value = false;
    isAgendaOpen.value = false;
    console.log("manage : ", isManagementOpen.value);
  }
  await nextTick();
};

defineProps({
  isCollapsed: Boolean,
});

// console.log(isCollapsed);
</script>
<template>
  <aside
    id="asideBar"
    :class="{
      collapsed: isCollapsed,
      TopCollapsed: isCollapsed,
    }"
    class="asidebar dark:bg-box-dark fixed start-0 top-0 z-[1035] h-screen overflow-hidden bg-white xl:!w-[280px] xl:[&.collapsed]:!w-[0px] [&.collapsed]:!w-[250px] xl:[&.TopCollapsed]:!w-[0px] [&.TopCollapsed]:!w-[250px] !transition-all !duration-[0.2s] ease-linear delay-[0s] !w-0 xl:[&.collapsed>.logo-wrapper]:w-[0px]"
  >
    <div
      class="flex w-[280px] border-e border-[#edf2f9] dark:border-box-dark-up logo-wrapper items-center h-[71px] dark:bg-box-dark-up max-xl:hidden"
    >
      <router-link to="/" class="block text-center">
        <div class="logo-full">
          <img
            class="ps-[27px] dark:hidden"
            src="../../assets/images/logos/logo-dark.png"
            alt="Logo"
          />
          <img
            class="ps-[27px] hidden dark:block"
            src="../../assets/images/logos/logo-white.png"
            alt="Logo"
          />
        </div>
        <div class="hidden logo-fold">
          <img
            class="p-[27px] max-w-[80px]"
            src="../../assets/images/logos/logo-fold.png"
            alt="Logo"
          />
        </div>
      </router-link>
    </div>
    <nav
      id="navBar"
      :class="{
        collapsed: isCollapsed,
        TopCollapsed: isCollapsed,
      }"
      class="navBar dark:bg-box-dark start-0 max-xl:top-[80px] z-[1035] h-full overflow-y-auto bg-white xl:!w-[280px] xl:[&.collapsed]:!w-[80px] [&.collapsed]:!w-[250px] xl:[&.TopCollapsed]:!w-[0px] [&.TopCollapsed]:!w-[250px] !transition-all !duration-[0.2s] ease-linear delay-[0s] !w-0 pb-[100px] scrollbar xl:[&.collapsed]:ps-[7px] relative"
    >
      <ul class="relative m-0 list-none px-[0.2rem]">
        <li class="relative sub-item-wrapper group">
          <router-link
            :to="`/dashboard/${userId}`"
            class="group-[.open]:bg-primary/10 rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary dark:active:text-title-dark active:outline-none [&.active]:text-primary dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-apps"></i>
            </span>
            <span class="capitalize title">Dashboard</span>
          </router-link>
        </li>
        <li class="relative">
          <a
            href="change-log.html"
            class="rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary active:outline-none [&.active]:text-primary dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-arrow-growth"></i>
            </span>
            <span class="capitalize title">Change log</span>
            <span
              class="arrow-down absolute end-0 me-[0.8rem] ms-auto inline-flex items-center whitespace-nowrap rounded-full bg-info/10 px-[0.65em] pb-[0.25em] pt-[0.30em] text-center align-baseline text-[10px] font-bold leading-none text-info group-[&.active]:hidden"
            >
              1.0.2
            </span>
          </a>
        </li>
        <li class="relative sub-item-wrapper group">
          <span
            class="slug dark:text-white/40 mb-[10px] mt-[30px] block px-6 text-[12px] font-medium uppercase text-light"
            >Aplikasi</span
          >
        </li>

        <li
          class="relative sub-item-wrapper group"
          :class="{ open: isProjectOpen }"
        >
          <a
            @click="toggleDropdown('project')"
            class="group-[.open]:bg-primary/10 rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary dark:active:text-title-dark active:outline-none dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize active"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-folder"></i>
            </span>
            <span class="capitalize title">proyek</span>
            <span
              class="arrow-down text-gray-600 dark:text-subtitle-dark absolute end-0 me-[0.8rem] ms-auto text-[18px] transition-transform duration-300 ease-linear motion-reduce:transition-none group-hover:text-current"
              :class="{ 'rotate-180': isProjectOpen }"
            >
              <i class="uil uil-angle-down"></i>
            </span>
          </a>
          <ul
            ref="dropdownMenu"
            :style="dropdownStyle"
            class="sub-item m-0 list-none overflow-hidden transition-all duration-300 ease-in-out"
          >
            <li class="relative">
              <router-link
                to="/dashboard/project"
                class="rounded-e-[20px] hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark focus:bg-primary/10 focus:text-inherit active:bg-primary/10 active:text-inherit focus:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark dark:text-subtitle-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] text-body outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize active"
              >
                proyek
              </router-link>
            </li>
            <li class="relative">
              <router-link
                to="/dashboard/kontribusi"
                class="rounded-e-[20px] hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark focus:bg-primary/10 focus:text-inherit active:bg-primary/10 active:text-inherit [&.active]:text-primary focus:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark dark:text-subtitle-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] text-body outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize"
              >
                kontribusi
              </router-link>
            </li>
          </ul>
        </li>

        <!-- Manage Project  -->
        <li
          v-access="{
            role: ['admin'],
            permission: ['open-management-project', 'open-management-account'],
          }"
          class="relative sub-item-wrapper group"
          :class="{ open: isManagementOpen }"
        >
          <a
            @click="toggleDropdown('manage')"
            class="group-[.open]:bg-primary/10 rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary dark:active:text-title-dark active:outline-none dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize active"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-briefcase"></i>
            </span>
            <span class="capitalize title">Manajemen</span>
            <span
              class="arrow-down text-gray-600 dark:text-subtitle-dark absolute end-0 me-[0.8rem] ms-auto text-[18px] transition-transform duration-300 ease-linear motion-reduce:transition-none group-hover:text-current"
              :class="{ 'rotate-180': isManagementOpen }"
            >
              <i class="uil uil-angle-down"></i>
            </span>
          </a>
          <ul
            ref="dropdownManagement"
            :style="dropdownManagementStyle"
            class="sub-item m-0 list-none overflow-hidden transition-all duration-300 ease-in-out"
          >
            <li class="relative">
              <router-link
                to="/dashboard/management/project"
                class="rounded-e-[20px] hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark focus:bg-primary/10 focus:text-inherit active:bg-primary/10 active:text-inherit focus:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark dark:text-subtitle-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] text-body outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize active"
              >
                proyek
              </router-link>
            </li>
            <li class="relative">
              <router-link
                to="/dashboard/management/account"
                class="rounded-e-[20px] hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark focus:bg-primary/10 focus:text-inherit active:bg-primary/10 active:text-inherit [&.active]:text-primary focus:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark dark:text-subtitle-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] text-body outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize"
              >
                Akun Pengguna
              </router-link>
            </li>
          </ul>
        </li>

        <li
          class="relative sub-item-wrapper group"
          :class="{ open: isAgendaOpen }"
        >
          <a
            @click="toggleDropdown('agenda')"
            class="group-[.open]:bg-primary/10 rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary dark:active:text-title-dark active:outline-none dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize active"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-calendar-alt"></i>
            </span>
            <span class="capitalize title">Agenda</span>
            <span
              class="arrow-down text-gray-600 dark:text-subtitle-dark absolute end-0 me-[0.8rem] ms-auto text-[18px] transition-transform duration-300 ease-linear motion-reduce:transition-none group-hover:text-current"
              :class="{ 'rotate-180': isAgendaOpen }"
            >
              <i class="uil uil-angle-down"></i>
            </span>
          </a>
          <ul
            ref="dropdownAgenda"
            :style="dropdownAgendaStyle"
            class="sub-item m-0 list-none overflow-hidden transition-all duration-300 ease-in-out"
          >
            <li class="relative">
              <a
                class="rounded-e-[20px] hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark focus:bg-primary/10 focus:text-inherit active:bg-primary/10 active:text-inherit focus:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark dark:text-subtitle-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] text-body outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize active gap-x-2"
              >
                <span class="capitalize title">komunitas</span>
                <span class="text-gray-400">(Segera)</span>
              </a>
            </li>
            <li class="relative">
              <router-link
                to="/dashboard/calendar"
                class="rounded-e-[20px] hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark focus:bg-primary/10 focus:text-inherit active:bg-primary/10 active:text-inherit [&.active]:text-primary focus:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark dark:text-subtitle-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] text-body outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize"
              >
                kalender
              </router-link>
            </li>
          </ul>
        </li>

        <li class="relative">
          <router-link
            to="/dashboard/chat"
            class="rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary active:outline-none [&.active]:text-primary dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-chat"></i>
            </span>
            <span class="capitalize title">Chat</span>
            <span
              class="arrow-down absolute end-0 me-[0.8rem] ms-auto inline-flex items-center whitespace-nowrap rounded-full bg-success px-[0.65em] pb-[0.25em] pt-[0.30em] text-center align-baseline text-[10px] font-bold leading-none text-white group-[&.active]:hidden"
            >
              3
            </span>
          </router-link>
        </li>
        <li class="relative">
          <a
            class="rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary active:outline-none [&.active]:text-primary dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-shopping-cart"></i>
            </span>
            <span class="capitalize title">e-Commerce</span>
            <span class="text-gray-400">(Segera)</span>
          </a>
        </li>

        <li
          class="relative sub-item-wrapper group"
          :class="{ open: isInformationOpen }"
        >
          <a
            @click="toggleDropdown('information')"
            class="group-[.open]:bg-primary/10 rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary dark:active:text-title-dark active:outline-none dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize active"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-lightbulb"></i>
            </span>
            <span class="capitalize title">Informasi</span>
            <span
              class="arrow-down text-gray-600 dark:text-subtitle-dark absolute end-0 me-[0.8rem] ms-auto text-[18px] transition-transform duration-300 ease-linear motion-reduce:transition-none group-hover:text-current"
              :class="{ 'rotate-180': isInformationOpen }"
            >
              <i class="uil uil-angle-down"></i>
            </span>
          </a>
          <ul
            ref="dropdownInformation"
            :style="dropdownInformationstyle"
            class="sub-item m-0 list-none overflow-hidden transition-all duration-300 ease-in-out"
          >
            <!-- Elemen Anak 1 -->
            <li class="relative">
              <router-link
                to="/dashboard/guidance"
                class="rounded-e-[20px] bg-transparent text-gray-700 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-title-dark focus:bg-primary/10 focus:text-primary active:bg-primary/10 active:text-primary [&.active]:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize"
              >
                Panduan Komunitas
              </router-link>
            </li>
            <!-- Elemen Anak 2 -->
            <li class="relative">
              <router-link
                to="/dashboard/news/article"
                class="rounded-e-[20px] bg-transparent text-gray-700 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-title-dark focus:bg-primary/10 focus:text-primary active:bg-primary/10 active:text-primary [&.active]:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize"
              >
                Artikel & Berita
              </router-link>
            </li>
            <!-- Elemen Anak 3 -->
            <li class="relative">
              <router-link
                to="/dashboard/faq"
                class="rounded-e-[20px] bg-transparent text-gray-700 hover:bg-primary/10 hover:text-primary dark:text-gray-400 dark:hover:text-title-dark focus:bg-primary/10 focus:text-primary active:bg-primary/10 active:text-primary [&.active]:text-primary dark:focus:text-title-dark dark:[&.active]:text-title-dark flex cursor-pointer items-center truncate py-[10px] pe-6 ps-[60px] text-[14px] outline-none transition duration-300 ease-linear hover:outline-none focus:outline-none active:outline-none motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up capitalize"
              >
                FAQ
              </router-link>
            </li>
          </ul>
        </li>

        <li class="relative sub-item-wrapper group">
          <span
            class="slug dark:text-white/40 mb-[10px] mt-[30px] block px-6 text-[12px] font-medium uppercase text-light"
            >Pengaturan</span
          >
        </li>

        <li class="relative">
          <router-link
            :to="{
              path: '/dashboard/profile/setting',
              query: { settingTab: 'edit' },
            }"
            class="rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary active:outline-none [&.active]:text-primary dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-user-circle"></i>
            </span>
            <span class="capitalize title">Profile</span>
          </router-link>
        </li>

        <li class="relative">
          <router-link
            :to="{
              path: '/dashboard/profile/setting',
              query: { settingTab: 'account' },
            }"
            class="rounded-e-[20px] hover:bg-primary/10 focus:bg-primary/10 active:bg-primary/10 dark:text-subtitle-dark flex h-12 cursor-pointer items-center gap-[16px] truncate px-6 py-4 text-[14px] font-medium text-body outline-none transition duration-300 ease-linear hover:text-primary dark:hover:text-title-dark hover:outline-none focus:text-primary dark:focus:text-title-dark focus:outline-none active:text-primary active:outline-none [&.active]:text-primary dark:[&.active]:text-title-dark motion-reduce:transition-none dark:hover:bg-box-dark-up dark:focus:bg-box-dark-up dark:active:bg-box-dark-up group capitalize"
          >
            <span
              class="nav-icon dark:text-subtitle-dark text-[18px] text-light-extra group-hover:text-current group-[&.active]:text-current group-focus:text-current"
            >
              <i class="uil uil-shield"></i>
            </span>
            <span class="capitalize title">Keamanan</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style>
.open .arrow-down {
  transform: rotate(180deg);
}

.sub-item {
  transition: height 0.3s ease-in-out;
}
.navBar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.navBar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, and Edge */
}

/* Border halus */
.navBar {
  border-right: 0.2px solid #e5e7eb;
  /* box-shadow: inset -2px 0 4px rgba(0, 0, 0, 0.05); Ilusi tepi */
}
</style>
