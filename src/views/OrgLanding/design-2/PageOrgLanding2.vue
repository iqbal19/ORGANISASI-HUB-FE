<template>
  <div class="d2-wrapper">
    <!-- NAVBAR -->
    <nav class="d2-nav" :class="{ 'd2-nav--scrolled': isScrolled }">
      <div class="d2-nav__container">
        <a href="#" class="d2-brand">
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="d2-brand__logo-img" />
          <div v-else class="d2-brand__icon"></div>
          <span class="d2-brand__text">{{ org.name }}</span>
        </a>
        <div class="d2-menu hidden md:flex">
          <a v-for="item in menu" :key="item.id" :href="item.href" class="d2-menu__link">{{ item.label }}</a>
        </div>
        <div class="d2-actions hidden md:flex">
          <button @click="$router.push({name:'login'})" class="d2-btn d2-btn--text">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d2-btn d2-btn--primary">Bergabung</button>
        </div>
        <button class="d2-menu-btn md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="d2-mobile-menu" :class="{ 'd2-mobile-menu--open': mobileMenuOpen }">
        <a v-for="item in menu" :key="'mob-'+item.id" :href="item.href" class="d2-mobile-menu__link" @click="mobileMenuOpen = false">{{ item.label }}</a>
        <div class="d2-mobile-menu__actions">
          <button @click="$router.push({name:'login'})" class="d2-btn d2-btn--text w-full">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d2-btn d2-btn--primary w-full">Bergabung</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="d2-hero" id="home">
      <div class="d2-hero__content">
        <span class="d2-hero__subtitle">{{ org.tagline }}</span>
        <h1 class="d2-hero__title">Selamat Datang di <br> <span class="d2-text-emerald">{{ org.name }}</span></h1>
        <p class="d2-hero__desc">{{ org.desc }}</p>
        <div class="d2-hero__cta">
          <a :href="waLink" target="_blank" class="d2-btn d2-btn--primary d2-btn--lg">Bergabung Sekarang</a>
          <a :href="waLink" target="_blank" class="d2-btn d2-btn--outline d2-btn--lg">Pelajari Lebih</a>
        </div>
        <div class="d2-stats">
          <div v-for="stat in stats" :key="stat.label" class="d2-stat">
            <span class="d2-stat__val">{{ stat.value }}</span>
            <span class="d2-stat__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
      <div class="d2-hero__image-wrapper">
        <img :src="org.heroImage" alt="Team" class="d2-hero__image">
        <div class="d2-hero__image-accent"></div>
      </div>
    </header>

    <!-- ABOUT -->
    <section class="d2-section bg-gray-50" id="about">
      <div class="d2-container">
        <div class="d2-about-grid">
          <!-- <div class="d2-about__images">
            <img :src="org.aboutImage" class="d2-about__img-1" alt="Tentang 1">
            <img :src="org.heroImage" class="d2-about__img-2" alt="Tentang 2">
          </div> -->
          <div class="d2-hero__image-wrapper">
            <img :src="org.aboutImage" alt="Team" class="d2-hero__image">
            <div class="d2-hero__image-accent"></div>
          </div>
          <div class="d2-about__text">
            <h2 class="d2-section-title">Tentang Organisasi Kami</h2>
            <p class="d2-section-desc">{{ org.about }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="bg-gray-50 pb-16" id="nilai">
      <div class="d2-container">
        <div class="d2-values-grid">
          <div v-for="(val, idx) in values" :key="val.title" class="d2-value-card" :style="getCardStyle(idx)">
            <div class="d2-value-icon" v-html="val.icon"></div>
            <h4 class="d2-value-title">{{ val.title }}</h4>
            <p class="d2-value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="d2-section" id="events">
      <div class="d2-container">
        <div class="d2-section-header">
          <h2 class="d2-section-title">Kegiatan Mendatang</h2>
          <button class="d2-btn d2-btn--text">Lihat Semua &rarr;</button>
        </div>
        <div class="d2-events-grid">
          <div v-for="event in events" :key="event.title" class="d2-event-card">
            <div class="d2-event-card__date">
              <span class="d2-event-card__day">{{ event.day }}</span>
              <span class="d2-event-card__month">{{ event.month }}</span>
            </div>
            <div class="d2-event-card__content">
              <span class="d2-event-card__tag">{{ event.tag }}</span>
              <h3 class="d2-event-card__title">{{ event.title }}</h3>
              <p class="d2-event-card__meta">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ event.place }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS -->
    <section class="d2-section bg-gray-50" id="news">
      <div class="d2-container">
        <div class="d2-section-header">
          <h2 class="d2-section-title">Berita Terkini</h2>
          <button class="d2-btn d2-btn--text">Baca Lebih Lanjut &rarr;</button>
        </div>
        <div class="d2-news-grid">
          <article v-for="item in news" :key="item.title" class="d2-news-card">
            <div class="d2-news-card__image-wrapper">
              <img :src="item.img" :alt="item.title" class="d2-news-card__image">
            </div>
            <div class="d2-news-card__content">
              <div class="d2-news-card__meta">
                <span class="d2-news-card__category">{{ item.cat }}</span>
                <span class="d2-news-card__date">{{ item.date }}</span>
              </div>
              <h3 class="d2-news-card__title">{{ item.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-neutral-900 text-neutral-400 py-16 px-8 border-t border-neutral-800">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <!-- Brand Info -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img v-if="org.logo" :src="org.logo" alt="Logo" class="h-10 w-10" />
              <span class="text-2xl font-bold text-white tracking-tight">{{ org.name }}</span>
            </div>
            <p class="text-neutral-400 leading-relaxed max-w-sm mb-2">
              {{ org.tagline }}
            </p>
            <p class="mb-6">{{ org.address }}</p>
            <div class="flex gap-4">
              <!-- Social Icons -->
              <a v-if="socials.instagram" :href="socials.instagram" target="_blank" rel="noreferrer" class="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a v-if="socials.twitter" :href="socials.twitter" target="_blank" rel="noreferrer" class="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a v-if="socials.linkedin" :href="socials.linkedin" target="_blank" rel="noreferrer" class="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          <!-- Links 1 -->
          <div>
            <h4 class="text-white font-bold mb-6">Tautan Cepat</h4>
            <ul class="space-y-3 text-sm">
              <li v-for="item in menu" :key="'foot-'+item.id"><a :href="item.href" class="hover:text-primary-400 transition-colors">{{ item.label }}</a></li>
            </ul>
          </div>

          <!-- Links 2 -->
          <div>
            <h4 class="text-white font-bold mb-6">Legal & Bantuan</h4>
            <ul class="space-y-3 text-sm">
              <!-- <li><a href="#" class="hover:text-primary-400 transition-colors">Pusat Bantuan</a></li> -->
              <li><router-link to="/terms" class="hover:text-primary-400 transition-colors">Syarat & Ketentuan</router-link></li>
              <li><router-link to="/privacy" class="hover:text-primary-400 transition-colors">Kebijakan Privasi</router-link></li>
              <li><a :href="waLink" target="_blank" class="hover:text-primary-400 transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>
        </div>

        <div class="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500">
          <p>&copy; {{ new Date().getFullYear() }} {{ org.name }}. Dikelola oleh <a href="/">OrganisasiHub</a>.</p>
          <p class="mt-4 md:mt-0 flex items-center gap-1">
            Dibuat dengan <svg class="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> untuk komunitas
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import axios from 'axios'

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const handleScroll = () => { isScrolled.value = window.scrollY > 30 }

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const menu = [
  { id: 'home', label: 'Beranda', href: '#home' },
  { id: 'tentang', label: 'Tentang', href: '#about' },
  { id: 'nilai', label: 'Nilai', href: '#nilai' },
  { id: 'events', label: 'Kegiatan', href: '#events' },
  { id: 'berita', label: 'Berita', href: '#news' },
]

const props = defineProps(['tenant'])
const org = computed(() => {
  return {
    name: props.tenant?.websiteSetting?.siteName || props.tenant?.name || 'Organisasi Default',
    logo: props.tenant?.logo || null,
    tagline: props.tenant?.websiteSetting?.tagline || 'Tagline organisasi anda di sini',
    desc: props.tenant?.websiteSetting?.metaDescription || 'Deskripsi singkat mengenai organisasi ini.',
    about: props.tenant?.websiteSetting?.about || 'Deskripsi lengkap tentang organisasi ini akan ditampilkan di sini.',
    address: props.tenant?.websiteSetting?.contactInfo?.address || 'Alamat Organisasi',
    heroImage: props.tenant?.websiteSetting?.heroImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    aboutImage: props.tenant?.websiteSetting?.aboutImage || 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80'
  }
})

const contact = computed(() => props.tenant?.websiteSetting?.contactInfo || {})
const socials = computed(() => props.tenant?.websiteSetting?.socialMedia || {})

const waLink = computed(() => {
  const phone = contact.value?.phone || '';
  let formatted = phone.replace(/\D/g, '');
  if (formatted.startsWith('0')) {
    formatted = '62' + formatted.substring(1);
  }
  return formatted ? `https://wa.me/${formatted}` : '#';
});

const stats = computed(() => {
  const customStats = props.tenant?.websiteSetting?.stats;
  if (customStats && customStats.length > 0) return customStats;
  return [
    { value: '5K+', label: 'Members' },
    { value: '120+', label: 'Projects' },
    { value: '15+', label: 'Partners' },
  ];
})

const values = computed(() => {
  const customValues = props.tenant?.websiteSetting?.coreValues;
  if (customValues && customValues.length > 0) return customValues;
  return [
    { title: 'Creativity', desc: 'Pushing boundaries to craft unique and innovative solutions.', icon: '<svg width="24" height="24" fill="none" stroke="#047857" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
    { title: 'Community', desc: 'Building strong networks of like-minded individuals.', icon: '<svg width="24" height="24" fill="none" stroke="#047857" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>' },
    { title: 'Excellence', desc: 'Striving for the best quality in every endeavor.', icon: '<svg width="24" height="24" fill="none" stroke="#047857" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' },
  ];
})

const events = [
  { day: '12', month: 'Aug', tag: 'Workshop', title: 'Design Thinking Masterclass', place: 'Creative Hub Jakarta' },
  { day: '25', month: 'Aug', tag: 'Networking', title: 'Founders Meetup Q3', place: 'Kopi Kenangan Senopati' },
  { day: '10', month: 'Sep', tag: 'Exhibition', title: 'Digital Arts Showcase 2026', place: 'National Gallery' },
]

const news = ref([
  { title: 'Digital Art Exhibition 2026', cat: 'Event', date: 'Oct 12, 2026', img: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80' },
  { title: 'Tech Startup Incubator Program', cat: 'Program', date: 'Sep 28, 2026', img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=600&q=80' },
  { title: 'Creative Writing Workshop Series', cat: 'Workshop', date: 'Aug 15, 2026', img: 'https://images.unsplash.com/photo-1455390582262-044cdead27d1?auto=format&fit=crop&w=600&q=80' },
])

const cardColors = [
  { bg: '#eff6ff', color: '#3b82f6' },
  { bg: '#f3e8ff', color: '#a855f7' },
  { bg: '#fef9c3', color: '#eab308' },
  { bg: '#dcfce7', color: '#22c55e' },
  { bg: '#fce7f3', color: '#ec4899' },
  { bg: '#cffafe', color: '#06b6d4' },
];
const getCardStyle = (idx) => {
  const c = cardColors[idx % cardColors.length];
  return { '--val-bg': c.bg, '--val-color': c.color };
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  if (props.tenant?.id) {
    try {
      const res = await axios.get(`/api/public/articles?organizationId=${props.tenant.id}&limit=3`);
      const data = res.data?.data || res.data || [];
      if (data.length > 0) {
        news.value = data.map(n => ({
          title: n.title,
          cat: n.category?.name || 'Berita',
          date: new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          img: n.thumbnail || 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80',
        }));
      }
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<style scoped>
/* Modern Minimalist Design - Emerald Theme */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.d2-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #1f2937;
  background-color: #ffffff;
  overflow-x: hidden;
}

.d2-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.d2-text-emerald { color: var(--color-primary);; }
.bg-gray-50 { background-color: #f9fafb; }

/* Buttons */
.d2-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 15px;
  transition: all 0.2s ease; cursor: pointer; border: 1px solid transparent;
}
.d2-btn--primary { background-color: var(--color-primary); color: white; border: none; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
.d2-btn--primary:hover { background-color: var(--color-primary-dark); transform: translateY(-1px); }
.d2-btn--outline { background-color: transparent; border-color: #d1d5db; color: #4b5563; }
.d2-btn--outline:hover { border-color: var(--color-primary); color: var(--color-primary); }
.d2-btn--text {
  background-color: transparent; color: #4b5563; padding: 10px 16px;
}
.d2-btn--text:hover { color: #111827; background-color: #f3f4f6; }
.d2-btn--lg { padding: 14px 32px; font-size: 16px; }

/* Nav */
.d2-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 20px 0; transition: all 0.3s ease; background-color: transparent;
}
.d2-nav--scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  padding: 16px 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.d2-nav__container {
  max-width: 1200px; margin: 0 auto; padding: 0 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.d2-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.d2-brand__icon { width: 32px; height: 32px; background-color: var(--color-primary); border-radius: 8px; }
.d2-brand__logo-img { max-height: 32px; max-width: 100px; object-fit: contain; }
.d2-brand__text { font-weight: 800; font-size: 20px; color: #1e293b; letter-spacing: -0.5px; }
.d2-menu { display: flex; gap: 32px; }
.d2-menu__link {
  color: #4b5563; text-decoration: none; font-weight: 500; font-size: 15px;
  transition: color 0.2s;
}
.d2-menu__link:hover { color: var(--color-primary); }
.d2-actions { display: flex; gap: 16px; }
.d2-menu-btn { background: none; border: none; color: #111827; cursor: pointer; }

/* Mobile Menu */
.d2-mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background-color: white; padding: 20px 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  display: flex; flex-direction: column; gap: 16px;
  opacity: 0; visibility: hidden; transform: translateY(-10px);
  transition: all 0.3s ease;
}
.d2-mobile-menu--open { opacity: 1; visibility: visible; transform: translateY(0); }
.d2-mobile-menu__link { color: #1f2937; text-decoration: none; font-weight: 500; font-size: 16px; padding: 8px 0; }
.d2-mobile-menu__actions { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; padding-top: 16px; border-top: 1px solid #e5e7eb; }
.w-full { width: 100%; }

/* Utilities */
.hidden { display: none; }
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
}

/* Hero */
.d2-hero {
  padding: 160px 24px 80px; max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center;
}
@media (min-width: 992px) {
  .d2-hero { grid-template-columns: 1.1fr 0.9fr; padding-top: 120px; padding-bottom: 120px; }
}
.d2-hero__subtitle {
  display: inline-block; color: var(--color-primary); font-weight: 700; font-size: 14px;
  text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;
}
.d2-hero__title {
  font-size: 48px; font-weight: 800; line-height: 1.1; color: #111827;
  letter-spacing: -1.5px; margin-bottom: 24px;
}
@media (min-width: 768px) { .d2-hero__title { font-size: 64px; } }
.d2-hero__desc {
  font-size: 18px; color: #6b7280; line-height: 1.6; margin-bottom: 40px; max-width: 500px;
}
.d2-hero__cta { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }
.d2-stats { display: flex; gap: 40px; }
.d2-stat { display: flex; flex-direction: column; }
.d2-stat__val { font-size: 32px; font-weight: 800; color: #111827; line-height: 1; margin-bottom: 4px; }
.d2-stat__label { font-size: 14px; color: #6b7280; font-weight: 500; }
.d2-hero__image-wrapper { position: relative; }
.d2-hero__image { width: 100%; border-radius: 24px; position: relative; z-index: 2; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
.d2-hero__image-accent {
  position: absolute; top: 40px; left: -40px; right: 40px; bottom: -40px;
  background-color: var(--color-primary-light); border-radius: 24px; z-index: 1;
}

/* Sections */
.d2-section { padding: 60px 0; }
.d2-section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; flex-wrap: wrap; gap: 24px; }
.d2-section-title { font-size: 36px; font-weight: 800; color: #111827; letter-spacing: -1px; }
.d2-section-desc { font-size: 16px; color: #6b7280; line-height: 1.6; margin: 24px 0 40px; max-width: 600px; }

/* About */
.d2-about-grid { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
@media (min-width: 992px) { .d2-about-grid { grid-template-columns: 1fr 1fr; } }
.d2-about__images { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; position: relative; }
.d2-about__img-1 { width: 100%; border-radius: 16px; margin-top: 40px; }
.d2-about__img-2 { width: 100%; border-radius: 16px; margin-bottom: 40px; }
.d2-about__img-2 { width: 100%; border-radius: 16px; margin-bottom: 40px; }

/* Values */
.d2-values-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) { .d2-values-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .d2-values-grid { grid-template-columns: repeat(3, 1fr); } }
.d2-value-card { background: white; border: 1px solid #e5e7eb; border-radius: 16px; padding: 24px; transition: all 0.3s ease; }
.d2-value-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); border-color: var(--val-color); }
.d2-value-icon {
  width: 48px; height: 48px; border-radius: 12px; background-color: var(--val-bg); color: var(--val-color);
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.d2-value-icon :deep(svg) { width: 24px; height: 24px; stroke: var(--val-color) !important; }
.d2-value-title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 12px; }
.d2-value-desc { font-size: 15px; color: #6b7280; line-height: 1.5; margin: 0; }

/* Events */
.d2-events-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) { .d2-events-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .d2-events-grid { grid-template-columns: repeat(3, 1fr); } }
.d2-event-card {
  display: flex; gap: 24px; padding: 24px; border-radius: 16px; border: 1px solid #e5e7eb;
  background-color: white; transition: all 0.3s ease;
}
.d2-event-card:hover { border-color: var(--color-primary); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); transform: translateY(-4px); }
.d2-event-card__date {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  width: 70px; height: 70px; background-color: #f3f4f6; border-radius: 12px; flex-shrink: 0;
}
.d2-event-card:hover .d2-event-card__date { background-color: var(--color-primary); color: white; }
.d2-event-card__day { font-size: 24px; font-weight: 800; line-height: 1; color: inherit; }
.d2-event-card__month { font-size: 12px; font-weight: 600; text-transform: uppercase; color: inherit; margin-top: 4px; }
.d2-event-card__content { display: flex; flex-direction: column; justify-content: center; }
.d2-event-card__tag { font-size: 12px; font-weight: 600; color: var(--color-primary); margin-bottom: 8px; }
.d2-event-card__title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 8px; line-height: 1.3; }
.d2-event-card__meta { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6b7280; margin: 0; }

/* News */
.d2-news-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
@media (min-width: 768px) { .d2-news-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .d2-news-grid { grid-template-columns: repeat(3, 1fr); } }
.d2-news-card { border-radius: 16px; overflow: hidden; background-color: white; border: 1px solid #e5e7eb; transition: all 0.3s ease; }
.d2-news-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
.d2-news-card__image-wrapper { height: 240px; overflow: hidden; }
.d2-news-card__image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.d2-news-card:hover .d2-news-card__image { transform: scale(1.05); }
.d2-news-card__content { padding: 24px; }
.d2-news-card__meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 13px; font-weight: 500; }
.d2-news-card__category { color: var(--color-primary); }
.d2-news-card__date { color: #9ca3af; }
.d2-news-card__title { font-size: 20px; font-weight: 700; color: #111827; line-height: 1.4; margin: 0; }

/* Footer */
.d2-footer { padding: 80px 0 40px; border-top: 1px solid #e5e7eb; }
.d2-footer-content { display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px; }
@media (min-width: 768px) { .d2-footer-content { grid-template-columns: 2fr 1fr 1fr; } }
.d2-footer-brand { max-width: 300px; }
.d2-footer-title { font-size: 24px; font-weight: 800; color: #111827; margin-bottom: 16px; }
.d2-footer-desc { font-size: 14px; color: #6b7280; line-height: 1.6; margin: 0; }
.d2-footer-links { display: flex; flex-direction: column; gap: 16px; }
.d2-footer-link { color: #4b5563; text-decoration: none; font-weight: 500; transition: color 0.2s; }
.d2-footer-link:hover { color: var(--color-primary); }
.d2-footer-socials { display: flex; gap: 16px; }
.d2-social-icon {
  width: 40px; height: 40px; border-radius: 50%; background-color: #f3f4f6; color: #4b5563;
  display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700;
  text-decoration: none; transition: all 0.2s;
}
.d2-social-icon:hover { background-color: var(--color-primary); color: white; }
.d2-footer-bottom { padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 14px; color: #9ca3af; }
</style>
