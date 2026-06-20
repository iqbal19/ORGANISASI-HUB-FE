<script setup>
import { useModalStore } from "../../stores/ModalStore";
import {
  IconCircleCheckFilled,
  IconXboxXFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-vue";

const props = defineProps({
  id: {
    type: String,
    default: "modal-info",
  },
  withTitle: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "success",
  },
});

const modalStore = useModalStore();
</script>

<template>
  <div
    v-if="modalStore?.showModalInfo"
    class="fixed z-[2000] inset-0 flex items-center justify-center bg-neutral-600 bg-opacity-50"
  >
    <div class="bg-neutral-100 rounded-[14px] px-6 py-7 max-w-xs w-full">
      <div class="flex flex-col items-center">
        <IconCircleCheckFilled
          v-if="type == 'success'"
          class="min-w-[76px] min-h-[76px] h-[76px] w-[76px] text-success mb-5"
        />
        <IconInfoCircleFilled
          v-if="type == 'info'"
          class="min-w-[76px] min-h-[76px] h-[76px] w-[76px] text-warning mb-5"
        />
        <IconXboxXFilled
          v-if="type == 'error'"
          class="min-w-[76px] min-h-[76px] h-[76px] w-[76px] text-danger mb-5"
        />

        <p class="text-neutral-600 font-medium text-l mb-5 text-center">
          {{ message }}
        </p>
        <button
          class="button-primary w-full"
          @click="modalStore?.closeModalInfo"
        >
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>
