<template>
  <nav class="dash-navbar" :class="{ 'dash-navbar--scrolled': isScrolled }">
    <div class="dash-navbar__container">
      <div class="dash-navbar__logo" @click="scrollTo('top')">
        <div class="dash-navbar__logo-icon">OH</div>
        <span class="dash-navbar__logo-text">Organisasi <span class="dash-navbar__logo-accent">Hub</span></span>
      </div>

      <div class="dash-navbar__menu">
        <a href="#fitur" @click.prevent="scrollTo('fitur')" class="dash-navbar__link">Fitur</a>
        <a href="#berita" @click.prevent="scrollTo('berita')" class="dash-navbar__link">Berita</a>
        <a href="#kegiatan" @click.prevent="scrollTo('kegiatan')" class="dash-navbar__link">Kegiatan</a>
        <a href="#kontak" @click.prevent="scrollTo('kontak')" class="dash-navbar__link">Kontak</a>
      </div>

      <div class="dash-navbar__actions">
        <!-- <button @click="goToLogin" class="dash-navbar__btn dash-navbar__btn--ghost">Masuk</button> -->
        <button @click="goToRegister" class="dash-navbar__btn dash-navbar__btn--primary">Mulai Sekarang</button>
      </div>

      <button class="dash-navbar__toggle" @click="mobileOpen = !mobileOpen" aria-label="Menu">
        <svg v-if="!mobileOpen" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        <svg v-else width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>

    <transition name="mobile-menu">
      <div v-if="mobileOpen" class="dash-navbar__mobile">
        <a href="#fitur" @click.prevent="scrollTo('fitur'); mobileOpen=false" class="dash-navbar__mobile-link">Fitur</a>
        <a href="#berita" @click.prevent="scrollTo('berita'); mobileOpen=false" class="dash-navbar__mobile-link">Berita</a>
        <a href="#kegiatan" @click.prevent="scrollTo('kegiatan'); mobileOpen=false" class="dash-navbar__mobile-link">Kegiatan</a>
        <a href="#kontak" @click.prevent="scrollTo('kontak'); mobileOpen=false" class="dash-navbar__mobile-link">Kontak</a>
        <div class="dash-navbar__mobile-actions">
          <!-- <button @click="goToLogin" class="dash-navbar__btn dash-navbar__btn--ghost dash-navbar__btn--full">Masuk</button> -->
          <button @click="goToRegister" class="dash-navbar__btn dash-navbar__btn--primary dash-navbar__btn--full">Mulai Sekarang</button>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const isScrolled = ref(false)
const mobileOpen = ref(false)
function handleScroll() { isScrolled.value = window.scrollY > 30 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
function scrollTo(id) {
  mobileOpen.value = false
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const el = document.getElementById(id)
  if (el) { window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }) }
}
function goToLogin() { router.push({ name: 'login' }) }
function goToRegister() { router.push({ name: 'register' }) }
</script>

<style scoped>
.dash-navbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
  padding: 16px 0; transition: all .35s cubic-bezier(.4,0,.2,1);
  background: transparent;
}
.dash-navbar--scrolled {
  background: rgba(255,255,255,.92); backdrop-filter: blur(16px);
  padding: 10px 0; box-shadow: 0 1px 20px rgba(0,0,0,.06);
}
.dash-navbar__container {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  display: flex; align-items: center; justify-content: space-between;
}
.dash-navbar__logo { display: flex; align-items: center; gap: 10px; cursor: pointer; }
.dash-navbar__logo-icon {
  width: 40px; height: 40px; background: linear-gradient(135deg, #396fef, #5b8af5);
  border-radius: 12px; display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 800; font-size: 14px; box-shadow: 0 4px 14px rgba(57,111,239,.3);
}
.dash-navbar__logo-text { font-size: 22px; font-weight: 800; color: #1e293b; letter-spacing: -.5px; }
.dash-navbar__logo-accent { color: #396fef; }
.dash-navbar__menu { display: flex; gap: 32px; }
.dash-navbar__link {
  color: #64748b; font-size: 14px; font-weight: 600; text-decoration: none;
  transition: color .2s; position: relative;
}
.dash-navbar__link:hover { color: #396fef; }
.dash-navbar__link::after {
  content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 2px;
  background: #396fef; border-radius: 2px; transition: width .25s;
}
.dash-navbar__link:hover::after { width: 100%; }
.dash-navbar__actions { display: flex; gap: 12px; }
.dash-navbar__btn {
  padding: 10px 22px; border-radius: 12px; font-size: 14px; font-weight: 700;
  cursor: pointer; border: none; transition: all .25s;
}
.dash-navbar__btn--ghost {
  background: transparent; color: #475569; border: 1px solid #e2e8f0;
}
.dash-navbar__btn--ghost:hover { background: #f8fafc; color: #1e293b; }
.dash-navbar__btn--primary {
  background: #396fef; color: #fff; box-shadow: 0 4px 14px rgba(57,111,239,.25);
}
.dash-navbar__btn--primary:hover { background: #2a5bd4; transform: translateY(-1px); }
.dash-navbar__btn--full { width: 100%; text-align: center; }
.dash-navbar__toggle {
  display: none; background: none; border: 1px solid #e2e8f0;
  border-radius: 10px; padding: 8px; color: #475569; cursor: pointer;
}
.dash-navbar__mobile {
  display: none; background: #fff; padding: 24px 24px 24px;
  flex-direction: column; gap: 4px; border-top: 1px solid #f1f5f9;
  box-shadow: 0 10px 40px rgba(0,0,0,.08);
}
.dash-navbar__mobile-link {
  color: #475569; font-size: 15px; font-weight: 600; text-decoration: none;
  padding: 12px 0; border-bottom: 1px solid #f1f5f9; transition: color .2s;
}
.dash-navbar__mobile-link:hover { color: #396fef; }
.dash-navbar__mobile-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 12px; }
@media (max-width: 768px) {
  .dash-navbar__menu, .dash-navbar__actions { display: none; }
  .dash-navbar__toggle { display: flex; }
  .dash-navbar__mobile { display: flex; }
  .dash-navbar { background: rgba(255,255,255,.95); backdrop-filter: blur(12px); }
}
.mobile-menu-enter-active { transition: all .25s ease-out; }
.mobile-menu-leave-active { transition: all .2s ease-in; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-10px); }
</style>
