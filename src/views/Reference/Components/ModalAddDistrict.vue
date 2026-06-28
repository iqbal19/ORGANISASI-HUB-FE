<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Tambah Kecamatan</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="flex flex-col gap-4">
          <BaseInput
            label="Kode Kecamatan"
            type="text"
            placeholder="contoh: 317101"
            v-model="form.code"
            :error="errors.code"
          />
          <BaseInput
            label="Nama Kecamatan"
            type="text"
            placeholder="contoh: Menteng"
            v-model="form.name"
            :error="errors.name"
          />
          <div>
            <label for="regencyId" class="text-sm font-semibold text-neutral-800 mb-1 block">Kabupaten/Kota</label>
            <SingleSelect
              id="regencyId"
              placeholder="Pilih Kabupaten/Kota"
              :list="refRegency"
              :selectedItem="form.regency"
              :searchable="true"
              @update:selected="(selected) => (form.regency = selected)"
              labelKey="name"
            />
            <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.regencyId">
              {{ errors.regencyId }}
            </span>
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
import { defineProps, defineEmits, ref, onMounted } from "vue";
import {
  openModalInfo,
} from "@/extends/plugins/modal";
import { z } from "zod";
import axios from "axios";
import SingleSelect from "@/components/Basics/SingleSelect.vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closeModal", "refresh"]);

const schema = z.object({
  code: z.string().min(1, "Kode harus diisi"),
  name: z.string().min(3, "Nama kecamatan minimal 3 karakter"),
  regency: z.any().refine((p) => p, "Kabupaten/Kota harus dipilih"),
});

const form = ref({
  code: "",
  name: "",
  regency: null,
});

const refRegency = ref([]);

const errors = ref({});
const loading = ref(false);

const getRegencies = async () => {
  try {
    let res = await axios.get('/api/regions/regencies?limit=1000');
    refRegency.value = res.data?.data?.data || res.data?.data || [];
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  getRegencies();
});

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      code: form.value.code,
      name: form.value.name,
      regencyId: form.value.regency.id,
    };
    let response = await axios.post("/api/regions/districts", payload);
    if (response.status === 200 || response.status === 201 || response.data?.success) {
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
    regency: null,
  };
  errors.value = {
    code: null,
    name: null,
    regencyId: null,
  };
  emit("closeModal");
};
</script>
