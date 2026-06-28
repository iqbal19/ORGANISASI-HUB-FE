<template>
  <div class="flex flex-col gap-6">
    <!-- Page Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <!-- Breadcrumbs -->
        <nav class="flex text-xs font-semibold text-neutral-400 mb-2 gap-2 items-center">
          <router-link to="/beranda" class="hover:text-primary transition-colors">Beranda</router-link>
          <span class="text-neutral-300">/</span>
          <span class="text-neutral-600 font-bold text-primary">Master Produk</span>
        </nav>
        <h1 class="text-2xl font-bold text-neutral-900 tracking-tight">Master Produk</h1>
        <p class="text-sm text-neutral-500 mt-1">
          Kelola katalog produk global yang dapat digunakan oleh semua organisasi.
        </p>
      </div>
    </div>

    <!-- Actions & Table Card -->
    <div class="flex flex-col gap-4">
      <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div class="w-full sm:w-80">
          <!-- Search input omitted for simplicity or could be added -->
        </div>
        <div class="flex items-center gap-2">
          <BaseButton type="button" @click="handleCreate">
            Tambah Produk
          </BaseButton>
        </div>
      </div>

      <Table :rows="tableRows" :columns="products" :loading="loading">
        <template #table-content="{ column, row, index }">
          <span v-if="row.field === 'index'">
            {{ index + 1 }}
          </span>
          <span v-else-if="row.field === 'productInfo'">
            <div class="text-sm font-semibold text-neutral-900">{{ column.name }}</div>
            <div class="text-xs text-neutral-500 mt-0.5 max-w-md truncate">{{ column.description }}</div>
          </span>
          <span v-else-if="row.field === 'defaultPrice'">
            Rp {{ formatNumber(column.defaultPrice) }}
          </span>
          <span v-else-if="row.field === 'isActive'">
            <Badge
              :variant="column.isActive ? 'success' : 'danger'"
              :text="column.isActive ? 'Aktif' : 'Nonaktif'"
              pill
            />
          </span>
          <span v-else-if="row.field === 'aksi'">
            <div class="flex items-center justify-center gap-2">
              <BaseButton size="sm" variant="primary" @click="handleEdit(column)" title="Ubah Produk">
                <IconEdit class="w-4 h-4" />
              </BaseButton>
              <BaseButton size="sm" variant="danger" @click="handleDelete(column)" title="Hapus Produk">
                <IconTrash class="w-4 h-4" />
              </BaseButton>
            </div>
          </span>
          <span v-else>
            {{ column[row.field] }}
          </span>
        </template>
      </Table>
    </div>
    
    <ModalAdd
      :showModal="isAddModalOpen"
      @closeModal="isAddModalOpen = false"
      @refresh="fetchProducts"
    />
    <ModalEdit
      :showModal="isEditModalOpen"
      :data="selectedProduct"
      @closeModal="isEditModalOpen = false"
      @refresh="fetchProducts"
    />
    <ModalDelete
      :showModal="isDeleteModalOpen"
      :data="selectedProduct"
      @closeModal="isDeleteModalOpen = false"
      @refresh="fetchProducts"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '@/components/Basics/BaseButton.vue';
import Table from '@/components/Basics/Table.vue';
import Badge from '@/components/Basics/Badge.vue';
import { IconEdit, IconTrash } from '@tabler/icons-vue';
import ModalAdd from '../Components/ModalAdd.vue';
import ModalEdit from '../Components/ModalEdit.vue';
import ModalDelete from '../Components/ModalDelete.vue';

const products = ref([]);
const loading = ref(false);

const tableRows = ref([
  { field: "index", label: "No", width: "5%" },
  { field: "code", label: "Kode", width: "15%" },
  { field: "productInfo", label: "Info Produk", width: "40%" },
  { field: "defaultPrice", label: "Harga Default", width: "15%" },
  { field: "isActive", label: "Status", width: "10%" },
  { field: "aksi", label: "Aksi", align: "center", width: "15%" },
]);

const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedProduct = ref(null);

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(Number(num));
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    const res = await axios.get('/api/products');
    products.value = res.data.data || res.data;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const handleCreate = () => {
  isAddModalOpen.value = true;
};

const handleEdit = (item) => {
  selectedProduct.value = item;
  isEditModalOpen.value = true;
};

const handleDelete = (item) => {
  selectedProduct.value = item;
  isDeleteModalOpen.value = true;
};

onMounted(() => {
  fetchProducts();
});
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
