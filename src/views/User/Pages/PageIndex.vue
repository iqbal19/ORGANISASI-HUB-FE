<template>
  <div class="flex flex-col gap-6 p-1">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#DFEEFF] pb-5">
      <div>
        <!-- Breadcrumbs -->
        <nav class="flex text-xs font-semibold text-neutral-400 mb-1.5 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Dashboard</router-link>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Manajemen Pengguna</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Manajemen Pengguna</h1>
        <p class="text-xs text-neutral-500 mt-1">
          Daftar akun administrator dan staf yang memiliki hak akses ke dalam sistem internal PDAM Berau.
        </p>
      </div>
    </div>

    <!-- Actions & Table Card -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div class="relative">
          <input
            type="text"
            placeholder="Cari nama pengguna..."
            v-model="search"
            class="base-input w-full sm:w-80 pl-10"
          />
          <IconSearch
            class="w-5 h-5 text-neutral-400 absolute left-3 top-1/2 transform -translate-y-1/2"
          />
        </div>
        <button class="button-primary flex items-center justify-center gap-2" type="button" @click="handleAdd">
          <span>Tambah User Baru</span>
        </button>
      </div>

      <Table :rows="tableRows" :columns="filteredTableColumns" :loading="loading">
        <template #table-content="{ column, row, index }">
          <span v-if="row.field === 'index'">
            {{ (page - 1) * limit + index + 1 }}
          </span>
          <span v-else-if="row.field === 'role'">
            <Badge
              :variant="column.role === 'ADMIN_APLIKASI' ? 'primary' : 'secondary'"
              :text="column.role === 'ADMIN_APLIKASI' ? 'Super Admin' : 'Staff'"
              pill
            />
          </span>
          <span v-else-if="row.field === 'aksi'">
            <div class="flex items-center justify-center gap-2">
              <button class="button-primary" @click="handleEdit(column)" title="Ubah User">
                <IconEdit class="w-5 h-5" />
              </button>
              <button class="button-danger" @click="handleDelete(column)" title="Hapus User">
                <IconTrash class="w-5 h-5" />
              </button>
            </div>
          </span>
          <span v-else>
            {{ column[row.field] }}
          </span>
        </template>
      </Table>
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
import { ref, onMounted, computed } from "vue";
import {
  openModalConfirm,
  handleConfirm,
  openModalInfo,
} from "@/extends/plugins/modal";
import {
  IconEdit,
  IconEyeFilled,
  IconSearch,
  IconTrash,
} from "@tabler/icons-vue";
import ModalAdd from "../Components/ModalAdd.vue";
import ModalEdit from "../Components/ModalEdit.vue";

const showModalAdd = ref(false);
const showModalEdit = ref(false);
const loading = ref(true);
const page = ref(1);
const limit = ref(10);
const tableRows = ref([
  {
    label: "No",
    field: "index",
    align: "center",
  },
  {
    label: "Nama Lengkap",
    field: "nama",
    align: "left",
    width: "350px",
  },
  {
    label: "Email",
    field: "email",
    align: "left",
    width: "350px",
  },
  {
    label: "Role",
    field: "role",
  },
  { label: "Aksi", field: "aksi", align: "center" },
]);
const tableColumns = ref([]);
const selectedData = ref(null);
const search = ref("");


const filteredTableColumns = computed(() => {
  if (!search.value) {
    return tableColumns.value;
  }
  return tableColumns.value.filter((column) =>
    column.nama.toLowerCase().includes(search.value.toLowerCase())
  );
});

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
    message: "Apakah yakin ingin menghapus User?",
    type: "delete",
    confirmButtonText: "Hapus",
  });
  handleConfirm(async () => {
    try {
      let response = await axios.delete("/v1/api/user/" + column.id);
      if (response.status === 200) {
        openModalInfo({
          message: "Berhasil hapus User",
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
    let response = await axios.get(`/v1/api/user`);
    if (response.status === 200) {
      tableColumns.value = response.data.data;
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
