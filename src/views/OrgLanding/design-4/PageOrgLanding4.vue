<template>
  <div class="d4-wrapper">
    <!-- NAVBAR -->
    <nav class="d4-nav" :class="{ 'd4-nav--scrolled': isScrolled }">
      <div class="d4-nav__container">
        <a href="#" class="d4-brand">
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="d4-brand__logo" />
          <span class="d4-brand_nav_text">{{ org.name }}</span>
        </a>
        <div class="d4-menu hidden md:flex">
          <a v-for="item in menu" :key="item.id" :href="item.href" class="d4-menu__link">{{ item.label }}</a>
        </div>
        <div class="d4-actions hidden md:flex">
          <button @click="$router.push({name:'login'})" class="d4-btn d4-btn--ghost">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d4-btn d4-btn--primary">Gabung</button>
        </div>
        <button class="d4-menu-btn md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="d4-mobile-menu" :class="{ 'd4-mobile-menu--open': mobileMenuOpen }">
        <a v-for="item in menu" :key="'mob-'+item.id" :href="item.href" class="d4-mobile-menu__link" @click="mobileMenuOpen = false">{{ item.label }}</a>
        <div class="d4-mobile-menu__actions">
          <button @click="$router.push({name:'login'})" class="d4-btn d4-btn--ghost w-full">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d4-btn d4-btn--primary w-full">Gabung Sekarang</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="d4-hero" id="home">
      <div class="d4-hero__blob d4-hero__blob--1"></div>
      <div class="d4-hero__blob d4-hero__blob--2"></div>
      <div class="d4-hero__container">
        <div class="d4-hero__text">
          <span class="d4-hero__tag">{{ org.tagline }}</span>
          <!-- <h1 class="d4-hero__title">Membangun <span class="d4-highlight">Kreativitas</span> Bersama-sama</h1> -->
          <h1 class="d4-hero__title"><span class="d4-highlight">{{ org.desc }}</span></h1>
          <div class="d4-hero__cta">
            <a :href="waLink" target="_blank" class="d4-btn d4-btn--primary d4-btn--lg">Ikut Serta</a>
            <a href="#about" class="d4-btn d4-btn--outline d4-btn--lg">Cari Tahu</a>
          </div>
          <div class="d4-hero__stats">
            <div v-for="stat in stats" :key="stat.label" class="d4-stat">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <div class="d4-hero__image-wrap">
          <img :src="org.heroImage" alt="Hero" class="d4-hero__image">
          <div class="d4-hero__floating-card">
            <div class="d4-floating-icon">👋</div>
            <div>
              <strong>Ayo Gabung!</strong>
              <span>Jadilah bagian dari kami</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ABOUT -->
    <section class="d4-section d4-bg-soft" id="about">
      <div class="d4-container">
        <div class="d4-about">
          <div class="d4-about__image-container">
            <img :src="org.aboutImage" alt="About" class="d4-about__image">
            <div class="d4-about__shape"></div>
          </div>
          <div class="d4-about__text">
            <div class="d4-section-label">Cerita Kami</div>
            <h2 class="d4-section-title">Kenal Lebih Dekat</h2>
            <p class="d4-section-desc">{{ org.about }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="d4-section" id="nilai">
      <div class="d4-container">
        <div class="d4-text-center">
          <div class="d4-section-label">Nilai Inti</div>
          <h2 class="d4-section-title">Apa yang Kami Percayai</h2>
        </div>
        <div class="d4-values-grid">
          <div v-for="(val, idx) in values" :key="val.title" class="d4-value-card" :style="getCardStyle(idx)">
            <div class="d4-value-icon" v-html="val.icon"></div>
            <h3 class="d4-value-title">{{ val.title }}</h3>
            <p class="d4-value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="d4-section d4-bg-soft" id="events">
      <div class="d4-container">
        <div class="d4-events-header">
          <div>
            <div class="d4-section-label">Agenda</div>
            <h2 class="d4-section-title">Seru-seruan Bareng</h2>
          </div>
          <button class="d4-btn d4-btn--outline hidden md:flex">Lihat Kalender</button>
        </div>
        <div class="d4-events-grid">
          <div v-for="event in events" :key="event.title" class="d4-event-card">
            <div class="d4-event-card__date">
              <strong>{{ event.day }}</strong>
              <span>{{ event.month }}</span>
            </div>
            <div class="d4-event-card__body">
              <span class="d4-event-card__tag">{{ event.tag }}</span>
              <h3>{{ event.title }}</h3>
              <p>{{ event.place }}</p>
            </div>
            <button class="d4-event-card__btn"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg></button>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS -->
    <section class="d4-section" id="news">
      <div class="d4-container">
        <div class="d4-text-center">
          <div class="d4-section-label">Pembaruan</div>
          <h2 class="d4-section-title">Ada Apa yang Baru?</h2>
        </div>
        <div class="d4-news-grid">
          <article v-for="item in news" :key="item.title" class="d4-news-card">
            <div class="d4-news-card__img-wrap">
              <img :src="item.img" :alt="item.title">
              <span class="d4-news-card__cat">{{ item.cat }}</span>
            </div>
            <div class="d4-news-card__content">
              <span class="d4-news-card__date">{{ item.date }}</span>
              <h3>{{ item.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="d4-footer">
      <div class="d4-container">
        <div class="d4-footer__grid">
          <div class="d4-footer__brand-col">
            <a href="#" class="d4-brand">
              <img v-if="org.logo" :src="org.logo" alt="Logo" class="d4-brand__logo" />
              <span class="d4-brand__text">{{ org.name }}</span>
            </a>
            <p class="d4-footer__desc">{{ org.tagline }}</p>
            <div class="d4-footer__socials">
              <a v-if="socials.instagram" :href="socials.instagram" target="_blank"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
              <a v-if="socials.twitter" :href="socials.twitter" target="_blank"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
              <a v-if="socials.linkedin" :href="socials.linkedin" target="_blank"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
            </div>
          </div>
          <div class="d4-footer__links-col">
            <h4>Navigasi</h4>
            <a v-for="item in menu" :key="'foot-'+item.id" :href="item.href">{{ item.label }}</a>
          </div>
          <div class="d4-footer__links-col">
            <h4>Bantuan & Legal</h4>
            <router-link to="/terms">Syarat & Ketentuan</router-link>
            <router-link to="/privacy">Kebijakan Privasi</router-link>
            <a :href="waLink" target="_blank">Hubungi Kami</a>
          </div>
          <div class="d4-footer__contact-col">
            <h4>Alamat</h4>
            <p>{{ org.address }}</p>
          </div>
        </div>
        <div class="d4-footer__bottom">
          <p>&copy; {{ new Date().getFullYear() }} {{ org.name }}. Dikelola oleh <a href="/">OrganisasiHub</a>.</p>
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
const handleScroll = () => { isScrolled.value = window.scrollY > 20 }

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  if (props.tenant?.id) {
    try {
      const res = await axios.get(`/api/public/articles?organizationId=${props.tenant.id}&limit=3`);
      const data = res.data?.data || res.data || [];
      if (data.length > 0) {
        news.value = data.map(n => ({
          title: n.title,
          cat: n.category?.name || 'Kabar',
          date: new Date(n.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
          img: n.thumbnail || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
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
  { id: 'events', label: 'Agenda', href: '#events' },
  { id: 'news', label: 'Pembaruan', href: '#news' },
]

const props = defineProps(['tenant'])
const org = computed(() => {
  return {
    name: props.tenant?.websiteSetting?.siteName || props.tenant?.name || 'Klub Kreatif',
    logo: props.tenant?.logo || null,
    tagline: props.tenant?.websiteSetting?.tagline || 'Kreasi Tanpa Batas',
    desc: props.tenant?.websiteSetting?.metaDescription || 'Wadah bagi anak muda untuk berkreasi, berbagi ide, dan berkolaborasi dalam berbagai project seru.',
    about: props.tenant?.websiteSetting?.about || 'Kami percaya bahwa setiap ide layak diwujudkan. Bergabunglah dengan ratusan anak muda kreatif lainnya yang siap mengubah dunia dengan cara yang menyenangkan.',
    address: props.tenant?.websiteSetting?.contactInfo?.address || 'Jl. Kreativitas No. 12, Jakarta',
    heroImage: props.tenant?.websiteSetting?.heroImage || 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?auto=format&fit=crop&w=800&q=80',
    aboutImage: props.tenant?.websiteSetting?.aboutImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80'
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
    { value: '5K+', label: 'Anggota Gaul' },
    { value: '250', label: 'Project Keren' },
    { value: '50', label: 'Mitra Belajar' },
  ];
})

const values = computed(() => {
  const customValues = props.tenant?.websiteSetting?.coreValues;
  if (customValues && customValues.length > 0) return customValues;
  return [
    { title: 'Bebas Berekspresi', desc: 'Kami mendukung ide-ide tergila sekalipun.', icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 2l3 7 7 1-5 5 1.5 7-6.5-3.5L5.5 22 7 15l-5-5 7-1 3-7z"/></svg>' },
    { title: 'Tumbuh Bersama', desc: 'Saling bantu dan kolaborasi untuk hasil maksimal.', icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>' },
    { title: 'Selalu Inovatif', desc: 'Pantang menyerah mencari solusi kekinian.', icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
  ];
})

const cardColors = [
  { bg: '#fef08a', color: '#854d0e' }, // yellow
  { bg: '#fbcfe8', color: '#be185d' }, // pink
  { bg: '#bfdbfe', color: '#1d4ed8' }, // blue
  { bg: '#bbf7d0', color: '#15803d' }, // green
  { bg: '#e9d5ff', color: '#7e22ce' }, // purple
];
const getCardStyle = (idx) => {
  const c = cardColors[idx % cardColors.length];
  return { '--v-bg': c.bg, '--v-color': c.color };
}

const events = [
  { day: '14', month: 'Feb', tag: 'Workshop', title: 'Art & Design Jam', place: 'Creative Space JKT' },
  { day: '21', month: 'Feb', tag: 'Meetup', title: 'Creator Gathering', place: 'Cafe Sebelah' },
  { day: '05', month: 'Mar', tag: 'Exhibition', title: 'Pameran Karya Muda', place: 'Galeri Nasional' },
]

const news = ref([
  { title: 'Sukses Menggelar Pameran Seni 2025', cat: 'Event', date: 'Jan 15, 2026', img: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80' },
  { title: 'Kolaborasi Bareng Seniman Lokal', cat: 'Update', date: 'Des 20, 2025', img: 'https://images.unsplash.com/photo-1529156069898-49953eb1b5ae?auto=format&fit=crop&w=600&q=80' },
  { title: 'Program Mentorship Gelombang 3 Dibuka!', cat: 'Info', date: 'Nov 10, 2025', img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');

.d4-wrapper {
  font-family: 'Quicksand', sans-serif;
  color: #334155;
  background-color: #ffffff;
  overflow-x: hidden;
}

.d4-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 24px;
}

.d4-bg-soft { background-color: #f8fafc; }
.d4-text-center { text-align: center; }
.d4-highlight {
  position: relative;
  display: inline;
  z-index: 1;
}
.d4-highlight::after {
  content: ''; position: absolute; bottom: 8px; left: -2px; right: -2px;
  height: 14px; background-color: var(--color-primary-light);
  z-index: -1; border-radius: 4px; transform: rotate(-1deg);
}

/* Buttons */
.d4-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 12px 28px; border-radius: 100px; font-weight: 700; font-size: 16px;
  cursor: pointer; border: 2px solid transparent; text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.d4-btn--primary {
  background-color: var(--color-primary); color: white;
  box-shadow: 0 8px 20px -6px var(--color-primary);
}
.d4-btn--primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 12px 25px -6px var(--color-primary);
}
.d4-btn--outline {
  background-color: transparent; border-color: var(--color-primary); color: var(--color-primary);
}
.d4-btn--outline:hover {
  background-color: var(--color-primary-light); color: var(--color-primary-dark);
}
.d4-btn--ghost { background: transparent; color: #475569; }
.d4-btn--ghost:hover { background: #f1f5f9; color: #0f172a; }
.d4-btn--lg { padding: 14px 34px; font-size: 17px; }

/* Nav */
.d4-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 24px 0; transition: all 0.3s ease;
}
.d4-nav--scrolled {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  padding: 14px 0;
  box-shadow: 0 4px 30px rgba(0,0,0,0.05);
}
.d4-nav__container {
  max-width: 1140px; margin: 0 auto; padding: 0 24px;
  display: flex; justify-content: space-between; align-items: center;
}
.d4-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.d4-brand__logo { max-height: 38px; max-width: 120px; object-fit: contain; }
.d4-brand__text { font-weight: 700; font-size: 22px; color: #0f172a; }
.d4-brand_nav_text { font-weight: 700; font-size: 22px; color: var(--color-primary); }
.d4-menu { display: flex; gap: 32px; }
.d4-menu__link {
  color: #64748b; text-decoration: none; font-weight: 700; font-size: 16px;
  transition: color 0.2s;
}
.d4-menu__link:hover { color: var(--color-primary); }
.d4-actions { display: flex; gap: 12px; }
.d4-menu-btn { background: none; border: none; color: #0f172a; cursor: pointer; }

/* Mobile Menu */
.d4-mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background-color: white; padding: 20px 24px 30px;
  display: flex; flex-direction: column; gap: 16px;
  opacity: 0; visibility: hidden; transform: translateY(-10px);
  transition: all 0.3s ease; border-radius: 0 0 24px 24px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}
.d4-mobile-menu--open { opacity: 1; visibility: visible; transform: translateY(0); }
.d4-mobile-menu__link { color: #334155; text-decoration: none; font-weight: 700; font-size: 18px; padding: 8px 0; }
.d4-mobile-menu__actions { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
.w-full { width: 100%; }
.hidden { display: none; }
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
}

/* Hero */
.d4-hero {
  position: relative; padding: 160px 0 80px; min-height: 100vh;
  display: flex; align-items: center; overflow: hidden;
}
.d4-hero__blob {
  position: absolute; filter: blur(60px); opacity: 0.5; border-radius: 50%; z-index: 0;
}
.d4-hero__blob--1 {
  width: 400px; height: 400px; background: var(--color-primary-light);
  top: -100px; right: -50px;
}
.d4-hero__blob--2 {
  width: 300px; height: 300px; background: #fef08a;
  bottom: -50px; left: -100px;
}
.d4-hero__container {
  max-width: 1140px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 2;
  display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center;
}
@media (min-width: 992px) { .d4-hero__container { grid-template-columns: 1.1fr 0.9fr; } }
.d4-hero__tag {
  display: inline-block; background-color: white; color: var(--color-primary);
  font-weight: 700; font-size: 14px; padding: 8px 20px; border-radius: 100px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 24px;
}
.d4-hero__title {
  font-size: 48px; font-weight: 700; color: #0f172a; line-height: 1.2; margin-bottom: 24px;
}
@media (min-width: 768px) { .d4-hero__title { font-size: 64px; } }
.d4-hero__desc {
  font-size: 18px; color: #64748b; line-height: 1.6; margin-bottom: 40px; max-width: 500px; font-weight: 500;
}
.d4-hero__cta { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }
.d4-hero__stats { display: flex; gap: 40px; }
.d4-stat { display: flex; flex-direction: column; }
.d4-stat strong { font-size: 32px; font-weight: 700; color: #0f172a; margin-bottom: 4px; }
.d4-stat span { font-size: 14px; color: #64748b; font-weight: 700; }
.d4-hero__image-wrap { position: relative; }
.d4-hero__image { width: 100%; border-radius: 40px; border: 8px solid white; box-shadow: 0 20px 50px rgba(0,0,0,0.1); transform: rotate(2deg); transition: transform 0.3s; }
.d4-hero__image:hover { transform: rotate(0deg); }
.d4-hero__floating-card {
  position: absolute; bottom: -20px; left: -30px; background: white; padding: 16px 24px;
  border-radius: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.12); display: flex; align-items: center; gap: 16px;
  animation: float 6s ease-in-out infinite;
}
@keyframes float { 0% {transform: translateY(0px);} 50% {transform: translateY(-10px);} 100% {transform: translateY(0px);} }
.d4-floating-icon { font-size: 32px; }
.d4-hero__floating-card strong { display: block; font-size: 16px; font-weight: 700; color: #0f172a; }
.d4-hero__floating-card span { font-size: 13px; color: #64748b; font-weight: 700; }

/* Sections */
.d4-section { padding: 100px 0; }
.d4-section-label { font-size: 16px; font-weight: 700; color: var(--color-primary); margin-bottom: 12px; }
.d4-section-title { font-size: 40px; font-weight: 700; color: #0f172a; margin-bottom: 24px; }
.d4-section-desc { font-size: 18px; color: #64748b; line-height: 1.6; font-weight: 500; }

/* About */
.d4-about { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
@media (min-width: 992px) { .d4-about { grid-template-columns: 1fr 1fr; } }
.d4-about__image-container { position: relative; }
.d4-about__image { width: 100%; border-radius: 120px 40px 120px 40px; position: relative; z-index: 2; box-shadow: 0 20px 50px rgba(0,0,0,0.1); }
.d4-about__shape { position: absolute; top: -20px; left: -20px; right: 20px; bottom: 20px; background: var(--color-primary-light); border-radius: 40px 120px 40px 120px; z-index: 1; }
.d4-about__text { padding-left: 20px; }

/* Values */
.d4-values-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-top: 60px; }
@media (min-width: 768px) { .d4-values-grid { grid-template-columns: repeat(3, 1fr); } }
.d4-value-card {
  background-color: var(--v-bg); padding: 40px 32px; border-radius: 32px; text-align: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.d4-value-card:hover { transform: translateY(-10px); }
.d4-value-icon { width: 64px; height: 64px; border-radius: 50%; background-color: white; color: var(--v-color); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
.d4-value-title { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
.d4-value-desc { font-size: 16px; color: #475569; font-weight: 500; line-height: 1.6; }

/* Events */
.d4-events-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 50px; }
.d4-events-grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) { .d4-events-grid { grid-template-columns: repeat(3, 1fr); } }
.d4-event-card {
  background: white; border-radius: 24px; padding: 24px; border: 2px solid #f1f5f9; display: flex; flex-direction: column; gap: 24px; transition: all 0.3s ease;
}
.d4-event-card:hover { border-color: var(--color-primary-light); box-shadow: 0 15px 35px rgba(0,0,0,0.05); }
.d4-event-card__date { display: inline-flex; align-items: center; gap: 8px; background: var(--color-primary-light); color: var(--color-primary-dark); padding: 8px 16px; border-radius: 100px; align-self: flex-start; }
.d4-event-card__date strong { font-size: 20px; line-height: 1; }
.d4-event-card__date span { font-size: 14px; font-weight: 700; text-transform: uppercase; }
.d4-event-card__body h3 { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
.d4-event-card__body p { font-size: 15px; color: #64748b; font-weight: 500; }
.d4-event-card__tag { display: inline-block; font-size: 13px; font-weight: 700; color: var(--color-primary); margin-bottom: 12px; }
.d4-event-card__btn { width: 48px; height: 48px; border-radius: 50%; background: #f8fafc; border: none; color: #0f172a; display: flex; align-items: center; justify-content: center; align-self: flex-end; cursor: pointer; transition: all 0.2s; }
.d4-event-card:hover .d4-event-card__btn { background: var(--color-primary); color: white; transform: scale(1.1); }

/* News */
.d4-news-grid { display: grid; grid-template-columns: 1fr; gap: 32px; margin-top: 50px; }
@media (min-width: 768px) { .d4-news-grid { grid-template-columns: repeat(3, 1fr); } }
.d4-news-card { border-radius: 24px; overflow: hidden; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.03); transition: transform 0.3s; cursor: pointer; }
.d4-news-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
.d4-news-card__img-wrap { position: relative; height: 220px; }
.d4-news-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.d4-news-card__cat { position: absolute; top: 16px; left: 16px; background: white; color: #0f172a; font-size: 13px; font-weight: 700; padding: 6px 12px; border-radius: 100px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.d4-news-card__content { padding: 24px; }
.d4-news-card__date { font-size: 14px; color: #94a3b8; font-weight: 700; margin-bottom: 8px; display: block; }
.d4-news-card__content h3 { font-size: 18px; font-weight: 700; color: #0f172a; line-height: 1.4; }

/* Footer */
.d4-footer { background-color: #0f172a; color: #94a3b8; padding: 80px 0 30px; border-top-left-radius: 60px; border-top-right-radius: 60px; margin-top: 40px; }
.d4-footer__grid { display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 60px; }
@media (min-width: 768px) { .d4-footer__grid { grid-template-columns: 2fr 1fr 1fr 1fr; } }
.d4-footer__brand-col { max-width: 320px; }
.d4-brand__text { color: white; }
.d4-footer__desc { font-size: 15px; line-height: 1.6; margin: 20px 0; }
.d4-footer__socials { display: flex; gap: 16px; }
.d4-footer__socials a { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; color: white; transition: all 0.2s; }
.d4-footer__socials a:hover { background: var(--color-primary); transform: scale(1.1); }
.d4-footer__links-col h4, .d4-footer__contact-col h4 { color: white; font-size: 18px; font-weight: 700; margin-bottom: 24px; }
.d4-footer__links-col a { display: block; color: #94a3b8; text-decoration: none; font-size: 15px; font-weight: 500; margin-bottom: 12px; transition: color 0.2s; }
.d4-footer__links-col a:hover { color: var(--color-primary-light); }
.d4-footer__contact-col p { font-size: 15px; line-height: 1.6; }
.d4-footer__bottom { text-align: center; padding-top: 30px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 14px; font-weight: 500; }
.d4-footer__bottom a { color: var(--color-primary-light); text-decoration: none; }
</style>
