<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const date = ref();
const mainDate = ref();
const flow = ref(["year", "month", "calendar"]);
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
        class="flex items-center justify-center 4xl:hidden ssm:mb-[30px] mb-[15px]"
      ></div>
      <div class="w-full mx-auto">
        <div class="flex mx-[-15px]">
          <div class="flex gap-4 4xl:w-[75%] w-full px-[15px] mb-[30px]">
            <!-- Full calendar -->
            <div
              id="full-calendar"
              class="w-[75%] h-auto relative bg-white main-calendar dark:bg-box-dark rounded-10 p-[25px] overflow-x-auto scrollbar"
            >
              <VDatePicker class="my-calendar" v-model="mainDate" expanded />
            </div>

            <!-- Create Event  -->
            <div
              class="w-[25%] relative main-calendar dark:bg-box-dark rounded-10 overflow-x-auto scrollbar"
            >
              <!-- Header untuk konteks -->
              <div
                class="bg-primary text-white text-center py-[10px] rounded-t-10 font-bold"
              >
                Agenda Kalender
              </div>

              <!-- Kontainer utama -->
              <div class="bg-white p-[25px] rounded-b-10 grid gap-[15px]">
                <!-- Pemilihan Tanggal -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Pilih Tanggal</span
                  >
                  <VueDatePicker
                    v-model="date"
                    :flow="flow"
                    placeholder="Pilih Tanggal Agenda"
                    class="w-full rounded-[8px] border border-gray-300"
                  ></VueDatePicker>
                </div>

                <!-- Input Waktu Agenda -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Waktu Agenda</span
                  >
                  <input
                    v-model="time"
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
                    v-model="category"
                    class="w-full rounded-[8px] border border-gray-300 px-[10px] py-[8px] text-gray-700"
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    <option value="meeting">Meeting</option>
                    <option value="workshop">Workshop</option>
                    <option value="deadline">Deadline</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                <!-- Input Deskripsi Agenda -->
                <div>
                  <span class="mb-[4px] text-gray-700 block font-medium"
                    >Deskripsi Agenda</span
                  >
                  <textarea
                    v-model="description"
                    placeholder="Tulis deskripsi agenda"
                    class="w-full rounded-[8px] border border-gray-300 px-[10px] py-[8px] text-gray-700 resize-none"
                    rows="3"
                  ></textarea>
                </div>

                <!-- Validasi dan Notifikasi -->
                <p
                  v-if="!date || !category || !description || !time"
                  class="text-sm text-red-500 mb-[4px]"
                >
                  * Harap lengkapi semua bidang sebelum membuat acara
                </p>

                <!-- Tombol Create Event -->
                <button
                  type="button"
                  data-te-toggle="modal"
                  data-te-target="#evenModal"
                  class="h-[50px] text-[14px] font-medium w-full rounded-[8px] bg-primary border-primary text-white flex items-center justify-center gap-[6px] px-[30px]"
                  :disabled="!date || !category || !description || !time"
                  :class="{
                    'opacity-50 cursor-not-allowed':
                      !date || !category || !description || !time,
                  }"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                >
                  <i class="uil uil-plus"></i>
                  Create New Event
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
.vc-container .vc-weekday-7,
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
  border-right: 1px solid #ddd; /* Pembatas tipis di kanan */

}

</style>
