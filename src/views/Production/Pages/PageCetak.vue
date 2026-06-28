<template>
  <div class="min-h-screen bg-neutral-100 print:bg-white flex flex-col print-container">
    <component :is="'style'">
      @media print {
        @page {
          margin: 0;
          {{ pageStyle }}
        }
        body { margin: 0; padding: 0; }
      }
    </component>

    <div v-if="loading" class="flex flex-col items-center justify-center min-h-screen">
      <div class="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p class="text-neutral-500 font-medium">Mempersiapkan KTA untuk dicetak...</p>
    </div>
    
    <div v-else-if="error" class="flex flex-col items-center justify-center min-h-screen text-center">
      <div class="text-red-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 class="text-xl font-bold text-neutral-800 mb-2">Gagal Memuat Data</h2>
      <p class="text-neutral-600">{{ error }}</p>
      <BaseButton class="mt-6" @click="closeWindow">Tutup Halaman</BaseButton>
    </div>

    <div class="fixed top-0 left-0 w-full p-4 bg-white z-[99999] flex justify-between items-center print:hidden border-b border-neutral-200 shadow-sm print-controls">
      <h2 class="text-xl font-bold text-neutral-800">Preview Cetak KTA</h2>
      <BaseButton @click="closeWindow">Tutup Halaman</BaseButton>
    </div>

    <!-- The Renderer -->
    <KtaRenderer
      v-if="!loading && !error && orders.length > 0"
      :orders="orders"
      :printType="printType"
      @ready="onRendererReady"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/extends/plugins/axios';
import BaseButton from '@/components/Basics/BaseButton.vue';
import KtaRenderer from '../Components/KtaRenderer.vue';

const route = useRoute();
const loading = ref(true);
const error = ref('');
const orders = ref([]);
const printType = ref('pvc');

const pageStyle = computed(() => {
  if (printType.value === 'pvc') {
    return 'size: 200mm 300mm;'; // Standard Indonesian inkjet PVC sheet size (not exactly A4)
  } else {
    if (!orders.value || orders.value.length === 0) return 'size: 85.6mm 54.0mm;';
    const template = orders.value[0]?.organization?.ktaTemplate;
    return template?.orientation === 'portrait' ? 'size: 54.0mm 85.6mm;' : 'size: 85.6mm 54.0mm;';
  }
});
const rawMember = ref(null);

const closeWindow = () => {
  window.close();
};

const onRendererReady = () => {
  setTimeout(() => {
    window.print();
  }, 1000);
};

onMounted(async () => {
  try {
    const type = route.query.type || 'pvc';
    const idsString = route.query.ids || '';
    printType.value = type;

    // Read IDs from sessionStorage to bypass URL limits
    const storedIds = sessionStorage.getItem('print_member_ids');
    let ids = [];
    
    if (storedIds) {
      try {
        ids = JSON.parse(storedIds);
      } catch (e) {
        console.error("Invalid IDs in sessionStorage");
      }
    }
    
    // Fallback to URL if accessed directly with old bookmark
    if (ids.length === 0 && route.query.ids) {
      ids = route.query.ids.split(',').filter(id => id);
    }

    if (!ids || ids.length === 0) {
      error.value = 'Tidak ada ID anggota yang dipilih untuk dicetak.';
      loading.value = false;
      return;
    }

    // Fetch members from API
    // Since we need all selected members, we can fetch them using limit: 1000 or filtering by ID
    // Actually we can just fetch the whole list and filter, or if there's an endpoint for ids...
    // But since this is a demo, let's fetch members and filter
    const response = await axios.get('/api/members', { params: { limit: 1000 } });
    const allMembers = response.data?.data?.data || response.data?.data || [];
    
    const selectedMembers = allMembers.filter(m => ids.includes(m.id));

    if (selectedMembers.length === 0) {
      error.value = 'Anggota tidak ditemukan di database.';
      loading.value = false;
      return;
    }
    
    rawMember.value = selectedMembers[0];

    const orgIds = [...new Set(selectedMembers.map(m => m.organization?.id).filter(Boolean))];
    const orgTemplates = {};
    for (const orgId of orgIds) {
      try {
        const orgRes = await axios.get(`/api/organizations/${orgId}`);
        orgTemplates[orgId] = orgRes.data?.data?.ktaTemplate || orgRes.data?.ktaTemplate;
      } catch (err) {
        console.error('Failed to fetch org template', orgId);
      }
    }

    // Map to orders payload
    orders.value = selectedMembers.map(member => {
      let template = member.organization?.ktaTemplate || orgTemplates[member.organization?.id];
      if (typeof template === 'string') {
        try { template = JSON.parse(template); } catch(e) {}
      }
      return {
        id: `dummy-${member.id}`,
        member: member,
        organization: {
          ...(member.organization || {}),
          ktaTemplate: template
        }
      };
    });

    loading.value = false;
  } catch (err) {
    console.error(err);
    error.value = 'Terjadi kesalahan saat memuat data anggota.';
    loading.value = false;
  }
});
</script>

<style>
/* Remove margin/padding on body when printing this page */
@media print {
  body {
    margin: 0;
    padding: 0;
    background-color: white !important;
  }
  
  .print-controls {
    display: none !important;
  }
  
  .print-container {
    background-color: white !important;
  }
}
</style>
