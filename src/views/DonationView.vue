<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";

const router = useRouter();
const route = useRoute();
const projectId = route.params.projectId;
const userId = JSON.parse(localStorage.getItem("user"))
  ? JSON.parse(localStorage.getItem("user")).user_id
  : null;
const projectDetail = ref();
const userProfile = ref({
  userId: "",
  fullName: "",
  address: "",
  phoneNumber: "",
  email: "",
});
const amountPayment = ref(0);
const totalPayment = ref({
  subTotalPayment: 0,
  fee: 0,
  feePercentage: 0,
  totalPayment: 0,
});

const eWalletPaymentMethod = ref([
  {
    eWalletName: "QRIS",
    description: "Didukung oleh sebagian besar aplikasi emoney dan bank",
    icon: "",
    alt: "QRIS Logo",
  },
  {
    eWalletName: "OVO Ewallet",
    description: "OVO Ewallet",
    icon: "",
    alt: "OVO Logo",
  },
  {
    eWalletName: "LinkAja Ewallet",
    description: "LinkAja Ewallet",
    icon: "",
    alt: "LinkAja Logo",
  },
  {
    eWalletName: "DANA Ewallet",
    description: "DANA Ewallet",
    icon: "",
    alt: "DANA Logo",
  },
]);

const ewalletChecked = ref({});
const channelPayment = ref("");

const snapToken = ref(null);
const orderId = ref(null);
const status = ref("pending");

const isEwalletChecked = (ewallet) => {
  return ewalletChecked.value.eWalletName === ewallet.eWalletName;
};

const checkedEwallet = (ewallet) => {
  console.log("checked : ", ewallet);
  ewalletChecked.value.eWalletName = ewallet.eWalletName;
  channelPayment.value = ewallet.eWalletName;
  console.log("ewallet : ", ewalletChecked.value);

  //   checkTotalAmountPayment();
};

const getProjectDetail = async () => {
  try {
    const responses = await api.get(`/project/${projectId}/public/detail`);

    const projectdetailList = responses.data.project_details.map((project) => ({
      projectId: project.project_id,
      projectTitle: project.project_title,
      projectAddress: project.project_address,
    }));

    projectDetail.value = projectdetailList[0];

    console.log("project detail : ", projectDetail.value);
  } catch (error) {
    console.error("error Fetch Project : ", error);
  }
};

const getUserProfile = async () => {
  try {
    const response = await api.get(`/user/${userId}/profile`);

    console.log("user : ", response.data.user);
    const data = response.data.user;
    userProfile.value = {
      userId: data.user_id,
      fullName: data.full_name, // Ambil dari response.full_name
      phoneNumber: data.phone_number, // Ambil dari response.phone_number
      email: data.email, // Ambil dari response.email
    };

    console.log("user profile HEADER : ", userProfile.value);
  } catch (error) {
    console.error("error Fetch User : ", error);
  }
};

const startPaymentTransaction = async () => {
  try {
    const response = await api.post(`/project/${projectId}/donation/snap`, {
      donation_amount: amountPayment.value,
    });

    console.log("API Response:", response.data);

    if (!response.data.snap_token) {
      console.error("Snap token is missing from API response.");
      return;
    }

    snapToken.value = response.data.snap_token;
    orderId.value = response.data.order_id;

    console.log("Snap token:", snapToken.value);
    showSnapModal();
  } catch (error) {
    console.error(
      "Error fetching Snap token:",
      error.response ? error.response.data : error
    );
  }
};

const showSnapModal = () => {
  if (!window.snap) {
    console.error("Snap.js not loaded");
    return;
  }

  window.snap.pay(snapToken.value, {
    onSuccess: async (result) => {
      console.log("Payment Success:", result);

      try {
        const callBackData = {
          transaction_status: result.transaction_status,
          transaction_time: result.transaction_time,
          transaction_id: result.transaction_id,
          payment_type: result.payment_type,
          bank: result.va_numbers ? result.va_numbers[0].bank : null, // Pastikan properti ini ada agar tidak undefined
          va_number: result.va_numbers ? result.va_numbers[0].va_number : null, // Pastikan properti ini ada agar tidak undefined
          phone_number: userProfile.value.phoneNumber,
          email: userProfile.value.email,
          full_name: userProfile.value.fullName,
          gross_amount: amountPayment.value,
        };

        console.log("callback data : ", callBackData);

        const response = await api.post(
          `/project/${projectId}/donation/${orderId.value}/snap/callback`,
          callBackData // Kirim langsung objek ini, bukan dalam objek lain
        );

        console.log("snap callback : ", response.data);
        status.value = "success";
        router.push({
          path: `/project/${projectId}`,
        });
      } catch (error) {
        console.error("Error updating payment status:", error);
      }
    },
    onPending: (result) => {
      console.log("Payment Pending:", result);
      status.value = "pending";
    },
    onError: (result) => {
      console.log("Payment Failed:", result);
      status.value = "failed";
    },
  });
};

onMounted(() => {
  getUserProfile();
  getProjectDetail();
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto p-4 md:p-6">
      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-8 gap-6">
        <div class="col-span-8 lg:col-start-2 lg:col-span-6 space-y-6">
          <!-- Page Title -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-gray-800">
              Complete Your Payment
            </h1>
            <p class="text-gray-600 mt-2">
              Please provide your information and select a payment method to
              continue.
            </p>
          </div>
        </div>

        <!-- Left Column - User Information -->
        <div class="col-span-8 lg:col-start-2 lg:col-span-6 space-y-6 mb-6">
          <!-- User Information Section -->
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >1</span
                >
                User Information
              </h2>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="fullName"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Full Name</label
                  >
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    v-model="userProfile.fullName"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    v-model="userProfile.email"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Phone Number</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    ></div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      v-model="userProfile.phoneNumber"
                      class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="0812 3456 7890"
                    />
                  </div>
                </div>
                <div>
                  <label
                    for="amount"
                    class="block text-sm font-medium text-gray-700 mb-1"
                    >Amount</label
                  >
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                    >
                      <span class="text-gray-500">IDR</span>
                    </div>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      v-model="amountPayment"
                      class="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value="31,100"
                    />
                  </div>
                  <p class="mt-2 text-sm text-gray-500">
                    Minimum amount: IDR 10,000
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method Section -->
        </div>

        <!-- Right Column - Order Summary -->
        <div class="col-span-8 lg:col-start-2 lg:col-span-6">
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 sticky top-6"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >2</span
                >
                Informasi Pembayaran
              </h2>
            </div>

            <div class="p-6">
              <div
                class="rounded-lg bg-yellow-50 border-l-4 border-yellow-400 p-4 text-gray-700 mb-3"
              >
                <p class="font-semibold">Pemberitahuan</p>
                <p>
                  Sistem pembayaran ini saat ini masih berada dalam
                  <strong>mode pengembangan</strong>. Transaksi tidak akan
                  memproses pembayaran asli. Untuk menyimulasikan pembayaran,
                  silakan kunjungi:
                  <a
                    href="https://simulator.sandbox.midtrans.com"
                    target="_blank"
                    class="text-blue-600 underline"
                    >Midtrans Sandbox Simulator</a
                  > setelah menekan tombol <span class="font-semibold">Donate Now.</span>
                </p>
              </div>

              <div class="space-y-4 mb-4">
                <div class="flex justify-between items-center">
                  <p class="text-gray-600">Payment Number</p>
                  <p class="font-medium text-gray-900">PA9855919</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-gray-600">Created</p>
                  <p class="text-gray-900">2023-12-08 16:04:42</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-gray-600">Expiry</p>
                  <p class="text-gray-900">2023-12-08 20:04:42</p>
                </div>

                <div class="pt-4 border-t border-gray-100">
                  <div class="flex justify-between items-center">
                    <p class="text-gray-600">Donatur</p>
                    <p class="text-gray-900">
                      {{ userProfile.fullName }}
                    </p>
                  </div>
                  <div class="flex mt-3 justify-between items-center">
                    <p class="text-gray-600">Email</p>
                    <p class="text-gray-900">
                      {{ userProfile.email }}
                    </p>
                  </div>
                  <div class="flex mt-3 justify-between items-center">
                    <p class="text-gray-600">Donasi</p>
                    <p class="text-gray-900">
                      {{ projectDetail?.projectTitle }}
                    </p>
                  </div>
                  <!-- <div class="flex mt-3 justify-between items-center">
                    <p class="text-gray-600">Address</p>
                    <p class="text-gray-900">
                      {{ projectDetail?.projectAddress }}
                    </p>
                  </div> -->
                </div>

                <div class="pt-4 border-t border-gray-100">
                  <div class="flex justify-between items-center">
                    <p class="text-gray-600">Subtotal</p>
                    <p class="text-gray-900">IDR {{ amountPayment }}</p>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-lg font-semibold text-gray-800">Total</p>
                  <p class="text-xl font-bold text-blue-600">
                    IDR {{ amountPayment }}
                  </p>
                </div>

                <div class="relative">
                  <button
                    @click="startPaymentTransaction"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg flex justify-center items-center transition-all"
                  >
                    DONATE NOW
                  </button>
                </div>
              </div>

              <div class="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                Dengan melanjutkan, saya mengakui bahwa saya telah membaca dan
                menyetujui

                <span>
                  <a href="#" class="text-blue-600 hover:underline"
                    >Syarat Penggunaan</a
                  >
                  dan
                  <a href="#" class="text-blue-600 hover:underline"
                    >Kebijakan Privasi</a
                  >
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
