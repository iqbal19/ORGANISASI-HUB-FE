<template>
  <span
    class="inline-flex items-center px-2.5 py-1 text-xs font-semibold select-none"
    :class="[
      pill ? 'rounded-full' : 'rounded-md',
      variantClasses[variant] || variantClasses.primary
    ]"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "success", "danger", "warning", "info"].includes(value),
  },
  pill: {
    type: Boolean,
    default: false,
  },
});

const variantClasses = {
  primary: "bg-primary-light text-primary-dark border border-[#BBD6FF]",
  secondary: "bg-secondary-light text-secondary-dark border border-secondary/20",
  success: "bg-success-light text-success-dark border border-success/20",
  danger: "bg-danger-light text-danger-dark border border-danger/20",
  warning: "bg-warning-light text-warning-dark border border-warning/20",
  info: "bg-info-light text-info-dark border border-info/20",
};
</script>
