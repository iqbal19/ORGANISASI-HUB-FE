<template>
  <div class="flex">
    <div v-if="showLimit" class="w-1/2">
      <p class="text-neutral-500 text-s font-medium">
        Tampilkan &nbsp;
        <select
          @change="pageTo({ page: 1, limit })"
          v-model="limit"
          class="px-3 py-[10px] base-input min-w-16 w-16 max-w-16"
        >
          <option>5</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option value="1000000">All</option>
        </select>
      </p>
    </div>
    <div v-if="!showLimit && !isLeft" class="w-1/2"></div>
    <div
      :class="{ 'w-full': isLeft, 'w-1/2': !isLeft }"
      class="flex justify-end"
    >
      <p class="flex items-center" v-if="pagenation">
        <button
          @click="goToPrevious"
          :disabled="!pagenation?.prev_page_url"
          class="p-0 font-bold text-neutral-600 disabled:opacity-50"
        >
          <IconChevronLeft class="min-w-6 min-h-6 w-6 h-6 text-neutral-600" />
        </button>
        <input
          v-model="page"
          @change="pageTo({ page, limit })"
          type="number"
          class="mx-1 text-center text-s base-input px-3 py-[10px] min-w-16 w-16 max-w-20"
        />
        <span class="text-neutral-500 text-s font-medium">
          Dari {{ pageNum(pagenation?.last_page_url) }}
        </span>
        <button
          @click="goToNext"
          :disabled="!pagenation?.next_page_url"
          class="p-0 font-bold text-neutral-600 disabled:opacity-50"
        >
          <IconChevronRight class="min-w-6 min-h-6 w-6 h-6 text-neutral-600" />
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

const props = defineProps({
  pagenation: Object,
  defaultLimit: {
    type: Number,
    default: 10,
  },
  showLimit: {
    type: Boolean,
    default: true,
  },
  isLeft: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["pageTo"]);

const page = ref(1);
const limit = ref(props.defaultLimit);

const pageNum = (data) => {
  if (!data) return null;
  return parseInt(data.split("page=")[1]);
};

const pageTo = (data) => {
  if (pageNum(props.pagenation?.last_page_url) < data.page) {
    page.value = 1;
  } else {
    page.value = data.page;
  }
  limit.value = data.limit;
  emit("pageTo", {
    page: page.value || 1,
    limit: limit.value || 5,
  });
};

const goToFirst = () => pageTo({ page: 1, limit: limit.value });

const goToLast = () =>
  pageTo({
    page: pageNum(props.pagenation?.last_page_url),
    limit: limit.value,
  });

const goToPrevious = () =>
  pageTo({
    page: pageNum(props.pagenation?.prev_page_url),
    limit: limit.value,
  });

const goToNext = () =>
  pageTo({
    page: pageNum(props.pagenation?.next_page_url),
    limit: limit.value,
  });

watch(
  () => props.pagenation,
  (val) => {
    page.value = pageNum(val?.prev_page_url) + 1;
  },
  { immediate: true }
);
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
