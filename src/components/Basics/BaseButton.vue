<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="flex items-center justify-center select-none transition-all duration-200"
    :class="[
      outline ? variantOutlineClasses[variant] : variantClasses[variant],
      customSizeClass
    ]"
    @click="$emit('click', $event)"
  >
    <div role="status" v-if="loading" class="mr-2">
      <Spinner />
    </div>
    <slot v-else></slot>
    <span v-if="loading">Memproses...</span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import Spinner from "@/components/Basics/Spinner.vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "success", "danger", "warning", "info"].includes(value),
  },
  outline: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});

defineEmits(["click"]);

const customSizeClass = computed(() => {
  if (props.size === "sm") return "h-8 py-1.5 px-3 text-xs rounded-md";
  if (props.size === "lg") return "h-12 py-3.5 px-6 text-sm rounded-xl";
  return "base-button"; // md size, default dari main.css (.base-button)
});

const variantClasses = {
  primary: "button-primary",
  secondary: "button-secondary",
  success: "button-success",
  danger: "button-danger",
  warning: "button-warning",
  info: "button-info",
};

const variantOutlineClasses = {
  primary: "button-primary-outline",
  secondary: "button-secondary-outline",
  success: "button-success-outline",
  danger: "button-danger-outline",
  warning: "button-warning-outline",
  info: "button-info-outline",
};
</script>
