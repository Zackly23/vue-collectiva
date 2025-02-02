<script setup>
import axios from "axios";
import { ref, onMounted, onUnmounted, nextTick, onBeforeUnmount } from "vue";
import Echo from "laravel-echo";
import EmojiPicker from "vue3-emoji-picker";

import "vue3-emoji-picker/css";

// State
const activeTab = ref("private-chat");
const isSidebarCollapse = ref(false);
const isMdScreen = ref(false);
const isChatBodyDropdown = ref(false);
const activeChatId = ref();
const messageText = ref("");
const isLoading = ref(false);
const chatNameHeader = ref("");
const showEmoji = ref(false);
const fileInput = ref(null);
const selectedFile = ref(null);
// Reactive state for image preview
const imagePreview = ref(null);

const userID = "bedd8be1-a76b-4618-bc71-44ca080e22cf";

const messages = ref();

const groupMessages = ref();

const chats = ref();
const chatWrapper = ref(null);

const storeChatChannel = window.Echo.channel("chat-channel");
const deleteChatChaneel = window.Echo.channel("chat-delete-channel");

storeChatChannel.listen(".chat-event", function (data) {
  console.log("from channel:", data);

  const chat = {
    id: data.chats.user_id, // Sesuaikan dengan field yang relevan
    sender: data.chats.sender_name, // Sesuaikan dengan field yang relevan
    avatar: chats.avatar, // Tambahkan field ini jika ada data avatar (tidak tersedia di data contoh)
    message: data.chats.chat_text,
    image_path: "http://localhost:8000" + data.chats.image_path,
    date: data.chats.chat_send_time,
    isSender: data.chats.sender_id === userID, // Cocokkan dengan ID pengguna Anda
  };

  // Tambahkan chat baru ke chats
  chats.value.push(chat);

  scrollToBottom();

  console.log(chats.value);
});

deleteChatChaneel.listen(".chat-delete-event", function (data) {
  console.log("from channel:", data.chat_id);

  const chatId = data.chat_id;

  // Hapus chat baru dari chats
  chats.value = chats.value.filter((chat) => chat.id !== chatId);

  console.log("delete channel ", chats.value);
});

const bodyChatContentType = ref({
  key: "private-chat",
  keyCount: 0,
});

const scrollToBottom = async () => {
  if (chatWrapper.value) {
    await nextTick(); // Tunggu DOM selesai di-render
    chatWrapper.value.scrollTop = 2 * chatWrapper.value.scrollHeight;
  }
};

// State untuk melacak dropdown yang aktif
const activeEmojiDropdown = ref(null); // Untuk dropdown emoji
const activeEditorDropdown = ref(null); // Untuk dropdown editor

// Toggle dropdown emoji
function toggleEmoji(chatId) {
  console.log(chats.value);
  activeEmojiDropdown.value =
    activeEmojiDropdown.value === chatId ? null : chatId;
  activeEditorDropdown.value = null;
}

// Toggle dropdown editor
function toggleEditor(chatId) {
  activeEditorDropdown.value =
    activeEditorDropdown.value === chatId ? null : chatId;
  activeEmojiDropdown.value = null;
}

const onSelectEmoji = (emoji) => {
  console.log(emoji);
  messageText.value += emoji.i;
};

const showEmojiPicker = () => {
  showEmoji.value = !showEmoji.value;
};

const bodyChatDropfdown = () => {
  isChatBodyDropdown.value = !isChatBodyDropdown.value;
};

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

//Copy to clipboard
const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // alert("Text copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

// Trigger the file input dialog
const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

// Handle the file upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("File yang diunggah harus berupa gambar.");
      return;
    }

    selectedFile.value = file;

    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result; // Set the base64 data URL for the preview
    };
    reader.readAsDataURL(file);
  }
};

// Clear the image preview
const clearPreview = () => {
  imagePreview.value = null;
  if (fileInput.value) {
    fileInput.value.value = ""; // Reset the file input value
  }
};

//Leave Group Chat
const leaveGroupChat = async () => {
  const response = await axios.delete(
    `http://localhost:8000/api/v1/test-delete-user-group/${userID}/${activeChatId.value}`
  );

  console.log(response.data.message);
  window.location.reload();
};

//Delete Message
const deleteMessage = async (key) => {
  if (activeTab.value == "private-chat") {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/test-delete-private/${userID}/${key}`
      );

      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
  } else if (activeTab.value == "group-chat") {
    console.log("delete group chat by id");
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/test-delete-group/${userID}/${key}`
      );

      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
  }
};

//GetMessages and replace
const getChatMessage = async (messageType, key) => {
  if (messageType == "private-chat") {
    const response = await axios.get(
      `http://localhost:8000/api/v1/test-private-id/${userID}/${key}`
    );
    console.log(response.data);
    const newChat = response.data.chats.map((chat) => ({
      id: chat.chat_id,
      sender: chat.sender_name,
      avatar: chat.avatar,
      message: chat.chat_text,
      image_path: "http://localhost:8000" + chat.image_path,
      date: chat.chat_send_time,
      isSender: chat.sender_id == userID ? true : false,
    }));

    chats.value = newChat;
    chatNameHeader.value = response.data.chat_name;
  } else if (messageType == "group-chat") {
    console.log("key : ", key);
    const response = await axios.get(
      `http://localhost:8000/api/v1/test-group-id/${key}`
    );
    console.log(response.data);
    const newChat = response.data.chats.map((chat) => ({
      id: chat.chat_id,
      sender: chat.sender_name,
      avatar: chat.avatar,
      message: chat.chat_text,
      image_path: "http://localhost:8000" + chat.image_path,
      date: chat.chat_send_time,
      isSender: chat.sender_id == userID ? true : false,
    }));

    chats.value = newChat;
    chatNameHeader.value = response.data.chat_name;
  }

  activeChatId.value = key;
};

//Initial BodyChatContent
const initialBodyChat = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/testbodychat/${userID}/private-chat`
  );

  console.log("initial : ", response.data);

  const bodyContent = response.data.chats.map((chat) => ({
    id: chat.chat_id,
    sender: chat.sender_name,
    avatar: chat.avatar,
    message: chat.chat_text,
    image_path: "http://localhost:8000" + chat.image_path,
    date: chat.chat_send_time,
    isSender: chat.sender_id == userID ? true : false,
  }));

  chats.value = bodyContent;
  console.log("chat id : ", response.data);
  activeChatId.value = response.data.chat_id;
  chatNameHeader.value = response.data.chat_name;
};

// Methods
const switchTab = async (tab) => {
  activeTab.value = tab;
  isChatBodyDropdown.value = false;
  console.log("bodyContent key : ", bodyChatContentType.value.key);

  try {
    const response = await axios.get(
      `http://localhost:8000/api/v1/testbodychat/${userID}/${tab}`
    );

    console.log("switch tab: ", response.data);

    if (response.data.chats == null) {
      chats.value = null;
    } else {
      const bodyContent = response.data.chats.map((chat) => ({
        id: chat.chat_id,
        sender: chat.sender_name,
        avatar: chat.avatar,
        message: chat.chat_text,
        image_path: "http://localhost:8000" + chat.image_path,
        date: chat.chat_send_time,
        isSender: chat.sender_id == userID ? true : false,
      }));

      console.log("body cont ", bodyContent);
      chats.value = bodyContent;
      activeChatId.value = response.data.chat_id;
      chatNameHeader.value = response.data.chat_name;
    }
  } catch (error) {
    console.error("Error sending data:", error.response?.data || error.message);
  }

  // if (bodyChatContentType.value.key == "group-chat") {
  //   bodyChatContentType.value.key = "private-chat";
  // } else if (bodyChatContentType.value.key == "private-chat") {
  //   bodyChatContentType.value.key = "group-chat";
  // }
};

const formattedDate = (date) => {
  const hari = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const d = new Date(date);
  const namaHari = hari[d.getDay()]; // Mendapatkan nama hari
  const tanggal = d.getDate(); // Tanggal (1-31)
  const namaBulan = bulan[d.getMonth()]; // Nama bulan
  const jam = String(d.getHours()).padStart(2, "0"); // Jam dalam format 24 jam
  const menit = String(d.getMinutes()).padStart(2, "0"); // Menit

  return `${namaHari} ${tanggal} ${namaBulan} ${jam}.${menit}`;
};

const groupMessageList = async () => {
  const response = await axios.get(
    `http://localhost:8000/api/v1/test/${userID}`
  );
  console.log("group: ", response.data);
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
  const privateChatList = response.data.private_chat.map((pcl) => ({
    privateChatId: pcl.message_private_chat_id,
    senderId: pcl.sender_id,
    senderName: pcl.sender_name,
    date: formattedDate(pcl.latest_time_chat),
    message: pcl.latest_chat,
    avatar: pcl.avatar,
  }));

  messages.value = privateChatList;
  console.log("list: ", messages.value);
};

const sendMessage = async () => {
  console.log("Active key: ", activeChatId.value); // Log active key

  if (activeTab.value == "group-chat") {
    console.log("image: ", selectedFile.value);

    console.log("send data to group chat");

    try {
      console.log("userid : ", userID, "dan sender : ", activeChatId.value);
      const response = await axios.post(
        `http://localhost:8000/api/v1/test-send-group/${activeChatId.value}`, // Pastikan userID valid
        {
          sender_id: userID, // ID pengirim
          group_chat_text: messageText.value, // Konsisten dengan key di server
          image: selectedFile.value, // Path media
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Perbaikan pada huruf kecil
          },
        }
      );

      console.log(response.data); // Log respons dari server
      console.log("Active key: ", activeChatId.value); // Log active key
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
    messageText.value = "";
    imagePreview.value = null;

    console.log("active key : ", activeChatId.value);
  } else if (activeTab.value == "private-chat") {
    console.log("Send data to private chat");
    console.log("image: ", selectedFile.value);

    try {
      console.log("userid : ", userID, "dan sender : ", activeChatId.value);
      const response = await axios.post(
        `http://localhost:8000/api/v1/test-send-private/${activeChatId.value}`, // Pastikan userID valid
        {
          sender_id: userID, // ID pengirim
          private_chat_text: messageText.value, // Konsisten dengan key di server
          image: selectedFile.value, // Path media
        },
        {
          headers: {
            "Content-Type": "multipart/form-data", // Perbaikan pada huruf kecil
          },
        }
      );

      console.log(response.data); // Log respons dari server
      console.log("Active key: ", activeChatId.value); // Log active key

      imagePreview.value = null;
    } catch (error) {
      console.error(
        "Error sending data:",
        error.response?.data || error.message
      );
    }
    messageText.value = "";
  }
};

const closeDropdownOnClickOutside = (event) => {
  // Check if the click is outside any dropdown or button
  // console.log(isDropdownOpen("profile"));
  if (
    !event.target.closest("[data-dropdown-button]") &&
    !event.target.closest("[data-dropdown-content]")
  ) {
    activeEmojiDropdown.value = null;
    activeEditorDropdown.value = null;
    isChatBodyDropdown.value = false;
  }
};

// Set up event listener untuk resize
onMounted(() => {
  setTimeout(() => {
    initialBodyChat();
    groupMessageList();
    privateMessageList();
    isLoading.value = true;
  }, 200);

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);
  document.addEventListener("click", closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdownOnClickOutside);
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
                  v-if="isLoading"
                  class="me-auto inline-flex items-center justify-center whitespace-nowrap rounded-full bg-danger w-[20px] h-[20px] text-center align-baseline text-[10px] font-bold leading-none text-white group-[.active]:hidden"
                >
                  {{ messages.length }}
                </span>
              </li>
              <li role="presentation" class="flex items-center gap-2">
                <a
                  v-if="isMdScreen"
                  href="#"
                  class="relative flex items-center capitalize text-light dark:text-subtitle-dark"
                  :class="{ active: activeTab === 'group-chat' }"
                  @click.prevent="switchTab('group-chat')"
                >
                  Group Chat
                </a>
                <a
                  v-if="!isMdScreen"
                  href="#"
                  class="relative flex items-center capitalize text-light dark:text-subtitle-dark"
                  :class="{ active: activeTab === 'group-chat' }"
                  @click.prevent="switchTab('group-chat')"
                >
                  Group
                </a>
                <span
                  v-if="isLoading"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-danger w-[20px] h-[20px] text-center text-[10px] font-bold leading-none text-white group-[.active]:hidden"
                >
                  {{ groupMessages.length }}
                </span>
              </li>
            </ul>
            <!-- End Nav -->

            <!-- Private Chat -->
            <ul
              v-show="activeTab === 'private-chat'"
              class="private-chat p-0 max-h-[535px] relative overflow-x-hidden overflow-y-auto scrollbar pt-[16px]"
            >
              <li v-for="message in messages" :key="message.senderId">
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
                      @click="getChatMessage('private-chat', message.senderId)"
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
                  <!-- Active User -->
                  <div class="flex items-center w-full gap-x-3 py-2">
                    <!-- User Avatar -->
                    <img
                      class="w-[35px] h-[35px] rounded-full object-cover shadow-lg"
                      :src="chatUserAvatar || defaultAvatar"
                      alt="User avatar"
                      loading="lazy"
                      @error="chatUserAvatar = defaultAvatar"
                    />

                    <!-- User Name -->
                    <span
                      class="text-sm font-medium text-gray-800 dark:text-white"
                    >
                      {{ chatNameHeader || "User Tidak Diketahui" }}
                      <!-- Fallback jika nama kosong -->
                    </span>
                  </div>

                  <div class="relative" data-te-dropdown-ref>
                    <button
                      data-dropdown-button="header"
                      @click="bodyChatDropfdown"
                      class="text-[18px] text-light dark:text-subtitle-dark"
                      type="button"
                      id="inboxEllipsis"
                      data-te-dropdown-toggle-ref
                      aria-expanded="false"
                    >
                      <i class="uil uil-ellipsis-v"></i>
                    </button>
                    <ul
                      :class="{ hidden: !isChatBodyDropdown }"
                      class="absolute z-[1000] ltr:float-left rtl:float-right m-0 right-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:shadow-boxLargeDark dark:bg-box-dark-down [&[data-te-dropdown-show]]:block"
                      aria-labelledby="inboxEllipsis"
                      data-te-dropdown-menu-ref
                    >
                      <li v-if="activeTab == 'group-chat'">
                        <a
                          @click="leaveGroupChat"
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up gap-[6px]"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-users-alt"></i> Leave group chat
                        </a>
                      </li>
                      <!-- <li v-else-if="activeTab == 'private-chat'">
                        <a
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up gap-[6px]"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-users-alt"></i> Block user
                        </a>
                      </li> -->
                      <li>
                        <a
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-trash-alt"></i> Mute notification
                        </a>
                      </li>
                      <li>
                        <a
                          class="block w-full px-4 py-2 text-sm font-normal capitalize bg-transparent whitespace-nowrap text-neutral-700 hover:bg-primary/10 hover:text-primary dark:hover:text-title-dark active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-subtitle-dark dark:hover:bg-box-dark-up"
                          href="#"
                          data-te-dropdown-item-ref
                        >
                          <i class="uil uil-ban"></i> Report
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <!-- body -->
              <div
                ref="chatWrapper"
                style="scroll-behavior: smooth"
                class="h-[479px] pt-[25px] relative overflow-x-hidden overflow-y-auto chat-wrapper scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
              >
                <!-- Tampilkan pesan jika chats kosong -->
                <div
                  v-if="!chats"
                  class="flex justify-center items-center h-full"
                >
                  <p class="text-gray-500 dark:text-gray-300">
                    Belum ada pesan
                  </p>
                </div>
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
                        :src="chat.avatar"
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

                      <!-- image attached -->
                      <div v-if="chat.image_path" class="mt-2">
                        <img
                          v-if="chat.image_path"
                          :src="chat.image_path"
                          alt="Attached Image"
                          class="w-full max-w-[300px] rounded-lg object-cover"
                        />
                      </div>

                      <!-- Chat Date -->
                      <span
                        class="mt-1 text-xs text-gray-500 dark:text-gray-400"
                        :class="chat.isSender ? 'self-end' : 'self-start'"
                      >
                        {{ chat.date }}
                      </span>
                    </div>

                    <!-- Actions (Emoji & Options) untuk pengirim -->
                    <div class="flex gap-2 items-center">
                      <!-- Dropdown Emoji -->
                      <div class="relative">
                        <button
                          data-dropdown-button="emoji"
                          @click="toggleEmoji(chat.id)"
                          class="text-[18px] text-light-extra dark:text-subtitle-dark"
                        >
                          <i class="uil uil-smile"></i>
                        </button>
                        <ul
                          v-if="activeEmojiDropdown === chat.id"
                          :class="{
                            'absolute z-[1000]  m-0 min-w-max list-none flex items-center overflow-hidden border-none bg-white bg-clip-padding text-left text-base dark:bg-box-dark-up py-2 shadow-[0_5px_30px_#9299b820] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-md px-[20px] gap-[8px]': true,
                            'right-0': chat.isSender,
                          }"
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

                      <!-- Dropdown Actions -->
                      <div class="relative">
                        <button
                          data-dropdown-button="editor"
                          @click="toggleEditor(chat.id)"
                          class="text-[18px] text-light-extra dark:text-subtitle-dark"
                        >
                          <i class="uil uil-ellipsis-h"></i>
                        </button>
                        <ul
                          v-if="activeEditorDropdown === chat.id"
                          :class="{
                            'absolute z-[1000] flex m-0 min-w-max list-none bg-white dark:bg-box-dark-up py-2 shadow-md rounded-md gap-1': true,
                            'right-0': chat.isSender,
                          }"
                        >
                          <li>
                            <a
                              @click="copyToClipboard(chat.message)"
                              href="#"
                              class="block px-2 py-1 text-sm"
                              >Copy</a
                            >
                          </li>
                          <li>
                            <a
                              @click="copyToClipboard(chat.message)"
                              href="#"
                              class="block px-2 py-1 text-sm"
                              >Copy Link</a
                            >
                          </li>
                          <!-- <li>
              <a href="#" class="block px-4 py-2 text-sm">Edit</a>
            </li>
            <li>
              <a href="#" class="block px-4 py-2 text-sm"
                >Forward</a
              >
            </li> -->
                          <li>
                            <a
                              v-if="chat.isSender"
                              @click="deleteMessage(chat.id)"
                              href="#"
                              class="block px-2 py-1 text-sm"
                              >Remove</a
                            >
                          </li>
                        </ul>
                      </div>
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
                    @click="showEmojiPicker"
                    class="uil uil-smile text-[20px] z-99998 text-[#8C90A4] dark:text-subtitle-dark cursor-pointer"
                    aria-hidden="true"
                  >
                  </i>
                  <div
                    :class="{
                      'bottom-0 left-0 w-[300px] h-[400px] absolute': true,
                      hidden: !showEmoji,
                    }"
                    data-dropdown-button="emoji-picker"
                  >
                    <EmojiPicker
                      :native="true"
                      pickerType="static"
                      @select="onSelectEmoji"
                    />
                  </div>
                  <input
                    v-model="messageText"
                    @keyup.enter="sendMessage"
                    type="text"
                    placeholder="Type a message..."
                    class="w-full bg-transparent h-[68px] text-[16px] text-dark dark:text-title-dark outline-none shadow-none border-none dark:placeholder-shown:text-title-dark"
                    aria-label="Type a message"
                  />
                </div>
                <div class="flex items-center gap-4">
                  <!-- Image Preview -->
                  <div class="relative">
                    <div
                      v-if="imagePreview"
                      class="w-16 h-16 border border-gray-300 rounded-full overflow-hidden shadow-md"
                    >
                      <button
                        type="button"
                        @click="clearPreview"
                        class="absolute top-1 right-1 transform translate-x-2 -translate-y-2 bg-gray-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs shadow"
                        aria-label="Remove image"
                      >
                        ✕
                      </button>
                      <img
                        :src="imagePreview"
                        alt="Preview"
                        class="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <!-- Button for attaching image -->
                  <button
                    type="button"
                    class="flex items-center justify-center bg-section dark:bg-box-dark-up w-[50px] h-[50px] rounded-full shadow-md"
                    aria-label="Attach photo"
                    @click="triggerFileInput"
                  >
                    <i
                      class="uil uil-camera text-[18px] text-light dark:text-subtitle-dark"
                      aria-hidden="true"
                    ></i>
                  </button>

                  <!-- Hidden file input -->
                  <input
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    class="hidden"
                    @change="handleFileUpload"
                  />

                  <!-- Button for link -->
                  <!-- <button
                    type="button"
                    class="flex items-center justify-center bg-section dark:bg-box-dark-up w-[50px] h-[50px] rounded-full shadow-md"
                    aria-label="Attach link"
                  >
                    <i
                      class="uil uil-link text-[18px] text-light dark:text-subtitle-dark"
                      aria-hidden="true"
                    ></i>
                  </button> -->

                  <!-- Button for send message -->
                  <button
                    @click="sendMessage"
                    type="button"
                    class="flex items-center justify-center bg-primary w-[50px] h-[50px] rounded-full text-white shadow-md"
                    data-te-ripple-init=""
                    data-te-ripple-color="light"
                    aria-label="Send message"
                  >
                    <i
                      class="uil uil-message text-[18px] text-white"
                      aria-hidden="true"
                    ></i>
                  </button>
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
  </main>
  <!-- End: Main Content -->
</template>

<style scoped>
.object-cover {
  object-fit: cover;
}
.rounded-md {
  border-radius: 0.375rem;
}
</style>
