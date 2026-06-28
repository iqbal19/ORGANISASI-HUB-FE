<template>
  <section id="kegiatan" class="dash-events">
    <div class="dash-events__container">
      <div class="dash-events__header">
        <div class="dash-events__label">Agenda</div>
        <h2 class="dash-events__title">Kegiatan Mendatang</h2>
        <p class="dash-events__desc">Jangan lewatkan berbagai kegiatan menarik yang akan diselenggarakan oleh organisasi.</p>
      </div>
      <div class="dash-events__list">
        <div v-for="(e, i) in events" :key="i" class="dash-events__card">
          <div class="dash-events__card-date">
            <span class="dash-events__card-month">{{ e.month }}</span>
            <span class="dash-events__card-day">{{ e.day }}</span>
          </div>
          <div class="dash-events__card-content">
            <div class="dash-events__card-tag" :style="{ background: e.tagBg, color: e.tagColor }">{{ e.tag }}</div>
            <h3 class="dash-events__card-title">{{ e.title }}</h3>
            <div class="dash-events__card-info">
              <span class="dash-events__card-info-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                {{ e.time }}
              </span>
              <span class="dash-events__card-info-item">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                {{ e.location }}
              </span>
            </div>
          </div>
          <button class="dash-events__card-btn">Daftar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const events = [
  { month: 'AGS', day: '12', tag: 'Sosial', tagBg: '#dcfce7', tagColor: '#16a34a', title: 'Kegiatan Sosial Bantuan Daerah Terpencil', time: '08:00 – 15:00 WIB', location: 'Desa Suka Maju' },
  { month: 'SEP', day: '20', tag: 'Pelatihan', tagBg: '#dbeafe', tagColor: '#2563eb', title: 'Pelatihan Kepemimpinan Anggota Muda', time: '09:00 – Selesai', location: 'Aula Serbaguna Pusat' },
  { month: 'OKT', day: '05', tag: 'Seminar', tagBg: '#fef3c7', tagColor: '#d97706', title: 'Seminar Digital Transformation untuk Organisasi', time: '13:00 – 17:00 WIB', location: 'Hotel Grand Ballroom' },
]
</script>

<style scoped>
.dash-events { background: #fff; padding: 100px 0; }
.dash-events__container { max-width: 1280px; margin: 0 auto; padding: 0 24px; }
.dash-events__header { text-align: center; max-width: 560px; margin: 0 auto 56px; }
.dash-events__label {
  display: inline-block; background: rgba(57,111,239,.06); border: 1px solid rgba(57,111,239,.12);
  color: #396fef; font-size: 13px; font-weight: 600; padding: 6px 16px;
  border-radius: 100px; margin-bottom: 20px;
}
.dash-events__title { font-size: 36px; font-weight: 800; color: #0f172a; letter-spacing: -1px; margin-bottom: 14px; }
.dash-events__desc { color: #64748b; font-size: 16px; line-height: 1.7; }
.dash-events__list { display: flex; flex-direction: column; gap: 16px; max-width: 900px; margin: 0 auto; }
.dash-events__card {
  display: flex; align-items: center; gap: 24px;
  background: #fff; border: 1px solid #f1f5f9; border-radius: 18px; padding: 24px 28px;
  transition: all .3s cubic-bezier(.4,0,.2,1);
}
.dash-events__card:hover { border-color: #dbeafe; box-shadow: 0 12px 40px rgba(57,111,239,.06); transform: translateX(4px); }
.dash-events__card-date {
  width: 72px; height: 72px; border-radius: 16px;
  background: #eff6ff; border: 1px solid #dbeafe;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  flex-shrink: 0; transition: all .3s;
}
.dash-events__card:hover .dash-events__card-date { background: #396fef; border-color: #396fef; }
.dash-events__card-month { font-size: 11px; font-weight: 700; color: #396fef; text-transform: uppercase; letter-spacing: 1px; }
.dash-events__card:hover .dash-events__card-month { color: rgba(255,255,255,.8); }
.dash-events__card-day { font-size: 26px; font-weight: 800; color: #0f172a; }
.dash-events__card:hover .dash-events__card-day { color: #fff; }
.dash-events__card-content { flex: 1; min-width: 0; }
.dash-events__card-tag { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 6px; margin-bottom: 8px; }
.dash-events__card-title { color: #0f172a; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
.dash-events__card-info { display: flex; gap: 20px; flex-wrap: wrap; }
.dash-events__card-info-item { display: inline-flex; align-items: center; gap: 5px; color: #94a3b8; font-size: 13px; }
.dash-events__card-btn {
  padding: 10px 24px; border-radius: 12px; background: #fff; color: #396fef;
  border: 1px solid #dbeafe; font-size: 14px; font-weight: 700;
  cursor: pointer; transition: all .25s; flex-shrink: 0;
}
.dash-events__card-btn:hover { background: #396fef; color: #fff; box-shadow: 0 6px 20px rgba(57,111,239,.2); }
@media (max-width: 768px) {
  .dash-events { padding: 60px 0; }
  .dash-events__title { font-size: 26px; }
  .dash-events__card { flex-direction: column; align-items: flex-start; gap: 16px; }
  .dash-events__card-btn { width: 100%; text-align: center; }
}
</style>
