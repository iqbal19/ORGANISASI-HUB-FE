<template>
  <section class="py-24 px-8 bg-neutral-50 relative">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12">
        <div class="max-w-2xl">
          <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight">Berita Terkini</h2>
          <p class="text-neutral-600 text-lg">Ikuti perkembangan terbaru dan pencapaian dari berbagai kegiatan organisasi kami di seluruh daerah.</p>
        </div>
        <button class="mt-6 md:mt-0 px-6 py-2.5 text-primary-600 font-semibold border-2 border-primary-100 hover:border-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300">
          Lihat Semua Berita
        </button>
      </div>

      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <!-- News Card 1 -->
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
          <div class="relative overflow-hidden h-56">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80" alt="Rapat Koordinasi" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg text-primary-700 shadow-sm">
              Organisasi
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center text-xs text-neutral-500 mb-3 space-x-4">
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> 24 Jun 2026</span>
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 3 min read</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">Rapat Koordinasi Nasional Membahas Strategi Tahunan</h3>
            <p class="text-sm text-neutral-600 line-clamp-3 mb-4 flex-grow">Pimpinan daerah dan pusat berkumpul untuk merumuskan langkah taktis dalam menghadapi tantangan organisasi di tahun mendatang.</p>
            <span class="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Baca Selengkapnya
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </div>
        </article>

        <!-- News Card 2 -->
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
          <div class="relative overflow-hidden h-56">
            <img src="https://images.unsplash.com/photo-1593113580436-5eb32ea510fb?auto=format&fit=crop&w=600&q=80" alt="Bantuan Sosial" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg text-primary-700 shadow-sm">
              Sosial
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center text-xs text-neutral-500 mb-3 space-x-4">
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> 20 Jun 2026</span>
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 2 min read</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">Distribusi Bantuan Sosial Tepat Sasaran di Wilayah Timur</h3>
            <p class="text-sm text-neutral-600 line-clamp-3 mb-4 flex-grow">Program penyaluran bantuan telah berhasil mencapai 5.000 keluarga yang membutuhkan dalam waktu kurang dari satu bulan.</p>
            <span class="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Baca Selengkapnya
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </div>
        </article>

        <!-- News Card 3 -->
        <article class="bg-white rounded-2xl overflow-hidden shadow-sm border border-neutral-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
          <div class="relative overflow-hidden h-56">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80" alt="Pelestarian Lingkungan" class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-lg text-primary-700 shadow-sm">
              Lingkungan
            </div>
          </div>
          <div class="p-6 flex flex-col flex-grow">
            <div class="flex items-center text-xs text-neutral-500 mb-3 space-x-4">
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> 18 Jun 2026</span>
              <span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> 4 min read</span>
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">Gerakan Penanaman 1 Juta Pohon Dimulai Hari Ini</h3>
            <p class="text-sm text-neutral-600 line-clamp-3 mb-4 flex-grow">Sebagai bentuk kepedulian nyata, organisasi memelopori gerakan hijau masif untuk memperbaiki kualitas udara dan lingkungan hidup.</p>
            <span class="text-primary-600 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Baca Selengkapnya
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style scoped></style>
