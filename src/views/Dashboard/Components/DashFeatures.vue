<template>
  <section id="fitur" class="dash-features">
    <div class="dash-features__container">
      <div class="dash-features__header">
        <div class="dash-features__label">Fitur Unggulan</div>
        <h2 class="dash-features__title">Semua yang Anda Butuhkan<br/><span class="dash-features__title-accent">dalam Satu Platform</span></h2>
        <p class="dash-features__desc">Organisasi Hub menyediakan fitur lengkap untuk mengelola organisasi secara profesional, efisien, dan transparan.</p>
      </div>
      <div class="dash-features__grid">
        <div v-for="(f, i) in features" :key="i" class="dash-features__card" :class="{'dash-features__card--highlight': f.highlight}">
          <div class="dash-features__card-icon" :style="{ background: f.iconBg }">
            <span v-html="f.icon"></span>
          </div>
          <h3 class="dash-features__card-title">{{ f.title }}</h3>
          <p class="dash-features__card-desc">{{ f.desc }}</p>
          <div class="dash-features__card-tag" v-if="f.tag">{{ f.tag }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  { title: 'Manajemen Anggota', desc: 'Kelola data anggota secara terpusat dengan sistem pendaftaran online, verifikasi, dan pengelompokan otomatis.', icon: '<svg width="28" height="28" fill="none" stroke="#396fef" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>', iconBg: '#dbeafe' },
  { title: 'KTA Digital', desc: 'Cetak Kartu Tanda Anggota digital yang bisa di-custom, dilengkapi QR code untuk verifikasi instan.', icon: '<svg width="28" height="28" fill="none" stroke="#7c3aed" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/></svg>', iconBg: '#ede9fe', tag: 'Populer', highlight: true },
  { title: 'Publikasi Berita', desc: 'Buat dan terbitkan berita organisasi dengan editor modern. Bagikan pencapaian kepada anggota dan publik.', icon: '<svg width="28" height="28" fill="none" stroke="#d97706" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>', iconBg: '#fef3c7' },
  { title: 'Agenda Kegiatan', desc: 'Rencanakan dan publikasikan kegiatan organisasi. Anggota bisa mendaftar langsung melalui platform.', icon: '<svg width="28" height="28" fill="none" stroke="#16a34a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>', iconBg: '#dcfce7' },
  { title: 'Struktur Organisasi', desc: 'Visualisasikan hierarki organisasi secara interaktif. Atur jabatan, divisi, dan peran anggota dengan mudah.', icon: '<svg width="28" height="28" fill="none" stroke="#db2777" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>', iconBg: '#fce7f3' },
  { title: 'Laporan & Analitik', desc: 'Dashboard analitik real-time untuk memantau pertumbuhan anggota, aktivitas, dan keuangan organisasi.', icon: '<svg width="28" height="28" fill="none" stroke="#0891b2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>', iconBg: '#cffafe' },
]
</script>

<style scoped>
.dash-features { background: #fff; padding: 100px 0; }
.dash-features__container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.dash-features__header { text-align: center; max-width: 600px; margin: 0 auto 64px; }
.dash-features__label {
  display: inline-block; background: rgba(57,111,239,.06); border: 1px solid rgba(57,111,239,.12);
  color: #396fef; font-size: 13px; font-weight: 600; padding: 6px 16px;
  border-radius: 100px; margin-bottom: 20px;
}
.dash-features__title { font-size: 40px; font-weight: 800; color: #0f172a; line-height: 1.2; letter-spacing: -1px; margin-bottom: 16px; }
.dash-features__title-accent {
  background: linear-gradient(135deg, #396fef, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.dash-features__desc { color: #64748b; font-size: 16px; line-height: 1.7; }
.dash-features__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.dash-features__card {
  background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; padding: 32px;
  transition: all .35s cubic-bezier(.4,0,.2,1); position: relative; overflow: hidden;
}
.dash-features__card:hover {
  transform: translateY(-6px); border-color: #dbeafe;
  box-shadow: 0 20px 50px rgba(57,111,239,.08);
}
.dash-features__card--highlight { border-color: #dbeafe; background: linear-gradient(160deg, #eff6ff, #fff); }
.dash-features__card-icon {
  width: 56px; height: 56px; border-radius: 16px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 20px;
}
.dash-features__card-title { color: #0f172a; font-size: 20px; font-weight: 700; margin-bottom: 10px; }
.dash-features__card-desc { color: #64748b; font-size: 14px; line-height: 1.7; }
.dash-features__card-tag {
  position: absolute; top: 20px; right: 20px;
  background: linear-gradient(135deg, #396fef, #5b8af5); color: #fff;
  font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 8px;
}
@media (max-width: 768px) {
  .dash-features { padding: 60px 0; }
  .dash-features__title { font-size: 28px; }
  .dash-features__grid { grid-template-columns: 1fr; }
}
</style>
