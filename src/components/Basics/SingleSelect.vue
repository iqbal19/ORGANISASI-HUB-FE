<template>
  <div class="relative w-full">
    <div
      class="base-input cursor-pointer"
      @click="toggleDropdown(!isDropdownOpen)"
      ref="excRef"
    >
      <div
        class="flex flex-wrap gap-2"
        v-if="selected && Object.keys(selected).length > 0"
      >
        <p class="text-sm">
          {{ selected[labelKey] }}
        </p>
      </div>
      <p v-else class="text-sm">Pilih</p>
    </div>

    <div
      v-if="isDropdownOpen"
      class="absolute z-10 mt-1 shadow w-full"
      ref="comRef"
    >
      <input
        v-model="searchQuery"
        type="text"
        class="base-input"
        placeholder="Cari..."
      />
      <ul
        class="w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-40 overflow-y-auto"
      >
        <template v-if="filteredList.length === 0">
          <li class="px-4 py-2 hover:bg-gray-100 flex items-center text-base">
            Data tidak ditemukan
          </li>
        </template>
        <template v-else>
          <li
            v-for="item in filteredList"
            :key="item.id"
            @click="toggleSelection(item)"
            class="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center text-base"
            :class="{ 'bg-primary-light': isSelected(item) }"
          >
            {{ item[labelKey] }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import useClickOutside from "@/extends/helpers/util.clickoutside";
import { ref, watch, computed } from "vue";
import { IconX } from "@tabler/icons-vue";

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  selectedItem: {
    type: Object,
    default: () => null,
    validator: (value) => value === null || typeof value === "object",
  },
  labelKey: {
    type: String,
    default: "label",
  },
});

const emit = defineEmits(["update:selected"]);

const searchQuery = ref("");
const selected = ref(null);
const isDropdownOpen = ref(false);
const comRef = ref();
const excRef = ref();

const filteredList = computed(() => {
  if (!searchQuery.value) return props.list;
  return props.list.filter((item) =>
    item[props.labelKey].toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleDropdown = (state) => {
  isDropdownOpen.value = state;
};

const isSelected = (item) => {
  return selected.value && selected.value.id === item.id;
};

const toggleSelection = (item) => {
  selected.value =
    selected.value && selected.value.id === item.id ? null : item;
  emit("update:selected", selected.value);
  isDropdownOpen.value = false;
};

watch(
  () => props.selectedItem,
  (newVal) => {
    selected.value = newVal;
  },
  { immediate: true }
);

useClickOutside(
  comRef,
  () => {
    isDropdownOpen.value = false;
  },
  excRef
);
</script>
