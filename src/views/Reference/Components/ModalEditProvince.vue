<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Ubah Provinsi</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="flex flex-col gap-4">
          <BaseInput
            label="Kode Provinsi"
            type="text"
            placeholder="contoh: 31"
            v-model="form.code"
            :error="errors.code"
          />
          <BaseInput
            label="Nama Provinsi"
            type="text"
            placeholder="contoh: DKI Jakarta"
            v-model="form.name"
            :error="errors.name"
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
  code: z.string().min(1, "Kode harus diisi"),
  name: z.string().min(3, "Nama provinsi minimal 3 karakter"),
});

const form = ref({
  code: "",
  name: "",
});

const errors = ref({});
const loading = ref(false);

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      code: form.value.code,
      name: form.value.name,
    };
    let response = await axios.patch("/api/regions/provinces/" + props.data.id, payload);
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
    code: "",
    name: "",
  };
  errors.value = {
    code: null,
    name: null,
  };
  emit("closeModal");
};

watch(
  () => props.showModal,
  (val) => {
    if (val && props.data) {
      form.value.code = props.data.code;
      form.value.name = props.data.name;
    }
  }
);
</script>
