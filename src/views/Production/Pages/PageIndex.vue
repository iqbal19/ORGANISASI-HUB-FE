<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
      <div>
        <h1 class="text-xl font-bold text-neutral-800">Produksi KTA Massal</h1>
        <p class="text-sm text-neutral-500 mt-1">Pilih anggota dan ekspor desain KTA mereka untuk dicetak massal.</p>
      </div>
      <div class="flex gap-3">
        <BaseButton
          variant="primary"
          outline
          :disabled="selectedMembers.length === 0"
          @click="printCards('pvc')"
        >
          <IconPrinter class="w-5 h-5 mr-2" />
          Cetak KTA PVC (4/hlm)
        </BaseButton>
        <BaseButton
          variant="primary"
          :disabled="selectedMembers.length === 0"
          @click="printCards('emoney')"
        >
          <IconPrinter class="w-5 h-5 mr-2" />
          Cetak E-Money (1/hlm)
        </BaseButton>
      </div>
    </div>

    <!-- Advanced Filter Card -->
    <div class="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4 relative z-20">
      <div class="flex items-center justify-between cursor-pointer" @click="showFilters = !showFilters">
        <h3 class="text-sm font-bold text-neutral-800 flex items-center gap-2">
          <IconFilter class="w-4 h-4 text-primary" /> Filter Pencarian
        </h3>
        <IconChevronDown class="w-5 h-5 text-neutral-400 transition-transform" :class="{ 'rotate-180': showFilters }" />
      </div>

      <div v-show="showFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-neutral-100">
        <!-- Search -->
        <div class="lg:col-span-2">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Pencarian Universal</label>
          <BaseInput
            type="text"
            placeholder="Cari Nama atau NTA..."
            v-model="filters.search"
            @keyup.enter="getList"
          >
            <template #prefix>
              <IconSearch class="w-4 h-4 text-neutral-400" />
            </template>
          </BaseInput>
        </div>

        <div v-if="isSuperAdmin" class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Organisasi</label>
          <SingleSelect
            :list="organizations"
            :selectedItem="selectedOrganization"
            @update:selected="onOrganizationSelected"
            labelKey="name"
            :searchable="true"
            placeholder="Pilih Organisasi"
          />
        </div>

        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Status Keanggotaan</label>
          <SingleSelect
            :list="statusList"
            :selectedItem="selectedStatus"
            @update:selected="onStatusSelected"
            labelKey="label"
            :searchable="false"
            placeholder="Semua Status"
          />
        </div>

        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Jenis Kelamin</label>
          <SingleSelect
            :list="genderList"
            :selectedItem="selectedGender"
            @update:selected="onGenderSelected"
            labelKey="label"
            :searchable="false"
            placeholder="Semua Jenis Kelamin"
          />
        </div>

        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Level Kepengurusan</label>
          <SingleSelect
            :list="levelList"
            :selectedItem="selectedLevel"
            @update:selected="onLevelSelected"
            labelKey="label"
            :searchable="false"
            placeholder="Semua Level"
          />
        </div>

        <!-- Wilayah Cascading (Hanya muncul jika level bukan PUSAT) -->
        <template v-if="filters.level && filters.level !== 'PUSAT'">
          <div class="relative">
            <label class="block text-xs font-semibold text-neutral-600 mb-1">Provinsi</label>
            <SingleSelect
              :list="provinces"
              :selectedItem="selectedProvince"
              @update:selected="onProvinceSelected"
              labelKey="name"
              :searchable="true"
              placeholder="Pilih Provinsi"
            />
          </div>
          
          <div class="relative" v-if="filters.level === 'CABANG' || filters.level === 'RANTING'">
            <label class="block text-xs font-semibold text-neutral-600 mb-1">Kabupaten/Kota</label>
            <SingleSelect
              :list="regencies"
              :selectedItem="selectedRegency"
              @update:selected="onRegencySelected"
              labelKey="name"
              :searchable="true"
              placeholder="Pilih Kabupaten"
              :disabled="!filters.provinceId"
            />
          </div>
          
          <div class="relative" v-if="filters.level === 'RANTING'">
            <label class="block text-xs font-semibold text-neutral-600 mb-1">Kecamatan</label>
            <SingleSelect
              :list="districts"
              :selectedItem="selectedDistrict"
              @update:selected="onDistrictSelected"
              labelKey="name"
              :searchable="true"
              placeholder="Pilih Kecamatan"
              :disabled="!filters.regencyId"
            />
          </div>
        </template>

        <div class="lg:col-span-4 flex justify-end gap-2 mt-2">
          <BaseButton type="button" variant="secondary" outline size="sm" @click="resetFilters">
            Reset Filter
          </BaseButton>
          <BaseButton type="button" variant="primary" size="sm" @click="getList">
            Terapkan Filter
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm border border-neutral-100 overflow-hidden">
      <Table
        :rows="tableHeaders"
        :columns="members"
        :loading="loading"
        :emptyMessage="isSuperAdmin && !filters.organizationId ? 'Silakan pilih organisasi terlebih dahulu untuk menampilkan daftar anggota.' : 'Tidak ada data anggota ditemukan.'"
        @handleCheckAll="toggleAllSelection"
      >
        <template #table-content="{ column, row, index }">
          <span v-if="row.field === 'checkbox'">
            <input
              type="checkbox"
              :value="column.id"
              v-model="selectedMemberIds"
              class="rounded border-neutral-300 text-primary focus:ring-primary"
            />
          </span>
          <span v-else-if="row.field === 'index'">
            {{ (page - 1) * limit + index + 1 }}
          </span>
          <span v-else-if="row.field === 'profil'">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                <img v-if="column.photo" :src="column.photo" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full flex items-center justify-center text-neutral-400">
                  <IconUser class="w-5 h-5" />
                </div>
              </div>
              <div>
                <p class="font-semibold text-neutral-800">{{ column.name }}</p>
                <p class="text-xs text-neutral-500 font-mono">{{ column.memberId || '-' }}</p>
              </div>
            </div>
          </span>
          <span v-else-if="row.field === 'kontak'">
            <div class="flex flex-col">
              <span class="text-sm text-neutral-700">{{ column.email || '-' }}</span>
              <span class="text-xs text-neutral-500">{{ column.phone || '-' }}</span>
            </div>
          </span>
          <span v-else-if="row.field === 'organisasi'">
            <div class="flex flex-col">
              <span class="text-sm font-medium text-neutral-800">{{ column.organization?.name || '-' }}</span>
              <span class="text-xs text-neutral-500">{{ column.position?.name || '-' }}</span>
            </div>
          </span>
          <span v-else-if="row.field === 'status'">
            <Badge :variant="column.isActive ? 'success' : 'secondary'">
              {{ column.isActive ? 'Aktif' : 'Tidak Aktif' }}
            </Badge>
          </span>
        </template>
      </Table>
      
      <div class="p-4 border-t border-neutral-100 bg-neutral-50">
        <Pagination
          :currentPage="page"
          :totalPages="paginationData?.totalPages || 1"
          :totalItems="paginationData?.total || 0"
          :itemsPerPage="limit"
          @page-changed="handlePageChange"
          @limit-changed="handleLimitChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "@/extends/plugins/axios";
import Table from "@/components/Basics/Table.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import BaseInput from "@/components/Basics/BaseInput.vue";
import Badge from "@/components/Basics/Badge.vue";
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import Pagination from "@/components/Basics/Pagination.vue";
import { IconSearch, IconFilter, IconChevronDown, IconPrinter, IconUser } from "@tabler/icons-vue";
import { useToastStore } from "@/stores/ToastStore";
import { useAuthStore } from "@/stores/AuthStore";
import Layout from "@/layouts/LayoutMain.vue";

const toast = useToastStore();
const authStore = useAuthStore();
const isSuperAdmin = computed(() => authStore.getAuthUser?.role === 'SUPER_ADMIN');

const members = ref([]);
const loading = ref(true);
const showFilters = ref(true);
const selectedMemberIds = ref([]);

const page = ref(1);
const limit = ref(10);
const paginationData = ref(null);

const filters = ref({
  search: "",
  status: "",
  gender: "",
  organizationId: "",
  level: "",
  provinceId: "",
  regencyId: "",
  districtId: "",
});

const statusList = [
  { id: "active", label: "Aktif" },
  { id: "inactive", label: "Tidak Aktif" }
];
const levelList = [
  { id: "PUSAT", label: "Pusat" },
  { id: "DAERAH", label: "Daerah (Provinsi)" },
  { id: "CABANG", label: "Cabang (Kabupaten/Kota)" },
  { id: "RANTING", label: "Ranting (Kecamatan/Desa)" }
];

const genderList = [
  { id: "MALE", label: "Laki-laki" },
  { id: "FEMALE", label: "Perempuan" }
];

const selectedStatus = ref(null);
const selectedLevel = ref(null);
const selectedGender = ref(null);

const organizations = ref([]);
const selectedOrganization = ref(null);

const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);

const selectedProvince = ref(null);
const selectedRegency = ref(null);
const selectedDistrict = ref(null);

const tableHeaders = ref([
  { field: "checkbox", type: "checklist", onCheck: false, label: "", align: "center", width: "50px" },
  { field: "index", label: "No", align: "center", width: "60px" },
  { field: "profil", label: "Profil Anggota", align: "left" },
  { field: "kontak", label: "Kontak", align: "left" },
  { field: "organisasi", label: "Organisasi & Jabatan", align: "left" },
  { field: "status", label: "Status", align: "center" },
]);

// toggleAllSelection triggered by Table's handleCheckAll
const toggleAllSelection = (currentVal) => {
  const newVal = !currentVal;
  tableHeaders.value[0].onCheck = newVal;
  
  if (newVal) {
    selectedMemberIds.value = members.value.map((m) => m.id);
  } else {
    selectedMemberIds.value = [];
  }
};

const fetchOrganizations = async () => {
  if (!isSuperAdmin.value) return;
  try {
    const response = await axios.get("/api/organizations", {
      params: { limit: 100 }
    });
    organizations.value = response.data?.data?.data || response.data?.data || [];
  } catch (error) {
    console.error("Failed to load orgs", error);
  }
};

const fetchProvinces = async () => {
  try {
    const res = await axios.get('/api/regions/provinces', { params: { limit: 100 } });
    provinces.value = res.data?.data?.data || res.data?.data || [];
  } catch (error) {
    console.error("Failed to load provinces", error);
  }
};

const fetchRegencies = async (provinceId) => {
  if (!provinceId) return;
  try {
    const res = await axios.get('/api/regions/regencies', { params: { provinceId, limit: 500 } });
    regencies.value = res.data?.data?.data || res.data?.data || [];
  } catch (error) {
    console.error("Failed to load regencies", error);
  }
};

const fetchDistricts = async (regencyId) => {
  if (!regencyId) return;
  try {
    const res = await axios.get('/api/regions/districts', { params: { regencyId, limit: 1000 } });
    districts.value = res.data?.data?.data || res.data?.data || [];
  } catch (error) {
    console.error("Failed to load districts", error);
  }
};

const getList = async () => {
  if (isSuperAdmin.value && !filters.value.organizationId) {
    members.value = [];
    paginationData.value = null;
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const params = {
      page: page.value,
      limit: limit.value,
      search: filters.value.search || undefined,
      isActive: filters.value.status ? (filters.value.status === 'active') : undefined,
      gender: filters.value.gender || undefined,
      organizationId: filters.value.organizationId || undefined,
      level: filters.value.level || undefined,
      provinceId: filters.value.provinceId || undefined,
      regencyId: filters.value.regencyId || undefined,
      districtId: filters.value.districtId || undefined,
    };
    
    const response = await axios.get("/api/members", { params });
    members.value = response.data?.data?.data || response.data?.data || [];
    
    paginationData.value = response.data?.data?.meta || response.data?.meta || null;
  } catch (error) {
    console.error("Gagal mengambil data", error);
    toast.showToast("Gagal mengambil daftar anggota", "error");
  } finally {
    loading.value = false;
  }
};

const onStatusSelected = (val) => {
  selectedStatus.value = val;
  filters.value.status = val ? val.id : "";
};

const onGenderSelected = (val) => {
  selectedGender.value = val;
  filters.value.gender = val ? val.id : "";
};

const onOrganizationSelected = (val) => {
  filters.value.organizationId = val ? val.id : "";
  selectedOrganization.value = val;
};

const onLevelSelected = (val) => {
  filters.value.level = val ? val.id : "";
  selectedLevel.value = val;
  
  // Reset regions when level changes
  filters.value.provinceId = "";
  filters.value.regencyId = "";
  filters.value.districtId = "";
  selectedProvince.value = null;
  selectedRegency.value = null;
  selectedDistrict.value = null;
};

const onProvinceSelected = (val) => {
  filters.value.provinceId = val ? val.id : "";
  selectedProvince.value = val;
  
  // Reset lower regions
  filters.value.regencyId = "";
  filters.value.districtId = "";
  selectedRegency.value = null;
  selectedDistrict.value = null;
  
  if (val) fetchRegencies(val.id);
};

const onRegencySelected = (val) => {
  filters.value.regencyId = val ? val.id : "";
  selectedRegency.value = val;
  
  // Reset lower region
  filters.value.districtId = "";
  selectedDistrict.value = null;
  
  if (val) fetchDistricts(val.id);
};

const onDistrictSelected = (val) => {
  selectedDistrict.value = val;
  filters.value.districtId = val ? val.id : "";
};

const handlePageChange = (newPage) => {
  page.value = newPage;
  getList();
};

const handleLimitChange = (newLimit) => {
  limit.value = newLimit;
  page.value = 1;
  getList();
};

const selectedMembers = computed(() => {
  return members.value.filter(m => selectedMemberIds.value.includes(m.id));
});

const isAllSelected = computed(() => {
  return members.value.length > 0 && selectedMemberIds.value.length === members.value.length;
});

const printCards = (type) => {
  if (selectedMemberIds.value.length === 0) {
    toast.showToast("Pilih minimal satu anggota yang KTA-nya ingin dicetak.", "warning");
    return;
  }
  
  // Store the selected IDs in sessionStorage to bypass URL length limits (safe for 50+ members)
  sessionStorage.setItem('print_member_ids', JSON.stringify(selectedMemberIds.value));
  window.open(`/production/cetak?type=${type}`, '_blank');
};

const resetFilters = () => {
  filters.value = {
    search: "",
    status: "",
    gender: "",
    organizationId: "",
    level: "",
    provinceId: "",
    regencyId: "",
    districtId: "",
  };
  selectedStatus.value = null;
  selectedGender.value = null;
  selectedOrganization.value = null;
  selectedLevel.value = null;
  selectedProvince.value = null;
  selectedRegency.value = null;
  selectedDistrict.value = null;
  page.value = 1;
  getList();
};

onMounted(() => {
  fetchOrganizations();
  fetchProvinces();
  getList();
});
</script>
