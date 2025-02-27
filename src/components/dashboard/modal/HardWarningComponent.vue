<script setup>

const props = defineProps({
  isConfirmationModalOpen: Boolean,
  description: String,
  action: String,
  title: String
});

const emits = defineEmits(['close-confirmation-modal', 'action-modal']);

</script>

<template>

      <!-- Konfirmasi Delete Modal  -->
  <div>
    <div
      v-if="isConfirmationModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">{{ title }}</h5>
          <button
            @click="emits('close-confirmation-modal')"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4 text-center">
          <img
            src="../../../assets/images/confirmations/red warning.png"
            alt="Warning"
            class="mx-auto mb-4 w-16 h-16"
          />
          <p class="text-gray-600">
            {{ description }}
          </p>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t space-x-2">
          <button
            @click="emits('close-confirmation-modal')"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Batal
          </button>
          <button
            @click="emits('action-modal')"
            class="px-4 py-2 text-white bg-red-400 rounded hover:bg-red-500"
          >
            {{ action }}
          </button>
        </div>
      </div>
    </div>
  </div>

</template>