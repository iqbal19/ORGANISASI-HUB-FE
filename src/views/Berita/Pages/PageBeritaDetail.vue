<template>
  <div class="max-w-6xl mx-auto w-full relative pb-10">
    
    <!-- Top Navigation (Mobile Friendly) -->
    <div class="flex items-center justify-between mb-6 lg:mb-8 pb-4 border-b border-neutral-200/60">
      <div
        class="flex items-center gap-2 cursor-pointer text-neutral-600 hover:text-primary transition-colors font-semibold text-sm"
        @click="goBack"
      >
        <IconArrowLeft class="w-4 h-4" /> 
        <span>Kembali<span class="hidden sm:inline"> ke Daftar</span></span>
      </div>
      
      <div v-if="article">
        <BaseButton type="button" size="sm" variant="primary" outline @click="handleEdit">
          <IconEdit class="w-4 h-4 mr-1 sm:mr-2" /> 
          <span class="hidden sm:inline">Ubah Berita</span>
          <span class="sm:hidden">Ubah</span>
        </BaseButton>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-32">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>
    
    <div v-else-if="article" class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
      
      <!-- Kolom Konten Berita Utama -->
      <article class="lg:col-span-8 flex flex-col gap-4 lg:gap-8">
        
        <!-- Header Artikel -->
        <div class="flex flex-col gap-3">
          <Badge
            class="w-max mb-1"
            :variant="article.status === 'PUBLISHED' ? 'success' : (article.status === 'DRAFT' ? 'warning' : 'secondary')"
            :text="article.status === 'PUBLISHED' ? 'Dipublikasi' : (article.status === 'DRAFT' ? 'Draf' : 'Diarsipkan')"
            pill
          />
          <h1 class="text-3xl sm:text-4xl lg:text-[42px] font-black text-neutral-900 leading-[1.2] tracking-tight break-words">{{ article.title }}</h1>
          
          <!-- Inline Metadata (Sesuai Mockup) -->
          <div class="flex flex-col gap-1 mt-2">
            <div class="flex flex-wrap items-center gap-2 text-sm text-neutral-500 font-medium">
              <span class="text-primary font-bold uppercase tracking-wider flex items-center">
                <IconUser class="w-4 h-4 mr-1" /> {{ article.author?.name || 'Admin' }}
              </span>
              <span class="text-neutral-300">&mdash;</span>
              <span>{{ formatDate(article.createdAt) }}</span>
              <span class="text-neutral-300">/</span>
              <span class="text-neutral-400">Umum</span>
            </div>
            <div class="flex items-center gap-1.5 text-sm text-neutral-400 font-medium mt-1">
              <span>Telah dibaca</span>
              <IconEye class="w-4 h-4" />
              <span>{{ article.viewCount || 0 }} Kali</span>
            </div>
          </div>
        </div>
        
        <!-- Cover/Banner Besar -->
        <div class="w-full relative mt-2 mb-2 lg:mb-4">
          <img v-if="article.thumbnail" :src="article.thumbnail" @error="article.thumbnail = ''" class="w-full h-auto max-h-[500px] rounded-2xl shadow-sm object-cover bg-slate-100" />
          <div v-else class="w-full h-[250px] lg:h-[400px] bg-slate-100 rounded-2xl shadow-sm flex items-center justify-center border border-slate-200">
            <IconPhoto class="w-20 h-20 lg:w-32 lg:h-32 text-slate-400" />
          </div>
        </div>
        
        <!-- Isi Artikel HTML -->
        <div class="prose prose-lg prose-blue max-w-none text-neutral-800 leading-[1.8] font-serif-like" v-html="article.content"></div>
      </article>

      <!-- Sidebar Lengket (Sticky Sidebar) -->
      <aside class="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6 order-last lg:order-none mt-2 lg:mt-0">
        
        <!-- Berita Lainnya -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2 border-b border-neutral-200 pb-2">
            <div class="w-1.5 h-5 bg-primary rounded-full"></div>
            <h3 class="text-lg font-black text-neutral-800 tracking-tight">Berita Lainnya</h3>
          </div>
          
          <div class="flex flex-col gap-4">
            <div v-if="loadingOtherNews" class="flex justify-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
            <div v-else-if="otherNews.length === 0" class="text-sm text-neutral-400">
              Tidak ada berita lain.
            </div>
            <template v-else>
              <div 
                v-for="news in otherNews" 
                :key="news.id"
                class="flex gap-3 group cursor-pointer"
                @click="goToOtherNews(news.slug)"
              >
                <div class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                  <img v-if="news.thumbnail" :src="news.thumbnail" @error="news.thumbnail = ''" class="w-full h-full object-cover transition-transform group-hover:scale-110 bg-white" />
                  <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                    <IconPhoto class="w-8 h-8" />
                  </div>
                </div>
                <div class="flex flex-col gap-1 flex-1">
                  <h4 class="text-sm font-bold text-neutral-800 line-clamp-2 group-hover:text-primary transition-colors leading-snug" :title="news.title">
                    {{ news.title }}
                  </h4>
                  <div class="text-[11px] text-neutral-500 mt-auto font-medium">
                    {{ formatDate(news.createdAt) }}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>

      </aside>

    </div>

    <div v-else class="text-center py-32 flex flex-col items-center gap-4">
      <div class="text-neutral-400 text-lg">Berita tidak ditemukan atau sudah dihapus.</div>
      <BaseButton type="button" @click="goBack">Kembali ke Daftar</BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/extends/plugins/axios";
import BaseButton from "@/components/Basics/BaseButton.vue";
import Badge from "@/components/Basics/Badge.vue";
import { openModalInfo } from "@/extends/plugins/modal";
import { 
  IconArrowLeft, 
  IconUser, 
  IconCalendarEvent, 
  IconEye,
  IconEdit,
  IconPhoto
} from "@tabler/icons-vue";

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const loadingOtherNews = ref(false);
const article = ref(null);
const otherNews = ref([]);

const slug = ref(route.params.slug);

const getDetail = async () => {
  try {
    loading.value = true;
    const res = await axios.get('/api/articles/by-slug/' + slug.value);
    article.value = res.data.data || res.data;
  } catch (err) {
    console.error(err);
    openModalInfo({ message: "Gagal memuat detail berita", type: "error" });
  } finally {
    loading.value = false;
  }
};

const getOtherNews = async () => {
  try {
    loadingOtherNews.value = true;
    const res = await axios.get('/api/articles?limit=5');
    let list = res.data?.data?.data || res.data?.data || [];
    // filter out current article
    if (article.value) {
      list = list.filter(item => item.id !== article.value.id);
    }
    otherNews.value = list.slice(0, 4);
  } catch (err) {
    console.error(err);
  } finally {
    loadingOtherNews.value = false;
  }
};

const goToOtherNews = (otherSlug) => {
  slug.value = otherSlug;
  router.push(`/kelola-berita/${otherSlug}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  getDetail().then(() => {
    getOtherNews();
  });
};

const formatDate = (dateStr) => {
  if(!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
};

const goBack = () => {
  router.push('/kelola-berita');
};

const handleEdit = () => {
  if(article.value) {
    router.push(`/kelola-berita/edit/${article.value.id}`);
  }
};

onMounted(() => {
  if (slug.value) {
    getDetail().then(() => {
      getOtherNews();
    });
  }
});
</script>

<style scoped>
/* Typography improvements for professional news */
.font-serif-like {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
:deep(.prose) {
  font-size: 1rem;
}
@media (min-width: 1024px) {
  :deep(.prose) {
    font-size: 1.125rem; /* 18px */
  }
}
:deep(.prose img) {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
}
@media (min-width: 1024px) {
  :deep(.prose img) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
:deep(.prose p) {
  margin-bottom: 1.5em;
  color: #374151; /* neutral-700 */
}
:deep(.prose h2) {
  font-weight: 800;
  margin-top: 2em;
  color: #111827;
}
</style>
