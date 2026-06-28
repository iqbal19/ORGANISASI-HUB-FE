<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Ubah Jabatan</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="flex flex-col gap-4">
          <BaseInput
            label="Nama Jabatan *"
            type="text"
            placeholder="contoh: Ketua Umum"
            v-model="form.name"
            :error="errors.name"
          />
          <BaseInput
            label="Deskripsi"
            type="text"
            textarea
            :rows="3"
            placeholder="Keterangan opsional..."
            v-model="form.description"
            :error="errors.description"
          />
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
          <BaseButton type="submit" :loading="loading">
            Simpan
          </BaseButton>
        </div>
      </form>
    </template>
  </Modal>
</template>

<script setup>
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import Modal from "@/components/Basics/Modal.vue";
import { defineProps, defineEmits, ref, watch } from "vue";
import {
  openModalInfo,
} from "@/extends/plugins/modal";
import { z } from "zod";
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

const schema = z.object({
  name: z.string().min(3, "Nama jabatan minimal 3 karakter"),
  description: z.string().optional().nullable(),
});

const form = ref({
  name: "",
  description: "",
});

const errors = ref({});
const loading = ref(false);

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      name: form.value.name,
      description: form.value.description,
    };
    let response = await axios.patch("/api/positions/" + props.data.id, payload);
    if (response.status === 200 || response.data?.success) {
      emit("refresh");
      handleCloseModal();
      openModalInfo({
        message: "Berhasil disimpan",
        type: "success",
      });
    }
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message;
      });
    } else {
      console.error(e);
      let errorMsg = e.response?.data?.message || "Terjadi kesalahan pada server";
      if (e.response?.data?.errors && Array.isArray(e.response.data.errors) && e.response.data.errors.length > 0) {
        errorMsg = e.response.data.errors.join(", ");
      }
      openModalInfo({
        message: errorMsg,
        type: "error",
      });
    }
  } finally {
    loading.value = false;
  }
};

const handleCloseModal = () => {
  form.value = {
    name: "",
    description: "",
  };
  errors.value = {
    name: null,
    description: null,
  };
  emit("closeModal");
};

watch(
  () => props.showModal,
  (val) => {
    if (val && props.data) {
      form.value.name = props.data.name;
      form.value.description = props.data.description || "";
    }
  }
);
</script>
