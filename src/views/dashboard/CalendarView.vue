<script setup>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, computed, onMounted, onBeforeMount, nextTick } from "vue";
import api from "@/api";
import { useToast } from "vue-toast-notification";

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const toastNotification = useToast();
const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null; // Ambil data JSON dari localStorage
const eventAgendaList = ref([]);
const pickerDate = ref();
const eventTime = ref(null);
const eventDescription = ref(null);
const eventCategory = ref(null);
const mainDate = ref();
const flow = ref(["year", "month", "calendar"]);

const categoryColors = ref({
  // Kategori Umum
  meeting: "blue",
  workshop: "green",
  deadline: "red",
  presentation: "purple",
  networking: "orange",
  brainstorming: "yellow",
  conference: "teal",
  personal: "pink",

  // Kategori Proyek Donasi & Volunteer
  fundraising: "yellow", // Penggalangan Dana
  volunteer: "green", // Kegiatan Sukarela
  charity: "indigo", // Kegiatan Amal
  campaign: "purple", // Kampanye Kesadaran
  site_visit: "blue", // Kunjungan Lapangan
  reporting: "red", // Pelaporan Proyek
  other: "gray", // Kategori lainnya
});

const openNotificatication = (message, type="success") => {
  toastNotification.open({
    type: type,
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

const attributesEventAgendaList = computed(() => [
  ...eventAgendaList.value.map((agenda) => ({
    dates: agenda.dates,
    dot: {
      color: agenda.color,
      ...(agenda.isComplete && { class: "opacity-50" }),
      style: {
        width: "12px",
        height: "12px",
      },
    },
    popover: {
      label: `${agenda.category} : ${agenda.description} - ${agenda.time} WIB`,
      visibility: "hover",
    },
  })),
]);

//Initial Agenda
const todayisTheDay = () => {
  const calendar = document.querySelector(".vc-container");
  const today = new Date()
    .toLocaleString("en-CA", { timeZone: "Asia/Jakarta" })
    .split(",")[0];

  if (calendar) {
    calendar.querySelectorAll(".vc-day").forEach((day) => {
      const dateClass = Array.from(day.classList).find((cls) =>
        cls.startsWith("id-")
      );

      if (dateClass) {
        const date = dateClass.replace("id-", "");

        // Tambahkan kategori dan deskripsi untuk tanggal tertentu
        if (date === today) {
          const childElement = day.querySelector(".vc-day-content");
          console.log(childElement); // Log elemen parent
          childElement.classList.add("bg-blue-500");
          childElement.classList.add("text-white");
          childElement.classList.add("hover:text-black-800");
          // const categoryDiv = document.createElement("div");
          // categoryDiv.className = "category-indicator bg-blue-500";
          // categoryDiv.textContent = "Today";
          // day.appendChild(categoryDiv);

          const descriptionDiv = document.createElement("div");
          descriptionDiv.className = "description hidden";
          descriptionDiv.textContent = "Meeting with team.";
          day.appendChild(descriptionDiv);
        }
        // } else if (date === "2025-01-20") {
        //   const categoryDiv = document.createElement("div");
        //   categoryDiv.className = "category-indicator bg-green-500";
        //   categoryDiv.textContent = "Health"; // Nama kategori
        //   day.appendChild(categoryDiv);

        //   const descriptionDiv = document.createElement("div");
        //   descriptionDiv.className = "description hidden";
        //   descriptionDiv.textContent = "Doctor appointment.";
        //   day.appendChild(descriptionDiv);
        // }
      }
    });
  }
};

//New Event
function createNewEvent() {
  if (
    !pickerDate.value ||
    !eventCategory.value ||
    !eventDescription.value ||
    !eventTime.value
  ) {
    return;
  }

  const newEvent = {
    description: eventDescription.value,
    isComplete: false,
    dates: { start: pickerDate.value, end: pickerDate.value },
    color: "green", // Anda bisa menyesuaikan warna
  };

  eventAgendaList.value.push(newEvent);

  //dots
  dotsModifier();

  // Reset form
  // eventDescription.value = null;
  // eventCategory.value = null;
  // eventTime.value = null;
  // pickerDate.value = null;
}

const dotsModifier = () => {
  const dotsContainers = document.querySelectorAll(".vc-dots");
  dotsContainers.forEach((dotsContainer) => {
    // Tambahkan class Tailwind dan override gaya default
    dotsContainer.classList.add("grid", "gap-1", "mt-2");
    dotsContainer.style.display = "grid"; // Override gaya flex jika ada
    dotsContainer.style.gridTemplateColumns = "repeat(3, 1fr)"; // 3 kolom

    const dots = dotsContainer.querySelectorAll(".vc-dot");

    dots.forEach((dot) => {
      // const popOverEventElement = document.createElement("div");
      // popOverEventElement.className = "vc-dot-popover-element hidden";
      // popOverEventElement.textContent = "Hallo World";
      dot.classList.add("w-10", "h-10");
      dot.style.width = "14px"; // Pastikan ukuran tetap seragam
      dot.style.height = "14px";
      // dot.addEventListener("hover", popoverElementDescription);
      // dot.appendChild(popOverEventElement);
    });
  });
};

const modifyDotsLayout = () => {
  nextTick(() => {
    dotsModifier();
  });
};
// Fungsi untuk mengambil data dari API
const fetchAgendas = async () => {
  try {
    const response = await api.get(`user/${userId}/agenda/list`);
    // Mapping data dari API ke struktur `eventAgendaList`

    console.log("agenda : ", response.data.agendas);
    eventAgendaList.value = response.data.agendas.map((agenda) => ({
      agendaId: agenda.agenda_id,
      description: agenda.deskripsi,
      isComplete: agenda.is_completed,
      dates: { start: agenda.tanggal_agenda, end: agenda.tanggal_agenda },
      color: getCategoryColor(agenda.category),
      time: agenda.waktu_agenda,
      category: agenda.category,
    }));

    console.log("ag : ", eventAgendaList.value);
  } catch (error) {
    console.error("Gagal mengambil data agenda:", error);
    openNotificatication("Terjadi kesalahan saat Mengambil Data Agenda", "error");
  }
};

// Fungsi untuk menyimpan agenda ke database
const saveNewAgenda = async () => {
  try {
    // Validasi input
    // createNewEvent();
    // if (!pickerDate.value || !eventTime.value || !eventDescription.value || !eventCategory.value) {
    //   console.error("Harap lengkapi semua bidang!");
    //   return;
    // }

    // Data yang akan dikirim ke API
    const newAgenda = {
      tanggal_agenda: pickerDate.value, // Format tanggal (YYYY-MM-DD)
      description: eventDescription.value,
      is_completed: false, // Default tidak selesai
      category: eventCategory.value,
      waktu_agenda: eventTime.value,
    };

    console.log("new agenda : ", newAgenda);
    // Kirim data ke API
    const response = await api.post(`user/${userId}/agenda`, newAgenda);

    pickerDate.value = null;
    eventTime.value = null;
    eventDescription.value = null;
    eventCategory.value = null;
    if (response.status === 201 || response.status == 200) {
      openNotificatication("Agenda Berhasil Disimpan");
      await fetchAgendas();
    }
    console.log("Agenda berhasil disimpan:", response.data);
  } catch (error) {
    console.error("Gagal menyimpan agenda:", error);

    openNotificatication("Terjadi kesalahan saat menyimpan Agenda", "error");

  }
};

// Fungsi untuk mendapatkan warna berdasarkan kategori
const getCategoryColor = (category) => {
  return categoryColors.value[category] || "gray";
};

onMounted(() => {
  fetchAgendas();
  setTimeout(() => {
    modifyDotsLayout();
    todayisTheDay();
  }, 1000);
});

onMounted(async () => {
  try {
    await fetchAgendas();
  } catch (error) {
    console.error("Gagal mengambil data:", error);
    openNotificatication("Terjadi kesalahan saat Mengambil data Agenda", "error");

  }
  emits("toggle-loading"); // Matikan loading setelah fetching selesai

  setTimeout(() => {
    modifyDotsLayout();
    todayisTheDay();
  }, 1000);
});

onBeforeMount(() => {
  emits("toggle-active-loading");
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
            <!-- Title
            <h4
              class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold"
            >
              calendar
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
                      >calendar</span
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
        class="flex items-center justify-end 4xl:hidden ssm:mb-[30px] mb-[15px]"
      >
        <!-- Tombol Refresh -->
        <button @click="dotsModifier" class="px-2 py-1 rounded-md bg-white">
          <i class="ui uil-spinner-alt text-xl text-black"></i>
        </button>
      </div>
      <div class="w-full mx-auto">
        <div class="flex mx-[-15px]">
          <div
            class="grid grid-cols-12 gap-4 4xl:w-[75%] w-full px-[15px] mb-[30px]"
          >
            <!-- Full calendar -->
            <div
              id="full-calendar"
              class="col-start-1 col-span-12 md:col-span-9 h-auto relative bg-white main-calendar dark:bg-box-dark rounded-10 p-[25px] overflow-x-auto scrollbar "
            >
              <VCalendar
                :attributes="attributesEventAgendaList"
                expanded
                locale="id"
                v-model="mainDate"
                :masks="{ weekdays: 'WWWW' }"
                :flow="flow"
              />
            </div>

            <!-- Create Event  -->
            <div
              class="md:col-start-10 md:col-span-3 col-start-1 col-span-12 relative main-calendar dark:bg-box-dark rounded-10 overflow-x-auto scrollbar"
            >
              <!-- Header untuk konteks -->
              <div
                class="bg-primary text-white text-center py-[10px] rounded-t-10 font-bold"
              >
                Agenda Kalender
              </div>

              <!-- Kontainer utama -->
              <div
                class="bg-white p-[25px] rounded-b-10 grid-col gap-[15px] justify-center space-y-2"
              >
                <!-- Pemilihan Tanggal -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Pilih Tanggal</span
                  >
                  <input
                    v-model="pickerDate"
                    type="date"
                    placeholder="Pilih Tanggal Agenda"
                    class="w-full rounded-[8px] border border-gray-300 px-[10px] py-[8px] text-gray-700"
                  />
                </div>

                <!-- Input Waktu Agenda -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Waktu Agenda</span
                  >
                  <input
                    v-model="eventTime"
                    type="time"
                    class="w-full rounded-[8px] border border-gray-300 px-[10px] py-[8px] text-gray-700"
                  />
                </div>

                <!-- Input Kategori Agenda -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Kategori Agenda</span
                  >
                  <select
                    v-model="eventCategory"
                    class="w-full rounded-[8px] border border-gray-300 px-[10px] py-[8px] text-gray-700 text-center"
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    <option
                      v-for="category in Object.keys(categoryColors)"
                      :value="category"
                    >
                      {{ category.replace("_", " ") }}
                    </option>
                  </select>
                </div>

                <!-- Input Deskripsi Agenda -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Deskripsi Agenda</span
                  >
                  <textarea
                    v-model="eventDescription"
                    placeholder="Tulis deskripsi agenda"
                    class="w-full rounded-[8px] border border-gray-300 px-[10px] py-[8px] text-gray-700 resize-none"
                    rows="3"
                  ></textarea>
                </div>

                <!-- Validasi dan Notifikasi -->
                <p
                  v-if="
                    !pickerDate ||
                    !eventCategory ||
                    !eventDescription ||
                    !eventTime
                  "
                  class="text-sm text-red-500 mb-[4px]"
                >
                  * Harap lengkapi semua bidang sebelum membuat acara
                </p>

                <!-- Tombol Create Event -->
                <button
                  @click="saveNewAgenda"
                  type="button"
                  data-te-toggle="modal"
                  data-te-target="#evenModal"
                  class="h-[50px] text-[14px] font-medium w-full rounded-[8px] bg-primary border-primary text-white flex items-center justify-center gap-[6px] px-[30px]"
                  :disabled="
                    !pickerDate ||
                    !eventCategory ||
                    !eventDescription ||
                    !eventTime
                  "
                  :class="{
                    'opacity-50 cursor-not-allowed':
                      !pickerDate ||
                      !eventCategory ||
                      !eventDescription ||
                      !eventTime,
                  }"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                >
                  <i class="uil uil-plus"></i>
                  <span class="hidden md:inline">Tambah Agenda</span>
                  <span class="md:hidden"> Agenda </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.vc-pane-container .vc-pane {
  height: auto;
}

.vc-pane-container .vc-pane .vc-weeks {
  /* background-color: blue; */
  height: auto;
}

.vc-pane-container .vc-pane .vc-weeks .vc-day {
  /* background-color: red; */
  height: 100px;
  /* background-color: aqua; */
}

.vc-container .vc-weekday-1,
.vc-container .vc-weekday-2,
.vc-container .vc-weekday-3,
.vc-container .vc-weekday-4,
.vc-container .vc-weekday-5,
.vc-container .vc-weekday-6 {
  /* Tambahkan properti gaya di sini */
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-right: 0.5px solid #eceff1; /* Pembatas tipis di kanan */
}
.vc-container .vc-weekday-7 {
  background-color: #f8f9fa;
  color: #333;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}

/* Styling kategori */
.category-indicator {
  position: absolute;
  top: 10px; /* Tempatkan di atas */
  left: 50%; /* Pusatkan secara horizontal */
  transform: translateX(-50%);
  font-size: 0.75rem; /* Ukuran teks kecil */
  font-weight: bold;
  color: white; /* Warna teks putih */
  background-color: var(--category-color, gray); /* Warna default */
  padding: 2px 6px; /* Jarak dalam teks */
  border-radius: 4px; /* Membuat sudut membulat */
  z-index: 2;
}

/* Styling deskripsi (tersembunyi secara default) */
.description {
  position: absolute;
  bottom: 5px; /* Tempatkan di bawah */
  left: 50%; /* Pusatkan secara horizontal */
  transform: translateX(-50%);
  width: 90%;
  text-align: center;
  font-size: 0.75rem;
  color: #4a4a4a;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  padding: 4px;
  z-index: 3;
  visibility: hidden; /* Sembunyikan awalnya */
  opacity: 0;
  transition: visibility 0s, opacity 0.3s; /* Transisi untuk efek mulus */
}

/* Tampilkan deskripsi saat .vc-day di-hover */
.vc-day:hover .description {
  visibility: visible;
  opacity: 1;
}

.vc-day {
  position: relative; /* Pastikan parent memiliki posisi relatif */
}

.vc-day-content {
  position: absolute;
  top: 0.25rem; /* Sesuaikan jarak dari atas */
  right: 0.25rem; /* Sesuaikan jarak dari kanan */
  z-index: 10; /* Pastikan elemen berada di atas elemen lain */
}

.vc-day-layer {
  display: flex;
  justify-content: center;
}

.vc-day-content:hover {
  color: black; /* Ubah warna teks menjadi hitam saat hover */
  cursor: pointer; /* Tambahkan kursor pointer */
}

.vc-dot-popover-element {
  position: absolute;
  background-color: red;
  font-size: 12px;
  color: white;
}
</style>
