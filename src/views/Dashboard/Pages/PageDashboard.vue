<template>
  <div class="page-dashboard">
    <DashNavbar />
    <DashHero />
    <DashFeatures />
    <DashNews />
    <DashEvents />
    <DashFooter />
  </div>
</template>

<script setup>
import DashNavbar from '../Components/DashNavbar.vue'
import DashHero from '../Components/DashHero.vue'
import DashFeatures from '../Components/DashFeatures.vue'
import DashNews from '../Components/DashNews.vue'
import DashEvents from '../Components/DashEvents.vue'
import DashFooter from '../Components/DashFooter.vue'
</script>

<style scoped>
.page-dashboard {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1e293b;
  background: #fff;
  overflow-x: hidden;
}
</style>
