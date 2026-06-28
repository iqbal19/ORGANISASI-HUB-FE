<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Tambah Produk</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="grid grid-cols-1 gap-4">
          <BaseInput
            label="Kode Produk"
            type="text"
            placeholder="Misal: KTA_GOLD"
            v-model="form.code"
            :error="errors.code"
          />
          <BaseInput
            label="Nama Produk"
            type="text"
            placeholder="Misal: KTA Edisi Gold"
            v-model="form.name"
            :error="errors.name"
          />
          <BaseInput
            label="Harga Default (Rp)"
            type="number"
            placeholder="15000"
            v-model="form.defaultPrice"
            :error="errors.defaultPrice"
          />
          <BaseInput
            label="Deskripsi"
            type="textarea"
            placeholder="Penjelasan produk..."
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
import { defineProps, defineEmits, ref } from "vue";
import { openModalInfo } from "@/extends/plugins/modal";
import { z } from "zod";
import axios from "axios";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closeModal", "refresh"]);

const schema = z.object({
  code: z.string().min(2, "Kode minimal 2 karakter"),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  defaultPrice: z.number().min(0, "Harga tidak boleh negatif"),
});

const form = ref({
  code: "",
  name: "",
  defaultPrice: 0,
  description: "",
});

const errors = ref({});
const loading = ref(false);

const handleSave = async () => {
  errors.value = {};
  
  // Format price
  form.value.defaultPrice = Number(form.value.defaultPrice);

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      code: form.value.code,
      name: form.value.name,
      defaultPrice: form.value.defaultPrice,
      description: form.value.description,
    };
    let response = await axios.post("/api/products", payload);
    if (response.status === 200 || response.status === 201 || response.data?.success) {
      emit("refresh");
      handleCloseModal();
      openModalInfo({
        message: "Berhasil ditambahkan",
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
      if (Array.isArray(e.response?.data?.message)) {
        errorMsg = e.response.data.message.join(", ");
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
    defaultPrice: 0,
    description: "",
  };
  errors.value = {};
  emit("closeModal");
};
</script>
