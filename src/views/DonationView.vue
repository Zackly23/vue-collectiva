<script setup>
import { ref, onMounted } from "vue";
import { start } from "@popperjs/core";
import { useRoute, useRouter } from "vue-router";
import api from "@/api";


const router = useRouter();
const route = useRoute();
const projectId = route.params.projectId;
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

//API
const checkTotalAmountPayment = async () => {
  console.log({
    sub_total: amountPayment.value,
    channel: channelPayment.value,
  });
  try {
    const response = await api.post(
      "test-profile",
      {
        sub_total: amountPayment,
        channel: channelPayment,
      },
      { headers }
    );

    console.log("pay : ", response.data.payment);
    if (response.status === 200) {
      const payment = response.data.payment;
      (totalPayment.value.subTotalPayment = payment.sub_total),
        (totalPayment.value.feePercentage = payment.fee_percentage),
        (totalPayment.value.fee = payment.fee),
        (totalPayment.value.totalPayment = payment.total);
    }

    console.log("payment  : ", totalPayment.value);
  } catch (error) {
    console.error("error Fetch User : ", error);
  }
};
const getUserProfile = async () => {
  try {
    const response = await api.get("/test-profile", {});

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
    console.log("push to payment");
    router.push({
      path: `/donation/payment/${projectId}`,
      name: "donation-payment",
      query: { orderId: "PA9855919" },
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getUserProfile();
});
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="max-w-6xl mx-auto p-4 md:p-6">
      <!-- Page Title -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-800">Complete Your Payment</h1>
        <p class="text-gray-600 mt-2">
          Please provide your information and select a payment method to
          continue.
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - User Information -->
        <div class="lg:col-span-2 space-y-6">
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
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
              <h2 class="font-semibold text-gray-800 flex items-center">
                <span
                  class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
                  >2</span
                >
                PILIH METODE PEMBAYARAN
              </h2>
            </div>

            <!-- Payment Method Tabs -->
            <div class="border-b border-gray-200">
              <div class="flex -mb-px">
                <button
                  class="py-4 px-6 border-b-2 border-blue-500 text-blue-600 font-medium"
                >
                  E-Wallet
                </button>
                <button
                  disabled
                  class="py-4 px-6 text-gray-400 hover:text-gray-500 border-b-2 border-transparent"
                >
                  Bank Transfer
                </button>
                <button
                  disabled
                  class="py-4 px-6 text-gray-400 hover:text-gray-500 border-b-2 border-transparent"
                >
                  Credit Card
                </button>
              </div>
            </div>

            <!-- Online Payment Options -->
            <div class="p-6">
              <!-- QRIS Payment Option -->
              <div
                v-for="ewallet in eWalletPaymentMethod"
                :class="{
                  'mb-4 border rounded-lg  transition-all': true,
                  'border-gray-200 hover:border-gray-300':
                    !isEwalletChecked(ewallet),
                  'border-blue-200  bg-blue-50': isEwalletChecked(ewallet),
                }"
                @click="checkedEwallet(ewallet)"
                :key="ewallet.alt"
              >
                <div class="p-4 flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      type="radio"
                      :checked="isEwalletChecked(ewallet)"
                      class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label class="ml-3 flex flex-col">
                      <span class="font-medium text-gray-900">{{
                        ewallet.eWalletName
                      }}</span>
                      <span class="text-sm text-gray-500">{{
                        ewallet.description
                      }}</span>
                    </label>
                  </div>
                  <img :src="ewallet.icon" :alt="ewallet.alt" class="h-8" />
                </div>
                <!-- <div
                  class="absolute top-0 right-0 h-full w-1 bg-blue-500 rounded-r-lg"
                ></div> -->
              </div>

              <!-- More Payment Methods Button -->
              <!-- <button
                class="w-full py-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center"
              >
                <span>13 MORE PAYMENT METHODS</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button> -->
            </div>
          </div>
        </div>

        <!-- Right Column - Order Summary -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-lg shadow-sm border border-gray-100 sticky top-6"
          >
            <div class="border-b border-gray-100 px-6 py-4">
              <h2 class="font-semibold text-gray-800">INFORMASI PEMBAYARAN</h2>
            </div>

            <div class="p-6">
              <div class="space-y-4 mb-4">
                <div class="flex justify-between items-center">
                  <p class="text-gray-600">Payment Number</p>
                  <p class="font-medium text-gray-900">PA9855919</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-gray-600">Dibuat</p>
                  <p class="text-gray-900">2023-12-08 16:04:42</p>
                </div>
                <div class="flex justify-between items-center">
                  <p class="text-gray-600">Expiry</p>
                  <p class="text-gray-900">2023-12-08 20:04:42</p>
                </div>

                <div class="pt-4 border-t border-gray-100">
                  <div class="flex justify-between items-center">
                    <p class="text-gray-600">Subtotal</p>
                    <p class="text-gray-900">
                      IDR {{ totalPayment.subTotalPayment }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-4 bg-gray-50 p-4 rounded-lg">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-gray-600 font-medium">PAY WITH</p>
                  <img
                    :src="ewalletChecked.ICON"
                    :alt="ewalletChecked.eWalletName"
                    class="h-6"
                  />
                </div>

                <div class="flex justify-between items-center mb-2">
                  <p class="text-gray-600">Biaya Pembayaran</p>
                  <div class="text-right">
                    <p class="font-medium">IDR {{ totalPayment.fee }}</p>
                    <p
                      v-if="totalPayment?.feePercentage"
                      class="text-xs text-gray-500"
                    >
                      ({{ totalPayment.feePercentage }})
                    </p>
                  </div>
                </div>
              </div>

              <div class="mb-2">
                <div class="flex justify-between items-center mb-4">
                  <p class="text-lg font-semibold text-gray-800">Total</p>
                  <p class="text-xl font-bold text-blue-600">
                    IDR {{ totalPayment.totalPayment }}
                  </p>
                </div>

                <div class="relative">
                  <button
                    @click="startPaymentTransaction"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg flex justify-center items-center transition-all"
                  >
                    PAY NOW
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
