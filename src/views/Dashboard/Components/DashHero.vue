<template>
  <section class="dash-hero">
    <div class="dash-hero__bg">
      <div class="dash-hero__orb dash-hero__orb--1"></div>
      <div class="dash-hero__orb dash-hero__orb--2"></div>
      <div class="dash-hero__pattern"></div>
    </div>

    <div class="dash-hero__container">
      <div class="dash-hero__content">
        <div class="dash-hero__badge">
          <span class="dash-hero__badge-dot"></span>
          Platform Organisasi Digital #1
        </div>
        <h1 class="dash-hero__title">
          Solusi <span class="dash-hero__title-accent">Satu Platform</span><br/>
          untuk Manajemen<br/>Organisasi Anda
        </h1>
        <p class="dash-hero__subtitle">
          Kelola anggota, cetak KTA digital, publikasikan berita, dan selenggarakan kegiatan — semua dalam satu sistem terintegrasi yang modern dan transparan.
        </p>
        <div class="dash-hero__cta">
          <button @click="goToRegister" class="dash-hero__btn dash-hero__btn--primary">
            Mulai Sekarang
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </button>
          <button class="dash-hero__btn dash-hero__btn--outline">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Jadwalkan Demo
          </button>
        </div>
        <div class="dash-hero__stats">
          <div class="dash-hero__stat">
            <span class="dash-hero__stat-number">5</span>
            <span class="dash-hero__stat-label">Organisasi</span>
          </div>
          <div class="dash-hero__stat-divider"></div>
          <div class="dash-hero__stat">
            <span class="dash-hero__stat-number">15M+</span>
            <span class="dash-hero__stat-label">Anggota Aktif</span>
          </div>
          <div class="dash-hero__stat-divider"></div>
          <div class="dash-hero__stat">
            <span class="dash-hero__stat-number">99.9%</span>
            <span class="dash-hero__stat-label">Uptime</span>
          </div>
        </div>
      </div>

      <div class="dash-hero__visual">
        <div class="dash-hero__card-stack">
          <div class="dash-hero__mockup">
            <div class="dash-hero__mockup-header">
              <div class="dash-hero__mockup-logo">OH</div>
              <div>
                <div class="dash-hero__mockup-org">Organisasi Hub</div>
                <div class="dash-hero__mockup-sub">Kartu Tanda Anggota Digital</div>
              </div>
            </div>
            <div class="dash-hero__mockup-body">
              <div class="dash-hero__mockup-avatar"></div>
              <div class="dash-hero__mockup-info">
                <div class="dash-hero__mockup-name">Ahmad Fauzan</div>
                <div class="dash-hero__mockup-id">NTA-20260624-001</div>
                <div class="dash-hero__mockup-role">Anggota Aktif</div>
              </div>
            </div>
            <div class="dash-hero__mockup-footer">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="#cbd5e1"><rect x="2" y="2" width="7" height="7" rx="1"/><rect x="15" y="2" width="7" height="7" rx="1"/><rect x="2" y="15" width="7" height="7" rx="1"/><rect x="11" y="11" width="2" height="2"/><rect x="15" y="15" width="2" height="2"/><rect x="19" y="19" width="3" height="3" rx=".5"/><rect x="11" y="15" width="2" height="2"/><rect x="15" y="11" width="2" height="2"/></svg>
              <div class="dash-hero__mockup-valid">Berlaku s/d 2027</div>
            </div>
          </div>

          <div class="dash-hero__float dash-hero__float--notif">
            <div class="dash-hero__float-icon dash-hero__float-icon--green">
              <svg width="18" height="18" fill="none" stroke="#16a34a" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <div class="dash-hero__float-title">Anggota Baru</div>
              <div class="dash-hero__float-desc">3 anggota baru bergabung hari ini</div>
            </div>
          </div>

          <div class="dash-hero__float dash-hero__float--stats">
            <div class="dash-hero__float-icon dash-hero__float-icon--blue">
              <svg width="18" height="18" fill="none" stroke="#396fef" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
            </div>
            <div>
              <div class="dash-hero__float-title">Pertumbuhan</div>
              <div class="dash-hero__float-desc" style="color:#16a34a">+24% bulan ini</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goToRegister() { router.push({ name: 'register' }) }
</script>

<style scoped>
.dash-hero {
  position: relative; min-height: 100vh; background: #f8fafc;
  display: flex; align-items: center; padding: 120px 0 80px; overflow: hidden;
}
.dash-hero__bg { position: absolute; inset: 0; pointer-events: none; }
.dash-hero__orb { position: absolute; border-radius: 50%; filter: blur(120px); }
.dash-hero__orb--1 { width: 600px; height: 600px; background: rgba(57,111,239,.08); top: -200px; right: -100px; }
.dash-hero__orb--2 { width: 400px; height: 400px; background: rgba(139,92,246,.06); bottom: -100px; left: -50px; }
.dash-hero__pattern {
  position: absolute; inset: 0;
  background-image: linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px);
  background-size: 60px 60px; opacity: .3;
}
.dash-hero__container {
  max-width: 1280px; margin: 0 auto; padding: 0 24px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; width: 100%;
}
.dash-hero__content { position: relative; z-index: 2; }
.dash-hero__badge {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(57,111,239,.06); border: 1px solid rgba(57,111,239,.15);
  border-radius: 100px; padding: 6px 16px; color: #396fef;
  font-size: 13px; font-weight: 600; margin-bottom: 28px;
}
.dash-hero__badge-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #396fef;
  animation: pulse-dot 2s infinite;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .5; transform: scale(1.4); }
}
.dash-hero__title {
  font-size: 52px; font-weight: 800; color: #0f172a;
  line-height: 1.15; letter-spacing: -1.5px; margin-bottom: 24px;
}
.dash-hero__title-accent {
  background: linear-gradient(135deg, #396fef, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.dash-hero__subtitle {
  font-size: 17px; color: #64748b; line-height: 1.7; max-width: 480px; margin-bottom: 36px;
}
.dash-hero__cta { display: flex; gap: 14px; margin-bottom: 48px; flex-wrap: wrap; }
.dash-hero__btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 14px; font-size: 15px; font-weight: 700;
  cursor: pointer; border: none; transition: all .3s;
}
.dash-hero__btn--primary {
  background: #396fef; color: #fff; box-shadow: 0 8px 30px rgba(57,111,239,.25);
}
.dash-hero__btn--primary:hover { background: #2a5bd4; transform: translateY(-2px); box-shadow: 0 12px 40px rgba(57,111,239,.35); }
.dash-hero__btn--outline {
  background: #fff; color: #475569; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(0,0,0,.04);
}
.dash-hero__btn--outline:hover { background: #f8fafc; border-color: #cbd5e1; }
.dash-hero__stats { display: flex; align-items: center; gap: 28px; }
.dash-hero__stat-divider { width: 1px; height: 40px; background: #e2e8f0; }
.dash-hero__stat-number { display: block; font-size: 28px; font-weight: 800; color: #0f172a; }
.dash-hero__stat-label { font-size: 13px; color: #94a3b8; font-weight: 500; }

.dash-hero__visual { position: relative; z-index: 2; }
.dash-hero__card-stack { position: relative; height: 480px; }
.dash-hero__mockup {
  position: absolute; top: 20px; left: 30px; width: 320px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 20px;
  padding: 24px; box-shadow: 0 20px 60px rgba(0,0,0,.08);
  animation: float-main 6s ease-in-out infinite;
}
@keyframes float-main { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
.dash-hero__mockup-header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
  padding-bottom: 16px; border-bottom: 1px solid #f1f5f9;
}
.dash-hero__mockup-logo {
  width: 36px; height: 36px; border-radius: 10px;
  background: linear-gradient(135deg, #396fef, #5b8af5);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 800; font-size: 12px;
}
.dash-hero__mockup-org { color: #0f172a; font-weight: 700; font-size: 14px; }
.dash-hero__mockup-sub { color: #94a3b8; font-size: 11px; }
.dash-hero__mockup-body { display: flex; gap: 16px; margin-bottom: 20px; align-items: center; }
.dash-hero__mockup-avatar {
  width: 64px; height: 64px; border-radius: 16px;
  background: linear-gradient(135deg, #dbeafe, #ede9fe);
  border: 2px solid #e2e8f0; flex-shrink: 0;
}
.dash-hero__mockup-name { color: #0f172a; font-weight: 700; font-size: 16px; margin-bottom: 4px; }
.dash-hero__mockup-id { color: #396fef; font-size: 12px; font-weight: 600; font-family: monospace; margin-bottom: 4px; }
.dash-hero__mockup-role {
  display: inline-block; background: #dcfce7; color: #16a34a;
  font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 6px;
}
.dash-hero__mockup-footer {
  display: flex; justify-content: space-between; align-items: flex-end;
  padding-top: 16px; border-top: 1px solid #f1f5f9;
}
.dash-hero__mockup-valid { color: #94a3b8; font-size: 11px; }

.dash-hero__float {
  position: absolute; display: flex; align-items: center; gap: 12px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 14px 18px; box-shadow: 0 10px 40px rgba(0,0,0,.07);
}
.dash-hero__float--notif { top: 0; right: 0; animation: float-notif 5s ease-in-out infinite; }
.dash-hero__float--stats { bottom: 40px; left: 0; animation: float-stats 7s ease-in-out infinite; }
@keyframes float-notif { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(-5px,-8px); } }
@keyframes float-stats { 0%, 100% { transform: translate(0,0); } 50% { transform: translate(8px,-6px); } }
.dash-hero__float-icon {
  width: 36px; height: 36px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.dash-hero__float-icon--green { background: #dcfce7; }
.dash-hero__float-icon--blue { background: #dbeafe; }
.dash-hero__float-title { color: #1e293b; font-size: 13px; font-weight: 700; }
.dash-hero__float-desc { color: #94a3b8; font-size: 12px; }

@media (max-width: 768px) {
  .dash-hero { padding: 100px 0 60px; min-height: auto; }
  .dash-hero__container { grid-template-columns: 1fr; gap: 40px; }
  .dash-hero__title { font-size: 32px; letter-spacing: -1px; }
  .dash-hero__subtitle { font-size: 15px; }
  .dash-hero__stats { gap: 16px; flex-wrap: wrap; }
  .dash-hero__stat-number { font-size: 22px; }
  .dash-hero__visual { display: none; }
}
</style>
