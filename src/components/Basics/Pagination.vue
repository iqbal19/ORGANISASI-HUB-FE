<template>
  <div class="flex flex-row items-center justify-between w-full gap-2">
    <!-- Show Limit -->
    <div v-if="showLimit" class="flex items-center gap-2">
      <span class="hidden sm:inline text-sm text-neutral-500 font-medium">Tampilkan</span>
      <select
        @change="pageTo({ page: 1, limit })"
        v-model="limit"
        class="border border-neutral-200 text-neutral-700 rounded-lg text-sm px-2.5 py-2.5 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all cursor-pointer bg-white"
      >
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="25">25</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
      <span class="hidden sm:inline text-sm text-neutral-500 font-medium">data</span>
    </div>
    <div v-else></div>

    <!-- Pager -->
    <div class="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-lg p-1 shadow-sm">
      <button
        @click="goToPrevious"
        :disabled="!pagenation?.prev_page_url"
        class="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
      >
        <IconChevronLeft class="w-4 h-4" stroke-width="2.5" />
      </button>

      <div class="flex items-center gap-2 px-2 border-x border-neutral-100">
        <span class="text-sm text-neutral-500 font-medium hidden sm:inline">Hal</span>
        <input
          v-model="page"
          @change="pageTo({ page, limit })"
          type="number"
          class="w-12 text-center border border-neutral-200 rounded text-sm px-1 py-1 text-neutral-700 font-semibold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
        />
        <span class="text-sm text-neutral-500 font-medium">
          dari {{ pageNum(pagenation?.last_page_url) || 1 }}
        </span>
      </div>

      <button
        @click="goToNext"
        :disabled="!pagenation?.next_page_url"
        class="p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
      >
        <IconChevronRight class="w-4 h-4" stroke-width="2.5" />
      </button>
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
