<template>
  <div class="flex flex-col gap-6">
    <!-- Header Welcome Banner -->
    <div class="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 md:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
      <div v-if="profile?.role === 'SUPER_ADMIN'" class="flex flex-col gap-2">
        <h1 class="text-2xl md:text-3xl font-bold mb-1">Selamat Datang, Super Admin</h1>
        <p class="text-sm md:text-base text-primary-light max-w-2xl font-light">
          Anda memiliki kendali penuh atas seluruh organisasi dan konfigurasi di platform ini.
        </p>
      </div>
      <div v-else class="flex flex-col gap-2 w-full">
        <h1 class="text-2xl md:text-3xl font-bold mb-1">Dashboard Organisasi: {{ profile?.organization?.name || 'Tamu' }}</h1>
        <p class="text-sm md:text-base text-primary-light max-w-2xl font-light">
          Kelola profil organisasi Anda, sesuaikan tema website, dan pantau aktivitas anggota secara terpusat.
        </p>
      </div>
    </div>

    <!-- SUPER ADMIN VIEW -->
    <div v-if="profile?.role === 'SUPER_ADMIN'" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CardStat title="Total Organisasi" value="24" :icon="IconBuilding" trend="+2" trendDirection="up" />
        <CardStat title="Total Anggota" value="1,420" :icon="IconUsers" trend="+12%" trendDirection="up" />
        <CardStat title="Tema Tersedia" value="4" :icon="IconPalette" trend="Stabil" trendDirection="flat" />
        <CardStat title="Status Server" value="Optimal" :icon="IconActivity" trend="Online" trendDirection="up" />
      </div>

      <div class="bg-white border border-[#BBD6FF] rounded-xl p-5 shadow-sm">
        <h3 class="text-base font-bold text-neutral-900 mb-4">Aktivitas Terbaru</h3>
        <div class="flex items-center justify-center py-10 border-2 border-dashed border-neutral-200 rounded-lg">
          <p class="text-neutral-500 font-medium">Belum ada aktivitas tercatat.</p>
        </div>
      </div>
    </div>

    <!-- ADMIN PUSAT (ORGANIZATION) VIEW -->
    <div v-else class="space-y-6">
      
      <div v-if="loadingOrg" class="flex justify-center p-10">
        <div class="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>

      <div v-else class="space-y-6">
        <!-- Profil Organisasi Singkat -->
        <div class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm flex items-center gap-6">
          <div class="w-24 h-24 rounded-xl bg-neutral-50 border border-neutral-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
            <img v-if="profile?.organization?.logo" :src="profile.organization.logo" class="w-full h-full object-cover" />
            <IconBuilding v-else class="w-10 h-10 text-neutral-300" />
          </div>
          <div>
            <h3 class="text-xl font-bold text-neutral-900">{{ orgData?.name || profile?.organization?.name }}</h3>
            <p class="text-sm text-neutral-500 mt-1 font-mono bg-neutral-100 px-2 py-0.5 rounded inline-block">{{ orgData?.code || profile?.organization?.code }}</p>
            <p class="text-sm text-neutral-600 mt-2">{{ orgData?.description || 'Belum ada deskripsi organisasi.' }}</p>
          </div>
        </div>

        <!-- Domain Section -->
        <div v-if="profile?.role === 'ADMIN_PUSAT'" class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Pengaturan Domain Website</h3>
          <p class="text-sm text-neutral-500 mb-6">
            Website organisasi Anda dapat diakses secara default melalui subdomain platform. Anda juga dapat mendaftarkan domain milik Anda sendiri.
          </p>
          <form @submit.prevent="handleSaveWebsite" class="space-y-4 max-w-xl">
            <BaseInput
              label="Custom Domain (Opsional)"
              type="text"
              placeholder="contoh: mastrip.or.id"
              v-model="orgForm.customDomain"
            />
            <div class="flex items-center gap-2 mt-1">
              <span class="text-xs font-medium bg-neutral-100 text-neutral-600 px-2 py-1 rounded">Subdomain Aktif:</span>
              <span class="text-xs text-primary font-bold">{{ orgSlug }}.organisasihub.com</span>
            </div>
            
            <div class="pt-4">
              <BaseButton type="submit" :loading="savingWebsite">Simpan Domain</BaseButton>
            </div>
          </form>
        </div>

        <!-- Theme Section -->
        <div v-if="profile?.role === 'ADMIN_PUSAT'" class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
          <div class="flex justify-between items-center mb-6">
            <div>
              <h3 class="text-lg font-bold text-neutral-900">Pilihan Tema Website</h3>
              <p class="text-sm text-neutral-500">Pilih tema visual yang paling cocok dengan identitas organisasi Anda. Perubahan tema otomatis tersimpan.</p>
            </div>
          </div>
          
          <div v-if="loadingThemes" class="flex justify-center p-10">
            <div class="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="theme in themes" 
              :key="theme.id"
              @click="selectTheme(theme.id)"
              class="relative border-2 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md"
              :class="orgForm.themeId === theme.id ? 'border-primary ring-2 ring-primary/20 ring-offset-2' : 'border-neutral-200 hover:border-primary/50'"
            >
              <div v-if="orgForm.themeId === theme.id" class="absolute top-3 right-3 z-10 bg-primary text-white rounded-full p-1 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <img :src="theme.thumbnail || 'https://placehold.co/600x400/f3f4f6/a1a1aa?text=No+Preview'" :alt="theme.name" class="w-full h-40 object-cover border-b border-neutral-100" />
              <div class="p-4 bg-white">
                <h4 class="font-bold text-neutral-900">{{ theme.name }}</h4>
                <p class="text-xs text-neutral-500 mt-1 line-clamp-2">{{ theme.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="profile?.role !== 'ADMIN_PUSAT'" class="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm text-center py-12">
          <IconActivity class="w-12 h-12 text-neutral-300 mx-auto mb-4" />
          <h3 class="text-lg font-bold text-neutral-900">Dashboard Wilayah</h3>
          <p class="text-sm text-neutral-500">Gunakan menu di bilah kiri untuk mengelola anggota di wilayah wewenang Anda.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useProfileStore } from "@/stores/ProfileStore";
import { showToast } from "@/extends/plugins/toast";
import { openModalInfo } from "@/extends/plugins/modal";
import CardStat from "@/components/Basics/CardStat.vue";
import BaseInput from "@/components/Basics/BaseInput.vue";
import BaseButton from "@/components/Basics/BaseButton.vue";
import axios from "axios";
import {
  IconUsers,
  IconBuilding,
  IconPalette,
  IconActivity,
} from "@tabler/icons-vue";

const profileStore = useProfileStore();
const profile = computed(() => profileStore.user);

// Super Admin Dummy States
// ... none needed right now

// Admin Pusat States
const loadingOrg = ref(false);
const savingWebsite = ref(false);
const orgData = ref(null);
const orgSlug = ref("");

const orgForm = ref({
  customDomain: "",
  themeId: null,
});

const themes = ref([]);
const loadingThemes = ref(false);

const orgId = computed(() => profile.value?.organizationId);

const getOrganization = async () => {
  if (!orgId.value || orgId.value === "undefined") return;
  try {
    loadingOrg.value = true;
    let res = await axios.get(`/api/organizations/${orgId.value}`);
    const data = res.data?.data || res.data;
    orgData.value = data;
    orgForm.value.customDomain = data.customDomain || "";
    orgForm.value.themeId = data.themeId || null;
    orgSlug.value = data.slug || "";
  } catch (e) {
    console.error(e);
  } finally {
    loadingOrg.value = false;
  }
};

const getThemes = async () => {
  try {
    loadingThemes.value = true;
    let res = await axios.get(`/api/website-themes`);
    themes.value = res.data?.data || res.data || [];
  } catch (e) {
    console.error(e);
  } finally {
    loadingThemes.value = false;
  }
};

const handleSaveWebsite = async () => {
  if (!orgId.value) return;
  try {
    savingWebsite.value = true;
    await axios.patch(`/api/organizations/${orgId.value}`, {
      customDomain: orgForm.value.customDomain || null,
      themeId: orgForm.value.themeId || null,
    });
    openModalInfo({ message: "Pengaturan Website berhasil disimpan", type: "success" });
  } catch (e) {
    console.error(e);
    let errorMsg = "Gagal menyimpan pengaturan website";
    if (e.response?.status === 409) {
      errorMsg = e.response.data?.message || "Domain tersebut sudah digunakan oleh organisasi lain.";
    }
    openModalInfo({ message: errorMsg, type: "error" });
  } finally {
    savingWebsite.value = false;
  }
};

const selectTheme = (themeId) => {
  orgForm.value.themeId = themeId;
  handleSaveWebsite(); // Auto-save when theme selected
};

watch(orgId, (newVal) => {
  if (newVal && newVal !== "undefined" && profile.value?.role !== 'SUPER_ADMIN') {
    getOrganization();
  }
}, { immediate: true });

onMounted(() => {
  if (profile.value?.role !== 'SUPER_ADMIN') {
    getThemes();
  }
});
</script>

<style scoped>
.bg-primary-dark {
  background-color: #2457A8;
}
</style>
