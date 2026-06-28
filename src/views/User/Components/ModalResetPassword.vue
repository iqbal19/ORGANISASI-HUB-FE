<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Reset Password</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="mb-4">
          <p class="text-sm text-neutral-600 mb-2">Masukkan email pengguna beserta password baru yang akan diberikan.</p>
        </div>

        <div class="grid grid-cols-1 gap-4">
          <BaseInput
            label="Email Pengguna"
            type="email"
            placeholder="contoh@email.com"
            v-model="form.email"
            :error="errors.email"
          />
          <BaseInput
            label="Password Baru"
            type="password"
            placeholder="Password baru"
            v-model="form.password"
            :error="errors.password"
          />
          <BaseInput
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="Konfirmasi password baru"
            v-model="form.confirm_password"
            :error="errors.confirm_password"
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
import { defineProps, defineEmits, ref } from "vue";
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
});

const emit = defineEmits(["closeModal", "refresh"]);

const schema = z
  .object({
    email: z.string().email("Format email tidak valid").min(1, "Email tidak boleh kosong"),
    password: z
      .string()
      .min(8, "Password harus memiliki setidaknya 8 karakter"),
    confirm_password: z
      .string()
      .min(8, "Konfirmasi password harus memiliki setidaknya 8 karakter"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirm_password"],
  });

const form = ref({
  email: "",
  password: "",
  confirm_password: "",
});

const errors = ref({});
const loading = ref(false);

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      email: form.value.email,
      password: form.value.password,
    };
    let response = await axios.patch(`/api/users/reset-password`, payload);
    if (response.status === 200 || response.data?.success) {
      emit("refresh");
      handleCloseModal();
      openModalInfo({
        message: "Password berhasil direset",
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
    email: "",
    password: "",
    confirm_password: "",
  };
  errors.value = {
    email: null,
    password: null,
    confirm_password: null,
  };
  emit("closeModal");
};
</script>
