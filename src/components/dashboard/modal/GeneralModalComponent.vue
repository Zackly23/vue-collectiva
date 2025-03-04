<script setup>
import { onMounted, ref } from 'vue';
import { defineEmits, defineProps } from 'vue';


const isTagDropdownOpen = ref(false);
const projectTagList = ref();
const selectedTags = ref([]);
const props = defineProps(['projectModalData', 'isProjectModalOpen']);

const emit = defineEmits(['update-project-detail', 'handle-file-upload', 'close-project-modal']);

// Toggle dropdown visibility
const toggleTagDropdown = () => {
  isTagDropdownOpen.value = !isTagDropdownOpen.value;
};

// Toggle tag selection
const toggleTagSelection = (tag) => {
  const tagExists = selectedTags.value.some((t) => t.tagId === tag.tagId);

  if (tagExists) {
    selectedTags.value = selectedTags.value.filter(
      (t) => t.tagId !== tag.tagId
    );
  } else {
    selectedTags.value.push(tag);
  }
};

const isTagSelected = (tag) => {
  return selectedTags.value.some((t) => t.tagId === tag.tagId);
};

const getProjectTagsList = async () => {
  try {
    const responses = await api.get("/test-project-tag");

    const tagLists = responses.data.project_tags.map((tag) => ({
      tagId: tag.tag_id,
      tagName: tag.tag_name,
      tagSlug: tag.tag_slug,
      tagColor: tag.tag_color,
    }));

    projectTagList.value = tagLists;

    console.log("tag bos ", projectTagList.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getProjectTagsList();
});

</script>

<template>
  <div>
    <!-- Modal -->
    <div
      v-if="props.isProjectModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
    >
      <div class="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-3 border-b">
          <h5 class="text-lg font-semibold text-gray-800">Edit Form</h5>
          <button
            @click="emit('close-project-modal')"
            class="text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <!-- Modal Body -->
        <div class="py-4 grid grid-cols-2 gap-6">
          <!-- Title -->
          <div>
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              v-model="props.projectModalData.projectTitle"
              :placeholder="props.projectModalData.projectTitle"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <!-- Tags -->
          <div>
            <label
              for="tags"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <div class="relative">
              <!-- Button to Open Dropdown -->
              <button
                @click="toggleTagDropdown"
                class="w-full px-3 py-2 border rounded-md text-gray-500 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Select Tags
              </button>

              <!-- Dropdown List -->
              <div
                v-if="isTagDropdownOpen"
                class="absolute z-10 w-full bg-white border rounded-md shadow-md mt-1 max-h-48 overflow-y-auto"
              >
                <div
                  v-for="tag in projectTagList"
                  :key="tag.tagId"
                  @click="toggleTagSelection(tag)"
                  class="flex items-center px-4 py-2 cursor-pointer"
                  :class="{
                    'bg-gray-200': isTagSelected(tag),
                    'hover:bg-blue-100': !isTagSelected(tag),
                  }"
                >
                  <input
                    type="checkbox"
                    class="mr-2"
                    :checked="isTagSelected(tag)"
                    @click.stop="toggleTagSelection(tag)"
                  />
                  {{ tag.tagName }}
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label
              for="description"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              v-model="props.projectModalData.projectDescription"
              :placeholder="props.projectModalData.projectDescription"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              rows="3"
            ></textarea>
          </div>

          <!-- Image -->
          <div>
            <label
              for="image"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Upload Image
            </label>
            <input
              id="image"
              type="file"
              @change="emit('handle-file-upload', $event)"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <!-- Start Date  -->
          <div>
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              id="date"
              type="date"
              v-model="props.projectModalData.projectStartDate"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <!-- End Date -->
          <div>
            <label
              for="date"
              class="block mb-2 text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              id="date"
              type="date"
              v-model="props.projectModalData.projectEndDate"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end pt-3 border-t">
          <button
            @click="updateProjectDetail"
            class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            @click="closeProjectModal"
            class="px-4 py-2 ml-3 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>