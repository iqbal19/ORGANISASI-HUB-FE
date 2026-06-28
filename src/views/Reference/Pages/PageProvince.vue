<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <!-- Breadcrumbs -->
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <span class="text-neutral-500">Referensi</span>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Provinsi</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Data Provinsi</h1>
      </div>
    </div>

    <!-- Actions & Table Card -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div class="w-full sm:w-80">
          <BaseInput
            type="text"
            placeholder="Cari provinsi..."
            v-model="search"
          >
            <template #prefix>
              <IconSearch class="w-4 h-4" />
            </template>
          </BaseInput>
        </div>
        <div class="flex items-center gap-2">
          <BaseButton type="button" @click="handleAdd">
            Tambah Provinsi
          </BaseButton>
        </div>
      </div>

      <Table :rows="tableRows" :columns="tableColumns" :loading="loading" @handleSort="handleSort">
        <template #table-content="{ column, row, index }">
          <span v-if="row.field === 'index'">
            {{ (page - 1) * limit + index + 1 }}
          </span>
          <span v-else-if="row.field === 'type' || row.field === 'level'">
            <Badge
              :variant="column[row.field] === 'PUSAT' ? 'primary' : 'secondary'"
              :text="column[row.field]"
              pill
            />
          </span>
          <span v-else-if="row.field === 'aksi'">
            <div class="flex items-center justify-center gap-2">
              <BaseButton size="sm" variant="primary" @click="handleEdit(column)" title="Ubah">
                <IconEdit class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="danger" @click="handleDelete(column)" title="Hapus">
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
  <ModalAddProvince
    :showModal="showModalAdd"
    @closeModal="handleCloseModal"
    @refresh="getList"
  />
  <ModalEditProvince
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
} from "@tabler/icons-vue";
import ModalAddProvince from "../Components/ModalAddProvince.vue";
import ModalEditProvince from "../Components/ModalEditProvince.vue";

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
    label: "Kode Provinsi",
    field: "code",
    align: "center",
    isSort: { activeSort: "" },
  },
  {
    label: "Nama Provinsi",
    field: "name",
    align: "left",
    isSort: { activeSort: "" },
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
const handleAdd = () => {
  showModalAdd.value = true;
};
const handleDelete = (column) => {
  openModalConfirm({
    message: "Apakah yakin ingin menghapus Provinsi ini?",
    type: "delete",
    confirmButtonText: "Hapus",
  });
  handleConfirm(async () => {
    try {
      let response = await axios.delete("/api/regions/provinces/" + column.id);
      if (response.status === 200) {
        openModalInfo({
          message: "Berhasil hapus Provinsi",
          type: "success",
        });
      }
      getList();
    } catch (e) {
      console.error(e);
    }
  });
};

const getList = async () => {
  loading.value = true;
  try {
    let params = `?page=${page.value}&limit=${limit.value}`;
    if (search.value) params += `&search=${search.value}`;
    // if (sortBy.value) params += `&sortBy=${sortBy.value}&sortOrder=${sortOrder.value}`;

    let response = await axios.get(`/api/regions/provinces${params}`);
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
