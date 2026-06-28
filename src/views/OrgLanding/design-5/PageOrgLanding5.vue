<template>
  <div class="d5-wrapper">
    <!-- NAVBAR -->
    <nav class="d5-nav" :class="{ 'd5-nav--scrolled': isScrolled }">
      <div class="d5-container d5-nav__inner">
        <a href="#" class="d5-brand">
          <img v-if="org.logo" :src="org.logo" alt="Logo" class="d5-brand__logo" />
          <span class="d5-brand__text">{{ org.name }}</span>
        </a>
        <div class="d5-menu hidden md:flex">
          <a v-for="item in menu" :key="item.id" :href="item.href" class="d5-menu__link">{{ item.label }}</a>
        </div>
        <div class="d5-actions hidden md:flex">
          <button @click="$router.push({name:'login'})" class="d5-btn d5-btn--text">Log In</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d5-btn d5-btn--primary">Register</button>
        </div>
        <button class="d5-menu-btn md:hidden" @click="mobileMenuOpen = !mobileMenuOpen">
          <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <!-- Mobile Menu -->
      <div class="d5-mobile-menu" :class="{ 'd5-mobile-menu--open': mobileMenuOpen }">
        <a v-for="item in menu" :key="'mob-'+item.id" :href="item.href" class="d5-mobile-menu__link" @click="mobileMenuOpen = false">{{ item.label }}</a>
        <div class="d5-mobile-menu__actions">
          <button @click="$router.push({name:'login'})" class="d5-btn d5-btn--text w-full">Log In</button>
          <button @click="$router.push({name:'AccountActivation'})" class="d5-btn d5-btn--primary w-full">Register</button>
        </div>
      </div>
    </nav>

    <!-- HERO -->
    <header class="d5-hero" id="home">
      <div class="d5-container d5-hero__grid">
        <div class="d5-hero__content">
          <div class="d5-hero__eyebrow">
            <span class="d5-line"></span> {{ org.tagline }}
          </div>
          <h1 class="d5-hero__title">
            Empowering <br>
            <span class="d5-text-primary">Professionals</span>
          </h1>
          <p class="d5-hero__desc">{{ org.desc }}</p>
          <div class="d5-hero__cta">
            <a :href="waLink" target="_blank" class="d5-btn d5-btn--primary d5-btn--lg">Get Started</a>
            <a href="#about" class="d5-btn d5-btn--outline d5-btn--lg">Learn More</a>
          </div>
        </div>
        <div class="d5-hero__visual">
          <img :src="org.heroImage" alt="Hero" class="d5-hero__image">
          <div class="d5-hero__box"></div>
        </div>
      </div>
    </header>

    <!-- METRICS -->
    <section class="d5-metrics">
      <div class="d5-container">
        <div class="d5-metrics__inner">
          <div v-for="stat in stats" :key="stat.label" class="d5-metric">
            <div class="d5-metric__value">{{ stat.value }}</div>
            <div class="d5-metric__label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT -->
    <section class="d5-section" id="about">
      <div class="d5-container">
        <div class="d5-about__grid">
          <div class="d5-about__visual">
            <img :src="org.aboutImage" alt="About" class="d5-about__image">
          </div>
          <div class="d5-about__content">
            <h2 class="d5-section-title">About Our Organization</h2>
            <div class="d5-title-line"></div>
            <p class="d5-section-desc">{{ org.about }}</p>
            <button class="d5-btn d5-btn--outline mt-6">Read Our History</button>
          </div>
        </div>
      </div>
    </section>

    <!-- VALUES -->
    <section class="d5-section d5-bg-gray" id="nilai">
      <div class="d5-container">
        <div class="d5-section-header">
          <h2 class="d5-section-title">Core Values</h2>
          <div class="d5-title-line"></div>
        </div>
        <div class="d5-values__grid">
          <div v-for="val in values" :key="val.title" class="d5-value-card">
            <div class="d5-value-icon" v-html="val.icon"></div>
            <h3 class="d5-value-title">{{ val.title }}</h3>
            <p class="d5-value-desc">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="d5-section" id="events">
      <div class="d5-container">
        <div class="d5-section-header d5-flex-between">
          <div>
            <h2 class="d5-section-title">Upcoming Events</h2>
            <div class="d5-title-line"></div>
          </div>
          <button class="d5-btn d5-btn--text hidden md:inline-flex">View All Events &rarr;</button>
        </div>
        <div class="d5-events__list">
          <div v-for="event in events" :key="event.title" class="d5-event-row">
            <div class="d5-event-row__date">
              <span class="d5-event-month">{{ event.month }}</span>
              <span class="d5-event-day">{{ event.day }}</span>
            </div>
            <div class="d5-event-row__details">
              <span class="d5-event-tag">{{ event.tag }}</span>
              <h3 class="d5-event-title">{{ event.title }}</h3>
              <p class="d5-event-meta">{{ event.place }}</p>
            </div>
            <div class="d5-event-row__action">
              <button class="d5-btn d5-btn--outline">Register</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NEWS -->
    <section class="d5-section d5-bg-gray" id="news">
      <div class="d5-container">
        <div class="d5-section-header">
          <h2 class="d5-section-title">Latest Insights</h2>
          <div class="d5-title-line"></div>
        </div>
        <div class="d5-news__grid">
          <article v-for="item in news" :key="item.title" class="d5-news-card">
            <div class="d5-news-card__visual">
              <img :src="item.img" :alt="item.title">
            </div>
            <div class="d5-news-card__content">
              <span class="d5-news-card__date">{{ item.date }}</span>
              <h3 class="d5-news-card__title">{{ item.title }}</h3>
              <a href="#" class="d5-news-card__link">Read Article &rarr;</a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="d5-footer">
      <div class="d5-container">
        <div class="d5-footer__top">
          <div class="d5-footer__brand">
            <a href="#" class="d5-brand">
              <img v-if="org.logo" :src="org.logo" alt="Logo" class="d5-brand__logo" />
              <span class="d5-brand__text">{{ org.name }}</span>
            </a>
            <p class="d5-footer__desc">{{ org.address }}</p>
          </div>
          <div class="d5-footer__navs">
            <div class="d5-footer__nav-group">
              <h4>Organization</h4>
              <a v-for="item in menu" :key="'foot-'+item.id" :href="item.href">{{ item.label }}</a>
            </div>
            <div class="d5-footer__nav-group">
              <h4>Legal & Support</h4>
              <router-link to="/terms">Terms of Service</router-link>
              <router-link to="/privacy">Privacy Policy</router-link>
              <a :href="waLink" target="_blank">Contact Us</a>
            </div>
          </div>
        </div>
        <div class="d5-footer__bottom">
          <p>&copy; {{ new Date().getFullYear() }} {{ org.name }}. Powered by <a href="/">OrganisasiHub</a>.</p>
          <div class="d5-footer__socials">
            <a v-if="socials.instagram" :href="socials.instagram" target="_blank">Instagram</a>
            <a v-if="socials.linkedin" :href="socials.linkedin" target="_blank">LinkedIn</a>
            <a v-if="socials.twitter" :href="socials.twitter" target="_blank">Twitter</a>
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
const handleScroll = () => { isScrolled.value = window.scrollY > 10 }

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  if (props.tenant?.id) {
    try {
      const res = await axios.get(`/api/public/articles?organizationId=${props.tenant.id}&limit=3`);
      const data = res.data?.data || res.data || [];
      if (data.length > 0) {
        news.value = data.map(n => ({
          title: n.title,
          cat: n.category?.name || 'News',
          date: new Date(n.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
          img: n.thumbnail || 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80',
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
    name: props.tenant?.websiteSetting?.siteName || props.tenant?.name || 'Corporate Alliance',
    logo: props.tenant?.logo || null,
    tagline: props.tenant?.websiteSetting?.tagline || 'Excellence in Action',
    desc: props.tenant?.websiteSetting?.metaDescription || 'A premier network of professionals dedicated to advancing industry standards through collaboration, education, and innovation.',
    about: props.tenant?.websiteSetting?.about || 'Founded with the mission to elevate professional standards, our organization serves as a central hub for industry leaders and aspiring professionals alike. We foster an environment of continuous learning, rigorous standards, and meaningful networking.',
    address: props.tenant?.websiteSetting?.contactInfo?.address || '100 Business Parkway, Suite 500, Cityville',
    heroImage: props.tenant?.websiteSetting?.heroImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    aboutImage: props.tenant?.websiteSetting?.aboutImage || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
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
    { value: '1,200+', label: 'Certified Members' },
    { value: '15', label: 'Years of Excellence' },
    { value: '48', label: 'Annual Publications' },
  ];
})

const values = computed(() => {
  const customValues = props.tenant?.websiteSetting?.coreValues;
  if (customValues && customValues.length > 0) return customValues;
  return [
    { title: 'Integrity', desc: 'Upholding the highest ethical standards in all professional endeavors.', icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' },
    { title: 'Excellence', desc: 'Committing to superior quality and continuous improvement.', icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>' },
    { title: 'Leadership', desc: 'Guiding the industry forward through thought leadership and innovation.', icon: '<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>' },
  ];
})

const events = [
  { day: '24', month: 'OCT', tag: 'Symposium', title: 'Annual Leadership Symposium 2026', place: 'Grand Hyatt Convention Center' },
  { day: '05', month: 'NOV', tag: 'Seminar', title: 'Navigating Regulatory Changes', place: 'Virtual Webinar' },
  { day: '12', month: 'DEC', tag: 'Networking', title: 'End-of-Year Executive Dinner', place: 'The Ritz-Carlton' },
]

const news = ref([
  { title: 'Quarterly Industry Report Released', cat: 'Publication', date: 'October 1, 2026', img: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=600&q=80' },
  { title: 'New Certification Standards for 2027', cat: 'Announcement', date: 'September 15, 2026', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
  { title: 'Highlights from the Global Summit', cat: 'Event Recap', date: 'August 30, 2026', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

.d5-wrapper {
  font-family: 'Inter', -apple-system, sans-serif;
  color: #111827;
  background-color: #ffffff;
  overflow-x: hidden;
  --d5-border: #e5e7eb;
}

h1, h2, h3, .d5-brand__text {
  font-family: 'Playfair Display', serif;
}

.d5-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
}

.d5-text-primary { color: var(--color-primary); }
.d5-bg-gray { background-color: #f9fafb; border-top: 1px solid var(--d5-border); border-bottom: 1px solid var(--d5-border); }
.d5-title-line { width: 40px; height: 2px; background-color: var(--color-primary); margin-top: 16px; }

/* Buttons */
.d5-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 24px; font-weight: 500; font-size: 14px; letter-spacing: 0.5px;
  cursor: pointer; transition: all 0.2s ease; border: 1px solid transparent; text-decoration: none;
}
.d5-btn--primary {
  background-color: #111827; color: white; border-color: #111827;
}
.d5-btn--primary:hover {
  background-color: var(--color-primary); border-color: var(--color-primary);
}
.d5-btn--outline {
  background-color: transparent; border-color: #d1d5db; color: #111827;
}
.d5-btn--outline:hover {
  border-color: #111827; background-color: #f9fafb;
}
.d5-btn--text { background: transparent; color: #4b5563; }
.d5-btn--text:hover { color: #111827; }
.d5-btn--lg { padding: 14px 32px; font-size: 15px; }

/* Nav */
.d5-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding: 24px 0; transition: all 0.3s ease; border-bottom: 1px solid transparent;
}
.d5-nav--scrolled {
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px); padding: 16px 0; border-bottom-color: var(--d5-border);
}
.d5-nav__inner { display: flex; justify-content: space-between; align-items: center; }
.d5-brand { display: flex; align-items: center; gap: 12px; text-decoration: none; }
.d5-brand__logo { max-height: 32px; max-width: 120px; object-fit: contain; }
.d5-brand__text { font-weight: 700; font-size: 22px; color: #111827; letter-spacing: -0.5px;}
.d5-menu { display: flex; gap: 32px; }
.d5-menu__link { color: #4b5563; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.d5-menu__link:hover { color: #111827; }
.d5-actions { display: flex; gap: 16px; }
.d5-menu-btn { background: none; border: none; color: #111827; cursor: pointer; }

/* Mobile Menu */
.d5-mobile-menu {
  position: absolute; top: 100%; left: 0; right: 0;
  background-color: white; padding: 24px 32px; border-bottom: 1px solid var(--d5-border);
  display: flex; flex-direction: column; gap: 16px;
  opacity: 0; visibility: hidden; transform: translateY(-10px);
  transition: all 0.3s ease;
}
.d5-mobile-menu--open { opacity: 1; visibility: visible; transform: translateY(0); }
.d5-mobile-menu__link { color: #111827; text-decoration: none; font-size: 16px; padding: 8px 0; border-bottom: 1px solid #f3f4f6;}
.d5-mobile-menu__actions { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; }
.w-full { width: 100%; }
.hidden { display: none; }
@media (min-width: 768px) {
  .md\:flex { display: flex; }
  .md\:hidden { display: none; }
  .md\:inline-flex { display: inline-flex; }
}

/* Hero */
.d5-hero { padding: 180px 0 100px; }
.d5-hero__grid { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
@media (min-width: 992px) { .d5-hero__grid { grid-template-columns: 1fr 1fr; } }
.d5-hero__eyebrow { display: flex; align-items: center; gap: 12px; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 24px; }
.d5-line { width: 24px; height: 1px; background-color: #9ca3af; }
.d5-hero__title { font-size: 56px; font-weight: 700; color: #111827; line-height: 1.1; margin-bottom: 24px; letter-spacing: -1px;}
@media (min-width: 768px) { .d5-hero__title { font-size: 72px; } }
.d5-hero__desc { font-size: 18px; color: #4b5563; line-height: 1.6; margin-bottom: 48px; max-width: 500px; font-weight: 400;}
.d5-hero__cta { display: flex; gap: 16px; flex-wrap: wrap; }
.d5-hero__visual { position: relative; padding: 20px 0 0 20px; }
.d5-hero__image { width: 100%; position: relative; z-index: 2; aspect-ratio: 4/5; object-fit: cover;}
.d5-hero__box { position: absolute; top: 0; left: 0; right: 20px; bottom: 20px; border: 1px solid #d1d5db; z-index: 1; }

/* Metrics */
.d5-metrics { border-top: 1px solid var(--d5-border); border-bottom: 1px solid var(--d5-border); }
.d5-metrics__inner { display: flex; flex-wrap: wrap; }
.d5-metric { flex: 1; min-width: 200px; padding: 40px 32px; border-right: 1px solid var(--d5-border); }
.d5-metric:last-child { border-right: none; }
@media (max-width: 768px) {
  .d5-metric { border-right: none; border-bottom: 1px solid var(--d5-border); padding: 30px 0;}
  .d5-metric:last-child { border-bottom: none; }
}
.d5-metric__value { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: #111827; margin-bottom: 8px; }
.d5-metric__label { font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 1px; }

/* Sections */
.d5-section { padding: 120px 0; }
.d5-section-header { margin-bottom: 64px; }
.d5-section-title { font-size: 36px; font-weight: 700; color: #111827; }
.d5-section-desc { font-size: 16px; color: #4b5563; line-height: 1.8; margin-top: 32px; }
.d5-flex-between { display: flex; justify-content: space-between; align-items: flex-end; }

/* About */
.d5-about__grid { display: grid; grid-template-columns: 1fr; gap: 60px; align-items: center; }
@media (min-width: 992px) { .d5-about__grid { grid-template-columns: 1fr 1fr; } }
.d5-about__visual { position: relative; }
.d5-about__image { width: 100%; aspect-ratio: 1; object-fit: cover; filter: grayscale(100%); transition: filter 0.5s; }
.d5-about__visual:hover .d5-about__image { filter: grayscale(0%); }

/* Values */
.d5-values__grid { display: grid; grid-template-columns: 1fr; gap: 40px; border-top: 1px solid var(--d5-border); padding-top: 40px;}
@media (min-width: 768px) { .d5-values__grid { grid-template-columns: repeat(3, 1fr); } }
.d5-value-card { padding-right: 24px; }
.d5-value-icon { width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; color: var(--color-primary); margin-bottom: 24px; border: 1px solid var(--d5-border); border-radius: 50%; }
.d5-value-title { font-size: 20px; font-weight: 700; color: #111827; margin-bottom: 16px; }
.d5-value-desc { font-size: 15px; color: #6b7280; line-height: 1.6; }

/* Events */
.d5-events__list { border-top: 1px solid var(--d5-border); }
.d5-event-row { display: flex; flex-direction: column; gap: 24px; padding: 40px 0; border-bottom: 1px solid var(--d5-border); transition: background-color 0.3s; }
@media (min-width: 768px) {
  .d5-event-row { flex-direction: row; align-items: center; justify-content: space-between; padding: 40px 24px; margin: 0 -24px;}
  .d5-event-row:hover { background-color: #f9fafb; }
}
.d5-event-row__date { display: flex; flex-direction: column; width: 80px; }
.d5-event-month { font-size: 13px; font-weight: 600; color: var(--color-primary); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
.d5-event-day { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: #111827; line-height: 1; }
.d5-event-row__details { flex: 1; }
.d5-event-tag { display: inline-block; font-size: 12px; color: #6b7280; border: 1px solid #d1d5db; padding: 2px 8px; border-radius: 4px; margin-bottom: 12px; }
.d5-event-title { font-size: 22px; font-weight: 600; color: #111827; margin-bottom: 8px; font-family: 'Inter', sans-serif;}
.d5-event-meta { font-size: 14px; color: #6b7280; }

/* News */
.d5-news__grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
@media (min-width: 768px) { .d5-news__grid { grid-template-columns: repeat(3, 1fr); } }
.d5-news-card { display: flex; flex-direction: column; gap: 24px; }
.d5-news-card__visual { aspect-ratio: 3/2; overflow: hidden; }
.d5-news-card__visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.d5-news-card:hover .d5-news-card__visual img { transform: scale(1.05); }
.d5-news-card__date { font-size: 13px; color: #6b7280; margin-bottom: 12px; display: block; }
.d5-news-card__title { font-size: 20px; font-weight: 600; color: #111827; line-height: 1.4; margin-bottom: 16px; font-family: 'Inter', sans-serif;}
.d5-news-card__link { font-size: 14px; font-weight: 500; color: var(--color-primary); text-decoration: none; transition: padding 0.3s; }
.d5-news-card:hover .d5-news-card__link { padding-left: 8px; }

/* Footer */
.d5-footer { background-color: #111827; color: #9ca3af; padding: 80px 0 40px; }
.d5-footer__top { display: flex; flex-direction: column; gap: 60px; margin-bottom: 80px; }
@media (min-width: 992px) {
  .d5-footer__top { flex-direction: row; justify-content: space-between; }
}
.d5-footer__brand { max-width: 300px; }
.d5-footer__brand .d5-brand__text { color: white; }
.d5-footer__desc { margin-top: 24px; font-size: 14px; line-height: 1.6; }
.d5-footer__navs { display: flex; gap: 60px; flex-wrap: wrap; }
.d5-footer__nav-group { display: flex; flex-direction: column; gap: 16px; }
.d5-footer__nav-group h4 { color: white; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
.d5-footer__nav-group a { color: #9ca3af; text-decoration: none; font-size: 14px; transition: color 0.2s; }
.d5-footer__nav-group a:hover { color: white; }
.d5-footer__bottom { display: flex; flex-direction: column; gap: 24px; align-items: center; border-top: 1px solid #374151; padding-top: 32px; font-size: 14px; }
@media (min-width: 768px) {
  .d5-footer__bottom { flex-direction: row; justify-content: space-between; }
}
.d5-footer__bottom a { color: white; text-decoration: none; }
.d5-footer__socials { display: flex; gap: 24px; }
.d5-footer__socials a { color: #9ca3af; text-decoration: none; text-transform: uppercase; font-size: 13px; letter-spacing: 1px; transition: color 0.2s;}
.d5-footer__socials a:hover { color: white; }
</style>
