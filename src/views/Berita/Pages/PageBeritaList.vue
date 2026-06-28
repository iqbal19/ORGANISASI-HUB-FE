<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Beranda</router-link>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Manajemen Berita</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Manajemen Berita & Artikel</h1>
        <p class="text-sm text-neutral-500 mt-1">Kelola berita, pengumuman, dan publikasi organisasi Anda.</p>
      </div>
      <div class="flex items-center gap-2">
        <BaseButton type="button" @click="handleAdd">
          <IconPlus class="w-4 h-4 mr-2" /> Tulis Berita
        </BaseButton>
      </div>
    </div>

    <!-- Filter Card -->
    <div class="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
      <div class="flex items-center justify-between cursor-pointer" @click="showFilters = !showFilters">
        <h3 class="text-sm font-bold text-neutral-800 flex items-center gap-2">
          <IconFilter class="w-4 h-4 text-primary" /> Filter Pencarian
        </h3>
        <IconChevronDown class="w-5 h-5 text-neutral-400 transition-transform" :class="{ 'rotate-180': showFilters }" />
      </div>
      
      <div v-show="showFilters" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-neutral-100">
        <div>
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Pencarian Judul</label>
          <BaseInput
            type="text"
            placeholder="Cari judul berita..."
            v-model="filters.search"
            @keyup.enter="() => { page = 1; getList(); }"
          >
            <template #prefix>
              <IconSearch class="w-4 h-4 text-neutral-400" />
            </template>
          </BaseInput>
        </div>

        <div class="relative">
          <label class="block text-xs font-semibold text-neutral-600 mb-1">Status Publikasi</label>
          <SingleSelect
            :list="statusList"
            :selectedItem="selectedStatus"
            @update:selected="onStatusSelected"
            labelKey="label"
            :searchable="false"
            placeholder="Semua Status"
          />
        </div>

        <div class="flex justify-end items-end gap-2 mt-2 lg:mt-0">
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
          <span v-else-if="row.field === 'berita'">
            <div class="flex items-center gap-3">
              <img v-if="column.thumbnail" :src="column.thumbnail" @error="column.thumbnail = ''" class="w-16 h-12 rounded object-cover border border-neutral-200" />
              <div v-else class="w-16 h-12 rounded bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-400">
                <IconPhoto class="w-6 h-6" />
              </div>
              <div>
                <div class="font-semibold text-neutral-800 line-clamp-1" :title="column.title">
                  {{ column.title }}
                </div>
                <div class="text-xs text-neutral-500 font-medium">Penulis: {{ column.author?.name || '-' }}</div>
                <div class="text-[10px] text-neutral-400 mt-0.5">Dilihat: {{ column.viewCount }} kali</div>
              </div>
            </div>
          </span>
          <span v-else-if="row.field === 'status'">
            <Badge
              :variant="column.status === 'PUBLISHED' ? 'success' : (column.status === 'DRAFT' ? 'warning' : 'secondary')"
              :text="column.status === 'PUBLISHED' ? 'Dipublikasi' : (column.status === 'DRAFT' ? 'Draf' : 'Diarsipkan')"
              pill
            />
          </span>
          <span v-else-if="row.field === 'tanggal'">
             <span class="text-sm font-medium">{{ formatDate(column.createdAt) }}</span>
          </span>
          <span v-else-if="row.field === 'aksi'">
            <div class="flex items-center justify-center gap-2">
              <BaseButton size="sm" variant="success" outline @click="handleDetail(column)" title="Lihat Detail Berita">
                <IconEye class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="primary" outline @click="handleEdit(column)" title="Ubah Berita">
                <IconEdit class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="danger" outline @click="handleDelete(column)" title="Hapus Berita">
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
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
  IconEye,
  IconNews,
  IconX,
  IconUser,
  IconCalendarEvent,
  IconPhoto
} from "@tabler/icons-vue";

const router = useRouter();

const showFilters = ref(true);
const loading = ref(true);
const page = ref(1);
const limit = ref(10);
const sortBy = ref("");
const sortOrder = ref("");
const paginationData = ref(null);

const filters = ref({
  search: "",
  status: "",
});

const statusList = [
  { id: "DRAFT", label: "Draf" },
  { id: "PUBLISHED", label: "Dipublikasi" }
];

const selectedStatus = ref(null);

const onStatusSelected = (val) => {
  filters.value.status = val ? val.id : "";
  selectedStatus.value = val;
};

const tableRows = ref([
  { label: "No", field: "index", align: "center", width: "50px" },
  { label: "Informasi Berita", field: "berita", align: "left" },
  { label: "Tanggal Dibuat", field: "tanggal", align: "center" },
  { label: "Status", field: "status", align: "center" },
  { label: "Aksi", field: "aksi", align: "center", width: "120px" },
]);
const tableColumns = ref([]);

const resetFilters = () => {
  filters.value = {
    search: "",
    status: "",
  };
  selectedStatus.value = null;
  page.value = 1;
  getList();
};

const handlePageChange = (data) => {
  page.value = data.page;
  limit.value = data.limit;
  getList();
};

const handleSort = (row) => {
  getList();
};

const handleAdd = () => {
  router.push('/kelola-berita/create');
};

const handleEdit = (column) => {
  router.push(`/kelola-berita/edit/${column.id}`);
};

const handleDetail = async (column) => {
  router.push(`/kelola-berita/${column.slug}`);
};

const handleDelete = (column) => {
  openModalConfirm({
    message: `Apakah yakin ingin menghapus berita "${column.title}"?`,
    type: "delete",
    confirmButtonText: "Hapus",
  });
  handleConfirm(async () => {
    try {
      let response = await axios.delete("/api/articles/" + column.id);
      if (response.status === 200) {
        openModalInfo({
          message: "Berhasil menghapus berita",
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

const formatDate = (dateStr) => {
  if(!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
};

const getList = async () => {
  loading.value = true;
  try {
    let params = `?page=${page.value}&limit=${limit.value}`;
    if (filters.value.search) params += `&search=${filters.value.search}`;
    if (filters.value.status) params += `&status=${filters.value.status}`;

    let response = await axios.get(`/api/articles${params}`);
    if (response.status === 200 || response.data?.success) {
      const dataResponse = response.data.data;
      tableColumns.value = dataResponse?.data || dataResponse || [];

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

onMounted(() => {
  getList();
});
</script>

<style scoped></style>
