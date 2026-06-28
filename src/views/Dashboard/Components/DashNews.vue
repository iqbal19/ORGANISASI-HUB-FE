<template>
  <section id="berita" class="dash-news">
    <div class="dash-news__container">
      <div class="dash-news__header">
        <div>
          <div class="dash-news__label">Berita & Info</div>
          <h2 class="dash-news__title">Berita Terkini Organisasi</h2>
        </div>
        <button class="dash-news__view-all">
          Lihat Semua
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </button>
      </div>
      <div class="dash-news__grid">
        <article v-for="(n, i) in news" :key="i" class="dash-news__card">
          <div class="dash-news__card-img">
            <img :src="n.img" :alt="n.title" />
            <div class="dash-news__card-badge">{{ n.category }}</div>
          </div>
          <div class="dash-news__card-body">
            <div class="dash-news__card-meta">
              <span>{{ n.date }}</span>
              <span class="dash-news__card-dot"></span>
              <span>{{ n.readTime }}</span>
            </div>
            <h3 class="dash-news__card-title">{{ n.title }}</h3>
            <p class="dash-news__card-excerpt">{{ n.excerpt }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const news = [
  { title: 'Rapat Koordinasi Nasional Membahas Strategi Tahunan 2027', excerpt: 'Pimpinan daerah dan pusat berkumpul untuk merumuskan langkah taktis dalam menghadapi tantangan organisasi.', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80', category: 'Organisasi', date: '24 Jun 2026', readTime: '3 menit' },
  { title: 'Distribusi Bantuan Sosial Tepat Sasaran di Wilayah Timur', excerpt: 'Program penyaluran bantuan telah berhasil mencapai 5.000 keluarga yang membutuhkan.', img: 'https://ix-marketing.imgix.net/global.jpg?auto=format,compress&w=3038', category: 'Sosial', date: '20 Jun 2026', readTime: '2 menit' },
  { title: 'Gerakan Penanaman 1 Juta Pohon Dimulai Hari Ini', excerpt: 'Organisasi memelopori gerakan hijau masif untuk memperbaiki kualitas lingkungan hidup.', img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80', category: 'Lingkungan', date: '18 Jun 2026', readTime: '4 menit' },
]
</script>

<style scoped>
.dash-news { background: #f8fafc; padding: 100px 0; }
.dash-news__container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.dash-news__header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 48px; }
.dash-news__label {
  display: inline-block; background: rgba(57,111,239,.06); border: 1px solid rgba(57,111,239,.12);
  color: #396fef; font-size: 13px; font-weight: 600; padding: 6px 16px;
  border-radius: 100px; margin-bottom: 16px;
}
.dash-news__title { font-size: 36px; font-weight: 800; color: #0f172a; letter-spacing: -1px; }
.dash-news__view-all {
  display: inline-flex; align-items: center; gap: 8px;
  background: #fff; border: 1px solid #e2e8f0; color: #475569;
  font-size: 14px; font-weight: 600; padding: 10px 20px; border-radius: 12px;
  cursor: pointer; transition: all .25s;
}
.dash-news__view-all:hover { border-color: #396fef; color: #396fef; }
.dash-news__grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
.dash-news__card {
  background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden;
  transition: all .35s cubic-bezier(.4,0,.2,1); cursor: pointer;
}
.dash-news__card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,.06); }
.dash-news__card-img { position: relative; height: 200px; overflow: hidden; }
.dash-news__card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.dash-news__card:hover .dash-news__card-img img { transform: scale(1.06); }
.dash-news__card-badge {
  position: absolute; top: 14px; left: 14px;
  background: rgba(255,255,255,.92); backdrop-filter: blur(8px);
  color: #396fef; font-size: 11px; font-weight: 700;
  padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(57,111,239,.1);
}
.dash-news__card-body { padding: 24px; }
.dash-news__card-meta { display: flex; align-items: center; gap: 8px; color: #94a3b8; font-size: 12px; font-weight: 500; margin-bottom: 12px; }
.dash-news__card-dot { width: 3px; height: 3px; border-radius: 50%; background: #cbd5e1; }
.dash-news__card-title {
  color: #0f172a; font-size: 18px; font-weight: 700; line-height: 1.4; margin-bottom: 10px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.dash-news__card-excerpt {
  color: #64748b; font-size: 14px; line-height: 1.6;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
@media (max-width: 768px) {
  .dash-news { padding: 60px 0; }
  .dash-news__header { flex-direction: column; align-items: flex-start; gap: 16px; }
  .dash-news__title { font-size: 26px; }
  .dash-news__grid { grid-template-columns: 1fr; }
}
</style>
