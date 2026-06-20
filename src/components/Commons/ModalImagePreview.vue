<template>
  <transition name="preview-wrapper" appear>
    <div
      v-if="data?.show"
      class="fixed inset-0 flex items-center justify-center z-[9999] bg-black bg-opacity-60"
    >
      <button
        @click="togglePreview"
        class="absolute top-4 right-4 bg-neutral-100 text-neutral-900 rounded-full p-2 hover:bg-neutral-300"
        aria-label="Close"
        type="button"
      >
        <IconX />
      </button>

      <div
        class="relative h-auto max-h-screen overflow-hidden min-w-md max-w-lg rounded-xl bg-white"
      >
        <img class="object-contain w-full h-full" :src="data?.url" />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useModalStore } from "@/stores/ModalStore";
import { IconX } from "@tabler/icons-vue";

const modalStore = useModalStore();

const props = defineProps({
  data: Object,
});

const togglePreview = () => {
  modalStore.setHidePreviewFoto();
};
</script>
