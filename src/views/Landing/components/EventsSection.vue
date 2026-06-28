<template>
  <section class="py-24 px-8 bg-white relative overflow-hidden">
    <!-- Decorative element -->
    <div class="absolute right-0 top-0 w-1/3 h-full bg-primary-50 -z-10 transform skew-x-12 translate-x-20"></div>

    <div class="max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Agenda & Kegiatan</h2>
        <p class="text-lg text-neutral-600 leading-relaxed">
          Jangan lewatkan berbagai kegiatan menarik yang akan diselenggarakan oleh organisasi.
        </p>
      </div>

      <div class="grid gap-6 max-w-5xl mx-auto">
        <!-- Event Card 1 -->
        <div class="bg-white border border-neutral-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-center gap-6 group">
          <div class="flex-shrink-0 w-full sm:w-32 h-32 bg-primary-50 rounded-xl flex flex-col items-center justify-center text-primary-600 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
            <span class="text-sm font-semibold uppercase tracking-wider">Ags</span>
            <span class="text-4xl font-black">12</span>
          </div>
          
          <div class="flex-grow text-center sm:text-left">
            <div class="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full mb-2">Sosial</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">Kegiatan Sosial Bantuan Daerah Terpencil</h3>
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-neutral-500">
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 08:00 - 15:00 WIB</span>
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Desa Suka Maju</span>
            </div>
          </div>

          <div class="w-full sm:w-auto">
            <button class="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors duration-300">
              Daftar Event
            </button>
          </div>
        </div>

        <!-- Event Card 2 -->
        <div class="bg-white border border-neutral-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row items-center gap-6 group">
          <div class="flex-shrink-0 w-full sm:w-32 h-32 bg-primary-50 rounded-xl flex flex-col items-center justify-center text-primary-600 border border-primary-100 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
            <span class="text-sm font-semibold uppercase tracking-wider">Sep</span>
            <span class="text-4xl font-black">20</span>
          </div>
          
          <div class="flex-grow text-center sm:text-left">
            <div class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-2">Pelatihan</div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">Pelatihan Kepemimpinan Anggota Muda</h3>
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-neutral-500">
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 09:00 - Selesai</span>
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Aula Serbaguna Pusat</span>
            </div>
          </div>

          <div class="w-full sm:w-auto">
            <button class="w-full sm:w-auto px-6 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-primary-600 transition-colors duration-300">
              Daftar Event
            </button>
          </div>
        </div>

      </div>
      
      <div class="text-center mt-10">
        <button class="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors">
          Lihat Kalender Lengkap
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped></style>
