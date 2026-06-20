<template>
  <div class="w-full" v-if="type === 'default'">
    <div class="flex items-start gap-4 animate-pulse">
      <div class="h-4 bg-neutral-400 rounded w-full"></div>
    </div>
    <span class="sr-only">Loading...</span>
  </div>

  <tbody v-else-if="type === 'table'">
    <tr v-for="(_, idx) in 10" :key="idx">
      <td
        v-for="(_, index) in colCount"
        :key="index"
        class="align-middle text-center border border-neutral-300"
      >
        <div class="flex items-start gap-4 animate-pulse p-1">
          <div class="h-4 bg-neutral-400 rounded w-full"></div>
        </div>
        <span class="sr-only">Loading...</span>
      </td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "default",
  },
  colCount: {
    type: Number,
    default: 2,
  },
});
</script>
