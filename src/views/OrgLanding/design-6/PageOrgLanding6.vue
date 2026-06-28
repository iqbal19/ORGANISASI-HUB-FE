<template>
  <div class="d6-wrapper">
    <!-- BACKGROUND EFFECTS -->
    <div class="d6-bg-effects">
      <div class="d6-orb d6-orb--1"></div>
      <div class="d6-orb d6-orb--2"></div>
      <div class="d6-orb d6-orb--3"></div>
      <div class="d6-grid-overlay"></div>
    </div>

    <!-- NAVBAR -->
    <nav class="d6-nav" :class="{ 'd6-nav--scrolled': isScrolled }">
      <div class="d6-container d6-nav__inner">
        <a href="#" class="d6-brand">
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="d6-brand__logo" />
          <span class="d6-brand__text">{{ org.name }}</span>
        </a>
        <div class="d6-menu hidden md:flex">
          <a v-for="item in menu" :key="item.id" :href="item.href" class="d6-menu__link">{{ item.label }}</a>
        </div>
        <div class="d6-actions hidden md:flex">
          <button @click="$router.push({name:'login'})" class="d6-btn d6-btn--outline">Login</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d6-btn d6-btn--primary">Join Network</button>
        </div>
        <button class="d6-menu-btn md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="d6-mobile-menu" :class="{ 'd6-mobile-menu--open': mobileMenuOpen }">
        <a v-for="item in menu" :key="'mob-'+item.id" :href="item.href" class="d6-mobile-menu__link" @click="mobileMenuOpen = false">{{ item.label }}</a>
        <div class="d6-mobile-menu__actions">
          <button @click="$router.push({name:'login'})" class="d6-btn d6-btn--outline w-full">Login</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d6-btn d6-btn--primary w-full">Join Network</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="d6-hero" id="home">
      <div class="d6-container">
        <div class="d6-hero__content">
          <div class="d6-glass-badge">
            <span class="d6-badge-dot"></span> {{ org.tagline }}
          </div>
          <h1 class="d6-hero__title">
            Welcome To <br>
            <span class="d6-text-glow">{{org.name}}</span>
          </h1>
          <p class="d6-hero__desc">{{ org.desc }}</p>
          <div class="d6-hero__cta">
            <a :href="waLink" target="_blank" class="d6-btn d6-btn--primary d6-btn--lg">Initialize Connection</a>
            <a href="#about" class="d6-btn d6-btn--outline d6-btn--lg">Explore Core</a>
          </div>
        </div>
        
        <div class="d6-hero__visual mt-16">
          <div class="d6-glass-panel d6-hero__image-panel">
            <img :src="org.heroImage" alt="Tech Hub" class="d6-hero__image">
            <div class="d6-stats-overlay">
              <div v-for="stat in stats" :key="stat.label" class="d6-stat-card">
                <strong>{{ stat.value }}</strong>
                <span>{{ stat.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ABOUT -->
    <section class="d6-section" id="about">
      <div class="d6-container">
        <div class="d6-about__grid">
          <div class="d6-about__text">
            <h2 class="d6-section-title">System Overview</h2>
            <p class="d6-section-desc">{{ org.about }}</p>
          </div>
          <div class="d6-about__visual">
            <div class="d6-glass-panel">
              <img :src="org.aboutImage" alt="About" class="d6-about__image">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="d6-section" id="nilai">
      <div class="d6-container">
        <div class="d6-section-header text-center mx-auto max-w-2xl">
          <h2 class="d6-section-title">Core Protocols</h2>
          <p class="d6-section-desc">The fundamental principles that guide our ecosystem's growth and development.</p>
        </div>
        <div class="d6-values__grid">
          <div v-for="(val, idx) in values" :key="val.title" class="d6-glass-card">
            <div class="d6-value-icon" :style="getCardStyle(idx)">
              <div v-html="val.icon"></div>
            </div>
            <h3 class="d6-value-title">{{ val.title }}</h3>
            <p class="d6-value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="d6-section" id="events">
      <div class="d6-container">
        <div class="d6-section-header">
          <h2 class="d6-section-title">Runtime Events</h2>
        </div>
        <div class="d6-events__list">
          <div v-for="event in events" :key="event.title" class="d6-event-row d6-glass-panel">
            <div class="d6-event-row__date">
              <span class="d6-event-day">{{ event.day }}</span>
              <span class="d6-event-month">{{ event.month }}</span>
            </div>
            <div class="d6-event-row__details">
              <span class="d6-event-tag">{{ event.tag }}</span>
              <h3 class="d6-event-title">{{ event.title }}</h3>
              <p class="d6-event-meta">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ event.place }}
              </p>
            </div>
            <div class="d6-event-row__action">
              <button class="d6-btn d6-btn--outline">Execute RSVP</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS -->
    <section class="d6-section" id="news">
      <div class="d6-container">
        <div class="d6-section-header">
          <h2 class="d6-section-title">Latest Insights</h2>
        </div>
        <div class="d6-news__grid">
          <article v-for="item in news" :key="item.title" class="d6-news-card d6-glass-card">
            <div class="d6-news-card__visual">
              <img :src="item.img" :alt="item.title">
            </div>
            <div class="d6-news-card__content">
              <div class="d6-news-card__meta">
                <span class="d6-news-card__category">{{ item.cat }}</span>
                <span class="d6-news-card__date">{{ item.date }}</span>
              </div>
              <h3 class="d6-news-card__title">{{ item.title }}</h3>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="d6-footer d6-glass-panel">
      <div class="d6-container">
        <div class="d6-footer__grid">
          <div class="d6-footer__brand">
            <a href="#" class="d6-brand">
              <img v-if="org.logo" :src="org.logo" alt="Logo" class="d6-brand__logo" />
              <span class="d6-brand__text">{{ org.name }}</span>
            </a>
            <p class="d6-footer__desc">{{ org.address }}</p>
          </div>
          <div class="d6-footer__links">
            <div class="d6-footer__nav-group">
              <h4>Directory</h4>
              <a v-for="item in menu" :key="'foot-'+item.id" :href="item.href">{{ item.label }}</a>
            </div>
            <div class="d6-footer__nav-group">
              <h4>Protocols</h4>
              <router-link to="/terms">Terms of Service</router-link>
              <router-link to="/privacy">Privacy Policy</router-link>
              <a :href="waLink" target="_blank">Comm Link</a>
            </div>
          </div>
        </div>
        <div class="d6-footer__bottom">
          <p>&copy; {{ new Date().getFullYear() }} {{ org.name }}. System by <a href="/">OrganisasiHub</a>.</p>
          <div class="d6-footer__socials">
            <a v-if="socials.instagram" :href="socials.instagram" target="_blank"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
            <a v-if="socials.twitter" :href="socials.twitter" target="_blank"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>
            <a v-if="socials.linkedin" :href="socials.linkedin" target="_blank"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
          </div>
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
          cat: n.category?.name || 'Log',
          date: new Date(n.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
          img: n.thumbnail || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
        }));
      }
    } catch (e) {
      console.error(e)
    }
  }
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const menu = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'nilai', label: 'Values', href: '#nilai' },
  { id: 'events', label: 'Events', href: '#events' },
  { id: 'news', label: 'Insights', href: '#news' },
]

const props = defineProps(['tenant'])
const org = computed(() => {
  return {
    name: props.tenant?.websiteSetting?.siteName || props.tenant?.name || 'TechNexus',
    logo: props.tenant?.logo || null,
    tagline: props.tenant?.websiteSetting?.tagline || 'v2.0.26',
    desc: props.tenant?.websiteSetting?.metaDescription || 'An open-source collective engineering the next generation of decentralized infrastructure and digital communities.',
    about: props.tenant?.websiteSetting?.about || 'TechNexus was compiled with a single purpose: to unite developers, designers, and visionaries in building sustainable technology. Our infrastructure is powered by collaboration, driven by data, and secured by community consensus.',
    address: props.tenant?.websiteSetting?.contactInfo?.address || 'Node 01: Cyber Park, Block C',
    heroImage: props.tenant?.websiteSetting?.heroImage || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    aboutImage: props.tenant?.websiteSetting?.aboutImage || 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80'
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
    { value: '10K+', label: 'Active Nodes' },
    { value: '99.9%', label: 'Uptime' },
    { value: '500+', label: 'Commits/Day' },
  ];
})

const values = computed(() => {
  const customValues = props.tenant?.websiteSetting?.coreValues;
  if (customValues && customValues.length > 0) return customValues;
  return [
    { title: 'Open Source', desc: 'Code belongs to everyone. Transparency is our default state.', icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>' },
    { title: 'Decentralization', desc: 'Distributing power to eliminate single points of failure.', icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>' },
    { title: 'Scalability', desc: 'Building systems designed to grow exponentially.', icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>' },
  ];
})

const cardColors = [
  { bg: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' },
  { bg: 'rgba(16, 185, 129, 0.1)', color: '#34d399' },
  { bg: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa' },
];
const getCardStyle = (idx) => {
  const c = cardColors[idx % cardColors.length];
  return { '--v-bg': c.bg, '--v-color': c.color };
}

const events = [
  { day: '01', month: 'OCT', tag: 'Hackathon', title: 'Web3 Builder Weekend', place: 'Discord Server 1' },
  { day: '15', month: 'OCT', tag: 'AMA', title: 'Core Devs Ask Me Anything', place: 'Twitch TV' },
  { day: '30', month: 'NOV', tag: 'Conference', title: 'Global Decentralization Summit', place: 'Neo-Tokyo VR' },
]

const news = ref([
  { title: 'Release Notes: Mainnet Upgrade v2.1', cat: 'Release', date: 'Sep 12, 2026', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80' },
  { title: 'New Security Protocols Implemented', cat: 'Security', date: 'Aug 28, 2026', img: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80' },
  { title: 'Community Governance Vote Results', cat: 'Governance', date: 'Jul 15, 2026', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

.d6-wrapper {
  font-family: 'Space Grotesk', sans-serif;
  color: #e2e8f0;
  background-color: #0f172a;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

/* Background Effects */
.d6-bg-effects {
  position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
}
.d6-orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; }
.d6-orb--1 { width: 600px; height: 600px; background: var(--color-primary); top: -200px; left: -200px; }
.d6-orb--2 { width: 500px; height: 500px; background: #8b5cf6; bottom: -100px; right: -100px; }
.d6-orb--3 { width: 400px; height: 400px; background: #06b6d4; top: 40%; left: 30%; }
.d6-grid-overlay {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black, transparent 80%);
  -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
}

.d6-container {
  max-width: 1200px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 10;
}

/* Glassmorphism Classes */
.d6-glass-panel {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
}
.d6-glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
}

.d6-text-glow {
  color: #fff;
  text-shadow: 0 0 20px var(--color-primary);
}

/* Buttons */
.d6-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 15px;
  cursor: pointer; transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 1px;
  text-decoration: none;
}
.d6-btn--primary {
  background: var(--color-primary);
  color: white; border: 1px solid var(--color-primary-light);
  box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.4);
}
.d6-btn--primary:hover {
  background: var(--color-primary-dark);
  box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.6);
  transform: translateY(-2px);
}
.d6-btn--outline {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}
.d6-btn--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}
.d6-btn--lg { padding: 14px 32px; font-size: 16px; }

/* Nav */
.d6-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 24px 0; transition: all 0.3s ease; border-bottom: 1px solid transparent;
}
.d6-nav--scrolled {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.d6-nav__inner { display: flex; justify-content: space-between; align-items: center; }
.d6-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.d6-brand__logo { max-height: 32px; max-width: 120px; object-fit: contain; }
.d6-brand__text { font-weight: 700; font-size: 22px; color: #fff; letter-spacing: 1px; text-transform: uppercase;}
.d6-menu { display: flex; gap: 32px; }
.d6-menu__link { color: #cbd5e1; text-decoration: none; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; transition: color 0.2s; }
.d6-menu__link:hover { color: #fff; text-shadow: 0 0 8px rgba(255,255,255,0.5);}
.d6-actions { display: flex; gap: 16px; }
.d6-menu-btn { background: none; border: none; color: #fff; cursor: pointer; }

/* Mobile Menu */
.d6-mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background: #0f172a; padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1);
  display: flex; flex-direction: column; gap: 16px;
  opacity: 0; visibility: hidden; transform: translateY(-10px);
  transition: all 0.3s ease;
}
.d6-mobile-menu--open { opacity: 1; visibility: visible; transform: translateY(0); }
.d6-mobile-menu__link { color: #fff; text-decoration: none; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; padding: 8px 0; }
.d6-mobile-menu__actions { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
.w-full { width: 100%; }
.hidden { display: none; }
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
}

/* Hero */
.d6-hero { padding: 160px 0 80px; text-align: center; }
.d6-hero__content { max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; }
.d6-glass-badge {
  display: inline-flex; align-items: center; gap: 10px;
  background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 16px; border-radius: 100px; font-size: 13px; font-weight: 600;
  text-transform: uppercase; letter-spacing: 2px; margin-bottom: 24px;
}
.d6-badge-dot { width: 8px; height: 8px; border-radius: 50%; background-color: var(--color-primary); box-shadow: 0 0 8px var(--color-primary); }
.d6-hero__title { font-size: 48px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 24px; text-transform: uppercase; letter-spacing: -1px;}
@media (min-width: 768px) { .d6-hero__title { font-size: 64px; } }
.d6-hero__desc { font-size: 18px; color: #94a3b8; line-height: 1.6; margin-bottom: 40px; }
.d6-hero__cta { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.d6-hero__visual { position: relative; margin-top: 64px; }
.d6-hero__image-panel { padding: 8px; position: relative; }
.d6-hero__image { width: 100%; height: 500px; object-fit: cover; border-radius: 16px; filter: contrast(110%) saturate(120%); }
.d6-stats-overlay {
  position: absolute; bottom: 20px; left: 20px; right: 20px;
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
}
.d6-stat-card {
  background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px;
  padding: 16px; text-align: center; display: flex; flex-direction: column;
}
@media (max-width: 640px) {
  .d6-stats-overlay { grid-template-columns: 1fr; position: static; margin-top: 16px; }
}
.d6-stat-card strong { font-size: 24px; font-weight: 700; color: #fff; }
.d6-stat-card span { font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-top: 4px;}

/* Sections */
.d6-section { padding: 100px 0; }
.d6-section-header { margin-bottom: 48px; }
.d6-section-title { font-size: 36px; font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: -1px;}
.d6-section-desc { font-size: 16px; color: #94a3b8; line-height: 1.6; margin-top: 16px; }

/* About */
.d6-about__grid { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
@media (min-width: 992px) { .d6-about__grid { grid-template-columns: 1fr 1fr; } }
.d6-feature-list { list-style: none; padding: 0; margin: 32px 0 0; display: flex; flex-direction: column; gap: 16px; }
.d6-feature-list li { display: flex; align-items: center; gap: 12px; color: #e2e8f0; font-size: 16px; font-weight: 500;}
.d6-feature-list svg { width: 24px; height: 24px; color: var(--color-primary); }
.d6-about__visual .d6-glass-panel { padding: 12px; }
.d6-about__image { width: 100%; border-radius: 12px; }

/* Values */
.d6-values__grid { display: grid; grid-template-columns: 1fr; gap: 24px; margin-top: 48px; }
@media (min-width: 768px) { .d6-values__grid { grid-template-columns: repeat(3, 1fr); } }
.d6-glass-card { padding: 32px; transition: transform 0.3s ease, border-color 0.3s ease; }
.d6-glass-card:hover { transform: translateY(-5px); border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.05); }
.d6-value-icon {
  width: 56px; height: 56px; border-radius: 12px; background: var(--v-bg); color: var(--v-color);
  display: flex; align-items: center; justify-content: center; margin-bottom: 24px;
}
.d6-value-title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 12px; }
.d6-value-desc { font-size: 15px; color: #94a3b8; line-height: 1.6; }

/* Events */
.d6-events__list { display: flex; flex-direction: column; gap: 16px; }
.d6-event-row { display: flex; flex-direction: column; gap: 24px; padding: 32px; transition: all 0.3s ease; }
@media (min-width: 768px) { .d6-event-row { flex-direction: row; align-items: center; justify-content: space-between; } }
.d6-event-row:hover { border-color: var(--color-primary); }
.d6-event-row__date { display: flex; flex-direction: column; text-align: center; width: 80px; }
.d6-event-day { font-size: 32px; font-weight: 700; color: #fff; line-height: 1; }
.d6-event-month { font-size: 14px; font-weight: 600; color: var(--color-primary); text-transform: uppercase; margin-top: 4px;}
.d6-event-row__details { flex: 1; }
.d6-event-tag { display: inline-block; font-size: 12px; font-weight: 600; color: #94a3b8; border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; margin-bottom: 12px; text-transform: uppercase;}
.d6-event-title { font-size: 22px; font-weight: 600; color: #fff; margin-bottom: 8px; }
.d6-event-meta { font-size: 14px; color: #94a3b8; display: flex; align-items: center; gap: 8px;}

/* News */
.d6-news__grid { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 768px) { .d6-news__grid { grid-template-columns: repeat(3, 1fr); } }
.d6-news-card { overflow: hidden; display: flex; flex-direction: column; padding: 0; }
.d6-news-card__visual { height: 200px; overflow: hidden; }
.d6-news-card__visual img { width: 100%; height: 100%; object-fit: cover; opacity: 0.8; transition: opacity 0.3s; }
.d6-news-card:hover .d6-news-card__visual img { opacity: 1; }
.d6-news-card__content { padding: 24px; }
.d6-news-card__meta { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 16px; font-weight: 600; text-transform: uppercase;}
.d6-news-card__category { color: var(--color-primary); }
.d6-news-card__date { color: #64748b; }
.d6-news-card__title { font-size: 18px; font-weight: 600; color: #fff; line-height: 1.5; }

/* Footer */
.d6-footer { margin-top: 60px; padding: 60px 0 40px; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.d6-footer__grid { display: grid; grid-template-columns: 1fr; gap: 40px; margin-bottom: 40px; }
@media (min-width: 768px) { .d6-footer__grid { grid-template-columns: 1fr 1fr; } }
.d6-footer__brand { max-width: 300px; }
.d6-footer__desc { margin-top: 16px; font-size: 14px; color: #94a3b8; line-height: 1.6; }
.d6-footer__links { display: flex; gap: 60px; flex-wrap: wrap; }
.d6-footer__nav-group { display: flex; flex-direction: column; gap: 16px; }
.d6-footer__nav-group h4 { color: #fff; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
.d6-footer__nav-group a { color: #94a3b8; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.d6-footer__nav-group a:hover { color: #fff; }
.d6-footer__bottom { display: flex; flex-direction: column; gap: 24px; align-items: center; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 32px; font-size: 14px; color: #64748b;}
@media (min-width: 768px) { .d6-footer__bottom { flex-direction: row; justify-content: space-between; } }
.d6-footer__bottom a { color: #94a3b8; text-decoration: none; transition: color 0.2s;}
.d6-footer__bottom a:hover { color: #fff; }
.d6-footer__socials { display: flex; gap: 24px; }
</style>
