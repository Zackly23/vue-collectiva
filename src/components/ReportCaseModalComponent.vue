<script setup>
import { ref } from "vue";

const caseTypes = ref([
  "Functionality Issue",
  "Visual/Aesthetic Issue",
  "Performance Issue",
  "Security Issue",
  "Data/Content Issue",
  "Crash/Error Issue",
  "Localization/Internationalization Issue",
  "Usability/UX Issue",
  "Other",
]);

const fileName = ref("");

const reportData = ref({
  selectedCase: "",
  clarityReport: "",
  reportAttachment: null,
});

const handleReportFileUpload = (event) => {
  const file = event.target.files[0];
  reportData.value.reportAttachment = file;

  fileName.value = file.value ? file.value.name : "";
  console.log("file report : ", reportData.value.reportAttachment);
};

const props = defineProps({
  isModalOpen: Boolean,
});

const emits = defineEmits(["close-report-modal", "submit-report"]);

const submitReport = () => {
  if (!reportData.value.selectedCase || !reportData.value.clarityReport) {
    alert("Please fill in required fields.");
    return;
  }

  emits("submit-report", reportData.value); // Kirim data ke parent
};
</script>

<template>
  <div>
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mt-6">
        <!-- Header -->
        <div class="flex justify-between items-center border-b pb-3">
          <h2 class="text-xl font-semibold">Report</h2>
          <button
            @click="emits('close-report-modal')"
            class="text-gray-500 hover:text-red-500"
          >
            &times;
          </button>
        </div>

        <!-- Report Case Selection -->
        <div class="mt-4">
          <p class="text-sm font-medium mb-2">
            Reason for reporting this case?
          </p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="caseType in caseTypes"
              :key="caseType"
              @click="reportData.selectedCase = caseType"
              class="px-3 py-1 border rounded text-sm transition-all"
              :class="
                reportData.selectedCase === caseType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              "
            >
              {{ caseType }}
            </button>
          </div>
        </div>

        <!-- Clarity on Report -->
        <div class="mt-4">
          <label class="text-sm font-medium mb-1 block"
            >Can you provide clarity on the issue?</label
          >
          <textarea
            v-model="reportData.clarityReport"
            class="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500"
            rows="3"
          ></textarea>
        </div>

        <!-- Attach File -->
        <div class="mt-4">
          <label class="text-sm font-medium mb-1 block">Attach files</label>
          <input
            type="file"
            @change="handleReportFileUpload"
            class="w-full border p-2 rounded text-sm"
          />
          <p v-if="fileName" class="text-sm text-gray-500 mt-1">
            Selected: {{ fileName }}
          </p>
        </div>

        <!-- Additional Information -->
        <!-- <div class="mt-4">
        <label class="text-sm font-medium mb-1 block">Additional information</label>
        <textarea v-model="additionalInfo" class="w-full border p-2 rounded text-sm focus:ring-2 focus:ring-blue-500" rows="2"></textarea>
      </div> -->

        <!-- Submit & Close Buttons -->
        <div class="mt-6 flex justify-end space-x-2">
          <button
            @click="emits('close-report-modal')"
            class="px-4 py-2 text-sm border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            @click="submitReport"
            class="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>
