<script setup>
import { ref } from "vue";
import { useToast } from "vue-toast-notification";

const toastNotification = useToast();

const socialAccounts = ref([
  { platform: "Facebook", icon: "fa-facebook-f", username: "SHCunionOfficial" },
  { platform: "Instagram", icon: "fa-instagram", username: "@SHCunion" },
  { platform: "Twitter", icon: "fa-twitter", username: "@SHCunionOfficial" },
  { platform: "TikTok", icon: "fa-tiktok", username: "@SHCunionOfficial" },
]);

const copyToClipboard = (username) => {
  navigator.clipboard.writeText(username).then(() => {
    openNotificatication(`Username ${username} Berhasil Di-copy!`);
  });
};

const openNotificatication = (message, type = "success") => {
  toastNotification.open({
    type: type,
    message: message,
    position: "top-right",
    duration: 3000,
  });
};

const currentYear = ref(new Date().getFullYear());
</script>

<template>
  <!-- Footer -->
  <footer
    class="w-full sm:px-6 lg:px-8 px-[25px] mx-auto bg-gray-50 dark:bg-gray-900 min-h-[120px]"
  >
    <div
      class="bottom-0 flex justify-between items-center flex-wrap pt-4 pb-4 gap-x-[30px] gap-y-[15px] max-ssm:gap-y-[8px] max-md:flex-col max-md:items-center"
    >
      <!-- Copyright information -->
      <div
        class="flex flex-col items-start max-md:items-center text-[16px] font-medium text-gray-700 dark:text-gray-300"
      >
        <div class="flex items-center space-x-2">
          © <span class="current-year">{{ currentYear }}</span>
          <a href="#" class="text-green-600 hover:underline">SHCUnion</a>
        </div>

        <div
          class="mt-1 text-gray-600 dark:text-gray-400 text-[13px] max-md:text-[14px] flex max-md:justify-center flex-col max-md:items-center"
        >
          <p>PT Indah Jaya Musabahar</p>
          <p>Jl. Sudirman No. 123, Jakarta, Indonesia</p>
          <p>Email: support@shcunion.com</p>
        </div>
      </div>

      <!-- Social media section -->
      <div class="flex flex-col items-center gap-y-[10px] mr-20 max-md:mr-0">
        <!-- Follow Us text -->
        <p
          class="text-gray-700 dark:text-gray-300 text-[15px] font-medium max-md:hidden block"
        >
          Follow Us
        </p>

        <!-- Social media icons -->
        <div class="flex items-center gap-[15px]">
          <button
            v-for="account in socialAccounts"
            :key="account.platform"
            @click="copyToClipboard(account.username)"
            class="text-gray-600 dark:text-gray-400 text-[20px] hover:text-primary dark:hover:text-title-dark transition-colors duration-200"
            :title="`Salin ${account.platform}`"
          >
            <i :class="`fa-brands ${account.icon}`"></i>
          </button>
        </div>
      </div>

      <!-- Footer navigation links -->
      <div class="flex items-center gap-[15px]">
        <router-link
          to="/about"
          class="text-gray-700 dark:text-gray-300 text-[15px] hover:text-primary transition-colors duration-200"
          >About</router-link
        >
        <router-link
          to="/team"
          class="text-gray-700 dark:text-gray-300 text-[15px] hover:text-primary transition-colors duration-200"
          >Team</router-link
        >
        <router-link
          to="/guidance"
          class="text-gray-700 dark:text-gray-300 text-[15px] hover:text-primary transition-colors duration-200"
          >Guide</router-link
        >
      </div>
    </div>
  </footer>

  <!-- end: Footer -->
</template>
