<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-xl"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Berita</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave" class="flex flex-col gap-4">
        <BaseInput
          label="Judul Berita"
          type="text"
          placeholder="Judul Berita"
          v-model="form.title"
          :error="errors.title"
        />

        <BaseInput
          label="Deskripsi Berita"
          textarea
          placeholder="Deskripsi Berita"
          v-model="form.description"
          :error="errors.description"
          rows="5"
        />

        <div class="flex justify-end mt-4 items-center gap-3">
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

watch(
  () => props.data,
  (value) => {
    if (value && Object.keys(value).length > 0) {
      form.value = {
        title: value.title || "",
        description: value.description || "",
      };
    } else {
      form.value = {
        title: "",
        description: "",
      };
    }
  },
  { immediate: true }
);

const loading = ref(false);
const form = ref({
  title: "",
  description: "",
});
const errors = ref({
  title: null,
  description: null,
});

const formSchema = z.object({
  title: z.string().min(1, "Judul Berita wajib diisi"),
  description: z.string().min(1, "Deskripsi Berita wajib diisi"),
});

const handleSave = async () => {
  loading.value = true;
  errors.value = {};
  try {
    formSchema.parse(form.value);
    let payload = {
      title: form.value.title,
      description: form.value.description,
    };
    let response;
    if (props.data && Object.keys(props.data).length > 0) {
      response = await axios.put(`/v1/api/news/${props.data.id}`, payload);
    } else {
      response = await axios.post(`/v1/api/news`, payload);
    }
    if (response.status === 200) {
      openModalInfo({
        message: "Berhasil disimpan",
        type: "success",
      });
      emit("refresh");
      handleCloseModal();
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message;
      });
    } else {
      openModalInfo({
        message: error?.response?.data?.meta?.message || "Terjadi kesalahan",
        type: "error",
      });
    }
  } finally {
    loading.value = false;
  }
};

const handleCloseModal = () => {
  form.value = {
    title: "",
    description: "",
  };
  errors.value = {
    title: null,
    description: null,
  };
  emit("closeModal");
};
</script>
