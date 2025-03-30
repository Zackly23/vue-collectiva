<script setup>
import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import api from "@/api";
import Echo from "laravel-echo";
import { useAuthStore } from "@/store/auth";
import { useToast } from "vue-toast-notification";

const authStore = useAuthStore();
const router = useRouter();
const toastNotification = useToast();
const isAnimating = ref(false);
const notifications = ref();
const notificationsCount = ref(0);
const userProfile = ref(
  JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : null
);
//Elipsis Right Menu
const isElipsisRightMenu = ref(false);

const notificationPrivate = window.Echo.channel(
  `notify.${userProfile.value.user_id}`
);
// const deleteChatChaneel = window.Echo.channel("chat-delete-channel");

notificationPrivate.listen(".notify-event", async function (data) {
  const notification = data.notification;
  const targetId = data.target_id;

  console.log("userprofile : ", userProfile.value);
  if (targetId == userProfile.value.user_id) {
    console.log("notification : ", notification);
    await getNotifications();
    triggerAnimation();
  }
});

// Fungsi untuk memicu animasi
const triggerAnimation = () => {
  isAnimating.value = true;
  setTimeout(() => {
    isAnimating.value = false; // Animasi berhenti setelah 3 detik
  }, 3000);
};

//Elipsisi Right Menu Event
const elipsisRightMenu = () => {
  isElipsisRightMenu.value = !isElipsisRightMenu.value;
};

// State for active dropdown
const activeDropdown = ref(null);

// Toggle specific dropdown
const toggleDropdown = (dropdownName) => {
  activeDropdown.value =
    activeDropdown.value === dropdownName ? null : dropdownName;
};

// Check if a dropdown is open
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

// Attach and detach event sig
onMounted(() => {
  document.addEventListener("click", closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdownOnClickOutside);
});

// State to control visibility of the search input
const isSearchVisible = ref(false);
const searchContainer = ref(null);

// Toggle search input visibility
const toggleSearchInput = () => {
  isSearchVisible.value = !isSearchVisible.value;
};

// Close search input if clicked outside
const handleOutsideClick = (event) => {
  if (!searchContainer.value.contains(event.target)) {
    isSearchVisible.value = false;
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

const signOut = async () => {
  try {
    console.log("token : ", localStorage.getItem("access_token"));
    const response = await api.post("/logout", {});

    if (response.status === 200) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("last_visited_page");

      authStore.logout();
      openNotificatication("Anda Berhasil Sign Out");
      userProfile.value = null;
      router.push("/");
    }
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

const getNotifications = async () => {
  try {
    const response = await api.get(
      `/user/${userProfile.value.user_id}/notification`
    );

    console.log("response notifikasi : ", response.data);
    if (response.status == 200) {
      const notificationList = response.data.notifications.map(
        (notification) => ({
          notificationId: notification.notification_id,
          notificationTitle: notification.notification_title,
          notificationSection: notification.notification_section,
          notificationText: notification.notification_text,
          notificationUrl: notification.notification_url,
          isClicked: notification.checked,
          notificationIcon: notification.notification_icon,
          notificationTime: notification.formatted_date,
        })
      );

      notifications.value = notificationList;
      notificationsCount.value = response.data.notification_count;

      console.log("notification lsit : ", notifications.value);
    }
  } catch (error) {
    console.error("error noti : ", error);
  }
};

const updateNotificationClicked = async (notification) => {
  console.log("notififcatio id ", notification);
  try {
    const response = await api.put(
      `/user/${userProfile.value.user_id}/notification/${notification.notificationId}`
    );

    if (response.status == 201) {
      console.log("response : ", response.data);
      getNotifications();
      router.push(notification.notificationUrl);
    }
  } catch (error) {
    console.error("error update : ", error);
  }
};

// Attach and detach event listener
onMounted(() => {
  getNotifications();
  document.addEventListener("click", handleOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});

const emit = defineEmits(["toggle-aside"]);

const emitToggle = () => {
  emit("toggle-aside");
};

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <!-- Header -->
  <header
    :class="{
      'sticky top-0 flex w-full bg-white xl:z-[999] max-xl:z-[9999] drop-shadow-1 dark:bg-box-dark dark:drop-shadow-none min-h-[70px]': true,
      'xl:w-full': isCollapsed, // Lebar penuh saat collapse
    }"
  >
    <div
      :class="[
        'flex flex-1 nav-wrap md:ps-[20px] ps-[30px] pe-[30px] max-xs:ps-[15px] max-xs:pe-[15px] bg-white dark:bg-box-dark transition-[padding] duration-200',
        isCollapsed ? 'ps-[10px]' : 'ps-[20px]',
      ]"
    >
      <!-- Header left menu -->

      <ul
        class="flex items-center mb-0 list-none nav-left ps-0 gap-x-[14px] gap-y-[9px]"
      >
        <!-- Navigation Items -->
        <li class="xl:hidden xl:[&.flex]:flex" id="topMenu-logo">
          <div
            class="flex md:w-[190px] xs:w-[170px] max-xs:w-[100px] max-md:pe-[30px] max-xs:pe-[15px] md:border-none sm:border-none xs:border-none border-e border-[#edf2f9] dark:border-box-dark-up logo-wrapper items-center h-[71px] dark:bg-box-dark-up"
          >
            <router-link to="/" class="block text-center">
              <div class="logo-full">
                <span class="text-2xl font-bold text-primary">SHCUnion</span>

                <!-- <img
                  class="md:ps-[15px] dark:hidden"
                  src="../../assets/images/logos/logo-dark.png"
                  alt="Logo"
                />
                <img
                  class="md:ps-[15px] hidden dark:block"
                  src="../../assets/images/logos/logo-white.png"
                  alt="Logo"
                /> -->

              </div>
            </router-link>
          </div>
        </li>
        <li>
          <a
            @click="emitToggle"
            class="flex items-center justify-center sm:min-w-[40px] sm:w-[40px] sm:h-[40px] min-w-[34px] h-[34px] rounded-full bg-transparent hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark dark:hover:bg-box-dark-up group transition duration-200 ease-in-out text-[#525768] dark:text-subtitle-dark max-md:dark:hover:bg-box-dark-up sm:text-[20px] text-[19px] cursor-pointer xl:[&.hide]:hidden max-md:bg-normalBG max-md:dark:bg-box-dark-up max-md:dark:hover:text-subtitle-dark"
            id="slim-toggler"
          >
            <i
              class="uil uil-align-center-alt text-current [&.is-folded]:hidden flex items-center"
            ></i>
          </a>
        </li>
      </ul>

      <!-- Header Center menu -->

      <div
        class="relative ps-[30px] hexadash-top-menu hidden xl:[&.flex]:flex"
        id="topMenuWrapper"
      >
        <ul class="flex flex-wrap items-center 2xl:gap-y-[15px] gap-x-[34px]">
          <li class="has-subMenu">
            <a href="#" class="">Dashboard</a>
            <ul class="subMenu">
              <li class="">
                <a href="index.html">Demo 1</a>
              </li>
              <li class="">
                <a href="demo-two.html">Demo 2</a>
              </li>
              <li class="">
                <a href="demo-three.html">Demo 3</a>
              </li>
              <li class="">
                <a href="demo-four.html">Demo 4</a>
              </li>
              <li class="">
                <a href="demo-five.html">Demo 5</a>
              </li>
              <li class="">
                <a href="demo-six.html">Demo 6</a>
              </li>
              <li class="">
                <a href="demo-seven.html">Demo 7</a>
              </li>
              <li class="">
                <a href="demo-eight.html">Demo 8</a>
              </li>
              <li class="">
                <a href="demo-nine.html">Demo 9</a>
              </li>
              <li class="">
                <a href="demo-ten.html">Demo 10</a>
              </li>
            </ul>
          </li>
          <li class="has-subMenu">
            <a href="#" class="">Apps</a>
            <ul class="subMenu">
              <li>
                <ul>
                  <li class="has-subMenu-left">
                    <a href="#" class="">
                      <span class="nav-icon uil uil-envelope"></span>
                      <span class="menu-text">Email</span>
                    </a>
                    <ul class="subMenu">
                      <li>
                        <a href="inbox.html" class="">Inbox</a>
                      </li>
                      <li>
                        <a href="email.html" class="">Read Email</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="chat.html" class="">
                      <span class="nav-icon uil uil-message"></span>
                      <span class="menu-text">Chat</span>
                      <span
                        class="text-white bg-success absolute -translate-y-2/4 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center leading-none rounded-full end-[52px] top-2/4"
                        >3</span
                      >
                    </a>
                  </li>
                  <li>
                    <a href="calendar.html" class="">
                      <span class="nav-icon uil uil-calender"></span>
                      <span class="menu-text">Calendar</span>
                    </a>
                  </li>
                  <li class="has-subMenu-left">
                    <a href="#" class="">
                      <span class="nav-icon uil uil-exchange"></span>
                      <span class="menu-text">Import & export</span>
                    </a>
                    <ul class="subMenu">
                      <li>
                        <a class="" href="contact-1.html">Import</a>
                      </li>
                      <li>
                        <a class="" href="contact-2.html">Export</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="has-subMenu">
            <a href="#" class="">Features</a>
            <ul class="subMenu">
              <li class="has-subMenu-left">
                <a href="#" class="">
                  <span class="nav-icon uil uil-chart"></span>
                  <span class="menu-text">Charts</span>
                </a>
                <ul class="subMenu">
                  <li>
                    <a class="" href="charts.html">Apex Chart</a>
                  </li>
                </ul>
              </li>
              <li class="has-subMenu-left">
                <a href="#" class="">
                  <span class="nav-icon uil uil-document-layout-left"></span>
                  <span class="menu-text">Froms</span>
                </a>
                <ul class="subMenu">
                  <li>
                    <a class="" href="form.html">Basics</a>
                  </li>
                  <li>
                    <a class="" href="form-elements.html">Elements</a>
                  </li>
                  <li>
                    <a class="" href="form-layouts.html">Layouts</a>
                  </li>
                  <li>
                    <a class="" href="form-components.html">Components</a>
                  </li>
                </ul>
              </li>
              <li class="has-subMenu-left">
                <a href="#" class="">
                  <span class="nav-icon uil uil-square-shape"></span>
                  <span class="menu-text">Wizards</span>
                </a>
                <ul class="subMenu">
                  <li>
                    <a href="create-account.html" class="">Wizard 1</a>
                  </li>
                </ul>
              </li>
              <li class="has-subMenu-left">
                <a href="#" class="">
                  <span class="nav-icon uil uil-icons"></span>
                  <span class="menu-text">Icons</span>
                </a>
                <ul class="subMenu">
                  <li>
                    <a href="unicon-icons.html" class="">Unicon Icons</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="editors.html" class="">
                  <span class="nav-icon uil uil-font"></span>
                  <span class="menu-text">Editors</span>
                </a>
              </li>
              <li class="has-subMenu-left">
                <a href="#" class="">
                  <span class="nav-icon uil uil-map"></span>
                  <span class="menu-text">Maps</span>
                </a>
                <ul class="subMenu">
                  <li>
                    <a href="vector-map.html" class="">Vector Maps</a>
                    <a href="google-map.html" class="">Google Maps</a>
                  </li>
                </ul>
              </li>
              <li class="has-subMenu-left">
                <a href="#" class="">
                  <span class="nav-icon uil uil-table"></span>
                  <span class="menu-text">Table</span>
                </a>
                <ul class="subMenu">
                  <li>
                    <a class="" href="charts.html">Basic table</a>
                  </li>
                  <li>
                    <a class="" href="charts.html">Data table</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="mega-item has-subMenu">
            <a href="#" class="">Pages</a>
            <ul class="megaMenu-wrapper megaMenu-small">
              <li>
                <ul>
                  <li>
                    <a href="change-log.html" class="">
                      <span class="menu-text">Changelog</span>
                      <span
                        class="text-white bg-success absolute -translate-y-2/4 text-[10px] font-bold min-w-[18px] h-[18px] flex items-center justify-center leading-none rounded-[20px] end-[52px] top-2/4 px-[6px]"
                        >1.0.2</span
                      >
                    </a>
                  </li>
                  <li>
                    <a href="gallery.html" class="">
                      <span class="menu-text">Gallery 1</span>
                    </a>
                  </li>
                  <li>
                    <a href="pricing.html" class="">
                      <span class="menu-text">Pricing</span>
                    </a>
                  </li>
                  <li>
                    <a href="faq.html" class="">
                      <span class="menu-text">FAQ's</span>
                    </a>
                  </li>
                  <li>
                    <a href="blank.html" class="">
                      <span class="menu-text">Blank Page</span>
                    </a>
                  </li>
                  <li>
                    <a href="knowledge-base.html" class="">knowledge base</a>
                  </li>
                  <li>
                    <a href="blog.html" class="">Blog</a>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <a href="blog-two.html" class="">Blog two</a>
                  </li>
                  <li>
                    <a href="blog-three.html" class="">Blog three</a>
                  </li>
                  <li>
                    <a href="blog-details.html" class="">Blog details</a>
                  </li>
                  <li>
                    <a href="terms.html" class="">
                      <span class="menu-text">Terms & Conditions</span>
                    </a>
                  </li>
                  <li>
                    <a href="maintenance.html" class="">
                      <span class="menu-text">Maintenance</span>
                    </a>
                  </li>
                  <li>
                    <a href="404.html" class="">
                      <span class="menu-text">404</span>
                    </a>
                  </li>
                  <li>
                    <a href="coming-soon.html" class="">
                      <span class="menu-text">Coming Soon</span>
                    </a>
                  </li>
                  <li>
                    <a href="log-in.html" class="">
                      <span class="menu-text">Log In</span>
                    </a>
                  </li>
                  <li>
                    <a href="sign-up.html" class="">
                      <span class="menu-text">Sign Up</span>
                    </a>
                  </li>
                  <li>
                    <a href="reset.html" class="">
                      <span class="menu-text">Forget password</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="mega-item has-subMenu">
            <a href="#" class="">Components</a>
            <ul class="megaMenu-wrapper megaMenu-wide">
              <li>
                <span class="mega-title">Components</span>
                <ul>
                  <li>
                    <a class="" href="alerts.html">Alert</a>
                  </li>
                  <li>
                    <a class="" href="avatars.html">Avatar</a>
                  </li>
                  <li>
                    <a class="" href="badges.html">Badge</a>
                  </li>
                </ul>
              </li>
              <li>
                <span class="mega-title">Components</span>
                <ul>
                  <li>
                    <a class="" href="buttons.html">Button</a>
                  </li>
                  <li>
                    <a class="" href="cards.html">Cards</a>
                  </li>
                  <li>
                    <a class="" href="breadcrumbs.html">Breadcrumb</a>
                  </li>
                </ul>
              </li>
              <li>
                <span class="mega-title">Components</span>
                <ul>
                  <li>
                    <a class="" href="carousel.html">Carousel</a>
                  </li>
                  <li>
                    <a class="" href="checkbox.html">Checkbox</a>
                  </li>
                </ul>
              </li>
              <li>
                <span class="mega-title">Components</span>
                <ul>
                  <li>
                    <a class="" href="collapse.html">Collapse</a>
                  </li>
                  <li>
                    <a class="" href="comments.html">typography</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <!-- Header right menu -->

      <div
        class="flex items-center ms-auto py-[15px] sm:gap-x-[25px] max-sm:gap-x-[15px] gap-y-[15px] relative"
      >
        <!-- Search Button -->
        <!-- <div class="relative" ref="searchContainer">
          <button
            type="button"
            @click="toggleSearchInput"
            class="transition-all theme-dropdown-trigger text-[20px] text-light dark:text-subtitle-dark"
          >
            <i :class="!isSearchVisible ? 'uil uil-search' : 'hidden'"></i>
            <i :class="isSearchVisible ? 'uil uil-multiply' : 'hidden'"></i>
          </button>
          <input
            type="search"
            placeholder="search here"
            id="searchInput"
            name="search"
            v-show="isSearchVisible"
            class="theme-dropdown absolute end-0 transition-[opacity,margin] duration opacity-100 min-w-[15rem] mt-8 dark:bg-box-dark-down p-1.5 h-[48px] px-[20px] dark:shadow-none border-1 border-regular dark:border-box-dark-up rounded-6 capitalize bg-white text-body dark:text-title-dark placeholder:text-body dark:placeholder:text-subtitle-dark text-ellipsis outline-none"
          />
        </div> -->


        <!-- End Search Button -->
        <!-- Button Elipsis (Pas Resposive)  -->
        <button
          @click="elipsisRightMenu"
          type="button"
          class="flex xl:hidden items-center text-[22px] text-[#a0a0a0] dark:text-subtitle-dark min-h-[40px]"
          id="author-dropdown"
        >
          <i class="uil uil-ellipsis-v text-[18px]"></i>
        </button>
        <!-- End Button Elipsis (Pas Resposive)  -->

        <!-- Button Right Navbar  -->
        <ul
          id="right-ellipsis-trigger"
          :class="{
            'xl:flex items-center justify-end flex-auto mb-0 list-none ps-0 sm:gap-x-[25px] max-sm:gap-x-[15px] gap-y-[15px] max-xl:absolute max-xl:z-[1000] max-xl:m-0 max-xl:rounded-lg max-xl:border-none max-xl:bg-white max-xl:bg-clip-padding max-xl:text-left max-xl:shadow-lg max-xl:dark:bg-neutral-700 max-xl:[&.active]:flex max-xl:end-0 max-xl:px-[20px] max-sm:px-[15px] max-xl:py-[10px] max-xl:top-[70px]': true,
            flex: isElipsisRightMenu,
            hidden: !isElipsisRightMenu,
          }"
        >
          <li>
            <!-- Notification Button  -->
            <div class="relative" ref="dropdown">
              <!-- Tombol untuk Toggle Dropdown -->
              <button
                type="button"
                data-dropdown-button="notification"
                @click="toggleDropdown('notification')"
                class="flex items-center hs-dropdown-toggle text-[23px] text-[#a0a0a0] dark:text-subtitle-dark relative min-h-[40px] group"
              >
                <!-- Icon Bell dengan Animasi -->
                <i
                  class="uil uil-bell transition-transform duration-300"
                  :class="{ 'animate-shake': isAnimating }"
                ></i>
                <span
                  class="absolute flex w-1.5 h-1.5 translate-x-2/4 -translate-y-2/4 origin-[100%_0%] end-[3px] top-[8px]"
                  v-if="!isDropdownOpen('notification')"
                >
                  <span
                    class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-warning/20"
                  ></span>
                  <span
                    class="relative inline-flex w-1.5 h-1.5 rounded-full"
                    :class="{
                      'bg-warning': notificationsCount > 0,
                    }"
                  ></span>
                </span>
              </button>

              <!-- Dropdown Menu -->
              <div
                v-show="isDropdownOpen('notification')"
                class="absolute right-0 z-[1000] ltr:float-left rtl:float-right m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark [&[data-te-dropdown-show]]:block"
              >
                <div
                  class="bg-white dark:bg-box-dark shadow-[0_2px_8px_rgba(0,0,0,.15)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4 px-[15px] py-[12px] md:min-w-[400px] sm:w-[300px] max-sm:w-[230px]"
                >
                  <h1
                    class="flex items-center justify-center text-sm rounded-md bg-section dark:bg-box-dark-up h-[50px] p-[10px] text-dark dark:text-title-dark font-semibold"
                  >
                    <span
                      >Notifications
                      <span
                        class="inline-flex items-center justify-center w-5 h-5 text-xs text-white rounded-full bg-warning ms-3 dark:text-title-dark"
                        >{{ notificationsCount }}</span
                      ></span
                    >
                  </h1>
                  <ul
                    class="p-0 max-h-[250px] relative overflow-x-hidden overflow-y-auto scrollbar"
                  >
                    <li
                      v-for="(notification, index) in notifications"
                      :key="notification.notificationId"
                    >
                      <button
                        @click="updateNotificationClicked(notification)"
                        class="group relative block w-full px-3 sm:py-3 max-sm:py-1.5 text-body dark:text-subtitle-dark hover:bg-white dark:hover:bg-box-dark-up"
                      >
                        <div
                          class="rounded-lg p-2 flex items-start gap-x-[15px]"
                          :class="{
                            'bg-blue-100': !notification.isClicked,
                            'bg-white': notification.isClicked,
                          }"
                        >
                          <div
                            class="flex items-center justify-center rounded-full w-[30px] h-[30px] bg-warning/10 text-warning"
                          >
                            <i
                              class="text-current uil uil-heart text-[16px]"
                            ></i>
                          </div>
                          <div class="text-start">
                            <h1
                              class="text-[#5a5f7d] dark:text-title-dark flex justify-between items-center mb-2"
                            >
                              <span class="text-[13px] text-primary">{{
                                notification.notificationTitle
                              }}</span>
                              <p
                                class="text-xs text-body dark:text-subtitle-dark"
                              >
                                {{ notification.notificationTime }}
                              </p>
                            </h1>
                            <h1 class="text-xs">
                              {{ notification.notificationText }}
                            </h1>
                          </div>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="relative" data-te-dropdown-ref>
              <router-link
                to="/dashboard/profile/setting"
                type="button"
                id="settings"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                class="flex items-center text-[22px] text-[#a0a0a0] dark:text-subtitle-dark min-h-[40px]"
              >
                <i class="uil uil-setting"></i>
              </router-link>
              <div
                class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                aria-labelledby="settings"
                data-te-dropdown-menu-ref
              >
                <div
                  class="lg:w-[700px] md:w-[300px] max-md:w-[230px] px-[15px] py-[15px] bg-white dark:bg-box-dark shadow-[0_2px_8px_rgba(0,0,0,.15)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4"
                >
                  <ul
                    class="flex flex-wrap items-center lg:[&>li]:flex-[50%] max-lg:[&>li]:flex-[100%] max-h-[251px] relative overflow-x-hidden overflow-y-auto scrollbar scrollbar"
                  >
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/audio.png"
                          alt="audio"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            Diagram Maker
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            Plan user flows & test scenarios
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/payment.png"
                          alt="payment"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            payments
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            We handle billions of dollars
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/feature.png"
                          alt="feature"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            All Features
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            Introducing Increment subscriptions
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/theme.png"
                          alt="theme"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            Themes
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            Third party themes that are compatible
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/payment.png"
                          alt="payment"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            payments
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            We handle billions of dollars
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/design.png"
                          alt="design"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            Design Mockups
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            Share planning visuals with clients
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/file.png"
                          alt="file"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            Content Planner
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            Centralize content gathering and editing
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                    <li class="w-full">
                      <figure
                        class="flex items-start px-4 py-3 mb-0 hover:shadow-action dark:hover:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                      >
                        <img
                          class="h-fit me-4"
                          src="../../assets/images/settings/audio.png"
                          alt="audio"
                        />
                        <figcaption>
                          <h1
                            class="mb-0.5 -mt-1 text-[15px] font-medium capitalize text-dark dark:text-title-dark text-start"
                          >
                            Diagram Maker
                          </h1>
                          <p
                            class="mb-0 text-body dark:text-subtitle-dark text-start"
                          >
                            Plan user flows & test scenarios
                          </p>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <!-- Dropdown Bahasa -->
            <div class="relative" data-te-dropdown-ref>
              <button
                id="flags"
                data-te-dropdown-toggle-ref
                aria-expanded="false"
                type="button"
                class="flex items-center rounded-full border-1"
              >
                <img
                  class="max-w-[25px] max-h-[25px]"
                  src="../../assets/images/flags/ina-flag.png"
                  alt="flags"
                />
              </button>
              <div
                class="absolute z-[1000] ltr:float-left rtl:float-right m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                aria-labelledby="flags"
                data-te-dropdown-menu-ref
              >
                <ul
                  class="block bg-white dark:bg-box-dark-down w-[100px] shadow-[0_2px_8px_rgba(0,0,0,.15)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4 overflow-hidden"
                >
                  <li
                    class="bg-white dark:bg-box-dark-down hover:bg-primary/10 dark:hover:bg-primary/10"
                  >
                    <button
                      class="flex items-center px-3 py-1.5 text-sm text-dark dark:text-subtitle-dark"
                    >
                      <img
                        class="w-3.5 h-3.5 me-2"
                        src="../../assets/images/flags/english.png"
                        alt="english"
                      />
                      <span>English</span>
                    </button>
                  </li>
                  <li
                    class="bg-white dark:bg-box-dark-down hover:bg-primary/10 dark:hover:bg-primary/10"
                  >
                    <button
                      class="flex items-center px-3 py-1.5 text-sm text-dark dark:text-subtitle-dark"
                    >
                      <img
                        class="w-3.5 h-3.5 me-2"
                        src="../../assets/images/flags/spanish.png"
                        alt="spanish"
                      />
                      <span>Spanish</span>
                    </button>
                  </li>
                  <li
                    class="bg-white dark:bg-box-dark-down hover:bg-primary/10 dark:hover:bg-primary/10"
                  >
                    <button
                      class="flex items-center px-3 py-1.5 text-sm text-dark dark:text-subtitle-dark"
                    >
                      <img
                        class="w-3.5 h-3.5 me-2"
                        src="../../assets/images/flags/arabic.png"
                        alt="arabic"
                      />
                      <span>Arabic</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <!-- Profile Dropdown -->
            <div class="relative" data-te-dropdown-ref>
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
                  :src="userProfile?.profile_picture"
                  alt="user photo"
                />
                <span class="hidden xl:block">{{
                  userProfile?.full_name
                }}</span>
                <i
                  class="uil uil-angle-down text-light dark:text-subtitle-dark text-[18px] hidden xl:block"
                ></i>
              </button>

              <!-- Dropdown menu -->
              <div
                data-dropdown-content-="profile"
                :class="{
                  'absolute z-[1000]v right-[0px] ltr:float-left rtl:float-right m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block': true,
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
                      :src="userProfile?.profile_picture"
                      alt="user"
                    />
                    <figcaption>
                      <div
                        class="text-dark dark:text-title-dark mb-0.5 text-sm"
                      >
                        {{ userProfile?.full_name }}
                      </div>
                      <div
                        class="mb-0 text-xs"
                        :class="userProfile?.badge_color"
                      >
                        {{ userProfile?.badge }}
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
                        <router-link
                        disabled
                          class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                        >
                          <i class="text-[16px] uil uil-users-alt"></i>
                          Activity
                        </router-link>
                      </div>
                    </li>
                    <li class="w-full">
                      <div
                        class="p-0 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-box-dark-up rounded-4"
                      >
                        <router-link
                        to="/dashboard/guidance"
                          class="inline-flex items-center text-light dark:text-subtitle-dark hover:text-primary hover:ps-6 w-full px-2.5 py-3 text-sm transition-[0.3s] gap-[10px]"
                        >
                          <i class="text-[16px] uil uil-bell"></i>
                          Help
                        </router-link>
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
          </li>
        </ul>
      </div>
    </div>
    <!-- End: Navigation -->
  </header>
  <!-- End: Header -->
</template>

<style scoped>
@keyframes shake {
  0%,
  100% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-5deg);
  }
}

.animate-shake {
  animation: shake 0.6s ease-in-out infinite;
}
</style>
