<template>
  <div
    class="fixed top-4 right-4 left-4 md:left-auto md:w-full md:max-w-sm z-[3000] flex flex-col gap-3 pointer-events-none"
  >
    <transition-group name="toast-list" tag="div" class="flex flex-col gap-3">
      <Toast
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :message="toast.message"
        :type="toast.type"
        :duration="toast.duration"
        class="pointer-events-auto"
        @close="toastStore.removeToast(toast.id)"
      />
    </transition-group>
  </div>
</template>

<script setup>
import { useToastStore } from "@/stores/ToastStore";
import Toast from "@/components/Basics/Toast.vue";

const toastStore = useToastStore();
</script>

<style scoped>
.toast-list-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-list-enter-to {
  opacity: 1;
  transform: translateX(0) scale(1);
}
.toast-list-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-list-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}
.toast-list-leave-active {
  transition: all 0.2s cubic-bezier(0.7, 0, 0.84, 0);
  position: absolute;
  width: 100%;
}

.toast-list-move {
  transition: transform 0.3s ease;
}
</style>
