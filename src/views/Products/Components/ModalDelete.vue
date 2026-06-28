<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-red-600">Hapus Produk</p>
    </template>
    <template #body>
      <div class="mb-6">
        <p class="text-neutral-600">
          Apakah Anda yakin ingin menghapus produk <strong>{{ props.data?.name }}</strong>? 
          Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi organisasi yang telah mengatur harga khusus untuk produk ini.
        </p>
      </div>

      <div class="flex justify-end mt-7 items-center gap-3">
        <BaseButton
          variant="primary"
          outline
          :disabled="loading"
          @click="handleCloseModal"
        >
          Batal
        </BaseButton>
        <BaseButton 
          class="!bg-red-600 hover:!bg-red-700 !text-white"
          :loading="loading"
          @click="handleDelete"
        >
          Hapus Produk
        </BaseButton>
      </div>
    </template>
  </Modal>
</template>

<script setup>
import BaseButton from "@/components/Basics/BaseButton.vue";
import Modal from "@/components/Basics/Modal.vue";
import { defineProps, defineEmits, ref } from "vue";
import { openModalInfo } from "@/extends/plugins/modal";
import axios from "axios";

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

const emit = defineEmits(["closeModal", "refresh"]);
const loading = ref(false);

const handleDelete = async () => {
  loading.value = true;
  try {
    const response = await axios.delete(`/api/products/${props.data.id}`);
    if (response.status === 200 || response.data?.success) {
      emit("refresh");
      handleCloseModal();
      openModalInfo({
        message: "Produk berhasil dihapus",
        type: "success",
      });
    }
  } catch (e) {
    console.error(e);
    let errorMsg = e.response?.data?.message || "Terjadi kesalahan pada server";
    openModalInfo({
      message: errorMsg,
      type: "error",
    });
  } finally {
    loading.value = false;
  }
};

const handleCloseModal = () => {
  emit("closeModal");
};
</script>
