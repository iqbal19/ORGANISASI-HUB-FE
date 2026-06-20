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
        <span v-else-if="row.field === 'description'">
          <div class="line-clamp-3">
            {{ column[row.field] }}
          </div>
        </span>
        <span v-else-if="row.field === 'aksi'">
          <div class="flex items-center justify-center gap-2">
            <button class="button-warning" @click="handleDetail(column)">
              <IconEyeFilled class="w-5 h-5" />
            </button>
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

  <ModalAddEdit
    :showModal="showModalAddEdit"
    @closeModal="showModalAddEdit = false"
    @refresh="getList"
    :data="selectedData"
  />
  <ModalDetail
    :showModal="showModalDetail"
    :data="selectedData"
    @closeModal="showModalDetail = false"
  />
</template>

<script setup>
import axios from "axios";
import ModalAddEdit from "../Components/ModalAddEdit.vue";
import Table from "@/components/Basics/Table.vue";
import ModalDetail from "../Components/ModalDetail.vue";
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

const loading = ref(true);
const showModalAddEdit = ref(false);
const showModalDetail = ref(false);
const page = ref(1);
const limit = ref(10);
const pagePagination = ref({});
const tableRows = ref([
  {
    label: "No",
    field: "index",
    align: "center",
  },
  {
    label: "Judul Berita",
    field: "title",
    align: "left",
    width: "350px",
  },
  {
    label: "Deskripsi Berita",
    field: "description",
    align: "left",
    width: "350px",
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
    column.title.toLowerCase().includes(search.value.toLowerCase())
  );
});

const handleDetail = (column) => {
  selectedData.value = column;
  showModalDetail.value = true;
};

const handleEdit = (column) => {
  selectedData.value = column;
  showModalAddEdit.value = true;
};
const handleDelete = (column) => {
  openModalConfirm({
    message: "Apakah yakin ingin menghapus Berita?",
    type: "delete",
    confirmButtonText: "Hapus",
  });
  handleConfirm(async () => {
    try {
      let response = await axios.delete("/v1/api/news/" + column.id);
      if (response.status === 200) {
        openModalInfo({
          message: "Berhasil dihapus",
          type: "success",
        });
        getList();
      }
    } catch (error) {
      openModalInfo({
        message: error?.response?.data?.message || "Terjadi kesalahan",
        type: "error",
      });
    }
  });
};
const handleAdd = () => {
  selectedData.value = null;
  showModalAddEdit.value = true;
};
const getList = async () => {
  loading.value = true;
  try {
    let response = await axios.get(`/v1/api/news`);
    if (response.status === 200) {
      tableColumns.value = response.data.data;
    }
  } catch (error) {
    tableColumns.value = [];
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
