<script setup>
import axios from "axios";
import { ref, onMounted, onUnmounted } from "vue";

// State
const activeTab = ref("private-chat");
const isSidebarCollapse = ref(false);
const isMdScreen = ref(false);
const bodyChatContentType = ref('private-chat');

const userID = '513b1797-1a54-4188-a7c4-5e9d0732a2ff'

const messages = ref();

const groupMessages = ref();

const chats = ref([
  {
    id: 1,
    sender: "John Doe",
    avatar: "https://via.placeholder.com/46", // Gambar dummy
    message: "Hi, how are you doing today?",
    date: "2025-01-17 10:15 AM",
    isSender: false,
  },
  {
    id: 1,
    sender: "John Doe",
    avatar: "https://via.placeholder.com/46", // Gambar dummy
    message: "Hi, How about go OUT?",
    date: "2025-01-17 10:15 AM",
    isSender: false,
  },
  {
    id: 2,
    sender: "You",
    avatar: "https://via.placeholder.com/46",
    message: "I'm good, thank you! What about you?",
    date: "2025-01-17 10:16 AM",
    isSender: true,
  },
  {
    id: 3,
    sender: "John Doe",
    avatar: "https://via.placeholder.com/46",
    message: "I'm doing great. Are we still on for the meeting later?",
    date: "2025-01-17 10:17 AM",
    isSender: false,
  },
  {
    id: 4,
    sender: "You",
    avatar: "https://via.placeholder.com/46",
    message: "Yes, I'll join the meeting at 2 PM.",
    date: "2025-01-17 10:18 AM",
    isSender: true,
  },
  {
    id: 5,
    sender: "John Doe",
    avatar: "https://via.placeholder.com/46",
    message: "Perfect. See you then!",
    date: "2025-01-17 10:19 AM",
    isSender: false,
  },
]);

const sidebarCollapse = () => {
  isSidebarCollapse.value = !isSidebarCollapse.value;
  console.log("Sidebar Collapse ", isSidebarCollapse.value);
};

// Fungsi untuk mengecek ukuran layar
const checkScreenSize = () => {
  isMdScreen.value = window.matchMedia("(min-width: 989px)").matches;
  if (isMdScreen.value) {
    isSidebarCollapse.value = false;
  }
  console.log("Screen Medium ", isMdScreen.value);
};

//GetMessages and replace
const getChatMessage = async (messageType, key) => {
  if (messageType == "private-chat") {
    bodyChatContentType.value = 'private-chat';
    const response = await axios.get(
      "http://localhost:8000/api/v1/private-chat"
    );
    console.log("pri");
    console.log(response);
    const newChat = response.data.map((chat) => ({
      id: chat.message_id,
      sender: "You",
      avatar: chat.avatar,
      message: chat.message,
      date: chat.created_at,
      isSender: true,
    }));

    chats.value = newChat;
  } else if (messageType == "group-chat") {
    bodyChatContentType.value = 'group-chat';
    console.log("key : ", key);
    const response = await axios.get(
      `http://localhost:8000/api/v1/testId/${key}`
    );
    console.log(response.data.chats);
    const newChat = response.data.chats.map((chat) => ({
      id: chat.chat_id,
      sender: chat.sender_name,
      avatar: chat.avatar,
      message: chat.chat_text,
      date: formattedDate(chat.chat_send_time),
      isSender:
        chat.sender_id == userID ? true : false,
    }));

    chats.value = newChat;
  }
};

// Methods
const switchTab = (tab) => {
  activeTab.value = tab;
};

const formattedDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

// {
//     idMessage: 1,
//     sender: "John Doe",
//     date: "2025-01-16",
//     message: "Hello, how are you?",
//     avatar: "../../assets/images/avatars/t1.jpg",
//   },
//
const groupMessageList = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/test/${userID}`
  );
  console.log('group: ',response.data.group_chat);
  const groupChatList = response.data.group_chats.map((gcl) => ({
    groupChatId: gcl.group_chat_id,
    groupName: gcl.group_chat_name,
    date: formattedDate(gcl.latest_time_chat),
    message: gcl.latest_chat,
    avatar: gcl.avatar,
  }));

  groupMessages.value = groupChatList;
  console.log("list: ", groupMessages.value);
};

const privateMessageList = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/test-private/${userID}`
  );

  console.log("priv: ", response.data);
  const privateChatList = response.data.map((pcl) => ({
    privateChatId: pcl.message_private_chat_id,
    senderId: pcl,
    senderName: pcl.sender_name,
    date: formattedDate(pcl.latest_time_chat),
    message: pcl.latest_chat,
    avatar: pcl.avatar,
  }));

  messages.value = privateChatList;
  console.log("list: ", messages.value);
};

// Set up event listener untuk resize
onMounted(() => {
  groupMessageList();
  privateMessageList();
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
              <li v-for="message in messages" :key="message.privateChatId">
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
                    <figcaption
                      @click="
                        getChatMessage('private-chat', message.privateChatId)
                      "
                      class="w-full -mt-1 text-start cursor-pointer"
                    >
                      <h1
                        class="flex items-center justify-between mb-0.5 text-sm font-semibold"
                      >
                        {{ message.senderName }}
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
              <li
                v-for="groupMessage in groupMessages"
                :key="groupMessage.groupChatId"
              >
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
                    <figcaption
                      @click="
                        getChatMessage('group-chat', groupMessage.groupChatId)
                      "
                      class="w-full -mt-1 text-start cursor-pointer"
                    >
                      <h1
                        class="flex items-center justify-between mb-0.5 text-sm font-semibold"
                      >
                        {{ groupMessage.groupName }}
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
                class="h-[479px] pt-[25px] relative overflow-x-hidden overflow-y-auto chat-wrapper scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
              >
                <!-- Iterasi data chat -->
                <div
                  v-for="(chat, index) in chats"
                  :key="index"
                  :class="[
                    'flex w-full mb-[30px] px-[15px] last:mb-0',
                    chat.isSender ? 'justify-end' : 'justify-start',
                  ]"
                >
                  <!-- Chat Bubble -->
                  <div
                    :class="[
                      'flex items-center gap-4 max-w-[670px]',
                      chat.isSender
                        ? 'flex-row-reverse text-right'
                        : 'flex-row text-left',
                    ]"
                  >
                    <!-- Avatar (hanya untuk penerima) -->
                    <div v-if="!chat.isSender" class="me-[10px]">
                      <img
                        class="w-[46px] h-[46px] rounded-full object-cover shadow-lg"
                        src="../../assets/images/avatars/t1.jpg"
                        alt="User chat"
                      />
                    </div>

                    <!-- Chat Content -->
                    <div class="flex flex-col">
                      <!-- Sender Name (hanya untuk penerima) -->
                      <h6
                        v-if="!chat.isSender"
                        class="text-sm font-semibold text-gray-700 dark:text-gray-300"
                      >
                        {{ chat.sender }}
                      </h6>

                      <!-- Chat Message -->
                      <p
                        :class="[
                          'px-5 py-[12px] text-base shadow-lg rounded-[15px]',
                          chat.isSender
                            ? 'bg-blue-500 text-white rounded-br-0'
                            : 'bg-gray-100 dark:bg-gray-700 dark:text-gray-300 rounded-bl-0',
                        ]"
                      >
                        {{ chat.message }}
                      </p>

                      <!-- Chat Date -->
                      <span
                        class="mt-1 text-xs text-gray-500 dark:text-gray-400"
                        :class="chat.isSender ? 'self-end' : 'self-start'"
                      >
                        {{ chat.date }}
                      </span>
                    </div>

                    <!-- Actions (Emoji & Options) untuk pengirim -->
                    <div v-if="chat.isSender" class="flex gap-2 items-center">
                      <button
                        class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        type="button"
                      >
                        <i class="uil uil-smile text-xl"></i>
                      </button>
                      <button
                        class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        type="button"
                      >
                        <i class="uil uil-ellipsis-h text-xl"></i>
                      </button>
                    </div>
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
