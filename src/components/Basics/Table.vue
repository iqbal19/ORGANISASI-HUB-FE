<script setup>
import { IconChevronUp, IconChevronDown } from "@tabler/icons-vue";
import Loading from "@/components/Basics/Loading.vue";
import NoData from "@/components/Basics/NoData.vue";

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showCheck: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["handleSort", "handleCheck", "handleCheckAll"]);

const handleSort = (row) => {
  if (row.isSort.activeSort === "ASC") {
    row.isSort.activeSort = "DESC";
  } else if (row.isSort.activeSort === "DESC") {
    row.isSort.activeSort = "ASC";
  } else if (row.isSort.activeSort === "asc") {
    row.isSort.activeSort = "desc";
  } else {
    row.isSort.activeSort = "asc";
  }
  emit("handleSort", row);
};

const handleCheck = ($event) => {
  emit("handleCheck", $event);
};

const handleCheckAll = (data) => {
  emit("handleCheckAll", data);
};
</script>

<template>
  <div class="w-full bg-white border border-[#DFEEFF] rounded-xl overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="bg-neutral-50/50 border-b border-[#DFEEFF]">
            <template v-for="(row, index) in rows" :key="index">
              <!-- Header dengan fitur Sorting -->
              <th
                v-if="row.isSort"
                class="cursor-pointer text-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 select-none hover:bg-neutral-100/50 transition-colors"
                @click="handleSort(row)"
                :style="`width: ${row.width ? row.width : ''}; text-align: ${
                  row.align ? row.align : 'left'
                }`"
              >
                <div
                  class="flex items-center gap-1.5"
                  :class="{
                    'justify-end': row.align === 'right',
                    'justify-center': row.align === 'center',
                    'justify-start': row.align !== 'right' && row.align !== 'center',
                  }"
                >
                  <span>{{ row?.label }}</span>
                  <span class="flex flex-col items-center justify-center text-neutral-300">
                    <IconChevronUp
                      class="w-3.5 h-3.5 transition-colors"
                      :class="{
                        'text-primary font-bold':
                          row.isSort.activeSort === 'ASC' ||
                          row.isSort.activeSort === 'asc',
                      }"
                    />
                    <IconChevronDown
                      class="w-3.5 h-3.5 -mt-1.5 transition-colors"
                      :class="{
                        'text-primary font-bold':
                          row.isSort.activeSort === 'DESC' ||
                          row.isSort.activeSort === 'desc',
                      }"
                    />
                  </span>
                </div>
              </th>

              <!-- Header dengan Checklist All -->
              <th
                v-else-if="row.type == 'checklist'"
                class="text-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500"
                :style="`width: ${row.width ? row.width : ''}; text-align: ${
                  row.align ? row.align : 'center'
                }`"
              >
                <div class="flex items-center justify-center">
                  <div
                    @click="handleCheckAll(row?.onCheck)"
                    class="w-5 h-5 rounded-md border border-[#BBD6FF] cursor-pointer flex items-center justify-center transition-all"
                    :class="row?.onCheck ? 'bg-primary border-primary' : 'bg-gray-100 hover:bg-gray-200'"
                  >
                    <span v-if="row?.onCheck" class="text-white text-xs font-bold">✓</span>
                  </div>
                </div>
              </th>

              <!-- Header dengan Checkbox Standard -->
              <th
                v-else-if="row.isChecked"
                class="text-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500"
                :style="`width: ${row.width ? row.width : ''}; text-align: ${
                  row.align ? row.align : 'left'
                }`"
              >
                <div
                  class="flex items-center gap-2"
                  :class="{
                    'justify-end': row.align === 'right',
                    'justify-center': row.align === 'center',
                    'justify-start': row.align !== 'right' && row.align !== 'center',
                  }"
                >
                  <span>{{ row?.label }}</span>
                  <input
                    v-if="showCheck"
                    @change="handleCheck($event)"
                    class="w-4 h-4 rounded text-primary focus:ring-primary border-[#BBD6FF] accent-primary"
                    type="checkbox"
                    :value="row.isChecked.checked"
                    v-model="row.isChecked.checked"
                  />
                </div>
              </th>

              <!-- Header Biasa -->
              <th
                v-else
                class="text-nowrap px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500"
                :style="`width: ${row.width ? row.width : ''}; text-align: ${
                  row.align ? row.align : 'left'
                }`"
              >
                <div
                  :class="{
                    'text-right': row.align === 'right',
                    'text-center': row.align === 'center',
                    'text-left': row.align !== 'right' && row.align !== 'center',
                  }"
                >
                  {{ row?.label }}
                </div>
              </th>
            </template>
          </tr>
        </thead>

        <!-- Tampilan Loading Table -->
        <Loading v-if="loading" :type="'table'" :colCount="rows.length" />

        <!-- Tampilan Data Kosong -->
        <tbody v-if="columns.length === 0 && !loading">
          <tr>
            <td class="px-6 py-12 text-center" :colspan="rows.length">
              <NoData />
            </td>
          </tr>
        </tbody>

        <!-- Tampilan Kolom Data -->
        <tbody v-if="columns.length > 0 && !loading" class="divide-y divide-neutral-100">
          <tr
            v-for="(column, index) in columns"
            :key="index"
            class="hover:bg-neutral-50/40 transition-colors duration-150"
          >
            <td
              v-for="row in rows"
              :key="row.field"
              class="px-6 py-4 text-sm font-medium text-neutral-700 align-middle"
              :style="`width: ${row.width ? row.width : ''}; text-align: ${
                row.align ? row.align : 'left'
              }`"
            >
              <slot
                name="table-content"
                :row="row"
                :column="column"
                :index="index"
              >
                {{ column[row.field] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
/* Menyamakan tinggi baris loading skeleton */
:deep(tr) {
  border-bottom: 1px solid #f1f5f9;
}
</style>
