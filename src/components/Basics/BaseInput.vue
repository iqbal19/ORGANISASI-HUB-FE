<template>
  <div class="w-full flex flex-col gap-1">
    <!-- Label Input -->
    <label
      v-if="label"
      :for="inputId"
      class="text-sm font-semibold text-neutral-800"
    >
      {{ label }}
    </label>

    <!-- Input Body Container -->
    <div class="relative w-full">
      <!-- Textarea Mode -->
      <textarea
        v-if="textarea"
        :id="inputId"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        class="base-input transition-all duration-200"
        :class="{ 'border-danger focus:border-danger focus:ring-danger': error }"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>

      <!-- Input Standard/Password Mode -->
      <div v-else class="relative">
        <input
          :id="inputId"
          :type="inputType"
          :placeholder="placeholder"
          :disabled="disabled"
          class="base-input transition-all duration-200"
          :class="[
            { 'border-danger focus:border-danger focus:ring-danger': error },
            type === 'password' ? 'pr-10' : ''
          ]"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />

        <!-- Password Visibility Toggle Button -->
        <span
          v-if="type === 'password'"
          class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer select-none text-neutral-500 hover:text-neutral-700"
          @click="togglePasswordVisibility"
        >
          <IconEye class="w-5 h-5" v-if="!isPasswordVisible" />
          <IconEyeOff class="w-5 h-5" v-else />
        </span>
      </div>
    </div>

    <!-- Error Validation Message -->
    <transition name="slide-error">
      <small v-if="error" class="text-xs text-danger font-medium mt-0.5">
        {{ error }}
      </small>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { IconEye, IconEyeOff } from "@tabler/icons-vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  textarea: {
    type: Boolean,
    default: false,
  },
  rows: {
    type: [Number, String],
    default: 4,
  },
});

defineEmits(["update:modelValue"]);

// Generate unique ID if none is supplied
const inputId = computed(() => {
  return props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
});

const isPasswordVisible = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return isPasswordVisible.value ? "text" : "password";
  }
  return props.type;
});

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value;
};
</script>

<style scoped>
/* Transition for error message rendering */
.slide-error-enter-active,
.slide-error-leave-active {
  transition: all 0.2s ease-out;
}
.slide-error-enter-from,
.slide-error-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
