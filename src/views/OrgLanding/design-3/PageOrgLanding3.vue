<template>
  <div class="d3-wrapper">
    <!-- NAVBAR -->
    <nav class="d3-nav" :class="{ 'd3-nav--scrolled': isScrolled }">
      <div class="d3-nav__container">
        <a href="#" class="d3-brand">
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="d3-brand__logo-img" />
          <span class="d3-brand__text">{{ org.name }}</span>
        </a>
        <div class="d3-menu hidden md:flex">
          <a v-for="item in menu" :key="item.id" :href="item.href" class="d3-menu__link">{{ item.label }}</a>
        </div>
        <div class="d3-actions hidden md:flex">
          <button @click="$router.push({name:'login'})" class="d3-btn d3-btn--outline">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d3-btn d3-btn--primary">Bergabung</button>
        </div>
        <button class="d3-menu-btn md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="d3-mobile-menu" :class="{ 'd3-mobile-menu--open': mobileMenuOpen }">
        <a v-for="item in menu" :key="'mob-'+item.id" :href="item.href" class="d3-mobile-menu__link" @click="mobileMenuOpen = false">{{ item.label }}</a>
        <div class="d3-mobile-menu__actions">
          <button @click="$router.push({name:'login'})" class="d3-btn d3-btn--outline w-full">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d3-btn d3-btn--primary w-full">Bergabung</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="d3-hero" id="home">
      <div class="d3-hero__bg">
        <div class="d3-hero__shape d3-hero__shape--1"></div>
        <div class="d3-hero__shape d3-hero__shape--2"></div>
      </div>
      <div class="d3-hero__content">
        <div class="d3-badge">
          <span class="d3-badge__dot"></span>
          {{ org.tagline }}
        </div>
        <h1 class="d3-hero__title">
          Keluarkan <br>
          <span class="d3-text-gradient">Potensi</span> Bersama Kami.
        </h1>
        <p class="d3-hero__desc">{{ org.desc }}</p>
        <div class="d3-hero__cta">
          <a :href="waLink" target="_blank" class="d3-btn d3-btn--primary d3-btn--lg">Mulai Sekarang</a>
          <a :href="waLink" target="_blank" class="d3-btn d3-btn--outline d3-btn--lg">Pelajari Lebih</a>
        </div>
      </div>
      <div class="d3-hero__scroll">
        <span class="d3-hero__scroll-text">Scroll Down</span>
        <div class="d3-hero__scroll-line"></div>
      </div>
    </header>

    <!-- ABOUT -->
    <section class="d3-section" id="about">
      <div class="d3-container">
        <div class="d3-about-grid">
          <div class="d3-about__text">
            <h2 class="d3-section-title">Siapa Kami</h2>
            <p class="d3-section-desc">{{ org.about }}</p>
            <div class="d3-stats">
              <div v-for="stat in stats" :key="stat.label" class="d3-stat">
                <span class="d3-stat__val">{{ stat.value }}</span>
                <span class="d3-stat__label">{{ stat.label }}</span>
              </div>
            </div>
          </div>
          <div class="d3-about__image-wrapper">
             <img :src="org.aboutImage" alt="Tentang Kami" class="d3-about__image">
             <div class="d3-about__image-backdrop"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="d3-section d3-bg-darker" id="nilai" style="padding-top: 60px;">
      <div class="d3-container">
        <div class="d3-values-grid">
          <div v-for="(val, idx) in values" :key="val.title" class="d3-value-card" :style="getCardStyle(idx)">
            <div class="d3-value-icon" v-html="val.icon"></div>
            <h3 class="d3-value-title">{{ val.title }}</h3>
            <p class="d3-value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="d3-section" id="events">
      <div class="d3-container">
        <div class="d3-section-header">
          <h2 class="d3-section-title">Kegiatan</h2>
          <button class="d3-btn d3-btn--outline">Semua Kegiatan</button>
        </div>
        <div class="d3-events-list">
          <div v-for="event in events" :key="event.title" class="d3-event-row">
            <div class="d3-event-row__date">
              <span class="d3-event-row__day">{{ event.day }}</span>
              <span class="d3-event-row__month">{{ event.month }}</span>
            </div>
            <div class="d3-event-row__details">
              <h3 class="d3-event-row__title">{{ event.title }}</h3>
              <p class="d3-event-row__meta">{{ event.place }} &bull; {{ event.tag }}</p>
            </div>
            <div class="d3-event-row__action">
              <button class="d3-btn d3-btn--primary">RSVP</button>
            </div>
          </div>
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

const news = ref([
  { title: 'Gen-Z Tech Summit 2026: Disrupting the Norm', cat: 'Event', date: 'Sep 10, 2026', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80' },
  { title: 'Launching Our Open Source AI Tools', cat: 'Release', date: 'Aug 22, 2026', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' },
  { title: 'Global Hackathon Winners Announced', cat: 'Competition', date: 'Aug 05, 2026', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' },
])

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
          img: n.thumbnail || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80',
        }));
      }
    } catch (e) {
      console.error(e)
    }
  }
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const menu = [
  { id: 'home', label: 'Beranda', href: '#home' },
  { id: 'about', label: 'Tentang', href: '#about' },
  { id: 'nilai', label: 'Nilai', href: '#nilai' },
  { id: 'events', label: 'Kegiatan', href: '#events' },
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
    heroImage: props.tenant?.websiteSetting?.heroImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    aboutImage: props.tenant?.websiteSetting?.aboutImage || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
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
    { value: '10K+', label: 'Active Members' },
    { value: '500+', label: 'Innovations' },
    { value: '25+', label: 'Global Chapters' },
  ];
})

const values = computed(() => {
  const customValues = props.tenant?.websiteSetting?.coreValues;
  if (customValues && customValues.length > 0) return customValues;
  return [
    { title: 'Disruption', desc: 'Challenging norms to find better, faster, and smarter ways.', icon: '<svg width="24" height="24" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
    { title: 'Inclusivity', desc: 'A safe space for every voice, background, and idea.', icon: '<svg width="24" height="24" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>' },
    { title: 'Action', desc: 'Less talk, more execution. We build what we envision.', icon: '<svg width="24" height="24" fill="none" stroke="#0ea5e9" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' },
  ];
})

const cardColors = [
  { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }, // blue
  { bg: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }, // purple
  { bg: 'rgba(234, 179, 8, 0.1)', color: '#facc15' },  // yellow
  { bg: 'rgba(34, 197, 94, 0.1)', color: '#4ade80' },  // green
  { bg: 'rgba(236, 72, 153, 0.1)', color: '#f472b6' }, // pink
  { bg: 'rgba(6, 182, 212, 0.1)', color: '#22d3ee' },  // cyan
];
const getCardStyle = (idx) => {
  const c = cardColors[idx % cardColors.length];
  return { '--val-bg': c.bg, '--val-color': c.color };
}

const events = [
  { day: '05', month: 'Nov', tag: 'Conference', title: 'Future Summit 2026', place: 'Main Convention Center' },
  { day: '18', month: 'Nov', tag: 'Hackathon', title: 'Code for Tomorrow', place: 'Tech Hub Arena' },
  { day: '02', month: 'Dec', tag: 'Social', title: 'End of Year Gala', place: 'The Grand Ballroom' },
]
</script>

<style scoped>
/* Bold & Vibrant Design - Dark Theme */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap');

.d3-wrapper {
  font-family: 'Outfit', sans-serif;
  color: #f8fafc;
  background-color: #020617; /* Slate 950 */
  overflow-x: hidden;
}

.d3-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
}

.d3-bg-darker { background-color: #0f172a; } /* Slate 900 */
.d3-text-center { text-align: center; }
.d3-mx-auto { margin-left: auto; margin-right: auto; }

/* Typography */
.d3-text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark), var(--color-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Buttons */
.d3-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 15px;
  transition: all 0.3s ease; cursor: pointer; border: 0.2px solid transparent;
  text-transform: uppercase; letter-spacing: 1px;
}
.d3-btn--primary {
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  color: white; box-shadow: 0 10px 25px -5px rgba(0,0,0, 0.4);
}
.d3-btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -5px rgba(0,0,0, 0.6);
}
.d3-btn--outline {
  background-color: transparent; border-color: #334155; color: #f8fafc;
}
.d3-btn--outline:hover {
  border-color: #f8fafc; background-color: rgba(255,255,255,0.05);
}
.d3-btn--lg { padding: 16px 36px; font-size: 16px; }

/* Nav */
.d3-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 24px 0; transition: all 0.3s ease; background-color: transparent;
}
.d3-nav--scrolled {
  background-color: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(12px);
  padding: 16px 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.d3-nav__container {
  max-width: 1140px; margin: 0 auto; padding: 0 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.d3-brand { text-decoration: none; display: flex; align-items: center; gap: 12px; }
.d3-brand__logo-img { max-height: 32px; max-width: 100px; object-fit: contain; }
.d3-brand__text { font-weight: 900; font-size: 24px; color: #f8fafc; letter-spacing: -1px; text-transform: uppercase;}
.d3-menu { display: flex; gap: 32px; }
.d3-menu__link {
  color: #cbd5e1; text-decoration: none; font-weight: 500; font-size: 15px;
  text-transform: uppercase; letter-spacing: 1px; transition: color 0.2s;
}
.d3-menu__link:hover { color: #f8fafc; }
.d3-actions { display: flex; gap: 16px; }
.d3-menu-btn { background: none; border: none; color: #f8fafc; cursor: pointer; }

/* Mobile Menu */
.d3-mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background-color: #0f172a; padding: 24px;
  display: flex; flex-direction: column; gap: 16px;
  opacity: 0; visibility: hidden; transform: translateY(-10px);
  transition: all 0.3s ease; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.d3-mobile-menu--open { opacity: 1; visibility: visible; transform: translateY(0); }
.d3-mobile-menu__link { color: #f8fafc; text-decoration: none; font-weight: 700; font-size: 18px; padding: 12px 0; text-transform: uppercase;}
.d3-mobile-menu__actions { display: flex; flex-direction: column; gap: 16px; margin-top: 16px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); }
.w-full { width: 100%; }

/* Utilities */
.hidden { display: none; }
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
}

/* Hero */
.d3-hero {
  position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 120px 24px; text-align: center; overflow: hidden;
}
.d3-hero__bg { position: absolute; inset: 0; z-index: 0; overflow: hidden;}
.d3-hero__shape { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.5; }
.d3-hero__shape--1 { width: 500px; height: 500px; background: var(--color-primary); top: -100px; left: -100px; }
.d3-hero__shape--2 { width: 600px; height: 600px; background: var(--color-primary-dark); bottom: -200px; right: -100px; }
.d3-hero__content { position: relative; z-index: 10; max-width: 800px; display: flex; flex-direction: column; align-items: center;}
.d3-badge {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 8px 20px; border-radius: 9999px; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1); font-size: 14px; font-weight: 700;
  text-transform: uppercase; letter-spacing: 2px; margin-bottom: 32px;
}
.d3-badge__dot { width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary); box-shadow: 0 0 10px var(--color-primary); }
.d3-hero__title {
  font-size: 60px; font-weight: 900; line-height: 1.1; color: #f8fafc;
  letter-spacing: -2px; margin-bottom: 24px; text-transform: uppercase;
}
@media (min-width: 768px) { .d3-hero__title { font-size: 64px; } }
.d3-hero__desc {
  font-size: 20px; color: #cbd5e1; line-height: 1.6; margin-bottom: 48px; max-width: 600px; font-weight: 400;
}
.d3-hero__cta { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
.d3-hero__scroll {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  display: flex; flex-direction: column; align-items: center; gap: 12px; z-index: 10;
}
.d3-hero__scroll-text { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: #94a3b8; }
.d3-hero__scroll-line { width: 2px; height: 40px; background: linear-gradient(to bottom, var(--color-primary), transparent); }

/* Sections */
.d3-section { padding: 80px 0; }
.d3-section-header { margin-bottom: 64px; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px;}
.d3-section-title { font-size: 48px; font-weight: 900; color: #f8fafc; text-transform: uppercase; letter-spacing: -1px; line-height: 1;}
.d3-section-desc { font-size: 18px; color: #94a3b8; margin-top: 16px; max-width: 500px; line-height: 1.6;}

/* About */
.d3-about-grid { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
@media (min-width: 992px) { .d3-about-grid { grid-template-columns: 1fr 1fr; } }
.d3-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; margin-top: 48px; }
.d3-stat { display: flex; flex-direction: column; }
.d3-stat__val { font-size: 48px; font-weight: 900; color: #f8fafc; line-height: 1; margin-bottom: 8px; }
.d3-stat__label { font-size: 14px; color: #94a3b8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;}
.d3-about__image-wrapper { position: relative; }
.d3-about__image { width: 100%; border-radius: 24px; position: relative; z-index: 2; filter: grayscale(20%) contrast(120%);}
.d3-about__image-backdrop {
  position: absolute; top: 30px; left: 30px; right: -30px; bottom: -30px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); border-radius: 24px; z-index: 1;
}

/* Values */
.d3-values-grid { display: grid; grid-template-columns: 1fr; gap: 32px; }
@media (min-width: 768px) { .d3-values-grid { grid-template-columns: repeat(3, 1fr); } }
.d3-value-card {
  background-color: #020617; padding: 32px; border-radius: 24px; border: 1px solid rgba(255,255,255,0.05);
  transition: all 0.3s ease;
}
.d3-value-card:hover { transform: translateY(-8px); border-color: var(--val-color); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
.d3-value-icon {
  width: 56px; height: 56px; border-radius: 16px; background-color: var(--val-bg); color: var(--val-color);
  display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
}
.d3-value-icon :deep(svg) { width: 28px; height: 28px; stroke: var(--val-color) !important; }
.d3-value-title { font-size: 20px; font-weight: 800; color: #f8fafc; margin-bottom: 12px; text-transform: uppercase;}
.d3-value-desc { font-size: 15px; color: #94a3b8; line-height: 1.6; }

/* Events */
.d3-events-list { display: flex; flex-direction: column; gap: 16px; }
.d3-event-row {
  display: flex; flex-direction: column; gap: 24px; padding: 32px; border-radius: 24px;
  background-color: #0f172a; border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease;
}
@media (min-width: 768px) {
  .d3-event-row { flex-direction: row; align-items: center; justify-content: space-between; }
}
.d3-event-row:hover { background-color: #1e293b; border-color: rgba(255,255,255,0.1); }
.d3-event-row__date { display: flex; flex-direction: column; width: 80px; }
.d3-event-row__day { font-size: 36px; font-weight: 900; line-height: 1; color: var(--color-primary); }
.d3-event-row__month { font-size: 14px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-top: 4px; }
.d3-event-row__details { flex: 1; }
.d3-event-row__title { font-size: 24px; font-weight: 800; color: #f8fafc; margin-bottom: 8px; }
.d3-event-row__meta { font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 500;}

/* Footer */
.d3-footer { padding: 80px 0 40px; background-color: #020617; border-top: 1px solid rgba(255,255,255,0.05);}
.d3-footer__inner { display: flex; flex-direction: column; gap: 40px; margin-bottom: 80px; }
@media (min-width: 768px) { .d3-footer__inner { flex-direction: row; justify-content: space-between; align-items: center; } }
.d3-footer__title { font-size: 32px; font-weight: 900; color: #f8fafc; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 12px;}
.d3-footer__desc { color: #94a3b8; font-size: 16px; max-width: 300px;}
.d3-footer__links { display: flex; gap: 32px; flex-wrap: wrap; }
.d3-footer__link { color: #f8fafc; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; transition: color 0.2s;}
.d3-footer__link:hover { color: var(--color-primary); }
.d3-footer__bottom { padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; color: #64748b; font-size: 14px;}
</style>
