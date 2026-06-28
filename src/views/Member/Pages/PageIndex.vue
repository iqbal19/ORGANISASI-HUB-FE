<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <!-- Breadcrumbs -->
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Beranda</router-link>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Manajemen Anggota</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Manajemen Anggota</h1>
        <p class="text-sm text-neutral-500 mt-1">Kelola data keanggotaan organisasi Anda.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton type="button" variant="secondary" outline @click="handleCopyRegistrationLink">
          <IconCopy class="w-4 h-4 mr-2" /> Salin Link Registrasi
        </BaseButton>
        <BaseButton type="button" variant="secondary" outline>
          <IconFileExport class="w-4 h-4 mr-2" /> Export
        </BaseButton>
        <BaseButton type="button" @click="handleAdd">
          <IconPlus class="w-4 h-4 mr-2" /> Tambah Anggota
        </BaseButton>
      </div>
    </div>

    <!-- Advanced Filter Card -->
    <div class="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div class="flex items-center justify-between cursor-pointer" @click="showFilters = !showFilters">
        <h3 class="text-sm font-bold text-neutral-800 flex items-center gap-2">
          <IconFilter class="w-4 h-4 text-primary" /> Filter Pencarian
        </h3>
        <IconChevronDown class="w-5 h-5 text-neutral-400 transition-transform" :class="{ 'rotate-180': showFilters }" />
      </div>
      
      <div v-show="showFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-neutral-100">
        <div class="lg:col-span-2">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Pencarian Universal</label>
          <BaseInput
            type="text"
            placeholder="Cari Nama, NTA, Email, atau No. HP..."
            v-model="filters.search"
            @keyup.enter="() => { page = 1; getList(); }"
          >
            <template #prefix>
              <IconSearch class="w-4 h-4 text-neutral-400" />
            </template>
          </BaseInput>
        </div>

        <!-- Status -->
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

        <!-- Jenis Kelamin -->
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

        <!-- Organisasi (Hanya SUPER_ADMIN) -->
        <div v-if="isSuperAdmin" class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Organisasi</label>
          <SingleSelect
            :list="organizations"
            :selectedItem="selectedOrganization"
            @update:selected="onOrganizationSelected"
            labelKey="name"
            :searchable="true"
            placeholder="Semua Organisasi"
          />
        </div>

        <!-- Wilayah Cascading -->
        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Provinsi</label>
          <SingleSelect
            :list="provinces"
            :selectedItem="selectedProvince"
            @update:selected="onProvinceSelected"
            labelKey="name"
            :searchable="true"
            placeholder="Pilih Provinsi"
            :disabled="isProvinceLocked"
          />
        </div>
        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Kabupaten/Kota</label>
          <SingleSelect
            :list="regencies"
            :selectedItem="selectedRegency"
            @update:selected="onRegencySelected"
            labelKey="name"
            :searchable="true"
            placeholder="Pilih Kabupaten/Kota"
            :disabled="isRegencyLocked || !filters.provinceId"
          />
        </div>
        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Kecamatan</label>
          <SingleSelect
            :list="districts"
            :selectedItem="selectedDistrict"
            @update:selected="onDistrictSelected"
            labelKey="name"
            :searchable="true"
            placeholder="Pilih Kecamatan"
            :disabled="isDistrictLocked || !filters.regencyId"
          />
        </div>

        <div class="lg:col-span-4 flex justify-end gap-2 mt-2">
          <BaseButton type="button" variant="secondary" outline size="sm" @click="resetFilters">
            Reset Filter
          </BaseButton>
          <BaseButton type="button" variant="primary" size="sm" @click="() => { page = 1; getList(); }">
            Terapkan Filter
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Table Card -->
    <div class="flex flex-col gap-4">
      <Table :rows="tableRows" :columns="tableColumns" :loading="loading" @handleSort="handleSort">
        <template #table-content="{ column, row, index }">
          <span v-if="row.field === 'index'">
            {{ (page - 1) * limit + index + 1 }}
          </span>
          <span v-else-if="row.field === 'profil'">
            <div class="flex items-center gap-3">
              <img :src="column.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(column.name)}&background=e2e8f0&color=475569`" class="w-10 h-10 rounded-full object-cover border border-neutral-200" />
              <div>
                <div class="font-semibold text-neutral-800 flex items-center gap-2">
                  {{ column.name }}
                  <span v-if="column.gender === 'MALE'" class="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 text-[10px] font-bold">L</span>
                  <span v-else-if="column.gender === 'FEMALE'" class="px-1.5 py-0.5 rounded bg-pink-100 text-pink-700 text-[10px] font-bold">P</span>
                </div>
                <div class="text-xs text-neutral-500 font-medium font-mono">{{ column.memberId || 'Menunggu NTA' }}</div>
                <div v-if="isSuperAdmin" class="text-xs text-primary mt-0.5">{{ column.organization?.name || '-' }}</div>
              </div>
            </div>
          </span>
          <span v-else-if="row.field === 'kontak'">
            <div class="flex flex-col gap-0.5">
              <span class="text-xs font-medium text-neutral-700">{{ column.email || '-' }}</span>
              <span class="text-xs text-neutral-500">{{ column.phone || '-' }}</span>
            </div>
          </span>
          <span v-else-if="row.field === 'level'">
            <Badge
              variant="secondary"
              :text="column.level === 'PUSAT' ? 'Pusat' : (column.level === 'DAERAH' ? 'Daerah' : (column.level === 'CABANG' ? 'Cabang' : 'Ranting'))"
            />
          </span>
          <span v-else-if="row.field === 'status'">
            <Badge
              :variant="column.isActive ? 'success' : 'danger'"
              :text="column.isActive ? 'Aktif' : 'Tidak Aktif'"
              pill
            />
          </span>
          <span v-else-if="row.field === 'aksi'">
            <div class="flex items-center justify-center gap-2">
              <BaseButton v-if="!column.isActive" size="sm" variant="warning" outline @click="handleCopyPaymentLink(column)" title="Salin Link Pembayaran">
                <IconLink class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="info" outline @click="handlePrintCard(column)" title="Cetak Kartu">
                <IconIdBadge2 class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="success" outline @click="handleDetail(column)" title="Detail Profil Anggota">
                <IconEye class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="primary" @click="handleEdit(column)" title="Ubah Anggota">
                <IconEdit class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="danger" @click="handleDelete(column)" title="Hapus Anggota">
                <IconTrash class="w-4 h-4" />
              </BaseButton>
            </div>
          </span>
          <span v-else>
            {{ column[row.field] }}
          </span>
        </template>
      </Table>

      <!-- Pagination -->
      <Pagination
        :pagenation="paginationData"
        @pageTo="handlePageChange"
        :defaultLimit="limit"
      />
    </div>

    <!-- Modals -->
    <ModalDetail
      :showModal="isDetailModalOpen"
      :data="selectedMember"
      @closeModal="isDetailModalOpen = false"
    />
  </div>
</template>

<script setup>
import axios from "@/extends/plugins/axios";
import Table from "@/components/Basics/Table.vue";
import Badge from "@/components/Basics/Badge.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import BaseInput from "@/components/Basics/BaseInput.vue";
import SingleSelect from "@/components/Basics/SingleSelect.vue";
import Pagination from "@/components/Basics/Pagination.vue";
import ModalDetail from "../Components/ModalDetail.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";
import { useProfileStore } from "@/stores/ProfileStore";
import { setUserProfile } from "@/extends/methods/auth";
import {
  openModalConfirm,
  handleConfirm,
  openModalInfo,
} from "@/extends/plugins/modal";
import {
  IconEdit,
  IconSearch,
  IconTrash,
  IconPlus,
  IconFilter,
  IconChevronDown,
  IconFileExport,
  IconUser,
  IconIdBadge2,
  IconCopy,
  IconLink,
  IconEye
} from "@tabler/icons-vue";

const router = useRouter();
const authStore = useAuthStore();
const profileStore = useProfileStore();
const isSuperAdmin = computed(() => authStore.getAuthUser?.role === 'SUPER_ADMIN');
const isProvinceLocked = computed(() => ['ADMIN_DAERAH', 'ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role));
const isRegencyLocked = computed(() => ['ADMIN_CABANG', 'ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role));
const isDistrictLocked = computed(() => ['ADMIN_RANTING', 'OPERATOR'].includes(profileStore.user?.role));

const showFilters = ref(true); // Default open for better discoverability
const loading = ref(true);
const page = ref(1);
const limit = ref(10);
const sortBy = ref("");
const sortOrder = ref("");
const paginationData = ref(null);

const filters = ref({
  search: "",
  status: "",
  gender: "",
  organizationId: "",
  provinceId: isProvinceLocked.value ? profileStore.user?.provinceId || "" : "",
  regencyId: isRegencyLocked.value ? profileStore.user?.regencyId || "" : "",
  districtId: "",
});

const statusList = [
  { id: "active", label: "Aktif" },
  { id: "inactive", label: "Tidak Aktif" }
];

const genderList = [
  { id: "MALE", label: "Laki-laki" },
  { id: "FEMALE", label: "Perempuan" }
];

const organizations = ref([]);
const selectedStatus = ref(null);
const selectedGender = ref(null);
const selectedOrganization = ref(null);

const provinces = ref([]);
const regencies = ref([]);
const districts = ref([]);

const selectedProvince = ref(null);
const selectedRegency = ref(null);
const selectedDistrict = ref(null);

const onStatusSelected = (val) => {
  filters.value.status = val ? val.id : "";
  selectedStatus.value = val;
};

const onGenderSelected = (val) => {
  filters.value.gender = val ? val.id : "";
  selectedGender.value = val;
};

const onOrganizationSelected = (val) => {
  filters.value.organizationId = val ? val.id : "";
  selectedOrganization.value = val;
};

const fetchProvinces = async () => {
  try {
    const res = await axios.get('/api/regions/provinces', { params: { limit: 100 } });
    provinces.value = res.data?.data?.data || res.data?.data || [];
    
    if (isProvinceLocked.value && profileStore.user?.provinceId) {
      const prov = provinces.value.find(p => p.id === profileStore.user.provinceId);
      if (prov) {
        filters.value.provinceId = prov.id;
        selectedProvince.value = prov;
        fetchRegencies(prov.id);
      }
    }
  } catch (error) {
    console.error("Failed to load provinces", error);
  }
};

const fetchRegencies = async (provinceId) => {
  if (!provinceId) return;
  try {
    const res = await axios.get('/api/regions/regencies', { params: { provinceId, limit: 500 } });
    regencies.value = res.data?.data?.data || res.data?.data || [];

    if (isRegencyLocked.value && profileStore.user?.regencyId) {
      const reg = regencies.value.find(r => r.id === profileStore.user.regencyId);
      if (reg) {
        filters.value.regencyId = reg.id;
        selectedRegency.value = reg;
        fetchDistricts(reg.id);
      }
    }
  } catch (error) {
    console.error("Failed to load regencies", error);
  }
};

const fetchDistricts = async (regencyId) => {
  if (!regencyId) return;
  try {
    const res = await axios.get('/api/regions/districts', { params: { regencyId, limit: 1000 } });
    districts.value = res.data?.data?.data || res.data?.data || [];

    if (isDistrictLocked.value && profileStore.user?.districtId) {
      const dist = districts.value.find(d => d.id === profileStore.user.districtId);
      if (dist) {
        filters.value.districtId = dist.id;
        selectedDistrict.value = dist;
      }
    }
  } catch (error) {
    console.error("Failed to load districts", error);
  }
};

const onProvinceSelected = (val) => {
  filters.value.provinceId = val ? val.id : "";
  selectedProvince.value = val;
  filters.value.regencyId = "";
  selectedRegency.value = null;
  filters.value.districtId = "";
  selectedDistrict.value = null;
  regencies.value = [];
  districts.value = [];
  if (val) fetchRegencies(val.id);
};

const onRegencySelected = (val) => {
  filters.value.regencyId = val ? val.id : "";
  selectedRegency.value = val;
  filters.value.districtId = "";
  selectedDistrict.value = null;
  districts.value = [];
  if (val) fetchDistricts(val.id);
};

const onDistrictSelected = (val) => {
  filters.value.districtId = val ? val.id : "";
  selectedDistrict.value = val;
};

const tableRows = ref([
  { label: "No", field: "index", align: "center" },
  { label: "Profil Anggota", field: "profil", align: "left", isSort: { activeSort: "" } },
  { label: "Kontak", field: "kontak", align: "left" },
  { label: "Level", field: "level", align: "center" },
  { label: "Status", field: "status", align: "center" },
  { label: "Aksi", field: "aksi", align: "center" },
]);
const tableColumns = ref([]);

// (Removed debounce watcher for manual filtering)

const onRendererReady = () => {
  setTimeout(() => {
    window.onafterprint = () => {
      showRenderer.value = false;
      window.onafterprint = null;
    };
    window.print();
  }, 500);
};



const resetFilters = () => {
  filters.value = {
    search: "",
    status: "",
    gender: "",
    organizationId: "",
    provinceId: isProvinceLocked.value ? profileStore.user?.provinceId || "" : "",
    regencyId: isRegencyLocked.value ? profileStore.user?.regencyId || "" : "",
    districtId: "",
  };
  selectedStatus.value = null;
  selectedGender.value = null;
  selectedOrganization.value = null;
  
  if (!isProvinceLocked.value) {
    selectedProvince.value = null;
    regencies.value = [];
  } else if (filters.value.provinceId && provinces.value.length) {
    selectedProvince.value = provinces.value.find(p => p.id === filters.value.provinceId) || null;
  }
  
  if (!isRegencyLocked.value) {
    selectedRegency.value = null;
    districts.value = [];
  } else if (filters.value.regencyId && regencies.value.length) {
    selectedRegency.value = regencies.value.find(r => r.id === filters.value.regencyId) || null;
  }
  
  selectedDistrict.value = null;
  page.value = 1;
  getList();
};

const handlePageChange = (data) => {
  page.value = data.page;
  limit.value = data.limit;
  getList();
};

const handleSort = (row) => {
  tableRows.value.forEach((r) => {
    if (r.field !== row.field && r.isSort) {
      r.isSort.activeSort = "";
    }
  });

  if (row.isSort.activeSort) {
    sortBy.value = row.field;
    sortOrder.value = row.isSort.activeSort.toLowerCase();
  } else {
    sortBy.value = "";
    sortOrder.value = "";
  }
  getList();
};

const handleAdd = () => {
  router.push('/members/create');
};

const handleEdit = (column) => {
  router.push(`/members/edit/${column.id}`);
};

const isDetailModalOpen = ref(false);
const selectedMember = ref(null);

const handleDetail = async (column) => {
  try {
    const res = await axios.get('/api/members/' + column.id);
    const data = res.data.data || res.data;
    selectedMember.value = data;
    isDetailModalOpen.value = true;
  } catch (err) {
    console.error("Gagal mengambil detail", err);
    openModalInfo({ message: "Gagal memuat detail anggota.", type: "error" });
  }
};

const handlePrintCard = (column) => {
  sessionStorage.setItem('print_member_ids', JSON.stringify([column.id]));
  window.open('/production/cetak?type=emoney', '_blank');
};

// profileStore already declared at the top
const handleCopyRegistrationLink = () => {
  let orgId = "";
  if (isSuperAdmin.value) {
    if (selectedOrganization.value) {
      orgId = selectedOrganization.value.id;
    } else {
      return openModalInfo({
        message: "Silakan pilih Organisasi di filter pencarian terlebih dahulu untuk menyalin link pendaftarannya.",
        type: "error"
      });
    }
  } else {
    orgId = profileStore.user?.organizationId || profileStore.user?.organization?.id;
  }

  if (!orgId) {
    return openModalInfo({ message: "ID Organisasi tidak ditemukan.", type: "error" });
  }

  const link = `${window.location.origin}/register?orgId=${orgId}`;
  
  navigator.clipboard.writeText(link).then(() => {
    openModalInfo({ message: "Link pendaftaran berhasil disalin ke clipboard!", type: "success" });
  }).catch(err => {
    console.error("Gagal menyalin link:", err);
    openModalInfo({ message: "Gagal menyalin link.", type: "error" });
  });
};

const handleCopyPaymentLink = (column) => {
  if (!column.organizationId || !column.id) {
    return openModalInfo({ message: "Data anggota tidak lengkap untuk membuat link pembayaran.", type: "error" });
  }
  const link = `${window.location.origin}/checkout?memberId=${column.id}&orgId=${column.organizationId}`;
  
  navigator.clipboard.writeText(link).then(() => {
    openModalInfo({ message: "Link pembayaran berhasil disalin! Silakan bagikan ke anggota tersebut.", type: "success" });
  }).catch(err => {
    console.error("Gagal menyalin link:", err);
    openModalInfo({ message: "Gagal menyalin link pembayaran.", type: "error" });
  });
};

const handleDelete = (column) => {
  openModalConfirm({
    message: `Apakah yakin ingin menonaktifkan anggota ${column.name}?`,
    type: "delete",
    confirmButtonText: "Nonaktifkan",
  });
  handleConfirm(async () => {
    try {
      let response = await axios.patch("/api/members/" + column.id, { isActive: false });
      if (response.status === 200) {
        openModalInfo({
          message: "Berhasil menonaktifkan Anggota",
          type: "success",
        });
      }
    } catch (error) {
      openModalInfo({
        message: error.response?.data?.message || "Terjadi kesalahan",
        type: "error",
      });
    } finally {
      getList();
    }
  });
};

const getList = async () => {
  loading.value = true;
  try {
    let params = `?page=${page.value}&limit=${limit.value}`;
    if (filters.value.search) params += `&search=${filters.value.search}`;
    if (filters.value.status) params += `&isActive=${filters.value.status === 'active'}`;
    if (filters.value.gender) params += `&gender=${filters.value.gender}`;
    if (filters.value.organizationId) params += `&organizationId=${filters.value.organizationId}`;
    if (filters.value.provinceId) params += `&provinceId=${filters.value.provinceId}`;
    if (filters.value.regencyId) params += `&regencyId=${filters.value.regencyId}`;
    if (filters.value.districtId) params += `&districtId=${filters.value.districtId}`;
    if (sortBy.value) params += `&sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`;

    let response = await axios.get(`/api/members${params}`);
    if (response.status === 200 || response.data?.success) {
      const dataResponse = response.data.data;
      tableColumns.value = dataResponse?.data || dataResponse || [];

      // (Removed dummy data injection)

      const meta = dataResponse?.meta;
      if (meta) {
        paginationData.value = {
          prev_page_url: meta.page > 1 ? `?page=${meta.page - 1}` : null,
          next_page_url: meta.page < meta.lastPage ? `?page=${meta.page + 1}` : null,
          last_page_url: `?page=${meta.lastPage}`,
        };
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getOrganizations = async () => {
  try {
    const res = await axios.get('/api/organizations?limit=1000');
    organizations.value = res.data?.data?.data || res.data?.data || [];
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  if (isSuperAdmin.value) {
    getOrganizations();
  }
  // Force update profile to ensure provinceId is available (prevent localstorage cache issue)
  if (isProvinceLocked.value && !profileStore.user?.provinceId) {
    await setUserProfile();
  }
  await fetchProvinces();
  getList();
});
</script>

<style scoped></style>
