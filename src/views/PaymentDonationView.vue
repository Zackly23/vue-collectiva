<script setup>
import { ref } from "vue";

const paymentDetails = ref({
  paymentNumber: "P49855919",
  purchaseDetails: "iTunes Gift Card (US) - 2 USD",
  paymentStatus: "TERTUNDA",
  createdAt: "2023-12-06 16:04:42",
  expiry: "2023-12-08 20:04:42",
  handlingFee: "IDR 300",
  totalAmount: "IDR 31,400",
  paymentMethod: "VA", // Bisa "QRIS" atau "VA"
  bankName: "BRI", // Hanya digunakan jika metode VA
  vaNumber: "1234567890123456", // Hanya digunakan jika metode VA
  qrCodeSrc: "", // Digunakan jika metode QRIS
});

const paymentSteps = {
  BCA: [
    "Login ke BCA Mobile atau KlikBCA.",
    "Pilih menu Transfer > Virtual Account.",
    "Masukkan nomor VA: 1234567890123456.",
    "Periksa detail transaksi dan konfirmasi pembayaran.",
    "Simpan bukti transfer untuk referensi.",
  ],
  BRI: [
    "Login ke BRImo atau ATM BRI.",
    "Pilih menu Pembayaran > Virtual Account.",
    "Masukkan nomor VA yang diberikan.",
    "Konfirmasi jumlah pembayaran.",
    "Simpan bukti transaksi.",
  ],
  Mandiri: [
    "Buka Livin' by Mandiri atau ATM Mandiri.",
    "Pilih menu Bayar > Multi Payment.",
    "Masukkan kode perusahaan dan nomor VA.",
    "Konfirmasi pembayaran.",
    "Simpan bukti pembayaran.",
  ],
};
</script>

<template>
  <div class="bg-slate-50 min-h-screen flex items-center justify-center p-4">
    <div
      class="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden"
    >
      <!-- Informasi Pembayaran (Sekarang di atas) -->
      <div class="border-b border-gray-100 bg-gray-50 px-6 py-4">
        <h2 class="font-semibold text-gray-800 flex items-center">
          <span
            class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold mr-3"
            >3</span
          >
          Informasi Pembayaran
        </h2>
      </div>

      <div class="p-6">
        <!-- Payment Source Section -->
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 pb-5 mb-5"
        >
          <div class="mb-4 sm:mb-0">
            <p class="text-slate-500 text-sm">Payment From</p>
            <p class="font-semibold text-slate-800 text-lg">SEAGM</p>
            <a
              href="https://www.seagm.com"
              class="text-indigo-600 hover:text-indigo-800 transition-colors"
              >www.seagm.com</a
            >
          </div>
          <div class="bg-slate-100 px-4 py-2 rounded-lg">
            <p class="text-slate-500 text-sm">Paid with</p>
            <div class="flex items-center">
              <p class="font-semibold text-slate-800">
                {{ paymentDetails.paymentMethod }}
              </p>
            </div>
          </div>
        </div>

        <!-- Transaction Details -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p class="text-slate-500 text-sm mb-1">Payment Number</p>
            <p
              class="font-semibold text-slate-800 bg-slate-50 p-2 rounded border border-slate-200"
            >
              {{ paymentDetails.paymentNumber }}
            </p>
          </div>
          <div>
            <p class="text-slate-500 text-sm mb-1">Purchase Details</p>
            <p
              class="font-semibold text-slate-800 bg-slate-50 p-2 rounded border border-slate-200"
            >
              {{ paymentDetails.purchaseDetails }}
            </p>
          </div>
        </div>

        <!-- Payment Method Section (QR Code / VA) -->
        <!-- QR Code Payment -->
        <div
          v-if="paymentDetails.paymentMethod === 'QRIS'"
          class="flex flex-col sm:flex-row items-center bg-slate-50 rounded-xl p-5 mb-6"
        >
          <div
            class="w-full sm:w-1/2 flex justify-center sm:justify-start mb-4 sm:mb-0"
          >
            <div class="text-center sm:text-left">
              <p class="text-slate-700 font-medium mb-3">
                Scan kode QR untuk membayar:
              </p>
              <div
                class="bg-white p-3 rounded-lg border-2 border-indigo-100 shadow-sm inline-block"
              >
                <img
                  :src="paymentDetails.qrCodeSrc"
                  alt="QR Code"
                  class="w-48 h-48"
                />
              </div>
            </div>
          </div>
          <div class="w-full sm:w-1/2">
            <h3 class="text-slate-700 font-semibold mb-2">
              Cara Menggunakan QRIS:
            </h3>
            <ul class="list-disc pl-5 text-sm text-slate-600">
              <li>Buka aplikasi e-wallet atau mobile banking.</li>
              <li>
                Pilih menu "Scan QR" dan arahkan ke QR Code di sebelah kiri.
              </li>
              <li>Pastikan detail pembayaran sesuai.</li>
              <li>Konfirmasi dan selesaikan pembayaran.</li>
              <li>Simpan bukti pembayaran.</li>
            </ul>
          </div>
        </div>

        <div
          v-if="paymentDetails.paymentMethod === 'VA'"
          class="bg-slate-50 rounded-xl p-5 mb-6"
        >
          <div class="flex justify-center items-center space-x-8 mb-4 sm:justify-start">
            <div>
              <p class="text-slate-700 font-medium mb-3">
                Transfer ke Virtual Account:
              </p>
              <div class="flex items-center space-x-3">
                <p class="text-lg font-semibold text-blue-600">
                  {{ paymentDetails.bankName }}
                </p>
                <p
                  class="bg-gray-200 text-gray-800 px-3 py-1 rounded-lg font-semibold"
                >
                  {{ paymentDetails.vaNumber }}
                </p>
                <button
                  @click="copyToClipboard(paymentDetails.vaNumber)"
                  class="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  Salin
                </button>
              </div>

              <p class="text-slate-500 text-sm mt-2">
                Gunakan kode VA di aplikasi perbankan Anda.
              </p>
            </div>

            <div class="w-full sm:w-1/2">
              <h3 class="text-slate-700 font-semibold mb-2">
                Cara Pembayaran {{ paymentDetails.bankName }} VA:
              </h3>
              <ul class="list-disc pl-5 text-sm text-slate-600">
                <li
                  v-for="(step, index) in paymentSteps[paymentDetails.bankName]"
                  :key="index"
                >
                  {{ step }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Payment Summary -->
        <div class="bg-slate-50 rounded-xl p-5">
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div>
              <p class="text-slate-500 text-sm">Status Pembayaran:</p>
              <p
                class="font-semibold bg-red-50 text-red-600 px-3 py-1 rounded-full inline-block mt-1"
              >
                {{ paymentDetails.paymentStatus }}
              </p>
            </div>
            <div>
              <p class="text-slate-500 text-sm">Dibuat pada:</p>
              <p class="font-medium text-slate-700">
                {{ paymentDetails.createdAt }}
              </p>
            </div>
            <div>
              <p class="text-slate-500 text-sm">Expiry:</p>
              <p class="font-medium text-slate-700">
                {{ paymentDetails.expiry }}
              </p>
            </div>
            <div>
              <p class="text-slate-500 text-sm">Handling Fee:</p>
              <p class="font-medium text-slate-700">
                {{ paymentDetails.handlingFee }}
              </p>
            </div>
          </div>

          <div
            class="border-t border-slate-200 pt-4 flex justify-between items-center"
          >
            <p class="text-slate-700 font-medium">Jumlah Total:</p>
            <p class="text-lg sm:text-xl font-bold text-red-600">
              {{ paymentDetails.totalAmount }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Nomor VA berhasil disalin!");
  });
}
</script>
