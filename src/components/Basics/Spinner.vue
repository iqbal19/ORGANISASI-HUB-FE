<template>
  <div
    class="animate-spin m-auto rounded-full border-t-4 border-neutral-200 border-opacity-50 w-6 h-6"
  ></div>
</template>

<script setup>
const props = defineProps({
  size: { type: Number, default: 6 },
});
</script>

<style lang="scss" scoped></style>
