<template>
  <div class="flex flex-col">
    <div class="flex justify-between items-center mb-3">
      <div class="relative">
        <input
          type="text"
          placeholder="Cari disini..."
          v-model="search"
          class="base-input w-full md:w-72 pl-10"
        />
        <IconSearch
          class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
      <button class="button-primary" type="button" @click="handleAdd">
        Tambah Baru
      </button>
    </div>
    <Table :rows="tableRows" :columns="filteredTableColumns" :loading="loading">
      <template #table-content="{ column, row, index }">
        <span v-if="row.field === 'index'">
          {{ (page - 1) * limit + index + 1 }}
        </span>
        <span v-else-if="row.field === 'role'">
          <span v-if="column.role === 'ADMIN_APLIKASI'">Super Admin</span>
          <span v-if="column.role === 'ADMIN'">Staff</span>
        </span>
        <span v-else-if="row.field === 'aksi'">
          <div class="flex items-center justify-center gap-2">
            <!-- <button class="button-warning" @click="handleDetail(column)">
              <IconEyeFilled class="w-5 h-5" />
            </button> -->
            <button class="button-primary" @click="handleEdit(column)">
              <IconEdit class="w-5 h-5" />
            </button>
            <button class="button-danger" @click="handleDelete(column)">
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
    label: "nama",
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
