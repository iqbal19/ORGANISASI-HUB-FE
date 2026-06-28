<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Ubah Produk</p>
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
          <div class="flex items-center gap-2 mt-2">
            <input type="checkbox" id="isActive" v-model="form.isActive" class="w-4 h-4 text-primary bg-neutral-100 border-neutral-300 rounded focus:ring-primary focus:ring-2">
            <label for="isActive" class="text-sm font-medium text-neutral-900">Aktif (Tersedia Global)</label>
          </div>
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
import { openModalInfo } from "@/extends/plugins/modal";
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
  code: z.string().min(2, "Kode minimal 2 karakter"),
  name: z.string().min(3, "Nama minimal 3 karakter"),
  defaultPrice: z.number().min(0, "Harga tidak boleh negatif"),
});

const form = ref({
  id: null,
  code: "",
  name: "",
  defaultPrice: 0,
  description: "",
  isActive: true,
});

watch(() => props.showModal, (newVal) => {
  if (newVal && props.data) {
    form.value = {
      id: props.data.id,
      code: props.data.code,
      name: props.data.name,
      defaultPrice: Number(props.data.defaultPrice),
      description: props.data.description || "",
      isActive: props.data.isActive,
    };
  }
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
      isActive: form.value.isActive,
    };
    let response = await axios.patch(`/api/products/${form.value.id}`, payload);
    if (response.status === 200 || response.status === 201 || response.data?.success) {
      emit("refresh");
      handleCloseModal();
      openModalInfo({
        message: "Berhasil diubah",
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
  errors.value = {};
  emit("closeModal");
};
</script>
