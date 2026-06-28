<template>
  <div class="d1">
    <!-- NAVBAR -->
    <nav class="d1-nav" :class="{ 'd1-nav--scrolled': scrolled }">
      <div class="d1-nav__inner">
        <div class="d1-nav__brand">
          <div class="d1-nav__logo">
            <img v-if="org.logo" :src="org.logo" alt="Logo" class="d1-nav__logo-img" />
            <svg v-else width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="var(--color-primary)"/>
              <path d="M8 16a8 8 0 0116 0" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
              <circle cx="16" cy="16" r="3" fill="#fff"/>
            </svg>
            <span class="d1-nav__name">{{ org.name }}</span>
          </div>
          <nav class="d1-nav__links">
            <a v-for="m in menu" :key="m.id" :href="'#'+m.id" class="d1-nav__link">{{ m.label }}</a>
          </nav>
        </div>
        <div class="d1-nav__cta">
          <button @click="$router.push({name:'login'})" class="d1-nav__login">Masuk</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d1-nav__register">Daftar Anggota</button>
        </div>
        <!-- Mobile toggle -->
        <button class="d1-nav__toggle" @click="mobileOpen=!mobileOpen">
          <svg v-if="!mobileOpen" width="22" height="22" fill="none" stroke="#1e293b" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          <svg v-else width="22" height="22" fill="none" stroke="#1e293b" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div v-if="mobileOpen" class="d1-nav__mobile">
        <a v-for="m in menu" :key="m.id" :href="'#'+m.id" @click="mobileOpen=false" class="d1-nav__mobile-link">{{ m.label }}</a>
        <button @click="$router.push({name:'AccountActivation'})" class="d1-nav__register d1-nav__register--full">Daftar Anggota</button>
      </div>
    </nav>

    <!-- HERO -->
    <section id="beranda" class="d1-hero">
      <div class="d1-hero__bg"></div>
      <div class="d1-hero__inner">
        <div class="d1-hero__text">
          <!-- <div class="d1-hero__eyebrow">Organisasi Resmi Terdaftar</div> -->
          <p class="d1-hero__tagline">{{ org.tagline }}</p>
          <p class="d1-hero__desc">{{ org.desc }}</p>
          <div class="d1-hero__actions">
            <a :href="waLink" target="_blank" class="d1-btn d1-btn--primary">Bergabung Sekarang</a>
            <a :href="waLink" target="_blank" class="d1-btn d1-btn--ghost">Pelajari Lebih</a>
          </div>
          <div class="d1-hero__meta">
            <div v-for="s in stats" :key="s.label" class="d1-hero__meta-item">
              <strong>{{ s.value }}</strong><span>{{ s.label }}</span>
            </div>
          </div>
        </div>
        <div class="d1-hero__visual">
          <img :src="org.heroImage" alt="Hero Organisasi" class="d1-hero__img"/>
          <div class="d1-hero__badge d1-hero__badge--1">
            <svg width="18" height="18" fill="none" stroke="#16a34a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            <span>Organisasi Terverifikasi</span>
          </div>
        </div>
      </div>
    </section>

    <!-- TENTANG -->
    <section id="tentang" class="d1-about">
      <div class="d1-about__inner">
        <div class="d1-about__img-wrap">
          <img :src="org.aboutImage" alt="Tentang Kami"/>
        </div>
        <div class="d1-about__content">
          <div class="d1-section-label">Tentang Kami</div>
          <h1 class="d1-section-title">{{ org.name }}</h1>
          <p>{{ org.about }}</p>
        </div>
      </div>
    </section>

    <!-- NILAI ORGANISASI -->
    <section id="nilai" class="d1-values-section">
      <div class="d1-values-section__inner">
        <div class="d1-section-header" style="text-align: center;">
          <div class="d1-section-label">Nilai Organisasi</div>
        </div>
        <div class="d1-values-grid">
          <div v-for="(v, idx) in values" :key="v.title" class="d1-value-card" :style="getCardStyle(idx)">
            <div class="d1-value-icon" v-html="v.icon"></div>
            <h3 class="d1-value-title">{{ v.title }}</h3>
            <p class="d1-value-desc">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- KEGIATAN -->
    <section id="kegiatan" class="d1-events">
      <div class="d1-events__inner">
        <div class="d1-section-header">
          <div class="d1-section-label">Agenda</div>
          <h2 class="d1-section-title">Kegiatan Mendatang</h2>
        </div>
        <div class="d1-events__grid">
          <div v-for="e in events" :key="e.title" class="d1-event-card">
            <div class="d1-event-card__date">
              <span>{{ e.day }}</span>
              <small>{{ e.month }}</small>
            </div>
            <div class="d1-event-card__info">
              <div class="d1-event-card__tag" :style="{background:e.bg, color:e.color}">{{ e.tag }}</div>
              <h3>{{ e.title }}</h3>
              <p>{{ e.place }}</p>
            </div>
            <button class="d1-btn d1-btn--sm">Daftar</button>
          </div>
        </div>
      </div>
    </section>

    <!-- BERITA -->
    <section id="berita" class="d1-news">
      <div class="d1-news__inner">
        <div class="d1-section-header">
          <div class="d1-section-label">Berita</div>
          <h2 class="d1-section-title">Kabar Terkini</h2>
        </div>
        <div class="d1-news__grid">
          <article v-for="n in news" :key="n.title" class="d1-news-card">
            <img :src="n.img" :alt="n.title"/>
            <div class="d1-news-card__body">
              <span class="d1-news-card__cat">{{ n.cat }}</span>
              <h3>{{ n.title }}</h3>
              <p>{{ n.date }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <footer class="bg-neutral-900 text-neutral-400 py-16 px-8 border-t border-neutral-800">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <!-- Brand Info -->
          <div class="md:col-span-2">
            <div class="flex items-center gap-3 mb-6">
              <img v-if="org.logo" :src="org.logo" alt="Logo" class="d1-nav__logo-img" />
              <span class="text-2xl font-bold text-white tracking-tight">{{ org.name }}</span>
            </div>
            <p class="text-neutral-400 leading-relaxed max-w-sm mb-2">
              {{ org.tagline }}
            </p>
            <p class="mb-6">{{ org.address }}</p>
            <div class="flex gap-4">
              <!-- Social Icons -->
              <a v-if="socials.instagram" :href="socials.instagram" target="_blank" class="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors">
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
const scrolled = ref(false)
const mobileOpen = ref(false)
const handleScroll = () => { scrolled.value = window.scrollY > 30 }

onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const menu = [
  { id: 'home', label: 'Beranda', href: '#home' },
  { id: 'tentang', label: 'Tentang Kami', href: '#about' },
  // { id: 'nilai', label: 'Nilai', href: '#nilai' },
  { id: 'events', label: 'Agenda Kegiatan', href: '#events' },
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
    heroImage: props.tenant?.websiteSetting?.heroImage || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    aboutImage: props.tenant?.websiteSetting?.aboutImage || 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&w=800&q=80'
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
    { value: '1.240', label: 'Anggota Aktif' },
    { value: '14', label: 'Tahun Berdiri' },
    { value: '62', label: 'Program Kerja' },
  ];
})

const values = computed(() => {
  const customValues = props.tenant?.websiteSetting?.coreValues;
  if (customValues && customValues.length > 0) return customValues;
  return [
    { title: 'Integritas', desc: 'Menjunjung tinggi kejujuran dan tanggung jawab.', icon: '<svg width="22" height="22" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' },
    { title: 'Kolaborasi', desc: 'Bekerja sama untuk mencapai tujuan bersama.', icon: '<svg width="22" height="22" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>' },
    { title: 'Inovasi', desc: 'Selalu terbuka terhadap ide dan cara baru.', icon: '<svg width="22" height="22" fill="none" stroke="var(--color-primary)" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
  ];
})
const events = [
  { day: '15', month: 'Jul', tag: 'Workshop', bg: 'var(--color-primary-light)', color: 'var(--color-primary)', title: 'Workshop AI & Machine Learning', place: 'Lab Komputer Lt.3' },
  { day: '22', month: 'Jul', tag: 'Sosial', bg: '#dcfce7', color: '#16a34a', title: 'Bakti Sosial Panti Asuhan Melati', place: 'Panti Asuhan Melati, Jakarta' },
  { day: '05', month: 'Ags', tag: 'Seminar', bg: '#fef3c7', color: '#d97706', title: 'Seminar Karir Teknologi 2026', place: 'Auditorium Utama' },
]
const news = ref([
  { title: 'Tim HIMASI Raih Juara 1 Hackathon Nasional', cat: 'Prestasi', date: '20 Jun 2026', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' },
  { title: 'Kegiatan Bersih Kota Sukses Digelar', cat: 'Sosial', date: '15 Jun 2026', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80' },
  { title: 'Pelantikan Pengurus Baru Periode 2026-2027', cat: 'Organisasi', date: '10 Jun 2026', img: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=600&q=80' },
])

const cardColors = [
  { bg: '#eff6ff', color: '#3b82f6' }, // blue
  { bg: '#f3e8ff', color: '#a855f7' }, // purple
  { bg: '#fef9c3', color: '#eab308' }, // yellow
  { bg: '#dcfce7', color: '#22c55e' }, // green
  { bg: '#fce7f3', color: '#ec4899' }, // pink
  { bg: '#cffafe', color: '#06b6d4' }, // cyan
];
const getCardStyle = (idx) => {
  const c = cardColors[idx % cardColors.length];
  return { '--val-bg': c.bg, '--val-color': c.color };
}

import axios from 'axios'

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
          img: n.thumbnail || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        }));
      }
    } catch (e) {
      console.error(e)
    }
  }
})
</script>

<style scoped>
.d1 { font-family: 'Inter', -apple-system, sans-serif; color: #1e293b; background: #fff; overflow-x: hidden; }

/* NAV */
.d1-nav { position: fixed; top:0; left:0; right:0; z-index:100; padding:14px 0; transition: all .3s; }
.d1-nav--scrolled { background: rgba(255,255,255,.95); backdrop-filter: blur(12px); box-shadow: 0 1px 20px rgba(0,0,0,.06); padding: 10px 0; }
.d1-nav__inner { max-width:1280px; margin:0 auto; padding:0 24px; display:flex; align-items:center; justify-content:space-between; }
.d1-nav__brand { display:flex; align-items:center; gap:36px; }
.d1-nav__logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.d1-nav__logo-img { max-height: 32px; max-width: 100px; object-fit: contain; }
.d1-nav__name { font-weight: 800; font-size: 20px; color: #1e293b; letter-spacing: -0.5px; }
.d1-nav__links { display:flex; gap:28px; }
.d1-nav__link { color:#64748b; font-size:14px; font-weight:600; text-decoration:none; transition:color .2s; }
.d1-nav__link:hover { color:var(--color-primary); }
.d1-nav__cta { display:flex; gap:10px; }
.d1-nav__login { background:#f8fafc; border:1px solid #e2e8f0; color:#475569; font-size:14px; font-weight:600; padding:9px 18px; border-radius:10px; cursor:pointer; transition:all .2s; }
.d1-nav__login:hover { background:#f8fafc; }
.d1-nav__register { background:var(--color-primary); color:#fff; font-size:14px; font-weight:700; padding:9px 18px; border-radius:10px; border:none; cursor:pointer; transition:all .25s; box-shadow:0 4px 14px rgba(0,0,0,0.1); }
.d1-nav__register:hover { background:var(--color-primary-dark); transform:translateY(-1px); }
.d1-nav__register--full { width:100%; margin-top:8px; }
.d1-nav__toggle { display:none; background:none; border:1px solid #e2e8f0; border-radius:8px; padding:7px; cursor:pointer; }
.d1-nav__mobile { background:#fff; padding:16px 24px 24px; display:flex; flex-direction:column; gap:4px; border-top:1px solid #f1f5f9; box-shadow:0 8px 30px rgba(0,0,0,.06); }
.d1-nav__mobile-link { color:#475569; font-size:15px; font-weight:600; text-decoration:none; padding:11px 0; border-bottom:1px solid #f1f5f9; }

/* HERO */
.d1-hero { position:relative; min-height:100vh; display:flex; align-items:center; background:#f8fafc; padding:100px 0 60px; overflow:hidden; }
.d1-hero__bg { position:absolute; top:0; right:0; width:55%; height:100%; background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-primary) 100%); clip-path:polygon(15% 0,100% 0,100% 100%,0% 100%); }
.d1-hero__inner { max-width:1280px; margin:0 auto; padding:0 24px; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; width:100%; position:relative; z-index:2; }
.d1-hero__eyebrow { display:inline-flex; align-items:center; gap:8px; background:var(--color-primary-light); color:var(--color-primary); font-size:12px; font-weight:700; padding:5px 14px; border-radius:100px; margin-bottom:20px; text-transform:uppercase; letter-spacing:.5px; }
.d1-hero__title { font-size:46px; font-weight:900; color:#0f172a; line-height:1.1; letter-spacing:-1.5px; margin-bottom:14px; }
.d1-hero__tagline { font-size:46px; font-weight:700; color:var(--color-primary); margin-bottom: 12px;}
.d1-hero__desc { font-size:16px; color:#64748b; line-height:1.7; margin-bottom:32px; max-width:440px; }
.d1-hero__actions { display:flex; gap:12px; margin-bottom:40px; flex-wrap:wrap; }
.d1-hero__meta { display:flex; gap:32px; }
.d1-hero__meta-item { display:flex; flex-direction:column; }
.d1-hero__meta-item strong { font-size:26px; font-weight:800; color:#0f172a; }
.d1-hero__meta-item span { font-size:12px; color:#94a3b8; font-weight:500; }
.d1-hero__visual { position:relative; }
.d1-hero__img { width:100%; height:420px; object-fit:cover; border-radius:24px; box-shadow:0 30px 80px rgba(0,0,0,.15); }
.d1-hero__badge { position:absolute; background:#fff; border-radius:14px; padding:12px 18px; box-shadow:0 8px 30px rgba(0,0,0,.1); display:flex; align-items:center; gap:10px; font-size:13px; font-weight:600; }
.d1-hero__badge--1 { bottom:-20px; left:-20px; color:#16a34a; }
.d1-hero__badge--2 { top:-20px; right:-10px; flex-direction:column; align-items:flex-start; gap:2px; }
.d1-hero__badge--2 strong { font-size:22px; font-weight:800; color:#0f172a; }
.d1-hero__badge--2 span { font-size:12px; color:#64748b; }

/* SHARED */
.d1-btn { display:inline-flex; align-items:center; gap:8px; padding:13px 26px; border-radius:12px; font-size:14px; font-weight:700; cursor:pointer; border:none; transition:all .25s; text-decoration:none; }
.d1-btn--primary { background:var(--color-primary); color:#fff; box-shadow:0 6px 20px rgba(0,0,0,.15); }
.d1-btn--primary:hover { background:var(--color-primary-dark); transform:translateY(-2px); }
.d1-btn--ghost { background:#fff; color:#475569; border:1px solid #e2e8f0; }
.d1-btn--ghost:hover { border-color:#cbd5e1; background:#f8fafc; }
.d1-btn--sm { padding:9px 18px; font-size:13px; background:var(--color-primary-light); color:var(--color-primary); border:1px solid var(--color-primary-light); border-radius:10px; cursor:pointer; font-weight:700; white-space:nowrap; transition:all .25s; }
.d1-btn--sm:hover { background:var(--color-primary); color:#fff; }
.d1-section-label { display:inline-block; background:var(--color-primary-light); color:var(--color-primary); font-size:12px; font-weight:700; padding:5px 14px; border-radius:100px; margin-bottom:14px; text-transform:uppercase; letter-spacing:.5px; }
.d1-section-title { font-size:34px; font-weight:800; color:#0f172a; letter-spacing:-1px; margin-bottom:16px; }
.d1-section-header { margin-bottom:40px; }

/* ABOUT */
.d1-about { padding:80px 0; background:#fff; }
.d1-about__inner { max-width:1280px; margin:0 auto; padding:0 24px; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
.d1-about__img-wrap img { width:100%; height:400px; object-fit:cover; border-radius:20px; }
.d1-about__content p { color:#64748b; line-height:1.7; margin-bottom:28px; }

/* VALUES */
.d1-values-section { padding:50px 0 80px; background:#f8fafc; }
.d1-values-section__inner { max-width:1280px; margin:0 auto; padding:0 24px; }
.d1-values-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.d1-value-card { background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:32px; transition:all .3s; }
.d1-value-card:hover { transform:translateY(-4px); box-shadow:0 12px 30px rgba(0,0,0,.06); border-color:var(--val-color); }
.d1-value-icon { width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; background-color:var(--val-bg); color:var(--val-color); margin-bottom:24px; }
.d1-value-icon :deep(svg) { width:24px; height:24px; stroke:var(--val-color) !important; }
.d1-value-title { font-size:18px; font-weight:800; color:#0f172a; margin-bottom:12px; }
.d1-value-desc { font-size:14px; color:#64748b; line-height:1.6; }

/* EVENTS */
.d1-events { padding:50px 0; background:#fff; }
.d1-events__inner { max-width:1280px; margin:0 auto; padding:0 24px; }
.d1-events__grid { display:flex; flex-direction:column; gap:14px; }
.d1-event-card { display:flex; align-items:center; gap:24px; background:#fff; border:1px solid #f1f5f9; border-radius:16px; padding:20px 24px; transition:all .3s; }
.d1-event-card:hover { border-color:var(--color-primary); box-shadow:0 8px 30px rgba(0,0,0,.06); transform:translateX(4px); }
.d1-event-card__date { width:64px; height:64px; background:var(--color-primary-light); border-radius:14px; display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; }
.d1-event-card__date span { font-size:24px; font-weight:800; color:var(--color-primary); line-height:1; }
.d1-event-card__date small { font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase; }
.d1-event-card__info { flex:1; }
.d1-event-card__tag { display:inline-block; font-size:11px; font-weight:700; padding:3px 10px; border-radius:6px; margin-bottom:6px; }
.d1-event-card__info h3 { font-size:16px; font-weight:700; color:#0f172a; margin-bottom:4px; }
.d1-event-card__info p { font-size:13px; color:#94a3b8; margin:0; }

/* NEWS */
.d1-news { padding:50px 0; background:#f8fafc; }
.d1-news__inner { max-width:1280px; margin:0 auto; padding:0 24px; }
.d1-news__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.d1-news-card { border-radius:16px; overflow:hidden; border:1px solid #f1f5f9; transition:all .3s; cursor:pointer; }
.d1-news-card:hover { transform:translateY(-5px); box-shadow:0 16px 40px rgba(0,0,0,.06); }
.d1-news-card img { width:100%; height:190px; object-fit:cover; }
.d1-news-card__body { padding:20px; }
.d1-news-card__cat { font-size:11px; font-weight:700; color:var(--color-primary); text-transform:uppercase; letter-spacing:.5px; }
.d1-news-card__body h3 { font-size:16px; font-weight:700; color:#0f172a; margin:8px 0 6px; line-height:1.4; }
.d1-news-card__body p { font-size:12px; color:#94a3b8; }

/* FOOTER */
.d1-footer { background:#0f172a; padding:40px 0; }
.d1-footer__inner { max-width:1280px; margin:0 auto; padding:0 24px; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:24px; }
.d1-footer__brand strong { color:#fff; font-size:16px; display:block; margin-bottom:4px; }
.d1-footer__brand p { color:rgba(255,255,255,.4); font-size:13px; margin-bottom:4px; max-width:300px; }
.d1-footer__contact { margin-top:12px; }
.d1-footer__contact p { color:rgba(255,255,255,.6); font-size:13px; margin-bottom:2px; }
.d1-footer__legal { text-align:right; }
.d1-footer__socials { display:flex; gap:16px; justify-content:flex-end; margin-bottom:12px; }
.d1-footer__socials a { color:var(--color-primary-light); font-size:13px; font-weight:600; text-decoration:none; }
.d1-footer__socials a:hover { color:#fff; }
.d1-footer__legal p { color:rgba(255,255,255,.3); font-size:13px; }
.d1-footer__legal a { color:var(--color-primary-light); }

@media (max-width: 768px) {
  .d1-nav__links, .d1-nav__cta { display:none; }
  .d1-nav__toggle { display:flex; }
  .d1-hero, .d1-about { padding-top:100px; }
  .d1-hero__inner, .d1-about__inner { grid-template-columns:1fr; }
  .d1-hero__bg { display:none; }
  .d1-hero__title { font-size:30px; }
  .d1-hero__visual { display:none; }
  .d1-values-grid { grid-template-columns:1fr; }
  .d1-news__grid { grid-template-columns:1fr; }
  .d1-footer__inner { flex-direction:column; text-align:center; }
}
</style>
