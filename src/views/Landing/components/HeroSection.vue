<template>
  <section class="relative bg-white overflow-hidden min-h-[90vh] flex items-center pt-32 pb-20">
    <!-- Background Decorators -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-gradient-to-br from-primary-50 via-white to-neutral-100 rounded-full opacity-50 blur-3xl -z-10 pointer-events-none"></div>
    <div class="absolute -top-20 -right-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
    <div class="absolute top-40 -left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-8 w-full grid md:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div class="text-left space-y-8 relative z-10 animate-fade-in">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-600 text-sm font-semibold tracking-wide">
          <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
          Platform Organisasi Digital
        </div>
        
        <h1 class="text-5xl md:text-6xl font-extrabold text-neutral-900 leading-tight tracking-tight">
          Sinergi Nyata, <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
            Dampak Tanpa Batas
          </span>
        </h1>
        
        <p class="text-lg text-neutral-600 leading-relaxed max-w-lg">
          Bergabunglah dengan ribuan anggota lainnya dalam membangun ekosistem komunitas yang modern, transparan, dan berdampak sosial tinggi.
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button @click="goToRegister" class="px-8 py-3.5 bg-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-600/30 hover:bg-primary-700 hover:shadow-primary-600/50 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
            Daftar Sekarang
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
          <button class="px-8 py-3.5 bg-white text-neutral-700 font-semibold rounded-xl border border-neutral-200 shadow-sm hover:bg-neutral-50 hover:border-neutral-300 transition-all duration-300">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>

      <!-- Image/Visual -->
      <div class="relative z-10 hidden md:block">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Kolaborasi Organisasi" class="w-full h-[500px] object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <!-- Floating Glassmorphism Badge -->
        <div class="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
          <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <div>
            <p class="text-sm text-neutral-500 font-medium">Anggota Aktif</p>
            <p class="text-xl font-bold text-neutral-900">10,000+</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToRegister() {
  router.push({ name: 'register' })
}
</script>

<style>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-bounce-slow {
  animation: bounceSlow 3s infinite ease-in-out;
}
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>

<style scoped>
/* optional extra styling */
</style>
