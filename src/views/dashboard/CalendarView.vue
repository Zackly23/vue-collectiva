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
            <!-- Title -->
            <h4
              class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold"
            >
              calendar
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
            <div
              class="w-[25%] relative main-calendar dark:bg-box-dark rounded-10 overflow-x-auto scrollbar"
            >
              <div class="bg-white p-[25px] rounded-10 grid grid-rows-2">
                <div>
                  <span class="mb-[4px]">Pilih Tanggal</span>
                  <VueDatePicker
                    v-model="date"
                    :flow="flow"
                    placeholder="Pilih Tanggal Agenda"
                  ></VueDatePicker>
                </div>
                <button
                  type="button"
                  data-te-toggle="modal"
                  data-te-target="#evenModal"
                  class="h-[50px] text-[14px] font-medium w-full rounded-[8px] mb-[25px] bg-primary border-primary text-white flex items-center justify-center gap-[6px] px-[30px]"
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

      <div
        data-te-modal-init
        class="fixed left-0 top-0 z-[1070] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
        id="evenModal"
        tabindex="-1"
        aria-labelledby="evenModalLabel"
        aria-modal="true"
        role="dialog"
      >
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
        >
          <div
            class="relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto bg-clip-padding dark:bg-box-dark"
          >
            <div
              class="flex items-center justify-between flex-shrink-0 py-4 border-b-1 px-[25px] rounded-t-md border-neutral-100 dark:border-box-dark-up"
            >
              <!--Modal title-->
              <h5
                class="text-[17px] font-medium text-dark dark:text-title-dark leading-[22px] capitalize"
                id="evenModal"
              >
                Create New event
              </h5>
              <!--Close button-->
              <button
                type="button"
                class="w-[34px] h-[34px] bg-normalBG text-dark border-1 border-regular dark:border-box-dark-up rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary duration-200 ease-in-out text-[15px] dark:bg-box-dark-up dark:text-title-dark dark:hover:bg-primary dark:hover:text-white dark:hover:border-primary hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                data-te-modal-dismiss
                aria-label="Close"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <i class="uil uil-multiply"></i>
              </button>
            </div>

            <!--Modal body-->
            <div class="relative p-[25px]">
              <form action="">
                <div
                  class="flex max-ssm:flex-col mb-[20px] gap-x-[40px] max-ssm:gap-y-[5px]"
                >
                  <div class="min-w-[70px] flex items-center">
                    <label
                      for="title"
                      class="text-[14px] text-light dark:text-subtitle-dark font-normal capitalize"
                    >
                      Title:
                    </label>
                  </div>
                  <div class="flex-1">
                    <input
                      id="title"
                      type="text"
                      placeholder="Select Event title"
                      class="border-regular border dark:border-box-dark-up rounded-6 h-[46px] flex items-center w-full text-[14px] px-[20px] outline-none text-body dark:text-subtitle-dark dark:bg-box-dark-up"
                    />
                  </div>
                </div>
                <div
                  class="flex max-ssm:flex-col mb-[20px] gap-x-[40px] max-ssm:gap-y-[5px]"
                >
                  <div class="min-w-[70px] flex items-center">
                    <label
                      for="title"
                      class="text-[14px] text-light dark:text-subtitle-dark font-normal capitalize"
                    >
                      Event Type:
                    </label>
                  </div>
                  <div
                    class="flex flex-wrap items-center flex-1 radio-group gap-[15px]"
                  >
                    <div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                      <input
                        class="relative ltr:float-left rtl:float-right -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary"
                        type="radio"
                        value=""
                        id="checkboxDefault"
                        name="checkbox-group"
                      />
                      <label
                        class="inline-block ps-[0.15rem] hover:cursor-pointer text-light dark:text-subtitle-dark text-[15px]"
                        for="checkboxDefault"
                      >
                        Event
                      </label>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                      <input
                        class="relative ltr:float-left rtl:float-right -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary"
                        type="radio"
                        value=""
                        id="checkboxDefault2"
                        name="checkbox-group"
                      />
                      <label
                        class="inline-block ps-[0.15rem] hover:cursor-pointer text-light dark:text-subtitle-dark text-[15px]"
                        for="checkboxDefault2"
                      >
                        Reminder
                      </label>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                      <input
                        class="relative ltr:float-left rtl:float-right -ms-[1.5rem] me-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary"
                        type="radio"
                        value=""
                        id="checkboxDefault3"
                        name="checkbox-group"
                      />
                      <label
                        class="inline-block ps-[0.15rem] hover:cursor-pointer text-light dark:text-subtitle-dark text-[15px]"
                        for="checkboxDefault3"
                      >
                        Task
                      </label>
                    </div>
                  </div>
                </div>
                <div
                  class="flex max-ssm:flex-col mb-[20px] gap-x-[40px] max-ssm:gap-y-[5px]"
                  id="dateRangePicker"
                >
                  <div class="min-w-[70px] flex items-center">
                    <label
                      for="start"
                      class="text-[14px] text-light dark:text-subtitle-dark font-normal capitalize"
                    >
                      Date:
                    </label>
                  </div>
                  <div class="flex flex-1 gap-[15px]">
                    <input
                      id="start"
                      type="text"
                      placeholder="Star date"
                      name="start"
                      class="border-regular border dark:border-box-dark-up rounded-6 h-[46px] flex items-center w-full text-[14px] px-[20px] outline-none text-body dark:text-subtitle-dark dark:bg-box-dark-up"
                    />
                    <input
                      type="text"
                      placeholder="End date"
                      name="end"
                      class="border-regular border dark:border-box-dark-up rounded-6 h-[46px] flex items-center w-full text-[14px] px-[20px] outline-none text-body dark:text-subtitle-dark dark:bg-box-dark-up"
                    />
                  </div>
                </div>
                <div
                  class="flex max-ssm:flex-col mb-[20px] gap-x-[40px] max-ssm:gap-y-[5px]"
                >
                  <div class="min-w-[70px] flex items-center">
                    <label
                      for="textareafrom"
                      class="text-[14px] text-light dark:text-subtitle-dark font-normal capitalize"
                    >
                      Description:
                    </label>
                  </div>
                  <div class="flex-1">
                    <textarea
                      id="textareafrom"
                      rows="3"
                      placeholder="Add description"
                      class="border-regular dark:bg-box-dark-up border dark:border-box-dark-up rounded-6 flex items-center w-full text-[14px] py-[15px] px-[20px] outline-none text-body dark:text-subtitle-dark resize-none"
                    ></textarea>
                  </div>
                </div>
                <div
                  class="flex max-ssm:flex-col gap-x-[40px] max-ssm:gap-y-[5px]"
                >
                  <div class="min-w-[70px] flex items-center">
                    <label
                      for="textareafrom"
                      class="text-[14px] text-light dark:text-subtitle-dark font-normal capitalize"
                    >
                      Labe:
                    </label>
                  </div>
                  <div class="flex-1">
                    <select
                      data-te-select-init
                      data-te-class-select-input="py-[11px] px-[20px] w-full capitalize [&~span]:top-[15px] [&~span]:w-[15px] [&~span]:h-[15px] [&~span]:text-body dark:[&~span]:text-white ltr:[&~span]:right-[0.75rem] rtl:[&~span]:left-[0.75rem] rtl:[&~span]:right-auto text-light dark:text-subtitle-dark border-regular dark:border-box-dark-up border-1 rounded-6 dark:bg-box-dark-up outline-none"
                      data-te-class-notch-leading="!border-0 !shadow-none group-data-[te-input-focused]:shadow-none group-data-[te-input-focused]:border-none"
                      data-te-class-notch-middle="!border-0 !shadow-none !outline-none"
                      data-te-class-notch-trailing="!border-0 !shadow-none !outline-none"
                    >
                      <option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="success">Success</option>
                      <option value="danger">Danger</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <!--Modal footer-->
            <div
              class="flex flex-wrap items-center justify-end flex-shrink-0 px-[25px] pb-[20px] rounded-b-md"
            >
              <button
                type="button"
                class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-dark dark:text-title-dark transition duration-150 ease-in-out hover:bg-primary-accent-100"
                data-te-modal-dismiss
              >
                Close
              </button>
              <button
                type="button"
                class="ms-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600"
              >
                Create event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="px-[25px] bg-white dark:bg-box-dark">
      <!-- Footer content -->
      <div
        class="flex justify-between flex-wrap py-[22px] gap-x-[30px] gap-y-[15px] max-ssm:gap-y-[8px] items-center max-md:flex-col"
      >
        <!-- Copyright information -->
        <div
          class="flex items-center gap-[4px] text-[14px] font-medium max-md:text-center text-body dark:text-subtitle-dark"
        >
          © <span class="current-year">2022</span>
          <a href="#" class="text-primary">SovWare</a>
        </div>

        <!-- Footer navigation links -->
        <div class="justify-end md:justify-center items-center flex gap-[15px]">
          <a
            href="#"
            class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
            >About</a
          >
          <a
            href="#"
            class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
            >Team</a
          >
          <a
            href="#"
            class="text-body dark:text-subtitle-dark text-[14px] hover:text-primary dark:hover:text-title-dark"
            >Contact</a
          >
        </div>
      </div>
    </footer>
    <!-- end: Footer -->
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
</style>
