<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-2xl"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          <IconBuilding class="w-6 h-6" />
        </div>
        <div>
          <p class="text-xl font-bold text-neutral-900 tracking-tight">Onboarding Organisasi Baru</p>
          <p class="text-sm text-neutral-500 font-medium">Langkah {{ currentStep }} dari 3: {{ stepTitles[currentStep - 1] }}</p>
        </div>
      </div>
    </template>
    
    <template #body>
      <!-- Stepper Indicator -->
      <div class="mb-8">
        <div class="flex items-center justify-between relative">
          <div class="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-100 rounded-full z-0"></div>
          <div 
            class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-300"
            :style="{ width: ((currentStep - 1) / 2) * 100 + '%' }"
          ></div>
          
          <div v-for="step in 3" :key="step" class="relative z-10 flex flex-col items-center gap-2">
            <div 
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2"
              :class="[
                currentStep >= step 
                  ? 'bg-primary border-primary text-white shadow-md shadow-primary/20' 
                  : 'bg-white border-neutral-200 text-neutral-400'
              ]"
            >
              <IconCheck v-if="currentStep > step" class="w-5 h-5" />
              <span v-else>{{ step }}</span>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleNextOrSave">
        <!-- STEP 1: Identitas Organisasi -->
        <div v-show="currentStep === 1" class="space-y-5 animate-fadeIn">
          <div class="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-4">
            <h4 class="font-bold text-primary mb-1">Identitas Dasar Organisasi</h4>
            <p class="text-xs text-neutral-600">Masukkan nama resmi dan kode organisasi yang akan digunakan sebagai pengenal utama di seluruh sistem.</p>
          </div>
          
          <BaseInput
            label="Nama Organisasi"
            type="text"
            placeholder="Masukkan nama resmi organisasi"
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

        <!-- STEP 2: Lokasi Organisasi -->
        <div v-show="currentStep === 2" class="space-y-5 animate-fadeIn">
          <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
            <h4 class="font-bold text-blue-700 mb-1">Lokasi Markas Pusat (Opsional)</h4>
            <p class="text-xs text-blue-600">Tentukan letak geografis organisasi ini. Lewati jika organisasi ini mencakup seluruh nasional.</p>
          </div>

          <div>
            <label class="text-sm font-semibold text-neutral-800 mb-1 block">Provinsi</label>
            <SingleSelect
              placeholder="Pilih Provinsi"
              :list="refProvince"
              :selectedItem="form.province"
              :searchable="true"
              @update:selected="handleProvinceChange"
              labelKey="name"
            />
          </div>

          <div v-if="form.province">
            <label class="text-sm font-semibold text-neutral-800 mb-1 block">Kabupaten/Kota</label>
            <SingleSelect
              placeholder="Pilih Kabupaten/Kota"
              :list="filteredRegencies"
              :selectedItem="form.regency"
              :searchable="true"
              @update:selected="handleRegencyChange"
              labelKey="name"
            />
          </div>

          <div v-if="form.regency">
            <label class="text-sm font-semibold text-neutral-800 mb-1 block">Kecamatan</label>
            <SingleSelect
              placeholder="Pilih Kecamatan"
              :list="filteredDistricts"
              :selectedItem="form.district"
              :searchable="true"
              @update:selected="(selected) => (form.district = selected)"
              labelKey="name"
            />
          </div>
        </div>

        <!-- STEP 3: Format NTA -->
        <div v-show="currentStep === 3" class="space-y-5 animate-fadeIn">
          <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
            <h4 class="font-bold text-amber-700 mb-1 flex items-center gap-2">
              <IconAlertTriangle class="w-5 h-5" /> Peringatan Format NTA
            </h4>
            <p class="text-xs text-amber-700 mt-2 font-medium">
              Pastikan format NTA (Nomor Tanda Anggota) sudah benar. Mengubah format NTA di kemudian hari dapat menyebabkan ketidaksinkronan urutan penomoran anggota yang sudah terdaftar.
            </p>
          </div>

          <BaseInput
            label="Format Penomoran KTA"
            type="text"
            placeholder="contoh: [ORG_CODE]-[SEQ_6]"
            v-model="form.ntaFormat"
            :error="errors.ntaFormat"
            hint="Ketikkan format kartu yang diinginkan menggunakan tag khusus di bawah ini."
          />

          <!-- Preview NTA -->
          <div class="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
            <p class="text-xs text-neutral-500 mb-1">Pratinjau Nomor Anggota Pertama:</p>
            <p class="font-mono text-lg font-bold text-primary">
              {{ ntaPreview }}
            </p>
          </div>

          <!-- Tag Info -->
          <div class="bg-blue-50 border border-blue-100 rounded-lg p-4">
             <h5 class="font-semibold text-sm text-blue-800 mb-2">Tag Dinamis yang Tersedia:</h5>
             <ul class="text-xs space-y-1.5 text-blue-700">
               <li><code class="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-900">[ORG_CODE]</code> Kode Organisasi (misal: {{ form.code || 'KODE' }})</li>
               <li><code class="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-900">[PROV_CODE]</code> Kode Provinsi (misal: 31)</li>
               <li><code class="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-900">[REG_CODE]</code> Kode Kab/Kota (misal: 71)</li>
               <li><code class="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-900">[DIST_CODE]</code> Kode Kecamatan (misal: 01)</li>
               <li><code class="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-900">[DOB_DDMMYY]</code> Tanggal Lahir (misal: 170845)</li>
               <li><code class="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-blue-900">[SEQ_X]</code> Nomor Urut X digit otomatis (misal: [SEQ_4] => 0001)</li>
             </ul>
          </div>
        </div>

        <!-- Wizard Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-5 border-t border-neutral-100">
          <BaseButton
            type="button"
            variant="secondary"
            outline
            :disabled="loading"
            @click="handleBack"
          >
            {{ currentStep === 1 ? 'Batal' : 'Kembali' }}
          </BaseButton>
          
          <BaseButton type="submit" :loading="loading" :variant="currentStep === 3 ? 'success' : 'primary'">
            <div class="flex items-center gap-2">
              <span>{{ currentStep === 3 ? 'Selesaikan & Buat Organisasi' : 'Lanjutkan' }}</span>
              <IconArrowRight v-if="currentStep < 3" class="w-4 h-4" />
              <IconCheck v-else class="w-4 h-4" />
            </div>
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
import { defineProps, defineEmits, ref, onMounted, computed } from "vue";
import { openModalInfo } from "@/extends/plugins/modal";
import { z } from "zod";
import axios from "axios";
import { IconBuilding, IconCheck, IconArrowRight, IconAlertTriangle } from "@tabler/icons-vue";

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closeModal", "refresh"]);

const currentStep = ref(1);
const stepTitles = ["Identitas Organisasi", "Lokasi Pusat", "Format NTA"];

// Skema validasi dibagi per langkah
const schemas = [
  z.object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    code: z.string().min(2, "Kode minimal 2 karakter"),
    slug: z.string().min(2, "Slug minimal 2 karakter"),
  }),
  z.object({}), // Lokasi opsional
  z.object({
    ntaFormat: z.string().min(5, "Format NTA minimal 5 karakter"),
  }),
];

const form = ref({
  name: "",
  code: "",
  slug: "",
  province: null,
  regency: null,
  district: null,
  ntaFormat: "[ORG_CODE]-[SEQ_6]",
  logo: [],
});

const refProvince = ref([]);
const errors = ref({});
const loading = ref(false);

const allProvinces = ref([]);
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

const ntaPreview = computed(() => {
  let format = form.value.ntaFormat || "";
  format = format.replace(/\[ORG_CODE\]/g, form.value.code || "KODE");
  format = format.replace(/\[PROV_CODE\]/g, "31");
  format = format.replace(/\[REG_CODE\]/g, "71");
  format = format.replace(/\[DIST_CODE\]/g, "01");
  format = format.replace(/\[DOB_DDMMYY\]/g, "170845");
  format = format.replace(/\[SEQ_(\d+)\]/g, (match, p1) => {
    const len = parseInt(p1, 10) || 6;
    return "1".padStart(len, "0");
  });
  return format;
});

const getAllRegions = async () => {
  try {
    const [pRes, rRes, dRes] = await Promise.all([
      axios.get('/api/regions/provinces?limit=1000'),
      axios.get('/api/regions/regencies?limit=1000'),
      axios.get('/api/regions/districts?limit=10000')
    ]);
    refProvince.value = pRes.data?.data?.data || pRes.data?.data || [];
    allRegencies.value = rRes.data?.data?.data || rRes.data?.data || [];
    allDistricts.value = dRes.data?.data?.data || dRes.data?.data || [];
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

onMounted(() => {
  getAllRegions();
});

const validateCurrentStep = () => {
  errors.value = {};
  try {
    schemas[currentStep.value - 1].parse(form.value);
    return true;
  } catch (e) {
    if (e instanceof z.ZodError) {
      e.errors.forEach((err) => {
        errors.value[err.path[0]] = err.message;
      });
    }
    return false;
  }
};

const handleBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  } else {
    handleCloseModal();
  }
};

const handleNextOrSave = async () => {
  if (!validateCurrentStep()) return;

  if (currentStep.value < 3) {
    currentStep.value++;
  } else {
    loading.value = true;
    try {
      const payload = {
        name: form.value.name,
        code: form.value.code,
        slug: form.value.slug,
        ntaFormat: form.value.ntaFormat,
        provinceId: form.value.province?.id || undefined,
        regencyId: form.value.regency?.id || undefined,
        districtId: form.value.district?.id || undefined,
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
      }

      let response = await axios.post("/api/organizations", payload);
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        emit("refresh");
        handleCloseModal();
        openModalInfo({
          message: "Organisasi berhasil dibuat!",
          type: "success",
        });
      }
    } catch (e) {
      console.error(e);
      let errorMsg = e.response?.data?.message || "Terjadi kesalahan pada server";
      if (Array.isArray(e.response?.data?.message)) {
        errorMsg = e.response.data.message.join(", ");
      }
      openModalInfo({
        message: errorMsg,
        type: "error",
      });
    } finally {
      loading.value = false;
    }
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
    ntaFormat: "[ORG_CODE]-[SEQ_6]",
  };
  errors.value = {};
  currentStep.value = 1;
  emit("closeModal");
};
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
