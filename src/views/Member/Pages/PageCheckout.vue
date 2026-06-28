<template>
  <div class="min-h-screen bg-neutral-50 py-12 flex flex-col justify-center sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
        <IconCreditCard class="w-8 h-8" />
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-neutral-900">
        Pemesanan & Cetak KTA
      </h2>
      <p class="mt-2 text-center text-sm text-neutral-600">
        Pilih produk kartu tanda anggota yang ingin Anda pesan.
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        
        <div v-if="loadingFetch" class="flex justify-center py-10">
          <IconLoader class="w-8 h-8 animate-spin text-primary" />
        </div>

        <form v-else-if="products.length > 0" @submit.prevent="handleCheckout">
          <!-- Pilihan Produk -->
          <div class="space-y-4">
            <label class="text-sm font-semibold text-neutral-800 block mb-2">Jenis Kartu Anggota / Produk</label>
            
            <div v-for="item in products" :key="item.productId"
              class="border rounded-xl p-4 cursor-pointer transition-colors"
              :class="selectedProductId === item.productId ? 'border-primary bg-primary/5' : 'border-neutral-200 hover:border-primary/50'"
              @click="selectedProductId = item.productId"
            >
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="font-bold text-neutral-900">{{ item.product?.name }}</h4>
                  <p class="text-sm text-neutral-500">{{ item.customDesc || item.product?.description }}</p>
                </div>
                <div class="text-right">
                  <p class="font-bold text-primary">Rp {{ formatNumber(item.customPrice) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Alamat Pengiriman -->
          <div v-if="needsShipping" class="mt-8 pt-6 border-t border-neutral-100">
            <h4 class="text-sm font-semibold text-neutral-800 mb-4">Informasi Pengiriman</h4>
            <div class="space-y-4">
               <BaseInput
                label="Alamat Lengkap Pengiriman"
                type="textarea"
                placeholder="Masukkan alamat lengkap beserta kode pos"
                v-model="shippingAddress"
                :required="true"
              />
              <p class="text-xs text-amber-600 font-medium">Catatan: Ongkos kirim akan ditagihkan secara COD atau terpisah oleh pengurus.</p>
            </div>
          </div>

          <!-- Total & Submit -->
          <div class="mt-8 pt-6 border-t border-neutral-100">
            <div class="flex items-center justify-between mb-6">
              <span class="text-neutral-600 font-medium">Total Pembayaran</span>
              <span class="text-2xl font-black text-primary">Rp {{ formatNumber(selectedPrice) }}</span>
            </div>
            
            <BaseButton type="submit" class="w-full justify-center" :loading="loadingCheckout">
              Bayar Sekarang
            </BaseButton>
          </div>
        </form>

        <div v-else class="text-center py-10">
          <p class="text-neutral-500">Belum ada produk yang ditawarkan oleh organisasi ini.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import BaseInput from '@/components/Basics/BaseInput.vue';
import BaseButton from '@/components/Basics/BaseButton.vue';
import { openModalInfo } from '@/extends/plugins/modal';
import { IconCreditCard, IconLoader } from '@tabler/icons-vue';

const route = useRoute();
const router = useRouter();

const loadingFetch = ref(true);
const loadingCheckout = ref(false);

const memberId = route.query.memberId;
const organizationId = route.query.orgId;

const products = ref([]);
const selectedProductId = ref(null);
const shippingAddress = ref('');

const formatNumber = (num) => {
  return new Intl.NumberFormat('id-ID').format(Number(num));
};

const selectedPrice = computed(() => {
  const p = products.value.find(x => x.productId === selectedProductId.value);
  return p ? Number(p.customPrice) : 0;
});

const needsShipping = computed(() => {
  const p = products.value.find(x => x.productId === selectedProductId.value);
  // Default logic: KTA Digital doesn't need shipping
  if (p && p.product?.code === 'KTA_DIGITAL') return false;
  return true;
});

const getPricing = async () => {
  if (!organizationId) return;
  try {
    const res = await axios.get(`/api/organizations/public/${organizationId}/products`);
    const data = res.data.data || res.data;
    if (Array.isArray(data)) {
      // Hanya ambil produk yang aktif
      products.value = data.filter(item => item.isActive);
      if (products.value.length > 0) {
        selectedProductId.value = products.value[0].productId;
      }
    }
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

onMounted(async () => {
  if (!memberId || !organizationId) {
    openModalInfo({ message: "Data tidak valid. Silakan ulangi pendaftaran.", type: "error" });
    router.push('/login');
    return;
  }
  await getPricing();
  loadingFetch.value = false;
});

const handleCheckout = async () => {
  if (needsShipping.value && !shippingAddress.value) {
    return openModalInfo({ message: "Alamat pengiriman wajib diisi untuk produk fisik", type: "error" });
  }

  loadingCheckout.value = true;
  try {
    const payload = {
      memberId,
      productId: selectedProductId.value,
      shippingAddress: needsShipping.value ? shippingAddress.value : null,
    };
    
    const res = await axios.post('/api/card-orders/checkout', payload);
    const data = res.data.data || res.data;
    
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      openModalInfo({ message: "Gagal membuat link pembayaran", type: "error" });
      loadingCheckout.value = false;
    }
  } catch (error) {
    console.error(error);
    openModalInfo({ message: error?.response?.data?.message || "Terjadi kesalahan saat memproses pembayaran", type: "error" });
    loadingCheckout.value = false;
  }
};
</script>
