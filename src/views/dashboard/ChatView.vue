<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// State
const activeTab = ref("private-chat");
const isSidebarCollapse = ref(false);
const isMdScreen = ref(false);

const messages = [
  {
    idMessage: 1,
    sender: "John Doe",
    date: "2025-01-16",
    message: "Hello, how are you?",
    avatar: "../../assets/images/avatars/t1.jpg",
  },
  {
    idMessage: 2,
    sender: "Jane Doe",
    date: "2025-01-16",
    message: "I am fine, thank you!",
    avatar: "../../assets/images/avatars/t2.jpg",
  },
];

const groupMessages = [
  {
    id: 1,
    name: "Group 1",
    date: "2025-01-16",
    message: "Welcome to the group!",
    avatar: "../../assets/images/avatars/t3.jpg",
  },
  {
    id: 2,
    name: "Group 2",
    date: "2025-01-16",
    message: "Let’s discuss the project.",
    avatar: "../../assets/images/avatars/t4.jpg",
  },
];

const sidebarCollapse = () => {
  isSidebarCollapse.value = !isSidebarCollapse.value;
  console.log('Sidebar Collapse ', isSidebarCollapse.value)
};

// Fungsi untuk mengecek ukuran layar
const checkScreenSize = () => {
  isMdScreen.value = window.matchMedia("(min-width: 989px)").matches;
  if(isMdScreen.value) {
    isSidebarCollapse.value = false;
  }
  console.log('Screen Medium ',isMdScreen.value)
};

// Methods
const switchTab = (tab) => {
  activeTab.value = tab;
};

// Set up event listener untuk resize
onMounted(() => {
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<template>
  <!-- Main Content -->
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
            <!-- <h4
              class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold"
            >
              chat
            </h4> -->
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
                      >chat</span
                    >
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <!-- Responsive Toggler -->
      <div
        class="flex items-center justify-center lg:hidden ssm:mb-[30px] mb-[15px]"
      >
        <button
          @click="sidebarCollapse"
          id="chat-sidebar-selector"
          type="button"
          class="text-danger text-sm font-semibold inline-flex justify-center items-center w-[40px] h-[40px] bg-white rounded-6 dark:bg-box-dark-up"
        >
          <i class="uil uil-align-left text-[24px]"></i>
        </button>
      </div>
      <div class="grid grid-cols-12 lg:gap-5">
        <!-- Start sidebar -->
        <div class="w-full col-span-12 3xl:col-span-3 lg:col-span-4">
          <div
            id="chat-sidebar-target"
            :class="{
              'bg-white dark:bg-box-dark lg:rounded-[10px] max-lg:rounded-e-[10px] max-lg:w-[260px] max-lg:fixed max-lg:z-[111] max-lg:start-0 [&.nav-open]:translate-x-0 max-lg:top-[70px] max-lg:h-full  rtl:max-lg:translate-x-[260px] max-lg:shadow-lg duration-200 pt-[30px]': true,
              'translate-x-[-260px]': isSidebarCollapse,
              'translate-x-0': !isSidebarCollapse || !isMdScreen, // Reset jika bukan md
            }"
          >
            <!-- search -->
            <div
              class="rounded-[25px] bg-normalBG dark:bg-box-dark-up flex items-center pe-[20px] mx-[25px]"
            >
              <input
                type="text"
                placeholder="Input Here"
                class="h-[46px] ps-[20px] pe-[30px] bg-transparent w-full outline-none border-none text-body dark:text-title-dark placeholder:text-body dark:placeholder:text-subtitle-dark"
              />
              <i
                class="uil uil-search text-[18px] text-[#8C90A4] dark:text-subtitle-dark"
              ></i>
            </div>
            <!-- End search -->
            <!-- Nav -->
            <ul
              role="tablist"
              class="listItemActive flex justify-center gap-6 border-b border-regular dark:border-box-dark-up mx-[25px] mt-3"
            >
              <li role="presentation" class="flex items-center gap-2">
                <a
                  v-if="isMdScreen"
                  href="#"
                  class="relative flex items-center capitalize text-light dark:text-subtitle-dark"
                  :class="{ active: activeTab === 'private-chat' }"
                  @click.prevent="switchTab('private-chat')"
                >
                  Private Chat
                </a>
                <a
                  v-if="!isMdScreen"
                  href="#"
                  class="relative flex items-center capitalize text-light dark:text-subtitle-dark"
                  :class="{ active: activeTab === 'private-chat' }"
                  @click.prevent="switchTab('private-chat')"
                >
                  Private
                </a>
                <span
                  class="me-auto inline-flex items-center justify-center whitespace-nowrap rounded-full bg-danger w-[20px] h-[20px] text-center align-baseline text-[10px] font-bold leading-none text-white group-[.active]:hidden"
                >
                  5
                </span>
              </li>
              <li role="presentation" class="flex items-center gap-2">
                <a
                  href="#"
                  class="relative flex items-center capitalize text-light dark:text-subtitle-dark"
                  :class="{ active: activeTab === 'group-chat' }"
                  @click.prevent="switchTab('group-chat')"
                >
                  Group Chat
                </a>
                <span
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-danger w-[20px] h-[20px] text-center text-[10px] font-bold leading-none text-white group-[.active]:hidden"
                >
                  5
                </span>
              </li>
            </ul>
            <!-- End Nav -->

            <!-- Private Chat -->
            <ul
              v-show="activeTab === 'private-chat'"
              class="private-chat p-0 max-h-[535px] relative overflow-x-hidden overflow-y-auto scrollbar pt-[16px]"
            >
              <li v-for="message in messages" :key="message.idMessage">
                <div
                  class="group relative block w-full px-[25px] sm:py-3.5 max-sm:py-1.5 text-body"
                >
                  <figure
                    class="inline-flex w-full mb-0 align-top sm:gap-x-[16px] gap-y-[8px]"
                  >
                    <div
                      class="w-[40px] min-w-[40px] h-[40px] rounded-full relative"
                    >
                      <img
                        class="object-cover w-[40px] h-[40px] bg-light-extra rounded-full"
                        :src="message.avatar"
                        alt="Avatar"
                      />
                    </div>
                    <figcaption class="w-full -mt-1 text-start">
                      <h1
                        class="flex items-center justify-between mb-0.5 text-sm font-semibold"
                      >
                        {{ message.sender }}
                        <span class="text-xs font-normal">{{
                          message.date
                        }}</span>
                      </h1>
                      <span class="text-body">{{ message.message }}</span>
                    </figcaption>
                  </figure>
                </div>
              </li>
            </ul>

            <!-- Group Chat -->
            <ul
              v-show="activeTab === 'group-chat'"
              class="group-chat p-0 max-h-[535px] relative overflow-x-hidden overflow-y-auto scrollbar pt-[16px]"
            >
              <li v-for="groupMessage in groupMessages" :key="groupMessage.id">
                <div
                  class="group relative block w-full px-[25px] sm:py-3.5 max-sm:py-1.5 text-body"
                >
                  <figure
                    class="inline-flex w-full mb-0 align-top sm:gap-x-[16px] gap-y-[8px]"
                  >
                    <div
                      class="w-[40px] min-w-[40px] h-[40px] rounded-full relative"
                    >
                      <img
                        class="object-cover w-[40px] h-[40px] bg-light-extra rounded-full"
                        :src="groupMessage.avatar"
                        alt="Avatar"
                      />
                    </div>
                    <figcaption class="w-full -mt-1 text-start">
                      <h1
                        class="flex items-center justify-between mb-0.5 text-sm font-semibold"
                      >
                        {{ groupMessage.name }}
                        <span class="text-xs font-normal">{{
                          groupMessage.date
                        }}</span>
                      </h1>
                      <span class="text-body">{{ groupMessage.message }}</span>
                    </figcaption>
                  </figure>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <!-- End sidebar -->
        <!-- Start Content -->
        <div class="w-full col-span-12 3xl:col-span-9 lg:col-span-8">
          <div class="bg-white dark:bg-box-dark rounded-[10px]">
            <div
              class="private-chat hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            ></div>
            <div
              class="group-chat hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
              data-te-tab-active
            >
              <!-- Header -->
              <div
                class="ssm:px-[25px] px-[15px] py-[15.50px] border-b-1 border-regular dark:border-white/10"
              >
                <div
                  class="flex items-center ssm:justify-between justify-center max-ssm:flex-wrap gap-x-[15px] gap-y-[5px]"
                >
                  <div
                    class="flex items-center justify-center w-full gap-x-1 py-[10px]"
                  >
                    <img
                      src="../../assets/images/avatars/t1.jpg"
                      alt=""
                      class="max-w-[30px] rounded-full"
                    /><img
                      src="../../assets/images/avatars/t2.jpg"
                      alt=""
                      class="max-w-[30px] rounded-full"
                    /><img
                      src="../../assets/images/avatars/t3.jpg"
                      alt=""
                      class="max-w-[30px] rounded-full"
                    /><img
                      src="../../assets/images/avatars/t4.jpg"
                      alt=""
                      class="max-w-[30px] rounded-full"
                    />
                    <a
                      href="#"
                      class="flex items-center justify-center bg-primary w-[30px] h-[30px] rounded-full"
                      ><span
                        class="text-white dark:text-title-dark text-[10px] font-semibold"
                        >20+</span
                      >
                    </a>
                    <a
                      href="#"
                      class="flex items-center justify-center w-[30px] h-[30px] border border-dashed border-deep dark:border-white/10 rounded-full"
                    >
                      <i
                        class="uil uil-plus text-[16px] text-light dark:text-subtitle-dark"
                      ></i>
                    </a>
                  </div>
                  <div class="relative" data-te-dropdown-ref>
                    <button
                      class="text-[18px] text-light dark:text-subtitle-dark"
                      type="button"
                      id="inboxEllipsis"
                      data-te-dropdown-toggle-ref
                      aria-expanded="false"
                    >
                      <i class="uil uil-ellipsis-v"></i>
                    </button>
                    <ul
                      class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                      aria-labelledby="inboxEllipsis"
                      data-te-dropdown-menu-ref
                    >
                      <li>
                        <a
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up gap-[6px]"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-users-alt"></i> create new group
                        </a>
                      </li>
                      <li>
                        <a
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-trash-alt"></i> Delete conversation
                        </a>
                      </li>
                      <li>
                        <a
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-ban"></i> Block and report
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- body -->
              <div
                class="h-[479px] pt-[25px] relative overflow-x-hidden overflow-y-auto scrollbar chat-wrapper"
              >
                <!-- item -->
                <div
                  class="flex w-full mb-[30px] ssm:px-[25px] px-[15px] last:mb-0 justify-start"
                >
                  <div class="me-[15px]">
                    <img
                      class="min-w-[46px] h-[46px] rounded-full"
                      src="../../assets/images/avatars/t1.jpg"
                      alt="User chat"
                    />
                  </div>
                  <div>
                    <h6
                      class="text-sm font-semibold text-dark dark:text-title-dark"
                    >
                      Erin Gonzales
                      <span
                        class="text-light dark:text-subtitle-dark text-xs font-normal mx-[15px]"
                        >March 30, 2020</span
                      >
                    </h6>
                    <div class="flex flex-wrap items-center gap-4">
                      <p
                        class="bg-primary dark:bg-box-dark-up dark:text-title-dark max-w-[670px] mt-[10px] px-5 py-[18px] rounded-[15px] rounded-br-0 text-base text-white"
                      >
                        Jam nonumy eirmod tempor invidunt ut labore et dolore
                        magna aliquyam erat consetetur sadipscing elitr sed diam
                        nonumy eirmod tempor invidunt ut labore et dolore magna
                        aliquyam erat sed diam voluptua.
                      </p>
                      <div class="flex items-center gap-[15px]">
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="emoji11"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-smile"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:flex item-center dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]"
                            aria-labelledby="emoji11"
                            data-te-dropdown-menu-ref
                          >
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/cool.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy2.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/shocked.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/like.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/heart.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="settings11"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-ellipsis-h"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block dark:bg-box-dark-up shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md gap-[8px]"
                            aria-labelledby="settings11"
                            data-te-dropdown-menu-ref
                          >
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >Copy</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >edit</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >forward</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >remove</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- item -->
                <div
                  class="relative mb-[30px] w-full text-center capitalize z-10 after:absolute after:top-1/2 after:-translate-y-1/2 ltr:after:left-0 rtl:after:right-0 after:bg-regular dark:after:bg-box-dark-up after:w-full after:h-[1px] after:-z-10"
                >
                  <span
                    class="bg-white dark:bg-box-dark px-6 text-light dark:text-subtitle-dark text-[13px]"
                    >7:57 PM</span
                  >
                </div>
                <!-- item -->
                <div
                  class="flex w-full mb-[30px] ssm:px-[25px] px-[15px] last:mb-0 justify-end"
                >
                  <div class="flex flex-wrap items-center justify-end gap-4">
                    <span
                      class="w-full text-xs font-normal text-light dark:text-subtitle-dark text-end"
                      >March 30, 2020</span
                    >
                    <div class="flex items-center gap-[15px]">
                      <div class="relative" data-te-dropdown-ref>
                        <button
                          class="text-[18px] text-light-extra dark:text-subtitle-dark"
                          type="button"
                          id="emoji12"
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                        >
                          <i class="uil uil-smile"></i>
                        </button>
                        <ul
                          class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:flex item-center dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]"
                          aria-labelledby="emoji12"
                          data-te-dropdown-menu-ref
                        >
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/cool.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/happy2.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/happy.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/shocked.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/like.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/heart.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="relative" data-te-dropdown-ref>
                        <button
                          class="text-[18px] text-light-extra dark:text-subtitle-dark"
                          type="button"
                          id="settings12"
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                        >
                          <i class="uil uil-ellipsis-h"></i>
                        </button>
                        <ul
                          class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block dark:bg-box-dark-up shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md gap-[8px]"
                          aria-labelledby="settings12"
                          data-te-dropdown-menu-ref
                        >
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >Copy</a
                            >
                          </li>
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >edit</a
                            >
                          </li>
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >forward</a
                            >
                          </li>
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >remove</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p
                      class="bg-section dark:bg-dark dark:text-title-dark max-w-[670px] mt-0 order-last px-5 py-[18px] rounded-[15px] rounded-br-0 text-base"
                    >
                      Oh! What is it?
                    </p>
                  </div>
                </div>
                <!-- item -->
                <div
                  class="flex w-full mb-[30px] ssm:px-[25px] px-[15px] last:mb-0 justify-start"
                >
                  <div class="me-[15px]">
                    <img
                      class="min-w-[46px] h-[46px] rounded-full"
                      src="../../assets/images/avatars/t1.jpg"
                      alt="User chat"
                    />
                  </div>
                  <div>
                    <h6
                      class="text-sm font-semibold text-dark dark:text-title-dark"
                    >
                      Erin Gonzales
                    </h6>
                    <div class="flex flex-wrap items-center gap-4">
                      <img
                        class="p-5 mt-[10px] bg-deepBG dark:bg-box-dark-up rounded-10"
                        src="../../assets/images/admin/admin-preview.png"
                        alt="admin"
                      />
                      <div class="flex items-center gap-[15px]">
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="emoji13"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-smile"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:flex item-center dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]"
                            aria-labelledby="emoji13"
                            data-te-dropdown-menu-ref
                          >
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/cool.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy2.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/shocked.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/like.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/heart.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="settings13"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-ellipsis-h"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block dark:bg-box-dark-up shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md gap-[8px]"
                            aria-labelledby="settings13"
                            data-te-dropdown-menu-ref
                          >
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >Copy</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >edit</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >forward</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >remove</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- item -->
                <div
                  class="flex w-full mb-[30px] ssm:px-[25px] px-[15px] last:mb-0 justify-start"
                >
                  <div class="me-[15px]">
                    <img
                      class="min-w-[46px] h-[46px] rounded-full"
                      src="../../assets/images/avatars/t1.jpg"
                      alt="User chat"
                    />
                  </div>
                  <div>
                    <h6
                      class="text-sm font-semibold text-dark dark:text-title-dark"
                    >
                      Erin Gonzales
                      <span
                        class="text-light dark:text-subtitle-dark text-xs font-normal mx-[15px]"
                        >March 30, 2020</span
                      >
                    </h6>
                    <div class="flex flex-wrap items-center gap-4">
                      <p
                        class="bg-primary dark:bg-box-dark-up dark:text-title-dark max-w-[670px] mt-[10px] px-5 py-[18px] rounded-[15px] rounded-br-0 text-base text-white"
                      >
                        HexaDash - Best Admin Dashboard Template
                      </p>
                      <div class="flex items-center gap-[15px]">
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="emoji14"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-smile"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:flex item-center dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]"
                            aria-labelledby="emoji14"
                            data-te-dropdown-menu-ref
                          >
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/cool.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy2.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/shocked.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/like.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/heart.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="settings15"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-ellipsis-h"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block dark:bg-box-dark-up shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md gap-[8px]"
                            aria-labelledby="settings15"
                            data-te-dropdown-menu-ref
                          >
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >Copy</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >edit</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >forward</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >remove</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- item -->
                <div
                  class="flex w-full mb-[30px] ssm:px-[25px] px-[15px] last:mb-0 justify-start"
                >
                  <div class="me-[15px]">
                    <img
                      class="min-w-[46px] h-[46px] rounded-full"
                      src="../../assets/images/avatars/t1.jpg"
                      alt="User chat"
                    />
                  </div>
                  <div>
                    <h6
                      class="text-sm font-semibold text-dark dark:text-title-dark"
                    >
                      Erin Gonzales
                      <span
                        class="text-light dark:text-subtitle-dark text-xs font-normal mx-[15px]"
                        >March 30, 2020</span
                      >
                    </h6>
                    <div class="flex flex-wrap items-center gap-4">
                      <p
                        class="bg-primary dark:bg-box-dark-up dark:text-title-dark max-w-[670px] mt-[10px] px-5 py-[18px] rounded-[15px] rounded-br-0 text-base text-white"
                      >
                        A creative, responsive and highly customizable admin
                        template
                      </p>
                      <div class="flex items-center gap-[15px]">
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="emoji16"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-smile"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:flex item-center dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]"
                            aria-labelledby="emoji16"
                            data-te-dropdown-menu-ref
                          >
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/cool.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy2.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/happy.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/shocked.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/like.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                            <li class="flex items-center">
                              <button type="button" class="group">
                                <img
                                  class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                  src="../../assets/images/emoji/heart.png"
                                  alt="emotions"
                                />
                              </button>
                            </li>
                          </ul>
                        </div>
                        <div class="relative" data-te-dropdown-ref>
                          <button
                            class="text-[18px] text-light-extra dark:text-subtitle-dark"
                            type="button"
                            id="settings17"
                            data-te-dropdown-toggle-ref
                            aria-expanded="false"
                          >
                            <i class="uil uil-ellipsis-h"></i>
                          </button>
                          <ul
                            class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block dark:bg-box-dark-up shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md gap-[8px]"
                            aria-labelledby="settings17"
                            data-te-dropdown-menu-ref
                          >
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >Copy</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >edit</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >forward</a
                              >
                            </li>
                            <li>
                              <a
                                class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                                href="#"
                                data-te-dropdown-item-ref=""
                                >remove</a
                              >
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- item -->
                <div
                  class="chat-last-message flex w-full mb-[30px] ssm:px-[25px] px-[15px] last:mb-0 justify-end"
                >
                  <div class="flex flex-wrap items-center justify-end gap-4">
                    <span
                      class="w-full text-xs font-normal text-light dark:text-subtitle-dark text-end"
                      >March 30, 2020</span
                    >
                    <div class="flex items-center gap-[15px]">
                      <div class="relative" data-te-dropdown-ref>
                        <button
                          class="text-[18px] text-light-extra dark:text-subtitle-dark"
                          type="button"
                          id="emoji18"
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                        >
                          <i class="uil uil-smile"></i>
                        </button>
                        <ul
                          class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:flex item-center dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]"
                          aria-labelledby="emoji18"
                          data-te-dropdown-menu-ref
                        >
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/cool.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/happy2.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/happy.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/shocked.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/like.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                          <li class="flex items-center">
                            <button type="button" class="group">
                              <img
                                class="group-hover:scale-[1.3] min-w-25px] max-w-[25px] transition-all duration-300 ease-linear"
                                src="../../assets/images/emoji/heart.png"
                                alt="emotions"
                              />
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div class="relative" data-te-dropdown-ref>
                        <button
                          class="text-[18px] text-light-extra dark:text-subtitle-dark"
                          type="button"
                          id="settings18"
                          data-te-dropdown-toggle-ref
                          aria-expanded="false"
                        >
                          <i class="uil uil-ellipsis-h"></i>
                        </button>
                        <ul
                          class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden border-none bg-white bg-clip-padding text-left text-base [&[data-te-dropdown-show]]:block dark:bg-box-dark-up shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md gap-[8px]"
                          aria-labelledby="settings18"
                          data-te-dropdown-menu-ref
                        >
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >Copy</a
                            >
                          </li>
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >edit</a
                            >
                          </li>
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >forward</a
                            >
                          </li>
                          <li>
                            <a
                              class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                              href="#"
                              data-te-dropdown-item-ref=""
                              >remove</a
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p
                      class="bg-section dark:bg-dark dark:text-title-dark max-w-[670px] mt-0 order-last px-5 py-[18px] rounded-[15px] rounded-br-0 text-base"
                    >
                      Wow, that was cool! What was that?
                    </p>
                  </div>
                </div>
              </div>
              <!-- footer -->
              <div
                class="relative flex items-center gap-[15px] max-sm:gap-[15px] max-sm:justify-center max-sm:flex-wrap py-[20px] mx-[25px]"
              >
                <div
                  class="w-full bg-section dark:bg-box-dark-up h-[70px] px-[25px] text-body dark:text-subtitle-dark border-none outline-none rounded-[35px] flex items-center gap-[20px]"
                >
                  <i
                    class="uil uil-smile text-[20px] text-[#8C90A4] dark:text-subtitle-dark"
                  ></i>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    class="w-full bg-transparent h-[68px] text-[16px] text-dark dark:text-title-dark outline-none shadow-none border-none dark:placeholder-shown:text-title-dark"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <a
                    href="#"
                    class="flex items-center justify-center bg-section dark:bg-box-dark-up w-[50px] h-[50px] rounded-full"
                  >
                    <i
                      class="uil uil-camera text-[18px] text-light dark:text-subtitle-dark"
                    ></i>
                  </a>
                  <a
                    href="#"
                    class="flex items-center justify-center bg-section dark:bg-box-dark-up w-[50px] h-[50px] rounded-full"
                  >
                    <i
                      class="uil uil-link text-[18px] text-light dark:text-subtitle-dark"
                    ></i>
                  </a>
                  <a
                    href="#"
                    class="flex items-center justify-center bg-primary w-[50px] h-[50px] rounded-full text-white dark:text-title-dark"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                  >
                    <i class="uil uil-message text-[18px] text-white"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              class="all-contacts hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
            ></div>
          </div>
        </div>
        <!-- End Content -->
      </div>
    </div>
    >
  </main>
  <!-- End: Main Content -->
</template>
