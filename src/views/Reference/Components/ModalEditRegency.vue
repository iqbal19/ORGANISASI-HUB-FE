<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Ubah Kabupaten/Kota</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="flex flex-col gap-4">
          <BaseInput
            label="Kode Kab/Kota"
            type="text"
            placeholder="contoh: 3171"
            v-model="form.code"
            :error="errors.code"
          />
          <BaseInput
            label="Nama Kab/Kota"
            type="text"
            placeholder="contoh: Kota Jakarta Pusat"
            v-model="form.name"
            :error="errors.name"
          />
          <div>
            <label for="type" class="text-sm font-semibold text-neutral-800 mb-1 block">Tipe</label>
            <SingleSelect
              id="type"
              placeholder="Pilih Tipe"
              :list="refType"
              :selectedItem="form.type"
              :searchable="false"
              @update:selected="(selected) => (form.type = selected)"
              labelKey="label"
            />
            <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.type">
              {{ errors.type }}
            </span>
          </div>
          <div>
            <label for="provinceId" class="text-sm font-semibold text-neutral-800 mb-1 block">Provinsi</label>
            <SingleSelect
              id="provinceId"
              placeholder="Pilih Provinsi"
              :list="refProvince"
              :selectedItem="form.province"
              :searchable="true"
              @update:selected="(selected) => (form.province = selected)"
              labelKey="name"
            />
            <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.provinceId">
              {{ errors.provinceId }}
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
import { defineProps, defineEmits, ref, watch } from "vue";
import {
  openModalInfo,
} from "@/extends/plugins/modal";
import { z } from "zod";
import axios from "axios";

import SingleSelect from "@/components/Basics/SingleSelect.vue";
import { onMounted } from "vue";

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
  name: z.string().min(3, "Nama kab/kota minimal 3 karakter"),
  type: z.any().refine((t) => t, "Tipe harus dipilih"),
  province: z.any().refine((p) => p, "Provinsi harus dipilih"),
});

const form = ref({
  code: "",
  name: "",
  type: null,
  province: null,
});

const refType = ref([
  { id: 'KABUPATEN', label: 'Kabupaten' },
  { id: 'KOTA', label: 'Kota' }
]);
const refProvince = ref([]);

const errors = ref({});
const loading = ref(false);

const getProvinces = async () => {
  try {
    let res = await axios.get('/api/regions/provinces?limit=1000');
    refProvince.value = res.data?.data?.data || res.data?.data || [];
  } catch (e) {
    console.error(e);
  }
};

onMounted(() => {
  getProvinces();
});

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    let payload = {
      code: form.value.code,
      name: form.value.name,
      type: form.value.type.id,
      provinceId: form.value.province.id,
    };
    let response = await axios.patch("/api/regions/regencies/" + props.data.id, payload);
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
    type: null,
    province: null,
  };
  errors.value = {
    code: null,
    name: null,
    type: null,
    provinceId: null,
  };
  emit("closeModal");
};

watch(
  () => props.showModal,
  (val) => {
    if (val && props.data) {
      form.value.code = props.data.code;
      form.value.name = props.data.name;
      form.value.type = refType.value.find(t => t.id === props.data.type);
      if (props.data.provinceId) {
        form.value.province = refProvince.value.find(p => p.id === props.data.provinceId);
      }
    }
  }
);
</script>
