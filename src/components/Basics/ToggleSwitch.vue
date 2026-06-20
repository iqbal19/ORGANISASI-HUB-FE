<template>
  <label
    class="inline-flex items-center cursor-pointer select-none"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
  >
    <div class="relative">
      <input
        type="checkbox"
        class="sr-only"
        :checked="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', $event.target.checked)"
      />
      <div
        class="block w-11 h-6 rounded-full transition-colors duration-300"
        :class="modelValue ? 'bg-primary' : 'bg-neutral-300'"
      ></div>
      <div
        class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform"
        :class="modelValue ? 'translate-x-5' : 'translate-x-0'"
      ></div>
    </div>
    <span v-if="label || $slots.default" class="ml-3 text-sm font-medium text-neutral-800">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>
