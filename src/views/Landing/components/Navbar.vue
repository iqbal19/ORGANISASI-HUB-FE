<template>
  <nav class="fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300" :class="[isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5']">
    <div class="max-w-7xl mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer relative z-[101]" @click="scrollTo('top')">
          <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-600/30">
            O
          </div>
          <span class="text-2xl font-extrabold tracking-tight" :class="[isScrolled ? 'text-neutral-900' : 'text-neutral-900']">
            Organisasi<span class="text-primary-600">Hub</span>
          </span>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-8">
          <a href="#tentang" @click.prevent="scrollTo('tentang')" class="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">Tentang Kami</a>
          <a href="#berita" @click.prevent="scrollTo('berita')" class="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">Berita</a>
          <a href="#kegiatan" @click.prevent="scrollTo('kegiatan')" class="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">Kegiatan</a>
          
          <div class="flex items-center gap-4 ml-4 pl-4 border-l border-neutral-200">
            <button @click="goToLogin" class="text-sm font-semibold text-neutral-600 hover:text-primary-600 transition-colors">Masuk</button>
            <button @click="goToRegister" class="px-5 py-2.5 bg-primary-600 text-white text-sm font-semibold rounded-xl shadow-md shadow-primary-600/20 hover:bg-primary-700 hover:-translate-y-0.5 transition-all duration-300">
              Daftar
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden relative z-[101] p-2.5 rounded-lg bg-white/50 backdrop-blur border border-neutral-200 text-neutral-800 hover:bg-neutral-100 transition-colors flex items-center justify-center shadow-sm" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle menu">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-xl py-4 px-6 flex flex-col space-y-4">
        <a href="#tentang" @click.prevent="scrollTo('tentang'); isMobileMenuOpen = false" class="text-neutral-600 font-medium hover:text-primary-600 py-2">Tentang Kami</a>
        <a href="#berita" @click.prevent="scrollTo('berita'); isMobileMenuOpen = false" class="text-neutral-600 font-medium hover:text-primary-600 py-2">Berita</a>
        <a href="#kegiatan" @click.prevent="scrollTo('kegiatan'); isMobileMenuOpen = false" class="text-neutral-600 font-medium hover:text-primary-600 py-2">Kegiatan</a>
        
        <div class="pt-4 mt-2 border-t border-neutral-100 flex flex-col gap-3">
          <button @click="goToLogin" class="w-full py-2.5 text-center font-semibold text-neutral-600 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">Masuk</button>
          <button @click="goToRegister" class="w-full py-2.5 text-center bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors">Daftar</button>
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
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const scrollTo = (id) => {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const el = document.getElementById(id)
  if (el) {
    const offset = 80 // height of navbar
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

const goToLogin = () => {
  router.push({ name: 'login' })
}

const goToRegister = () => {
  router.push({ name: 'register' })
}
</script>
