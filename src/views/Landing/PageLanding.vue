<template>
  <div class="font-sans text-gray-900 overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <AboutSection id="tentang" />
    <NewsSection id="berita" />
    <EventsSection id="kegiatan" />
    <FooterLegal />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import NewsSection from './components/NewsSection.vue'
import EventsSection from './components/EventsSection.vue'
import FooterLegal from './components/FooterLegal.vue'
</script>

<style scoped>
/* optional custom styles */
</style>
