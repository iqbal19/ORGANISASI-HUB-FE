<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <IconBuilding class="w-6 h-6" />
        </div>
        <div>
          <p class="text-xl font-bold text-neutral-900 tracking-tight">Ubah Organisasi</p>
          <p class="text-sm text-neutral-500 font-medium">Perbarui identitas dan lokasi markas organisasi</p>
        </div>
      </div>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="space-y-6">
          
          <!-- Section 1: Identitas -->
          <div class="space-y-5">
            <div class="bg-primary/5 border border-primary/10 rounded-xl p-4">
              <h4 class="font-bold text-primary mb-1">Identitas Dasar Organisasi</h4>
              <p class="text-xs text-neutral-600">Nama resmi dan kode organisasi untuk pengenal utama sistem.</p>
            </div>
            
            <BaseInput
              label="Nama Organisasi"
              type="text"
              placeholder="Masukkan nama organisasi"
              v-model="form.name"
              :error="errors.name"
            />
            <div class="mb-4">
              <label class="text-sm font-semibold text-neutral-800 mb-1 block">Logo Organisasi</label>
              <UploadFile
                v-model="form.logo"
                id="organization_logo"
                maxFiles="1"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <BaseInput
                label="Kode Organisasi"
                type="text"
                placeholder="contoh: MSTR"
                v-model="form.code"
                :error="errors.code"
                @input="form.code = form.code.toUpperCase().replace(/\s+/g, '')"
              />
              <BaseInput
                label="Slug Website"
                type="text"
                placeholder="contoh: mastrip"
                v-model="form.slug"
                :error="errors.slug"
                @input="form.slug = form.slug.toLowerCase().replace(/[^a-z0-9-]/g, '')"
              />
            </div>
          </div>

          <!-- Section 2: Lokasi -->
          <div class="space-y-5 pt-4 border-t border-neutral-100">
            <div class="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <h4 class="font-bold text-blue-700 mb-1">Lokasi Markas Pusat (Opsional)</h4>
              <p class="text-xs text-blue-600">Pembaruan letak geografis organisasi. Kosongkan jika berskala nasional.</p>
            </div>

            <div>
            <label for="provinceId" class="text-sm font-semibold text-neutral-800 mb-1 block">Provinsi (Opsional)</label>
            <SingleSelect
              id="provinceId"
              placeholder="Pilih Provinsi"
              :list="refProvince"
              :selectedItem="form.province"
              :searchable="true"
              @update:selected="handleProvinceChange"
              labelKey="name"
            />
          </div>

          <div v-if="form.province">
            <label for="regencyId" class="text-sm font-semibold text-neutral-800 mb-1 block">Kabupaten/Kota (Opsional)</label>
            <SingleSelect
              id="regencyId"
              placeholder="Pilih Kabupaten/Kota"
              :list="filteredRegencies"
              :selectedItem="form.regency"
              :searchable="true"
              @update:selected="handleRegencyChange"
              labelKey="name"
            />
          </div>

          <div v-if="form.regency">
            <label for="districtId" class="text-sm font-semibold text-neutral-800 mb-1 block">Kecamatan (Opsional)</label>
            <SingleSelect
              id="districtId"
              placeholder="Pilih Kecamatan"
              :list="filteredDistricts"
              :selectedItem="form.district"
              :searchable="true"
              @update:selected="(selected) => (form.district = selected)"
              labelKey="name"
            />
          </div>
          </div>
        </div>

        <div class="flex justify-between mt-8 pt-5 border-t border-neutral-100">
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
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import UploadFile from "@/components/Basics/UploadFile.vue";
import { defineProps, defineEmits, ref, watch, onMounted, computed } from "vue";
import {
  openModalInfo,
} from "@/extends/plugins/modal";
import { z } from "zod";
import axios from "axios";
import { IconBuilding } from "@tabler/icons-vue";

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
  name: z.string().min(3, "Nama harus memiliki setidaknya 3 karakter").max(100, "Nama maksimal 100 karakter"),
  code: z.string().min(2, "Kode harus memiliki setidaknya 2 karakter"),
  slug: z.string().min(2, "Slug harus memiliki setidaknya 2 karakter"),
});

const form = ref({
  id: null,
  name: "",
  code: "",
  slug: "",
  province: null,
  regency: null,
  district: null,
  logo: [],
});

const refProvince = ref([]);
const allRegencies = ref([]);
const allDistricts = ref([]);

const filteredRegencies = computed(() => {
  if (!form.value.province) return [];
  return allRegencies.value.filter(r => r.provinceId === form.value.province.id);
});

const filteredDistricts = computed(() => {
  if (!form.value.regency) return [];
  return allDistricts.value.filter(d => d.regencyId === form.value.regency.id);
});

const errors = ref({});
const loading = ref(false);
const loadingFetch = ref(false);

let regionsLoaded = false;
const getAllRegions = async () => {
  if (regionsLoaded) return;
  try {
    const [pRes, rRes, dRes] = await Promise.all([
      axios.get('/api/regions/provinces?limit=1000'),
      axios.get('/api/regions/regencies?limit=1000'),
      axios.get('/api/regions/districts?limit=10000')
    ]);
    refProvince.value = pRes.data?.data?.data || pRes.data?.data || [];
    allRegencies.value = rRes.data?.data?.data || rRes.data?.data || [];
    allDistricts.value = dRes.data?.data?.data || dRes.data?.data || [];
    regionsLoaded = true;
  } catch (e) {
    console.error(e);
  }
};

const handleProvinceChange = (selected) => {
  form.value.province = selected;
  form.value.regency = null;
  form.value.district = null;
};

const handleRegencyChange = (selected) => {
  form.value.regency = selected;
  form.value.district = null;
};

const getDetail = async () => {
  try {
    loadingFetch.value = true;
    await getAllRegions();
    let response = await axios.get(`/api/organizations/${props.data.id}`);
    if (response.status === 200 || response.data?.success) {
      const org = response.data.data || response.data;
      form.value.id = org.id;
      form.value.name = org.name || "";
      form.value.code = org.code || "";
      form.value.slug = org.slug || "";
      form.value.province = refProvince.value.find(p => p.id === org.provinceId) || null;
      form.value.regency = allRegencies.value.find(r => r.id === org.regencyId) || null;
      form.value.district = allDistricts.value.find(d => d.id === org.districtId) || null;
      form.value.logo = org.logo ? [org.logo] : [];
    }
  } catch (e) {
    console.error(e);
  } finally {
    loadingFetch.value = false;
  }
};

const handleSave = async () => {
  errors.value = {};

  try {
    schema.parse(form.value);
    loading.value = true;
    const payload = {
        name: form.value.name,
        code: form.value.code,
        slug: form.value.slug,
        provinceId: form.value.province?.id || null,
        regencyId: form.value.regency?.id || null,
        districtId: form.value.district?.id || null,
    };

    // Handle logo upload
    if (form.value.logo && form.value.logo.length > 0) {
        const p = form.value.logo[0];
        if (p instanceof File || (p && p.name && p.size)) {
            const formData = new FormData();
            formData.append('file', p);
            
            try {
                const uploadRes = await axios.post('/api/uploads', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const responseData = uploadRes.data.data || uploadRes.data;
                payload.logo = responseData.url;
            } catch (uploadError) {
                loading.value = false;
                return openModalInfo({ message: "Gagal mengunggah logo ke server", type: "error" });
            }
        } else {
            payload.logo = p.base64 || p;
        }
    } else {
        payload.logo = null;
    }

    const response = await axios.patch(`/api/organizations/${form.value.id}`, payload);
    
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
    code: "",
    slug: "",
    province: null,
    regency: null,
    district: null,
    logo: [],
  };
  errors.value = {
    name: null,
    code: null,
    slug: null,
  };
  emit("closeModal");
};

watch(
  () => props.data,
  (newData, oldData) => {
    if (newData && newData.id) {
      getDetail();
    }
  },
  { immediate: true }
);
</script>
