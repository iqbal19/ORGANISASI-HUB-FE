<template>
  <div class="min-h-screen bg-neutral-100 flex justify-center font-sans">
    <div class="w-full max-w-md bg-white shadow-xl min-h-screen relative flex flex-col overflow-hidden pb-12">
      
      <!-- Header -->
      <div class="bg-primary px-6 pt-8 pb-10 rounded-b-[2rem] relative z-0 text-white shadow-md">
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-white/20 p-0.5 flex items-center justify-center overflow-hidden border border-white/30">
              <img v-if="member?.photo" :src="member.photo" class="w-full h-full object-cover rounded-full" />
              <div v-else class="text-white font-bold text-xl">{{ member?.name?.charAt(0) || 'A' }}</div>
            </div>
            <div>
              <p class="text-xs opacity-90 uppercase mb-0.5">{{ organization?.name || 'ORGANISASI' }}</p>
              <h1 class="text-lg font-bold leading-tight uppercase">{{ member?.name || 'Anggota' }}</h1>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="handleLogout" class="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center shadow-sm relative hover:bg-neutral-50 transition-colors">
              <IconLogout class="w-5 h-5" />
            </button>
          </div>
        </div>
        <!-- Decorative background elements -->
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-5 -mb-5"></div>
      </div>

      <!-- Fitur -->
      <div class="px-6 -mt-6 relative z-10">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-neutral-100">
          <div class="grid grid-cols-4 gap-y-6 gap-x-2">
            <!-- KTA Digital Button -->
            <div @click="showKtaModal = true" class="flex flex-col items-center gap-2 cursor-pointer group">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <IconIdBadge2 class="w-6 h-6 text-primary" />
              </div>
              <span class="text-[11px] text-center font-medium text-neutral-700">KTA Digital</span>
            </div>
            
            <!-- Kegiatan Button -->
            <div class="flex flex-col items-center gap-2 cursor-pointer group">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <IconCalendarEvent class="w-6 h-6 text-primary" />
              </div>
              <span class="text-[11px] text-center font-medium text-neutral-700">Kegiatan</span>
            </div>

            <!-- Iuran Button -->
            <div class="flex flex-col items-center gap-2 cursor-pointer group">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <IconWallet class="w-6 h-6 text-primary" />
              </div>
              <span class="text-[11px] text-center font-medium text-neutral-700">Iuran</span>
            </div>

            <!-- Profil Button -->
            <div class="flex flex-col items-center gap-2 cursor-pointer group">
              <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                <IconUser class="w-6 h-6 text-primary" />
              </div>
              <span class="text-[11px] text-center font-medium text-neutral-700">Profil</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Berita Slide -->
      <div class="mt-8 pl-6 flex-1">
        <h2 class="text-base font-bold text-neutral-800 mb-4">Berita Terbaru</h2>
        
        <div v-if="loadingNews" class="flex overflow-x-auto gap-4 hide-scrollbar pr-6 pb-4">
          <div v-for="i in 3" :key="i" class="w-[280px] h-[160px] rounded-2xl bg-neutral-200 animate-pulse shrink-0"></div>
        </div>
        
        <div v-else-if="news.length === 0" class="mr-6 text-center py-10 bg-neutral-50 rounded-2xl border border-neutral-100">
          <p class="text-neutral-500 text-sm">Belum ada berita terbaru</p>
        </div>
        
        <div v-else class="flex overflow-x-auto gap-4 snap-x hide-scrollbar pr-6 pb-4">
          <div v-for="item in news" :key="item.id" class="snap-start shrink-0 w-[280px] h-[160px] rounded-2xl overflow-hidden relative group cursor-pointer bg-neutral-100 border border-neutral-200 shadow-sm">
            <img v-if="item.thumbnail" :src="item.thumbnail" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div v-else class="absolute inset-0 w-full h-full bg-neutral-200 flex items-center justify-center">
               <IconArticle class="w-10 h-10 text-neutral-400" />
            </div>
            
            <!-- Gradient Overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"></div>
            
            <div class="absolute bottom-0 left-0 right-0 p-4 drop-shadow-md">
              <h3 class="text-white font-medium text-sm line-clamp-2 leading-snug mb-1">{{ item.title }}</h3>
              <p class="text-white/80 text-xs">{{ formatDate(item.createdAt) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- KTA Modal Overlay -->
      <Transition name="fade">
        <div v-if="showKtaModal" class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6">
          
          <!-- Close Button Top Right -->
          <button @click="showKtaModal = false" class="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50">
            <IconX class="w-6 h-6" />
          </button>

          <div class="w-full flex justify-center" style="max-width: min(85vw, 55vh);">
            <div v-if="loadingKta" class="bg-white/5 rounded-2xl p-8 flex justify-center items-center h-64 border border-white/10 w-full">
              <div class="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div v-else-if="ktaError" class="bg-red-500/10 text-red-400 rounded-2xl p-6 text-center border border-red-500/20 w-full">
              <p class="font-medium">{{ ktaError }}</p>
            </div>
            <div v-else class="w-full transform transition-transform">
              <DigitalKtaCard 
                v-if="organization && member && card"
                :organization="organization"
                :member="member"
                :card="card"
              />
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/AuthStore";
import { 
  IconArticle, IconLogout, 
  IconIdBadge2, IconCalendarEvent, IconWallet, IconUser, IconX
} from "@tabler/icons-vue";
import DigitalKtaCard from "../Components/DigitalKtaCard.vue";
import { openModalConfirm, handleConfirm } from "@/extends/plugins/modal";
import { formatDateIndo } from "@/extends/helpers/util.formatter";

const router = useRouter();
const authStore = useAuthStore();

const showKtaModal = ref(false);

const loadingKta = ref(true);
const ktaError = ref("");
const organization = ref(null);
const member = ref(null);
const card = ref(null);
const qrToken = ref("");

const loadingNews = ref(true);
const news = ref([]);

const fetchMyKta = async () => {
  try {
    loadingKta.value = true;
    const res = await axios.get("/api/members/my-kta");
    if (res.data?.success) {
      const data = res.data.data;
      organization.value = data.organization;
      member.value = data.member;
      card.value = data.card;
      qrToken.value = data.card.qrToken;
      
      // After getting organization ID, fetch news
      if (organization.value?.id) {
        fetchNews(organization.value.id);
      }
    }
  } catch (err) {
    ktaError.value = err.response?.data?.message || "Gagal memuat data KTA";
  } finally {
    loadingKta.value = false;
  }
};

const fetchNews = async (orgId) => {
  try {
    loadingNews.value = true;
    const res = await axios.get(`/api/articles/public/${orgId}?limit=5&page=1`);
    if (res.data?.success) {
      news.value = res.data.data.data || [];
    }
  } catch (err) {
    console.error("Gagal memuat berita", err);
  } finally {
    loadingNews.value = false;
  }
};

const formatDate = (date) => {
  return formatDateIndo(date);
};

const handleLogout = () => {
  openModalConfirm({
    message: "Apakah Anda yakin ingin keluar dari aplikasi?",
    type: "delete",
    confirmButtonText: "Ya, Keluar",
  });
  handleConfirm(async () => {
    authStore.clear();
    router.replace("/login");
  });
};

onMounted(() => {
  fetchMyKta();
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
