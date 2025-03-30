<script setup>
import { onMounted, ref, watch, computed, onBeforeMount } from "vue";
import SuspendedAlertComponent from "@/components/SuspendedAlertComponent.vue";
import api from "@/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line } from "vue-chartjs";
import { Pie } from "vue-chartjs";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const props = defineProps({
  isLoading: Boolean,
});

const emits = defineEmits(["toggle-loading", "toggle-active-loading"]);
const user = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const monthLineChart = ref([]);
const weekLineChart = ref([]);
const dayLineChart = ref([]);
const dummydata = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
const dummyPieChart = ref({
  data: [100],
  labels: ["Belum Ada Share"],
  backgroundColor: [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#9966FA",
  ],
  hoverBackgroundColor: [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#9966FB",
  ],
});

const chartRef = ref();

// Warna gradient untuk background chart
const createGradient = (ctx, colorStart, colorEnd) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  return gradient;
};

// Data untuk Pie Chart
const pieChartData = computed(() => ({
  labels: dummyPieChart.value.labels,
  datasets: [
    {
      data: dummyPieChart.value.data, // Persentase pendapatan dari masing-masing sumber
      backgroundColor: dummyPieChart.value.backgroundColor,
      hoverBackgroundColor: dummyPieChart.value.hoverBackgroundColor,
    },
  ],
}));

//IDR
const IDR = new Intl.NumberFormat(["ban", "id"]);
// Data chart dengan efek gradient
const chartData = computed(() => ({
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Revenue",
      fill: true,
      backgroundColor: (context) =>
        createGradient(
          context.chart.ctx,
          "rgba(75, 192, 192, 0.4)",
          "rgba(75, 192, 192, 0.1)"
        ),
      borderColor: "#4bc0c0",
      pointBackgroundColor: "#4bc0c0",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#4bc0c0",
      tension: 0.4,
      data: dummydata.value,
    },
    {
      label: "Profit",
      fill: true,
      backgroundColor: (context) =>
        createGradient(
          context.chart.ctx,
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 99, 132, 0.1)"
        ),
      borderColor: "#ff6384",
      pointBackgroundColor: "#ff6384",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "#ff6384",
      tension: 0.4,
      data: [],
    },
  ],
}));

// Opsi chart agar lebih smooth & profesional
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
      labels: {
        color: "#333",
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleFont: { size: 14, weight: "bold" },
      bodyFont: { size: 13 },
      padding: 10,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#666",
        font: {
          size: 13,
        },
      },
    },
    y: {
      grid: {
        color: "rgba(200, 200, 200, 0.2)",
      },
      ticks: {
        color: "#666",
        font: {
          size: 13,
        },
        callback: function (value, index, ticks) {
          // Hanya tampilkan label untuk index genap (0,2,4,...)
          if (index % 2 !== 0) {
            return "";
          }
          return `Rp ${IDR.format(value)}`;
        },
      },
    },
  },
});

const pieChartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
});

const projectStatistics = ref([]);

const socialMediaStatistic = ref([
  {
    social_media_id: 1,
    social_media_name: "facebook",
    social_media_icon: "ui uil-facebook",
    social_media_color: "bg-blue-600",
    social_media_statistic: 0,
  },
  {
    social_media_id: 2,
    social_media_name: "Twitter",
    social_media_icon: "ui uil-twitter",
    social_media_color: "bg-blue-200",
    social_media_statistic: 0,
  },
  {
    social_media_id: 3,
    social_media_name: "Instagram",
    social_media_icon: "ui uil-instagram",
    social_media_color: "bg-red-200",
    social_media_statistic: 0,
  },
  {
    social_media_id: 4,
    social_media_name: "WhatsApp",
    social_media_icon: "ui uil-facebook",
    social_media_color: "bg-green-600",
    social_media_statistic: 0,
  },
]);

const projectBestPerformace = ref([]);
const topDonatur = ref([]);

//API
const getTopDonatur = async () => {
  try {
    const response = await api.get(
      `/dashboard/user/${user.user_id}/donatur`,

      {
        params: {
          filter: "all",
        },
      }
    );

    const topDonaturData = response.data.top_donatur.map((item) => ({
      donaturId: item.donatur_id,
      donaturAvatar: item.donatur_avatar,
      donaturName: item.donatur_name,
      donationAmount: IDR.format(item.total_donation),
    }));

    console.log("dada : ", topDonaturData);
    // const projectCardStastistic = response.data.project_statistics.map((statistic) => {

    // })
    // console.log('before: ', projectStatistics.value);
    topDonatur.value = topDonaturData;
    // console.log('after: ', pprojectStatistics.value);
  } catch (error) {
    console.log("lenght : ", topDonatur.value.length);

    console.log("error : ", error.response.data);
  }
};

const getBestProjectPerformance = async () => {
  try {
    const response = await api.get(
      `/dashboard/user/${user.user_id}/project/performance`
    );

    const projectBestPerformaceData = response.data.projects.map((item) => ({
      projectId: item.project_id,
      projectBestTitle: item.project_title,
      projectBestLocation: item.provinsi,
      projectBestCategory: item.project_category,
      projectBestTargetAmount: IDR.format(item.project_target_amount),
      projectBestProgressPercentageAmount: item.progress_percentage,
      projectBestStatus: item.status,
    }));

    projectBestPerformace.value = projectBestPerformaceData;

    console.log("best : ", projectBestPerformace.value);
  } catch (error) {
    console.log("error : ", error.response.data);
  }
};

const getProjectCardStatistic = async () => {
  try {
    const response = await api.get(`/dashboard/user/${user.user_id}/statistic`);

    // const projectCardStastistic = response.data.project_statistics.map((statistic) => {

    // })
    console.log("before: ", projectStatistics.value);
    projectStatistics.value = response.data.project_statistic;
    console.log("after: ", projectStatistics.value);
  } catch (error) {
    console.log("error : ", error.response.data);
  }
};

const getPieChart = async () => {
  try {
    const response = await api.get(
      `/dashboard/user/${user.user_id}/socialmedia/statistic`
    );
    console.log("aa : ", response.data.project_social_media.length);
    if (response.data.project_social_media.length > 0) {
      const projectShare = response.data.project_social_media.map((item) => ({
        social_media_id: item.project_share_id,
        social_media_name: item.sosmed_name,
        social_media_icon: item.icon,
        social_media_color: item.background_color,
        social_media_statistic: item.count,
      }));

      socialMediaStatistic.value = projectShare;

      const responseData = response.data.project_social_media;

      dummyPieChart.value.labels = responseData.map((item) => item.sosmed_name);
      dummyPieChart.value.data = responseData.map((item) => item.percentage);
      dummyPieChart.backgroundColor = responseData.map(
        (item) => item.background_color
      );
      dummyPieChart.value.hoverBackgroundColor = responseData.map(
        (item) => item.hover_color
      );

      console.log("piechart data : ", response.data.project_social_media);
    }
  } catch (error) {
    console.error(error);
  }
};

const getLineChart = async () => {
  try {
    const response = await api.get(
      `/dashboard/user/${user.user_id}/donation/statistic`
    );

    monthLineChart.value = response.data.donation_amount_monthly.map(
      (item) => item.donation_amount
    );
    weekLineChart.value = response.data.donation_amount_weekly.map(
      (item) => item.donation_amount
    );
    dayLineChart.value = response.data.donation_amount_daily.map(
      (item) => item.donation_amount
    );

    dummydata.value = monthLineChart.value;
    console.log("dummy : ", dummydata.value);
    console.log("data line chart : ", monthLineChart.value);
  } catch (error) {
    console.error(error);
  }
};

const fetchData = async () => {
  try {
    await Promise.all([
      getLineChart(),
      getPieChart(),
      getProjectCardStatistic(),
      getTopDonatur(),
      getBestProjectPerformance(),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(async () => {
  await fetchData();
  emits("toggle-loading"); // Matikan loading setelah fetching selesai
});

onBeforeMount(() => {
  emits("toggle-active-loading"); // Aktifkan loading sebelum fetching dimulai
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
            <!-- <h4 class="capitalize text-[20px] text-dark dark:text-title-dark font-semibold">demo two</h4> -->
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

                  <!-- Child (Current Page) -->
                  <li
                    class="inline-flex items-center before:content-[''] before:w-1 before:h-1 before:ltr:float-left rtl:float-right before:bg-light-extra before:me-[7px] before:pe-0 before:rounded-[50%]"
                    aria-current="page"
                  >
                    <!-- <span class="text-[14px] font-normal leading-[20px] flex items-center capitalize text-light dark:text-subtitle-dark">demo two</span> -->
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <SuspendedAlertComponent
        v-if="user.status == 'suspended'"
        :suspended-time="user.suspended_time"
      />
      <div class="grid grid-cols-12 gap-[25px]">
        <!-- Card Number Statistic  -->
        <div
          v-for="statistic in projectStatistics"
          :key="statistic.statistic_id"
          class="col-span-12 2xl:col-span-3 sm:col-span-6"
        >
          <div
            bordered="false"
            class="bg-white dark:bg-box-dark py-[25px] px-[25px] pb-[12px] overflow-hidden rounded-10 relative text-[15px] text-body dak:text-subtitle-dark"
          >
            <div class="flex justify-between">
              <div>
                <span
                  class="font-normal text-body dark:text-subtitle-dark text-15"
                  >{{ statistic.statistic_name }}</span
                >
                <h4
                  class="mb-0 text-2xl max-lg:text-[20px] max-sm:text-xl font-semibold leading-normal text-dark dark:text-title-dark"
                  :class="{
                    'max-lg:text-[14px]':
                      statistic.statistic_name === 'Total Donasi',
                  }"
                >
                  <div
                    class="flex items-center countCategories"
                    :data-number="statistic.statistic_number"
                  >
                    <span class="countNumber">
                      {{
                        statistic.statistic_name === "Total Donasi"
                          ? "Rp"
                          : statistic.statistic_name === "Total Jam Volunteer"
                          ? ">"
                          : ""
                      }}
                      {{ statistic.statistic_number }}</span
                    >

                    <span class="ml-1">
                      {{
                        statistic.statistic_name === "Total Jam Volunteer"
                          ? " jam"
                          : ""
                      }}
                    </span>
                  </div>
                </h4>
                <div>
                  <span
                    class="inline-flex items-center w-full h-11 rounded-lg gap-[10px]"
                  >
                    <span
                      :class="{
                        'flex font-medium gap-[2px] items-center text-sm': true,
                        'text-success': statistic.statistic_status === 'up',
                        'text-danger': statistic.statistic_status === 'down',
                      }"
                    >
                      <i
                        :class="{
                          'uil uil-arrow-up':
                            statistic.statistic_status === 'up',
                          'uil uil-arrow-down':
                            statistic.statistic_status === 'down',
                          'text-[18px]': true,
                        }"
                      ></i>
                      {{ statistic.statistic_percentage }}%
                    </span>
                    <span class="text-sm text-light dark:text-subtitle-dark"
                      >Since last month</span
                    >
                  </span>
                </div>
              </div>
              <div
                class="absolute bg-primary/10 flex h-full items-center justify-start max-md:w-[210px] max-ssm:w-[230px] overflow-hidden px-[30px] rounded-full left-[75%] text-primary top-0 w-[230px]"
              >
                <div class="flex items-center justify-center text-primary">
                  <div class="flex items-center text-primary text-[36px]">
                    <i :class="statistic.statistic_icon"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Line Chart Statistic of Total Donation and Volunteer On your Project (2 Line) -->
        <div class="col-span-12 2xl:col-span-6">
          <div
            class="bg-white dark:bg-box-dark rounded-lg shadow relative h-full"
          >
            <!-- Header -->
            <div
              class="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <h2
                class="text-xl font-semibold text-dark dark:text-title-dark capitalize"
              >
                Sale Revenue
              </h2>
              <ul class="flex gap-4 mt-2 md:mt-0" role="tablist">
                <li role="presentation">
                  <a
                    href="#sr-week"
                    data-te-toggle="pill"
                    data-te-target="#sr-week"
                    role="tab"
                    aria-controls="sr-week"
                    aria-selected="false"
                    class="px-3 py-1 border rounded-md text-sm text-light dark:text-subtitle-dark hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                  >
                    Week
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#sr-month"
                    data-te-toggle="pill"
                    data-te-target="#sr-month"
                    data-te-nav-active
                    role="tab"
                    aria-controls="sr-month"
                    aria-selected="true"
                    class="px-3 py-1 border rounded-md text-sm text-light dark:text-subtitle-dark hover:text-primary hover:bg-primary/10 transition-colors duration-200"
                  >
                    Month
                  </a>
                </li>
              </ul>
            </div>

            <!-- Line Chart -->
            <div class="p-6 pt-0 h-80">
              <Line ref="chartRef" :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </div>

        <!-- Social Media Share Statistic  -->
        <div class="col-span-12 2xl:col-span-6">
          <div
            class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full"
          >
            <div
              class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
            >
              <h2
                class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark capitalize"
              >
                Source Of Revenue Generated
              </h2>

              <!-- Print atau Download Laporan  -->
            </div>

            <div
              class="p-6 pb-12 flex flex-col md:flex-row gap-6 justify-center items-center"
            >
              <!-- Pie Chart -->
              <div
                class="w-full md:w-1/2 h-64 flex justify-center items-center"
              >
                <Pie :data="pieChartData" :options="pieChartOptions" />
              </div>

              <!-- Social Media List -->
              <div class="w-full md:w-1/2">
                <ul class="flex flex-wrap justify-center gap-4">
                  <li
                    v-for="socialMedia in socialMediaStatistic"
                    :key="socialMedia.social_media_id"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="flex items-center justify-center w-16 h-16 mb-2 rounded-lg text-2xl"
                      :style="{ color: socialMedia.social_media_color }"
                    >
                      <i
                        :class="[socialMedia.social_media_icon, 'text-[40px]']"
                      ></i>
                    </div>
                    <div class="text-center">
                      <div
                        class="text-base text-dark dark:text-title-dark font-medium"
                      >
                        {{ socialMedia.social_media_name }}
                      </div>
                      <div
                        class="text-sm text-light dark:text-subtitle-dark font-medium"
                      >
                        {{ socialMedia.social_media_statistic }} share
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Top Donatur In Your Project (Accumulative)  -->
        <div class="col-span-12 2xl:col-span-4">
          <div
            class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full"
          >
            <div
              class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
            >
              <h2
                class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark capitalize"
              >
                Top Donatur
              </h2>
              <!-- Filter  -->
              <ul
                class="py-[16px] max-ssm:py-[10px] flex items-center max-xs:flex-wrap max-xs:justify-center"
                role="tablist"
                data-te-nav-ref
              >
                <li role="presentation">
                  <a
                    data-te-toggle="pill"
                    data-te-target="#np-today"
                    data-te-nav-active
                    role="tab"
                    aria-controls="np-today"
                    aria-selected="true"
                    href="#np-today"
                    class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up"
                  >
                    today
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#np-week"
                    data-te-toggle="pill"
                    data-te-target="#np-week"
                    role="tab"
                    aria-controls="np-week"
                    aria-selected="false"
                    class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up"
                  >
                    Week
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#np-month"
                    data-te-toggle="pill"
                    data-te-target="#np-month"
                    role="tab"
                    aria-controls="np-month"
                    aria-selected="false"
                    class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up"
                  >
                    Month
                  </a>
                </li>
              </ul>
            </div>
            <div class="p-[25px] pt-0 h-full min-h-24">
              <div
                v-if="topDonatur?.length == 0"
                class="flex justify-center items-center h-[50%]"
              >
                Data Tidak Ditemukan
              </div>
              <div class="max-h-[320px] scrollbar overflow-y-auto">
                <div
                  id="np-today"
                  role="tabpanel"
                  data-te-tab-active
                  class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                >
                  <table
                    v-if="topDonatur?.length !== 0"
                    class="min-w-full text-sm font-light text-left whitespace-nowrap"
                  >
                    <thead>
                      <tr>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]"
                        >
                          Nama Donatur
                        </th>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]"
                        >
                          Donasi
                        </th>
                      </tr>
                    </thead>
                    <!-- Data  -->
                    <tbody class="bg-white dark:bg-box-dark">
                      <tr v-for="donatur in topDonatur" class="group">
                        <td
                          class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]"
                        >
                          <div class="flex items-center">
                            <div class="me-2.5 w-[34px] h-[34px]">
                              <img
                                class="min-w-[34px] h-[34px] rounded-4"
                                :src="donatur.donaturAvatar"
                                :alt="donatur.donaturName"
                              />
                            </div>
                            <span
                              class="font-medium capitalize text-dark dark:text-title-dark text-15"
                              >{{ donatur.donaturName }}</span
                            >
                          </div>
                        </td>
                        <td
                          class="ps-4 pe-4 py-2.5 font-medium last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]"
                        >
                          Rp {{ donatur.donationAmount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-span-12 2xl:col-span-8">
          <div
            class="bg-white dark:bg-box-dark m-0 p-0 text-body dark:text-subtitle-dark text-[15px] rounded-10 relative h-full"
          >
            <div
              class="px-[25px] text-dark dark:text-title-dark font-medium text-[17px] flex flex-wrap items-center justify-between max-sm:flex-col max-sm:h-auto max-sm:mb-[15px]"
            >
              <h2
                class="mb-0 inline-flex items-center py-[16px] max-sm:pb-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-semibold text-dark dark:text-title-dark capitalize"
              >
                Best Performance Project
              </h2>
              <ul
                class="py-[16px] max-ssm:py-[10px] flex items-center max-xs:flex-wrap max-xs:justify-center"
                role="tablist"
                data-te-nav-ref
              >
                <li role="presentation">
                  <a
                    data-te-toggle="pill"
                    data-te-target="#bs-today"
                    data-te-nav-active
                    role="tab"
                    aria-controls="bs-today"
                    aria-selected="true"
                    href="#bs-today"
                    class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up"
                  >
                    today
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#bs-week"
                    data-te-toggle="pill"
                    data-te-target="#bs-week"
                    role="tab"
                    aria-controls="bs-week"
                    aria-selected="false"
                    class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up"
                  >
                    Week
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#bs-month"
                    data-te-toggle="pill"
                    data-te-target="#bs-month"
                    role="tab"
                    aria-controls="bs-month"
                    aria-selected="false"
                    class="inline-flex items-center h-8 px-3 font-medium capitalize rounded-md text-13 dark:hover:text-white dark:text-subtitle-dark hover:text-primary text-light data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary data-[te-nav-active]:bg-primary/10 dark:data-[te-nav-active]:text-title-dark dark:data-[te-nav-active]:bg-box-dark-up"
                  >
                    Month
                  </a>
                </li>
              </ul>
            </div>
            <div
              v-if="projectBestPerformace?.length == 0"
              class="p-[25px] pt-0 h-full min-h-24"
            >
              <div class="flex justify-center items-center h-[50%]">
                Data Tidak Ditemukan
              </div>
            </div>
            <div class="p-[25px] pt-0">
              <div class="max-h-[320px] scrollbar overflow-y-auto">
                <div
                  id="bs-today"
                  role="tabpanel"
                  data-te-tab-active
                  class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                >
                  <table
                    v-if="projectBestPerformace?.length !== 0"
                    class="min-w-full text-sm font-light text-left whitespace-nowrap"
                  >
                    <thead>
                      <tr>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-start text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-s-[4px]"
                        >
                          Nama Project
                        </th>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden"
                        >
                          Wilayah
                        </th>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden"
                        >
                          Target
                        </th>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden"
                        >
                          Progress
                        </th>
                        <th
                          class="bg-regularBG dark:bg-box-dark-up px-4 py-2.5 text-end text-light dark:text-title-dark text-[12px] font-medium border-none before:hidden rounded-e-[4px]"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white dark:bg-box-dark">
                      <tr
                        class="group"
                        v-for="project in projectBestPerformace"
                      >
                        <td
                          class="ps-0 pe-4 py-2.5 text-start last:text-end text-dark dark:text-title-dark group-hover:bg-transparent text-15 font-medium border-none before:hidden rounded-s-[4px]"
                        >
                          <div class="flex items-center">
                            <div class="me-2.5 w-[34px] h-[34px]">
                              <img
                                class="min-w-[34px] h-[34px] rounded-4"
                                :src="project.projectBestImage"
                                :alt="project.projectBestTitle"
                              />
                            </div>
                            <span
                              class="font-medium capitalize text-dark dark:text-title-dark text-15"
                              >{{ project.projectBestTitle }}</span
                            >
                          </div>
                        </td>
                        <td
                          class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent"
                        >
                          {{ project.projectBestLocation }}
                        </td>
                        <td
                          class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent"
                        >
                          {{
                            project.projectBestCategory === "donation"
                              ? "Rp "
                              : ""
                          }}
                          {{ project.projectBestTargetAmount }}
                        </td>
                        <td
                          class="px-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent"
                        >
                          {{ project.projectBestProgressPercentageAmount }} %
                        </td>
                        <td
                          class="ps-4 pe-4 py-2.5 font-normal last:text-end capitalize text-[14px] text-dark dark:text-title-dark border-none group-hover:bg-transparent rounded-e-[4px]"
                        >
                          {{ project.projectBestStatus }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
