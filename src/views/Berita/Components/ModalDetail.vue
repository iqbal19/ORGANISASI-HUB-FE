<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-xl"
    ><template #header>
      <p class="text-xl font-bold text-neutral-900">Detail Berita</p>
    </template>
    <template #body>
      <div class="mb-3">
        <p for="nama" class="text-sm font-bold mb-1 text-neutral-800">
          Judul Berita
        </p>
        <p class="text-sm text-neutral-900">{{ data?.title }}</p>
      </div>
      <div class="">
        <p for="nama" class="text-sm font-bold mb-1 text-neutral-800">
          Deskripsi Berita
        </p>
        <p class="text-sm text-neutral-900">{{ data?.description }}</p>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import Modal from "@/components/Basics/Modal.vue";
import { defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["closeModal"]);

const handleCloseModal = () => {
  emit("closeModal");
};
</script>
