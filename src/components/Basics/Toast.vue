<template>
  <div
    class="relative flex items-center w-full max-w-sm p-4 bg-white border border-[#BBD6FF] rounded-xl shadow-lg transition-all duration-300 transform translate-y-0"
    role="alert"
  >
    <div
      class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"
      :class="variantStyles[type].bg"
    >
      <component :is="variantStyles[type].icon" class="w-5 h-5" :class="variantStyles[type].text" />
    </div>
    <div class="ms-3 text-sm font-medium text-neutral-800 flex-1 pr-4">
      {{ message }}
    </div>
    <button
      type="button"
      class="ms-auto -mx-1.5 -my-1.5 bg-white text-neutral-400 hover:text-neutral-900 rounded-lg p-1.5 hover:bg-neutral-100 inline-flex items-center justify-center h-8 w-8"
      aria-label="Close"
      @click="$emit('close')"
    >
      <IconX class="w-4 h-4" />
    </button>
    <!-- Progress timer bar -->
    <div
      v-if="duration > 0"
      class="absolute bottom-0 left-0 h-1 rounded-b-xl transition-all linear"
      :class="variantStyles[type].barBg"
      :style="{ width: progressWidth, transitionDuration: `${duration}ms` }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  IconCircleCheckFilled,
  IconXboxXFilled,
  IconInfoCircleFilled,
  IconAlertCircleFilled,
  IconX,
} from "@tabler/icons-vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "success",
    validator: (value) => ["success", "danger", "warning", "info"].includes(value),
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

defineEmits(["close"]);

const progressWidth = ref("100%");

onMounted(() => {
  if (props.duration > 0) {
    // Force a minor delay to trigger transition
    setTimeout(() => {
      progressWidth.value = "0%";
    }, 50);
  }
});

const variantStyles = {
  success: {
    bg: "bg-success-light",
    text: "text-success",
    barBg: "bg-success",
    icon: IconCircleCheckFilled,
  },
  danger: {
    bg: "bg-danger-light",
    text: "text-danger",
    barBg: "bg-danger",
    icon: IconXboxXFilled,
  },
  warning: {
    bg: "bg-warning-light",
    text: "text-warning-dark",
    barBg: "bg-warning",
    icon: IconAlertCircleFilled,
  },
  info: {
    bg: "bg-info-light",
    text: "text-info",
    barBg: "bg-info",
    icon: IconInfoCircleFilled,
  },
};
</script>

<style scoped>
.linear {
  transition-property: width;
  transition-timing-function: linear;
}
</style>
