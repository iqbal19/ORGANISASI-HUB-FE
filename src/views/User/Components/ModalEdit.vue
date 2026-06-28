<template>
  <Modal
    :showModal="props.showModal"
    @closeModal="handleCloseModal"
    :isBorder="true"
    classWidth="max-w-md"
  >
    <template #header>
      <p class="text-xl font-bold text-neutral-900">Ubah User</p>
    </template>
    <template #body>
      <form @submit.prevent="handleSave">
        <div class="grid grid-cols-1 gap-4">
          <BaseInput
            label="Nama Lengkap"
            type="text"
            placeholder="Nama Lengkap"
            v-model="form.name"
            :error="errors.name"
          />
          <BaseInput
            label="Email"
            type="email"
            placeholder="@gmail.com"
            v-model="form.email"
            :error="errors.email"
          />


          <div>
            <label for="role" class="text-sm font-semibold text-neutral-800 mb-1 block">Role</label>
            <SingleSelect
              :list="refRole"
              :selectedItem="form.role"
              :searchable="false"
              @update:selected="(selected) => (form.role = selected)"
              labelKey="label"
            />
            <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.role">
              {{ errors.role }}
            </span>
          </div>

          <!-- Pilihan Wilayah (Ditampilkan Berdasarkan Role) -->
          <div v-if="form.role && ['ADMIN_DAERAH', 'ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(form.role.id)" class="grid grid-cols-1 gap-4 mt-2">
            
            <!-- Provinsi -->
            <div>
              <label class="block text-sm font-semibold text-neutral-800 mb-1">Provinsi <span class="text-red-500">*</span></label>
              <SingleSelect
                :list="provinces"
                :selectedItem="selectedProvince"
                @update:selected="onProvinceSelected"
                labelKey="name"
                :searchable="true"
                :disabled="isProvinceLocked"
                :dropUp="true"
              />
              <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.provinceId">{{ errors.provinceId }}</span>
            </div>

            <!-- Kabupaten (Hanya muncul jika Cabang/Ranting/Operator) -->
            <div v-if="['ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(form.role.id)">
              <label class="block text-sm font-semibold text-neutral-800 mb-1">Kabupaten/Kota <span class="text-red-500">*</span></label>
              <SingleSelect
                :list="regencies"
                :selectedItem="selectedRegency"
                @update:selected="onRegencySelected"
                labelKey="name"
                :searchable="true"
                :disabled="isRegencyLocked || !form.provinceId"
                :dropUp="true"
              />
              <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.regencyId">{{ errors.regencyId }}</span>
            </div>

            <!-- Kecamatan (Hanya muncul jika Ranting) -->
            <div v-if="form.role.id === 'ADMIN_RANTING'">
              <label class="block text-sm font-semibold text-neutral-800 mb-1">Kecamatan <span class="text-red-500">*</span></label>
              <SingleSelect
                :list="districts"
                :selectedItem="selectedDistrict"
                @update:selected="onDistrictSelected"
                labelKey="name"
                :searchable="true"
                :disabled="!form.regencyId"
                :dropUp="true"
              />
              <span class="text-xs text-danger font-medium mt-1 block" v-if="errors.districtId">{{ errors.districtId }}</span>
            </div>

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
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import { z } from "zod";
import axios from "axios";
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { setUserProfile } from "@/extends/methods/auth";
import { openModalInfo } from "@/extends/plugins/modal";

const authStore = useAuthStore();

const profileStore = useProfileStore();
const authUser = computed(() => profileStore.getUser);

const isProvinceLocked = computed(() => ['ADMIN_DAERAH', 'ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(authUser.value?.role));
const isRegencyLocked = computed(() => ['ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(authUser.value?.role));

const refRole = computed(() => {
  const allRoles = [
    { id: "SUPER_ADMIN", label: "Super Admin" },
    { id: "ADMIN_PUSAT", label: "Admin Pusat" },
    { id: "ADMIN_DAERAH", label: "Admin Daerah" },
    { id: "ADMIN_CABANG", label: "Admin Cabang" },
    { id: "ADMIN_RANTING", label: "Admin Ranting" },
    { id: "OPERATOR", label: "Operator" },
  ];

  const role = authUser.value?.role;
  if (role === "SUPER_ADMIN") return allRoles;
  if (role === "ADMIN_PUSAT") return allRoles.filter(r => r.id !== "SUPER_ADMIN");
  if (role === "ADMIN_DAERAH") return allRoles.filter(r => ["ADMIN_CABANG", "ADMIN_RANTING", "OPERATOR"].includes(r.id));
  if (role === "ADMIN_CABANG") return allRoles.filter(r => ["ADMIN_RANTING", "OPERATOR"].includes(r.id));
  if (role === "ADMIN_RANTING") return allRoles.filter(r => ["OPERATOR"].includes(r.id));
  
  return [];
});

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

const schema = z
  .object({
    name: z
      .string()
      .min(3, "Nama harus memiliki setidaknya 3 karakter")
      .max(50, "Nama maksimal 50 karakter"),
    email: z.string().email("Email tidak valid"),
    role: z.any().refine((role) => role, "Role harus terisi"),
  });

const allProvinces = ref([]);
const allRegencies = ref([]);
const allDistricts = ref([]);

const provinces = computed(() => allProvinces.value);
const regencies = computed(() => {
  if (!form.value.provinceId) return [];
  return allRegencies.value.filter(r => r.provinceId === form.value.provinceId);
});
const districts = computed(() => {
  if (!form.value.regencyId) return [];
  return allDistricts.value.filter(d => d.regencyId === form.value.regencyId);
});

const selectedProvince = ref(null);
const selectedRegency = ref(null);
const selectedDistrict = ref(null);

const fetchAllRegions = async () => {
  try {
    if (isProvinceLocked.value && !profileStore.user?.provinceId) {
      await setUserProfile();
    }
    const [pRes, rRes, dRes] = await Promise.all([
      axios.get('/api/regions/provinces?limit=1000'),
      axios.get('/api/regions/regencies?limit=1000'),
      axios.get('/api/regions/districts?limit=10000')
    ]);
    allProvinces.value = pRes.data?.data?.data || pRes.data?.data || [];
    allRegencies.value = rRes.data?.data?.data || rRes.data?.data || [];
    allDistricts.value = dRes.data?.data?.data || dRes.data?.data || [];

    if (isProvinceLocked.value && authUser.value?.provinceId) {
      const prov = allProvinces.value.find(p => p.id === authUser.value.provinceId);
      if (prov) {
        form.value.provinceId = prov.id;
        selectedProvince.value = prov;
      }
    }
    if (isRegencyLocked.value && authUser.value?.regencyId) {
      const reg = allRegencies.value.find(r => r.id === authUser.value.regencyId);
      if (reg) {
        form.value.regencyId = reg.id;
        selectedRegency.value = reg;
      }
    }
    // Also auto-select current assigned regions for this user
    if (form.value.provinceId && !selectedProvince.value) {
      selectedProvince.value = allProvinces.value.find(p => p.id === form.value.provinceId) || null;
    }
    if (form.value.regencyId && !selectedRegency.value) {
      selectedRegency.value = allRegencies.value.find(r => r.id === form.value.regencyId) || null;
    }
    if (form.value.districtId && !selectedDistrict.value) {
      selectedDistrict.value = allDistricts.value.find(d => d.id === form.value.districtId) || null;
    }
  } catch (err) {
    console.error(err);
  }
};

const onProvinceSelected = (val) => {
  form.value.provinceId = val ? val.id : "";
  selectedProvince.value = val;
  form.value.regencyId = "";
  form.value.districtId = "";
  selectedRegency.value = null;
  selectedDistrict.value = null;
};

const onRegencySelected = (val) => {
  form.value.regencyId = val ? val.id : "";
  selectedRegency.value = val;
  form.value.districtId = "";
  selectedDistrict.value = null;
};

const onDistrictSelected = (val) => {
  form.value.districtId = val ? val.id : "";
  selectedDistrict.value = val;
};

const form = ref({
  name: "",
  email: "",
  role: null,
  provinceId: "",
  regencyId: "",
  districtId: "",
});
const errors = ref({});
const loading = ref(false);
const loadingFetch = ref(false);

const getDetail = async () => {
  try {
    loadingFetch.value = true;
    let response = await axios.get(`/api/users/${props.data.id}`);
    if (response.status === 200 || response.data?.success) {
      const responseData = response.data.data || response.data;
      form.value.name = responseData.name;
      form.value.email = responseData.email;
      form.value.role = refRole.value.find(
        (role) => role.id === responseData.role
      );
      form.value.provinceId = responseData.provinceId || "";
      form.value.regencyId = responseData.regencyId || "";
      form.value.districtId = responseData.districtId || "";
      
      // Auto assign selection if options are already loaded
      if (allProvinces.value.length > 0 && form.value.provinceId) {
        selectedProvince.value = allProvinces.value.find(p => p.id === form.value.provinceId) || null;
      }
      if (allRegencies.value.length > 0 && form.value.regencyId) {
        selectedRegency.value = allRegencies.value.find(r => r.id === form.value.regencyId) || null;
      }
      if (allDistricts.value.length > 0 && form.value.districtId) {
        selectedDistrict.value = allDistricts.value.find(d => d.id === form.value.districtId) || null;
      }
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
    let payload = {
      name: form.value.name,
      email: form.value.email,
      role: form.value.role.id,
      provinceId: form.value.provinceId || null,
      regencyId: form.value.regencyId || null,
      districtId: form.value.districtId || null,
    };
    let response = await axios.patch(`/api/users/${props.data.id}`, payload);
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
    email: "",
    role: null,
    provinceId: "",
    regencyId: "",
    districtId: "",
  };
  selectedProvince.value = null;
  selectedRegency.value = null;
  selectedDistrict.value = null;
  errors.value = {
    name: null,
    email: null,
    role: null,
  };
  emit("closeModal");
};

watch(
  () => props.data,
  (newData, oldData) => {
    if (newData && newData.id) {
      getDetail();
      fetchAllRegions();
    }
  },
  { immediate: true }
);
</script>
