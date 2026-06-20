<template>
  <div
    class="bg-white border border-[#BBD6FF] rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
  >
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-semibold text-neutral-600 uppercase tracking-wider">
        {{ title }}
      </span>
      <div
        v-if="$slots.icon || icon"
        class="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-light text-primary"
      >
        <slot name="icon">
          <component :is="icon" class="w-5 h-5" />
        </slot>
      </div>
    </div>
    <div class="flex items-end justify-between">
      <div>
        <h3 class="text-2xl font-bold text-neutral-900 leading-none">
          {{ value }}
        </h3>
      </div>
      <div v-if="trend" class="flex items-center gap-1">
        <span
          class="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-xs font-semibold"
          :class="trendClasses"
        >
          <component :is="trendIcon" class="w-3.5 h-3.5" />
          {{ trend }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { IconArrowUpRight, IconArrowDownRight, IconMinus } from "@tabler/icons-vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: Object,
    default: null,
  },
  trend: {
    type: String,
    default: "",
  },
  trendDirection: {
    type: String,
    default: "up",
    validator: (value) => ["up", "down", "flat"].includes(value),
  },
});

const trendClasses = computed(() => {
  if (props.trendDirection === "up") {
    return "bg-success-light text-success-dark";
  } else if (props.trendDirection === "down") {
    return "bg-danger-light text-danger-dark";
  } else {
    return "bg-secondary-light text-secondary-dark";
  }
});

const trendIcon = computed(() => {
  if (props.trendDirection === "up") {
    return IconArrowUpRight;
  } else if (props.trendDirection === "down") {
    return IconArrowDownRight;
  } else {
    return IconMinus;
  }
});
</script>
