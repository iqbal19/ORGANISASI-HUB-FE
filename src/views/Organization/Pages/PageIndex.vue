<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <!-- Breadcrumbs -->
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Beranda</router-link>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Manajemen Organisasi</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Manajemen Organisasi</h1>
      </div>
    </div>

    <!-- Actions & Table Card -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div class="w-full sm:w-80">
          <BaseInput
            type="text"
            placeholder="Cari nama organisasi..."
            v-model="search"
          >
            <template #prefix>
              <IconSearch class="w-4 h-4" />
            </template>
          </BaseInput>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton type="button" @click="handleAdd">
            Tambah Organisasi
          </BaseButton>
        </div>
      </div>

      <Table :rows="tableRows" :columns="tableColumns" :loading="loading" @handleSort="handleSort">
        <template #table-content="{ column, row, index }">
          <span v-if="row.field === 'index'">
            {{ (page - 1) * limit + index + 1 }}
          </span>
          <span v-else-if="row.field === 'ntaFormat'">
            <Badge
              variant="secondary"
              :text="column[row.field] || '[ORG_CODE]-[SEQ_6]'"
            />
          </span>
          <span v-else-if="row.field === 'aksi'">
            <div class="flex items-center justify-center gap-2">
              <BaseButton size="sm" variant="secondary" outline @click="handleSetting(column)" title="Pengaturan">
                <IconSettings class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="primary" @click="handleEdit(column)" title="Ubah Organisasi">
                <IconEdit class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="danger" @click="handleDelete(column)" title="Hapus Organisasi">
                <IconTrash class="w-4 h-4" />
              </BaseButton>
            </div>
          </span>
          <span v-else-if="row.field === 'name'">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-50 flex-shrink-0 flex items-center justify-center">
                <img v-if="column.logo" :src="column.logo" :alt="column.name" class="w-full h-full object-cover" />
                <div v-else class="text-neutral-400 font-bold text-sm">
                  {{ column.name.charAt(0).toUpperCase() }}
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-medium text-neutral-900">{{ column.name }}</span>
                <span class="text-xs text-neutral-500" v-if="column.slug">/{{ column.slug }}</span>
              </div>
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
  <ModalAdd
    :showModal="showModalAdd"
    @closeModal="handleCloseModal"
    @refresh="getList"
  />
  <ModalEdit
    :showModal="showModalEdit"
    @closeModal="handleCloseModal"
    @refresh="getList"
    :data="selectedData"
  />
</template>

<script setup>
import axios from "axios";
import Table from "@/components/Basics/Table.vue";
import Badge from "@/components/Basics/Badge.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import BaseInput from "@/components/Basics/BaseInput.vue";
import Pagination from "@/components/Basics/Pagination.vue";
import { ref, onMounted, computed, watch } from "vue";
import {
  openModalConfirm,
  handleConfirm,
  openModalInfo,
} from "@/extends/plugins/modal";
import {
  IconEdit,
  IconSearch,
  IconTrash,
  IconSettings,
} from "@tabler/icons-vue";
import { useRouter } from "vue-router";
import ModalAdd from "../Components/ModalAdd.vue";
import ModalEdit from "../Components/ModalEdit.vue";

const router = useRouter();

const showModalAdd = ref(false);
const showModalEdit = ref(false);
const loading = ref(true);
const page = ref(1);
const limit = ref(10);
const sortBy = ref("");
const sortOrder = ref("");
const paginationData = ref(null);

const tableRows = ref([
  {
    label: "No",
    field: "index",
    align: "center",
  },
  {
    label: "Nama Organisasi",
    field: "name",
    align: "left",
    width: "300px",
    isSort: { activeSort: "" },
  },
  {
    label: "Kode",
    field: "code",
    align: "left",
    isSort: { activeSort: "" },
  },
  {
    label: "Format NTA",
    field: "ntaFormat",
    align: "center",
  },
  { label: "Aksi", field: "aksi", align: "center" },
]);
const tableColumns = ref([]);
const selectedData = ref(null);
const search = ref("");
let searchTimeout = null;

watch(search, () => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    page.value = 1;
    getList();
  }, 500);
});

const handlePageChange = (data) => {
  page.value = data.page;
  limit.value = data.limit;
  getList();
};

const handleSort = (row) => {
  // Reset activeSort di kolom lain
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

const handleCloseModal = () => {
  selectedData.value = null;
  showModalAdd.value = false;
  showModalEdit.value = false;
};
const handleEdit = (column) => {
  selectedData.value = column;
  showModalEdit.value = true;
};
const handleSetting = (column) => {
  router.push(`/organization/settings/${column.id}`);
};
const handleAdd = () => {
  showModalAdd.value = true;
};
const handleDelete = (column) => {
  openModalConfirm({
    message: "Apakah yakin ingin menghapus Organisasi?",
    type: "delete",
    confirmButtonText: "Hapus",
  });
  handleConfirm(async () => {
    try {
      let response = await axios.delete("/api/organizations/" + column.id);
      if (response.status === 200) {
        openModalInfo({
          message: "Berhasil hapus Organisasi",
          type: "success",
        });
      }
    } catch (error) {
      openModalInfo({
        message: error.response.data.message,
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
    if (search.value) params += `&search=${search.value}`;
    if (sortBy.value) params += `&sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`;

    let response = await axios.get(`/api/organizations${params}`);
    if (response.status === 200 || response.data?.success) {
      const dataResponse = response.data.data;
      tableColumns.value = dataResponse?.data || dataResponse || [];

      // Map backend meta to match Pagination component requirements
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

<style lang="scss" scoped></style>
